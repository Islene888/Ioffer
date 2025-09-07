import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { essayType, school, program, prompt, personalInfo, experiences, goals, tone, length } = body

    // 在服务器端安全地使用API密钥
    const apiKey = process.env.AI_API_KEY

    // 调用真实的AI服务生成文书
    const generatedEssay = await callAIEssayService({
      essayType,
      school,
      program,
      prompt,
      personalInfo,
      experiences,
      goals,
      tone,
      length,
      apiKey,
    })

    return NextResponse.json({ essay: generatedEssay })
  } catch (error) {
    console.error("AI Essay Generation API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function callAIEssayService(data: any): Promise<string> {
  // 模拟AI文书生成服务
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return `Dear Admissions Committee,

I am writing to express my strong interest in the ${data.program} program at ${data.school}. ${data.personalInfo}

Throughout my journey, I have gained valuable experience through ${data.experiences}. These experiences have shaped my understanding of the field and reinforced my commitment to pursuing advanced studies.

My goal is to ${data.goals}. I believe that ${data.school}'s renowned faculty and cutting-edge research facilities will provide me with the knowledge and skills necessary to achieve these objectives.

Thank you for your consideration.

Sincerely,
[Your Name]`
}
