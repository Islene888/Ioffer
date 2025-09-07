"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime)
          }
          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime)
          }
        }
      })

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint", "first-input"] })
      } catch (e) {
        // Fallback for browsers that don't support these metrics
        console.log("Performance monitoring not supported")
      }

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        console.log("CLS:", clsValue)
      })

      try {
        clsObserver.observe({ entryTypes: ["layout-shift"] })
      } catch (e) {
        console.log("CLS monitoring not supported")
      }

      return () => {
        observer.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return null
}
