interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  preferences: {
    language: "zh" | "en"
    notifications: boolean
    theme: "light" | "dark"
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

class AuthService {
  private static instance: AuthService
  private authState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  }
  private listeners: ((state: AuthState) => void)[] = []

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "网络连接失败" }))
        return { success: false, error: data.error || `服务器错误 (${response.status})` }
      }

      const data = await response.json()

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.avatar,
        createdAt: new Date(data.user.createdAt),
        preferences: data.user.preferences || {
          language: "zh",
          notifications: true,
          theme: "light",
        },
      }

      this.setUser(user)
      localStorage.setItem("ioffer_user", JSON.stringify(user))

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "网络连接失败，请检查网络设置" }
    } finally {
      this.setLoading(false)
    }
  }

  async signUp(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    this.setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "网络连接失败" }))
        return { success: false, error: data.error || `服务器错误 (${response.status})` }
      }

      const data = await response.json()

      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.avatar,
        createdAt: new Date(data.user.createdAt),
        preferences: data.user.preferences || {
          language: "zh",
          notifications: true,
          theme: "light",
        },
      }

      this.setUser(user)
      localStorage.setItem("ioffer_user", JSON.stringify(user))

      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "网络连接失败，请检查网络设置" }
    } finally {
      this.setLoading(false)
    }
  }

  async signOut(): Promise<void> {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 包含cookies
      })
    } catch (error) {
      console.error("Logout API call failed:", error)
    } finally {
      this.setUser(null)
      localStorage.removeItem("ioffer_user")
    }
  }

  async initializeAuth(): Promise<void> {
    this.setLoading(true)

    try {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include", // 包含cookies
      })

      if (response.ok) {
        const data = await response.json()
        const user: User = {
          ...data.user,
          createdAt: new Date(data.user.createdAt),
          preferences: data.user.preferences || {
            language: "zh",
            notifications: true,
            theme: "light",
          },
        }
        this.setUser(user)
        localStorage.setItem("ioffer_user", JSON.stringify(user))
      } else {
        localStorage.removeItem("ioffer_user")
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error)
      localStorage.removeItem("ioffer_user")
    } finally {
      this.setLoading(false)
    }
  }

  getToken(): string | null {
    return null
  }

  getAuthHeaders(): Record<string, string> {
    return {}
  }

  private setUser(user: User | null) {
    this.authState = {
      ...this.authState,
      user,
      isAuthenticated: !!user,
    }
    this.notifyListeners()
  }

  private setLoading(isLoading: boolean) {
    this.authState = { ...this.authState, isLoading }
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.authState))
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getState(): AuthState {
    return this.authState
  }
}

export { AuthService, type User, type AuthState }
