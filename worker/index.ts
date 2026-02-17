// BiteRight HQ - Cloudflare Worker Backend
// In-memory JSON storage for MVP

// ============= SEED DATA =============

interface Stage {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  checklist: { id: string; text: string; completed: boolean }[];
  unlockRequirement?: string;
}

interface Funding {
  equity: number;
  loan: number;
  subsidyPercent: number;
  subsidyAmount: number;
}

interface Targets {
  orthoPerMonth: number;
  generalPerDay: number;
}

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  patientId?: string;
}

interface Patient {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  amount: number;
  paid: number;
  emiCount: number;
  emiPaid: number;
  createdAt: string;
}

interface GlobalState {
  funding: Funding;
  targets: Targets;
  currentStage: number;
}

interface FinanceData {
  transactions: Transaction[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    profit: number;
  };
}

interface PatientData {
  patients: Patient[];
}

// In-memory storage
let globalState: GlobalState = {
  funding: {
    equity: 600000,
    loan: 1100000,
    subsidyPercent: 25,
    subsidyAmount: 425000,
  },
  targets: {
    orthoPerMonth: 1,
    generalPerDay: 1,
  },
  currentStage: 1,
};

let stages: Stage[] = [
  {
    id: 1,
    name: "Foundation",
    description: "Legal & Government",
    unlocked: true,
    completed: false,
    unlockRequirement: "Start",
    checklist: [
      { id: "1-1", text: "UDYAM Registration", completed: false },
      { id: "1-2", text: "PMEGP Application (25% subsidy)", completed: false },
      { id: "1-3", text: "SMC/Gumasta License", completed: false },
    ],
  },
  {
    id: 2,
    name: "Capital & Conquest",
    description: "Financing",
    unlocked: false,
    completed: false,
    unlockRequirement: "PMEGP Application ID required",
    checklist: [
      { id: "2-1", text: "Bank loan approval (₹11L at 9%, 5-year)", completed: false },
      { id: "2-2", text: "Location selection (1st floor corner shop)", completed: false },
      { id: "2-3", text: "Rental Agreement signed", completed: false },
    ],
  },
  {
    id: 3,
    name: "The Build-Out",
    description: "Setup",
    unlocked: false,
    completed: false,
    unlockRequirement: "Rental Agreement + Loan Approval",
    checklist: [
      { id: "3-1", text: "Dental chair procurement", completed: false },
      { id: "3-2", text: "Equipment: RVG, Autoclave, Compressor", completed: false },
      { id: "3-3", text: "Staff hiring", completed: false },
    ],
  },
  {
    id: 4,
    name: "Mission Control",
    description: "Daily Operations",
    unlocked: false,
    completed: false,
    unlockRequirement: "All equipment installed",
    checklist: [
      { id: "4-1", text: "Patient management system active", completed: false },
      { id: "4-2", text: "Daily revenue entry configured", completed: false },
      { id: "4-3", text: "Marketing campaigns initialized", completed: false },
    ],
  },
];

let financeData: FinanceData = {
  transactions: [],
  summary: {
    totalIncome: 0,
    totalExpenses: 0,
    profit: 0,
  },
};

let patientData: PatientData = {
  patients: [],
};

// ============= HELPERS =============

const generateId = () => Math.random().toString(36).substring(2, 11);

const calculateFinanceSummary = () => {
  financeData.summary.totalIncome = financeData.transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  financeData.summary.totalExpenses = financeData.transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  financeData.summary.profit = financeData.summary.totalIncome - financeData.summary.totalExpenses;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const htmlResponse = (body: string) => new Response(body, {
  headers: { 'Content-Type': 'text/html', ...corsHeaders },
});

const jsonResponse = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  headers: { 'Content-Type': 'application/json', ...corsHeaders },
  status,
});

const errorResponse = (message: string, status = 400) => jsonResponse({ error: message }, status);

// ============= ROUTER =============

const router = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET / - Serve HTML (Pages app placeholder)
  if (method === 'GET' && path === '/') {
    return htmlResponse(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BiteRight HQ</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f7; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { text-align: center; }
    h1 { font-size: 2.5rem; color: #1d1d1f; margin-bottom: 1rem; }
    p { color: #86868b; font-size: 1.1rem; }
    .api-links { margin-top: 2rem; }
    .api-links a { display: block; color: #007aff; text-decoration: none; padding: 0.5rem; }
    .api-links a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🦷 BiteRight HQ</h1>
    <p>AI-Orchestrated Business Command Center for Dental Clinics</p>
    <div class="api-links">
      <a href="/api/state">Global State</a>
      <a href="/api/stages">Stage Progress</a>
      <a href="/api/finances">P&L Data</a>
      <a href="/api/patients">Patient List</a>
    </div>
  </div>
</body>
</html>
    `);
  }

  // GET /api/state - Global state (includes stages and finances)
  if (method === 'GET' && path === '/api/state') {
    return jsonResponse({
      ...globalState,
      stages,
      finances: financeData.summary,
    });
  }

  // GET /api/stages - Stage progress
  if (method === 'GET' && path === '/api/stages') {
    return jsonResponse(stages);
  }

  // POST /api/stages/:id/complete - Unlock stage
  if (method === 'POST' && path.match(/^\/api\/stages\/(\d+)\/complete$/)) {
    const stageId = parseInt(path.match(/^\/api\/stages\/(\d+)\/complete$/)![1]);
    const stage = stages.find((s) => s.id === stageId);

    if (!stage) {
      return errorResponse('Stage not found', 404);
    }

    // Mark current stage as completed
    stage.completed = true;

    // Unlock next stage
    const nextStage = stages.find((s) => s.id === stageId + 1);
    if (nextStage) {
      nextStage.unlocked = true;
      globalState.currentStage = nextStage.id;
    }

    return jsonResponse({ success: true, stages });
  }

  // PATCH /api/stages/:id/checklist/:checklistId - Toggle checklist item
  if (method === 'PATCH' && path.match(/^\/api\/stages\/(\d+)\/checklist\/(.+)$/)) {
    const match = path.match(/^\/api\/stages\/(\d+)\/checklist\/(.+)$/);
    const stageId = parseInt(match![1]);
    const checklistId = decodeURIComponent(match![2]);
    const stage = stages.find((s) => s.id === stageId);

    if (!stage) {
      return errorResponse('Stage not found', 404);
    }

    const item = stage.checklist.find((c) => c.id === checklistId);
    if (!item) {
      return errorResponse('Checklist item not found', 404);
    }

    item.completed = !item.completed;

    // Check if all checklist items are completed
    const allCompleted = stage.checklist.every((c) => c.completed);
    if (allCompleted && !stage.completed) {
      stage.completed = true;
      const nextStage = stages.find((s) => s.id === stageId + 1);
      if (nextStage) {
        nextStage.unlocked = true;
        globalState.currentStage = nextStage.id;
      }
    }

    return jsonResponse({ success: true, stage });
  }

  // GET /api/finances - P&L data
  if (method === 'GET' && path === '/api/finances') {
    calculateFinanceSummary();
    return jsonResponse(financeData);
  }

  // POST /api/finances - Add transaction
  if (method === 'POST' && path === '/api/finances') {
    try {
      const body = await req.json();
      const { type, category, description, amount, date } = body;

      if (!type || !category || !description || !amount || !date) {
        return errorResponse('Missing required fields: type, category, description, amount, date');
      }

      if (!['income', 'expense'].includes(type)) {
        return errorResponse('Type must be "income" or "expense"');
      }

      const transaction: Transaction = {
        id: generateId(),
        date,
        type,
        category,
        description,
        amount: parseFloat(amount),
      };

      financeData.transactions.push(transaction);
      calculateFinanceSummary();

      return jsonResponse({ success: true, transaction, summary: financeData.summary });
    } catch {
      return errorResponse('Invalid JSON body');
    }
  }

  // GET /api/patients - Patient list
  if (method === 'GET' && path === '/api/patients') {
    return jsonResponse(patientData);
  }

  // POST /api/patients - Add patient
  if (method === 'POST' && path === '/api/patients') {
    try {
      const body = await req.json();
      const { name, phone, treatment, amount, paid, emiCount } = body;

      if (!name || !phone || !treatment || !amount) {
        return errorResponse('Missing required fields: name, phone, treatment, amount');
      }

      const patient: Patient = {
        id: generateId(),
        name,
        phone,
        treatment,
        amount: parseFloat(amount),
        paid: parseFloat(paid) || 0,
        emiCount: parseInt(emiCount) || 0,
        emiPaid: 0,
        createdAt: new Date().toISOString(),
      };

      patientData.patients.push(patient);

      return jsonResponse({ success: true, patient });
    } catch {
      return errorResponse('Invalid JSON body');
    }
  }

  // PATCH /api/patients/:id - Update patient
  if (method === 'PATCH' && path.match(/^\/api\/patients\/(.+)$/)) {
    const patientId = path.match(/^\/api\/patients\/(.+)$/)![1];
    const patient = patientData.patients.find((p) => p.id === patientId);

    if (!patient) {
      return errorResponse('Patient not found', 404);
    }

    try {
      const body = await req.json();
      Object.assign(patient, body);
      return jsonResponse({ success: true, patient });
    } catch {
      return errorResponse('Invalid JSON body');
    }
  }

  // 404 fallback
  return errorResponse('Not found', 404);
};

// ============= EXPORT =============

export default {
  fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    return router(request);
  },
};
