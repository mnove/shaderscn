"use client"

import * as React from "react"
import {
  getShaderColorFromString,
  ShaderMount,
  type ShaderComponentProps,
} from "@paper-design/shaders-react"

import { GLOBE_LAND_TEXTURE } from "./globe-texture"

const globeFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform sampler2D u_land;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_pxSize;
uniform float u_scale;
uniform float u_tilt;
uniform float u_glow;

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

void main() {
  // Snap to the dithering grid so every "pixel" is a solid block.
  float pxSize = u_pxSize * u_pixelRatio;
  vec2 cell = floor((gl_FragCoord.xy - .5 * u_resolution) / pxSize);
  vec2 cellCenter = (cell + .5) * pxSize;

  // Unit circle that fits the canvas, scaled by u_scale.
  vec2 p = cellCenter / (.5 * min(u_resolution.x, u_resolution.y) * u_scale);
  float r2 = dot(p, p);

  float shape = 0.;
  if (r2 < 1.) {
    // Texture lookups need more precision than mediump guarantees on mobile.
    highp vec3 normal = vec3(p, sqrt(1. - r2));

    // Tilt the globe towards the viewer, then spin it around its own axis.
    float c = cos(u_tilt);
    float s = sin(u_tilt);
    highp vec3 q = vec3(normal.x, c * normal.y - s * normal.z, s * normal.y + c * normal.z);
    highp float lon = atan(q.x, q.z) - .25 * u_time;
    highp float lat = asin(clamp(q.y, -1., 1.));
    highp vec2 uv = vec2(fract(lon / (2. * PI) + .5), .5 - lat / PI);

    float land = texture(u_land, uv).r;
    land = max(land, step(.985, uv.y)); // close the gap at the south pole

    vec3 light = normalize(vec3(-.5, .6, .75));
    float diffuse = clamp(dot(normal, light), 0., 1.);
    float rim = pow(1. - normal.z, 3.);

    shape = mix(.12, 1., land) * (.25 + .75 * diffuse) + .2 * rim;
  } else {
    // Soft atmosphere around the edge.
    shape = u_glow * exp(-(sqrt(r2) - 1.) * 18.);
  }

  // Same threshold as Paper's Dithering shader: zero intensity stays empty.
  float res = step(.5, shape + getBayerValue(cell) - .5);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;
  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`

type DitheringGlobeProps = Omit<ShaderComponentProps, "ref"> & {
  colorBack?: string
  colorFront?: string
  /** Size of a dithering pixel, in CSS pixels. */
  size?: number
  /** Globe diameter relative to the smaller side of the container. */
  scale?: number
  /** Axial tilt towards the viewer, in degrees. */
  tilt?: number
  /** Strength of the atmosphere glow around the globe, 0 to 1. */
  glow?: number
  speed?: number
}

function DitheringGlobe({
  colorBack = "#00000000",
  colorFront = "#38bdf8",
  size = 2,
  scale = 0.9,
  tilt = 20,
  glow = 0.4,
  speed = 1,
  ...props
}: DitheringGlobeProps) {
  const uniforms = React.useMemo(
    () => ({
      u_land: GLOBE_LAND_TEXTURE,
      u_colorBack: getShaderColorFromString(colorBack),
      u_colorFront: getShaderColorFromString(colorFront),
      u_pxSize: size,
      u_scale: scale,
      u_tilt: (tilt * Math.PI) / 180,
      u_glow: glow,
    }),
    [colorBack, colorFront, size, scale, tilt, glow]
  )

  return (
    <ShaderMount
      data-slot="dithering-globe"
      fragmentShader={globeFragmentShader}
      uniforms={uniforms}
      speed={speed}
      {...props}
    />
  )
}

export { DitheringGlobe }
