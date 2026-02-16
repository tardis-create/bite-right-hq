const API_BASE = 'https://biteright-mchq.pronitopenclaw.workers.dev'

export interface Stage {
  id: number
  name: string
  description: string
  unlocked: boolean
  completed: boolean
  checklist: Checklist[]
}

export interface Checklist {
  id: string
  text: string
  completed: boolean
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'income' | 'expense'
}

export interface FinanceData {
  totalIncome: number
  totalExpenses: number
  profit: number
  transactions?: Transaction[]
}

export interface FinanceDataWithDefaults extends FinanceData {
  equity: number
  loan: number
  subsidy: number
  monthlyExpenses: number
  revenue: number
  transactions: Transaction[]
}

export interface GlobalState {
  currentStage: number
  stages: Stage[]
  finances: FinanceData
}

// Default data for when API is unavailable
export const defaultStages: Stage[] = [
  {
    id: 1,
    name: 'Foundation',
    description: 'Legal & Government',
    unlocked: true,
    completed: false,
    checklist: [
      { id: '1-1', text: 'UDYAM Registration', completed: false },
      { id: '1-2', text: 'PMEGP Application (25% subsidy)', completed: false },
      { id: '1-3', text: 'SMC/Gumasta License', completed: false },
    ],
  },
  {
    id: 2,
    name: 'Capital & Conquest',
    description: 'Financing',
    unlocked: false,
    completed: false,
    checklist: [
      { id: '2-1', text: 'Bank loan approval (₹11L at 9%, 5-year)', completed: false },
      { id: '2-2', text: 'Location selection (1st floor corner shop)', completed: false },
      { id: '2-3', text: 'Rental Agreement signed', completed: false },
    ],
  },
  {
    id: 3,
    name: 'The Build-Out',
    description: 'Setup',
    unlocked: false,
    completed: false,
    checklist: [
      { id: '3-1', text: 'Dental chair procurement', completed: false },
      { id: '3-2', text: 'Equipment: RVG, Autoclave, Compressor', completed: false },
      { id: '3-3', text: 'Staff hiring', completed: false },
    ],
  },
  {
    id: 4,
    name: 'Mission Control',
    description: 'Daily Operations',
    unlocked: false,
    completed: false,
    checklist: [
      { id: '4-1', text: 'Patient management system active', completed: false },
      { id: '4-2', text: 'Daily revenue entry configured', completed: false },
      { id: '4-3', text: 'Marketing campaigns initialized', completed: false },
    ],
  },
]

export const defaultTransactions: Transaction[] = [
  { id: '1', date: '2024-01-15', description: 'Initial equity investment', amount: 600000, type: 'income' },
  { id: '2', date: '2024-01-20', description: 'Bank loan disbursement', amount: 1100000, type: 'income' },
  { id: '3', date: '2024-02-01', description: 'Equipment purchase - Dental Chair', amount: 250000, type: 'expense' },
  { id: '4', date: '2024-02-05', description: 'Clinic interior setup', amount: 150000, type: 'expense' },
]

export const defaultFinances: FinanceData = {
  totalIncome: 0,
  totalExpenses: 0,
  profit: 0,
  transactions: defaultTransactions,
}

export async function fetchGlobalState(): Promise<GlobalState> {
  try {
    const res = await fetch(`${API_BASE}/api/state`)
    if (res.ok) {
      const data = await res.json()
      // Ensure stages exists
      if (!data.stages || !Array.isArray(data.stages)) {
        data.stages = defaultStages
      }
      // Ensure finances exists
      if (!data.finances) {
        data.finances = defaultFinances
      }
      // Ensure transactions exists within finances
      if (!data.finances.transactions || !Array.isArray(data.finances.transactions)) {
        data.finances.transactions = defaultTransactions
      }
      return data
    }
  } catch (e) {
    console.log('Using default data')
  }
  
  // Return default state
  return {
    currentStage: 1,
    stages: defaultStages,
    finances: defaultFinances,
  }
}

export async function updateStageProgress(stageId: number, checklistId: string, completed: boolean): Promise<GlobalState> {
  try {
    const res = await fetch(`${API_BASE}/api/stages/${stageId}/checklist/${checklistId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.log('Using local update')
  }
  
  // Local update fallback - will be handled by state
  return fetchGlobalState()
}

export async function completeStage(stageId: number): Promise<GlobalState> {
  try {
    const res = await fetch(`${API_BASE}/api/stages/${stageId}/complete`, {
      method: 'POST',
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.log('Local completion')
  }
  
  // Local completion fallback
  return fetchGlobalState()
}
