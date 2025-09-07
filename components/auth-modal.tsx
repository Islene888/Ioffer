"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/contexts/language-context"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const { t } = useLanguage()
  const { signIn, signUp, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isRegisterMode = initialMode === "register"

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (isSignUp: boolean) => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = t("auth.emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth.emailInvalid")
    }

    if (!formData.password) {
      newErrors.password = t("auth.passwordRequired")
    } else if (formData.password.length < 6) {
      newErrors.password = t("auth.passwordTooShort")
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = t("auth.nameRequired")
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t("auth.passwordMismatch")
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignIn = async () => {
    if (!validateForm(false)) return

    const result = await signIn(formData.email, formData.password)
    if (result.success) {
      onClose()
      setFormData({ email: "", password: "", name: "", confirmPassword: "" })
    } else {
      setErrors({ general: result.error || t("auth.signInFailed") })
    }
  }

  const handleSignUp = async () => {
    if (!validateForm(true)) return

    const result = await signUp(formData.email, formData.password, formData.name)
    if (result.success) {
      onClose()
      setFormData({ email: "", password: "", name: "", confirmPassword: "" })
    } else {
      setErrors({ general: result.error || t("auth.signUpFailed") })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            {isRegisterMode ? t("auth.createAccount") : t("auth.welcome")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isRegisterMode ? (
            // Register Form
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">{t("auth.name")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t("auth.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">{t("auth.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">{t("auth.confirmPassword")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              {errors.general && <p className="text-sm text-destructive text-center">{errors.general}</p>}

              <Button onClick={handleSignUp} disabled={isLoading} className="w-full">
                {isLoading ? t("auth.signingUp") : t("auth.signUp")}
              </Button>
            </div>
          ) : (
            // Login Form
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">{t("auth.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {errors.general && <p className="text-sm text-destructive text-center">{errors.general}</p>}

              <Button onClick={handleSignIn} disabled={isLoading} className="w-full">
                {isLoading ? t("auth.signingIn") : t("auth.signIn")}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
