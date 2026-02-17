import { GuidanceContent } from '@/components/GuidanceModal'

// Guidance content keyed by checklist item ID
export const guidanceData: Record<string, GuidanceContent> = {
  '1-1': {
    title: 'UDYAM Registration',
    subtitle: 'Stage 1 · Foundation · Legal & Government',
    icon: '🏛️',
    urgency: 'critical',
    why:
      'UDYAM Registration is your clinic's official identity as a Micro, Small, or Medium Enterprise (MSME). It unlocks government schemes, priority bank loans at lower rates, PMEGP subsidy eligibility, and GST benefits. Without it, you cannot apply for PMEGP. Takes less than 30 minutes and is completely FREE.',
    estimatedTime: '20–30 minutes',
    cost: 'Free (Government portal)',
    steps: [
      {
        title: 'Visit the official UDYAM portal',
        description: 'Go to udyamregistration.gov.in — use Chrome/Edge for best experience.',
      },
      {
        title: 'Click "For New Entrepreneurs who are not Registered yet"',
        description: 'Choose this option since the clinic is a new business.',
      },
      {
        title: 'Enter your Aadhaar number',
        description: 'Use the doctor's (owner's) Aadhaar. The OTP will be sent to the linked mobile number.',
      },
      {
        title: 'Validate OTP and fill PAN details',
        description: 'Enter the 10-digit PAN. The system will auto-fetch ITR data for the last few years.',
      },
      {
        title: 'Fill in Business Details',
        description:
          'Name: "BiteRight Dental Clinic" or your chosen name. Type: Proprietorship. NIC Activity: 86202 (Dental Practice). District: Surat. State: Gujarat.',
      },
      {
        title: 'Enter Investment & Turnover',
        description:
          'Plant & Machinery investment: estimated ₹11L. Annual turnover: expected ₹15L. This classifies you as a Micro Enterprise.',
      },
      {
        title: 'Submit and Download Certificate',
        description:
          'You\'ll receive the UDYAM Registration Number (URN) immediately. Download and save the PDF certificate — you\'ll need it for PMEGP.',
      },
    ],
    documentsNeeded: [
      'Aadhaar Card (owner/proprietor) — must have linked mobile number for OTP',
      'PAN Card (owner/proprietor)',
      'Bank account details (account number + IFSC)',
      'Mobile number linked to Aadhaar',
      'Business address (clinic premises or home address for now)',
    ],
    tips: [
      'Do this from a desktop/laptop browser — mobile browsers sometimes have issues with OTP.',
      'If the mobile number is not linked to Aadhaar, visit the nearest Aadhaar centre first.',
      'The UDYAM certificate is permanent and free — there are NO renewal fees.',
      'Save the URN (UDYAM-GJ-XX-XXXXXXX format) — you\'ll need it in every government application.',
      'Beware of fake websites charging fees for UDYAM registration — the real portal is always FREE.',
    ],
    officialLink: 'https://udyamregistration.gov.in',
    officialLinkLabel: 'Open UDYAM Registration Portal',
  },

  '1-2': {
    title: 'PMEGP Application',
    subtitle: 'Stage 1 · Foundation · 25% Government Subsidy',
    icon: '💰',
    urgency: 'critical',
    why:
      'PMEGP (Prime Minister\'s Employment Generation Programme) gives you a 25% subsidy on your project cost. For your ₹17L clinic setup, that\'s ₹4.25L FREE from the government. This massively reduces your loan burden. The subsidy is credited directly to your loan account after 3 years of successful operation.',
    estimatedTime: '2–3 hours (spread across a few days)',
    cost: 'Free (No application fee)',
    steps: [
      {
        title: 'Complete UDYAM Registration first',
        description: 'PMEGP requires a UDYAM number. Complete Step 1-1 before this.',
      },
      {
        title: 'Prepare your Project Report (DPR)',
        description:
          'Write a 2-3 page detailed project report covering: business description, market analysis, equipment list, cost breakdown, projected revenue. You can download a template from the KVIC website.',
      },
      {
        title: 'Go to PMEGP e-Portal',
        description: 'Visit kviconline.gov.in/pmegpeportal — choose "Application for New Unit".',
      },
      {
        title: 'Register as a New Applicant',
        description:
          'Create an account with your Aadhaar and mobile number. Fill in personal details, educational qualifications, category (General/SC/ST/OBC).',
      },
      {
        title: 'Fill Project Details',
        description:
          'Activity: Dental Clinic / Service Sector. Location: Surat, Gujarat. Total Project Cost: ₹17L. Own Contribution: ₹6L (35%). Bank Loan Required: ₹11L.',
      },
      {
        title: 'Upload Documents',
        description:
          'Upload all required documents in PDF/JPG format (max 500KB each). Check the list carefully.',
      },
      {
        title: 'Submit to District KVIC/DIC Office',
        description:
          'After online submission, the application goes to District Industries Centre (DIC), Surat for approval. You may be called for an interview.',
      },
      {
        title: 'Wait for Bank Linkage',
        description:
          'Once DIC approves, they recommend a bank. The bank processes the loan. Subsidy is released after 3 years of repayment.',
      },
    ],
    documentsNeeded: [
      'UDYAM Registration Certificate (URN)',
      'Aadhaar Card',
      'PAN Card',
      'Educational qualification certificates (degree / diploma)',
      'Dental Council of India registration certificate',
      'Project Report / Detailed Project Report (DPR)',
      'Quotations for equipment (at least 3 suppliers)',
      'Proposed location details (rental agreement or ownership proof)',
      'Bank account passbook (first page)',
      'Passport-size photographs (3–5)',
      'Caste certificate (if applicable — for higher subsidy)',
    ],
    tips: [
      'Category matters: General category gets 15% subsidy for urban, 25% for rural. OBC/SC/ST/Women/Ex-servicemen get 25% urban + 35% rural. Apply as Woman-owned if applicable.',
      'The DIC office in Surat is at Udyog Bhavan. Go in person once for better guidance.',
      'The PMEGP Application ID is your unlock key for Stage 2 — don\'t lose it!',
      'Processing takes 3–6 months. Start this in parallel with other registrations, not after.',
      'Get your DPR (project report) reviewed by a CA or experienced entrepreneur for best results.',
    ],
    officialLink: 'https://www.kviconline.gov.in/pmegpeportal/jsp/pmegponline.jsp',
    officialLinkLabel: 'Open PMEGP e-Portal',
  },

  '1-3': {
    title: 'SMC / Gumasta License',
    subtitle: 'Stage 1 · Foundation · Surat Municipal Corporation',
    icon: '📋',
    urgency: 'high',
    why:
      'The Gumasta License (Shop & Establishment Registration) is mandatory for any business operating in Gujarat. It proves your clinic is a legally registered commercial entity. Required for opening a business bank account, hiring staff legally, and obtaining other licenses. Without it, you cannot operate legally.',
    estimatedTime: '1–2 days (if documents ready)',
    cost: '₹200–₹2,000 (varies by number of employees)',
    steps: [
      {
        title: 'Choose online or offline registration',
        description:
          'SMC now offers online registration at smc.surat.gov.in. You can also visit the nearest SMC ward office.',
      },
      {
        title: 'Go to SMC portal → Citizen Services → Shop & Establishment',
        description: 'Select "New Registration" under Shop & Establishment Act.',
      },
      {
        title: 'Fill the application form',
        description:
          'Business name, address, type (dental clinic = service/professional), number of employees, owner details.',
      },
      {
        title: 'Upload required documents',
        description:
          'Upload as PDF/JPG, max 2MB each.',
      },
      {
        title: 'Pay the registration fee',
        description:
          'Fee is based on number of employees. For 0–5 employees: ~₹200–₹500. Pay online via UPI/net banking.',
      },
      {
        title: 'Receive certificate',
        description:
          'Certificate is usually issued within 1–3 working days online. Download and print.',
      },
    ],
    documentsNeeded: [
      'Aadhaar Card (owner)',
      'PAN Card (owner)',
      'Address proof of business premises (rent agreement or ownership document)',
      'Electricity bill of the premises',
      'Photograph of the clinic entrance / shop front',
      'Passport-size photo of owner',
      'List of employees (names, Aadhaar)',
    ],
    tips: [
      'Register under "Service" category — dental clinic is classified as a service establishment.',
      'Renew annually — the Gumasta License must be renewed every year before December 31.',
      'If you haven\'t finalized the premises yet, use your home address temporarily and update later.',
      'Also register under the Gujarat Shops & Establishments Act, 1948 — this is the same process.',
      'The SMC helpline is 0261-xxxxxxx — call if you face any portal issues.',
    ],
    officialLink: 'https://www.smc.surat.gov.in',
    officialLinkLabel: 'Open SMC Portal',
  },
}

// Helper: get guidance for a checklist item
export function getGuidance(itemId: string): GuidanceContent | null {
  return guidanceData[itemId] || null
}
