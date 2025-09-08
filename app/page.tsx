"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { CitizenDashboard } from "@/components/dashboards/citizen-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { AnalystDashboard } from "@/components/dashboards/analyst-dashboard"
import { LandingPage } from "@/components/landing/landing-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeherAlertLogo } from "@/components/ui/leher-alert-logo"

export type UserRole = "citizen" | "official" | "analyst"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  location?: string
  isVerified?: boolean
  idDocument?: string
}

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [showLanding, setShowLanding] = useState(true)

  const handleLogin = (user: User) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setShowLanding(true)
  }

  if (!currentUser && showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <LeherAlertLogo className="text-primary" size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-primary">LeherAlert</h1>
            <p className="text-muted-foreground">Ocean Hazard Monitoring Platform</p>
            <p className="text-sm text-muted-foreground">Protecting Indian Coastal Communities</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{authMode === "login" ? "Sign In" : "Create Account"}</CardTitle>
              <CardDescription>
                {authMode === "login"
                  ? "Access your dashboard to monitor ocean hazards"
                  : "Join the community to report and track ocean hazards"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {authMode === "login" ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onRegister={handleLogin} />}

              <div className="mt-4 text-center">
                <Button variant="link" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
                  {authMode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </div>

              <div className="mt-2 text-center">
                <Button variant="ghost" size="sm" onClick={() => setShowLanding(true)}>
                  ← Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <LeherAlertLogo className="text-primary" size="sm" />
              <h1 className="text-xl font-bold text-primary">LeherAlert</h1>
            </div>
            <span className="text-sm text-muted-foreground">
              Welcome, {currentUser.name} ({currentUser.role})
            </span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      {currentUser.role === "citizen" && <CitizenDashboard user={currentUser} />}
      {currentUser.role === "official" && <AdminDashboard user={currentUser} />}
      {currentUser.role === "analyst" && <AnalystDashboard user={currentUser} />}
    </div>
  )
}
