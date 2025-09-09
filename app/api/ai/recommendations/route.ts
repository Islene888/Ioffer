import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gpa, toefl, gre, major, targetCountries, experiences, goals } = body

    const recommendations = await callPythonRecommendationModel({
      gpa: Number.parseFloat(gpa),
      toefl: Number.parseInt(toefl),
      gre: Number.parseInt(gre),
      major,
      targetCountries,
      experiences,
      goals,
    })

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("AI Recommendation API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function callPythonRecommendationModel(userData: any) {
  const pythonServiceUrl = process.env.PYTHON_ML_SERVICE_URL || "http://localhost:5000"

  try {
    const response = await fetch(`${pythonServiceUrl}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ML_SERVICE_API_KEY}`,
      },
      body: JSON.stringify({
        user_profile: userData,
        num_recommendations: 10,
        include_reasoning: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Python service error: ${response.status}`)
    }

    const result = await response.json()

    // 转换Python模型输出为前端期望格式
    return result.recommendations.map((rec: any) => ({
      id: rec.school_id,
      name: rec.school_name,
      englishName: rec.english_name,
      country: rec.country,
      location: rec.location,
      ranking: rec.ranking,
      program: rec.program_name,
      matchScore: Math.round(rec.match_score * 100),
      admissionRate: rec.admission_rate,
      avgGPA: rec.avg_gpa,
      avgTOEFL: rec.avg_toefl,
      avgGRE: rec.avg_gre,
      tuition: rec.tuition,
      deadline: rec.application_deadline,
      requirements: rec.requirements,
      highlights: rec.highlights,
      reasoning: rec.reasoning,
      similarCases: rec.similar_cases_count,
      logo: rec.logo_url,
    }))
  } catch (error) {
    console.error("Python ML service error:", error)
    // 降级到基础推荐算法
    return generateBasicRecommendations(userData)
  }
}

function generateBasicRecommendations(userData: any) {
  // 基础推荐算法实现
  return [
    {
      name: "Stanford University",
      matchScore: calculateMatchScore(userData),
      tier: "reach",
      reasoning: "基于你的GPA和标准化考试成绩，斯坦福大学是一个有挑战性但值得尝试的选择。",
    },
    {
      name: "Carnegie Mellon University",
      matchScore: calculateMatchScore(userData) - 10,
      tier: "match",
      reasoning: "你的背景与CMU的录取要求非常匹配，建议重点准备申请材料。",
    },
  ]
}

function calculateMatchScore(data: any): number {
  // 简化的匹配分数计算
  let score = 0
  score += Math.min((data.gpa / 4.0) * 40, 40)
  score += Math.min((data.toefl / 120) * 30, 30)
  score += Math.min((data.gre / 340) * 30, 30)
  return Math.round(score)
}
