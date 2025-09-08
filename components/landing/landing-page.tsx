"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, MapPin, Users, AlertTriangle, Smartphone, BarChart3, Eye, Clock } from "lucide-react"
import { LeherAlertLogo } from "@/components/ui/leher-alert-logo"
import { motion } from "framer-motion"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <LeherAlertLogo className="text-primary" size="md" />
            <span className="text-2xl font-bold text-foreground">LeherAlert</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={onGetStarted} className="bg-red-600 hover:bg-red-700 text-white">
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Badge variant="secondary" className="mb-4">
              Ocean Hazard Monitoring Platform
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-balance"
          >
            Protecting India's <span className="text-primary">Coastal Communities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty"
          >
            Real-time ocean hazard monitoring and early warning system powered by citizen reports, official validation,
            and AI-driven insights for India's coastal areas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" onClick={onGetStarted} className="bg-red-600 hover:bg-red-700 text-white text-lg px-8">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Emergency
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                <Eye className="mr-2 h-5 w-5" />
                View Live Map
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Comprehensive Hazard Management</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From citizen reporting to official response coordination, LeherAlert provides end-to-end ocean hazard
              monitoring for coastal safety.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Users,
                title: "Citizen Reporting",
                description:
                  "Geotagged incident reports with photos and videos from coastal communities. Real-time crowdsourced data for immediate hazard detection.",
                color: "border-l-primary",
                iconColor: "text-primary",
              },
              {
                icon: Shield,
                title: "Official Validation",
                description:
                  "Emergency officials verify reports, coordinate rescue operations, and issue early warnings through integrated dashboards.",
                color: "border-l-secondary",
                iconColor: "text-secondary",
              },
              {
                icon: BarChart3,
                title: "AI-Powered Analytics",
                description:
                  "Advanced analytics with sentiment analysis, hotspot generation, and trend detection from social media and citizen reports.",
                color: "border-l-accent",
                iconColor: "text-accent",
              },
              {
                icon: MapPin,
                title: "Interactive Maps",
                description:
                  "Real-time visualization of hazards across Indian coastal areas with dynamic hotspots and incident tracking.",
                color: "border-l-primary",
                iconColor: "text-primary",
              },
              {
                icon: Smartphone,
                title: "Multi-Platform Access",
                description:
                  "Web and mobile applications with offline support for continuous monitoring even without internet connectivity.",
                color: "border-l-secondary",
                iconColor: "text-secondary",
              },
              {
                icon: Clock,
                title: "Early Warning System",
                description:
                  "Integration with INCOIS, MoES, NDMA, and IMD for comprehensive tsunami and storm surge early warnings.",
                color: "border-l-accent",
                iconColor: "text-accent",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`border-l-4 ${feature.color} h-full`}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "7,500+", label: "Kilometers of Coastline Monitored", color: "text-primary" },
              { number: "12", label: "Coastal States Covered", color: "text-secondary" },
              { number: "24/7", label: "Real-time Monitoring", color: "text-accent" },
              { number: "4", label: "Government Agencies Integrated", color: "text-primary" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`text-3xl font-bold ${stat.color} mb-2`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Enhance Coastal Safety?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Join thousands of citizens, officials, and analysts working together to protect India's coastal communities
            from ocean hazards.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" onClick={onGetStarted} className="bg-red-600 hover:bg-red-700 text-white text-lg px-8">
                <Users className="mr-2 h-5 w-5" />
                Join as Citizen
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" onClick={onGetStarted} className="text-lg px-8 bg-transparent">
                <Shield className="mr-2 h-5 w-5" />
                Official Access
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-card border-t py-12 px-4"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <LeherAlertLogo className="text-primary" size="sm" />
                <span className="text-xl font-bold">LeherAlert</span>
              </div>
              <p className="text-muted-foreground">
                Protecting India's coastal communities through advanced ocean hazard monitoring and early warning
                systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Citizen Reporting</li>
                <li>Official Dashboard</li>
                <li>Analytics Portal</li>
                <li>Mobile App</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Partners</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>INCOIS</li>
                <li>MoES</li>
                <li>NDMA</li>
                <li>IMD</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Report Hazard</li>
                <li>Emergency Contacts</li>
                <li>Rescue Centers</li>
                <li>Live Alerts</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 LeherAlert. Protecting coastal communities across India.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
