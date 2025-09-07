"use client"

import { useState, useEffect } from "react"
import { storage, type UserProfile } from "@/lib/storage"

export function useUserData() {
  const [userData, setUserData] = useState<UserProfile>(storage.getUserData())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 监听数据更新事件
    const handleDataUpdate = (event: CustomEvent) => {
      setUserData(event.detail)
    }

    const handleDataClear = () => {
      setUserData(storage.getUserData())
    }

    window.addEventListener("userDataUpdated", handleDataUpdate as EventListener)
    window.addEventListener("userDataCleared", handleDataClear)

    return () => {
      window.removeEventListener("userDataUpdated", handleDataUpdate as EventListener)
      window.removeEventListener("userDataCleared", handleDataClear)
    }
  }, [])

  const updateUserData = async (data: Partial<UserProfile>) => {
    setIsLoading(true)
    try {
      storage.saveUserData(data)
      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("[v0] 更新用户数据失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearUserData = () => {
    storage.clearUserData()
  }

  const exportData = () => {
    return storage.exportUserData()
  }

  const importData = (jsonData: string) => {
    return storage.importUserData(jsonData)
  }

  return {
    userData,
    isLoading,
    updateUserData,
    clearUserData,
    exportData,
    importData,
  }
}
