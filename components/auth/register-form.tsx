"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import type { User, UserRole } from "@/app/page"

interface RegisterFormProps {
  onRegister: (user: User) => void
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [role, setRole] = useState<UserRole>("citizen")
  const [idDocument, setIdDocument] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      location,
      isVerified: role === "citizen" ? true : false,
      idDocument: idDocument ? idDocument.name : undefined,
    }

    onRegister(newUser)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIdDocument(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          placeholder="e.g., Chennai, Tamil Nadu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="citizen">Citizen Reporter</SelectItem>
            <SelectItem value="official">Emergency Official</SelectItem>
            <SelectItem value="analyst">Data Analyst</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(role === "official" || role === "analyst") && (
        <div className="space-y-2">
          <Label htmlFor="id-upload">{role === "official" ? "Official ID Document" : "Analyst Credentials"}</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <Label htmlFor="id-upload" className="cursor-pointer text-sm font-medium text-primary hover:underline">
                  Upload {role === "official" ? "Government ID" : "Professional Credentials"}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {role === "official"
                    ? "Required: Government employee ID, badge, or official document"
                    : "Required: Professional certification, degree, or institutional ID"}
                </p>
              </div>
              <Input
                id="id-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                required
              />
              {idDocument && <p className="text-xs text-green-600">✓ {idDocument.name} uploaded</p>}
            </div>
          </div>
          <p className="text-xs text-amber-600">⚠️ Account will require verification before full access is granted</p>
        </div>
      )}

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  )
}
