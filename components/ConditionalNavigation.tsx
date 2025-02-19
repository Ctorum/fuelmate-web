"use client"

import { usePathname } from "next/navigation"
import Navigation from "./Navigation"

export default function ConditionalNavigation() {
  const pathname = usePathname()
  const isAuthenticatedRoute = !["/", "/login", "/register"].includes(pathname)

  if (isAuthenticatedRoute) {
    return <Navigation />
  }

  return null
}

