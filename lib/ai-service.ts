export class AIService {
  private static instance: AIService

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  // 智能学校匹配算法
  async getSchoolRecommendations(userProfile: any): Promise<any[]> {
    try {
      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gpa: userProfile.gpa,
          toefl: userProfile.toefl,
          gre: userProfile.gre,
          major: userProfile.major,
          targetCountries: userProfile.targetCountries,
          experiences: userProfile.experiences,
          goals: userProfile.goals,
        }),
      })

      if (!response.ok) {
        throw new Error("AI recommendation service unavailable")
      }

      return await response.json()
    } catch (error) {
      console.error("AI Service Error:", error)
      // 降级到基于规则的推荐算法
      return this.getRuleBasedRecommendations(userProfile)
    }
  }

  // 基于规则的推荐算法（作为AI服务的降级方案）
  private getRuleBasedRecommendations(userProfile: any): any[] {
    const schools = [
      {
        name: "Stanford University",
        matchScore: this.calculateMatchScore(userProfile, {
          minGPA: 3.7,
          minTOEFL: 100,
          minGRE: 320,
          competitiveness: 0.95,
        }),
        tier: "reach",
      },
      {
        name: "Carnegie Mellon University",
        matchScore: this.calculateMatchScore(userProfile, {
          minGPA: 3.6,
          minTOEFL: 102,
          minGRE: 315,
          competitiveness: 0.85,
        }),
        tier: "match",
      },
    ]

    return schools.sort((a, b) => b.matchScore - a.matchScore)
  }

  // 智能匹配分数计算
  private calculateMatchScore(userProfile: any, schoolRequirements: any): number {
    let score = 0

    // GPA权重 40%
    const gpaScore = Math.min(userProfile.gpa / schoolRequirements.minGPA, 1.2) * 40

    // 语言成绩权重 30%
    const languageScore = Math.min(userProfile.toefl / schoolRequirements.minTOEFL, 1.2) * 30

    // GRE权重 20%
    const greScore = Math.min(userProfile.gre / schoolRequirements.minGRE, 1.2) * 20

    // 竞争激烈程度调整 10%
    const competitivenessAdjustment = (1 - schoolRequirements.competitiveness) * 10

    score = gpaScore + languageScore + greScore + competitivenessAdjustment

    return Math.min(Math.round(score), 100)
  }

  // AI文书生成
  async generateEssay(essayData: any): Promise<string> {
    try {
      const response = await fetch("/api/ai/essay-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(essayData),
      })

      if (!response.ok) {
        throw new Error("AI essay generation service unavailable")
      }

      const result = await response.json()
      return result.essay
    } catch (error) {
      console.error("AI Essay Generation Error:", error)
      return this.generateTemplateEssay(essayData)
    }
  }

  // 模板化文书生成（降级方案）
  private generateTemplateEssay(essayData: any): string {
    return `Dear Admissions Committee,

I am writing to express my strong interest in the ${essayData.program} program at ${essayData.school}. My passion for this field stems from ${essayData.personalInfo}.

Throughout my academic and professional journey, I have gained valuable experience through ${essayData.experiences}. These experiences have not only strengthened my technical skills but also developed my ability to tackle complex challenges.

What particularly attracts me to ${essayData.school} is its reputation for excellence and innovation. I am excited about the opportunity to contribute to the vibrant academic community and work towards my goal of ${essayData.goals}.

I am confident that my background and enthusiasm make me a strong candidate for your program. Thank you for your consideration.

Sincerely,
[Your Name]`
  }

  // AI聊天响应
  async getChatResponse(message: string, context: any): Promise<string> {
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          context,
          userProfile: context.userProfile,
        }),
      })

      if (!response.ok) {
        throw new Error("AI chat service unavailable")
      }

      const result = await response.json()
      return result.response
    } catch (error) {
      console.error("AI Chat Error:", error)
      return this.getContextualResponse(message, context)
    }
  }

  // 基于上下文的智能回复
  private getContextualResponse(message: string, context: any): string {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("gpa") || lowerMessage.includes("成绩")) {
      return "根据你的GPA情况，我建议你重点关注匹配度较高的学校。同时可以通过提升其他方面的背景来增强竞争力。"
    }

    if (lowerMessage.includes("文书") || lowerMessage.includes("essay")) {
      return "文书是申请中的重要环节。我建议你使用我们的AI文书助手，它能根据你的背景生成个性化的文书草稿。"
    }

    if (lowerMessage.includes("学校") || lowerMessage.includes("推荐")) {
      return "我已经根据你的背景为你推荐了几所匹配的学校。你可以在学校推荐页面查看详细的匹配分析。"
    }

    return "我理解你的问题。建议你先完善个人资料，这样我能为你提供更精准的建议和推荐。"
  }

  // 录取概率预测
  async predictAdmissionChance(userProfile: any, school: any): Promise<number> {
    // 基于历史数据和机器学习模型预测录取概率
    const factors = {
      gpaFactor: userProfile.gpa / school.avgGPA,
      toeflFactor: userProfile.toefl / school.avgTOEFL,
      greFactor: userProfile.gre / school.avgGRE,
      admissionRate: school.admissionRate / 100,
    }

    // 简化的概率计算模型
    let probability =
      (factors.gpaFactor * 0.4 + factors.toeflFactor * 0.3 + factors.greFactor * 0.3) * factors.admissionRate

    // 调整到合理范围
    probability = Math.min(Math.max(probability * 100, 5), 85)

    return Math.round(probability)
  }
}
