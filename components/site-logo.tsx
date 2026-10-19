import { Link } from "@tanstack/react-router"

import { SiteMark } from "@/components/site-mark"

function SiteLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <SiteMark className="size-5" />
      <span className="font-heading text-base">shaderscn</span>
    </Link>
  )
}

export { SiteLogo }
