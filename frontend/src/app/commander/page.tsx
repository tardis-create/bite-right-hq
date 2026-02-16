'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FinanceData, FinanceDataWithDefaults, defaultFinances, fetchGlobalState } from '@/lib/api'

export default function CommanderPage() {
  const [finances, setFinances] = useState<FinanceDataWithDefaults>({
    ...defaultFinances as FinanceDataWithDefaults,
    equity: 600000,
    loan: 1100000,
    subsidy: 425000,
    monthlyExpenses: 85000,
    revenue: 120000,
  })
  const [loading, setLoading] = useState(true)
  const [emiAmount, setEmiAmount] = useState(0)

  useEffect(() => {
    async function loadData() {
      const state = await fetchGlobalState()
      setFinances({
        ...state.finances,
        equity: 600000,
        loan: 1100000,
        subsidy: 425000,
        monthlyExpenses: 85000,
        revenue: 120000,
      })
      // Calculate EMI: ₹11L at 9% for 5 years
      const principal = 1100000
      const rate = 9 / 12 / 100
      const months = 60
      const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1)
      setEmiAmount(Math.round(emi))
      setLoading(false)
    }
    loadData()
  }, [])

  // Calculate capital structure (using fixed values for now)
  const totalCapital = 600000 + 1100000; // equity + loan
  const monthlyProfit = finances.revenue - finances.monthlyExpenses
  const breakEvenMonths = Math.ceil(totalCapital / Math.abs(monthlyProfit || 1))

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-apple-gray">Loading Commander Deck...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-apple-gray hover:text-apple-blue transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Commander Deck</h1>
              <p className="text-sm text-apple-gray">Financial oversight & analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stage2 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Capital Structure */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Capital Structure</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-stage1/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-stage1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-apple-gray">Equity</p>
                  <p className="text-xl font-bold">{formatCurrency(finances.equity)}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-stage1" style={{ width: `${(finances.equity / totalCapital) * 100}%` }} />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-stage2/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-stage2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-apple-gray">Bank Loan</p>
                  <p className="text-xl font-bold">{formatCurrency(finances.loan)}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-stage2" style={{ width: `${(finances.loan / totalCapital) * 100}%` }} />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-stage3/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-stage3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-apple-gray">PMEGP Subsidy</p>
                  <p className="text-xl font-bold">{formatCurrency(finances.subsidy)}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-stage3" style={{ width: `${(finances.subsidy / totalCapital) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="mt-4 card bg-gradient-to-r from-stage1 to-stage2 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Capital Available</p>
                <p className="text-3xl font-bold">{formatCurrency(totalCapital)}</p>
              </div>
              <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </section>

        {/* P&L Overview */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Monthly P&L</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stage3/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-stage3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-apple-gray">Revenue</p>
                  <p className="text-xl font-bold text-stage3">{formatCurrency(finances.revenue)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-apple-gray">Expenses</p>
                  <p className="text-xl font-bold text-red-500">{formatCurrency(finances.monthlyExpenses)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  monthlyProfit >= 0 ? 'bg-stage3/10' : 'bg-red-100'
                }`}>
                  <svg className={`w-5 h-5 ${monthlyProfit >= 0 ? 'text-stage3' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-apple-gray">Net Profit</p>
                  <p className={`text-xl font-bold ${monthlyProfit >= 0 ? 'text-stage3' : 'text-red-500'}`}>
                    {formatCurrency(monthlyProfit)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMI Pipeline */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Loan EMI Pipeline</h2>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-apple-gray">Monthly EMI</p>
                <p className="text-2xl font-bold">{formatCurrency(emiAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-apple-gray">Tenure</p>
                <p className="text-lg font-semibold">5 years (60 months)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-apple-gray">Interest Rate</span>
                <span className="font-medium">9% per annum</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-apple-gray">Total Interest</span>
                <span className="font-medium">{formatCurrency((emiAmount * 60) - finances.loan)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-apple-gray">Total Repayment</span>
                <span className="font-medium">{formatCurrency(emiAmount * 60)}</span>
              </div>
            </div>
            <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-stage2 to-stage1" style={{ width: '0%' }} />
            </div>
            <p className="text-xs text-apple-gray mt-2">Loan repayment progress</p>
          </div>
        </section>

        {/* Break-even Analysis */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Break-even Analysis</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card">
              <p className="text-sm text-apple-gray mb-2">Break-even Timeline</p>
              <p className="text-3xl font-bold">{breakEvenMonths} months</p>
              <p className="text-apple-gray text-sm mt-1">
                {Math.floor(breakEvenMonths / 12)} years, {breakEvenMonths % 12} months
              </p>
            </div>
            <div className="card">
              <p className="text-sm text-apple-gray mb-2">Monthly Burn Rate</p>
              <p className="text-3xl font-bold">{formatCurrency(finances.monthlyExpenses)}</p>
              <p className="text-apple-gray text-sm mt-1">Fixed + variable costs</p>
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-apple-gray">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-apple-gray">Description</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-apple-gray">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {finances.transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-4 text-sm">{tx.date}</td>
                      <td className="py-3 px-4 text-sm">{tx.description}</td>
                      <td className={`py-3 px-4 text-sm text-right font-medium ${
                        tx.type === 'income' ? 'text-stage3' : 'text-red-500'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
