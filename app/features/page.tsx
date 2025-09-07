import { FeatureSuggestions } from "@/components/feature-suggestions"
import { IoOfferMascot } from "@/components/ioffer-mascot"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <IoOfferMascot message="这些新功能会让我们的平台更棒！" size="lg" animated={true} />
        </div>
        <FeatureSuggestions />
      </div>
    </div>
  )
}
