"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RestrictionPopupProps {
  isOpen: boolean
  onClose: () => void
  action: string
}

export function RestrictionPopup({ isOpen, onClose, action }: RestrictionPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <CardTitle className="text-lg">Access Restricted</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base">
            You cannot access <strong>{action}</strong> because your account is not verified.
          </CardDescription>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Please contact your administrator to verify your credentials and unlock full access to this feature.
            </p>
          </div>
          <Button onClick={onClose} className="w-full">
            Understood
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
