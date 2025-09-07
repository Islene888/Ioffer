"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SchoolCard } from "@/components/school-card"
import { RecommendationFilters } from "@/components/recommendation-filters"
import { Search, Sparkles, Filter, SortAsc } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function RecommendationEngine() {
  const { t } = useLanguage()

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("match")
  const [showFilters, setShowFilters] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock user profile data - in real app this would come from user profile
  const userProfile = {
    gpa: 3.8,
    gpaScale: "4.0",
    toefl: 110,
    gre: 325,
    major: t("recommendations.profile.major"),
    targetDegree: t("recommendations.profile.targetDegree"),
    targetCountries: [t("recommendations.profile.usa"), t("recommendations.profile.uk")],
  }

  // Mock recommended schools data
  const recommendedSchools = [
    {
      id: 1,
      name: t("recommendations.schools.stanford.name"),
      englishName: "Stanford University",
      country: t("recommendations.profile.usa"),
      location: t("recommendations.schools.stanford.location"),
      ranking: 2,
      program: t("recommendations.schools.stanford.program"),
      matchScore: 95,
      admissionRate: 4.3,
      avgGPA: 3.9,
      avgTOEFL: 114,
      avgGRE: 330,
      tuition: "$58,416",
      deadline: "2024-12-15",
      requirements: {
        minGPA: 3.7,
        minTOEFL: 100,
        minGRE: 320,
      },
      highlights: t("recommendations.schools.stanford.highlights") as string[],
      similarCases: 12,
      logo: "/stanford-university-logo.jpg",
    },
    {
      id: 2,
      name: t("recommendations.schools.mit.name"),
      englishName: "MIT",
      country: t("recommendations.profile.usa"),
      location: t("recommendations.schools.mit.location"),
      ranking: 1,
      program: t("recommendations.schools.mit.program"),
      matchScore: 88,
      admissionRate: 6.7,
      avgGPA: 3.95,
      avgTOEFL: 115,
      avgGRE: 335,
      tuition: "$59,750",
      deadline: "2024-12-15",
      requirements: {
        minGPA: 3.8,
        minTOEFL: 100,
        minGRE: 325,
      },
      highlights: t("recommendations.schools.mit.highlights") as string[],
      similarCases: 8,
      logo: "/mit-logo.png",
    },
    {
      id: 3,
      name: t("recommendations.schools.cmu.name"),
      englishName: "Carnegie Mellon University",
      country: t("recommendations.profile.usa"),
      location: t("recommendations.schools.cmu.location"),
      ranking: 3,
      program: t("recommendations.schools.cmu.program"),
      matchScore: 92,
      admissionRate: 13.2,
      avgGPA: 3.85,
      avgTOEFL: 108,
      avgGRE: 325,
      tuition: "$58,924",
      deadline: "2024-12-15",
      requirements: {
        minGPA: 3.6,
        minTOEFL: 102,
        minGRE: 315,
      },
      highlights: t("recommendations.schools.cmu.highlights") as string[],
      similarCases: 15,
      logo: "/carnegie-mellon-logo.jpg",
    },
    {
      id: 4,
      name: t("recommendations.schools.berkeley.name"),
      englishName: "UC Berkeley",
      country: t("recommendations.profile.usa"),
      location: t("recommendations.schools.berkeley.location"),
      ranking: 4,
      program: t("recommendations.schools.berkeley.program"),
      matchScore: 90,
      admissionRate: 8.7,
      avgGPA: 3.8,
      avgTOEFL: 105,
      avgGRE: 320,
      tuition: "$44,066",
      deadline: "2024-12-01",
      requirements: {
        minGPA: 3.5,
        minTOEFL: 90,
        minGRE: 310,
      },
      highlights: t("recommendations.schools.berkeley.highlights") as string[],
      similarCases: 22,
      logo: "/uc-berkeley-logo.png",
    },
    {
      id: 5,
      name: t("recommendations.schools.imperial.name"),
      englishName: "Imperial College London",
      country: t("recommendations.profile.uk"),
      location: t("recommendations.schools.imperial.location"),
      ranking: 6,
      program: t("recommendations.schools.imperial.program"),
      matchScore: 85,
      admissionRate: 14.3,
      avgGPA: 3.7,
      avgTOEFL: 100,
      avgGRE: 315,
      tuition: "£35,100",
      deadline: "2025-01-15",
      requirements: {
        minGPA: 3.5,
        minTOEFL: 92,
        minGRE: 310,
      },
      highlights: t("recommendations.schools.imperial.highlights") as string[],
      similarCases: 18,
      logo: "/imperial-college-london-logo.png",
    },
  ]

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  const filteredSchools = recommendedSchools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.program.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedSchools = [...filteredSchools].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchScore - a.matchScore
      case "ranking":
        return a.ranking - b.ranking
      case "admission":
        return b.admissionRate - a.admissionRate
      case "tuition":
        return (
          Number.parseFloat(a.tuition.replace(/[^0-9.]/g, "")) - Number.parseFloat(b.tuition.replace(/[^0-9.]/g, ""))
        )
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            {t("recommendations.profile.title")}
          </CardTitle>
          <CardDescription>{t("recommendations.profile.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userProfile.gpa}</div>
              <div className="text-sm text-muted-foreground">GPA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userProfile.toefl}</div>
              <div className="text-sm text-muted-foreground">TOEFL</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userProfile.gre}</div>
              <div className="text-sm text-muted-foreground">GRE</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{userProfile.major}</div>
              <div className="text-sm text-muted-foreground">{t("recommendations.profile.majorLabel")}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{userProfile.targetDegree}</div>
              <div className="text-sm text-muted-foreground">{t("recommendations.profile.degreeLabel")}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{userProfile.targetCountries.join(", ")}</div>
              <div className="text-sm text-muted-foreground">{t("recommendations.profile.countryLabel")}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleGenerateRecommendations}
              disabled={isGenerating}
              className="bg-secondary hover:bg-secondary/90"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {t("recommendations.generating")}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t("recommendations.regenerate")}
                </>
              )}
            </Button>
            <Button variant="outline">{t("recommendations.updateProfile")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("recommendations.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">{t("recommendations.sortByMatch")}</SelectItem>
              <SelectItem value="ranking">{t("recommendations.sortByRanking")}</SelectItem>
              <SelectItem value="admission">{t("recommendations.sortByAdmission")}</SelectItem>
              <SelectItem value="tuition">{t("recommendations.sortByTuition")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {t("recommendations.filter")}
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && <RecommendationFilters />}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {t("recommendations.foundSchools").replace("{count}", sortedSchools.length.toString())}
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{t("recommendations.reachSchools")}</Badge>
          <Badge variant="secondary">{t("recommendations.matchSchools")}</Badge>
          <Badge variant="secondary">{t("recommendations.safetySchools")}</Badge>
        </div>
      </div>

      {/* School Cards */}
      <div className="grid gap-6">
        {sortedSchools.map((school) => (
          <SchoolCard key={school.id} school={school} userProfile={userProfile} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">{t("recommendations.loadMore")}</Button>
      </div>
    </div>
  )
}
