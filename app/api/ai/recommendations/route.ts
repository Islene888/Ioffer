import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gpa, toefl, gre, major, targetCountries, experiences, goals } = body

    // 在服务器端安全地使用API密钥
    const apiKey = process.env.AI_API_KEY // 注意：不使用NEXT_PUBLIC_前缀

    // 调用真实的AI服务（这里使用模拟响应）
    const aiResponse = await callAIRecommendationService({
      gpa,
      toefl,
      gre,
      major,
      targetCountries,
      experiences,
      goals,
      apiKey,
    })

    return NextResponse.json(aiResponse)
  } catch (error) {
    console.error("AI Recommendation API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function callAIRecommendationService(data: any) {
  // 模拟AI服务调用 - 在实际应用中这里会调用真实的AI API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      name: "Stanford University",
      matchScore: calculateMatchScore(data),
      tier: "reach",
      reasoning: "基于你的GPA和标准化考试成绩，斯坦福大学是一个有挑战性但值得尝试的选择。",
    },
    {
      name: "Carnegie Mellon University",
      matchScore: calculateMatchScore(data) - 10,
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
