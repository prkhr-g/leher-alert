"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Eye, Filter, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import type { UserRole } from "@/app/page"

interface HazardReport {
  id: string
  lat: number
  lng: number
  type: "tsunami" | "high-tide" | "erosion" | "storm-surge" | "unusual-waves"
  severity: "low" | "moderate" | "high" | "critical"
  title: string
  description: string
  reportedBy: string
  timestamp: string
  verified: boolean
  location: string
}

interface InteractiveMapProps {
  userRole: UserRole
  className?: string
}

const mockReports: HazardReport[] = [
  {
    id: "1",
    lat: 13.0827,
    lng: 80.2707,
    type: "high-tide",
    severity: "high",
    title: "Unusual high tide at Marina Beach",
    description: "Water levels 1.5m above normal, affecting beachfront areas",
    reportedBy: "Rajesh Kumar",
    timestamp: "2 hours ago",
    verified: true,
    location: "Chennai, Tamil Nadu",
  },
  {
    id: "2",
    lat: 19.076,
    lng: 72.8777,
    type: "storm-surge",
    severity: "critical",
    title: "Storm surge warning - Mumbai Coast",
    description: "Severe weather conditions causing dangerous waves",
    reportedBy: "Priya Sharma",
    timestamp: "30 minutes ago",
    verified: true,
    location: "Mumbai, Maharashtra",
  },
  {
    id: "3",
    lat: 15.2993,
    lng: 74.124,
    type: "erosion",
    severity: "moderate",
    title: "Coastal erosion at Goa beaches",
    description: "Significant sand loss observed over past week",
    reportedBy: "Maria D'Souza",
    timestamp: "1 hour ago",
    verified: false,
    location: "Goa",
  },
  {
    id: "4",
    lat: 11.2588,
    lng: 75.7804,
    type: "unusual-waves",
    severity: "moderate",
    title: "Irregular wave patterns near Kozhikode",
    description: "Fishermen report unusual wave behavior",
    reportedBy: "Arjun Nair",
    timestamp: "3 hours ago",
    verified: true,
    location: "Kerala",
  },
  {
    id: "5",
    lat: 19.8762,
    lng: 85.8245,
    type: "tsunami",
    severity: "low",
    title: "Minor seismic activity detected",
    description: "Small tremors felt, monitoring for potential tsunami risk",
    reportedBy: "Amit Singh",
    timestamp: "45 minutes ago",
    verified: false,
    location: "Puri, Odisha",
  },
  {
    id: "6",
    lat: 22.3072,
    lng: 70.8022,
    type: "high-tide",
    severity: "moderate",
    title: "Elevated tide levels at Kandla Port",
    description: "Port operations slightly affected by higher than normal tides",
    reportedBy: "Vikram Patel",
    timestamp: "1.5 hours ago",
    verified: true,
    location: "Kandla, Gujarat",
  },
  {
    id: "7",
    lat: 17.6868,
    lng: 83.2185,
    type: "erosion",
    severity: "high",
    title: "Severe beach erosion at Visakhapatnam",
    description: "Coastal road infrastructure at risk due to rapid erosion",
    reportedBy: "Lakshmi Devi",
    timestamp: "4 hours ago",
    verified: true,
    location: "Visakhapatnam, Andhra Pradesh",
  },
  {
    id: "8",
    lat: 12.9716,
    lng: 77.5946,
    type: "storm-surge",
    severity: "low",
    title: "Minor surge activity near Mangalore",
    description: "Small waves affecting fishing activities",
    reportedBy: "Suresh Rao",
    timestamp: "6 hours ago",
    verified: false,
    location: "Mangalore, Karnataka",
  },
  {
    id: "9",
    lat: 8.5241,
    lng: 76.9366,
    type: "unusual-waves",
    severity: "critical",
    title: "Dangerous wave conditions at Kovalam",
    description: "Tourist areas evacuated due to unpredictable wave patterns",
    reportedBy: "Ravi Menon",
    timestamp: "20 minutes ago",
    verified: true,
    location: "Kovalam, Kerala",
  },
  {
    id: "10",
    lat: 21.3099,
    lng: 70.1322,
    type: "tsunami",
    severity: "moderate",
    title: "Seismic monitoring alert - Dwarka coast",
    description: "Underwater seismic activity detected, monitoring for tsunami risk",
    reportedBy: "Harsh Joshi",
    timestamp: "1 hour ago",
    verified: true,
    location: "Dwarka, Gujarat",
  },
]

const severityColors = {
  low: "#10b981", // emerald-500
  moderate: "#f59e0b", // amber-500
  high: "#ef4444", // red-500
  critical: "#dc2626", // red-600
}

const typeIcons = {
  tsunami: "🌊",
  "high-tide": "🌊",
  erosion: "🏖️",
  "storm-surge": "⛈️",
  "unusual-waves": "〰️",
}

export function InteractiveMap({ userRole, className }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const filteredReports = mockReports.filter((report) => {
    if (filterType !== "all" && report.type !== filterType) return false
    if (filterSeverity !== "all" && report.severity !== filterSeverity) return false
    if (showVerifiedOnly && !report.verified) return false
    return true
  })

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.5))
  }

  const handleResetView = () => {
    setZoomLevel(1)
    setPanX(0)
    setPanY(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPanX(e.clientX - dragStart.x)
    setPanY(e.clientY - dragStart.y)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (mapRef.current) {
      console.log("[v0] Interactive coastal map initialized with zoom controls")
    }
  }, [])

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Interactive Coastal Map - India
              </CardTitle>
              <CardDescription>Zoom and analyze hazards across Indian coastal regions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredReports.length} of {mockReports.length} reports
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Type:</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tsunami">Tsunami</SelectItem>
                  <SelectItem value="high-tide">High Tide</SelectItem>
                  <SelectItem value="erosion">Erosion</SelectItem>
                  <SelectItem value="storm-surge">Storm Surge</SelectItem>
                  <SelectItem value="unusual-waves">Unusual Waves</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Severity:</label>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {userRole !== "citizen" && (
              <div className="flex items-center gap-2">
                <Button
                  variant={showVerifiedOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Verified Only
                </Button>
              </div>
            )}

            <div className="flex items-center gap-1 ml-auto">
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleResetView}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground ml-2">{Math.round(zoomLevel * 100)}%</span>
            </div>
          </div>

          <div
            ref={mapRef}
            className="w-full h-96 border-2 border-primary/20 rounded-lg relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px)`,
                backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/India-Coastal-Plains-1531x15362-lmvTauHYTphEvMsGViaFjaMKvNJD5P.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute left-[15%] top-[35%] w-8 h-8 bg-red-500/40 rounded-full animate-pulse"></div>
              <div className="absolute left-[15%] top-[35%] w-12 h-12 bg-red-500/20 rounded-full animate-pulse"></div>

              <div className="absolute right-[25%] bottom-[25%] w-6 h-6 bg-orange-500/40 rounded-full animate-pulse"></div>
              <div className="absolute right-[25%] bottom-[25%] w-10 h-10 bg-orange-500/20 rounded-full animate-pulse"></div>

              <div className="absolute left-[20%] bottom-[15%] w-7 h-7 bg-red-500/40 rounded-full animate-pulse"></div>
              <div className="absolute left-[20%] bottom-[15%] w-11 h-11 bg-red-500/20 rounded-full animate-pulse"></div>

              <div className="absolute right-[15%] top-[20%] w-5 h-5 bg-yellow-500/40 rounded-full animate-pulse"></div>
              <div className="absolute right-[15%] top-[20%] w-9 h-9 bg-yellow-500/20 rounded-full animate-pulse"></div>
            </div>

            {filteredReports.map((report, index) => {
              const coastalPositions = [
                { left: "62%", top: "65%" }, // Chennai - Moved further inland from coast
                { left: "30%", top: "45%" }, // Mumbai - Moved inland from Konkan Coast
                { left: "32%", top: "55%" }, // Goa - Positioned within land boundary
                { left: "35%", top: "75%" }, // Kerala - Well within Malabar land area
                { left: "72%", top: "32%" }, // Puri, Odisha - Inland from Utkal Coast
                { left: "25%", top: "28%" }, // Kandla, Gujarat - Within Kachchh land area
                { left: "67%", top: "45%" }, // Visakhapatnam - Inland from Northern Circar
                { left: "38%", top: "65%" }, // Mangalore - Within Kannad land boundary
                { left: "35%", top: "80%" }, // Kovalam, Kerala - Deep within land area
                { left: "28%", top: "35%" }, // Dwarka, Gujarat - Within Kathiawar peninsula land
              ]

              const position = coastalPositions[index] || { left: `${20 + index * 8}%`, top: `${30 + index * 6}%` }

              return (
                <div
                  key={report.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 z-10"
                  style={{
                    ...position,
                    transform: `scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px) translate(-50%, -50%)`,
                  }}
                  onClick={() => setSelectedReport(report)}
                >
                  <div
                    className="w-7 h-7 rounded-full border-3 border-white shadow-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: severityColors[report.severity] }}
                  >
                    {typeIcons[report.type]}
                  </div>
                  {report.severity === "critical" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  )}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    {report.location.split(",")[0]}
                  </div>
                </div>
              )
            })}

            {zoomLevel === 1 && panX === 0 && panY === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-center z-0">
                <div>
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-80" />
                  <p className="text-lg font-medium">Interactive Indian Coastal Map</p>
                  <p className="text-sm">Zoom in/out • Click and drag to pan • Click markers for details</p>
                  <p className="text-xs mt-2">Covering all major coastal regions from Kachchh to Utkal Coast</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>{typeIcons[selectedReport.type]}</span>
                {selectedReport.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={selectedReport.severity === "critical" ? "destructive" : "secondary"}
                  style={{
                    backgroundColor:
                      selectedReport.severity === "critical" ? undefined : severityColors[selectedReport.severity],
                    color: "white",
                  }}
                >
                  {selectedReport.severity.toUpperCase()}
                </Badge>
                {selectedReport.verified && (
                  <Badge variant="outline" className="text-primary border-primary">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <CardDescription>{selectedReport.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm">{selectedReport.description}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Reported by: {selectedReport.reportedBy}</span>
                <span>{selectedReport.timestamp}</span>
              </div>
              {userRole !== "citizen" && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  {!selectedReport.verified && (
                    <>
                      <Button size="sm">Verify Report</Button>
                      <Button size="sm" variant="destructive">
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interactive Map Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: severityColors.low }}></div>
              <span className="text-sm">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: severityColors.moderate }}></div>
              <span className="text-sm">Moderate Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: severityColors.high }}></div>
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: severityColors.critical }}></div>
              <span className="text-sm">Critical Risk</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Coastal Regions Covered:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
              <span>• Kachchh</span>
              <span>• Kathiawar</span>
              <span>• Konkan Coast</span>
              <span>• Kannad Coast</span>
              <span>• Malabar Coast</span>
              <span>• Coromandel Coast</span>
              <span>• Northern Circar</span>
              <span>• Utkal Coast</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
