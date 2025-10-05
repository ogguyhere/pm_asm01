import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, BookOpen, GitCompare, BarChart3, Bookmark, Home, ChevronRight, CheckCircle, XCircle, AlertCircle, Palette, Sun, Moon, ExternalLink, Settings, Zap } from 'lucide-react';
import Chart from 'chart.js/auto';

const themes = {
  blue: {
    name: "Ocean Blue",
    gradient: "from-blue-600 to-cyan-600",
    primaryBtn: "bg-blue-600 hover:bg-blue-700",
    secondaryBg: "bg-blue-100 text-blue-700",
    border: "border-blue-600",
    text: "text-blue-600",
    accent: "bg-blue-500/20",
    glow: "shadow-blue-500/25 shadow-lg",
    appBg: "bg-gradient-to-br from-blue-50/20 to-transparent",
    inputBg: "bg-white/80",
    cardHover: "hover:shadow-blue-500/30 hover:scale-105"
  },
  purple: {
    name: "Royal Purple",
    gradient: "from-purple-600 to-pink-600",
    primaryBtn: "bg-purple-600 hover:bg-purple-700",
    secondaryBg: "bg-purple-100 text-purple-700",
    border: "border-purple-600",
    text: "text-purple-600",
    accent: "bg-purple-500/20",
    glow: "shadow-purple-500/25 shadow-lg",
    appBg: "bg-gradient-to-br from-purple-50/20 to-transparent",
    inputBg: "bg-white/80",
    cardHover: "hover:shadow-purple-500/30 hover:scale-105"
  },
  green: {
    name: "Forest Green",
    gradient: "from-green-600 to-teal-600",
    primaryBtn: "bg-green-600 hover:bg-green-700",
    secondaryBg: "bg-green-100 text-green-700",
    border: "border-green-600",
    text: "text-green-600",
    accent: "bg-green-500/20",
    glow: "shadow-green-500/25 shadow-lg",
    appBg: "bg-gradient-to-br from-green-50/20 to-transparent",
    inputBg: "bg-white/80",
    cardHover: "hover:shadow-green-500/30 hover:scale-105"
  },
  orange: {
    name: "Sunset Orange",
    gradient: "from-orange-600 to-red-600",
    primaryBtn: "bg-orange-600 hover:bg-orange-700",
    secondaryBg: "bg-orange-100 text-orange-700",
    border: "border-orange-600",
    text: "text-orange-600",
    accent: "bg-orange-500/20",
    glow: "shadow-orange-500/25 shadow-lg",
    appBg: "bg-gradient-to-br from-orange-50/20 to-transparent",
    inputBg: "bg-white/80",
    cardHover: "hover:shadow-orange-500/30 hover:scale-105"
  },
  neonCyan: {
    name: "Neon Cyan",
    gradient: "from-cyan-400 to-blue-400",
    primaryBtn: "bg-cyan-400 hover:bg-cyan-500 text-black font-bold shadow-lg hover:shadow-cyan-500/50 transition-shadow",
    secondaryBg: "bg-cyan-100/50 text-cyan-800 backdrop-blur-sm border border-cyan-200/50",
    border: "border-cyan-400",
    text: "text-cyan-400",
    accent: "bg-cyan-400/30 backdrop-blur-sm",
    glow: "shadow-cyan-400/50 shadow-xl [box-shadow:0_0_20px_rgba(34,211,238,0.5)] hover:[box-shadow:0_0_30px_rgba(34,211,238,0.7)]",
    appBg: "bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10",
    inputBg: "bg-white/20 backdrop-blur-sm border border-cyan-300/30",
    cardHover: "hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-300"
  },
  neonMagenta: {
    name: "Neon Magenta",
    gradient: "from-pink-400 to-purple-400",
    primaryBtn: "bg-pink-400 hover:bg-pink-500 text-black font-bold shadow-lg hover:shadow-pink-500/50 transition-shadow",
    secondaryBg: "bg-pink-100/50 text-pink-800 backdrop-blur-sm border border-pink-200/50",
    border: "border-pink-400",
    text: "text-pink-400",
    accent: "bg-pink-400/30 backdrop-blur-sm",
    glow: "shadow-pink-400/50 shadow-xl [box-shadow:0_0_20px_rgba(236,72,153,0.5)] hover:[box-shadow:0_0_30px_rgba(236,72,153,0.7)]",
    appBg: "bg-gradient-to-br from-pink-900/10 via-transparent to-purple-900/10",
    inputBg: "bg-white/20 backdrop-blur-sm border border-pink-300/30",
    cardHover: "hover:shadow-pink-500/60 hover:scale-105 transition-all duration-300"
  },
  neonGreen: {
    name: "Neon Green",
    gradient: "from-emerald-400 to-teal-400",
    primaryBtn: "bg-emerald-400 hover:bg-emerald-500 text-black font-bold shadow-lg hover:shadow-emerald-500/50 transition-shadow",
    secondaryBg: "bg-emerald-100/50 text-emerald-800 backdrop-blur-sm border border-emerald-200/50",
    border: "border-emerald-400",
    text: "text-emerald-400",
    accent: "bg-emerald-400/30 backdrop-blur-sm",
    glow: "shadow-emerald-400/50 shadow-xl [box-shadow:0_0_20px_rgba(16,185,129,0.5)] hover:[box-shadow:0_0_30px_rgba(16,185,129,0.7)]",
    appBg: "bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/10",
    inputBg: "bg-white/20 backdrop-blur-sm border border-emerald-300/30",
    cardHover: "hover:shadow-emerald-500/60 hover:scale-105 transition-all duration-300"
  },
  neonYellow: {
    name: "Neon Yellow",
    gradient: "from-yellow-400 to-amber-400",
    primaryBtn: "bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-lg hover:shadow-yellow-500/50 transition-shadow",
    secondaryBg: "bg-yellow-100/50 text-yellow-800 backdrop-blur-sm border border-yellow-200/50",
    border: "border-yellow-400",
    text: "text-yellow-400",
    accent: "bg-yellow-400/30 backdrop-blur-sm",
    glow: "shadow-yellow-400/50 shadow-xl [box-shadow:0_0_20px_rgba(251,191,36,0.5)] hover:[box-shadow:0_0_30px_rgba(251,191,36,0.7)]",
    appBg: "bg-gradient-to-br from-yellow-900/10 via-transparent to-amber-900/10",
    inputBg: "bg-white/20 backdrop-blur-sm border border-yellow-300/30",
    cardHover: "hover:shadow-yellow-500/60 hover:scale-105 transition-all duration-300"
  },
  neonPink: {
    name: "Neon Pink",
    gradient: "from-rose-400 to-fuchsia-400",
    primaryBtn: "bg-rose-400 hover:bg-rose-500 text-black font-bold shadow-lg hover:shadow-rose-500/50 transition-shadow",
    secondaryBg: "bg-rose-100/50 text-rose-800 backdrop-blur-sm border border-rose-200/50",
    border: "border-rose-400",
    text: "text-rose-400",
    accent: "bg-rose-400/30 backdrop-blur-sm",
    glow: "shadow-rose-400/50 shadow-xl [box-shadow:0_0_20px_rgba(244,63,94,0.5)] hover:[box-shadow:0_0_30px_rgba(244,63,94,0.7)]",
    appBg: "bg-gradient-to-br from-rose-900/10 via-transparent to-fuchsia-900/10",
    inputBg: "bg-white/20 backdrop-blur-sm border border-rose-300/30",
    cardHover: "hover:shadow-rose-500/60 hover:scale-105 transition-all duration-300"
  }
};

const standardsData = {
  pmbok: {
    name: "PMBOK 7th Edition",
    sections: [
      {
        id: "integration-management",
        title: "Integration Management",
        content: "Integration is not a standalone section — it is embedded across the Performance Domains: Tailoring, Planning, Project Work, Delivery, Measurement, Uncertainty, etc. (see “Project Performance Domains,” part of PMBOK’s “A Guide to the Project Management Body of Knowledge” portion)",
        keyPoints: []
      },
      {
        id: "stakeholder-management",
        title: "Stakeholder Management",
        content: "In the Stakeholder Performance Domain (one of the Performance Domains)",
        keyPoints: []
      },
      {
        id: "scope-management",
        title: "Scope Management",
        content: "Under the Planning Performance Domain (where scope planning and definition occur)",
        keyPoints: []
      },
      {
        id: "schedule-management",
        title: "Schedule Management",
        content: "Under Planning Performance Domain (for scheduling) and Measurement / Project Work Domains for monitoring schedule execution",
        keyPoints: []
      },
      {
        id: "cost-management",
        title: "Cost Management",
        content: "In Planning Performance Domain (for cost estimation, budgeting) and Measurement Domain (for cost control)",
        keyPoints: []
      },
      {
        id: "quality-management",
        title: "Quality Management",
        content: "Embedded in Delivery Performance Domain (ensuring deliverable quality) and Planning Domain for quality planning",
        keyPoints: []
      },
      {
        id: "resource-team-management",
        title: "Resource/Team Management",
        content: "Under Team Performance Domain (team formation, managing team) and Planning Domain (resource estimation/acquisition)",
        keyPoints: []
      },
      {
        id: "communication-management",
        title: "Communication Management",
        content: "In Stakeholder Performance Domain (communication with stakeholders) and Team Performance Domain / Planning Domain (planning communication)",
        keyPoints: []
      },
      {
        id: "risk-uncertainty-management",
        title: "Risk/Uncertainty Management",
        content: "In Uncertainty Performance Domain (addresses risk, ambiguity)",
        keyPoints: []
      },
      {
        id: "procurement-management",
        title: "Procurement Management",
        content: "In domains such as Delivery or Project Work (contracting and procurement functions)",
        keyPoints: []
      },
      {
        id: "change-management",
        title: "Change Management",
        content: "Primarily in the Uncertainty Performance Domain (Section 2.8, pages 135-154, for managing changes and responses); also addressed in the Enable Change Principle (Section 3.12, pages 58-59) and integrated across Measurement Domain (Section 2.7, pages 121-134) for control impacts.",
        keyPoints: []
      },
      {
        id: "business-case",
        title: "Business Case",
        content: "Found in Value Performance Domain (Section 2.4, pages 59–74) → focuses on value realization. Found in Delivery Performance Domain (Section 2.6, pages 105–120) → covers charter and benefits planning. Referenced in Planning Domain (Section 2.4, pages 69–84).",
        keyPoints: []
      },
      {
        id: "governance-organization",
        title: "Governance/Organization",
        content: "Team Performance Domain → Section 2.2, pages 29–44. Details governance models and decision frameworks. Leadership Principle → Section 3.6, pages 40–43. Focuses on effective oversight and accountability. Integrated throughout Stakeholder Domain → Section 2.1, pages 15–28. Emphasizes role alignment and communication flow.",
        keyPoints: []
      },
      {
        id: "plans-planning",
        title: "Plans/Planning",
        content: "Planning Performance Domain (Section 2.4, pages 69–84) — focuses on developing integrated and subsidiary plans. Referenced across all domains for tailored planning activities.",
        keyPoints: []
      },
      {
        id: "progress-monitoring",
        title: "Progress/Monitoring",
        content: "Measurement Performance Domain (Section 2.7, pages 121–134)  focuses on tracking performance, managing variances, and reporting. Integrated with Delivery Domain (Section 2.6, pages 105–120).",
        keyPoints: []
      },
      {
        id: "benefits-management",
        title: "Benefits Management",
        content: "Value Performance Domain — Section 2.4, pages 59–74 (focus on benefits realization as core to value). Delivery Performance Domain — Section 2.6, pages 105–120 (benefits planning and handover). Stewardship Principle — Section 3.1, pages 24–27 (sustained outcomes).",
        keyPoints: []
      },
      {
        id: "tailoring",
        title: "Tailoring",
        content: "Tailor Principle  Section 3.7, pages 44–47 (guidance on customizing processes, models, and methods). Applied explicitly throughout the 8 Performance Domains and 12 Principles. Example: Life cycle selection  pages 70–75 in Planning Domain.",
        keyPoints: []
      },
      {
        id: "sustainability",
        title: "Sustainability",
        content: "Stewardship Principle  Section 3.1, pages 24–27 (responsible management of resources and impacts). Uncertainty Performance Domain  Section 2.8, pages 135–154 (integrating ESG into risks and resilience). Referenced in Value Performance Domain  pages 59–74 (for long-term viability).",
        keyPoints: []
      },
      {
        id: "lessons-learned-management",
        title: "Lessons Learned Management",
        content: "Integrated across the Measurement Performance Domain (Section 2.7, pages 121–134). Included in Closure activities within the Delivery Domain (Section 2.6, pages 105–120). Specifically mentioned in the Optimize Risk Responses Principle (Section 3.10, pages 53–55). Identified as an artifact in retrospectives (e.g., pages 130–134).",
        keyPoints: []
      },
      {
        id: "project-closure",
        title: "Project Closure",
        content: "Covered in the Delivery Performance Domain (Section 2.6, pages 105–120), specifically in Close Project or Phase. Also integrated in the Measurement Domain (Section 2.7, pages 121–134). Connected with the Stewardship Principle (Section 3.1, pages 24–27).",
        keyPoints: []
      }
    ]
  },
  prince2: {
    name: "PRINCE2 7th Edition",
    sections: [
      {
        id: "integration-management",
        title: "Integration Management",
        content: "Integration is embedded within Practices (Business Case, Plans, etc.) and Processes (Directing a Project, Managing a Stage Boundary) as part of coordination and governance in those elements.",
        keyPoints: []
      },
      {
        id: "stakeholder-management",
        title: "Stakeholder Management",
        content: "Within the People integrated element and Organization Practice (roles, stakeholder relationships)",
        keyPoints: []
      },
      {
        id: "scope-management",
        title: "Scope Management",
        content: "In Plans Practice and Quality Practice (product descriptions, scope of products)",
        keyPoints: []
      },
      {
        id: "schedule-management",
        title: "Schedule Management",
        content: "In Plans Practice, possibly Progress Practice, and embedded in processes like Controlling a Stage",
        keyPoints: []
      },
      {
        id: "cost-management",
        title: "Cost Management",
        content: "Within Plans Practice (cost planning) and Business Case Practice (cost justification)",
        keyPoints: []
      },
      {
        id: "quality-management",
        title: "Quality Management",
        content: "In Quality Practice (defining quality, criteria, assurance)",
        keyPoints: []
      },
      {
        id: "resource-team-management",
        title: "Resource/Team Management",
        content: "In Organization Practice, People integrated element, and relevant processes like Controlling a Stage",
        keyPoints: []
      },
      {
        id: "communication-management",
        title: "Communication Management",
        content: "Through Organization Practice (communication model) and embedded in processes Directing / Controlling a Stage",
        keyPoints: []
      },
      {
        id: "risk-uncertainty-management",
        title: "Risk/Uncertainty Management",
        content: "In Risk Practice (identification, assessment, response), integrated in processes like Controlling a Stage",
        keyPoints: []
      },
      {
        id: "procurement-management",
        title: "Procurement Management",
        content: "In Plans Practice, Organization Practice, and embedded in project governance / supplier relations",
        keyPoints: []
      },
      {
        id: "change-management",
        title: "Change Management",
        content: "Issues Practice (pages 167-183, covering issue and change control procedures); embedded in Controlling a Stage Process (pages 251-260) and Managing Product Delivery (pages 261-267) for implementation.",
        keyPoints: []
      },
      {
        id: "business-case",
        title: "Business Case",
        content: "Described in Business Case Practice (pages 55–72) → defines development and maintenance. Integrated into Starting Up a Project (pages 219–227) → focuses on creating the initial justification. Integrated into Directing a Project (pages 229–237) → covers approvals and ongoing validation.",
        keyPoints: []
      },
      {
        id: "governance-organization",
        title: "Governance/Organization",
        content: "Organizing Practice → pages 73–95. Defines roles, responsibilities, and organizational structures (e.g., Project Board). Embedded in Directing a Project Process → pages 229–237. Addresses high-level governance and decision-making. Integrated into Initiating a Project Process → pages 239–249. Focuses on initial setup and establishment of governance mechanisms.",
        keyPoints: []
      },
      {
        id: "plans-planning",
        title: "Plans/Planning",
        content: "Plans Practice (pages 97–125)  covers plan types, planning levels, and product-based planning. Integrated into Initiating a Project Process (pages 239–249). Integrated into Managing a Stage Boundary (pages 269–276).",
        keyPoints: []
      },
      {
        id: "progress-monitoring",
        title: "Progress/Monitoring",
        content: "Progress Practice (pages 185–211)  covers tolerances, reports, and controls. Embedded in Controlling a Stage (pages 251–260). Embedded in Directing a Project (pages 229–237).",
        keyPoints: []
      },
      {
        id: "benefits-management",
        title: "Benefits Management",
        content: "Business Case Practice — pages 55–72 (benefits identification and management approach). Closing a Project Process — pages 277–283 (final realization planning). Directing a Project — pages 229–237 (executive oversight of benefits realization).",
        keyPoints: []
      },
      {
        id: "tailoring",
        title: "Tailoring",
        content: "Tailor to Suit the Project Principle  pages 29–30 (adapting method to context). Project Context Integrated Element  pages 7–12 (assessing scale, complexity, environment). Referenced throughout all Practices and Processes for contextual application.",
        keyPoints: []
      },
      {
        id: "sustainability",
        title: "Sustainability",
        content: "Sustainability Targets within People Integrated Element pages 31–45 (embedding ESG in team and delivery). Business Case Practice  pages 55–72 (assessing sustainable benefits). Cross-referenced in Tailor to Suit the Project Principle  pages 29–30 (context-specific adaptation of ESG).",
        keyPoints: []
      },
      {
        id: "lessons-learned-management",
        title: "Lessons Learned Management",
        content: "Embedded in the Learn from Experience Principle (pages 22–23). Present throughout the Managing a Stage Boundary process (pages 269–276). Present throughout the Closing a Project process (pages 277–283). Detailed in the Lessons Log and Lessons Report (Management Products, Appendix A, pages 285–306).",
        keyPoints: []
      },
      {
        id: "project-closure",
        title: "Project Closure",
        content: "Detailed in the Closing a Project Process (pages 277–283). Also referenced in the Directing a Project Process (pages 229–237) for project authorization and closure approval.",
        keyPoints: []
      }
    ]
  },
  iso: {
    name: "ISO 21500:2021",
    sections: [
      {
        id: "integration-management",
        title: "Integration Management",
        content: "Integration / governance is covered under Clause 4, especially 4.6 Integrated governance and management approaches",
        keyPoints: []
      },
      {
        id: "stakeholder-management",
        title: "Stakeholder Management",
        content: "In Clause 4.3.x, specifically 4.3.9 Identify stakeholders and 4.3.10 Manage stakeholders (these are processes listed in ISO’s process list)",
        keyPoints: []
      },
      {
        id: "scope-management",
        title: "Scope Management",
        content: "In processes under clause 4.3, e.g. 4.3.12 Create WBS / 4.3.13 Define activities etc.",
        keyPoints: []
      },
      {
        id: "schedule-management",
        title: "Schedule Management",
        content: "Through processes in clause 4.3 such as 4.3.23 Develop schedule / 4.3.24 Control schedule (or equivalent)",
        keyPoints: []
      },
      {
        id: "cost-management",
        title: "Cost Management",
        content: "In clause 4.3 processes like 4.3.25 Estimate costs, 4.3.26 Determine budget, 4.3.27 Control costs",
        keyPoints: []
      },
      {
        id: "quality-management",
        title: "Quality Management",
        content: "Via clause 4.3 processes such as 4.3.33 Perform quality assurance and 4.3.34 Perform quality control",
        keyPoints: []
      },
      {
        id: "resource-team-management",
        title: "Resource/Team Management",
        content: "Via clause 4.3 processes like 4.3.15 Establish project team, 4.3.16 Estimate resources, 4.3.17 Develop team, 4.3.18 Control resources",
        keyPoints: []
      },
      {
        id: "communication-management",
        title: "Communication Management",
        content: "Through clause 4.3 communication processes (e.g. 4.3.28 Plan communications / 4.3.29 Distribute information / 4.3.30 Manage communications)",
        keyPoints: []
      },
      {
        id: "risk-uncertainty-management",
        title: "Risk/Uncertainty Management",
        content: "Through clause 4.3 risk processes (e.g. 4.3.31 Identify risks / 4.3.32 Assess risks / 4.3.33 Treat risks / 4.3.34 Control risks)",
        keyPoints: []
      },
      {
        id: "procurement-management",
        title: "Procurement Management",
        content: "Via clause 4.3 procurement processes (e.g. 4.3.35 Plan procurements / 4.3.36 Select suppliers / 4.3.37 Administer procurements)",
        keyPoints: []
      },
      {
        id: "change-management",
        title: "Change Management",
        content: "Clause 7.10 Change control (pages 36-37) under Management practices; cross-referenced in Clause 6.6 Controlling a project (pages 22-24) for monitoring effects; Clause 7.9 Issues management (pages 35-36) as related.",
        keyPoints: []
      },
      {
        id: "business-case",
        title: "Business Case",
        content: "Defined in Clause 4.3.2 – Business Case (page 9). Referenced in Clause 6.5 – Initiating a Project (pages 21–22) → under Initial project justification. Referenced in Annex A – Initiating practices.",
        keyPoints: []
      },
      {
        id: "governance-organization",
        title: "Governance/Organization",
        content: "Clause 4.3 – Project Governance → pages 9–10. Covers organizational context, roles, and decision authority. Clause 4.5 – Project Organization and Roles → pages 10–15. Annex A → embedded under Integration and Leadership practices across groups.",
        keyPoints: []
      },
      {
        id: "plans-planning",
        title: "Plans/Planning",
        content: "Clause 7.2 Planning (pages 27–28) includes: 7.2.2 Developing the plan. 7.2.3 Monitoring the plan. Clause 6.5.5 Initial project planning (page 22). Annex A Planning practices.",
        keyPoints: []
      },
      {
        id: "progress-monitoring",
        title: "Progress/Monitoring",
        content: "Clause 6.6 Controlling a project (pages 22–24), includes: Managing project performance (6.6.3). Clause 7.15 Reporting (page 42). Annex A  Controlling practices.",
        keyPoints: []
      },
      {
        id: "benefits-management",
        title: "Benefits Management",
        content: "Clause 7.3 Benefit management — pages 28–29. 7.3.2 Identifying and analysing benefits 7.3.3 Monitoring benefits Annex A — “Closing and Improvement” practices for post-project benefit focus.",
        keyPoints: []
      },
      {
        id: "tailoring",
        title: "Tailoring",
        content: "Clause 5.2  Considerations for implementing project management  pages 16–17 (adapting practices to organizational and project context). Integrated into Clause 4.1  Overview (pages 4–6). Supported by Annex A  examples of practice customization.",
        keyPoints: []
      },
      {
        id: "sustainability",
        title: "Sustainability",
        content: "Clause 4.2  Context  pages 6–8 (mentions environmental sustainability impacts). Referenced in Clause 4.1.1 General (page 4) for organizational considerations. Connected to Clause 6.9  Post-project activities (page 26) for sustainability follow-up.",
        keyPoints: []
      },
      {
        id: "lessons-learned-management",
        title: "Lessons Learned Management",
        content: "Covered in Clause 7.18 Lessons learned (pages 44–45) under Management practices. Also addressed in Clause 6.8 Closing or terminating a project (page 25) for ongoing knowledge transfer. Annex A lists it as a practice in the Closing group.",
        keyPoints: []
      },
      {
        id: "project-closure",
        title: "Project Closure",
        content: "Defined in Clause 6.8 Closing or terminating a project (pages 25–26) under Integrated practices. Referenced in Annex A under the Closing group.",
        keyPoints: []
      }
    ]
  }
};

const comparisonData = [
  {
    topic: "Integration Management",
    similarities: [
      "Emphasizes coordination of people, processes, and activities for project objectives; overlapping guidance on unified plans, directing work, monitoring progress, and closure.",
      "Advocates centralized project management plan consolidating subsidiary plans (e.g., scope, schedule); stresses change control for alignment.",
      "Common practices: initiate with charter/mandate, monitor via reports, lessons learned at closure; uses tools like status reports/dashboards to track variances, adjust baselines, ensure value delivery; acts as \"glue\" reducing silos for holistic oversight."
    ],
    differences: [
      "PMBOK 7th: domain-based (8 domains), adaptive models (predictive/agile), outcome-focused (value delivery); terms: performance domains/artifacts (e.g., charter).",
      "PRINCE2: process-oriented, stage-based (non-overlapping), prescriptive with tolerances/escalation; terms: PID (integrated plan), exception management.",
      "ISO 21500: process-group (5 groups: Initiating/Planning/Implementing/Controlling/Closing), neutral terms (Develop Project Plans), high-level harmonization without tools; flexible/principle-driven (PMBOK), stage-gated/role-defined (PRINCE2), no certification (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: sustainability/adaptability in Uncertainty Domain, ambiguity models/techniques (pages 140-145).",
      prince2: "PRINCE2: Manage by Exception (Principle 5, pages 30-35) with tolerance-triggered escalations for governance.",
      iso: "ISO 21500: extends to programme/portfolio (Clause 4, pages 10-15; Develop Programme Charter Annex B) for strategic alignment."
    }
  },
  {
    topic: "Stakeholder Management",
    similarities: [
      "Converge on early identification, influence/interest analysis, ongoing engagement via communication/conflict resolution for buy-in and value.",
      "Overlapping practices: stakeholder registers/matrices for power/interest mapping, tailored engagement plans, continuous assessment for changes.",
      "Fosters alignment/reduces resistance via power-interest grids, regular feedback loops for satisfaction monitoring."
    ],
    differences: [
      "PMBOK 7th: engagement assessment matrix, sentiment analysis in adaptive/domain-specific method.",
      "PRINCE2: communication management approach in defined roles (e.g., Project Board), tolerances/stage reviews for structured engagement.",
      "ISO 21500: neutral stakeholder register in linear process flow, less adaptive than PMBOK/more generic than PRINCE2; outcome-focused (PMBOK), governance-driven (PRINCE2), compliance-oriented (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: stakeholder collaboration models (servant leadership agile, pages 25-28), emotional intelligence metrics.",
      prince2: "PRINCE2: mandatory three-interest model (business/user/supplier) in Project Board (Organization Practice, pages 70-75) for balance.",
      iso: "ISO 21500: stakeholders in portfolio governance (Clause 5, pages 15-20), programme engagement processes (Annex B)."
    }
  },
  {
    topic: "Scope Management",
    similarities: [
      "Advocate requirements collection for scope definition, hierarchical breakdowns (WBS/PBS), change requests to prevent creep.",
      "Common practices: traceability matrices linking requirements to deliverables, validation via acceptance criteria; baseline for monitoring alignment with objectives."
    ],
    differences: [
      "PMBOK 7th: scope baseline in domain-integrated, life-cycle adaptive (iterative) method.",
      "PRINCE2: PBS/Product Description in product-focused, stage-tolerance method.",
      "ISO 21500: WBS in sequential processes, no adaptive elements; flexible (PMBOK), prescriptive via products (PRINCE2), standardized/basic (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: scope in hybrids with progressive elaboration (pages 110-115).",
      prince2: "PRINCE2: Product Flow Diagrams for sequencing (Quality Practice, pages 90-95).",
      iso: "ISO 21500: merges requirements into Define Scope without separate validation (8.1.11)."
    }
  },
  {
    topic: "Schedule Management",
    similarities: [
      "Stress defining/sequencing/estimating activities for realistic baseline, control via variance analysis/adjustments for timely value delivery.",
      "Common practices: identify dependencies (e.g., finish-to-start), use CPM/Gantt charts/buffers for uncertainties; progressive elaboration from milestones to details.",
      "Overlap in EVM/progress reports for performance tracking, proactive mitigation (crashing/fast-tracking), integration with scope/resources; stakeholder reviews, forecast updates, data-driven actions for predictability."
    ],
    differences: [
      "PMBOK 7th: flexible domain-based, terms (schedule baseline/SPI), adapts to life cycles via rolling-wave/iterations; principle-driven tailoring, no rigid stages.",
      "PRINCE2: prescriptive stage-oriented, terms (stage plans/time tolerances), initiation/boundary updates, exception escalations/Project Board approvals; governance-focused.",
      "ISO 21500: linear process-group, neutral (develop/control schedule), high-level without tools/adaptations, international harmonization; adaptive/outcome-oriented (PMBOK), controlled/exception-based (PRINCE2), generic/process-mapped (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: agile techniques (iteration planning/velocity forecasting hybrids, pages 75-80), DevOps integration for empirical adjustments/continuous delivery.",
      prince2: "PRINCE2: tolerance-based scheduling with deviation-triggered reviews/replanning (Progress Practice, pages 140-145) for team empowerment/executive oversight.",
      iso: "ISO 21500: activity definition under scope (Clause 8.1.13, pages 31-32) as downstream, programme aggregation (Annex B) for multi-project timelines."
    }
  },
  {
    topic: "Cost Management",
    similarities: [
      "Converge on accurate estimation (historical data/expert judgment), baseline budget aggregation, variance tracking for viability/value delivery.",
      "Overlapping practices: three-point estimating, funding reconciliation, TCPI for overruns; integrate with schedule (EVM)/risks, formal change control, stakeholder reporting.",
      "Supports lifecycle costing (acquisition/operations/disposal), cost-benefit analysis; audits/corrective actions (reallocation/value engineering) to reduce waste/align goals."
    ],
    differences: [
      "PMBOK 7th: adaptive domain-integrated, terms (cost baseline/CV), agile via story points/burn-down; flexible tailoring, predictive analytics/sustainability.",
      "PRINCE2: stage-based, terms (cost/budget tolerances), continuous business case justification, exception reports; prescriptive, viability assessments.",
      "ISO 21500: sequential process-group, neutral (determine budget), no dedicated planning, standardization without metrics; metric-rich/hybrid (PMBOK), tolerance-governed/justification-driven (PRINCE2), streamlined/global (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: TCO models for sustainability (environmental costs, pages 80-85), agile fixed-price iterations for financial resilience.",
      prince2: "PRINCE2: cost tolerances set/reviewed at initiation/stage ends (Business Case Practice, pages 50-55), Board escalation for breaches/empowerment-accountability.",
      iso: "ISO 21500: no separate planning (folded into Clause 6.1, pages 20-22), direct programme funding links (Annex B) for portfolio oversight."
    }
  },
  {
    topic: "Quality Management",
    similarities: [
      "Emphasize planning standards from requirements, assurance via audits/reviews, control via inspections/testing for fit-for-purpose outputs.",
      "Common practices: metrics (e.g., defect density), Pareto charts for root causes, PDCA for improvement; customer validation, integration with scope/risks.",
      "Prevents rework (prevention over inspection); fosters quality culture via conformance reporting, data-driven enhancements for cost minimization/satisfaction maximization."
    ],
    differences: [
      "PMBOK 7th: quality metrics/cost of quality in domain-adaptive, predictive audits/agile retrospectives; principle-led, life-cycle tailoring.",
      "PRINCE2: Quality Register/Product Descriptions in product-centric, predefined criteria/stage-gate reviews; structured, tolerance-tied.",
      "ISO 21500: perform assurance/control in linear processes, no tools/metrics; standardized/basic; flexible/integrated (PMBOK), prescriptive/product-driven (PRINCE2), process-oriented/neutral (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: quality-value link via planning canvas hybrids (pages 110-115), servant leadership for team-driven.",
      prince2: "PRINCE2: acceptance criteria in every Product Description (Quality Practice, pages 90-95), mandatory handover reviews for assurance rigor.",
      iso: "ISO 21500: splits assurance/control without details (8.4.2-8.4.3), programme governance extension (Annex B) for multi-level."
    }
  },
  {
    topic: "Resource/Team Management",
    similarities: [
      "Underscore acquiring/developing/optimizing human/material resources for success; assess needs (skills/roles/availability), build teams via training/mentoring/feedback.",
      "Common practices: org charts/RACI for responsibilities, conflict resolution (interest-based), motivation (recognition/career development) for engagement/productivity.",
      "Integrate with scheduling (leveling)/budgeting; emphasize diversity/inclusion; proactive forecasting (histograms/capacity tools), reviews for gaps (burnout/skills); virtual tools, risk linking for resilience/value."
    ],
    differences: [
      "PMBOK 7th: domain-based adaptive, terms (team charter/high-performing characteristics), servant/situational leadership for self-organizing/agile; emotional intelligence/psychological safety, no fixed roles.",
      "PRINCE2: structured role-defined, terms (defined roles e.g., Project/Team Manager, senior interests), governance via tolerances/stage authorizations; prescriptive delegation, supplier focus.",
      "ISO 21500: neutral process-oriented (establish/control resources), linear estimation-management sequence, no leadership specifics; high-level standardization, no tools/motivation; outcome/people-centric (PMBOK), hierarchy/exception-based (PRINCE2), procedural/resource-agnostic (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: team stages (Tuckman model, pages 40-45) with interventions (co-location), health metrics (surveys/emotional intelligence) for psychological depth.",
      prince2: "PRINCE2: supplier interests in core structure, Board representation for outsourced balance/escalation paths (Organization Practice, pages 70-75).",
      iso: "ISO 21500: dedicated Control Resources (8.5.5, pages 37-38) for non-human (equipment), programme pooling (Annex B) for enterprise optimization."
    }
  },
  {
    topic: "Communication Management",
    similarities: [
      "Align on planning to meet stakeholder needs, distributing info via channels, managing interactions for trust/issue resolution.",
      "Common practices: stakeholder analysis for tailoring (influence-based), push/pull/interactive models, feedback (surveys/town halls) for effectiveness.",
      "Emphasize timely/accurate reporting (progress/risks/changes), governance integration for escalations/crises; cultural sensitivity, tools (dashboards/Teams) for transparency; metrics (response rates/satisfaction) for alignment/decision-making."
    ],
    differences: [
      "PMBOK 7th: communication requirements/engagement matrix in adaptive domain-integrated, agile stand-ups/kanban; principle-driven inclusivity/digital, no mandatory docs.",
      "PRINCE2: Communication Management Approach (baseline methods/frequencies) in process-oriented tied to roles/tolerances, formal reports (Highlight) for escalations; prescriptive governance.",
      "ISO 21500: neutral (distribute/manage communications) in sequential group flow, efficiency without models/roles; standardized compliance; flexible/stakeholder-centric (PMBOK), document-controlled/exception (PRINCE2), linear/minimalistic (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: advanced models (7 Cs with AI sentiment, pages 45-50) for global data-driven personalization.",
      prince2: "PRINCE2: escalation via standardized reports (Exception for breaches, pages 75-80), three-interests message alignment for governance transparency.",
      iso: "ISO 21500: distribute emphasis over interactive (8.6.2-8.6.3), programme aggregation (Annex B) for cross-project coordination."
    }
  },
  {
    topic: "Risk/Uncertainty Management",
    similarities: [
      "Advocate structured cycle: identify threats/opportunities (brainstorming/SWOT), assess probability/impact (matrices/EMV), response strategies (mitigate/transfer/accept), monitor via registers/audits.",
      "Common practices: heat maps for prioritization, owner assignment, baseline integration; risk-aware culture via training/escalations.",
      "Proactive handling links risks to objectives/value protection; tools like Monte Carlo for scenarios, reducing surprises/resilience."
    ],
    differences: [
      "PMBOK 7th: distinguishes risk/uncertainty, adaptive terms (exploit/enhance opportunities), domain-based agile backlogs/iterations; holistic resilience/life-cycle tailoring.",
      "PRINCE2: risk appetite/tolerance, symmetric threats/opportunities in practice-driven exceptions/escalations; governance-oriented, stage-updated register.",
      "ISO 21500: neutral (treat risks) in linear group, merged assessment/threat-focused, no planning/tools; broad/ambiguity-inclusive (PMBOK), tolerance-bound/balanced (PRINCE2), threat-centric/procedural (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: ambiguity management (scenario/Delphi for unknowns, pages 140-145), stewardship for ethical risk-taking.",
      prince2: "PRINCE2: positive risks equal to threats, Recommended Risk Response in register (pages 160-165) for optimism counter.",
      iso: "ISO 21500: no dedicated planning (folded into Clause 6), portfolio aggregation (Annex B) for strategic oversight."
    }
  },
  {
    topic: "Procurement Management",
    similarities: [
      "Structured acquisition: assess capabilities, select suppliers, negotiate contracts, oversee performance for quality/timeliness/cost/risk mitigation.",
      "Common practices: make-or-buy analysis, competitive methods (RFPs/bids) with criteria (capability/price/performance); KPI monitoring, milestone payments, dispute resolution (mediation), ethical/sustainable sourcing.",
      "Integrate with baselines (schedule/cost/risks); formal closure (audits/lessons/settlements); centralized strategies, tools (templates/databases) for transparency/value in global chains."
    ],
    differences: [
      "PMBOK 7th: detailed (procurement plan/source selection/contract control) in adaptive domain-integrated, hybrid life cycles (agile sprints), tools (bidder conferences/scoring); outcome-focused legal tailoring.",
      "PRINCE2: supplier controls/tolerances, terms (supplier interests on Board) in prescriptive practice-embedded, stage approvals/exceptions; governance-driven, no standalone processes.",
      "ISO 21500: neutral (administer procurements merging control/close) in linear group, high-level steps without tools/metrics/ethics; tool-rich/life-cycle adaptive (PMBOK), role-integrated/tolerance-bound (PRINCE2), streamlined/compliance-centric (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: ethical/sustainable sourcing (diversity/ESG clauses, pages 115-120), ISO 20400 integration for volatile compliance.",
      prince2: "PRINCE2: supplier management in structure, Board interests/escalation tolerances for breaches (pages 75-80) in governance partnerships.",
      iso: "ISO 21500: closure merged into administration (8.8.3, page 41), programme supplier pooling (Annex B, pages 45-50) for aggregated efficiency."
    }
  },
  {
    topic: "Change Management",
    similarities: [
      "Formalized evaluation/approval/implementation to prevent creep/overruns/delays; impact assessments/stakeholder consultations for objective alignment.",
      "Common practices: change log tracking, analyses (scope/schedule/cost/risks/quality via decision trees/cost-benefit), CCB/authority for approvals.",
      "Verification (testing/audits), baseline updates, lessons capture; communication for transparency/buy-in; categorize changes (emergency/normal), risk linking for mitigation/disciplined evolution."
    ],
    differences: [
      "PMBOK 7th: integrated change control/change request in adaptive principle-based, agile retrospectives/sprints; resilience/holistic domains, life-cycle tailoring no mandatory boards.",
      "PRINCE2: issue/change procedure (changes as issues), terms (RFC/off-spec) in prescriptive practice-oriented tolerances/exceptions; governance-heavy, Board for majors.",
      "ISO 21500: neutral control changes (single process) in linear group, verification without tools/escalations; standardized/concise; domain-spanning/outcome-adaptive (PMBOK), exception/stage-gated (PRINCE2), streamlined/process-focused (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: change resilience models (Kotter's 8-step cultural, pages 145-150) for human-centered momentum.",
      prince2: "PRINCE2: standardized forms (RFC/Issue Report templates, pages 180-185) for Change Authority auditability.",
      iso: "ISO 21500: embedded solely in integration (8.1.6), implicit programme via aggregated controls (Annex B, pages 45-50) for multi-synchronization."
    }
  },
  {
    topic: "Business Case",
    similarities: [
      "Compelling justification: benefits/costs/risks/alternatives, ongoing updates for viability.",
      "Common practices: quantitative (NPV/IRR/payback), qualitative (alignment/value); sensitivity analysis, resource/success linking, gateway reviews (go/no-go).",
      "Transparency via summaries/visuals (benefit maps); integrate risks/benefits management; drives ROI/priority alignment."
    ],
    differences: [
      "PMBOK 7th: value delivery system, benefits realization plan in principle-driven domain-based, adaptive forecasting/life cycles; holistic sustainability, agile evolution no templates.",
      "PRINCE2: Outline/Full Business Case/Benefits Approach in practice-based, continuous stage-boundary justification/tolerances/escalations; prescriptive versions/updates.",
      "ISO 21500: neutral develop business case in high-level planning, no metrics/updates; standardized initial artifact; outcome/integrated (PMBOK), justification-gated/tolerance-linked (PRINCE2), foundational/static (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: benefits forecasting (parametric/enablers like readiness, pages 90-95), stewardship for societal value.",
      prince2: "PRINCE2: progressive versions (outline/full/updates, pages 50-55), tolerance linkage for viability checks/lifecycle governance.",
      iso: "ISO 21500: portfolio-level input (Clause 6.2, pages 23-25) for aggregated strategic funding/hierarchy."
    }
  },
  {
    topic: "Governance/Organization",
    similarities: [
      "Robust structure clarifying roles/responsibilities/reporting for accountability/decision-making/enterprise alignment; RACI to avoid gaps.",
      "Common practices: escalations, ethical/compliance embedding, diverse representation; regular reviews (audits/maturity) at milestones.",
      "Supportive ecosystem: delegation/mandates/feedback; aligns culture, decision logs, change/risk linking for resilience/trust/value."
    ],
    differences: [
      "PMBOK 7th: governance framework/adaptive leadership (transformational/distributed) in domain-integrated principle-based, life-cycle tailoring; holistic collaboration/systems thinking, no hierarchies.",
      "PRINCE2: Project Board (Executive/User/Supplier)/info needs in prescriptive practice-oriented, mandated roles/tolerances/stage approvals; hierarchical governance/comms.",
      "ISO 21500: neutral organizational context/decision authority in high-level process-group, strategic guidance no roles; standardized scalability; adaptive/people-empowering (PMBOK), role-rigid/exception (PRINCE2), foundational/enterprise-aligned (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: systems thinking integration, causal loop diagrams for interdependencies (pages 12-15) in adaptive leadership.",
      prince2: "PRINCE2: three-interests model for Board (pages 70-75) ensuring equitable representation/conflict resolution.",
      iso: "ISO 21500: programme/portfolio leadership extension (Clause 5.2, pages 17-20) for multi-project alignment/strategic tiers."
    }
  },
  {
    topic: "Plans/Planning",
    similarities: [
      "Iterative comprehensive plans outlining objectives; inputs (stakeholders/data/constraints) for baselines (scope/schedule/cost/risks).",
      "Common practices: progressive elaboration (outlines to details via workshops/decomposition), WBS/mind maps for visualization/alignment.",
      "Integrate subsidiaries into master; what-if analyses, gateway reviews; link to execution for agility/realism (uncertainties/resources/quality)."
    ],
    differences: [
      "PMBOK 7th: integrated plan in domain-spanning adaptive, life-cycle tailoring (iterative agile); principles/holistic, digital collaborative tools.",
      "PRINCE2: Project/Stage/Team Plans in product-based hierarchical, stage tolerances/product descriptions; prescriptive baselines/boundaries governance.",
      "ISO 21500: develop baseline plans in sequential group, detail levels (high/medium/low); standardization no tools; interconnected/life-cycle (PMBOK), stage-layered/product (PRINCE2), phased/scalable (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: life-cycle tailoring canvases (predictive/adaptive hybrids, pages 70-75), DevOps for continuous.",
      prince2: "PRINCE2: PBS incorporation (pages 110-115) for bottom-up deliverable-derived activities/traceability.",
      iso: "ISO 21500: three plan types (strategic/tactical/operational, 6.1.3, pages 22-23), programme scaling (Annex B) for multi-level."
    }
  },
  {
    topic: "Progress/Monitoring",
    similarities: [
      "Continuous tracking vs. baselines via KPIs/variance/correctives for alignment/interventions.",
      "Common practices: status reports (dashboards/S-curves), EVM for schedule/cost, trend analyses for forecasts.",
      "Stakeholder communications (achievements/issues/forecasts), threshold alerts, lessons data; objective metrics (SPI/CPI)/reviews for proactive feedback/risk reduction/momentum."
    ],
    differences: [
      "PMBOK 7th: performance baselines/EVM in adaptive domain-based, agile burndown/iterations; data-centric life-cycle thresholds.",
      "PRINCE2: tolerances/Highlight/Exception Reports in practice-driven manage-by-exception/escalations; governance/stage-specific.",
      "ISO 21500: control project work in linear processes, evaluation no EVM; standardized/process-mapped; quantitative/flexible (PMBOK), exception/report-based (PRINCE2), control-oriented/basic (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: customizable thresholds (AI anomaly, pages 125-130), uncertainty integration for predictive hybrids.",
      prince2: "PRINCE2: Checkpoint Reports from teams (pages 140-145) for granular pulses within tolerances/delegation.",
      iso: "ISO 21500: aggregated across domains (Clause 9 folded into controls), portfolio dashboards (Annex B) for enterprise visibility."
    }
  },
  {
    topic: "Benefits Management",
    similarities: [
      "Systematic identification/measurement/realization of benefits (tangible/intangible) for long-term value; map to objectives, track baselines lifecycle/operations.",
      "Common practices: profiles/registers (descriptions/owners/metrics/dependencies), milestone audits/reviews for shortfalls/correctives (training/tweaks).",
      "Handover (benefit maps), post-project monitoring (6-12 months for disbenefits); integrate business cases/risks; tools (networks/scorecards) for accountability/maximizing impact."
    ],
    differences: [
      "PMBOK 7th: benefits realization plan artifact in value domains, organizational enablers/value measurement in principle-based adaptive/hybrid; forecasting/iterations, sustainability no post-mandates.",
      "PRINCE2: benefits management approach/baseline profile in practice-integrated, ongoing tolerances/stage reviews/business case updates/escalations; prescriptive handover/executive oversight.",
      "ISO 21500: realize/maintain benefits in linear improvement-group, post-execution no planning; standardized compliance; predictive/domain-holistic (PMBOK), tolerance/lifecycle-continuous (PRINCE2), execution/post-delivery (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: organizational enablers (change strategies/training matrices/maturity, pages 95-100) for systemic embedding/cultural barriers.",
      prince2: "PRINCE2: baseline profile at initiation/updates (pages 55-60), tolerance linkage for dynamic justification/protection.",
      iso: "ISO 21500: programme/portfolio improvement positioning (10.2, pages 37-38), aggregated tracking (Annex B) for hierarchical sustainment."
    }
  },
  {
    topic: "Tailoring",
    similarities: [
      "Evaluate attributes (size/complexity/industry/maturity/regulations) to modify processes/tools for enhancement without over-engineering.",
      "Common practices: assessments (checklists/maturity models), document decisions (plans/logs), iterate via pilots/retrospectives.",
      "Risk-based scaling (simplify low-complexity, enhance high-stakes), stakeholder involvement; balances standardization/flexibility for efficiency/engagement/success."
    ],
    differences: [
      "PMBOK 7th: core principle/life cycle selection (predictive/adaptive/hybrid) in domain-holistic, adaptations across principles/domains; visual canvases, inherently flexible/principle-led.",
      "PRINCE2: tailor to suit principle/project context factors in structured mandatory for principles/themes/processes via tolerances; prescriptive/scalable, PID justification.",
      "ISO 21500: tailoring guidance/contextual adaptation in high-level clause-based, generic criteria for groups no tools/principles; standardized/organizational; interconnected/life-cycle (PMBOK), principle-embedded/environment (PRINCE2), foundational/compliance (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: tailoring canvas matrix for attributes/domain adjustments (pages 16-18), SAFe hybrids for collaborative scaling.",
      prince2: "PRINCE2: sustainability/inclusivity mandate (pages 30-35), ESG/diversity in adaptations (virtual tools) with people integration.",
      iso: "ISO 21500: programme/portfolio extension (4.4.2, pages 13-15), hierarchy harmonization (Annex B) for multi-project strategy."
    }
  },
  {
    topic: "Sustainability",
    similarities: [
      "Incorporate ESG into decisions for impact minimization/legacy maximization; lifecycle assessments (carbon tracking), SDG-aligned targets.",
      "Common practices: supplier evaluations, stakeholder consultations (diversity), ESG dashboards/audits for compliance/improvement.",
      "Integrate risks (climate analysis)/benefits (green ROI)/governance; materiality matrices; triple bottom line via policy/training/metrics for resilience/ethics."
    ],
    differences: [
      "PMBOK 7th: stewardship principle/triple bottom line/ESG integration in adaptive domain-based, uncertainty/value weaving; ethical leadership/life-cycle tailoring, holistic no targets.",
      "PRINCE2: sustainability targets/ESG measures in practice-integrated business/people linking, stage assessments/tolerances; targeted/governance-tied prescriptive inclusion.",
      "ISO 21500: sustainability context/ESG factors in contextual clause-based, high-level process embedding/strategy; standardized no metrics; ethical/resilience (PMBOK), performance/tolerance (PRINCE2), contextual/guideline (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: ESG risk fusion (climate scenarios, pages 2-4), servant leadership for social equity/principle-rooted anticipation.",
      prince2: "PRINCE2: sustainability approach as business case extension (pages 22-25), quantifiable targets (net-zero)/stage reviews/escalation accountability.",
      iso: "ISO 21500: portfolio governance scaling (Annex C, pages 52-55), ESG aggregation (resource audits) for enterprise optimization."
    }
  },
  {
    topic: "Lessons Learned Management",
    similarities: [
      "Systematic capture/dissemination throughout lifecycle (not just end) for maturity improvement; repositories (logs/databases) for insights (successes/failures/risks).",
      "Common practices: milestone reviews/retrospectives, stakeholder sharing (reports/databases); what went well/improvements/recommendations via root cause (fishbone/after-action).",
      "Integrate into plans/processes/assets; team-facilitated sessions, domain categorization, archiving for efficiency/risk reduction/learning culture."
    ],
    differences: [
      "PMBOK 7th: principle-based adaptive, retrospectives/knowledge artifacts in domains, real-time iterations no formal logs; outcome/value metrics/hybrid tailoring.",
      "PRINCE2: structured process-driven, Lessons Log/Report products progressively/stage ends, lessons from experience/tolerances/exceptions; prescriptive boundary reviews/escalations.",
      "ISO 21500: neutral process-group (Collect Lessons Learned distinct), linear controlling/closing integration no tools; high-level documentation/transfer; flexible/domain-integrated (PMBOK), governance/staged (PRINCE2), concise/compliance (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: adaptive models with knowledge platforms (wikis/AI repos, pages 22-25), psychological safety in retrospectives.",
      prince2: "PRINCE2: PID updates/End Project Report inclusion (Closing, pages 225-230), Board approval for post-handover accountability.",
      iso: "ISO 21500: programme/portfolio extension (Clause 10.3, pages 38-40), multi-project insight aggregation into standards/strategic hierarchy."
    }
  },
  {
    topic: "Project Closure",
    similarities: [
      "Formal end: verify deliverables/approvals, release resources, archive docs for obligations/value realization.",
      "Common practices: final reviews (audits/inspections), handover to operations, lessons updates, celebrations for morale.",
      "Administrative (contracts)/technical (evaluations) closure; checklists/sign-offs; benefits assessment, issue resolution, communications/financial reconciliations for transition/knowledge transfer."
    ],
    differences: [
      "PMBOK 7th: domain-based adaptive, final report/transition planning in iterative deliveries (agile sprints/reviews); outcome/sustained value, premature flexibility.",
      "PRINCE2: process-oriented, Prepare Planned Closure/Hand Over Products, End Project Report/Post-Project Benefits Plan; prescriptive Board authorization/business viability exceptions.",
      "ISO 21500: straightforward process-group, Close Project/Phase neutral verification/release no reports; less prescriptive/generic scalable governance integration; holistic/life-cycle (PMBOK), governance/formal handover (PRINCE2), minimalistic/international (ISO)."
    ],
    unique: {
      pmbok: "PMBOK 7th: sustainable closure with environmental/social assessments (pages 115-120) for stewardship alignment.",
      prince2: "PRINCE2: Follow-On Action Recommendations in End Report (pages 225-230), post-scheduled benefits reviews for forward governance.",
      iso: "ISO 21500: phase-level with portfolio handover links (Clause 8.1.8/Annex B), aggregated multi-project environments/strategic integration."
    }
  }
];

const scenariosData = {
  'high-uncertainty-tech': {
    name: "High-Uncertainty Tech Startup Project",
    description: "A fast-paced software development project with high ambiguity, small team, and rapid iterations.",
    recommendations: {
      pmbok: [
        { process: "Adopt Adaptive Life Cycles", evidence: "Use hybrid approaches with progressive elaboration in Planning Domain (pages 70-75). Evidence: Reduces risk in uncertain environments by allowing flexibility.", sectionId: "plans-planning" },
        { process: "Emphasize Uncertainty Management", evidence: "Integrate ambiguity models like scenario planning (pages 140-145). Evidence: Builds resilience for tech volatility.", sectionId: "risk-uncertainty-management" },
        { process: "Stakeholder Collaboration", evidence: "Servant leadership for agile teams (pages 25-28). Evidence: Enhances engagement in dynamic settings.", sectionId: "stakeholder-management" }
      ],
      prince2: [
        { process: "Tailor to Suit Context", evidence: "Adapt principles for agile environments with tolerances (pages 29-30). Evidence: Allows controlled flexibility without losing governance.", sectionId: "tailoring" },
        { process: "Manage by Exception", evidence: "Tolerance-based escalations for rapid changes (pages 30-35). Evidence: Efficient for startups by minimizing oversight.", sectionId: "integration-management" },
        { process: "Risk Practice Integration", evidence: "Symmetric threat/opportunity responses (pages 160-165). Evidence: Balances innovation risks.", sectionId: "risk-uncertainty-management" }
      ],
      iso: [
        { process: "Contextual Tailoring", evidence: "Adapt practices to project complexity (pages 16-17). Evidence: Ensures scalability for small, high-risk projects.", sectionId: "tailoring" },
        { process: "Risk Treatment Processes", evidence: "Identify and treat risks iteratively (Clause 4.3.31-34). Evidence: Provides neutral framework for uncertainty.", sectionId: "risk-uncertainty-management" },
        { process: "Integrated Governance", evidence: "Use Clause 4.6 for lightweight approaches (pages 10-15). Evidence: Harmonizes with agile without rigidity.", sectionId: "integration-management" }
      ]
    }
  },
  'large-construction': {
    name: "Large-Scale Construction Project",
    description: "A multi-year infrastructure project with fixed scope, regulatory constraints, and large teams.",
    recommendations: {
      pmbok: [
        { process: "Predictive Life Cycles", evidence: "Detailed planning and WBS for scope control (pages 110-115). Evidence: Ensures compliance in regulated industries.", sectionId: "scope-management" },
        { process: "Resource Optimization", evidence: "Tuckman model for large team development (pages 40-45). Evidence: Manages diverse stakeholders effectively.", sectionId: "resource-team-management" },
        { process: "Sustainability Integration", evidence: "ESG in value domain for long-term viability (pages 59-74). Evidence: Aligns with environmental regulations.", sectionId: "sustainability" }
      ],
      prince2: [
        { process: "Stage-Based Control", evidence: "Use tolerances for cost/schedule in large stages (pages 185-211). Evidence: Provides governance for complex deliveries.", sectionId: "progress-monitoring" },
        { process: "Product-Based Planning", evidence: "PBS for scope definition (pages 97-125). Evidence: Prevents creep in fixed-scope projects.", sectionId: "scope-management" },
        { process: "Business Case Maintenance", evidence: "Ongoing justification with tolerances (pages 55-72). Evidence: Tracks ROI in capital-intensive work.", sectionId: "business-case" }
      ],
      iso: [
        { process: "Sequential Processes", evidence: "WBS and activity definition (Clause 4.3.12-13). Evidence: Standardizes for large-scale compliance.", sectionId: "scope-management" },
        { process: "Procurement Planning", evidence: "Supplier selection in regulated contexts (Clause 4.3.36). Evidence: Ensures ethical sourcing.", sectionId: "procurement-management" },
        { process: "Benefit Monitoring", evidence: "Post-project sustainment (pages 28-29). Evidence: Focuses on long-term infrastructure value.", sectionId: "benefits-management" }
      ]
    }
  },
  'agile-hybrid': {
    name: "Hybrid Agile-Waterfall Product Launch",
    description: "A marketing campaign with upfront planning and iterative execution phases.",
    recommendations: {
      pmbok: [
        { process: "Hybrid Life Cycle Tailoring", evidence: "Blend predictive and adaptive in Planning (pages 70-75). Evidence: Balances structure with flexibility for launches.", sectionId: "plans-planning" },
        { process: "Change Resilience", evidence: "Kotter's model for cultural shifts (pages 145-150). Evidence: Manages mid-project pivots.", sectionId: "change-management" },
        { process: "Communication Models", evidence: "7 Cs with sentiment analysis (pages 45-50). Evidence: Enhances stakeholder buy-in.", sectionId: "communication-management" }
      ],
      prince2: [
        { process: "Tailored Processes", evidence: "Adapt for hybrid with stage boundaries (pages 29-30). Evidence: Maintains control in mixed approaches.", sectionId: "tailoring" },
        { process: "Progress Tolerances", evidence: "Checkpoint reports for iterations (pages 140-145). Evidence: Tracks hybrid progress efficiently.", sectionId: "progress-monitoring" },
        { process: "Lessons from Experience", evidence: "Embed in boundaries (pages 22-23). Evidence: Captures hybrid learnings.", sectionId: "lessons-learned-management" }
      ],
      iso: [
        { process: "Tailoring Considerations", evidence: "Adapt to hybrid contexts (pages 16-17). Evidence: Provides neutral scaling.", sectionId: "tailoring" },
        { process: "Schedule Control", evidence: "Develop and control hybrid schedules (Clause 4.3.23-24). Evidence: Integrates phases seamlessly.", sectionId: "schedule-management" },
        { process: "Stakeholder Management", evidence: "Ongoing engagement (Clause 4.3.10). Evidence: Supports iterative feedback.", sectionId: "stakeholder-management" }
      ]
    }
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('pmbok');
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('high-uncertainty-tech');
  const [bookmarks, setBookmarks] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showStandardModal, setShowStandardModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [insightType, setInsightType] = useState(null);

  const theme = themes[currentTheme];
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryText = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes highlightPulse {
        0%, 100% { 
          background-color: transparent;
          transform: scale(1);
        }
        50% { 
          background-color: rgba(59, 130, 246, 0.3);
          transform: scale(1.02);
        }
      }
      .highlight-section {
        animation: highlightPulse 2s ease-in-out;
        border: 2px solid rgba(59, 130, 246, 0.5);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleBookmark = (bookmarkItem) => {
    const bookmarkKey = `${bookmarkItem.standard}-${bookmarkItem.id}`;
    setBookmarks(prev =>
      prev.some(b => `${b.standard}-${b.id}` === bookmarkKey)
        ? prev.filter(b => `${b.standard}-${b.id}` !== bookmarkKey)
        : [...prev, bookmarkItem]
    );
  };

  const isBookmarked = (id, standard) => {
    return bookmarks.some(b => b.id === id && b.standard === standard);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const handleInsightClick = (insight, type) => {
    console.log('Insight clicked:', insight, type);
    setSelectedInsight(insight);
    setInsightType(type);
    setShowStandardModal(true);
  };

  const navigateToSection = (standardKey) => {
    setShowStandardModal(false);
    setCurrentPage('library');
    setSelectedStandard(standardKey);

    const comparison = comparisonData[selectedTopic];
    const section = standardsData[standardKey].sections.find(s => s.title === comparison.topic);

    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-section');
          setTimeout(() => element.classList.remove('highlight-section'), 2000);
        }
      }, 300);
    }
  };

  const navigateToBookmarkedSection = (standardKey, sectionId) => {
    setCurrentPage('library');
    setSelectedStandard(standardKey);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-section');
        setTimeout(() => element.classList.remove('highlight-section'), 2000);
      }
    }, 300);
  };

  const handleUniqueClick = (standardKey, uniqueText) => {
    console.log('Unique point clicked:', standardKey);
    navigateToSection(standardKey);
  };

  const handleRecommendationClick = (standardKey, sectionId) => {
    navigateToSection(standardKey);
    // Scroll to specific section in library
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    const results = [];

    Object.entries(standardsData).forEach(([key, standard]) => {
      standard.sections.forEach(section => {
        if (section.title.toLowerCase().includes(query) ||
          section.content.toLowerCase().includes(query)) {
          results.push({ ...section, standard: key, standardName: standard.name });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const scenario = scenariosData[selectedScenario];

  const HomePage = () => (
    <div className="space-y-8">
      <div className={`text-center py-12 bg-gradient-to-r ${theme.gradient} text-white rounded-lg shadow-xl`}>
        <h1 className="text-5xl font-bold mb-4">PM Standards Hub</h1>
        <p className="text-xl mb-6">Compare PMBOK, PRINCE2, and ISO 21500/21502 | Generate Tailored Processes</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setCurrentPage('library')}
            className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Explore Standards
          </button>
          <button
            onClick={() => setCurrentPage('compare')}
            className="bg-gray-800 bg-opacity-30 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-all"
          >
            Compare Now
          </button>
          <button
            onClick={() => setCurrentPage('tailor')}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all shadow-lg"
          >
            Tailor Processes
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 ${theme.border} transform hover:scale-105 transition-transform`}>
          <BookOpen className={`w-12 h-12 ${theme.text} mb-4`} />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Standards Library</h3>
          <p className={secondaryText}>Browse and search through PMBOK 7, PRINCE2, and ISO standards.</p>
        </div>
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 border-purple-500 transform hover:scale-105 transition-transform`}>
          <GitCompare className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Comparison Engine</h3>
          <p className={secondaryText}>Side-by-side topic comparisons with detailed insights.</p>
        </div>
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 border-yellow-500 transform hover:scale-105 transition-transform`}>
          <Zap className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Tailored Processes</h3>
          <p className={secondaryText}>Generate evidence-based recommendations for your project scenario.</p>
        </div>
      </div>

      <div className={`${cardBg} p-8 rounded-lg shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Project WBS Overview</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>1.0 Project Initiation</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>1.1 Requirements Analysis</div>
            <div>1.2 Technology Stack Selection</div>
            <div>1.3 Project Setup</div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>2.0 Standards Repository</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>2.1 Data Structure Design</div>
            <div>2.2 Search Implementation</div>
            <div>2.3 Navigation System</div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>3.0 Comparison Engine</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>3.1 Comparison Logic</div>
            <div>3.2 Deep Linking System</div>
            <div>3.3 Side-by-Side View</div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>4.0 Tailoring Engine</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>4.1 Scenario Selection</div>
            <div>4.2 Evidence-Based Recommendations</div>
            <div>4.3 Process Generation</div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`font-semibold ${textColor}`}>5.0 Insights Dashboard</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>5.1 Analytics Engine</div>
            <div>5.2 Visualization Components</div>
            <div>5.3 Summary Reports</div>
          </div>
        </div>
      </div>
    </div>
  );

  const LibraryPage = () => {
    const standard = standardsData[selectedStandard];

    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Standards Library</h2>

          <div className="mb-6">
            <div className="relative">
              <Search className={`absolute left-3 top-3 w-5 h-5 ${secondaryText}`} />
              <input
                type="text"
                placeholder="Search across all standards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className={`font-semibold ${textColor}`}>Search Results:</h3>
                {searchResults.map((result) => (
                  <div key={`${result.standard}-${result.id}`} className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-sm font-semibold ${theme.text}`}>{result.standardName}</span>
                        <h4 className={`font-semibold ${textColor}`}>{result.title}</h4>
                        <p className={`text-sm ${secondaryText}`}>{result.content.substring(0, 100)}...</p>
                      </div>
                      <button
                        onClick={() => toggleBookmark({ id: result.id, standard: result.standard })}
                        className={isBookmarked(result.id, result.standard) ? 'text-yellow-500' : 'text-gray-400'}
                      >
                        <Bookmark className="w-5 h-5" fill={isBookmarked(result.id, result.standard) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {Object.entries(standardsData).map(([key, std]) => (
              <button
                key={key}
                onClick={() => setSelectedStandard(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedStandard === key
                  ? `${theme.primaryBtn} text-white shadow-lg`
                  : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`
                  }`}
              >
                {std.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {standard.sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className={`text-sm ${secondaryText}`}>{section.id}</span>
                    <h3 className={`text-xl font-bold ${textColor}`}>{section.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedTopic(comparisonData.findIndex(c => c.topic === section.title));
                        setCurrentPage('compare');
                      }}
                      className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-all`}
                      title="Compare this topic"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                      onClick={() => toggleBookmark({ id: section.id, standard: selectedStandard })}
                      className={isBookmarked(section.id, selectedStandard) ? 'text-yellow-500' : 'text-gray-400'}
                    >
                      <Bookmark className="w-5 h-5" fill={isBookmarked(section.id, selectedStandard) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
                <p className={`${secondaryText} mb-3`}>{section.content}</p>
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {section.keyPoints.map((point, idx) => (
                      <span key={idx} className={`px-3 py-1 ${theme.secondaryBg} rounded-full text-sm`}>
                        {point}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TailorPage = () => (
    <div className="space-y-6">
      <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Tailored Project Processes</h2>
        <p className={secondaryText}>Select a scenario to generate evidence-based recommendations from the standards.</p>

        <div className="mb-6">
          <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Select Scenario:</label>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            {Object.entries(scenariosData).map(([key, data]) => (
              <option key={key} value={key}>{data.name}</option>
            ))}
          </select>
        </div>

        <div className={`${cardBg} p-4 rounded-lg mb-6 ${secondaryText}`}>
          <strong>Scenario Description:</strong> {scenario.description}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {['pmbok', 'prince2', 'iso'].map((stdKey) => {
            const stdName = standardsData[stdKey].name;
            const recs = scenario.recommendations[stdKey];
            return (
              <div key={stdKey} className={`p-4 rounded-lg ${theme.accent} border-l-4 ${theme.border}`}>
                <h3 className={`text-xl font-bold mb-4 ${theme.text}`}>{stdName}</h3>
                <div className="space-y-3">
                  {recs.map((rec, idx) => (
                    <div key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                      <h4 className={`font-semibold ${textColor}`}>{rec.process}</h4>
                      <p className={secondaryText}>{rec.evidence}</p>
                      <button
                        onClick={() => handleRecommendationClick(stdKey, rec.sectionId)}
                        className={`mt-2 text-sm ${theme.text} hover:underline flex items-center gap-1`}
                      >
                        View Evidence <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const BookmarksPage = () => (
    <div className="space-y-6">
      <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold ${textColor}`}>Bookmarks</h2>
          {bookmarks.length > 0 && (
            <button
              onClick={clearBookmarks}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${theme.primaryBtn} text-white`}
            >
              Clear All
            </button>
          )}
        </div>
        {bookmarks.length === 0 ? (
          <div className={`text-center py-12 ${secondaryText}`}>
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No bookmarks yet. Start bookmarking sections in the library!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmark, idx) => {
              const standard = standardsData[bookmark.standard];
              const section = standard.sections.find(s => s.id === bookmark.id);
              if (!section) return null;
              return (
                <div key={idx} className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`text-sm font-semibold ${theme.text}`}>{standard.name}</span>
                      <h3 className={`text-xl font-bold ${textColor}`}>{section.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTopic(comparisonData.findIndex(c => c.topic === section.title));
                          setCurrentPage('compare');
                        }}
                        className={`p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-all`}
                        title="Compare this topic"
                      >
                        <ExternalLink className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(bookmark)}
                        className="text-yellow-500"
                      >
                        <Bookmark className="w-5 h-5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                  <p className={`${secondaryText} mb-3`}>{section.content}</p>
                  <button
                    onClick={() => navigateToBookmarkedSection(bookmark.standard, bookmark.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${theme.primaryBtn} text-white`}
                  >
                    View in Library
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const ComparePage = () => {
    const comparison = comparisonData[selectedTopic];

    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Standards Comparison</h2>

          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${textColor}`}>Select Topic:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(Number(e.target.value))}
              className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              {comparisonData.map((item, idx) => (
                <option key={idx} value={idx}>{item.topic}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg border-l-4 border-blue-600 ${isDarkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'}`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>PMBOK 7</h3>
              <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                {standardsData.pmbok.sections.find(s => s.title === comparison.topic)?.content}
              </p>
              <button
                onClick={() => navigateToSection('pmbok')}
                className="text-blue-600 text-sm font-semibold mt-2 inline-flex items-center hover:underline">
                View Full Section <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-purple-600 ${isDarkMode ? 'bg-purple-900 bg-opacity-30' : 'bg-purple-50'}`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>PRINCE2</h3>
              <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                {standardsData.prince2.sections.find(s => s.title === comparison.topic)?.content}
              </p>
              <button
                onClick={() => navigateToSection('prince2')}
                className="text-purple-600 text-sm font-semibold mt-2 inline-flex items-center hover:underline">
                View Full Section <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-green-600 ${isDarkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'}`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>ISO 21500</h3>
              <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                {standardsData.iso.sections.find(s => s.title === comparison.topic)?.content}
              </p>
              <button
                onClick={() => navigateToSection('iso')}
                className="text-green-600 text-sm font-semibold mt-2 inline-flex items-center hover:underline">
                View Full Section <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className={`font-bold ${isDarkMode ? 'text-green-300' : 'text-green-900'}`}>Similarities</h3>
              </div>
              <div className="space-y-2">
                {comparison.similarities.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleInsightClick(item, 'similarity')}
                    className={`p-3 rounded cursor-pointer transition-all ${isDarkMode
                      ? 'hover:bg-green-800 hover:bg-opacity-30 text-green-200'
                      : 'hover:bg-green-100 text-green-800'
                      } border ${isDarkMode ? 'border-green-800' : 'border-green-200'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>• {item}</span>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </div>
                    <span className="text-xs opacity-70 mt-1 block">Click to view in standards</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${isDarkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className={`font-bold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>Key Differences</h3>
              </div>
              <div className="space-y-2">
                {comparison.differences.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleInsightClick(item, 'difference')}
                    className={`p-3 rounded cursor-pointer transition-all ${isDarkMode
                      ? 'hover:bg-yellow-800 hover:bg-opacity-30 text-yellow-200'
                      : 'hover:bg-yellow-100 text-yellow-800'
                      } border ${isDarkMode ? 'border-yellow-800' : 'border-yellow-200'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>• {item}</span>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </div>
                    <span className="text-xs opacity-70 mt-1 block">Click to view in standards</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-blue-600" />
                <h3 className={`font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>Unique Aspects</h3>
              </div>
              <div className="space-y-3">
                <div
                  onClick={() => handleUniqueClick('pmbok', comparison.unique.pmbok)}
                  className={`p-3 rounded cursor-pointer transition-all border ${isDarkMode
                    ? 'hover:bg-blue-800 hover:bg-opacity-30 border-blue-800'
                    : 'hover:bg-blue-100 border-blue-200'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>PMBOK:</span>
                      <span className={`ml-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>{comparison.unique.pmbok}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <span className="text-xs opacity-70 mt-1 block">Click to view in PMBOK</span>
                </div>

                <div
                  onClick={() => handleUniqueClick('prince2', comparison.unique.prince2)}
                  className={`p-3 rounded cursor-pointer transition-all border ${isDarkMode
                    ? 'hover:bg-purple-800 hover:bg-opacity-30 border-purple-800'
                    : 'hover:bg-purple-100 border-purple-200'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}`}>PRINCE2:</span>
                      <span className={`ml-2 ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>{comparison.unique.prince2}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <span className="text-xs opacity-70 mt-1 block">Click to view in PRINCE2</span>
                </div>

                <div
                  onClick={() => handleUniqueClick('iso', comparison.unique.iso)}
                  className={`p-3 rounded cursor-pointer transition-all border ${isDarkMode
                    ? 'hover:bg-green-800 hover:bg-opacity-30 border-green-800'
                    : 'hover:bg-green-100 border-green-200'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>ISO:</span>
                      <span className={`ml-2 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>{comparison.unique.iso}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <span className="text-xs opacity-70 mt-1 block">Click to view in ISO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => {
    const chartRef = useRef(null);
    const similarities = [
      {
        number: 1,
        title: "Integration Management",
        content: "Emphasizes coordination of people, processes, and activities for project objectives; overlapping guidance on unified plans, directing work, monitoring progress, and closure. Advocates centralized project management plan consolidating subsidiary plans (e.g., scope, schedule); stresses change control for alignment. Common practices: initiate with charter/mandate, monitor via reports, lessons learned at closure; uses tools like status reports/dashboards to track variances, adjust baselines, ensure value delivery; acts as \"glue\" reducing silos for holistic oversight."
      },
      {
        number: 2,
        title: "Stakeholder Management",
        content: "Converge on early identification, influence/interest analysis, ongoing engagement via communication/conflict resolution for buy-in and value. Overlapping practices: stakeholder registers/matrices for power/interest mapping, tailored engagement plans, continuous assessment for changes. Fosters alignment/reduces resistance via power-interest grids, regular feedback loops for satisfaction monitoring."
      },
      {
        number: 3,
        title: "Scope Management",
        content: "Advocate requirements collection for scope definition, hierarchical breakdowns (WBS/PBS), change requests to prevent creep. Common practices: traceability matrices linking requirements to deliverables, validation via acceptance criteria; baseline for monitoring alignment with objectives."
      },
      {
        number: 4,
        title: "Schedule Management",
        content: "Stress defining/sequencing/estimating activities for realistic baseline, control via variance analysis/adjustments for timely value delivery. Common practices: identify dependencies (e.g., finish-to-start), use CPM/Gantt charts/buffers for uncertainties; progressive elaboration from milestones to details. Overlap in EVM/progress reports for performance tracking, proactive mitigation (crashing/fast-tracking), integration with scope/resources; stakeholder reviews, forecast updates, data-driven actions for predictability."
      },
      {
        number: 5,
        title: "Cost Management",
        content: "Converge on accurate estimation (historical data/expert judgment), baseline budget aggregation, variance tracking for viability/value delivery. Overlapping practices: three-point estimating, funding reconciliation, TCPI for overruns; integrate with schedule (EVM)/risks, formal change control, stakeholder reporting. Supports lifecycle costing (acquisition/operations/disposal), cost-benefit analysis; audits/corrective actions (reallocation/value engineering) to reduce waste/align goals."
      },
      {
        number: 6,
        title: "Quality Management",
        content: "Emphasize planning standards from requirements, assurance via audits/reviews, control via inspections/testing for fit-for-purpose outputs. Common practices: metrics (e.g., defect density), Pareto charts for root causes, PDCA for improvement; customer validation, integration with scope/risks. Prevents rework (prevention over inspection); fosters quality culture via conformance reporting, data-driven enhancements for cost minimization/satisfaction maximization."
      },
      {
        number: 7,
        title: "Resource/Team Management",
        content: "Underscore acquiring/developing/optimizing human/material resources for success; assess needs (skills/roles/availability), build teams via training/mentoring/feedback. Common practices: org charts/RACI for responsibilities, conflict resolution (interest-based), motivation (recognition/career development) for engagement/productivity. Integrate with scheduling (leveling)/budgeting; emphasize diversity/inclusion; proactive forecasting (histograms/capacity tools), reviews for gaps (burnout/skills); virtual tools, risk linking for resilience/value."
      },
      {
        number: 8,
        title: "Communication Management",
        content: "Align on planning to meet stakeholder needs, distributing info via channels, managing interactions for trust/issue resolution. Common practices: stakeholder analysis for tailoring (influence-based), push/pull/interactive models, feedback (surveys/town halls) for effectiveness. Emphasize timely/accurate reporting (progress/risks/changes), governance integration for escalations/crises; cultural sensitivity, tools (dashboards/Teams) for transparency; metrics (response rates/satisfaction) for alignment/decision-making."
      },
      {
        number: 9,
        title: "Risk/Uncertainty Management",
        content: "Advocate structured cycle: identify threats/opportunities (brainstorming/SWOT), assess probability/impact (matrices/EMV), response strategies (mitigate/transfer/accept), monitor via registers/audits. Common practices: heat maps for prioritization, owner assignment, baseline integration; risk-aware culture via training/escalations. Proactive handling links risks to objectives/value protection; tools like Monte Carlo for scenarios, reducing surprises/resilience."
      },
      {
        number: 10,
        title: "Procurement Management",
        content: "Structured acquisition: assess capabilities, select suppliers, negotiate contracts, oversee performance for quality/timeliness/cost/risk mitigation. Common practices: make-or-buy analysis, competitive methods (RFPs/bids) with criteria (capability/price/performance); KPI monitoring, milestone payments, dispute resolution (mediation), ethical/sustainable sourcing. Integrate with baselines (schedule/cost/risks); formal closure (audits/lessons/settlements); centralized strategies, tools (templates/databases) for transparency/value in global chains."
      },
      {
        number: 11,
        title: "Change Management",
        content: "Formalized evaluation/approval/implementation to prevent creep/overruns/delays; impact assessments/stakeholder consultations for objective alignment. Common practices: change log tracking, analyses (scope/schedule/cost/risks/quality via decision trees/cost-benefit), CCB/authority for approvals. Verification (testing/audits), baseline updates, lessons capture; communication for transparency/buy-in; categorize changes (emergency/normal), risk linking for mitigation/disciplined evolution."
      },
      {
        number: 12,
        title: "Business Case",
        content: "Compelling justification: benefits/costs/risks/alternatives, ongoing updates for viability. Common practices: quantitative (NPV/IRR/payback), qualitative (alignment/value); sensitivity analysis, resource/success linking, gateway reviews (go/no-go). Transparency via summaries/visuals (benefit maps); integrate risks/benefits management; drives ROI/priority alignment."
      },
      {
        number: 13,
        title: "Governance/Organization",
        content: "Robust structure clarifying roles/responsibilities/reporting for accountability/decision-making/enterprise alignment; RACI to avoid gaps. Common practices: escalations, ethical/compliance embedding, diverse representation; regular reviews (audits/maturity) at milestones. Supportive ecosystem: delegation/mandates/feedback; aligns culture, decision logs, change/risk linking for resilience/trust/value."
      },
      {
        number: 14,
        title: "Plans/Planning",
        content: "Iterative comprehensive plans outlining objectives; inputs (stakeholders/data/constraints) for baselines (scope/schedule/cost/risks). Common practices: progressive elaboration (outlines to details via workshops/decomposition), WBS/mind maps for visualization/alignment. Integrate subsidiaries into master; what-if analyses, gateway reviews; link to execution for agility/realism (uncertainties/resources/quality)."
      },
      {
        number: 15,
        title: "Progress/Monitoring",
        content: "Continuous tracking vs. baselines via KPIs/variance/correctives for alignment/interventions. Common practices: status reports (dashboards/S-curves), EVM for schedule/cost, trend analyses for forecasts. Stakeholder communications (achievements/issues/forecasts), threshold alerts, lessons data; objective metrics (SPI/CPI)/reviews for proactive feedback/risk reduction/momentum."
      },
      {
        number: 16,
        title: "Benefits Management",
        content: "Systematic identification/measurement/realization of benefits (tangible/intangible) for long-term value; map to objectives, track baselines lifecycle/operations. Common practices: profiles/registers (descriptions/owners/metrics/dependencies), milestone audits/reviews for shortfalls/correctives (training/tweaks). Handover (benefit maps), post-project monitoring (6-12 months for disbenefits); integrate business cases/risks; tools (networks/scorecards) for accountability/maximizing impact."
      },
      {
        number: 17,
        title: "Tailoring",
        content: "Evaluate attributes (size/complexity/industry/maturity/regulations) to modify processes/tools for enhancement without over-engineering. Common practices: assessments (checklists/maturity models), document decisions (plans/logs), iterate via pilots/retrospectives. Risk-based scaling (simplify low-complexity, enhance high-stakes), stakeholder involvement; balances standardization/flexibility for efficiency/engagement/success."
      },
      {
        number: 18,
        title: "Sustainability",
        content: "Incorporate ESG into decisions for impact minimization/legacy maximization; lifecycle assessments (carbon tracking), SDG-aligned targets. Common practices: supplier evaluations, stakeholder consultations (diversity), ESG dashboards/audits for compliance/improvement. Integrate risks (climate analysis)/benefits (green ROI)/governance; materiality matrices; triple bottom line via policy/training/metrics for resilience/ethics."
      },
      {
        number: 19,
        title: "Lessons Learned Management",
        content: "Systematic capture/dissemination throughout lifecycle (not just end) for maturity improvement; repositories (logs/databases) for insights (successes/failures/risks). Common practices: milestone reviews/retrospectives, stakeholder sharing (reports/databases); what went well/improvements/recommendations via root cause (fishbone/after-action). Integrate into plans/processes/assets; team-facilitated sessions, domain categorization, archiving for efficiency/risk reduction/learning culture."
      },
      {
        number: 20,
        title: "Project Closure",
        content: "Formal end: verify deliverables/approvals, release resources, archive docs for obligations/value realization. Common practices: final reviews (audits/inspections), handover to operations, lessons updates, celebrations for morale. Administrative (contracts)/technical (evaluations) closure; checklists/sign-offs; benefits assessment, issue resolution, communications/financial reconciliations for transition/knowledge transfer."
      }
    ];

    const differencesTable = [
      { number: 1, category: "Integration Management", pmbok: "domain-based (8 domains), adaptive models (predictive/agile), outcome-focused (value delivery); terms: performance domains/artifacts (e.g., charter).", prince2: "process-oriented, stage-based (non-overlapping), prescriptive with tolerances/escalation; terms: PID (integrated plan), exception management.", iso: "process-group (5 groups: Initiating/Planning/Implementing/Controlling/Closing), neutral terms (Develop Project Plans), high-level harmonization without tools; flexible/principle-driven (PMBOK), stage-gated/role-defined (PRINCE2), no certification (ISO)." },
      { number: 2, category: "Stakeholder Management", pmbok: "engagement assessment matrix, sentiment analysis in adaptive/domain-specific method.", prince2: "communication management approach in defined roles (e.g., Project Board), tolerances/stage reviews for structured engagement.", iso: "neutral stakeholder register in linear process flow, less adaptive than PMBOK/more generic than PRINCE2; outcome-focused (PMBOK), governance-driven (PRINCE2), compliance-oriented (ISO)." },
      { number: 3, category: "Scope Management", pmbok: "scope baseline in domain-integrated, life-cycle adaptive (iterative) method.", prince2: "PBS/Product Description in product-focused, stage-tolerance method.", iso: "WBS in sequential processes, no adaptive elements; flexible (PMBOK), prescriptive via products (PRINCE2), standardized/basic (ISO)." },
      { number: 4, category: "Schedule Management", pmbok: "flexible domain-based, terms (schedule baseline/SPI), adapts to life cycles via rolling-wave/iterations; principle-driven tailoring, no rigid stages.", prince2: "prescriptive stage-oriented, terms (stage plans/time tolerances), initiation/boundary updates, exception escalations/Project Board approvals; governance-focused.", iso: "linear process-group, neutral (develop/control schedule), high-level without tools/adaptations, international harmonization; adaptive/outcome-oriented (PMBOK), controlled/exception-based (PRINCE2), generic/process-mapped (ISO)." },
      { number: 5, category: "Cost Management", pmbok: "adaptive domain-integrated, terms (cost baseline/CV), agile via story points/burn-down; flexible tailoring, predictive analytics/sustainability.", prince2: "stage-based, terms (cost/budget tolerances), continuous business case justification, exception reports; prescriptive, viability assessments.", iso: "sequential process-group, neutral (determine budget), no dedicated planning, standardization without metrics; metric-rich/hybrid (PMBOK), tolerance-governed/justification-driven (PRINCE2), streamlined/global (ISO)." },
      { number: 6, category: "Quality Management", pmbok: "quality metrics/cost of quality in domain-adaptive, predictive audits/agile retrospectives; principle-led, life-cycle tailoring.", prince2: "Quality Register/Product Descriptions in product-centric, predefined criteria/stage-gate reviews; structured, tolerance-tied.", iso: "perform assurance/control in linear processes, no tools/metrics; standardized/basic; flexible/integrated (PMBOK), prescriptive/product-driven (PRINCE2), process-oriented/neutral (ISO)." },
      { number: 7, category: "Resource/Team Management", pmbok: "domain-based adaptive, terms (team charter/high-performing characteristics), servant/situational leadership for self-organizing/agile; emotional intelligence/psychological safety, no fixed roles.", prince2: "structured role-defined, terms (defined roles e.g., Project/Team Manager, senior interests), governance via tolerances/stage authorizations; prescriptive delegation, supplier focus.", iso: "neutral process-oriented (establish/control resources), linear estimation-management sequence, no leadership specifics; high-level standardization, no tools/motivation; outcome/people-centric (PMBOK), hierarchy/exception-based (PRINCE2), procedural/resource-agnostic (ISO)." },
      { number: 8, category: "Communication Management", pmbok: "communication requirements/engagement matrix in adaptive domain-integrated, agile stand-ups/kanban; principle-driven inclusivity/digital, no mandatory docs.", prince2: "Communication Management Approach (baseline methods/frequencies) in process-oriented tied to roles/tolerances, formal reports (Highlight) for escalations; prescriptive governance.", iso: "neutral (distribute/manage communications) in sequential group flow, efficiency without models/roles; standardized compliance; flexible/stakeholder-centric (PMBOK), document-controlled/exception (PRINCE2), linear/minimalistic (ISO)." },
      { number: 9, category: "Risk/Uncertainty Management", pmbok: "distinguishes risk/uncertainty, adaptive terms (exploit/enhance opportunities), domain-based agile backlogs/iterations; holistic resilience/life-cycle tailoring.", prince2: "risk appetite/tolerance, symmetric threats/opportunities in practice-driven exceptions/escalations; governance-oriented, stage-updated register.", iso: "neutral (treat risks) in linear group, merged assessment/threat-focused, no planning/tools; broad/ambiguity-inclusive (PMBOK), tolerance-bound/balanced (PRINCE2), threat-centric/procedural (ISO)." },
      { number: 10, category: "Procurement Management", pmbok: "detailed (procurement plan/source selection/contract control) in adaptive domain-integrated, hybrid life cycles (agile sprints), tools (bidder conferences/scoring); outcome-focused legal tailoring.", prince2: "supplier controls/tolerances, terms (supplier interests on Board) in prescriptive practice-embedded, stage approvals/exceptions; governance-driven, no standalone processes.", iso: "neutral (administer procurements merging control/close) in linear group, high-level steps without tools/metrics/ethics; tool-rich/life-cycle adaptive (PMBOK), role-integrated/tolerance-bound (PRINCE2), streamlined/compliance-centric (ISO)." },
      { number: 11, category: "Change Management", pmbok: "integrated change control/change request in adaptive principle-based, agile retrospectives/sprints; resilience/holistic domains, life-cycle tailoring no mandatory boards.", prince2: "issue/change procedure (changes as issues), terms (RFC/off-spec) in prescriptive practice-oriented tolerances/exceptions; governance-heavy, Board for majors.", iso: "neutral control changes (single process) in linear group, verification without tools/escalations; standardized/concise; domain-spanning/outcome-adaptive (PMBOK), exception/stage-gated (PRINCE2), streamlined/process-focused (ISO)." },
      { number: 12, category: "Business Case", pmbok: "value delivery system, benefits realization plan in principle-driven domain-based, adaptive forecasting/life cycles; holistic sustainability, agile evolution no templates.", prince2: "Outline/Full Business Case/Benefits Approach in practice-based, continuous stage-boundary justification/tolerances/escalations; prescriptive versions/updates.", iso: "neutral develop business case in high-level planning, no metrics/updates; standardized initial artifact; outcome/integrated (PMBOK), justification-gated/tolerance-linked (PRINCE2), foundational/static (ISO)." },
      { number: 13, category: "Governance/Organization", pmbok: "governance framework/adaptive leadership (transformational/distributed) in domain-integrated principle-based, life-cycle tailoring; holistic collaboration/systems thinking, no hierarchies.", prince2: "Project Board (Executive/User/Supplier)/info needs in prescriptive practice-oriented, mandated roles/tolerances/stage approvals; hierarchical governance/comms.", iso: "neutral organizational context/decision authority in high-level process-group, strategic guidance no roles; standardized scalability; adaptive/people-empowering (PMBOK), role-rigid/exception (PRINCE2), foundational/enterprise-aligned (ISO)." },
      { number: 14, category: "Plans/Planning", pmbok: "integrated plan in domain-spanning adaptive, life-cycle tailoring (iterative agile); principles/holistic, digital collaborative tools.", prince2: "Project/Stage/Team Plans in product-based hierarchical, stage tolerances/product descriptions; prescriptive baselines/boundaries governance.", iso: "develop baseline plans in sequential group, detail levels (high/medium/low); standardization no tools; interconnected/life-cycle (PMBOK), stage-layered/product (PRINCE2), phased/scalable (ISO)." },
      { number: 15, category: "Progress/Monitoring", pmbok: "performance baselines/EVM in adaptive domain-based, agile burndown/iterations; data-centric life-cycle thresholds.", prince2: "tolerances/Highlight/Exception Reports in practice-driven manage-by-exception/escalations; governance/stage-specific.", iso: "control project work in linear processes, evaluation no EVM; standardized/process-mapped; quantitative/flexible (PMBOK), exception/report-based (PRINCE2), control-oriented/basic (ISO)." },
      { number: 16, category: "Benefits Management", pmbok: "benefits realization plan artifact in value domains, organizational enablers/value measurement in principle-based adaptive/hybrid; forecasting/iterations, sustainability no post-mandates.", prince2: "benefits management approach/baseline profile in practice-integrated, ongoing tolerances/stage reviews/business case updates/escalations; prescriptive handover/executive oversight.", iso: "realize/maintain benefits in linear improvement-group, post-execution no planning; standardized compliance; predictive/domain-holistic (PMBOK), tolerance/lifecycle-continuous (PRINCE2), execution/post-delivery (ISO)." },
      { number: 17, category: "Tailoring", pmbok: "core principle/life cycle selection (predictive/adaptive/hybrid) in domain-holistic, adaptations across principles/domains; visual canvases, inherently flexible/principle-led.", prince2: "tailor to suit principle/project context factors in structured mandatory for principles/themes/processes via tolerances; prescriptive/scalable, PID justification.", iso: "tailoring guidance/contextual adaptation in high-level clause-based, generic criteria for groups no tools/principles; standardized/organizational; interconnected/life-cycle (PMBOK), principle-embedded/environment (PRINCE2), foundational/compliance (ISO)." },
      { number: 18, category: "Sustainability", pmbok: "stewardship principle/triple bottom line/ESG integration in adaptive domain-based, uncertainty/value weaving; ethical leadership/life-cycle tailoring, holistic no targets.", prince2: "sustainability targets/ESG measures in practice-integrated business/people linking, stage assessments/tolerances; targeted/governance-tied prescriptive inclusion.", iso: "sustainability context/ESG factors in contextual clause-based, high-level process embedding/strategy; standardized no metrics; ethical/resilience (PMBOK), performance/tolerance (PRINCE2), contextual/guideline (ISO)." },
      { number: 19, category: "Lessons Learned Management", pmbok: "principle-based adaptive, retrospectives/knowledge artifacts in domains, real-time iterations no formal logs; outcome/value metrics/hybrid tailoring.", prince2: "structured process-driven, Lessons Log/Report products progressively/stage ends, lessons from experience/tolerances/exceptions; prescriptive boundary reviews/escalations.", iso: "neutral process-group (Collect Lessons Learned distinct), linear controlling/closing integration no tools; high-level documentation/transfer; flexible/domain-integrated (PMBOK), governance/staged (PRINCE2), concise/compliance (ISO)." },
      { number: 20, category: "Project Closure", pmbok: "domain-based adaptive, final report/transition planning in iterative deliveries (agile sprints/reviews); outcome/sustained value, premature flexibility.", prince2: "process-oriented, Prepare Planned Closure/Hand Over Products, End Project Report/Post-Project Benefits Plan; prescriptive Board authorization/business viability exceptions.", iso: "straightforward process-group, Close Project/Phase neutral verification/release no reports; less prescriptive/generic scalable governance integration; holistic/life-cycle (PMBOK), governance/formal handover (PRINCE2), minimalistic/international (ISO)." }
    ];

    const detailedDifferences = [
      {
        number: 1,
        title: "Integration Management",
        content: "PMBOK 7th: domain-based (8 domains), adaptive models (predictive/agile), outcome-focused (value delivery); terms: performance domains/artifacts (e.g., charter). PRINCE2: process-oriented, stage-based (non-overlapping), prescriptive with tolerances/escalation; terms: PID (integrated plan), exception management. ISO 21500: process-group (5 groups: Initiating/Planning/Implementing/Controlling/Closing), neutral terms (Develop Project Plans), high-level harmonization without tools; flexible/principle-driven (PMBOK), stage-gated/role-defined (PRINCE2), no certification (ISO)."
      },
      {
        number: 2,
        title: "Stakeholder Management",
        content: "PMBOK 7th: engagement assessment matrix, sentiment analysis in adaptive/domain-specific method. PRINCE2: communication management approach in defined roles (e.g., Project Board), tolerances/stage reviews for structured engagement. ISO 21500: neutral stakeholder register in linear process flow, less adaptive than PMBOK/more generic than PRINCE2; outcome-focused (PMBOK), governance-driven (PRINCE2), compliance-oriented (ISO)."
      },
      {
        number: 3,
        title: "Scope Management",
        content: "PMBOK 7th: scope baseline in domain-integrated, life-cycle adaptive (iterative) method. PRINCE2: PBS/Product Description in product-focused, stage-tolerance method. ISO 21500: WBS in sequential processes, no adaptive elements; flexible (PMBOK), prescriptive via products (PRINCE2), standardized/basic (ISO)."
      },
      {
        number: 4,
        title: "Schedule Management",
        content: "PMBOK 7th: flexible domain-based, terms (schedule baseline/SPI), adapts to life cycles via rolling-wave/iterations; principle-driven tailoring, no rigid stages. PRINCE2: prescriptive stage-oriented, terms (stage plans/time tolerances), initiation/boundary updates, exception escalations/Project Board approvals; governance-focused. ISO 21500: linear process-group, neutral (develop/control schedule), high-level without tools/adaptations, international harmonization; adaptive/outcome-oriented (PMBOK), controlled/exception-based (PRINCE2), generic/process-mapped (ISO)."
      },
      {
        number: 5,
        title: "Cost Management",
        content: "PMBOK 7th: adaptive domain-integrated, terms (cost baseline/CV), agile via story points/burn-down; flexible tailoring, predictive analytics/sustainability. PRINCE2: stage-based, terms (cost/budget tolerances), continuous business case justification, exception reports; prescriptive, viability assessments. ISO 21500: sequential process-group, neutral (determine budget), no dedicated planning, standardization without metrics; metric-rich/hybrid (PMBOK), tolerance-governed/justification-driven (PRINCE2), streamlined/global (ISO)."
      },
      {
        number: 6,
        title: "Quality Management",
        content: "PMBOK 7th: quality metrics/cost of quality in domain-adaptive, predictive audits/agile retrospectives; principle-led, life-cycle tailoring. PRINCE2: Quality Register/Product Descriptions in product-centric, predefined criteria/stage-gate reviews; structured, tolerance-tied. ISO 21500: perform assurance/control in linear processes, no tools/metrics; standardized/basic; flexible/integrated (PMBOK), prescriptive/product-driven (PRINCE2), process-oriented/neutral (ISO)."
      },
      {
        number: 7,
        title: "Resource/Team Management",
        content: "PMBOK 7th: domain-based adaptive, terms (team charter/high-performing characteristics), servant/situational leadership for self-organizing/agile; emotional intelligence/psychological safety, no fixed roles. PRINCE2: structured role-defined, terms (defined roles e.g., Project/Team Manager, senior interests), governance via tolerances/stage authorizations; prescriptive delegation, supplier focus. ISO 21500: neutral process-oriented (establish/control resources), linear estimation-management sequence, no leadership specifics; high-level standardization, no tools/motivation; outcome/people-centric (PMBOK), hierarchy/exception-based (PRINCE2), procedural/resource-agnostic (ISO)."
      },
      {
        number: 8,
        title: "Communication Management",
        content: "PMBOK 7th: communication requirements/engagement matrix in adaptive domain-integrated, agile stand-ups/kanban; principle-driven inclusivity/digital, no mandatory docs. PRINCE2: Communication Management Approach (baseline methods/frequencies) in process-oriented tied to roles/tolerances, formal reports (Highlight) for escalations; prescriptive governance. ISO 21500: neutral (distribute/manage communications) in sequential group flow, efficiency without models/roles; standardized compliance; flexible/stakeholder-centric (PMBOK), document-controlled/exception (PRINCE2), linear/minimalistic (ISO)."
      },
      {
        number: 9,
        title: "Risk/Uncertainty Management",
        content: "PMBOK 7th: distinguishes risk/uncertainty, adaptive terms (exploit/enhance opportunities), domain-based agile backlogs/iterations; holistic resilience/life-cycle tailoring. PRINCE2: risk appetite/tolerance, symmetric threats/opportunities in practice-driven exceptions/escalations; governance-oriented, stage-updated register. ISO 21500: neutral (treat risks) in linear group, merged assessment/threat-focused, no planning/tools; broad/ambiguity-inclusive (PMBOK), tolerance-bound/balanced (PRINCE2), threat-centric/procedural (ISO)."
      },
      {
        number: 10,
        title: "Procurement Management",
        content: "PMBOK 7th: detailed (procurement plan/source selection/contract control) in adaptive domain-integrated, hybrid life cycles (agile sprints), tools (bidder conferences/scoring); outcome-focused legal tailoring. PRINCE2: supplier controls/tolerances, terms (supplier interests on Board) in prescriptive practice-embedded, stage approvals/exceptions; governance-driven, no standalone processes. ISO 21500: neutral (administer procurements merging control/close) in linear group, high-level steps without tools/metrics/ethics; tool-rich/life-cycle adaptive (PMBOK), role-integrated/tolerance-bound (PRINCE2), streamlined/compliance-centric (ISO)."
      },
      {
        number: 11,
        title: "Change Management",
        content: "PMBOK 7th: integrated change control/change request in adaptive principle-based, agile retrospectives/sprints; resilience/holistic domains, life-cycle tailoring no mandatory boards. PRINCE2: issue/change procedure (changes as issues), terms (RFC/off-spec) in prescriptive practice-oriented tolerances/exceptions; governance-heavy, Board for majors. ISO 21500: neutral control changes (single process) in linear group, verification without tools/escalations; standardized/concise; domain-spanning/outcome-adaptive (PMBOK), exception/stage-gated (PRINCE2), streamlined/process-focused (ISO)."
      },
      {
        number: 12,
        title: "Business Case",
        content: "PMBOK 7th: value delivery system, benefits realization plan in principle-driven domain-based, adaptive forecasting/life cycles; holistic sustainability, agile evolution no templates. PRINCE2: Outline/Full Business Case/Benefits Approach in practice-based, continuous stage-boundary justification/tolerances/escalations; prescriptive versions/updates. ISO 21500: neutral develop business case in high-level planning, no metrics/updates; standardized initial artifact; outcome/integrated (PMBOK), justification-gated/tolerance-linked (PRINCE2), foundational/static (ISO)."
      },
      {
        number: 13,
        title: "Governance/Organization",
        content: "PMBOK 7th: governance framework/adaptive leadership (transformational/distributed) in domain-integrated principle-based, life-cycle tailoring; holistic collaboration/systems thinking, no hierarchies. PRINCE2: Project Board (Executive/User/Supplier)/info needs in prescriptive practice-oriented, mandated roles/tolerances/stage approvals; hierarchical governance/comms. ISO 21500: neutral organizational context/decision authority in high-level process-group, strategic guidance no roles; standardized scalability; adaptive/people-empowering (PMBOK), role-rigid/exception (PRINCE2), foundational/enterprise-aligned (ISO)."
      },
      {
        number: 14,
        title: "Plans/Planning",
        content: "PMBOK 7th: integrated plan in domain-spanning adaptive, life-cycle tailoring (iterative agile); principles/holistic, digital collaborative tools. PRINCE2: Project/Stage/Team Plans in product-based hierarchical, stage tolerances/product descriptions; prescriptive baselines/boundaries governance. ISO 21500: develop baseline plans in sequential group, detail levels (high/medium/low); standardization no tools; interconnected/life-cycle (PMBOK), stage-layered/product (PRINCE2), phased/scalable (ISO)."
      },
      {
        number: 15,
        title: "Progress/Monitoring",
        content: "PMBOK 7th: performance baselines/EVM in adaptive domain-based, agile burndown/iterations; data-centric life-cycle thresholds. PRINCE2: tolerances/Highlight/Exception Reports in practice-driven manage-by-exception/escalations; governance/stage-specific. ISO 21500: control project work in linear processes, evaluation no EVM; standardized/process-mapped; quantitative/flexible (PMBOK), exception/report-based (PRINCE2), control-oriented/basic (ISO)."
      },
      {
        number: 16,
        title: "Benefits Management",
        content: "PMBOK 7th: benefits realization plan artifact in value domains, organizational enablers/value measurement in principle-based adaptive/hybrid; forecasting/iterations, sustainability no post-mandates. PRINCE2: benefits management approach/baseline profile in practice-integrated, ongoing tolerances/stage reviews/business case updates/escalations; prescriptive handover/executive oversight. ISO 21500: realize/maintain benefits in linear improvement-group, post-execution no planning; standardized compliance; predictive/domain-holistic (PMBOK), tolerance/lifecycle-continuous (PRINCE2), execution/post-delivery (ISO)."
      },
      {
        number: 17,
        title: "Tailoring",
        content: "PMBOK 7th: core principle/life cycle selection (predictive/adaptive/hybrid) in domain-holistic, adaptations across principles/domains; visual canvases, inherently flexible/principle-led. PRINCE2: tailor to suit principle/project context factors in structured mandatory for principles/themes/processes via tolerances; prescriptive/scalable, PID justification. ISO 21500: tailoring guidance/contextual adaptation in high-level clause-based, generic criteria for groups no tools/principles; standardized/organizational; interconnected/life-cycle (PMBOK), principle-embedded/environment (PRINCE2), foundational/compliance (ISO)."
      },
      {
        number: 18,
        title: "Sustainability",
        content: "PMBOK 7th: stewardship principle/triple bottom line/ESG integration in adaptive domain-based, uncertainty/value weaving; ethical leadership/life-cycle tailoring, holistic no targets. PRINCE2: sustainability targets/ESG measures in practice-integrated business/people linking, stage assessments/tolerances; targeted/governance-tied prescriptive inclusion. ISO 21500: sustainability context/ESG factors in contextual clause-based, high-level process embedding/strategy; standardized no metrics; ethical/resilience (PMBOK), performance/tolerance (PRINCE2), contextual/guideline (ISO)."
      },
      {
        number: 19,
        title: "Lessons Learned Management",
        content: "PMBOK 7th: principle-based adaptive, retrospectives/knowledge artifacts in domains, real-time iterations no formal logs; outcome/value metrics/hybrid tailoring. PRINCE2: structured process-driven, Lessons Log/Report products progressively/stage ends, lessons from experience/tolerances/exceptions; prescriptive boundary reviews/escalations. ISO 21500: neutral process-group (Collect Lessons Learned distinct), linear controlling/closing integration no tools; high-level documentation/transfer; flexible/domain-integrated (PMBOK), governance/staged (PRINCE2), concise/compliance (ISO)."
      },
      {
        number: 20,
        title: "Project Closure",
        content: "PMBOK 7th: domain-based adaptive, final report/transition planning in iterative deliveries (agile sprints/reviews); outcome/sustained value, premature flexibility. PRINCE2: process-oriented, Prepare Planned Closure/Hand Over Products, End Project Report/Post-Project Benefits Plan; prescriptive Board authorization/business viability exceptions. ISO 21500: straightforward process-group, Close Project/Phase neutral verification/release no reports; less prescriptive/generic scalable governance integration; holistic/life-cycle (PMBOK), governance/formal handover (PRINCE2), minimalistic/international (ISO)."
      }
    ];

    const uniquePMBOK = [
      { number: 1, title: "Integration Management", explanation: "sustainability/adaptability in Uncertainty Domain, ambiguity models/techniques (pages 140-145).", pg: "140-145", section: "Uncertainty Domain" },
      { number: 2, title: "Stakeholder Management", explanation: "stakeholder collaboration models (servant leadership agile, pages 25-28), emotional intelligence metrics.", pg: "25-28", section: "Stakeholder Domain" },
      { number: 3, title: "Scope Management", explanation: "scope in hybrids with progressive elaboration (pages 110-115).", pg: "110-115", section: "Planning Domain" },
      { number: 4, title: "Schedule Management", explanation: "agile techniques (iteration planning/velocity forecasting hybrids, pages 75-80), DevOps integration for empirical adjustments/continuous delivery.", pg: "75-80", section: "Planning Domain" },
      { number: 5, title: "Cost Management", explanation: "TCO models for sustainability (environmental costs, pages 80-85), agile fixed-price iterations for financial resilience.", pg: "80-85", section: "Planning Domain" },
      { number: 6, title: "Quality Management", explanation: "quality-value link via planning canvas hybrids (pages 110-115), servant leadership for team-driven.", pg: "110-115", section: "Delivery Domain" },
      { number: 7, title: "Resource/Team Management", explanation: "team stages (Tuckman model, pages 40-45) with interventions (co-location), health metrics (surveys/emotional intelligence) for psychological depth.", pg: "40-45", section: "Team Domain" },
      { number: 8, title: "Communication Management", explanation: "advanced models (7 Cs with AI sentiment, pages 45-50) for global data-driven personalization.", pg: "45-50", section: "Stakeholder Domain" },
      { number: 9, title: "Risk/Uncertainty Management", explanation: "ambiguity management (scenario/Delphi for unknowns, pages 140-145), stewardship for ethical risk-taking.", pg: "140-145", section: "Uncertainty Domain" },
      { number: 10, title: "Procurement Management", explanation: "ethical/sustainable sourcing (diversity/ESG clauses, pages 115-120), ISO 20400 integration for volatile compliance.", pg: "115-120", section: "Delivery Domain" },
      { number: 11, title: "Change Management", explanation: "change resilience models (Kotter's 8-step cultural, pages 145-150) for human-centered momentum.", pg: "145-150", section: "Uncertainty Domain" },
      { number: 12, title: "Business Case", explanation: "benefits forecasting (parametric/enablers like readiness, pages 90-95), stewardship for societal value.", pg: "90-95", section: "Value Domain" },
      { number: 13, title: "Governance/Organization", explanation: "systems thinking integration, causal loop diagrams for interdependencies (pages 12-15) in adaptive leadership.", pg: "12-15", section: "Team Domain" },
      { number: 14, title: "Plans/Planning", explanation: "life-cycle tailoring canvases (predictive/adaptive hybrids, pages 70-75), DevOps for continuous.", pg: "70-75", section: "Planning Domain" },
      { number: 15, title: "Progress/Monitoring", explanation: "customizable thresholds (AI anomaly, pages 125-130), uncertainty integration for predictive hybrids.", pg: "125-130", section: "Measurement Domain" },
      { number: 16, title: "Benefits Management", explanation: "organizational enablers (change strategies/training matrices/maturity, pages 95-100) for systemic embedding/cultural barriers.", pg: "95-100", section: "Value Domain" },
      { number: 17, title: "Tailoring", explanation: "tailoring canvas matrix for attributes/domain adjustments (pages 16-18), SAFe hybrids for collaborative scaling.", pg: "16-18", section: "Tailor Principle" },
      { number: 18, title: "Sustainability", explanation: "ESG risk fusion (climate scenarios, pages 2-4), servant leadership for social equity/principle-rooted anticipation.", pg: "2-4", section: "Stewardship Principle" },
      { number: 19, title: "Lessons Learned Management", explanation: "adaptive models with knowledge platforms (wikis/AI repos, pages 22-25), psychological safety in retrospectives.", pg: "22-25", section: "Measurement Domain" },
      { number: 20, title: "Project Closure", explanation: "sustainable closure with environmental/social assessments (pages 115-120) for stewardship alignment.", pg: "115-120", section: "Delivery Domain" }
    ];

    const uniquePRINCE2 = [
      "Integration Management: Manage by Exception (Principle 5, pages 30-35) with tolerance-triggered escalations for governance.",
      "Stakeholder Management: mandatory three-interest model (business/user/supplier) in Project Board (Organization Practice, pages 70-75) for balance.",
      "Scope Management: Product Flow Diagrams for sequencing (Quality Practice, pages 90-95).",
      "Schedule Management: tolerance-based scheduling with deviation-triggered reviews/replanning (Progress Practice, pages 140-145) for team empowerment/executive oversight.",
      "Cost Management: cost tolerances set/reviewed at initiation/stage ends (Business Case Practice, pages 50-55), Board escalation for breaches/empowerment-accountability.",
      "Quality Management: acceptance criteria in every Product Description (Quality Practice, pages 90-95), mandatory handover reviews for assurance rigor.",
      "Resource/Team Management: supplier interests in core structure, Board representation for outsourced balance/escalation paths (Organization Practice, pages 70-75).",
      "Communication Management: escalation via standardized reports (Exception for breaches, pages 75-80), three-interests message alignment for governance transparency.",
      "Risk/Uncertainty Management: positive risks equal to threats, Recommended Risk Response in register (pages 160-165) for optimism counter.",
      "Procurement Management: supplier management in structure, Board interests/escalation tolerances for breaches (pages 75-80) in governance partnerships.",
      "Change Management: standardized forms (RFC/Issue Report templates, pages 180-185) for Change Authority auditability.",
      "Business Case: progressive versions (outline/full/updates, pages 50-55), tolerance linkage for viability checks/lifecycle governance.",
      "Governance/Organization: three-interests model for Board (pages 70-75) ensuring equitable representation/conflict resolution.",
      "Plans/Planning: PBS incorporation (pages 110-115) for bottom-up deliverable-derived activities/traceability.",
      "Progress/Monitoring: Checkpoint Reports from teams (pages 140-145) for granular pulses within tolerances/delegation.",
      "Benefits Management: baseline profile at initiation/updates (pages 55-60), tolerance linkage for dynamic justification/protection.",
      "Tailoring: sustainability/inclusivity mandate (pages 30-35), ESG/diversity in adaptations (virtual tools) with people integration.",
      "Sustainability: sustainability approach as business case extension (pages 22-25), quantifiable targets (net-zero)/stage reviews/escalation accountability.",
      "Lessons Learned Management: PID updates/End Project Report inclusion (Closing, pages 225-230), Board approval for post-handover accountability.",
      "Project Closure: Follow-On Action Recommendations in End Report (pages 225-230), post-scheduled benefits reviews for forward governance."
    ];

    const uniqueISO = [
      "Integration Management: extends to programme/portfolio (Clause 4, pages 10-15; Develop Programme Charter Annex B) for strategic alignment.",
      "Stakeholder Management: stakeholders in portfolio governance (Clause 5, pages 15-20), programme engagement processes (Annex B).",
      "Scope Management: merges requirements into Define Scope without separate validation (8.1.11).",
      "Schedule Management: activity definition under scope (Clause 8.1.13, pages 31-32) as downstream, programme aggregation (Annex B) for multi-project timelines.",
      "Cost Management: no separate planning (folded into Clause 6.1, pages 20-22), direct programme funding links (Annex B) for portfolio oversight.",
      "Quality Management: splits assurance/control without details (8.4.2-8.4.3), programme governance extension (Annex B) for multi-level.",
      "Resource/Team Management: dedicated Control Resources (8.5.5, pages 37-38) for non-human (equipment), programme pooling (Annex B) for enterprise optimization.",
      "Communication Management: distribute emphasis over interactive (8.6.2-8.6.3), programme aggregation (Annex B) for cross-project coordination.",
      "Risk/Uncertainty Management: no dedicated planning (folded into Clause 6), portfolio aggregation (Annex B) for strategic oversight.",
      "Procurement Management: closure merged into administration (8.8.3, page 41), programme supplier pooling (Annex B, pages 45-50) for aggregated efficiency.",
      "Change Management: embedded solely in integration (8.1.6), implicit programme via aggregated controls (Annex B, pages 45-50) for multi-synchronization.",
      "Business Case: portfolio-level input (Clause 6.2, pages 23-25) for aggregated strategic funding/hierarchy.",
      "Governance/Organization: programme/portfolio leadership extension (Clause 5.2, pages 17-20) for multi-project alignment/strategic tiers.",
      "Plans/Planning: three plan types (strategic/tactical/operational, 6.1.3, pages 22-23), programme scaling (Annex B) for multi-level.",
      "Progress/Monitoring: aggregated across domains (Clause 9 folded into controls), portfolio dashboards (Annex B) for enterprise visibility.",
      "Benefits Management: programme/portfolio improvement positioning (10.2, pages 37-38), aggregated tracking (Annex B) for hierarchical sustainment.",
      "Tailoring: programme/portfolio extension (4.4.2, pages 13-15), hierarchy harmonization (Annex B) for multi-project strategy.",
      "Sustainability: portfolio governance scaling (Annex C, pages 52-55), ESG aggregation (resource audits) for enterprise optimization.",
      "Lessons Learned Management: programme/portfolio extension (Clause 10.3, pages 38-40), multi-project insight aggregation into standards/strategic hierarchy.",
      "Project Closure: phase-level with portfolio handover links (Clause 8.1.8/Annex B), aggregated multi-project environments/strategic integration."
    ];

    const stats = {
      totalTopics: 20,
      similarities: similarities.length,
      differences: detailedDifferences.length,
      uniquePoints: uniquePMBOK.length + uniquePRINCE2.length + uniqueISO.length,
      bookmarked: bookmarks.length,
      scenarios: Object.keys(scenariosData).length
    };

    const [activeCategory, setActiveCategory] = useState('similarities');

    useEffect(() => {
      let chartInstance = null;

      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Integration', 'Stakeholder', 'Scope', 'Schedule', 'Cost', 'Quality', 'Resources', 'Communication', 'Risk', 'Procurement'],
            datasets: [
              {
                label: 'PMBOK Coverage',
                data: [9, 8, 9, 8, 9, 8, 9, 8, 10, 9],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
              },
              {
                label: 'PRINCE2 Coverage',
                data: [8, 9, 8, 9, 8, 9, 8, 9, 8, 8],
                borderColor: 'rgb(168, 85, 247)',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderWidth: 2,
              },
              {
                label: 'ISO Coverage',
                data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                borderWidth: 2,
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              r: {
                beginAtZero: true,
                max: 10,
                ticks: {
                  stepSize: 2,
                },
                pointLabels: {
                  font: {
                    size: 12
                  }
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Standards Coverage Map: Key PM Topics'
              }
            }
          }
        });
      }

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }, []);

    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-3xl font-bold mb-2 ${textColor}`}>Insights Dashboard</h2>
          <p className={secondaryText}>Comparative analysis of PMBOK 7, PRINCE2, and ISO 21500/21502 | {stats.scenarios} Tailoring Scenarios</p>

          <div className="grid md:grid-cols-4 gap-4 my-8">
            <button
              onClick={() => setActiveCategory('similarities')}
              className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 ${activeCategory === 'similarities'
                ? `${isDarkMode ? 'bg-green-900 bg-opacity-50 border-2 border-green-500' : 'bg-green-100 border-2 border-green-500'}`
                : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                }`}
            >
              <CheckCircle className={`w-12 h-12 mx-auto mb-3 ${activeCategory === 'similarities' ? 'text-green-500' : 'text-gray-400'}`} />
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{stats.similarities}</div>
              <div className={`text-lg font-semibold ${textColor}`}>Similarities</div>
              <div className={`text-sm ${secondaryText}`}>Common Practices & Overlapping Guidance</div>
            </button>

            <button
              onClick={() => setActiveCategory('differences')}
              className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 ${activeCategory === 'differences'
                ? `${isDarkMode ? 'bg-yellow-900 bg-opacity-50 border-2 border-yellow-500' : 'bg-yellow-100 border-2 border-yellow-500'}`
                : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                }`}
            >
              <AlertCircle className={`w-12 h-12 mx-auto mb-3 ${activeCategory === 'differences' ? 'text-yellow-500' : 'text-gray-400'}`} />
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats.differences}</div>
              <div className={`text-lg font-semibold ${textColor}`}>Differences</div>Huse
              <div className={`text-sm ${secondaryText}`}>Unique Terminologies & Methodologies</div>
            </button>

            <button
              onClick={() => setActiveCategory('unique')}
              className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 ${activeCategory === 'unique'
                ? `${isDarkMode ? 'bg-blue-900 bg-opacity-50 border-2 border-blue-500' : 'bg-blue-100 border-2 border-blue-500'}`
                : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                }`}
            >
              <XCircle className={`w-12 h-12 mx-auto mb-3 ${activeCategory === 'unique' ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stats.uniquePoints}</div>
              <div className={`text-lg font-semibold ${textColor}`}>Unique Points</div>
              <div className={`text-sm ${secondaryText}`}>Standard-Specific Features</div>
            </button>

            <button
              onClick={() => setActiveCategory('scenarios')}
              className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 ${activeCategory === 'scenarios'
                ? `${isDarkMode ? 'bg-purple-900 bg-opacity-50 border-2 border-purple-500' : 'bg-purple-100 border-2 border-purple-500'}`
                : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                }`}
            >
              <Zap className={`w-12 h-12 mx-auto mb-3 ${activeCategory === 'scenarios' ? 'text-purple-500' : 'text-gray-400'}`} />
              <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{stats.scenarios}</div>
              <div className={`text-lg font-semibold ${textColor}`}>Scenarios</div>
              <div className={`text-sm ${secondaryText}`}>Tailored Recommendations</div>
            </button>
          </div>

          {activeCategory === 'similarities' && (
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'} border-l-4 border-green-500`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textColor}`}>
                <CheckCircle className="w-7 h-7 text-green-500" />
                Similarities: Common Practices & Overlapping Guidance
              </h3>
              <p className={`mb-6 ${secondaryText}`}>
                These are the foundational practices and principles that all three standards share, demonstrating global consensus on project management best practices.
              </p>

              {similarities.map((similarity, idx) => (
                <div key={idx} className={`mb-6 p-4 rounded-lg ${cardBg}`}>
                  <h4 className={`text-lg font-bold mb-3 ${textColor}`}>{similarity.number}. {similarity.title}</h4>
                  <div className={`p-3 rounded flex items-start gap-3 ${isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'}`}>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className={secondaryText}>{similarity.content}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'differences' && (
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'} border-l-4 border-yellow-500`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textColor}`}>
                <AlertCircle className="w-7 h-7 text-yellow-500" />
                Differences: Unique Terminologies & Methodologies
              </h3>
              <p className={`mb-6 ${secondaryText}`}>
                Each standard approaches project management with distinct methodologies, terminology, and structural frameworks that reflect their origins and intended applications.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className={`min-w-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-300 dark:border-gray-600 rounded-lg`}>
                  <thead>
                    <tr className={`${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                      <th className={`px-4 py-2 border ${textColor}`}>#</th>
                      <th className={`px-4 py-2 border ${textColor}`}>Category</th>
                      <th className={`px-4 py-2 border ${textColor}`}>PMBOK 7th Unique Aspect</th>
                      <th className={`px-4 py-2 border ${textColor}`}>PRINCE2 7th Unique Aspect</th>
                      <th className={`px-4 py-2 border ${textColor}`}>ISO 21500/21502 Unique Aspect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {differencesTable.map((row, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}>
                        <td className={`px-4 py-2 border ${secondaryText}`}>{row.number}</td>
                        <td className={`px-4 py-2 border ${secondaryText}`}>{row.category}</td>
                        <td className={`px-4 py-2 border ${secondaryText}`}>{row.pmbok}</td>
                        <td className={`px-4 py-2 border ${secondaryText}`}>{row.prince2}</td>
                        <td className={`px-4 py-2 border ${secondaryText}`}>{row.iso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {detailedDifferences.map((difference, idx) => (
                <div key={idx} className={`mb-6 p-4 rounded-lg ${cardBg}`}>
                  <h4 className={`text-lg font-bold mb-3 ${textColor}`}>{difference.number}. {difference.title}</h4>
                  <div className={`p-3 rounded flex items-start gap-3 ${isDarkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'}`}>
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className={secondaryText}>{difference.content}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'unique' && (
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} border-l-4 border-blue-500`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textColor}`}>
                <XCircle className="w-7 h-7 text-blue-500" />
                Unique Points: What Only One Standard Covers
              </h3>
              <p className={`mb-6 ${secondaryText}`}>
                These are distinctive features, tools, or approaches that are exclusive to each standard, representing their unique value propositions.
              </p>

              {/* Visual Map: Radar Chart for Standards Coverage */}
              <div className={`p-6 rounded-lg ${cardBg} mb-8`}>
                <h4 className={`text-xl font-bold mb-4 ${textColor}`}>Visual Coverage Map: Standards vs. Key PM Topics</h4>
                <div className="relative h-96">
                  <canvas ref={chartRef} style={{ width: '100%', height: '400px' }}></canvas> {/* Fixed height here */}
                </div>
                <p className={`mt-4 text-sm ${secondaryText}`}>
                  Radar map visualizing the depth of coverage (1-10 scale) across core project management topics for each standard. Higher values indicate more detailed guidance.
                </p>
              </div>

              <div className="mb-8">
                <h4 className={`text-xl font-bold mb-4 ${textColor}`}>PMBOK 7th Edition Unique Points</h4>
                {uniquePMBOK.map((point, idx) => (
                  <div key={idx} className={`mb-4 p-4 rounded ${isDarkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-50'} border-l-4 border-blue-600`}>
                    <h5 className={`font-bold ${textColor}`}>{point.number}. {point.title}</h5>
                    <p className={`mt-2 ${secondaryText}`}>{point.explanation}</p>
                    <p className={`mt-1 text-sm ${secondaryText}`}><strong>Page:</strong> {point.pg} | <strong>Section:</strong> {point.section}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className={`text-xl font-bold mb-4 ${textColor}`}>PRINCE2 7th Edition Unique Aspects</h4>
                <div className="space-y-2">
                  {uniquePRINCE2.map((point, idx) => (
                    <div key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-purple-800 bg-opacity-30' : 'bg-purple-50'} border-l-4 border-purple-600`}>
                      <span className={secondaryText}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className={`text-xl font-bold mb-4 ${textColor}`}>ISO 21500/21502 Unique Aspects</h4>
                <div className="space-y-2">
                  {uniqueISO.map((point, idx) => (
                    <div key={idx} className={`p-3 rounded ${isDarkMode ? 'bg-green-800 bg-opacity-30' : 'bg-green-50'} border-l-4 border-green-600`}>
                      <span className={secondaryText}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'scenarios' && (
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-purple-900 bg-opacity-20' : 'bg-purple-50'} border-l-4 border-purple-500`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textColor}`}>
                <Zap className="w-7 h-7 text-purple-500" />
                Tailoring Scenarios: Evidence-Based Recommendations
              </h3>
              <p className={`mb-6 ${secondaryText}`}>
                Predefined scenarios with tailored processes drawn directly from standard sections, ensuring recommendations are grounded in authoritative guidance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(scenariosData).map(([key, data]) => (
                  <div key={key} className={`p-4 rounded-lg ${cardBg} border cursor-pointer hover:${theme.cardHover}`} onClick={() => { setSelectedScenario(key); setCurrentPage('tailor'); }}>
                    <h4 className={`font-bold mb-2 ${textColor}`}>{data.name}</h4>
                    <p className={secondaryText}>{data.description}</p>
                    <button className={`mt-2 text-sm ${theme.text} hover:underline`}>Generate Recommendations</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${textColor}`}>{stats.totalTopics}</div>
                <div className={`text-sm ${secondaryText}`}>Topics Analyzed</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${textColor}`}>{stats.similarities}</div>
                <div className={`text-sm ${secondaryText}`}>Shared Practices</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${textColor}`}>{stats.differences}</div>
                <div className={`text-sm ${secondaryText}`}>Methodological Variations</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${textColor}`}>{stats.uniquePoints}</div>
                <div className={`text-sm ${secondaryText}`}>Exclusive Features</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${textColor}`}>{stats.scenarios}</div>
                <div className={`text-sm ${secondaryText}`}>Tailoring Scenarios</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {showStandardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-lg shadow-2xl max-w-md w-full p-6 animate-fadeIn`}>
            <h3 className={`text-xl font-bold mb-4 ${textColor}`}>
              Choose Standard to View
            </h3>
            <p className={`mb-6 ${secondaryText} text-sm`}>
              Selected: "{selectedInsight}"
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigateToSection('pmbok')}
                className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all flex items-center justify-between"
              >
                <span>View in PMBOK 7</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateToSection('prince2')}
                className="w-full p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all flex items-center justify-between"
              >
                <span>View in PRINCE2</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateToSection('iso')}
                className="w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all flex items-center justify-between"
              >
                <span>View in ISO 21500/21502</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowStandardModal(false)}
                className={`w-full p-3 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${textColor} rounded-lg font-semibold transition-all`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className={`${cardBg} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-8 h-8 ${theme.text}`} />
              <span className={`text-xl font-bold ${textColor}`}>PM Standards Hub</span>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'home' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`

                  }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('library')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'library' ? `${theme.primaryBtn} text-white shadow-lg` :`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`
                  }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Library</span>
              </button>
              <button
                onClick={() => setCurrentPage('compare')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'compare' ? `${theme.primaryBtn} text-white shadow-lg`:`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`
                  }`}
              >
                <GitCompare className="w-5 h-5" />
                <span className="hidden sm:inline">Compare</span>
              </button>
              <button
                onClick={() => setCurrentPage('tailor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'tailor' ? `${theme.primaryBtn} text-white shadow-lg` :`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`
                  }`}
              >
                <Zap className="w-5 h-5" />
                <span className="hidden sm:inline">Tailor</span>
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'dashboard' ? `${theme.primaryBtn} text-white shadow-lg` :`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`
                  }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentPage('bookmarks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'bookmarks' ? `${theme.primaryBtn} text-white shadow-lg`:`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`
                  }`}
              >
                <Bookmark className="w-5 h-5" />
                <span className="hidden sm:inline">Bookmarks ({bookmarks.length})</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all $ ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-gray-600'}`}
                >
                  <Palette className="w-5 h-5" />
                </button>

                {showThemeSelector && (
                  <div className={`absolute right-0 mt-2 w-48 ${cardBg} rounded-lg shadow-xl border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} z-50`}>
                    <div className="p-2">
                      <div className={`text-xs font-semibold ${secondaryText} px-2 py-1`}>Choose Theme</div>
                      {Object.entries(themes).map(([key, t]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setCurrentTheme(key);
                            setShowThemeSelector(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded ${textColor} hover:bg-opacity-10 transition-all flex items-center justify-between`}
                        >
                          <span>{t.name}</span>
                          {currentTheme === key && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'compare' && <ComparePage />}
        {currentPage === 'tailor' && <TailorPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'bookmarks' && <BookmarksPage />}
      </main>
    </div>
  );
};

export default App;