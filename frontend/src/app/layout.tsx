import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BiteRight HQ - Command Center',
  description: 'AI-Orchestrated Business Command Center for Dental Clinics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  )
}
