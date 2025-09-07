"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/hooks/use-auth"
import { AuthModal } from "@/components/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  User,
  BookOpen,
  FileText,
  Settings,
  Lightbulb,
  LogOut,
  UserCircle,
  Trophy,
  Users,
  HelpCircle,
  Home,
} from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const { t } = useLanguage()
  const { user, isAuthenticated, signOut } = useAuth()

  const navItems = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/profile", label: t("nav.profile"), icon: User },
    { href: "/recommendations", label: t("nav.recommendations"), icon: BookOpen },
    { href: "/essays", label: t("nav.essays"), icon: FileText },
    { href: "/applications", label: t("nav.applications"), icon: Settings },
    { href: "/success-stories", label: t("nav.successStories"), icon: Trophy },
    { href: "/community", label: t("nav.community"), icon: Users },
    { href: "/help", label: t("nav.help"), icon: HelpCircle },
    { href: "/features", label: t("nav.features"), icon: Lightbulb },
  ]

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

  const handleLogin = () => {
    setAuthMode("login")
    setIsAuthModalOpen(true)
  }

  const handleRegister = () => {
    setAuthMode("register")
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo区域 */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  backgroundColor: "#d97706",
                }}
              >
                <span
                  className="font-bold text-lg"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  i
                </span>
              </div>
              <span
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(to right, #d97706, #b45309)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ioffer
              </span>
            </Link>

            {/* 桌面端导航 */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* 更多菜单 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                    <span className="font-medium">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white border-gray-200" align="end">
                  {navItems.slice(6).map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      asChild
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <Link href={item.href} className="flex items-center space-x-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 右侧操作区域 */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-amber-400/20 transition-all duration-200"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-white border-gray-200" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-3">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-semibold text-sm text-gray-900">{user?.name}</p>
                        <p className="w-[200px] truncate text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      <Link href="/profile" className="flex items-center space-x-2">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>{t("nav.profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      <Link href="/applications" className="flex items-center space-x-2">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("nav.applications")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("auth.signOut") || "Sign Out"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogin}
                    className="font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                  >
                    {t("nav.login")}
                  </Button>
                  <button
                    size="sm"
                    onClick={handleRegister}
                    style={{
                      background: "linear-gradient(to right, #f59e0b, #d97706)",
                      backgroundColor: "#d97706",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      fontSize: "14px",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s",
                    }}
                    className="hover:opacity-90 transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {t("nav.freeRegister")}
                  </button>
                </div>
              )}
            </div>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* 移动端导航菜单 */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                  <LanguageSwitcher />
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 font-medium">{user?.name}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSignOut}
                        className="border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 bg-transparent"
                      >
                        {t("auth.signOut") || "Sign Out"}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogin}
                        className="border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 bg-transparent"
                      >
                        {t("nav.login")}
                      </Button>
                      <button
                        size="sm"
                        onClick={handleRegister}
                        style={{
                          background: "linear-gradient(to right, #f59e0b, #d97706)",
                          backgroundColor: "#d97706",
                          color: "#ffffff",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          fontWeight: "500",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                        className="hover:opacity-90 transition-all duration-200"
                      >
                        {t("nav.freeRegister")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
