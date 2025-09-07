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

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "登录失败，请检查邮箱和密码" }
      }

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
      localStorage.setItem("ioffer_token", data.token)
      localStorage.setItem("ioffer_user", JSON.stringify(user))

      return { success: true }
    } catch (error) {
      return { success: false, error: "网络错误，请稍后重试" }
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

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "注册失败，请稍后重试" }
      }

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
      localStorage.setItem("ioffer_token", data.token)
      localStorage.setItem("ioffer_user", JSON.stringify(user))

      return { success: true }
    } catch (error) {
      return { success: false, error: "网络错误，请稍后重试" }
    } finally {
      this.setLoading(false)
    }
  }

  async signOut(): Promise<void> {
    try {
      const token = localStorage.getItem("ioffer_token")
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      }
    } catch (error) {
      console.error("Logout API call failed:", error)
    } finally {
      this.setUser(null)
      localStorage.removeItem("ioffer_token")
      localStorage.removeItem("ioffer_user")
    }
  }

  async initializeAuth(): Promise<void> {
    this.setLoading(true)

    try {
      const token = localStorage.getItem("ioffer_token")
      const savedUser = localStorage.getItem("ioffer_user")

      if (token && savedUser) {
        // Verify token is still valid
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const user = JSON.parse(savedUser)
          this.setUser(user)
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem("ioffer_token")
          localStorage.removeItem("ioffer_user")
        }
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error)
      // Clear invalid data on error
      localStorage.removeItem("ioffer_token")
      localStorage.removeItem("ioffer_user")
    } finally {
      this.setLoading(false)
    }
  }

  getToken(): string | null {
    return localStorage.getItem("ioffer_token")
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
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
