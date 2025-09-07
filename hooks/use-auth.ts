"use client"

import { useState, useEffect } from "react"
import { AuthService, type AuthState } from "@/lib/auth"

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => AuthService.getInstance().getState())

  useEffect(() => {
    const authService = AuthService.getInstance()

    authService.initializeAuth()

    const unsubscribe = authService.subscribe(setAuthState)

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    return AuthService.getInstance().signIn(email, password)
  }

  const signUp = async (email: string, password: string, name: string) => {
    return AuthService.getInstance().signUp(email, password, name)
  }

  const signOut = async () => {
    return AuthService.getInstance().signOut()
  }

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  }
}
