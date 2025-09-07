import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// 数据库操作工具类
export class DatabaseService {
  // 用户相关操作
  static async createUser(data: {
    email: string
    name: string
    password: string
  }) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        language: true,
        notifications: true,
        theme: true,
      },
    })
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    })
  }

  static async updateUserProfile(userId: string, profileData: any) {
    return await prisma.userProfile.upsert({
      where: { userId },
      update: profileData,
      create: {
        userId,
        ...profileData,
      },
    })
  }

  // 申请相关操作
  static async createApplication(data: {
    userId: string
    schoolId: string
    programId?: string
    deadline?: Date
  }) {
    return await prisma.application.create({
      data,
      include: {
        school: true,
        program: true,
      },
    })
  }

  static async getUserApplications(userId: string) {
    return await prisma.application.findMany({
      where: { userId },
      include: {
        school: true,
        program: true,
        essays: true,
      },
      orderBy: { createdAt: "desc" },
    })
  }

  // 学校和项目相关操作
  static async searchSchools(query: string, country?: string) {
    return await prisma.school.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { city: { contains: query, mode: "insensitive" } },
            ],
          },
          country ? { country } : {},
        ],
      },
      include: {
        programs: true,
      },
      take: 20,
    })
  }

  // 文书相关操作
  static async createEssay(data: {
    userId: string
    applicationId?: string
    title: string
    type: string
    content: string
    prompt?: string
    isAIGenerated?: boolean
  }) {
    return await prisma.essay.create({
      data: {
        ...data,
        type: data.type as any,
      },
    })
  }

  static async getUserEssays(userId: string) {
    return await prisma.essay.findMany({
      where: { userId },
      include: {
        application: {
          include: {
            school: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    })
  }
}
