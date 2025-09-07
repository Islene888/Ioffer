// 本地存储管理工具
interface UserProfile {
  basicInfo: {
    name: string
    email: string
    phone: string
    wechat: string
  }
  academicInfo: {
    currentEducation: string
    gpa: string
    major: string
    graduationDate: string
    toefl: string
    ielts: string
    gre: string
    gmat: string
  }
  applications: Array<{
    id: string
    school: string
    program: string
    status: string
    deadline: string
    documents: string[]
  }>
  preferences: {
    language: "zh" | "en"
    notifications: boolean
    theme: "light" | "dark"
  }
}

class StorageManager {
  private static instance: StorageManager
  private readonly STORAGE_KEY = "ioffer_user_data"
  private readonly VERSION = "1.0.0"

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager()
    }
    return StorageManager.instance
  }

  // 保存用户数据
  saveUserData(data: Partial<UserProfile>): void {
    try {
      const existingData = this.getUserData()
      const updatedData = { ...existingData, ...data }
      const storageData = {
        version: this.VERSION,
        timestamp: Date.now(),
        data: updatedData,
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData))

      // 触发自定义事件通知其他组件
      window.dispatchEvent(new CustomEvent("userDataUpdated", { detail: updatedData }))
    } catch (error) {
      console.error("[v0] 保存用户数据失败:", error)
    }
  }

  // 获取用户数据
  getUserData(): UserProfile {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return this.getDefaultUserData()

      const parsed = JSON.parse(stored)
      if (parsed.version !== this.VERSION) {
        // 版本不匹配时迁移数据
        return this.migrateData(parsed.data)
      }

      return parsed.data || this.getDefaultUserData()
    } catch (error) {
      console.error("[v0] 读取用户数据失败:", error)
      return this.getDefaultUserData()
    }
  }

  // 清除用户数据
  clearUserData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      window.dispatchEvent(new CustomEvent("userDataCleared"))
    } catch (error) {
      console.error("[v0] 清除用户数据失败:", error)
    }
  }

  // 导出用户数据
  exportUserData(): string {
    const data = this.getUserData()
    return JSON.stringify(data, null, 2)
  }

  // 导入用户数据
  importUserData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      this.saveUserData(data)
      return true
    } catch (error) {
      console.error("[v0] 导入用户数据失败:", error)
      return false
    }
  }

  private getDefaultUserData(): UserProfile {
    return {
      basicInfo: {
        name: "",
        email: "",
        phone: "",
        wechat: "",
      },
      academicInfo: {
        currentEducation: "",
        gpa: "",
        major: "",
        graduationDate: "",
        toefl: "",
        ielts: "",
        gre: "",
        gmat: "",
      },
      applications: [],
      preferences: {
        language: "zh",
        notifications: true,
        theme: "light",
      },
    }
  }

  private migrateData(oldData: any): UserProfile {
    // 数据迁移逻辑
    return { ...this.getDefaultUserData(), ...oldData }
  }
}

export const storage = StorageManager.getInstance()
export type { UserProfile }
