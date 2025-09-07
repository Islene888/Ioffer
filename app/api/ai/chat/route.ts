import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context, userProfile } = body

    // 在服务器端安全地使用API密钥
    const apiKey = process.env.AI_API_KEY

    // 调用真实的AI聊天服务
    const aiResponse = await callAIChatService({
      message,
      context,
      userProfile,
      apiKey,
    })

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("AI Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function callAIChatService(data: any): Promise<string> {
  // 模拟AI聊天服务
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { message, userProfile } = data
  const lowerMessage = message.toLowerCase()

  // 基于用户资料的智能回复
  if (lowerMessage.includes("gpa") || lowerMessage.includes("成绩")) {
    return `根据你的GPA ${userProfile?.gpa || "情况"}，我建议你重点关注匹配度较高的学校。同时可以通过提升其他方面的背景来增强竞争力。`
  }

  if (lowerMessage.includes("文书") || lowerMessage.includes("essay")) {
    return "文书是申请中的重要环节。我建议你使用我们的AI文书助手，它能根据你的背景生成个性化的文书草稿。"
  }

  if (lowerMessage.includes("学校") || lowerMessage.includes("推荐")) {
    return "我已经根据你的背景为你推荐了几所匹配的学校。你可以在学校推荐页面查看详细的匹配分析。"
  }

  return "我理解你的问题。建议你先完善个人资料，这样我能为你提供更精准的建议和推荐。如果你有具体的申请问题，我很乐意为你详细解答。"
}
