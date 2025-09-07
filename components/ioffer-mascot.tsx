"use client"

import { useState } from "react"
import Image from "next/image"

interface IoOfferMascotProps {
  message?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function IoOfferMascot({
  message = "Hi! I'm here to help with your study abroad journey!",
  size = "md",
  animated = true,
}: IoOfferMascotProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const imageSizes = {
    sm: 64,
    md: 96,
    lg: 128,
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className={`${sizeClasses[size]} relative cursor-pointer transition-all duration-500 ease-out ${
          animated && isHovered ? "scale-110" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl scale-150 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        <Image
          src="/ioffer-logo-transparent.png"
          alt="ioffer logo"
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="w-full h-full object-contain relative z-10 filter brightness-105 contrast-105"
          style={{
            backgroundColor: "transparent",
            filter: "drop-shadow(0 4px 12px rgba(251, 146, 60, 0.15)) hue-rotate(15deg) saturate(1.2)",
          }}
          priority
        />

        {animated && (
          <>
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gradient-to-r from-cyan-300 to-cyan-400 rounded-full animate-pulse opacity-70 blur-[0.5px]"></div>
            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full animate-bounce opacity-70 blur-[0.5px]"></div>
            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full animate-ping opacity-60 blur-[0.5px]"></div>
          </>
        )}
      </div>

      {message && (
        <div className="relative bg-card border border-border rounded-xl p-3 shadow-sm max-w-xs">
          <p className="text-sm text-card-foreground">{message}</p>
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-card"></div>
        </div>
      )}
    </div>
  )
}
