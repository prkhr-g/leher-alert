"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Camera, Video, X, Upload, Loader2, CheckCircle } from "lucide-react"
import type { User } from "@/app/page"

interface ReportSubmissionFormProps {
  user: User
  onClose: () => void
  onSubmit: (report: any) => void
}

interface LocationData {
  lat: number
  lng: number
  address: string
}

export function ReportSubmissionForm({ user, onClose, onSubmit }: ReportSubmissionFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    severity: "",
    description: "",
    location: "",
    customLocation: "",
  })
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const hazardTypes = [
    { value: "tsunami", label: "Tsunami Warning", icon: "🌊" },
    { value: "high-tide", label: "High Tide", icon: "🌊" },
    { value: "storm-surge", label: "Storm Surge", icon: "⛈️" },
    { value: "erosion", label: "Coastal Erosion", icon: "🏖️" },
    { value: "unusual-waves", label: "Unusual Wave Activity", icon: "〰️" },
    { value: "other", label: "Other Ocean Hazard", icon: "⚠️" },
  ]

  const severityLevels = [
    { value: "low", label: "Low Risk", color: "bg-green-500" },
    { value: "moderate", label: "Moderate Risk", color: "bg-yellow-500" },
    { value: "high", label: "High Risk", color: "bg-orange-500" },
    { value: "critical", label: "Critical Risk", color: "bg-red-500" },
  ]

  const getCurrentLocation = () => {
    setIsGettingLocation(true)

    // Simulate geolocation API
    setTimeout(() => {
      const mockLocations = [
        { lat: 13.0827, lng: 80.2707, address: "Marina Beach, Chennai, Tamil Nadu" },
        { lat: 19.076, lng: 72.8777, address: "Marine Drive, Mumbai, Maharashtra" },
        { lat: 15.2993, lng: 74.124, address: "Calangute Beach, Goa" },
        { lat: 11.2588, lng: 75.7804, address: "Kozhikode Beach, Kerala" },
      ]

      const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)]
      setCurrentLocation(randomLocation)
      setFormData((prev) => ({ ...prev, location: randomLocation.address }))
      setIsGettingLocation(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      const newReport = {
        id: Date.now().toString(),
        ...formData,
        location: formData.location || formData.customLocation,
        coordinates: currentLocation,
        files: uploadedFiles,
        reportedBy: user.name,
        timestamp: new Date().toISOString(),
        verified: false,
      }

      onSubmit(newReport)
      setIsSubmitting(false)
      setSubmitted(true)

      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Report Submitted Successfully!</h3>
            <p className="text-muted-foreground mb-4">
              Your hazard report has been received and will be reviewed by our emergency response team.
            </p>
            <Badge variant="secondary">Report ID: #{Date.now().toString().slice(-6)}</Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Report Ocean Hazard
              </CardTitle>
              <CardDescription>Help protect your community by reporting ocean hazards in your area</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hazard Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Hazard Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of ocean hazard" />
                </SelectTrigger>
                <SelectContent>
                  {hazardTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the hazard"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label htmlFor="severity">Severity Level *</Label>
              <Select
                value={formData.severity}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How severe is this hazard?" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                        {level.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location *</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-2 bg-transparent"
                >
                  {isGettingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                  {isGettingLocation ? "Getting Location..." : "Use Current Location"}
                </Button>
              </div>

              {currentLocation && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-primary">Current Location Detected:</p>
                  <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="customLocation">Or enter location manually:</Label>
                <Input
                  id="customLocation"
                  placeholder="e.g., Marina Beach, Chennai"
                  value={formData.customLocation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customLocation: e.target.value }))}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what you observed, when it started, current conditions, etc."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Photos & Videos (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload photos or videos of the hazard</p>
                  <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, MP4, MOV files</p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files:</Label>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <Camera className="h-4 w-4 text-primary" />
                        ) : (
                          <Video className="h-4 w-4 text-primary" />
                        )}
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </Badge>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  isSubmitting ||
                  !formData.title ||
                  !formData.type ||
                  !formData.severity ||
                  !formData.description ||
                  (!formData.location && !formData.customLocation)
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
