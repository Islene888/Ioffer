"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function BasicInfoForm() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    nationality: "",
    currentLocation: "",
    targetCountries: "",
    bio: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Basic info submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80" />
          <AvatarFallback>{t("profile.basic.avatar")}</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm">
          <Camera className="h-4 w-4 mr-2" />
          {t("profile.basic.changeAvatar")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">{t("profile.basic.name")} *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder={t("profile.basic.namePlaceholder")}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{t("profile.basic.email")} *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">{t("profile.basic.phone")}</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+86 138 0000 0000"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">{t("profile.basic.gender")}</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("profile.basic.genderPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t("profile.basic.male")}</SelectItem>
              <SelectItem value="female">{t("profile.basic.female")}</SelectItem>
              <SelectItem value="other">{t("profile.basic.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">{t("profile.basic.birthDate")}</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
          />
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <Label htmlFor="nationality">{t("profile.basic.nationality")}</Label>
          <Select value={formData.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("profile.basic.nationalityPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="china">{t("profile.basic.china")}</SelectItem>
              <SelectItem value="usa">{t("profile.basic.usa")}</SelectItem>
              <SelectItem value="canada">{t("profile.basic.canada")}</SelectItem>
              <SelectItem value="other">{t("profile.basic.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current Location */}
        <div className="space-y-2">
          <Label htmlFor="currentLocation">{t("profile.basic.currentLocation")}</Label>
          <Input
            id="currentLocation"
            value={formData.currentLocation}
            onChange={(e) => handleInputChange("currentLocation", e.target.value)}
            placeholder={t("profile.basic.locationPlaceholder")}
          />
        </div>

        {/* Target Countries */}
        <div className="space-y-2">
          <Label htmlFor="targetCountries">{t("profile.basic.targetCountries")}</Label>
          <Input
            id="targetCountries"
            value={formData.targetCountries}
            onChange={(e) => handleInputChange("targetCountries", e.target.value)}
            placeholder={t("profile.basic.countriesPlaceholder")}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">{t("profile.basic.bio")}</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder={t("profile.basic.bioPlaceholder")}
          rows={4}
        />
      </div>

      <Button type="submit" className="bg-secondary hover:bg-secondary/90">
        <Save className="h-4 w-4 mr-2" />
        {t("profile.basic.save")}
      </Button>
    </form>
  )
}
