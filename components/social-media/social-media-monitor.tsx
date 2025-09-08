"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Share, TrendingUp, Search } from "lucide-react"
import type { UserRole } from "@/app/page"

interface SocialMediaPost {
  id: string
  platform: "twitter" | "facebook" | "youtube"
  author: string
  handle: string
  content: string
  timestamp: string
  location: string
  sentiment: "positive" | "negative" | "neutral" | "urgent"
  hazardType: string
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  verified: boolean
  keywords: string[]
}

interface SocialMediaMonitorProps {
  userRole: UserRole
  className?: string
}

const mockPosts: SocialMediaPost[] = [
  {
    id: "1",
    platform: "twitter",
    author: "Coastal Watch Mumbai",
    handle: "@CoastalMumbai",
    content:
      "🚨 URGENT: Massive waves hitting Marine Drive right now! Water overflowing onto the road. Stay away from the coast! #MumbaiFloods #HighTide #Emergency",
    timestamp: "2 minutes ago",
    location: "Mumbai, Maharashtra",
    sentiment: "urgent",
    hazardType: "high-tide",
    engagement: { likes: 234, shares: 89, comments: 45 },
    verified: true,
    keywords: ["urgent", "massive waves", "marine drive", "flooding"],
  },
  {
    id: "2",
    platform: "facebook",
    author: "Chennai Weather Updates",
    handle: "ChennaiWeather",
    content:
      "Marina Beach experiencing unusual wave patterns since morning. Fishermen advised to avoid going out to sea. Local authorities monitoring the situation closely.",
    timestamp: "15 minutes ago",
    location: "Chennai, Tamil Nadu",
    sentiment: "negative",
    hazardType: "unusual-waves",
    engagement: { likes: 156, shares: 23, comments: 67 },
    verified: true,
    keywords: ["marina beach", "unusual waves", "fishermen", "authorities"],
  },
  {
    id: "3",
    platform: "youtube",
    author: "Goa Beach Vlogs",
    handle: "@GoaBeachLife",
    content:
      "Day 3 of documenting the coastal erosion at Calangute Beach. The situation is getting worse each day. Local businesses are really worried about the upcoming tourist season.",
    timestamp: "1 hour ago",
    location: "Goa",
    sentiment: "negative",
    hazardType: "erosion",
    engagement: { likes: 89, shares: 12, comments: 34 },
    verified: false,
    keywords: ["coastal erosion", "calangute beach", "businesses", "tourist season"],
  },
  {
    id: "4",
    platform: "twitter",
    author: "Kerala Fishermen Union",
    handle: "@KeralaFishers",
    content:
      "All fishing boats returned safely to Kochi harbor. Rough sea conditions expected to continue for next 48 hours. Community staying alert and prepared. 🙏",
    timestamp: "45 minutes ago",
    location: "Kochi, Kerala",
    sentiment: "positive",
    hazardType: "storm-surge",
    engagement: { likes: 445, shares: 156, comments: 78 },
    verified: true,
    keywords: ["fishing boats", "kochi harbor", "rough sea", "community prepared"],
  },
  {
    id: "5",
    platform: "facebook",
    author: "Puri Tourism Board",
    handle: "PuriTourism",
    content:
      "Minor tremors felt this morning near the coast. No tsunami threat detected by INCOIS. Beaches remain open but visitors advised to stay cautious and follow lifeguard instructions.",
    timestamp: "3 hours ago",
    location: "Puri, Odisha",
    sentiment: "neutral",
    hazardType: "tsunami",
    engagement: { likes: 67, shares: 34, comments: 23 },
    verified: true,
    keywords: ["tremors", "tsunami", "INCOIS", "beaches open", "lifeguard"],
  },
]

const platformIcons = {
  twitter: "🐦",
  facebook: "📘",
  youtube: "📺",
}

const sentimentColors = {
  positive: "bg-green-500",
  negative: "bg-orange-500",
  neutral: "bg-gray-500",
  urgent: "bg-red-500",
}

const trendingKeywords = [
  { keyword: "high tide", mentions: 234, trend: "up" },
  { keyword: "marina beach", mentions: 189, trend: "up" },
  { keyword: "coastal erosion", mentions: 156, trend: "stable" },
  { keyword: "fishing boats", mentions: 134, trend: "down" },
  { keyword: "emergency", mentions: 98, trend: "up" },
  { keyword: "tsunami warning", mentions: 67, trend: "stable" },
]

export function SocialMediaMonitor({ userRole, className }: SocialMediaMonitorProps) {
  const [posts, setPosts] = useState<SocialMediaPost[]>(mockPosts)
  const [filteredPosts, setFilteredPosts] = useState<SocialMediaPost[]>(mockPosts)
  const [filterPlatform, setFilterPlatform] = useState<string>("all")
  const [filterSentiment, setFilterSentiment] = useState<string>("all")
  const [filterLocation, setFilterLocation] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new posts arriving
      if (Math.random() > 0.7) {
        const newPost: SocialMediaPost = {
          id: Date.now().toString(),
          platform: ["twitter", "facebook", "youtube"][Math.floor(Math.random() * 3)] as any,
          author: "Live Update",
          handle: "@LiveCoastal",
          content: "New hazard report detected via social media monitoring...",
          timestamp: "Just now",
          location: "Various Locations",
          sentiment: ["positive", "negative", "neutral", "urgent"][Math.floor(Math.random() * 4)] as any,
          hazardType: "monitoring",
          engagement: {
            likes: Math.floor(Math.random() * 100),
            shares: Math.floor(Math.random() * 50),
            comments: Math.floor(Math.random() * 30),
          },
          verified: Math.random() > 0.5,
          keywords: ["live", "monitoring", "update"],
        }
        setPosts((prev) => [newPost, ...prev.slice(0, 9)]) // Keep only 10 posts
      }
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = posts

    if (filterPlatform !== "all") {
      filtered = filtered.filter((post) => post.platform === filterPlatform)
    }

    if (filterSentiment !== "all") {
      filtered = filtered.filter((post) => post.sentiment === filterSentiment)
    }

    if (filterLocation !== "all") {
      filtered = filtered.filter((post) => post.location.toLowerCase().includes(filterLocation.toLowerCase()))
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [posts, filterPlatform, filterSentiment, filterLocation, searchQuery])

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Social Media Monitoring
              </CardTitle>
              <CardDescription>Real-time hazard discussions across social platforms</CardDescription>
            </div>
            <Badge variant="outline" className="animate-pulse">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48"
              />
            </div>

            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSentiment} onValueChange={setFilterSentiment}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiment</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by location..."
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-40"
            />
          </div>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Live Posts ({filteredPosts.length})</TabsTrigger>
              <TabsTrigger value="trends">Trending Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border-l-4"
                  style={{
                    borderLeftColor:
                      post.sentiment === "urgent"
                        ? "#dc2626"
                        : post.sentiment === "negative"
                          ? "#ea580c"
                          : post.sentiment === "positive"
                            ? "#059669"
                            : "#6b7280",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{platformIcons[post.platform]}</span>
                        <div>
                          <p className="font-medium text-sm">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.handle}</p>
                        </div>
                        {post.verified && (
                          <Badge variant="outline" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        <p className="text-xs text-muted-foreground">{post.location}</p>
                      </div>
                    </div>

                    <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.engagement.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share className="h-3 w-3" />
                          {post.engagement.shares}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.engagement.comments}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs text-white border-0 ${sentimentColors[post.sentiment]}`}
                        >
                          {post.sentiment.toUpperCase()}
                        </Badge>
                        {userRole !== "citizen" && (
                          <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                            Analyze
                          </Button>
                        )}
                      </div>
                    </div>

                    {post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingKeywords.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">#{item.keyword}</p>
                          <p className="text-sm text-muted-foreground">{item.mentions} mentions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp
                            className={`h-4 w-4 ${
                              item.trend === "up"
                                ? "text-green-500"
                                : item.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          />
                          <Badge
                            variant={
                              item.trend === "up" ? "default" : item.trend === "down" ? "destructive" : "secondary"
                            }
                          >
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
