import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string }

    const user = await DatabaseService.findUserByEmail(decoded.email || "")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
        preferences: {
          language: user.language,
          notifications: user.notifications,
          theme: user.theme,
        },
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
