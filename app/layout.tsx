import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AiChatAssistant } from "@/components/ai-chat-assistant"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700", "900"],
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ioffer - Global Study Abroad Platform | Your Gateway to International Education",
  description:
    "ioffer is the leading international study abroad platform, providing personalized university recommendations, AI-powered essay assistance, and comprehensive application management for students worldwide seeking global education opportunities.",
  keywords:
    "study abroad,international education,university applications,AI essay assistant,global education,overseas study,university recommendations,application management,international students",
  authors: [{ name: "ioffer Team" }],
  creator: "ioffer",
  publisher: "ioffer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ioffer.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "zh-CN": "/zh-CN",
      "es-ES": "/es-ES",
      "fr-FR": "/fr-FR",
      "de-DE": "/de-DE",
      "ja-JP": "/ja-JP",
      "ko-KR": "/ko-KR",
    },
  },
  openGraph: {
    title: "ioffer - Global Study Abroad Platform",
    description: "Your gateway to international education with AI-powered personalized guidance for students worldwide",
    url: "https://ioffer.app",
    siteName: "ioffer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ioffer - Global Study Abroad Platform",
    description: "Your gateway to international education with AI-powered personalized guidance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//vercel.live" />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/geist/v1/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .skip-link {
              position: absolute !important;
              top: 1rem !important;
              left: 1rem !important;
              background-color: #000000 !important;
              color: #ffffff !important;
              padding: 0.5rem 1rem !important;
              border-radius: 0.375rem !important;
              z-index: 9999 !important;
              font-weight: 600 !important;
              text-decoration: none !important;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
              border: 2px solid #ea580c !important;
              transform: translateY(-100px) !important;
              transition: transform 0.3s ease !important;
            }
            .skip-link:focus {
              transform: translateY(0) !important;
              outline: 2px solid #ea580c !important;
              outline-offset: 2px !important;
            }
          `,
          }}
        />
      </head>
      <body className={`font-sans ${geistSans.variable} ${manrope.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only skip-link"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            position: "absolute",
            top: "1rem",
            left: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            zIndex: 9999,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            border: "2px solid #ea580c",
          }}
        >
          Skip to main content
        </a>

        <LanguageProvider>
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <LoadingSkeleton lines={3} className="w-64 mx-auto" />
                    <p className="text-muted-foreground">Loading ioffer platform...</p>
                  </div>
                </div>
              }
            >
              <main id="main-content" role="main">
                {children}
              </main>
            </Suspense>
          </ErrorBoundary>

          <AiChatAssistant />
        </LanguageProvider>

        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ioffer",
              description:
                "Global study abroad platform providing AI-powered personalized guidance for international education",
              url: "https://ioffer.app",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              provider: {
                "@type": "Organization",
                name: "ioffer",
              },
              audience: {
                "@type": "Audience",
                audienceType: "International Students",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
