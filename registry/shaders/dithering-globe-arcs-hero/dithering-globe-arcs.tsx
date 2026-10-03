"use client"

import * as React from "react"
import {
  getShaderColorFromString,
  ShaderMount,
  type ShaderComponentProps,
} from "@paper-design/shaders-react"

import { GLOBE_LAND_TEXTURE } from "./globe-texture"

const MAX_ARCS = 12

const globeArcsFragmentShader = `#version 300 es
precision mediump float;

#define MAX_ARCS ${MAX_ARCS}
#define ARC_SEGMENTS 24

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform sampler2D u_land;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform vec4 u_colorArc;
uniform float u_pxSize;
uniform float u_scale;
uniform float u_tilt;
uniform float u_glow;
uniform vec3 u_arcFrom[MAX_ARCS];
uniform vec3 u_arcTo[MAX_ARCS];
uniform float u_arcCount;

out vec4 fragColor;

const float PI = 3.14159265359;

const int bayer4x4[16] = int[16](
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
);

float getBayerValue(vec2 cell) {
  ivec2 pos = ivec2(mod(cell, 4.));
  return float(bayer4x4[pos.y * 4 + pos.x]) / 16.;
}

// Spins a point on the globe around its axis, then tilts it towards the
// viewer. The inverse of the lookup used to texture the globe below.
mat3 viewMatrix(float spin) {
  float cs = cos(spin);
  float ss = sin(spin);
  float c = cos(u_tilt);
  float s = sin(u_tilt);
  mat3 spinMatrix = mat3(cs, 0., -ss, 0., 1., 0., ss, 0., cs);
  mat3 tiltMatrix = mat3(1., 0., 0., 0., c, -s, 0., s, c);
  return tiltMatrix * spinMatrix;
}

// A point is hidden when it sits behind the globe's disc.
float isVisible(vec3 v) {
  return (v.z > 0. || dot(v.xy, v.xy) > 1.) ? 1. : 0.;
}

float segmentDistance(vec2 p, vec2 a, vec2 b, out float h) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0., 1.);
  return length(pa - ba * h);
}

void main() {
  // Snap to the dithering grid so every "pixel" is a solid block.
  float pxSize = u_pxSize * u_pixelRatio;
  vec2 cell = floor((gl_FragCoord.xy - .5 * u_resolution) / pxSize);
  vec2 cellCenter = (cell + .5) * pxSize;

  // Unit circle that fits the canvas, scaled by u_scale.
  float radius = .5 * min(u_resolution.x, u_resolution.y) * u_scale;
  vec2 p = cellCenter / radius;
  float r2 = dot(p, p);
  float spin = .25 * u_time;

  float shape = 0.;
  if (r2 < 1.) {
    // Texture lookups need more precision than mediump guarantees on mobile.
    highp vec3 normal = vec3(p, sqrt(1. - r2));

    // Tilt the globe towards the viewer, then spin it around its own axis.
    float c = cos(u_tilt);
    float s = sin(u_tilt);
    highp vec3 q = vec3(normal.x, c * normal.y - s * normal.z, s * normal.y + c * normal.z);
    highp float lon = atan(q.x, q.z) - spin;
    highp float lat = asin(clamp(q.y, -1., 1.));
    highp vec2 uv = vec2(fract(lon / (2. * PI) + .5), .5 - lat / PI);

    float land = texture(u_land, uv).r;
    land = max(land, step(.985, uv.y)); // close the gap at the south pole

    vec3 light = normalize(vec3(-.5, .6, .75));
    float diffuse = clamp(dot(normal, light), 0., 1.);
    float rim = pow(1. - normal.z, 3.);

    // Keep the globe a little dimmer so the arcs stand out on top of it.
    shape = mix(.1, .85, land) * (.25 + .75 * diffuse) + .2 * rim;
  } else {
    // Soft atmosphere around the edge.
    shape = u_glow * exp(-(sqrt(r2) - 1.) * 18.);
  }

  // Arcs and city pins, in globe units. Widths are in dithering pixels.
  float unit = pxSize / radius;
  float lineWidth = 1.2 * unit;
  float pinRadius = 2.5 * unit;
  float arc = 0.;
  mat3 view = viewMatrix(spin);

  for (int i = 0; i < MAX_ARCS; i++) {
    if (float(i) >= u_arcCount) break;

    vec3 from = u_arcFrom[i];
    vec3 to = u_arcTo[i];
    float omega = acos(clamp(dot(from, to), -1., 1.));
    float sinOmega = max(sin(omega), 1e-4);
    // Longer flights climb higher above the surface.
    float height = .05 + .25 * omega / PI;

    // Every point of the arc, its pins included, lies within this distance of
    // the arc's midpoint. Skipping arcs that are out of reach keeps the cost
    // per pixel low.
    vec3 mid = from + to;
    if (dot(mid, mid) > 1e-6) {
      vec2 center = (view * normalize(mid)).xy;
      float reach = 2. * sin(.25 * omega) + height + lineWidth + 4. * pinRadius + unit;
      if (length(p - center) > reach) continue;
    }

    // Each arc draws itself in, then retracts, on its own schedule.
    float phase = fract(.12 * u_time + float(i) * .371);
    float head = smoothstep(0., .6, phase);
    float tail = smoothstep(.45, 1., phase);

    vec3 prev = view * from;
    for (int j = 1; j <= ARC_SEGMENTS; j++) {
      float t = float(j) / float(ARC_SEGMENTS);
      vec3 point = (sin((1. - t) * omega) * from + sin(t * omega) * to) / sinOmega;
      point *= 1. + height * sin(PI * t);
      vec3 next = view * point;

      float h;
      float d = segmentDistance(p, prev.xy, next.xy, h);
      float along = (float(j - 1) + h) / float(ARC_SEGMENTS);
      float drawn = step(tail, along) * step(along, head);
      // Brighter towards the leading end, like a comet.
      float brightness = mix(.45, 1., clamp((along - tail) / max(head - tail, 1e-4), 0., 1.));
      float visible = isVisible(mix(prev, next, h));
      arc = max(arc, step(d, lineWidth) * drawn * brightness * visible);

      prev = next;
    }

    // Pins at both ends, with a ring that pulses outwards.
    vec3 ends[2] = vec3[2](view * from, view * to);
    for (int k = 0; k < 2; k++) {
      float d = length(p - ends[k].xy);
      float pulse = fract(.5 * u_time + float(i) * .23 + float(k) * .5);
      float ring = step(abs(d - pinRadius * (1. + 3. * pulse)), .6 * unit) * (1. - pulse);
      float pin = max(step(d, pinRadius), ring * .8);
      arc = max(arc, pin * step(0., ends[k].z));
    }
  }

  // Same threshold as Paper's Dithering shader: zero intensity stays empty.
  float bayer = getBayerValue(cell) - .5;
  float res = step(.5, shape + bayer);
  float arcRes = step(.5, arc + bayer);

  vec3 fgColor = mix(u_colorFront.rgb * u_colorFront.a, u_colorArc.rgb * u_colorArc.a, arcRes);
  float fgOpacity = mix(u_colorFront.a, u_colorArc.a, arcRes);
  res = max(res, arcRes);
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;
  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`

/** A latitude / longitude pair, in degrees. */
type Coordinates = [lat: number, lon: number]

type GlobeArc = { from: Coordinates; to: Coordinates }

const CITIES = {
  sanFrancisco: [37.77, -122.42],
  newYork: [40.71, -74.01],
  saoPaulo: [-23.55, -46.63],
  london: [51.51, -0.13],
  lagos: [6.52, 3.38],
  dubai: [25.2, 55.27],
  singapore: [1.35, 103.82],
  tokyo: [35.68, 139.69],
  sydney: [-33.87, 151.21],
} satisfies Record<string, Coordinates>

const DEFAULT_ARCS: GlobeArc[] = [
  { from: CITIES.sanFrancisco, to: CITIES.newYork },
  { from: CITIES.newYork, to: CITIES.london },
  { from: CITIES.london, to: CITIES.dubai },
  { from: CITIES.dubai, to: CITIES.singapore },
  { from: CITIES.singapore, to: CITIES.tokyo },
  { from: CITIES.tokyo, to: CITIES.sanFrancisco },
  { from: CITIES.newYork, to: CITIES.saoPaulo },
  { from: CITIES.london, to: CITIES.lagos },
  { from: CITIES.singapore, to: CITIES.sydney },
]

// Unit vector in the same space the shader samples the land texture in.
function toVector([lat, lon]: Coordinates): [number, number, number] {
  const phi = (lat * Math.PI) / 180
  const lambda = (lon * Math.PI) / 180
  return [
    Math.cos(phi) * Math.sin(lambda),
    Math.sin(phi),
    Math.cos(phi) * Math.cos(lambda),
  ]
}

type DitheringGlobeArcsProps = Omit<ShaderComponentProps, "ref"> & {
  /** Up to 12 flight paths, drawn as arcs with pins at each end. */
  arcs?: GlobeArc[]
  colorBack?: string
  colorFront?: string
  colorArc?: string
  /** Size of a dithering pixel, in CSS pixels. */
  size?: number
  /** Globe diameter relative to the smaller side of the container. */
  scale?: number
  /**
   * Axial tilt, in degrees. Negative values tip the north pole towards the
   * viewer, positive values the south pole.
   */
  tilt?: number
  /** Strength of the atmosphere glow around the globe, 0 to 1. */
  glow?: number
  speed?: number
}

function DitheringGlobeArcs({
  arcs = DEFAULT_ARCS,
  colorBack = "#00000000",
  colorFront = "#38bdf8",
  colorArc = "#ffffff",
  size = 2,
  scale = 0.9,
  tilt = -20,
  glow = 0.4,
  speed = 1,
  ...props
}: DitheringGlobeArcsProps) {
  const uniforms = React.useMemo(() => {
    // Uniform arrays have a fixed length, so pad the unused slots.
    const padded = Array.from(
      { length: MAX_ARCS },
      (_, i) => arcs[i] ?? DEFAULT_ARCS[0]
    )

    return {
      u_land: GLOBE_LAND_TEXTURE,
      u_colorBack: getShaderColorFromString(colorBack),
      u_colorFront: getShaderColorFromString(colorFront),
      u_colorArc: getShaderColorFromString(colorArc),
      u_pxSize: size,
      u_scale: scale,
      u_tilt: (tilt * Math.PI) / 180,
      u_glow: glow,
      u_arcFrom: padded.map((arc) => toVector(arc.from)),
      u_arcTo: padded.map((arc) => toVector(arc.to)),
      u_arcCount: Math.min(arcs.length, MAX_ARCS),
    }
  }, [arcs, colorBack, colorFront, colorArc, size, scale, tilt, glow])

  return (
    <ShaderMount
      data-slot="dithering-globe-arcs"
      fragmentShader={globeArcsFragmentShader}
      uniforms={uniforms}
      speed={speed}
      {...props}
    />
  )
}

export { DitheringGlobeArcs, type GlobeArc }
