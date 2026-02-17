import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Logo / Header */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-apple-blue rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">BiteRight HQ</h1>
          <p className="text-xl text-apple-gray">AI-Orchestrated Dental Clinic Command Center</p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/pilot" className="group">
            <div className="card text-left space-y-4 border-2 border-transparent hover:border-stage1 transition-all duration-300">
              <div className="w-12 h-12 bg-stage1/10 rounded-xl flex items-center justify-center group-hover:bg-stage1/20 transition-colors">
                <svg className="w-6 h-6 text-stage1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Pilot</h2>
                <p className="text-apple-gray mt-1">Daily operations, stage checklists, patient flow management</p>
              </div>
              <div className="flex items-center text-stage1 font-medium">
                Enter Pilot Deck
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/commander" className="group">
            <div className="card text-left space-y-4 border-2 border-transparent hover:border-stage2 transition-all duration-300">
              <div className="w-12 h-12 bg-stage2/10 rounded-xl flex items-center justify-center group-hover:bg-stage2/20 transition-colors">
                <svg className="w-6 h-6 text-stage2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Commander</h2>
                <p className="text-apple-gray mt-1">Financial dashboard, P&L tracking, global oversight</p>
              </div>
              <div className="flex items-center text-stage2 font-medium">
                Enter Commander Deck
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-apple-gray">
          Powered by AI Agent Squad
        </p>
      </div>
    </main>
  )
}
