"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = "empty",
  blurDataURL,
  sizes,
  fill = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={cn("bg-muted flex items-center justify-center text-muted-foreground text-sm", className)}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        图片加载失败
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        {...props}
      />
    </div>
  )
}
