"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Heart, MapPin } from "lucide-react"
import { InteractiveMap } from "@/components/map/interactive-map"
import { ReportSubmissionForm } from "@/components/reports/report-submission-form"
import { motion, AnimatePresence } from "framer-motion"
import type { User } from "@/app/page"

interface CitizenDashboardProps {
  user: User
}

export function CitizenDashboard({ user }: CitizenDashboardProps) {
  const [showReportForm, setShowReportForm] = useState(false)
  const [userReports, setUserReports] = useState([
    {
      id: "1",
      title: "High waves near Marina Beach",
      timestamp: "2 hours ago",
      status: "Under Review",
    },
    {
      id: "2",
      title: "Coastal erosion at Kovalam",
      timestamp: "yesterday",
      status: "Verified",
    },
  ])

  const handleReportSubmit = (newReport: any) => {
    setUserReports((prev) => [
      {
        id: newReport.id,
        title: newReport.title,
        timestamp: "Just now",
        status: "Under Review",
      },
      ...prev,
    ])
    setShowReportForm(false)
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
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
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
            icon: AlertTriangle,
            title: "Submit Report",
            description: "Report ocean hazards in your area",
            buttonText: "Report Hazard",
            buttonClass: "w-full bg-red-600 hover:bg-red-700 text-white",
            iconColor: "text-destructive",
            onClick: () => setShowReportForm(true),
          },
          {
            icon: Phone,
            title: "Emergency Helpline",
            description: "24/7 emergency assistance",
            buttonText: "Call Now",
            buttonClass: "w-full bg-transparent",
            buttonVariant: "outline",
            iconColor: "text-primary",
          },
          {
            icon: Heart,
            title: "Feedback & Donate",
            description: "Support the Victims",
            buttonText: "Contribute",
            buttonClass: "w-full",
            buttonVariant: "secondary",
            iconColor: "text-secondary",
          },
          {
            icon: MapPin,
            title: "Rescue Camps",
            description: "Find nearby safe locations",
            buttonText: "Find Camps",
            buttonClass: "w-full bg-transparent",
            buttonVariant: "outline",
            iconColor: "text-accent",
          },
        ].map((card, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
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
        <InteractiveMap userRole="citizen" />
      </motion.div>

      {/* Recent Reports */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Your Recent Reports</CardTitle>
            <CardDescription>Track the status of your submitted reports</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={containerVariants} className="space-y-3">
              <AnimatePresence>
                {userReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    variants={reportItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">Submitted {report.timestamp}</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Badge variant={report.status === "Verified" ? "default" : "secondary"}>{report.status}</Badge>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Local Alerts */}
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Local Alerts - {user.location}</CardTitle>
            <CardDescription>Current hazard warnings in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={containerVariants} className="space-y-3">
              {[
                {
                  type: "High Tide Warning",
                  message: "Expected high tide of 2.1m at 3:30 PM today",
                  severity: "destructive",
                },
                {
                  type: "Moderate Wave Activity",
                  message: "Wave heights 1.5-2m expected through evening",
                  severity: "secondary",
                },
              ].map((alert, index) => (
                <motion.div
                  key={index}
                  variants={reportItemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className={`flex items-start gap-3 p-3 bg-${alert.severity}/10 border border-${alert.severity}/20 rounded-lg cursor-pointer`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    <AlertTriangle className={`h-5 w-5 text-${alert.severity} mt-0.5`} />
                  </motion.div>
                  <div>
                    <p className={`font-medium text-${alert.severity}`}>{alert.type}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showReportForm && (
          <ReportSubmissionForm user={user} onClose={() => setShowReportForm(false)} onSubmit={handleReportSubmit} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
