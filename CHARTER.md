# BiteRight HQ - Project Charter

> AI-Orchestrated Business Command Center

## Project Overview

**Vision:** Build an intelligent business management platform with AI-driven orchestration, real-time monitoring, and automated workflows.

**Stack:** Next.js (App Router), Tailwind CSS, Cloudflare Workers, OpenClaw Agents

---

## Team

| Agent | Name | Role | Responsibility |
|-------|------|------|----------------|
| Orchestrator | **Tardis** | Me | Coordinate all agents, receive Doctor's commands |
| PM | **Bhagwan** | Project Management | Planning, tracking, coordination |
| Coder | **Pronit** | Frontend/UI | User interfaces, Next.js, React |
| Backend | **Makda** | Backend/API | Server logic, APIs, databases |
| DevOps | **Sharma** | Infrastructure | Cloudflare Workers, Pages, deployments |
| Research | **Mahadev** | Research | Deep dives, principle synthesis |

---

## Workflow

```
Doctor (Pronit)
    │
    ▼
Tardis (me) ──receives command──► triages & plans
    │
    ├─► Bhagwan (PM) ── creates plan & tracks
    │
    ├─► Mahadev (Research) ── deep research if needed
    │
    ├─► Pronit (Coder) ── frontend/implementation
    │
    ├─► Makda (Backend) ── API/server logic
    │
    └─► Sharma (DevOps) ── deploy & infrastructure
    
    │
    ▼
Tardis ── delivers result to Doctor
```

---

## Current Assets

### Cloudflare
- **Workers:** `biteright-mchq.pronitopenclaw.workers.dev`
- **Pages:** 
  - `bite-right-hq-new`
  - `bite-right-hq`

### GitHub
- **Repo:** `tardis-create/bite-right-hq` (to be created)
- **Deploy Token:** Available

---

## Process

1. **Doctor gives command** → Tardis receives
2. **Tardis triages** → decides which agents needed
3. **Bhagwan plans** → creates task breakdown
4. **Agents execute** → in parallel or sequence as needed
5. **Tardis synthesizes** → delivers complete output
6. **Doctor approves** → or iterates

---

## Communication

- All agent-to-agent communication through **Tardis**
- Sub-agents spawn via `sessions_spawn`
- Skills loaded from workspace `skills/` directories
- Memory: LanceDB for long-term, session memory for context

---

## Next Steps

1. Create GitHub repo `tardis-create/bite-right-hq`
2. Initialize Next.js project
3. Set up CI/CD with Cloudflare Pages
4. Implement MVP features

---

*Charter created: 2026-02-16*
*Owner: Pronit (The Doctor)*
