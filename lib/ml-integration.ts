export class MLRecommendationService {
  private static baseUrl = process.env.PYTHON_ML_SERVICE_URL || "http://localhost:5000"
  private static apiKey = process.env.ML_SERVICE_API_KEY

  static async getRecommendations(userProfile: any) {
    try {
      const response = await fetch(`${this.baseUrl}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          user_profile: userProfile,
          num_recommendations: 10,
          include_reasoning: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`ML service error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("ML service integration error:", error)
      throw error
    }
  }

  static async updateModel(trainingData: any) {
    // 模型更新接口
    try {
      const response = await fetch(`${this.baseUrl}/update-model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(trainingData),
      })

      return await response.json()
    } catch (error) {
      console.error("Model update error:", error)
      throw error
    }
  }
}
