'use client'

import { useEffect } from 'react'

export interface GuidanceStep {
  title: string
  description: string
}

export interface GuidanceContent {
  title: string
  subtitle: string
  icon: string
  urgency?: 'critical' | 'high' | 'medium'
  why: string
  estimatedTime: string
  cost: string
  steps: GuidanceStep[]
  documentsNeeded: string[]
  tips: string[]
  officialLink?: string
  officialLinkLabel?: string
}

interface GuidanceModalProps {
  isOpen: boolean
  onClose: () => void
  content: GuidanceContent | null
}

export default function GuidanceModal({ isOpen, onClose, content }: GuidanceModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !content) return null

  const urgencyColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  }

  const urgencyLabels: Record<string, string> = {
    critical: '🔴 Critical Priority',
    high: '🟠 High Priority',
    medium: '🟡 Medium Priority',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start gap-4 p-5 border-b border-gray-100 shrink-0">
            <div className="text-3xl mt-0.5">{content.icon}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">{content.title}</h2>
              <p className="text-sm text-apple-gray mt-0.5">{content.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 space-y-5">
            {/* Urgency + Meta */}
            <div className="flex flex-wrap gap-2">
              {content.urgency && (
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${urgencyColors[content.urgency]}`}>
                  {urgencyLabels[content.urgency]}
                </span>
              )}
              <span className="text-xs font-medium px-3 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                ⏱ {content.estimatedTime}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full border bg-green-50 text-green-700 border-green-200">
                💰 {content.cost}
              </span>
            </div>

            {/* Why This Matters */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Why This Matters</h3>
              <p className="text-sm text-blue-800 leading-relaxed">{content.why}</p>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step Guide</h3>
              <div className="space-y-3">
                {content.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-apple-blue text-white text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{step.title}</p>
                      {step.description && (
                        <p className="text-xs text-apple-gray mt-0.5 leading-relaxed">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Needed */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Documents Needed</h3>
              <ul className="space-y-1.5">
                {content.documentsNeeded.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-apple-blue mt-0.5 shrink-0">📄</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            {content.tips.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-amber-900 mb-2">💡 Pro Tips</h3>
                <ul className="space-y-1.5">
                  {content.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-amber-800 leading-relaxed">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {content.officialLink && (
            <div className="p-5 border-t border-gray-100 shrink-0">
              <a
                href={content.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-apple-blue text-white rounded-xl font-medium text-center hover:bg-blue-600 transition-colors text-sm"
              >
                {content.officialLinkLabel || 'Open Official Portal'} →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
