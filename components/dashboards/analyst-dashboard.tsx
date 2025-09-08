"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Database, FileText } from "lucide-react"
import { InteractiveMap } from "@/components/map/interactive-map"
import { SocialMediaMonitor } from "@/components/social-media/social-media-monitor"
import { DetailedAnalytics } from "@/components/analytics/detailed-analytics"
import { RestrictionPopup } from "@/components/ui/restriction-popup"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@/app/page"

interface AnalystDashboardProps {
  user: User
}

export function AnalystDashboard({ user }: AnalystDashboardProps) {
  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false)
  const [restrictionPopup, setRestrictionPopup] = useState<{ isOpen: boolean; action: string }>({
    isOpen: false,
    action: "",
  })

  const handleRestrictedAction = (action: string) => {
    if (!user.isVerified && (user.role === "official" || user.role === "analyst")) {
      setRestrictionPopup({ isOpen: true, action })
      return
    }
    if (action === "Open Analytics") {
      setShowDetailedAnalytics(true)
    } else {
      console.log(`[v0] Executing ${action} for verified user`)
    }
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

  const numberCountUp = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
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
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "View comprehensive data insights",
            buttonText: "Open Analytics",
            buttonClass: "w-full",
            iconColor: "text-primary",
            onClick: () => handleRestrictedAction("Open Analytics"),
            isRestricted: true,
          },
          {
            icon: TrendingUp,
            title: "Trend Analysis",
            description: "Identify patterns and trends",
            buttonText: "View Trends",
            buttonClass: "w-full bg-transparent",
            buttonVariant: "outline",
            iconColor: "text-secondary",
          },
          {
            icon: Database,
            title: "Data Export",
            description: "Export data for analysis",
            buttonText: "Export Data",
            buttonClass: "w-full",
            buttonVariant: "secondary",
            iconColor: "text-accent",
            onClick: () => handleRestrictedAction("Export Data"),
            isRestricted: true,
          },
          {
            icon: FileText,
            title: "Generate Reports",
            description: "Create analytical reports",
            buttonText: "New Report",
            buttonClass: "w-full bg-transparent",
            buttonVariant: "outline",
            iconColor: "text-muted-foreground",
            onClick: () => handleRestrictedAction("Generate Report"),
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
                      animate={
                        card.isRestricted
                          ? {
                              scale: [1, 1.05, 1],
                              transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                            }
                          : {}
                      }
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
        <InteractiveMap userRole="analyst" />
      </motion.div>

      {/* Social Media Monitoring Section */}
      <motion.div variants={cardVariants} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <SocialMediaMonitor userRole="analyst" />
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            number: "1,247",
            label: "Total Reports This Month",
            trend: "+12% from last month",
            trendIcon: TrendingUp,
            trendColor: "text-primary",
          },
          {
            number: "89%",
            label: "Verification Accuracy",
            trend: "+3% improvement",
            trendIcon: TrendingUp,
            trendColor: "text-primary",
          },
          {
            number: "23",
            label: "Active Hotspots",
            trend: "Across 8 coastal states",
            trendColor: "text-muted-foreground",
          },
        ].map((stat, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <motion.div variants={numberCountUp}>
                  <CardTitle className="text-2xl">{stat.number}</CardTitle>
                </motion.div>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {stat.trendIcon && (
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                        transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <stat.trendIcon className={`h-4 w-4 ${stat.trendColor}`} />
                    </motion.div>
                  )}
                  <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Analysis */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Recent Analysis</CardTitle>
            <CardDescription>Latest insights and findings</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={containerVariants} className="space-y-3">
              {[
                {
                  title: "Monsoon Impact Analysis - West Coast",
                  time: "Completed 2 hours ago",
                  badge: "High Priority",
                  badgeVariant: "default",
                },
                {
                  title: "Social Media Sentiment Tracking",
                  time: "Updated 4 hours ago",
                  badge: "Routine",
                  badgeVariant: "secondary",
                },
                {
                  title: "Hotspot Prediction Model Update",
                  time: "Completed yesterday",
                  badge: "Completed",
                  badgeVariant: "outline",
                },
              ].map((analysis, index) => (
                <motion.div
                  key={index}
                  variants={reportItemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
                >
                  <div>
                    <p className="font-medium">{analysis.title}</p>
                    <p className="text-sm text-muted-foreground">{analysis.time}</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Badge variant={analysis.badgeVariant as any}>{analysis.badge}</Badge>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showDetailedAnalytics && <DetailedAnalytics onClose={() => setShowDetailedAnalytics(false)} />}
      </AnimatePresence>

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
