# BiteRight HQ - Technical Specification

## Project Overview

**Project Name:** BiteRight HQ  
**Vision:** AI-Orchestrated Business Command Center for Dental Clinics  
**Location:** Surat, Gujarat, India  
**Platform:** Web Dashboard (Pilot + Commander)  
**Architecture:** Cloudflare Workers + Next.js (Static Export) with JSON Data

---

## 1. User Roles

### 1.1 Pilot (Doctor/Wife)
- Sequential access only
- Stage-gate lock: Future stages locked until current complete
- Focus: Daily operations, patient flow, stage checklists
- Input: Voice logs, manual entries, stage completions

### 1.2 Commander (Admin/Husband)
- Full visibility across all stages
- Strategic oversight: Financial P&L, global targets, marketing
- Override capabilities for stage-locks
- Analytics and reporting

---

## 2. Stage-Gated Workflow

### Stage 1: Foundation (Legal & Government)
- UDYAM Registration
- PMEGP Application (25% subsidy)
- SMC/Gumasta License
- **Unlock:** PMEGP Application ID required

### Stage 2: Capital & Conquest (Financing)
- Bank loan (₹11L at 9%, 5-year)
- Location selection (1st floor corner shop)
- **Unlock:** Rental Agreement + Loan Approval

### Stage 3: The Build-Out (Setup)
- Dental chair procurement
- Equipment (RVG, Autoclave, Compressor)
- Staff hiring
- **Unlock:** All equipment installed

### Stage 4: Mission Control (Daily Ops)
- Patient management
- Daily revenue entry
- Marketing campaigns
- Content approval workflow

---

## 3. Financial Engine

### Capital Structure
- **Equity:** ₹6,00,000 (survival buffer)
- **Loan:** ₹11,00,000 (9% interest, 5-year tenure)
- **PMEGP Subsidy:** 25% of project cost (₹4,25,000)

### Revenue Model
- **Orthodontics:** ₹45,000 avg/case (Target: 1/month)
- **General Dentistry:** ₹1,200 avg/patient (Target: 1/day)
- **Payment:** Downpayment ₹10k + 10 EMIs of ₹3,5k

### P&L Tracking
- Monthly income/expenses/profit
- Break-even calculation
- EMI pipeline visualization

---

## 4. AI Agent Squad (UI Features)

| Agent | Feature |
|-------|---------|
| **Vector** | Stage guides, checklist management |
| **Ledger** | Financial tracking, P&L calculations |
| **Nexus** | Local SEO keywords, marketing stats |
| **Canvas** | Content scripts (pre-approval queue) |
| **Siren** | Alert banners (budget overruns, misses) |
| **Scribe** | Voice log processing |
| **Beacon** | Growth suggestions |

---

## 5. UI/UX Specification

### Visual Design (Apple Style)
- **Background:** #FFFFFF
- **Primary:** #007AFF (iOS Blue)
- **Text:** #000000 (primary), #8E8E93 (secondary)
- **Cards:** White with subtle shadows
- **Typography:** System font (San Francisco)

### Layout
- **Pilot Deck:** Stage-focused, minimalist, locked navigation
- **Commander Deck:** Dashboard with sliders, full data access

### Responsive
- Desktop-first (iPad Pro optimized)
- Mobile: Simplified view

---

## 6. Data Architecture

### JSON Files (Cloudflare Workers KV or local)
```
/data
  ├── global_state.json    # Master config
  ├── stages.json          # Stage progress
  ├── finances.json        # P&L data
  ├── patients.json       # Patient records
  ├── marketing.json       # Campaign data
  └── content_queue.json   # Canvas approval queue
```

### API Endpoints (Cloudflare Workers)
- `GET /api/state` - Global state
- `POST /api/stages/:id/complete` - Unlock stage
- `GET /api/finances` - P&L data
- `POST /api/finances` - Add transaction
- `GET /api/patients` - Patient list
- `POST /api/patients` - Add patient

---

## 7. Security

- **No API keys exposed** in client-side code
- All sensitive config via Cloudflare secrets
- Role-based access control (Pilot vs Commander)
- No authentication for MVP (local usage)

---

## 8. Deployment

- **Frontend:** Cloudflare Pages (static export)
- **API:** Cloudflare Workers
- **Data:** JSON files in Worker or KV store

---

## 9. Acceptance Criteria

- [ ] Pilot can complete stage checklists sequentially
- [ ] Commander sees all stages with override capability
- [ ] Financial P&L calculates correctly
- [ ] Stage gates work (unlock on completion)
- [ ] No API keys visible in source
- [ ] Deploys to Cloudflare successfully

---

*Spec created: 2026-02-16*
*Based on original OrthoPulse HQ PRD*
