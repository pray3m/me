import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/projects/freelanceX") {
    return NextResponse.next()
  }

  const destination = request.nextUrl.clone()
  destination.pathname = "/projects/freelancex"

  return NextResponse.redirect(destination, 308)
}

export const config = {
  matcher: "/projects/:path*",
}
