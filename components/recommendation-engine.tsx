"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SchoolCard } from "@/components/school-card"
import { RecommendationFilters } from "@/components/recommendation-filters"
import { Search, Sparkles, Filter, SortAsc, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function RecommendationEngine() {
  const { t } = useLanguage()

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("match")
  const [showFilters, setShowFilters] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [recommendedSchools, setRecommendedSchools] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUserProfileAndRecommendations()
  }, [])

  const loadUserProfileAndRecommendations = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setIsLoading(false)
        return
      }

      const profileResponse = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (profileResponse.ok) {
        const { user } = await profileResponse.json()

        // Extract user data for recommendations
        const profile = user.profile
        const languageTests = user.languageTests || []

        const toeflScore = languageTests.find((test: any) => test.type === "toefl")?.score || 0
        const greScore = languageTests.find((test: any) => test.type === "gre")?.score || 0

        const userProfileData = {
          gpa: Number.parseFloat(profile?.gpa || "0"),
          gpaScale: profile?.gpaScale || "4.0",
          toefl: Number.parseInt(toeflScore) || 0,
          gre: Number.parseInt(greScore) || 0,
          major: profile?.major || "",
          targetDegree: profile?.targetDegree || "",
          targetCountries: profile?.targetCountries?.split(",").map((c: string) => c.trim()) || [],
          targetMajor: profile?.targetMajor || "",
        }

        setUserProfile(userProfileData)

        if (profile?.gpa && (toeflScore || greScore)) {
          await generateRecommendations(userProfileData)
        }
      }
    } catch (error) {
      console.error("Failed to load user profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateRecommendations = async (profileData?: any) => {
    setIsGenerating(true)

    try {
      const token = localStorage.getItem("token")
      const profile = profileData || userProfile

      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gpa: profile.gpa,
          toefl: profile.toefl,
          gre: profile.gre,
          major: profile.targetMajor || profile.major,
          targetCountries: profile.targetCountries,
          experiences: [],
          goals: profile.targetDegree,
        }),
      })

      if (response.ok) {
        const { recommendations } = await response.json()
        setRecommendedSchools(recommendations)
      }
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateRecommendations = async () => {
    await generateRecommendations()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
      </div>
    )
  }

  if (!userProfile || !userProfile.gpa) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            完善个人档案
          </CardTitle>
          <CardDescription>请先完善您的个人档案信息，我们将基于您的背景为您推荐最合适的学校。</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/profile">
            <Button className="bg-secondary hover:bg-secondary/90">前往个人中心</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const filteredSchools = recommendedSchools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.programs?.some((p: string) => p.toLowerCase().includes(searchQuery.toLowerCase())),
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
              <div className="text-2xl font-bold text-secondary">{userProfile.toefl || "N/A"}</div>
              <div className="text-sm text-muted-foreground">TOEFL</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userProfile.gre || "N/A"}</div>
              <div className="text-sm text-muted-foreground">GRE</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{userProfile.major || "未填写"}</div>
              <div className="text-sm text-muted-foreground">{t("recommendations.profile.majorLabel")}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{userProfile.targetDegree || "未填写"}</div>
              <div className="text-sm text-muted-foreground">{t("recommendations.profile.degreeLabel")}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{userProfile.targetCountries.join(", ") || "未填写"}</div>
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
            <Link href="/profile">
              <Button variant="outline">{t("recommendations.updateProfile")}</Button>
            </Link>
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
        <div className="text-sm text-muted-foreground">为您找到 {sortedSchools.length} 所推荐学校</div>
        <div className="flex gap-2">
          <Badge variant="secondary">冲刺学校</Badge>
          <Badge variant="secondary">匹配学校</Badge>
          <Badge variant="secondary">保底学校</Badge>
        </div>
      </div>

      {/* School Cards */}
      <div className="grid gap-6">
        {sortedSchools.length > 0 ? (
          sortedSchools.map((school) => <SchoolCard key={school.id} school={school} userProfile={userProfile} />)
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {recommendedSchools.length === 0 ? "点击上方按钮生成个性化推荐" : "没有找到匹配的学校，请调整搜索条件"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      {sortedSchools.length > 0 && (
        <div className="text-center">
          <Button variant="outline">{t("recommendations.loadMore")}</Button>
        </div>
      )}
    </div>
  )
}
