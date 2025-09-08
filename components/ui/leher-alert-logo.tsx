interface LeherAlertLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LeherAlertLogo({ className = "", size = "md" }: LeherAlertLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ocean Wave Base */}
      <path
        d="M10 60 Q25 45 40 60 T70 60 Q85 45 100 60 L100 85 Q85 70 70 85 T40 85 Q25 70 10 85 Z"
        fill="currentColor"
        className="text-primary"
        opacity="0.8"
      />

      {/* Second Wave Layer */}
      <path
        d="M5 70 Q20 55 35 70 T65 70 Q80 55 95 70 L95 90 Q80 75 65 90 T35 90 Q20 75 5 90 Z"
        fill="currentColor"
        className="text-primary"
        opacity="0.6"
      />

      {/* Alert Triangle */}
      <path d="M45 15 L35 35 L55 35 Z" fill="currentColor" className="text-red-500" />

      {/* Alert Triangle Inner */}
      <circle cx="45" cy="28" r="2" fill="white" />
      <rect x="44" y="22" width="2" height="4" fill="white" rx="1" />

      {/* Wave Foam/Spray */}
      <circle cx="25" cy="50" r="3" fill="currentColor" className="text-primary" opacity="0.4" />
      <circle cx="35" cy="48" r="2" fill="currentColor" className="text-primary" opacity="0.4" />
      <circle cx="65" cy="52" r="2.5" fill="currentColor" className="text-primary" opacity="0.4" />
      <circle cx="75" cy="49" r="2" fill="currentColor" className="text-primary" opacity="0.4" />
    </svg>
  )
}
