"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, AlertTriangle, Users, MapPin, Download, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DetailedAnalyticsProps {
  onClose: () => void
}

// Mock analytics data
const monthlyReports = [
  { month: "Jan", reports: 145, verified: 128, false_alarms: 17 },
  { month: "Feb", reports: 189, verified: 167, false_alarms: 22 },
  { month: "Mar", reports: 234, verified: 201, false_alarms: 33 },
  { month: "Apr", reports: 298, verified: 267, false_alarms: 31 },
  { month: "May", reports: 356, verified: 312, false_alarms: 44 },
  { month: "Jun", reports: 423, verified: 378, false_alarms: 45 },
]

const hazardTypeData = [
  { name: "High Tide", value: 35, color: "#059669" },
  { name: "Storm Surge", value: 28, color: "#dc2626" },
  { name: "Coastal Erosion", value: 18, color: "#ea580c" },
  { name: "Unusual Waves", value: 12, color: "#0891b2" },
  { name: "Tsunami Warning", value: 7, color: "#7c3aed" },
]

const stateWiseData = [
  { state: "Maharashtra", reports: 234, hotspots: 8, population_affected: 45000 },
  { state: "Tamil Nadu", reports: 189, hotspots: 6, population_affected: 38000 },
  { state: "Kerala", reports: 156, hotspots: 5, population_affected: 29000 },
  { state: "Goa", reports: 98, hotspots: 3, population_affected: 15000 },
  { state: "Odisha", reports: 87, hotspots: 4, population_affected: 22000 },
  { state: "West Bengal", reports: 76, hotspots: 3, population_affected: 18000 },
]

const responseTimeData = [
  { hour: "00:00", avg_response: 12, target: 15 },
  { hour: "04:00", avg_response: 8, target: 15 },
  { hour: "08:00", avg_response: 18, target: 15 },
  { hour: "12:00", avg_response: 22, target: 15 },
  { hour: "16:00", avg_response: 25, target: 15 },
  { hour: "20:00", avg_response: 19, target: 15 },
]

const sentimentTrend = [
  { date: "2024-01-01", positive: 45, negative: 35, neutral: 20 },
  { date: "2024-01-02", positive: 42, negative: 38, neutral: 20 },
  { date: "2024-01-03", positive: 38, negative: 45, neutral: 17 },
  { date: "2024-01-04", positive: 35, negative: 48, neutral: 17 },
  { date: "2024-01-05", positive: 40, negative: 42, neutral: 18 },
  { date: "2024-01-06", positive: 48, negative: 35, neutral: 17 },
  { date: "2024-01-07", positive: 52, negative: 30, neutral: 18 },
]

export function DetailedAnalytics({ onClose }: DetailedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedState, setSelectedState] = useState("all")

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-[100] overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-7xl bg-background rounded-lg shadow-xl my-8 max-h-[90vh] overflow-hidden flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between p-6 border-b bg-background sticky top-0 z-10"
          >
            <div>
              <h2 className="text-2xl font-bold">Comprehensive Analytics Dashboard</h2>
              <p className="text-muted-foreground">
                Deep insights into ocean hazard patterns and response effectiveness
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={onClose}>
                  <X className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="p-6 overflow-y-auto flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="geographic">Geographic</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="overview" className="space-y-6">
                {/* Key Performance Indicators */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  {[
                    {
                      title: "Total Reports",
                      value: "1,645",
                      icon: TrendingUp,
                      badge: "+23%",
                      badgeText: "vs last period",
                      color: "text-primary",
                    },
                    {
                      title: "Verification Rate",
                      value: "89.2%",
                      icon: AlertTriangle,
                      badge: "+3.1%",
                      badgeText: "accuracy improved",
                      color: "text-secondary",
                    },
                    {
                      title: "Avg Response Time",
                      value: "16.8m",
                      icon: Users,
                      badge: "+2.3m",
                      badgeText: "needs improvement",
                      color: "text-accent",
                      badgeVariant: "destructive",
                    },
                    {
                      title: "Active Hotspots",
                      value: "29",
                      icon: MapPin,
                      badge: "8 states",
                      badgeText: "monitored",
                      color: "text-destructive",
                      badgeVariant: "outline",
                    },
                  ].map((kpi, index) => (
                    <motion.div key={index} variants={cardVariants}>
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{kpi.title}</p>
                              <motion.p variants={numberCountUp} className={`text-2xl font-bold ${kpi.color}`}>
                                {kpi.value}
                              </motion.p>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                            </motion.div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={kpi.badgeVariant || "secondary"} className="text-xs">
                              {kpi.badge}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{kpi.badgeText}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Monthly Reports Chart */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Monthly Report Trends</CardTitle>
                      <CardDescription>Report submissions and verification rates over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={monthlyReports}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Bar dataKey="reports" fill="#059669" name="Total Reports" />
                            <Bar dataKey="verified" fill="#10b981" name="Verified" />
                            <Bar dataKey="false_alarms" fill="#ef4444" name="False Alarms" />
                          </BarChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Hazard Type Distribution */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Hazard Type Distribution</CardTitle>
                      <CardDescription>Breakdown of reported hazard types</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={hazardTypeData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                              animationBegin={800}
                              animationDuration={1000}
                            >
                              {hazardTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Response Time Analysis</CardTitle>
                      <CardDescription>Average response times throughout the day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={responseTimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="avg_response"
                              stroke="#059669"
                              name="Avg Response (min)"
                              strokeWidth={3}
                              dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                              animationDuration={1500}
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="#ef4444"
                              strokeDasharray="5 5"
                              name="Target (15 min)"
                              strokeWidth={2}
                              animationDuration={1500}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="geographic" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>State-wise Analysis</CardTitle>
                      <CardDescription>Reports and impact by coastal states</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                        {stateWiseData.map((state, index) => (
                          <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              transition: { duration: 0.2 },
                            }}
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{state.state}</p>
                              <p className="text-sm text-muted-foreground">
                                {state.reports} reports • {state.hotspots} hotspots
                              </p>
                            </div>
                            <div className="text-right">
                              <motion.p
                                className="font-medium"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                              >
                                {state.population_affected.toLocaleString()}
                              </motion.p>
                              <p className="text-sm text-muted-foreground">people affected</p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="response" className="space-y-6">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <motion.div variants={cardVariants}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Response Effectiveness</CardTitle>
                        <CardDescription>Team deployment and resolution metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { label: "Critical Incidents Resolved", value: "94%", variant: "default" },
                            { label: "Teams Currently Deployed", value: "12", variant: "secondary" },
                            { label: "Average Resolution Time", value: "2.3 hours", variant: "outline" },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="flex justify-between items-center"
                            >
                              <span>{item.label}</span>
                              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Badge variant={item.variant as any}>{item.value}</Badge>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardVariants}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Resource Utilization</CardTitle>
                        <CardDescription>Equipment and personnel deployment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { label: "Rescue Boats Active", value: "8/15", variant: "default" },
                            { label: "Emergency Personnel", value: "156", variant: "secondary" },
                            { label: "Evacuation Centers Open", value: "23", variant: "outline" },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="flex justify-between items-center"
                            >
                              <span>{item.label}</span>
                              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Badge variant={item.variant as any}>{item.value}</Badge>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Social Media Sentiment Trends</CardTitle>
                      <CardDescription>Public sentiment analysis over the past week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={sentimentTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="positive"
                              stackId="1"
                              stroke="#059669"
                              fill="#059669"
                              animationDuration={1500}
                            />
                            <Area
                              type="monotone"
                              dataKey="neutral"
                              stackId="1"
                              stroke="#6b7280"
                              fill="#6b7280"
                              animationDuration={1500}
                            />
                            <Area
                              type="monotone"
                              dataKey="negative"
                              stackId="1"
                              stroke="#ef4444"
                              fill="#ef4444"
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {[
                    { value: "2,847", label: "Total Social Mentions", color: "text-primary" },
                    { value: "67%", label: "Positive Sentiment", color: "text-secondary" },
                    { value: "156", label: "Trending Keywords", color: "text-accent" },
                  ].map((metric, index) => (
                    <motion.div key={index} variants={cardVariants}>
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <motion.p
                              className={`text-2xl font-bold ${metric.color}`}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: index * 0.2 + 0.5,
                                type: "spring",
                                stiffness: 200,
                              }}
                            >
                              {metric.value}
                            </motion.p>
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
