'use client'

import { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  showProgress?: boolean
}

export function LoadingSpinner({ size = 'md', message, showProgress = false }: LoadingSpinnerProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (showProgress) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(timer)
    }
  }, [showProgress])

  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={`${sizeClasses[size]} border-gray-200 rounded-full`}
        />
        {/* Spinning ring */}
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-transparent border-t-apple-blue rounded-full animate-spin`}
        />
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-apple-blue/10 animate-pulse" />
      </div>
      
      {message && (
        <div className="text-center">
          <p className="text-apple-gray font-medium animate-pulse">{message}</p>
          {showProgress && (
            <div className="mt-3 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-apple-blue rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Full-page loading overlay
export function LoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner size="lg" message={message} />
    </div>
  )
}

// Inline loading for buttons and small areas
export function InlineSpinner({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`animate-spin ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="3"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
