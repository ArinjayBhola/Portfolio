import React from 'react'
import { cn } from '@/lib/utils'

interface BackgroundPatternProps {
  className?: string
  variant?: 'dots' | 'grid' | 'waves' | 'circles'
  opacity?: number
  animated?: boolean
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  className,
  variant = 'dots',
  opacity = 0.1,
  animated = false
}) => {
  const patterns = {
    dots: (
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dots)"
          className={cn(animated && 'animate-pulse')}
          style={{ opacity }}
        />
      </svg>
    ),
    grid: (
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          style={{ opacity }}
        />
      </svg>
    ),
    waves: (
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity={opacity}
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className={cn(animated && 'animate-bounce-gentle')}
        />
      </svg>
    ),
    circles: (
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circles"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#circles)"
          style={{ opacity }}
        />
      </svg>
    )
  }

  return (
    <div className={cn("absolute inset-0 pointer-events-none text-muted-foreground", className)}>
      {patterns[variant]}
    </div>
  )
}

export const GradientBackground: React.FC<{
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'custom'
  customColors?: string[]
}> = ({ className, variant = 'primary', customColors }) => {
  const gradients = {
    primary: 'from-primary/20 via-purple-500/10 to-cyan-500/20',
    secondary: 'from-secondary/30 via-accent/20 to-muted/30',
    accent: 'from-blue-400/20 via-purple-500/20 to-pink-500/20',
    custom: customColors?.join(' ') || 'from-primary/20 to-primary/20'
  }

  return (
    <div className={cn("absolute inset-0 bg-gradient-to-br", gradients[variant], className)} />
  )
}