"use client"

import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Target, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize access to global education by providing intelligent, personalized guidance for every student's unique journey.",
    },
    {
      icon: Users,
      title: "Our Team",
      description:
        "A diverse group of education experts, AI specialists, and former international students passionate about helping others succeed.",
    },
    {
      icon: Award,
      title: "Our Success",
      description:
        "Over 10,000 successful applications and partnerships with 500+ universities worldwide, with a 95% satisfaction rate.",
    },
    {
      icon: Globe,
      title: "Our Vision",
      description:
        "To create a world where every talented student can access the education they deserve, regardless of their background.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50/30">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">ioffer</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're revolutionizing the study abroad application process with AI-powered tools and personalized
              guidance, making global education accessible to students worldwide.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded by a team of international education veterans and AI experts, ioffer was born from the
                recognition that the study abroad application process was unnecessarily complex and often inaccessible
                to many deserving students.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Having experienced the challenges firsthand - from navigating different application systems to crafting
                compelling personal statements in a second language - our founders set out to create a platform that
                would level the playing field.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, ioffer combines cutting-edge AI technology with human expertise to provide personalized guidance,
                intelligent matching, and comprehensive support throughout the entire application journey.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Drives Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
