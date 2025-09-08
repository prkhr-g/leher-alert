"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, AlertCircle, MapPin, Siren } from "lucide-react"
import { InteractiveMap } from "@/components/map/interactive-map"
import { SocialMediaMonitor } from "@/components/social-media/social-media-monitor"
import { RestrictionPopup } from "@/components/ui/restriction-popup"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@/app/page"
import { useState } from "react"

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [restrictionPopup, setRestrictionPopup] = useState<{ isOpen: boolean; action: string }>({
    isOpen: false,
    action: "",
  })

  const handleRestrictedAction = (action: string) => {
    if (!user.isVerified && (user.role === "official" || user.role === "analyst")) {
      setRestrictionPopup({ isOpen: true, action })
      return
    }
    // If verified, proceed with the action (for now just console log)
    console.log(`[v0] Executing ${action} for verified user`)
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const reportItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto p-6 space-y-6"
    >
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            title: "Team Alert",
            description: "Coordinate response teams",
            buttonText: "Send Alert",
            buttonClass: "w-full bg-red-600 hover:bg-red-700 text-white",
            iconColor: "text-primary",
            onClick: () => handleRestrictedAction("Team Alert"),
            isRestricted: true,
          },
          {
            icon: MapPin,
            title: "Hotspot Generation",
            description: "Identify high-risk areas",
            buttonText: "Generate Map",
            buttonClass: "w-full bg-transparent",
            buttonVariant: "outline",
            iconColor: "text-destructive",
          },
          {
            icon: AlertCircle,
            title: "Rescue Operation",
            description: "Manage active rescues",
            buttonText: "View Operations",
            buttonClass: "w-full",
            buttonVariant: "secondary",
            iconColor: "text-secondary",
          },
          {
            icon: Siren,
            title: "Early Warning",
            description: "Issue public warnings",
            buttonText: "Issue Warning",
            buttonClass: "w-full bg-transparent",
            buttonVariant: "outline",
            iconColor: "text-accent",
            onClick: () => handleRestrictedAction("Issue Warning"),
            isRestricted: true,
          },
        ].map((card, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={card.isRestricted ? "pulse" : ""}
                      variants={pulseVariants}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                    </motion.div>
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className={card.buttonClass} variant={card.buttonVariant as any} onClick={card.onClick}>
                      {card.buttonText}
                    </Button>
                  </motion.div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Map Section */}
      <motion.div variants={cardVariants} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <InteractiveMap userRole="official" />
      </motion.div>

      {/* Social Media Monitoring Section */}
      <motion.div variants={cardVariants} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <SocialMediaMonitor userRole="official" />
      </motion.div>

      {/* Pending Reports */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Pending Verification</CardTitle>
            <CardDescription>Citizen reports awaiting official review</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={containerVariants} className="space-y-3">
              {[
                {
                  title: "Tsunami warning signs at Puri Beach",
                  reporter: "Amit Singh",
                  time: "30 min ago",
                },
                {
                  title: "Unusual wave patterns near Goa",
                  reporter: "Maria D'Souza",
                  time: "1 hour ago",
                },
              ].map((report, index) => (
                <motion.div
                  key={index}
                  variants={reportItemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Reported by {report.reporter} • {report.time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" onClick={() => handleRestrictedAction("Verify Report")}>
                        Verify
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="destructive" onClick={() => handleRestrictedAction("Dismiss Report")}>
                        Dismiss
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Incidents */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Active Incidents</CardTitle>
            <CardDescription>Currently monitored hazard events</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={containerVariants} className="space-y-3">
              {[
                {
                  title: "High Tide Alert - Mumbai Coast",
                  details: "15 reports • 3 teams deployed",
                  severity: "destructive",
                  badge: "Critical",
                },
                {
                  title: "Coastal Erosion - Kerala",
                  details: "8 reports • Monitoring",
                  severity: "secondary",
                  badge: "Moderate",
                },
              ].map((incident, index) => (
                <motion.div
                  key={index}
                  variants={reportItemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className={`flex items-center justify-between p-3 bg-${incident.severity}/10 border border-${incident.severity}/20 rounded-lg cursor-pointer`}
                >
                  <div>
                    <p className={`font-medium text-${incident.severity}`}>{incident.title}</p>
                    <p className="text-sm text-muted-foreground">{incident.details}</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Badge variant={incident.severity as any}>{incident.badge}</Badge>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {restrictionPopup.isOpen && (
          <RestrictionPopup
            isOpen={restrictionPopup.isOpen}
            onClose={() => setRestrictionPopup({ isOpen: false, action: "" })}
            action={restrictionPopup.action}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
