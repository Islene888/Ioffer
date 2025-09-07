"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return <div className={`${isLoaded ? "page-transition" : "opacity-0"}`}>{children}</div>
}
