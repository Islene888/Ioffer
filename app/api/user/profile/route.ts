import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: true,
        languageTests: true,
        experiences: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const body = await request.json()
    const { basicInfo, academicInfo, languageTests, experiences } = body

    // 更新或创建用户资料
    const profile = await prisma.userProfile.upsert({
      where: { userId: decoded.userId },
      update: {
        ...basicInfo,
        ...academicInfo,
      },
      create: {
        userId: decoded.userId,
        ...basicInfo,
        ...academicInfo,
      },
    })

    // 更新语言考试成绩
    if (languageTests && languageTests.length > 0) {
      await prisma.languageTest.deleteMany({
        where: { userId: decoded.userId },
      })

      await prisma.languageTest.createMany({
        data: languageTests.map((test: any) => ({
          userId: decoded.userId,
          ...test,
        })),
      })
    }

    // 更新经历
    if (experiences && experiences.length > 0) {
      await prisma.experience.deleteMany({
        where: { userId: decoded.userId },
      })

      await prisma.experience.createMany({
        data: experiences.map((exp: any) => ({
          userId: decoded.userId,
          ...exp,
        })),
      })
    }

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
