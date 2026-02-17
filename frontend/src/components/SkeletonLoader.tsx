'use client'

import { useEffect, useState } from 'react'

// Base skeleton with shimmer effect
function Skeleton({ className = '', rounded = 'rounded-xl' }: { className?: string; rounded?: string }) {
  return (
    <div 
      className={`relative overflow-hidden bg-gray-200 ${rounded} ${className}`}
    >
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
    </div>
  )
}

// Card skeleton for dashboard cards
export function CardSkeleton({ showHeader = true, lines = 3 }: { showHeader?: boolean; lines?: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 animate-pulse">
      {showHeader && (
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="flex-1">
            <Skeleton className="h-3 w-20 mb-2" rounded="rounded" />
            <Skeleton className="h-5 w-32" rounded="rounded" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-2 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
            rounded="rounded" 
          />
        ))}
      </div>
    </div>
  )
}

// Financial metric card skeleton
export function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-3 w-16 mb-2" rounded="rounded" />
          <Skeleton className="h-6 w-28" rounded="rounded" />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  )
}

// Table skeleton for transactions
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Table header */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" rounded="rounded" />
          <Skeleton className="h-4 flex-1" rounded="rounded" />
          <Skeleton className="h-4 w-20" rounded="rounded" />
        </div>
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-gray-50 p-4 last:border-0">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-20" rounded="rounded" />
            <Skeleton className="h-4 flex-1" rounded="rounded" />
            <Skeleton className="h-4 w-16" rounded="rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Stage card skeleton for pilot dashboard
export function StageSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-6 w-40 mb-2" rounded="rounded" />
          <Skeleton className="h-4 w-64" rounded="rounded" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-4 flex-1" rounded="rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Full page skeleton for commander dashboard
export function CommanderSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-6 h-6 rounded" />
            <div>
              <Skeleton className="h-6 w-40 mb-1" rounded="rounded" />
              <Skeleton className="h-4 w-48" rounded="rounded" />
            </div>
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Capital Structure */}
        <section>
          <Skeleton className="h-6 w-40 mb-4" rounded="rounded" />
          <div className="grid md:grid-cols-3 gap-4">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
          <div className="mt-4">
            <CardSkeleton showHeader={false} lines={2} />
          </div>
        </section>

        {/* P&L */}
        <section>
          <Skeleton className="h-6 w-32 mb-4" rounded="rounded" />
          <div className="grid md:grid-cols-3 gap-4">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
        </section>

        {/* EMI Pipeline */}
        <section>
          <Skeleton className="h-6 w-40 mb-4" rounded="rounded" />
          <CardSkeleton lines={5} />
        </section>

        {/* Transactions */}
        <section>
          <Skeleton className="h-6 w-44 mb-4" rounded="rounded" />
          <TableSkeleton rows={5} />
        </section>
      </main>
    </div>
  )
}

// Full page skeleton for pilot dashboard
export function PilotSkeleton() {
  return (
    <div className="min-h-screen bg-apple-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Skeleton className="w-16 h-4" rounded="rounded" />
          <Skeleton className="w-24 h-6" rounded="rounded" />
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Stage tabs */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-10 w-20 rounded-lg" />
          ))}
        </div>

        {/* Stage content */}
        <StageSkeleton />
      </main>
    </div>
  )
}
