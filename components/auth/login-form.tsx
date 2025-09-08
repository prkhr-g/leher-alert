"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Shield, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { User, UserRole } from "@/app/page"

interface LoginFormProps {
  onLogin: (user: User) => void
}

// Mock user data for demonstration
const mockUsers: Record<string, User> = {
  "citizen@test.com": {
    id: "1",
    name: "Rajesh Kumar",
    email: "citizen@test.com",
    role: "citizen",
    location: "Chennai, Tamil Nadu",
    isVerified: true,
  },
  "official@test.com": {
    id: "2",
    name: "Dr. Priya Sharma",
    email: "official@test.com",
    role: "official",
    location: "Mumbai, Maharashtra",
    isVerified: false, // Default unverified for testing
  },
  "analyst@test.com": {
    id: "3",
    name: "Arjun Patel",
    email: "analyst@test.com",
    role: "analyst",
    location: "Kochi, Kerala",
    isVerified: false, // Default unverified for testing
  },
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen")
  const [isVerified, setIsVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers[email]
    if (user) {
      const loginUser = {
        ...user,
        isVerified: user.role === "citizen" ? true : isVerified,
      }
      onLogin(loginUser)
    } else {
      const demoUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email,
        role: selectedRole,
        location: "Demo Location",
        isVerified: selectedRole === "citizen" ? true : isVerified,
      }
      onLogin(demoUser)
    }
    setIsSubmitting(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <motion.div variants={inputFocusVariants} whileFocus="focus" animate="blur">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          Try: citizen@test.com, official@test.com, or analyst@test.com
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <motion.div variants={inputFocusVariants} whileFocus="focus" animate="blur">
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
          <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
            <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="citizen">Citizen</SelectItem>
              <SelectItem value="official">Emergency Official</SelectItem>
              <SelectItem value="analyst">Data Analyst</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(selectedRole === "official" || selectedRole === "analyst") && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-2"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center justify-between p-3 border rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={
                    isVerified
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }
                      : {
                          scale: [1, 1.1, 1],
                        }
                  }
                  transition={{
                    duration: 0.5,
                    repeat: isVerified ? 1 : Number.POSITIVE_INFINITY,
                    repeatDelay: isVerified ? 0 : 2,
                  }}
                >
                  {isVerified ? (
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <Shield className="h-4 w-4 text-amber-600" />
                  )}
                </motion.div>
                <div>
                  <Label className="text-sm font-medium">Verification Status (Testing)</Label>
                  <motion.p
                    key={isVerified ? "verified" : "unverified"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-muted-foreground"
                  >
                    {isVerified ? "Account verified - full access" : "Pending verification - limited access"}
                  </motion.p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Switch checked={isVerified} onCheckedChange={setIsVerified} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0,
            repeatDelay: 0.5,
          }}
        >
          <Button type="submit" className="w-full transition-all duration-200 hover:shadow-lg" disabled={isSubmitting}>
            <motion.span
              animate={isSubmitting ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
              transition={{ duration: 0.8, repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0 }}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  )
}
