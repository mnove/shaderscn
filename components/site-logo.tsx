import Link from "next/link"
import { MeshGradient } from "@paper-design/shaders-react"

function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <MeshGradient
        aria-hidden
        className="size-5"
        colors={["#e0eaff", "#241d9a", "#f75092", "#9f50d3"]}
        distortion={0.8}
        swirl={0.4}
        speed={0.5}
      />
      <span className="font-heading text-base">shaderscn</span>
    </Link>
  )
}

export { SiteLogo }
