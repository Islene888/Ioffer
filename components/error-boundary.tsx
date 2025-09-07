"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)

    // Report error to monitoring service
    if (typeof window !== "undefined") {
      // You can integrate with error reporting services here
      console.log("Error reported to monitoring service")
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md cartoon-shadow border-2 border-destructive/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-destructive">出现了一些问题</CardTitle>
              <CardDescription>很抱歉，页面遇到了意外错误。请尝试刷新页面或返回首页。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-xs bg-muted p-2 rounded">
                  <summary className="cursor-pointer font-medium">错误详情</summary>
                  <pre className="mt-2 whitespace-pre-wrap">{this.state.error.message}</pre>
                </details>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={this.resetError}
                  className="flex-1 button-press mobile-touch bg-transparent"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重试
                </Button>
                <Button onClick={() => (window.location.href = "/")} className="flex-1 button-press mobile-touch">
                  <Home className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
