import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gpa, toefl, gre, major, targetCountries, experiences, goals } = body

    const recommendations = generateSmartRecommendations({
      gpa: Number.parseFloat(gpa),
      toefl: Number.parseInt(toefl),
      gre: Number.parseInt(gre),
      major,
      targetCountries,
      experiences,
      goals,
    })

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("AI Recommendation API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateSmartRecommendations(userData: any) {
  const schoolDatabase = getSchoolDatabase()
  const userScore = calculateUserScore(userData)

  // 根据用户背景筛选和排序学校
  const filteredSchools = schoolDatabase
    .filter((school) => {
      // 国家筛选
      if (userData.targetCountries && userData.targetCountries.length > 0) {
        return userData.targetCountries.includes(school.country)
      }
      return true
    })
    .map((school) => ({
      ...school,
      matchScore: calculateMatchScore(userData, school),
      tier: calculateTier(userData, school),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12) // 返回前12个推荐

  return filteredSchools
}

function calculateUserScore(userData: any): number {
  let score = 0
  score += Math.min((userData.gpa / 4.0) * 40, 40)
  score += Math.min((userData.toefl / 120) * 25, 25)
  score += Math.min((userData.gre / 340) * 25, 25)
  score += userData.experiences ? userData.experiences.length * 2 : 0
  return Math.min(score, 100)
}

function calculateMatchScore(userData: any, school: any): number {
  let matchScore = 0

  // GPA匹配度 (40%)
  const gpaMatch = Math.max(0, 100 - Math.abs(userData.gpa - school.avgGPA) * 25)
  matchScore += gpaMatch * 0.4

  // TOEFL匹配度 (30%)
  const toeflMatch = Math.max(0, 100 - Math.abs(userData.toefl - school.avgTOEFL) * 0.5)
  matchScore += toeflMatch * 0.3

  // GRE匹配度 (20%)
  if (userData.gre && school.avgGRE) {
    const greMatch = Math.max(0, 100 - Math.abs(userData.gre - school.avgGRE) * 0.3)
    matchScore += greMatch * 0.2
  } else {
    matchScore += 80 * 0.2 // 默认分数
  }

  // 专业匹配度 (10%)
  const majorMatch = school.programs.some((p: string) => p.toLowerCase().includes(userData.major?.toLowerCase() || ""))
    ? 100
    : 60
  matchScore += majorMatch * 0.1

  return Math.round(Math.min(matchScore, 100))
}

function calculateTier(userData: any, school: any): string {
  const userScore = calculateUserScore(userData)
  const schoolSelectivity = 100 - school.admissionRate

  if (userScore >= schoolSelectivity + 15) return "safety"
  if (userScore >= schoolSelectivity - 10) return "match"
  return "reach"
}

function getSchoolDatabase() {
  return [
    {
      id: "stanford",
      name: "斯坦福大学",
      englishName: "Stanford University",
      country: "美国",
      location: "加利福尼亚州",
      ranking: 3,
      programs: ["计算机科学", "工程学", "商学", "医学"],
      avgGPA: 3.9,
      avgTOEFL: 110,
      avgGRE: 325,
      admissionRate: 4.3,
      tuition: "$56,169",
      deadline: "2024-01-05",
      requirements: ["GRE成绩", "TOEFL 100+", "推荐信3封"],
      highlights: ["世界顶级研究型大学", "硅谷核心位置", "创新创业氛围"],
      logo: "/stanford-university-logo.jpg",
    },
    {
      id: "mit",
      name: "麻省理工学院",
      englishName: "Massachusetts Institute of Technology",
      country: "美国",
      location: "马萨诸塞州",
      ranking: 1,
      programs: ["工程学", "计算机科学", "物理学", "数学"],
      avgGPA: 3.9,
      avgTOEFL: 109,
      avgGRE: 324,
      admissionRate: 6.7,
      tuition: "$57,986",
      deadline: "2024-12-15",
      requirements: ["GRE成绩", "TOEFL 100+", "研究经历"],
      highlights: ["理工科全球第一", "诺贝尔奖得主众多", "创新研究环境"],
      logo: "/mit-logo.png",
    },
    {
      id: "cmu",
      name: "卡内基梅隆大学",
      englishName: "Carnegie Mellon University",
      country: "美国",
      location: "宾夕法尼亚州",
      ranking: 25,
      programs: ["计算机科学", "工程学", "商学", "艺术"],
      avgGPA: 3.8,
      avgTOEFL: 105,
      avgGRE: 320,
      admissionRate: 15.4,
      tuition: "$58,924",
      deadline: "2024-01-15",
      requirements: ["GRE成绩", "TOEFL 100+", "作品集(艺术类)"],
      highlights: ["计算机科学顶尖", "跨学科研究", "产业合作密切"],
      logo: "/carnegie-mellon-logo.jpg",
    },
    {
      id: "cambridge",
      name: "剑桥大学",
      englishName: "University of Cambridge",
      country: "英国",
      location: "剑桥",
      ranking: 2,
      programs: ["工程学", "自然科学", "数学", "医学"],
      avgGPA: 3.8,
      avgTOEFL: 110,
      avgGRE: 0, // 不要求GRE
      admissionRate: 21.0,
      tuition: "£33,972",
      deadline: "2024-01-15",
      requirements: ["IELTS 7.5+", "学术推荐信", "研究计划"],
      highlights: ["世界顶级学府", "800年历史", "学院制教学"],
      logo: "/cambridge-logo.jpg",
    },
    {
      id: "oxford",
      name: "牛津大学",
      englishName: "University of Oxford",
      country: "英国",
      location: "牛津",
      ranking: 4,
      programs: ["人文学科", "社会科学", "自然科学", "医学"],
      avgGPA: 3.8,
      avgTOEFL: 110,
      avgGRE: 0,
      admissionRate: 17.5,
      tuition: "£28,370",
      deadline: "2024-01-06",
      requirements: ["IELTS 7.5+", "面试", "学术写作样本"],
      highlights: ["英语世界最古老大学", "导师制教学", "政商界校友众多"],
      logo: "/oxford-logo.jpg",
    },
    {
      id: "melbourne",
      name: "墨尔本大学",
      englishName: "University of Melbourne",
      country: "澳大利亚",
      location: "墨尔本",
      ranking: 33,
      programs: ["商学", "工程学", "医学", "法学"],
      avgGPA: 3.5,
      avgTOEFL: 94,
      avgGRE: 0,
      admissionRate: 70.0,
      tuition: "AUD $45,824",
      deadline: "2024-05-31",
      requirements: ["IELTS 6.5+", "本科成绩单", "个人陈述"],
      highlights: ["澳洲八大名校", "研究实力强劲", "国际化程度高"],
      logo: "/melbourne-logo.jpg",
    },
  ]
}
