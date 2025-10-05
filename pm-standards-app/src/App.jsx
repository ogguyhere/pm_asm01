import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, GitCompare, BarChart3, Bookmark, Home, ChevronRight, CheckCircle, XCircle, AlertCircle, Palette, Sun, Moon, ExternalLink } from 'lucide-react';

const themes = {
  blue: {
    name: "Ocean Blue",
    gradient: "from-blue-600 to-cyan-600",
    primaryBtn: "bg-blue-600 hover:bg-blue-700",
    secondaryBg: "bg-blue-100 text-blue-700",
    border: "border-blue-600",
    text: "text-blue-600"
  },
  purple: {
    name: "Royal Purple",
    gradient: "from-purple-600 to-pink-600",
    primaryBtn: "bg-purple-600 hover:bg-purple-700",
    secondaryBg: "bg-purple-100 text-purple-700",
    border: "border-purple-600",
    text: "text-purple-600"
  },
  green: {
    name: "Forest Green",
    gradient: "from-green-600 to-teal-600",
    primaryBtn: "bg-green-600 hover:bg-green-700",
    secondaryBg: "bg-green-100 text-green-700",
    border: "border-green-600",
    text: "text-green-600"
  },
  orange: {
    name: "Sunset Orange",
    gradient: "from-orange-600 to-red-600",
    primaryBtn: "bg-orange-600 hover:bg-orange-700",
    secondaryBg: "bg-orange-100 text-orange-700",
    border: "border-orange-600",
    text: "text-orange-600"
  }
};

const standardsData = {
  pmbok: {
    name: "PMBOK 7th Edition",
    sections: [
      {
        id: "integration-management",
        title: "Integration Management",
        content: "Primarily in the Uncertainty Performance Domain (Section 4.7, pages 137-152) and overall integration across all 8 Performance Domains; the former Project Integration Management Knowledge Area from PMBOK 6th is now distributed (e.g., Develop Project Charter in Delivery Domain, pages 89-104).",
        keyPoints: []
      },
      {
        id: "stakeholder-management",
        title: "Stakeholder Management",
        content: "Stakeholder Performance Domain (Section 2, pages 21-36).",
        keyPoints: []
      },
      {
        id: "scope-management",
        title: "Scope Management",
        content: "Delivery Performance Domain (Section 6, pages 105-120) and Planning Domain (Section 4, pages 69-84).",
        keyPoints: []
      },
      {
        id: "schedule-management",
        title: "Schedule Management",
        content: "Primarily in the Planning Performance Domain (Section 4, pages 69-84, covering plan schedule and estimate activities) and Measurement Performance Domain (Section 7, pages 121-136, for control and monitoring); also referenced in the Delivery Domain (Section 6, pages 105-120) for execution ties.",
        keyPoints: []
      },
      {
        id: "cost-management",
        title: "Cost Management",
        content: "Planning Performance Domain (Section 4, pages 69-84, for plan and estimate costs) and Measurement Performance Domain (Section 7, pages 121-136, for control); ties to Uncertainty Domain for contingencies (Section 8, pages 137-152).",
        keyPoints: []
      },
      {
        id: "quality-management",
        title: "Quality Management",
        content: "Delivery Performance Domain (Section 6, pages 105-120, for plan quality and control); Planning Domain (Section 4, pages 69-84) for integration.",
        keyPoints: []
      },
      {
        id: "resource-team-management",
        title: "Resource/Team Management",
        content: "Team Performance Domain (Section 3, pages 37-52, covering establish team, develop team, manage team, and high-performance teams); also in Planning Performance Domain (Section 4, pages 69-84) for estimate resources and acquire resources.",
        keyPoints: []
      },
      {
        id: "communication-management",
        title: "Communication Management",
        content: "Team Performance Domain (Section 3, pages 37-52, for manage communications and team collaboration) and Stakeholder Performance Domain (Section 2, pages 21-36, for engagement via information flows); integrated with Planning Domain (Section 4, pages 69-84).",
        keyPoints: []
      },
      {
        id: "risk-uncertainty-management",
        title: "Risk/Uncertainty Management",
        content: "Uncertainty Performance Domain (Section 8, pages 137-152, encompassing identify risks, assess, plan responses, and implement); tied to Principles like Optimize Risk Responses (Section 1.13, pages 20-25).",
        keyPoints: []
      },
      {
        id: "procurement-management",
        title: "Procurement Management",
        content: "Delivery Performance Domain (Section 6, pages 105-120, covering plan procurement management, conduct procurements, control procurements, and close procurements); integrated with Planning Performance Domain (Section 4, pages 69-84) for strategy development and Uncertainty Domain (Section 8, pages 137-152) for risk allocation.",
        keyPoints: []
      },
      {
        id: "change-management",
        title: "Change Management",
        content: "Primarily in the Uncertainty Performance Domain (Section 8, pages 137-152, for manage changes and responses); also addressed in the Change Principle (Section 1.11, pages 15-20) and integrated across Measurement Domain (Section 7, pages 121-136) for control impacts.",
        keyPoints: []
      },
      {
        id: "business-case",
        title: "Business Case",
        content: "Value Performance Domain ties (Section 1.4, pages 5-10, for value realization); Delivery Performance Domain (Section 6, pages 89-104, for charter and benefits planning); referenced in Planning Domain (Section 4, pages 69-84).",
        keyPoints: []
      },
      {
        id: "governance-organization",
        title: "Governance/Organization",
        content: "Leadership Performance Domain (Section 5, pages 53-68, detailing governance models and decision frameworks); Leadership Principle (Section 1.6, pages 10-15, for effective oversight); integrated throughout Team (Section 3, pages 37-52) and Stakeholder (Section 2, pages 21-36) Domains for role alignment.",
        keyPoints: []
      },
      {
        id: "plans-planning",
        title: "Plans/Planning",
        content: "Planning Performance Domain (Section 4, pages 69-84, for developing integrated and subsidiary plans); referenced in all domains for tailored planning activities.",
        keyPoints: []
      },
      {
        id: "progress-monitoring",
        title: "Progress/Monitoring",
        content: "Measurement Performance Domain (Section 7, pages 121-136, for track performance, manage variances, and report); integrated with Delivery (Section 6, pages 105-120).",
        keyPoints: []
      },
      {
        id: "benefits-management",
        title: "Benefits Management",
        content: "Value Performance Domain (Section 1.4, pages 5-10, emphasizing benefits realization as core to value); Delivery Performance Domain (Section 6, pages 89-104, for benefits planning and handover); integrated with Stewardship Principle (Section 1.1, pages 1-5) for sustained outcomes.",
        keyPoints: []
      },
      {
        id: "tailoring",
        title: "Tailoring",
        content: "Tailoring Principle (Section 1.7, pages 15-20, providing guidance on customizing processes, models, and methods); applied explicitly throughout the 8 Performance Domains and 12 Principles, with examples in life cycle selection (pages 70-75 in Planning Domain).",
        keyPoints: []
      },
      {
        id: "sustainability",
        title: "Sustainability",
        content: "Stewardship Principle (Section 1.1, pages 1-5, for responsible management of resources and impacts); Uncertainty Performance Domain (Section 8, pages 137-152, integrating ESG into risks and resilience); referenced in Value Domain (pages 5-10) for long-term viability.",
        keyPoints: []
      },
      {
        id: "lessons-learned-management",
        title: "Lessons Learned Management",
        content: "Integrated across the Measurement Performance Domain (Section 7, pages 121-136) and Closure activities in Delivery Domain (Section 6, pages 105-120); specifically mentioned in the Knowledge Management Principle (Section 1.12, pages 20-25) and as an artifact in retrospectives (e.g., pages 130-135).",
        keyPoints: []
      },
      {
        id: "project-closure",
        title: "Project Closure",
        content: "Delivery Performance Domain (Section 6, pages 105-120, specifically Close Project or Phase) and Measurement Domain (Section 7, pages 121-136); integrated with principles like Stewardship (Section 1.1, pages 1-5).",
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
        content: "Integrated across all 7 Practices (e.g., Business Case Practice, pages 45-60) and 7 Processes (e.g., Directing a Project Process, pages 120-135; Managing a Stage Boundary Process, pages 200-215).",
        keyPoints: []
      },
      {
        id: "stakeholder-management",
        title: "Stakeholder Management",
        content: "Organization Practice (pages 65-80) and People Integrated Element (pages 15-20); embedded in Directing a Project Process (pages 120-135).",
        keyPoints: []
      },
      {
        id: "scope-management",
        title: "Scope Management",
        content: "Quality Practice (pages 85-100, focusing on product descriptions) and Plans Practice (pages 105-120).",
        keyPoints: []
      },
      {
        id: "schedule-management",
        title: "Schedule Management",
        content: "Plans Practice (pages 105-120, for developing stage plans) and Progress Practice (pages 135-150, for monitoring and tolerances); integrated into processes like Controlling a Stage (pages 180-195).",
        keyPoints: []
      },
      {
        id: "cost-management",
        title: "Cost Management",
        content: "Plans Practice (pages 105-120, for cost planning) and Business Case Practice (pages 45-60, for justification); Progress Practice (pages 135-150) for monitoring.",
        keyPoints: []
      },
      {
        id: "quality-management",
        title: "Quality Management",
        content: "Quality Practice (pages 85-100, defining quality criteria and methods); embedded in Initiating a Project Process (pages 160-175).",
        keyPoints: []
      },
      {
        id: "resource-team-management",
        title: "Resource/Team Management",
        content: "Organization Practice (pages 65-80, defining roles, responsibilities, and structures like the Project Board and Team Manager); People Integrated Element (pages 15-20, for motivation and leadership); embedded in Controlling a Stage Process (pages 180-195) for day-to-day management.",
        keyPoints: []
      },
      {
        id: "communication-management",
        title: "Communication Management",
        content: "Organization Practice (pages 65-80, detailing the Communication Management Approach); embedded in Directing a Project (pages 120-135) and Controlling a Stage (pages 180-195) for reporting.",
        keyPoints: []
      },
      {
        id: "risk-uncertainty-management",
        title: "Risk/Uncertainty Management",
        content: "Risk Practice (pages 155-170, covering approach, identification, assessment, and response); integrated into Business Case (pages 45-60) and Controlling a Stage (pages 180-195).",
        keyPoints: []
      },
      {
        id: "procurement-management",
        title: "Procurement Management",
        content: "Organization Practice (pages 65-80, addressing supplier selection, roles, and contracts as part of organizational structure); embedded in Plans Practice (pages 105-120) for procurement planning, Business Case Practice (pages 45-60) for cost justification, and Controlling a Stage Process (pages 180-195) for administration.",
        keyPoints: []
      },
      {
        id: "change-management",
        title: "Change Management",
        content: "Change Practice (pages 175-190, covering issue and change control procedures); embedded in Controlling a Stage Process (pages 180-195) and Managing Product Delivery (pages 195-210) for implementation.",
        keyPoints: []
      },
      {
        id: "business-case",
        title: "Business Case",
        content: "Business Case Practice (pages 45-60, defining development and maintenance); integrated into Starting Up a Project (pages 140-155) and Directing a Project (pages 120-135) for approvals.",
        keyPoints: []
      },
      {
        id: "governance-organization",
        title: "Governance/Organization",
        content: "Organization Practice (pages 65-80, covering roles, responsibilities, and structures like the Project Board); embedded in Directing a Project Process (pages 120-135) for high-level governance and Initiating a Project (pages 160-175) for setup.",
        keyPoints: []
      },
      {
        id: "plans-planning",
        title: "Plans/Planning",
        content: "Plans Practice (pages 105-120, covering plan types, levels, and product-based planning); integrated into Initiating a Project Process (pages 160-175) and Managing a Stage Boundary (pages 200-215).",
        keyPoints: []
      },
      {
        id: "progress-monitoring",
        title: "Progress/Monitoring",
        content: "Progress Practice (pages 135-150, covering tolerances, reports, and controls); embedded in Controlling a Stage (pages 180-195) and Directing a Project (pages 120-135).",
        keyPoints: []
      },
      {
        id: "benefits-management",
        title: "Benefits Management",
        content: "Business Case Practice (pages 45-60, detailing benefits identification and management approach); Closing a Project Process (pages 220-235, for final realization planning); referenced in Directing a Project (pages 120-135) for oversight.",
        keyPoints: []
      },
      {
        id: "tailoring",
        title: "Tailoring",
        content: "Tailor to Suit the Project Principle (pages 35-40, for adapting the method to context); Project Context Integrated Element (pages 25-30, for assessing scale, complexity, and environment); referenced in all Practices and Processes for application.",
        keyPoints: []
      },
      {
        id: "sustainability",
        title: "Sustainability",
        content: "Sustainability Targets within People Integrated Element (pages 20-25, for embedding ESG in team and delivery); Business Case Practice (pages 45-60, for assessing sustainable benefits); cross-referenced in Tailoring Principle (pages 35-40).",
        keyPoints: []
      },
      {
        id: "lessons-learned-management",
        title: "Lessons Learned Management",
        content: "Embedded in the Learning from Experience Principle (pages 40-45) and throughout Processes like Managing a Stage Boundary (pages 200-215) and Closing a Project Process (pages 220-235); detailed in the Lessons Log and Lessons Report (Management Products, Appendix A, pages 250-255).",
        keyPoints: []
      },
      {
        id: "project-closure",
        title: "Project Closure",
        content: "Closing a Project Process (pages 220-235); also referenced in Directing a Project (pages 120-135) for authorization.",
        keyPoints: []
      }
    ]
  },
  iso: {
    name: "ISO 21500/21502",
    sections: [
      {
        id: "integration-management",
        title: "Integration Management",
        content: "Clause 8 (Operation, pages 25-35) covers integrated processes like Develop Project Plans (8.1.3) and Control Project Work (8.1.5); Annex A lists 39 processes under Integration (A.1).",
        keyPoints: []
      },
      {
        id: "stakeholder-management",
        title: "Stakeholder Management",
        content: "Clause 8.1.9 (Identify Stakeholders, pages 28-29) and 8.1.10 (Manage Stakeholders, pages 29-30); Annex A under Integration.",
        keyPoints: []
      },
      {
        id: "scope-management",
        title: "Scope Management",
        content: "Clause 8.1.11-8.1.14 (Define Scope, Create WBS, Define Activities, Control Scope, pages 30-32); Annex A under Scope.",
        keyPoints: []
      },
      {
        id: "schedule-management",
        title: "Schedule Management",
        content: "Clause 8.2 (Time Management, pages 32-34), detailing processes such as Define Activities (8.2.1), Sequence Activities (8.2.2), Estimate Activity Durations (8.2.3), Develop Schedule (8.2.4), and Control Schedule (8.2.5); Annex A under Planning and Controlling Groups.",
        keyPoints: []
      },
      {
        id: "cost-management",
        title: "Cost Management",
        content: "Clause 8.3 (Cost Management, pages 34-35), including Estimate Costs (8.3.1), Determine Budget (8.3.2), and Control Costs (8.3.3); no separate planning clause, integrated into Clause 6.",
        keyPoints: []
      },
      {
        id: "quality-management",
        title: "Quality Management",
        content: "Clause 8.4 (Quality Management, pages 35-36), covering Plan Quality Management (8.4.1), Perform Quality Assurance (8.4.2), and Perform Quality Control (8.4.3).",
        keyPoints: []
      },
      {
        id: "resource-team-management",
        title: "Resource/Team Management",
        content: "Clause 8.5 (Resource Management, pages 36-38), including Establish Project Team (8.5.1), Estimate Resources (8.5.2), Define Team Organization (8.5.3), Develop Team (8.5.4), Control Resources (8.5.5), and Manage Team (8.5.6); Annex A under Resource and Team processes in Planning and Implementing Groups.",
        keyPoints: []
      },
      {
        id: "communication-management",
        title: "Communication Management",
        content: "Clause 8.6 (Communication Management, pages 38-39), covering Plan Communications Management (8.6.1), Distribute Information (8.6.2), and Manage Communications (8.6.3); Annex A under Integration and Controlling.",
        keyPoints: []
      },
      {
        id: "risk-uncertainty-management",
        title: "Risk/Uncertainty Management",
        content: "Clause 8.7 (Risk Management, pages 39-40), including Identify Risks (8.7.1), Assess Risks (8.7.2), Treat Risks (8.7.3), and Control Risks (8.7.4); Annex A under Planning and Controlling.",
        keyPoints: []
      },
      {
        id: "procurement-management",
        title: "Procurement Management",
        content: "Clause 8.8 (Procurement Management, pages 40-41), including Plan Procurements (8.8.1), Select Suppliers (8.8.2), and Administer Procurements (8.8.3); Annex A under Resource Management in Implementing and Controlling Groups, with cross-references to Clause 6 (Planning, pages 20-25).",
        keyPoints: []
      },
      {
        id: "change-management",
        title: "Change Management",
        content: "Clause 8.1.6 (Control Changes, page 28) under Operation/Integration; cross-referenced in Clause 9 (Performance Evaluation, pages 30-35) for monitoring effects; Annex A lists it as a core process in Controlling Group.",
        keyPoints: []
      },
      {
        id: "business-case",
        title: "Business Case",
        content: "Clause 6 (Planning, pages 20-25, specifically Develop Business Case (6.1.1)); Annex A under Initiating Group.",
        keyPoints: []
      },
      {
        id: "governance-organization",
        title: "Governance/Organization",
        content: "Clause 5 (Leadership and Governance, pages 15-20, addressing organizational context, roles, and decision authority); Annex A under Integration and Leadership processes across groups.",
        keyPoints: []
      },
      {
        id: "plans-planning",
        title: "Plans/Planning",
        content: "Clause 6 (Planning, pages 20-25), including Develop Project Management Plans (6.1), Develop Baseline Plans (6.2), and Develop Detailed Plans (6.3); Annex A under Planning Group.",
        keyPoints: []
      },
      {
        id: "progress-monitoring",
        title: "Progress/Monitoring",
        content: "Clause 9 (Performance Evaluation, pages 30-35), including Control Project Work (9.1), Control Schedule/Cost/Quality (9.2-9.4), etc.; Annex A under Controlling Group.",
        keyPoints: []
      },
      {
        id: "benefits-management",
        title: "Benefits Management",
        content: "Clause 10 (Improvement, pages 35-40), covering Realize Benefits (10.2, pages 37-38) and Maintain Benefits (10.3, pages 38-40); Annex A under Closing and Improvement Groups for post-project focus.",
        keyPoints: []
      },
      {
        id: "tailoring",
        title: "Tailoring",
        content: "Clause 4.4 (Tailoring Guidance, pages 12-15, outlining adaptation of processes to organizational and project contexts); integrated into Clause 4 (Context of the Organization, pages 8-15) and Annex A for process customization.",
        keyPoints: []
      },
      {
        id: "sustainability",
        title: "Sustainability",
        content: "Clause 4.2 (Sustainability Context, pages 8-10, defining integration of ESG factors); Annex C (Guidelines for Sustainability, pages 50-55, with examples for processes); tied to Clause 10 (Improvement, pages 35-40).",
        keyPoints: []
      },
      {
        id: "lessons-learned-management",
        title: "Lessons Learned Management",
        content: "Clause 8.1.7 (Collect Lessons Learned, pages 28-29) under Integration; also in Clause 10 (Improvement, pages 35-40) for ongoing knowledge transfer; Annex A lists it as a process in Closing Group.",
        keyPoints: []
      },
      {
        id: "project-closure",
        title: "Project Closure",
        content: "Clause 8.1.8 (Close Project Phase or Project, pages 29-30) under Integration; Closing Process Group in Annex A.",
        keyPoints: []
      }
    ]
  }
};

const comparisonData = [
  {
    topic: "Integration Management",
    similarities: [
      "All three standards emphasize integration as the coordination of people, processes, and activities to achieve project objectives, with overlapping guidance on developing a unified project plan, directing work, monitoring progress, and closing projects.",
      "For instance, they all advocate for a centralized project management plan that consolidates subsidiary plans (e.g., scope, schedule) and stress change control as part of integration to ensure alignment with objectives.",
      "Common practices include initiating with a charter/mandate, ongoing monitoring via reports, and lessons learned at closure.",
      "This overlap supports holistic project oversight, where integration acts as the \"glue\" for other domains/themes, promoting efficiency and reducing silos.",
      "In practice, this means using tools like status reports and dashboards across standards to track variances and adjust baselines, ensuring deliverables meet value expectations."
    ],
    differences: [
      "PMBOK 7th uses a domain-based approach, integrating via 8 Performance Domains with adaptive models (e.g., predictive, agile), focusing on outcomes like value delivery rather than rigid processes; terminology includes \"performance domains\" and \"artifacts\" (e.g., project charter as an artifact).",
      "PRINCE2 employs a process-oriented methodology with stage-based integration (non-overlapping management stages), using terms like \"Project Initiation Documentation (PID)\" for the integrated plan and \"exception management\" for control; it's prescriptive, requiring tolerance-based escalation.",
      "ISO 21500 follows a process-group structure (5 groups: Initiating, Planning, Implementing, Controlling, Closing), with neutral terminology like \"Develop Project Plans\" but less prescriptive than PRINCE2, emphasizing international harmonization without tools/techniques.",
      "Methodologically, PMBOK is flexible and principle-driven (e.g., Systems Thinking Principle), PRINCE2 is stage-gated and role-defined, and ISO is high-level guidance without certification focus."
    ],
    unique: {
      pmbok: "uniquely integrates sustainability and adaptability into its Uncertainty Domain, with detailed models for handling ambiguity (e.g., ambiguity analysis techniques, pages 140-145), not explicitly in others.",
      prince2: "alone mandates \"Manage by Exception\" as an integration mechanism (Principle 5, pages 30-35), where tolerances trigger automated escalations, providing a unique governance layer absent in PMBOK's adaptive flows or ISO's generic controls.",
      iso: "uniquely extends integration to programme/portfolio levels (Clause 4, pages 10-15), including \"Develop Programme Charter\" (Annex B), offering a strategic alignment not detailed in PMBOK's project focus or PRINCE2's tactical stages."
    }
  },
  {
    topic: "Stakeholder Management",
    similarities: [
      "The standards converge on identifying stakeholders early, analyzing their influence/interests, and engaging them throughout via communication and conflict resolution to ensure buy-in and value realization.",
      "Overlapping practices include stakeholder registers/matrices for mapping power/interest and tailored engagement plans to address needs, with emphasis on continuous assessment to adapt to changes.",
      "This shared guidance fosters alignment, reducing resistance and enhancing decision-making; for example, all recommend power-interest grids and regular feedback loops to monitor satisfaction."
    ],
    differences: [
      "PMBOK 7th terminology centers on \"engagement assessment matrix\" and assesses via sentiment analysis in an adaptive, domain-specific methodology.",
      "PRINCE2 uses \"communication management approach\" within its defined roles (e.g., Project Board represents stakeholders), with a methodology tied to tolerances and stage reviews for structured engagement.",
      "ISO 21500 employs neutral terms like \"stakeholder register\" in a linear process group flow, less adaptive than PMBOK and more generic than PRINCE2's role-based approach.",
      "Methodologically, PMBOK is outcome-focused (e.g., value co-creation), PRINCE2 is governance-driven (e.g., executive oversight), and ISO is compliance-oriented."
    ],
    unique: {
      pmbok: "uniquely covers \"stakeholder collaboration models\" like servant leadership for agile contexts (pages 25-28), integrating emotional intelligence metrics not in others.",
      prince2: "defines a mandatory three-interest model (business, user, supplier) in the Project Board (Organization Practice, pages 70-75), ensuring balanced representation.",
      iso: "uniquely includes stakeholders in portfolio governance (Clause 5, pages 15-20), with processes for programme-level engagement (Annex B)."
    }
  },
  {
    topic: "Scope Management",
    similarities: [
      "All advocate defining scope via requirements collection, creating hierarchical breakdowns (WBS/PBS), and controlling via change requests to prevent creep.",
      "Common practices include traceability matrices linking requirements to deliverables and validation through acceptance criteria, ensuring scope aligns with objectives and is baselined for monitoring."
    ],
    differences: [
      "PMBOK 7th uses \"scope baseline\" in a domain-integrated methodology, adaptive to life cycles (e.g., iterative refinement).",
      "PRINCE2 terminology includes \"Product Breakdown Structure (PBS)\" and \"Product Description,\" with a product-focused methodology via stage tolerances.",
      "ISO 21500 uses \"work breakdown structure\" in sequential processes, without adaptive elements.",
      "PMBOK is flexible, PRINCE2 prescriptive via products, ISO standardized but basic."
    ],
    unique: {
      pmbok: "uniquely addresses scope in hybrid environments with \"progressive elaboration techniques\" (pages 110-115).",
      prince2: "alone requires \"Product Flow Diagrams\" for sequencing (Quality Practice, pages 90-95).",
      iso: "uniquely merges requirements into Define Scope without separate validation (8.1.11)."
    }
  },
  {
    topic: "Schedule Management",
    similarities: [
      "All three standards stress the importance of defining, sequencing, and estimating project activities to create a realistic schedule baseline, followed by ongoing control through variance analysis and adjustments to ensure timely delivery of value.",
      "Common practices include identifying dependencies (e.g., finish-to-start), using techniques like critical path method (CPM) or Gantt charts for visualization, and incorporating buffers or contingencies for uncertainties.",
      "They overlap in recommending progressive elaboration—starting with high-level milestones and refining as details emerge—and in monitoring via earned value management (EVM) or progress reports to track schedule performance against baselines.",
      "This shared guidance promotes proactive risk mitigation, such as crashing or fast-tracking activities when delays occur, and integrates schedule with other domains like scope and resources to avoid silos."
    ],
    differences: [
      "PMBOK 7th Edition employs a flexible, domain-based methodology with terminology like \"schedule baseline\" and \"schedule performance index (SPI)\" in earned value analysis, adapting to predictive, agile, or hybrid life cycles through rolling-wave planning and iterative refinements; it's principle-driven, emphasizing tailoring to project complexity without rigid stages.",
      "PRINCE2 uses a prescriptive, stage-oriented methodology with terms such as \"stage plans\" and \"time tolerances,\" where schedules are developed at initiation and updated at boundaries, integrating exception management for escalations if tolerances are breached; it's governance-focused, requiring approval by the Project Board for changes.",
      "ISO 21500:2021 follows a linear, process-group methodology with neutral terminology like \"develop schedule\" and \"control schedule,\" providing high-level guidance without specific tools or adaptations, emphasizing international harmonization for consistent application across cultures.",
      "Methodologically, PMBOK is adaptive and outcome-oriented for dynamic environments, PRINCE2 is controlled and exception-based for structured governance, and ISO is generic and process-mapped, serving as a foundational checklist rather than a full method."
    ],
    unique: {
      pmbok: "uniquely details agile-specific techniques like \"iteration planning\" and \"velocity-based forecasting\" within hybrid models (pages 75-80), including integration with DevOps pipelines for continuous delivery, which allows for empirical adjustments not explicitly covered in the stage-bound approaches of PRINCE2 or the linear processes of ISO.",
      prince2: "alone mandates \"tolerance-based scheduling\" where time deviations trigger automated reviews and replanning (Progress Practice, pages 140-145), providing a unique delegation mechanism that empowers teams within defined limits while ensuring executive oversight, absent in PMBOK's metric thresholds or ISO's basic controls.",
      iso: "uniquely positions activity definition under scope management (cross-referenced to Clause 8.1.13, pages 31-32), treating schedule as a downstream output rather than a standalone domain, and extends it to programme-level aggregation (Annex B), offering a holistic view for multi-project timelines not as integrated in PMBOK's project focus or PRINCE2's tactical stages."
    }
  },
  {
    topic: "Cost Management",
    similarities: [
      "The standards converge on estimating costs accurately using historical data and expert judgment, aggregating them into a baseline budget, and controlling expenditures through variance tracking to ensure financial viability and value delivery.",
      "Overlapping practices include three-point estimating for realism, funding limit reconciliation to manage cash flows, and to-complete performance index (TCPI) for forecasting overruns.",
      "They all emphasize integrating cost with schedule (e.g., via EVM) and risks, updating baselines only through formal change control, and reporting cost performance to stakeholders for transparency.",
      "This common framework supports lifecycle costing—considering acquisition, operations, and disposal phases—and promotes cost-benefit analysis to prioritize investments, reducing waste and aligning with organizational goals through regular audits and corrective actions like reallocation or value engineering."
    ],
    differences: [
      "PMBOK 7th Edition uses terminology like \"cost baseline\" and \"cost variance (CV)\" in an adaptive, domain-integrated methodology, supporting agile cost management via story points and burn-down charts; it's flexible, tailoring estimates to life cycle models and focusing on predictive analytics for sustainability.",
      "PRINCE2 employs \"cost tolerances\" and \"budget tolerances\" in a stage-based methodology, where costs are justified continuously via the business case and monitored through exception reports; it's prescriptive, linking deviations to project viability assessments.",
      "ISO 21500:2021 adopts neutral terms like \"determine budget\" in a sequential process-group flow, omitting a dedicated planning process and emphasizing standardization without metrics; it's concise, prioritizing compliance over tools.",
      "Methodologically, PMBOK is metric-rich and hybrid-adaptable, PRINCE2 is tolerance-governed and justification-driven, and ISO is streamlined for global baselines."
    ],
    unique: {
      pmbok: "uniquely incorporates \"total cost of ownership (TCO)\" models for long-term sustainability, including environmental costs in estimates (pages 80-85), and agile funding techniques like fixed-price iterations, providing forward-looking financial resilience not detailed in others.",
      prince2: "alone requires cost tolerances to be set at initiation and reviewed at stage ends (Business Case Practice, pages 50-55), with escalation to the Project Board for breaches, offering a unique empowerment-with-accountability structure missing from PMBOK's variance alerts or ISO's generic controls.",
      iso: "uniquely omits a separate cost planning process, folding it into overall project planning (Clause 6.1, pages 20-22), and links budgets directly to programme funding (Annex B), enabling aggregated financial oversight for portfolios not as explicitly connected in PMBOK's domains or PRINCE2's project-specific tolerances."
    }
  },
  {
    topic: "Quality Management",
    similarities: [
      "All emphasize planning quality standards based on requirements, assuring conformance through audits and reviews, and controlling via inspections and testing to deliver fit-for-purpose outputs.",
      "Common practices include defining metrics (e.g., defect density), using tools like Pareto charts for root causes, and continuous improvement via PDCA cycles.",
      "They overlap in customer-focused validation—ensuring deliverables meet acceptance criteria—and in integrating quality with scope and risks, preventing rework through prevention over inspection.",
      "This shared approach fosters a quality culture, with regular reporting on conformance and non-conformance trends to enable data-driven enhancements, ultimately supporting value realization by minimizing costs and maximizing satisfaction."
    ],
    differences: [
      "PMBOK 7th Edition uses \"quality metrics\" and \"cost of quality\" in a domain-adaptive methodology, blending predictive audits with agile retrospectives for iterative quality; it's principle-led, tailoring to life cycles.",
      "PRINCE2 terminology includes \"Quality Register\" and \"Product Descriptions,\" with a product-centric methodology requiring predefined criteria and stage-gate reviews; it's structured, tying quality to tolerances.",
      "ISO 21500:2021 employs \"perform quality assurance/control\" in linear processes, without tools or metrics; it's standardized but basic.",
      "Methodologically, PMBOK is flexible and integrated, PRINCE2 is prescriptive and product-driven, ISO is process-oriented and neutral."
    ],
    unique: {
      pmbok: "uniquely links quality to value delivery with \"quality management planning canvas\" for hybrid environments (pages 110-115), including servant leadership for team-driven quality, not in others.",
      prince2: "alone mandates \"acceptance criteria\" in every Product Description (Quality Practice, pages 90-95), with mandatory quality reviews at handover, providing product-assurance rigor absent elsewhere.",
      iso: "uniquely splits assurance and control without integration details (8.4.2-8.4.3), and extends to programme quality governance (Annex B), for multi-level conformance."
    }
  },
  {
    topic: "Resource/Team Management",
    similarities: [
      "All three standards underscore the critical role of acquiring, developing, and optimizing human and material resources to ensure project success, with overlapping guidance on assessing needs based on skills, roles, and availability, then building cohesive teams through training, mentoring, and performance feedback.",
      "Common practices include using organizational charts or RACI (Responsible, Accountable, Consulted, Informed) matrices to clarify responsibilities, implementing conflict resolution techniques like interest-based negotiation, and fostering motivation via recognition and career development opportunities to boost engagement and productivity.",
      "They all integrate resource management with other areas, such as scheduling for leveling (e.g., avoiding overallocation) and budgeting for cost efficiency, while emphasizing diversity and inclusion to drive innovation and ethical practices.",
      "This shared framework promotes proactive resource forecasting—using tools like resource histograms or capacity planning software—and regular reviews to address gaps, such as burnout or skill shortages, ultimately aligning team performance with project objectives and organizational culture."
    ],
    differences: [
      "PMBOK 7th Edition adopts a domain-based, adaptive methodology with terminology centered on \"team charter\" (a collaborative agreement on norms) and \"high-performing team characteristics,\" focusing on leadership models like servant or situational leadership to empower self-organizing teams in agile or hybrid contexts; it's flexible, emphasizing emotional intelligence and psychological safety for continuous improvement without fixed roles.",
      "PRINCE2 uses a structured, role-defined methodology with terms like \"defined roles\" (e.g., Project Manager, Team Manager, Executive) and \"senior user/supplier interests,\" integrating resources into governance through tolerances and stage authorizations; it's prescriptive, requiring formal delegation and accountability via the Project Organization Chart, with a focus on supplier management in complex environments.",
      "ISO 21500:2021 employs neutral, process-oriented terminology like \"establish project team\" and \"control resources,\" following a linear sequence from estimation to management without leadership specifics, prioritizing international standardization for scalability across industries; it's high-level, lacking tools or motivational strategies.",
      "Methodologically, PMBOK is outcome-focused and people-centric for dynamic teams, PRINCE2 is hierarchy-driven and exception-based for controlled delivery, and ISO is procedural and resource-agnostic, serving as a customizable baseline."
    ],
    unique: {
      pmbok: "uniquely outlines \"team development stages\" based on Tuckman’s model (forming, storming, norming, performing, adjourning) with tailored interventions like co-location for high-performance teams (pages 40-45), including metrics for team health such as engagement surveys and emotional intelligence assessments, which provide a psychological depth not found in PRINCE2's role assignments or ISO's processes.",
      prince2: "alone incorporates \"supplier interests\" into the core organization structure, mandating representation on the Project Board for balanced decision-making in outsourced scenarios (Organization Practice, pages 70-75), with unique escalation paths for resource disputes, offering a governance safeguard absent in PMBOK's adaptive flows or ISO's generic team establishment.",
      iso: "uniquely includes a dedicated \"Control Resources\" process (8.5.5, pages 37-38) that addresses non-human resources (e.g., equipment monitoring) alongside teams, extending to programme-level resource pooling (Annex B), enabling enterprise-wide optimization not as explicitly detailed in PMBOK's team focus or PRINCE2's project-specific roles."
    }
  },
  {
    topic: "Communication Management",
    similarities: [
      "The standards align on strategically planning communications to meet stakeholder needs, effectively distributing information through appropriate channels, and managing ongoing interactions to build trust and resolve issues promptly.",
      "Common practices include conducting stakeholder analysis to determine message tailoring (e.g., by influence level), using models like push/pull/interactive methods, and establishing feedback mechanisms such as surveys or town halls to gauge effectiveness and adjust strategies.",
      "They overlap in emphasizing timely, accurate reporting—covering progress, risks, and changes—to prevent misinformation, while integrating with governance for escalations and crisis communications.",
      "This shared guidance supports cultural sensitivity in global teams, leveraging tools like dashboards or collaborative platforms (e.g., Microsoft Teams) for transparency, and linking communications to performance metrics like response rates or satisfaction scores, ultimately enhancing alignment, reducing misunderstandings, and accelerating decision-making across project phases."
    ],
    differences: [
      "PMBOK 7th Edition uses terminology like \"communication requirements analysis\" and \"engagement assessment matrix,\" employing an adaptive, domain-integrated methodology that supports agile stand-ups or kanban boards for real-time exchanges; it's principle-driven, focusing on inclusivity and digital transformation for virtual environments without mandatory documents.",
      "PRINCE2 terminology centers on the \"Communication Management Approach\" (a baseline document outlining methods and frequencies), with a process-oriented methodology tied to roles and tolerances, requiring formal reports like Highlight Reports for escalations; it's prescriptive, ensuring governance through defined audiences and triggers.",
      "ISO 21500:2021 adopts neutral terms like \"distribute information\" and \"manage communications,\" in a sequential process-group flow that emphasizes efficiency without models or roles; it's standardized, providing a framework for compliance rather than innovation.",
      "Methodologically, PMBOK is flexible and stakeholder-centric for dynamic interactions, PRINCE2 is document-controlled and exception-managed for structured oversight, and ISO is linear and minimalistic, ideal for basic implementations."
    ],
    unique: {
      pmbok: "uniquely explores \"advanced communication models\" such as the 7 Cs (clear, concise, concrete, correct, coherent, complete, courteous) integrated with AI tools for sentiment analysis in global teams (pages 45-50), offering data-driven personalization not in PRINCE2's approaches or ISO's distributions.",
      prince2: "alone mandates escalation communications via standardized reports (e.g., Exception Reports for tolerance breaches, pages 75-80), with a unique focus on aligning messages to the three interests (business, user, supplier), providing governance-embedded transparency absent in PMBOK's adaptive models or ISO's generic management.",
      iso: "uniquely swaps \"distribute\" for execution emphasis over interactive management (8.6.2-8.6.3), and includes programme-level communication aggregation (Annex B), facilitating cross-project coordination not detailed in the others' project-centric views."
    }
  },
  {
    topic: "Risk/Uncertainty Management",
    similarities: [
      "All advocate a structured cycle of identifying potential threats and opportunities through techniques like brainstorming or SWOT analysis, assessing their probability and impact via qualitative (e.g., probability-impact matrices) and quantitative methods (e.g., expected monetary value), developing response strategies (mitigate, transfer, accept), and continuously monitoring via registers or audits to adapt plans.",
      "Common practices include prioritizing risks with heat maps, assigning owners for accountability, and integrating responses into baselines for schedule/cost impacts, while fostering a risk-aware culture through training and escalation protocols.",
      "This overlapping guidance ensures proactive rather than reactive handling, linking risks to objectives for value protection, and using tools like Monte Carlo simulations for scenario planning, ultimately reducing surprises and enhancing resilience across uncertainties."
    ],
    differences: [
      "PMBOK 7th Edition distinguishes \"risk\" (known unknowns) from \"uncertainty/ambiguity\" (unknown unknowns), using adaptive terminology like \"exploit/enhance\" for opportunities in a domain-based methodology that supports agile risk backlogs and iterative reassessments; it's holistic, tailoring to life cycles with emphasis on resilience.",
      "PRINCE2 terminology includes \"risk appetite/tolerance\" and treats risks symmetrically (threats/opportunities), in a practice-driven methodology integrated with exceptions—escalating if tolerances breach; it's governance-oriented, requiring a Risk Register updated at stages.",
      "ISO 21500:2021 uses neutral terms like \"treat risks\" in a linear process-group approach, merging assessment without separate planning, focusing on threats primarily; it's standardized, concise without tools.",
      "Methodologically, PMBOK is broad and ambiguity-inclusive for complex environments, PRINCE2 is tolerance-bound and balanced for controlled projects, and ISO is threat-centric and procedural for compliance."
    ],
    unique: {
      pmbok: "uniquely addresses \"ambiguity management\" with techniques like scenario planning and Delphi methods for unknown unknowns (pages 140-145), integrating with stewardship for ethical risk-taking, not covered in PRINCE2's tolerance focus or ISO's identification.",
      prince2: "alone emphasizes \"positive risks\" (opportunities) with equal weight to threats, mandating a \"Recommended Risk Response\" in the register (pages 160-165), providing a unique optimism bias counter absent in PMBOK's uncertainty blend or ISO's treatment.",
      iso: "uniquely lacks a dedicated risk planning process, folding it into overall planning (cross-ref Clause 6), and extends to portfolio risk aggregation (Annex B), for strategic oversight not in the others."
    }
  },
  {
    topic: "Procurement Management",
    similarities: [
      "All three standards emphasize a structured approach to acquiring external goods, services, or resources by assessing internal capabilities, selecting reliable suppliers, negotiating contracts, and overseeing performance to ensure quality, timeliness, and cost-effectiveness while mitigating risks like delays or disputes.",
      "Common practices include conducting make-or-buy analyses to determine outsourcing needs based on core competencies and market conditions, using competitive procurement methods (e.g., RFPs, bids, or proposals) with evaluation criteria like technical capability, price, and past performance for fair selection.",
      "They overlap in contract administration through monitoring deliverables via key performance indicators (KPIs), payment schedules tied to milestones, and dispute resolution mechanisms such as mediation or arbitration, alongside ethical considerations like conflict-of-interest disclosures and sustainable sourcing.",
      "This shared guidance promotes integration with project baselines—linking procurements to schedule, cost, and risks for holistic control—and requires formal closure with audits, lessons learned, and final settlements to release obligations."
    ],
    differences: [
      "PMBOK 7th Edition employs detailed terminology like \"procurement management plan,\" \"source selection analysis,\" and \"contract change control,\" in an adaptive, domain-integrated methodology that supports hybrid life cycles (e.g., agile vendor sprints) and emphasizes tools such as bidder conferences or weighted scoring models for flexibility; it's outcome-focused, tailoring to project scale with strong emphasis on legal/compliance nuances without mandatory roles.",
      "PRINCE2 integrates procurement into \"supplier controls\" and \"corporate/management tolerances,\" using terms like \"supplier interests\" (represented on the Project Board), in a prescriptive, practice-embedded methodology that treats procurement as an organizational extension, requiring stage-based approvals and exception escalations for deviations; it's governance-driven, linking to business justification without standalone processes.",
      "ISO 21500:2021 uses neutral, process-specific terminology like \"administer procurements\" (merging control and close), in a linear, group-based methodology that provides high-level steps without tools, metrics, or ethical details, prioritizing international standardization for simplicity; it's concise and sequential, omitting explicit closure.",
      "Methodologically, PMBOK is tool-rich and life-cycle-adaptive for dynamic sourcing, PRINCE2 is role-integrated and tolerance-bound for controlled partnerships, and ISO is streamlined and compliance-centric for basic execution."
    ],
    unique: {
      pmbok: "uniquely addresses \"ethical and sustainable sourcing\" with techniques like supplier diversity programs and ESG clauses in contracts (pages 115-120), including global compliance models (e.g., ISO 20400 integration) for risk-averse procurement in volatile markets, providing a forward-looking, stewardship-aligned depth not embedded in PRINCE2's roles or ISO's administration.",
      prince2: "alone mandates \"supplier management within the organization structure,\" assigning dedicated interests to the Project Board for balanced oversight (pages 75-80), with unique escalation via tolerances for contract breaches during stages, offering a governance-embedded partnership model absent in PMBOK's plans or ISO's selection.",
      iso: "uniquely merges procurement closure into administration (8.8.3, page 41), without a separate process, but extends it to programme-level supplier pooling (Annex B, pages 45-50), enabling aggregated contracting for efficiency across projects not as strategically scaled in PMBOK's domains or PRINCE2's tactical controls."
    }
  },
  {
    topic: "Change Management",
    similarities: [
      "All three standards promote a formalized process for evaluating, approving, and implementing changes to prevent uncontrolled scope creep, cost overruns, or delays, ensuring alignment with project objectives through impact assessments and stakeholder consultations.",
      "Common practices include maintaining a change log or register to track requests, conducting thorough analyses of effects on scope, schedule, cost, risks, and quality using tools like decision trees or cost-benefit matrices, and establishing a change control board (CCB) or authority for approvals based on predefined criteria.",
      "They overlap in requiring verification of implemented changes via testing or audits, updating all affected baselines and plans, and capturing lessons from changes to refine future processes.",
      "This shared guidance emphasizes communication throughout—notify stakeholders of decisions and outcomes—to maintain transparency and buy-in, while integrating changes with governance for accountability."
    ],
    differences: [
      "PMBOK 7th Edition uses terminology like \"integrated change control\" (encompassing all domains) and \"change request,\" in an adaptive, principle-based methodology that supports agile retrospectives or sprints for rapid iterations, focusing on resilience and holistic impacts across performance domains; it's flexible, allowing tailoring to life cycles without mandatory boards.",
      "PRINCE2 employs \"issue and change control procedure\" (treating changes as issues), with terms like \"Request for Change (RFC)\" and \"off-specification,\" in a prescriptive, practice-oriented methodology integrated with tolerances—escalating via exceptions if changes threaten stage viability; it's governance-heavy, requiring Project Board involvement for major decisions.",
      "ISO 21500:2021 adopts neutral terminology like \"control changes\" as a single process, in a linear, group-based methodology that emphasizes verification without detailed tools or escalations; it's standardized and concise, prioritizing compliance over integration.",
      "Methodologically, PMBOK is domain-spanning and outcome-adaptive for complex changes, PRINCE2 is exception-triggered and stage-gated for controlled environments, and ISO is streamlined and process-focused for basic governance."
    ],
    unique: {
      pmbok: "uniquely incorporates \"change resilience models\" that blend psychological and organizational adaptability, such as Kotter's 8-step model for cultural shifts during changes (pages 145-150), providing a human-centered framework for sustaining momentum post-implementation, not addressed in PRINCE2's procedural forms or ISO's controls.",
      prince2: "alone details standardized forms like the \"Request for Change\" and \"Issue Report\" with templates for capturing impacts and recommendations (pages 180-185), mandating their use in the Change Authority for delegated approvals, offering a unique documentation rigor that ensures auditability absent in PMBOK's fluid assessments or ISO's generic process.",
      iso: "uniquely embeds change control solely within integration (8.1.6), without standalone guidance, but extends it implicitly to programme changes via aggregated controls (Annex B, pages 45-50), facilitating multi-project synchronization not explicitly in PMBOK's project domains or PRINCE2's stage focus."
    }
  },
  {
    topic: "Business Case",
    similarities: [
      "The standards converge on creating a compelling justification for the project by outlining expected benefits, costs, risks, and alternatives, with ongoing updates to reflect realities and ensure continued viability.",
      "Common practices include quantitative analyses like net present value (NPV), internal rate of return (IRR), or payback periods, alongside qualitative assessments of strategic alignment and stakeholder value.",
      "They overlap in requiring sensitivity analysis for assumptions (e.g., scenario modeling for market shifts), linking the business case to resource allocation and success criteria, and reviewing it at gateways like initiation, stages, or closure to trigger go/no-go decisions.",
      "This shared framework promotes transparency through executive summaries and visuals (e.g., benefit maps), integrating with risks for downside protection and benefits management for post-delivery tracking, ultimately driving investment decisions that maximize ROI and align with organizational priorities in resource-constrained settings."
    ],
    differences: [
      "PMBOK 7th Edition frames the business case within the \"value delivery system,\" using terms like \"benefits realization plan\" in a principle-driven, domain-based methodology that emphasizes adaptive forecasting across life cycles, focusing on holistic outcomes like sustainability without formal templates; it's flexible, evolving with agile iterations.",
      "PRINCE2 terminology includes \"Outline Business Case,\" \"Business Case,\" and \"Benefits Management Approach,\" in a practice-based methodology requiring continuous justification at stage boundaries, tied to tolerances for escalations if viability slips; it's prescriptive, mandating versions for initiation and updates.",
      "ISO 21500:2021 uses neutral terms like \"develop business case\" in a high-level planning process, without metrics or updates specified, emphasizing international standardization as an initial artifact; it's concise, serving as a baseline rather than an ongoing tool.",
      "Methodologically, PMBOK is outcome-oriented and integrated for dynamic value, PRINCE2 is justification-gated and tolerance-linked for governance, and ISO is foundational and static for compliance."
    ],
    unique: {
      pmbok: "uniquely details \"benefits realization forecasting\" with techniques like parametric modeling and organizational enablers (e.g., change readiness assessments, pages 90-95), linking to stewardship for long-term societal value, providing predictive depth not in PRINCE2's templates or ISO's development.",
      prince2: "alone structures the business case in progressive versions (outline at startup, full at initiation, updated at boundaries, pages 50-55), with mandatory linkage to tolerances for automated viability checks, offering a unique lifecycle governance absent in PMBOK's domains or ISO's single process.",
      iso: "uniquely positions the business case as a portfolio-level input (Clause 6.2, pages 23-25), enabling aggregated justifications across projects for strategic funding, a hierarchical perspective not detailed in PMBOK's project focus or PRINCE2's tactical updates."
    }
  },
  {
    topic: "Governance/Organization",
    similarities: [
      "All three standards advocate for defining a robust organizational structure that clarifies roles, responsibilities, and reporting relationships to promote accountability, efficient decision-making, and alignment with broader enterprise strategies, using tools such as RACI matrices or responsibility assignment models to avoid overlaps and gaps.",
      "Common practices include establishing escalation mechanisms for unresolved issues, embedding ethical guidelines and compliance checks into governance to mitigate risks, and ensuring diverse stakeholder representation for balanced perspectives.",
      "They overlap in recommending regular governance reviews—such as audits or maturity assessments—at key milestones to adapt to changes, while integrating oversight with performance monitoring for real-time adjustments.",
      "This shared guidance fosters a supportive ecosystem where leadership empowers teams through delegation, clear mandates, and feedback loops, ultimately enhancing project resilience, trust among participants, and value realization by preventing silos and enabling swift resolutions in complex, multi-stakeholder environments."
    ],
    differences: [
      "PMBOK 7th Edition employs terminology like \"governance framework\" and \"adaptive leadership styles\" (e.g., transformational or distributed leadership), in a domain-integrated, principle-based methodology that tailors structures to life cycles (predictive to agile), focusing on holistic enablement without fixed hierarchies; it's flexible, emphasizing collaboration and systems thinking for emergent organizations.",
      "PRINCE2 uses specific terms like \"Project Board\" (comprising Executive, Senior User, Senior Supplier) and \"information needs,\" in a prescriptive, practice-oriented methodology that mandates defined roles from initiation, tied to tolerances for delegated authority and stage-gate approvals; it's hierarchical and governance-centric, requiring formal communication flows.",
      "ISO 21500:2021 adopts neutral terminology such as \"organizational context\" and \"decision-making authority,\" in a high-level, process-group methodology that provides strategic guidance without prescribed roles, prioritizing international standardization for scalability; it's contextual and broad, lacking detailed structures.",
      "Methodologically, PMBOK is adaptive and people-empowering for dynamic settings, PRINCE2 is role-rigid and exception-governed for controlled delivery, and ISO is foundational and enterprise-aligned for compliance across scales."
    ],
    unique: {
      pmbok: "uniquely integrates \"systems thinking\" into governance, using tools like causal loop diagrams to map interdependencies across domains (pages 12-15), promoting holistic leadership that anticipates emergent behaviors in complex adaptive systems, a perspective not detailed in PRINCE2's role charts or ISO's context.",
      prince2: "alone mandates the \"three interests model\" (business, user, supplier) for the Project Board composition (pages 70-75), ensuring equitable representation and conflict resolution through defined interests, providing a unique balance mechanism absent in PMBOK's flexible styles or ISO's generic authority.",
      iso: "uniquely extends governance to programme and portfolio leadership (Clause 5.2, pages 17-20), with processes for aligning multiple projects under enterprise governance, offering a strategic, multi-tiered framework not as explicitly scaled in PMBOK's domains or PRINCE2's project-level board."
    }
  },
  {
    topic: "Plans/Planning",
    similarities: [
      "The standards align on iteratively creating comprehensive plans that outline how to achieve objectives, incorporating inputs from stakeholders, historical data, and constraints to establish controllable baselines for scope, schedule, cost, and risks.",
      "Common practices include progressive elaboration—starting with high-level outlines and refining through workshops or decomposition techniques—and using tools like work breakdown structures (WBS) or mind maps for visualization and alignment.",
      "They overlap in emphasizing integration of subsidiary plans into a master document, conducting what-if analyses for realism, and reviewing plans at gateways for approvals, while linking planning to execution for agility.",
      "This shared approach promotes realism by factoring in uncertainties, resource availability, and quality standards, ensuring plans are actionable, measurable, and adaptable to changes, ultimately serving as a roadmap that drives efficiency, stakeholder confidence, and successful outcomes in varied project contexts."
    ],
    differences: [
      "PMBOK 7th Edition uses \"integrated project management plan\" in a domain-spanning, adaptive methodology that tailors planning to life cycles (e.g., iterative in agile), focusing on principles like holistic thinking without prescribed levels; it's flexible, supporting digital tools for collaborative updates.",
      "PRINCE2 terminology includes \"Project Plan,\" \"Stage Plan,\" and \"Team Plan,\" with a product-based methodology requiring hierarchical planning tied to stage tolerances and product descriptions; it's prescriptive, mandating baseline versions at boundaries for governance.",
      "ISO 21500:2021 employs neutral terms like \"develop baseline plans\" in a sequential, group-based methodology that categorizes plans by detail level (high/medium/low), emphasizing standardization without tools; it's structured yet generic.",
      "Methodologically, PMBOK is interconnected and life-cycle-customized for dynamic planning, PRINCE2 is stage-layered and product-driven for controlled progression, and ISO is phased and scalable for international consistency."
    ],
    unique: {
      pmbok: "uniquely provides \"life cycle tailoring guidance\" with canvases for selecting planning approaches (e.g., predictive vs. adaptive hybrids, pages 70-75), including integration with DevOps for continuous planning, offering customization depth not in PRINCE2's stages or ISO's baselines.",
      prince2: "alone incorporates \"Product Breakdown Structure (PBS)\" into planning (pages 110-115), deriving activity plans from deliverables for a bottom-up, product-focused hierarchy, ensuring traceability absent in PMBOK's domains or ISO's general development.",
      iso: "uniquely defines \"three plan types\" (strategic, tactical, operational, 6.1.3, pages 22-23), with explicit scaling for programme planning (Annex B), providing a graduated framework for multi-level alignment not detailed elsewhere."
    }
  },
  {
    topic: "Progress/Monitoring",
    similarities: [
      "All stress continuous tracking of progress against baselines using key performance indicators (KPIs), variance analysis, and corrective actions to maintain alignment with objectives and enable timely interventions.",
      "Common practices include generating status reports with visuals like dashboards or S-curves, employing earned value management (EVM) for integrated schedule/cost insights, and conducting trend analyses to forecast completions.",
      "They overlap in stakeholder-focused communications—highlighting achievements, issues, and forecasts—and in threshold-based alerts for deviations, while capturing data for lessons learned.",
      "This shared guidance ensures objectivity through quantitative metrics (e.g., SPI, CPI) and qualitative reviews, promoting a feedback loop that adjusts plans proactively, reduces risks, and sustains momentum toward value delivery in real-time project environments."
    ],
    differences: [
      "PMBOK 7th Edition uses \"performance measurement baselines\" and EVM metrics in an adaptive, domain-based methodology that supports agile burndown charts for iterative monitoring; it's data-centric, tailoring thresholds to life cycles.",
      "PRINCE2 terminology includes \"tolerances,\" \"Highlight Reports,\" and \"Exception Reports,\" with a practice-driven methodology focused on manage-by-exception—escalating only breaches; it's governance-oriented, stage-specific.",
      "ISO 21500:2021 adopts neutral terms like \"control project work\" in linear processes, emphasizing evaluation without EVM; it's standardized, process-mapped.",
      "Methodologically, PMBOK is quantitative and flexible for ongoing insights, PRINCE2 is exception-triggered and report-based for efficiency, and ISO is control-oriented and basic for compliance."
    ],
    unique: {
      pmbok: "uniquely defines \"customizable thresholds\" for automated alerts (e.g., AI-driven anomaly detection, pages 125-130), integrating with uncertainty for predictive monitoring in hybrids, not in PRINCE2's tolerances or ISO's controls.",
      prince2: "alone requires \"Checkpoint Reports\" from teams to Project Managers (pages 140-145), enabling granular, frequent progress pulses within tolerances, a delegation tool absent elsewhere.",
      iso: "uniquely aggregates monitoring across domains in Clause 9 without dedicated progress (folds into controls), extending to portfolio dashboards (Annex B), for enterprise visibility."
    }
  },
  {
    topic: "Benefits Management",
    similarities: [
      "All three standards highlight the systematic identification, measurement, and realization of benefits—tangible and intangible outcomes that justify the project—to ensure long-term value beyond delivery, with overlapping guidance on mapping benefits to strategic objectives and tracking progress against baselines throughout the life cycle and into operations.",
      "Common practices include creating benefits profiles or registers that detail descriptions, owners, metrics (e.g., ROI, customer satisfaction scores), and dependencies, conducting regular audits or reviews at milestones to assess realization rates and address shortfalls through corrective actions like enhanced training or process tweaks.",
      "They converge on handover mechanisms—such as benefits maps linking deliverables to outcomes—and post-project monitoring via scheduled reviews (e.g., 6-12 months post-closure) to capture disbenefits or unintended effects, while integrating with business cases for justification and risks for protection.",
      "This shared framework promotes a benefits-led mindset, using tools like dependency networks or scorecards for visualization, fostering accountability through assigned owners and stakeholder reporting, ultimately maximizing organizational impact by aligning investments with sustained performance improvements and preventing value erosion in evolving contexts."
    ],
    differences: [
      "PMBOK 7th Edition approaches benefits through a \"benefits realization plan\" as an artifact within value-oriented domains, using terminology like \"organizational enablers\" and \"value measurement,\" in a principle-based, adaptive methodology that emphasizes forecasting and iterative tracking across hybrid life cycles, focusing on holistic sustainability without mandatory post-closure mandates; it's flexible, linking benefits to principles like value and stewardship for emergent realization.",
      "PRINCE2 employs \"benefits management approach\" and \"baseline benefits profile,\" in a practice-integrated methodology that requires ongoing justification tied to tolerances and stage reviews, with structured updates in the business case for governance-driven escalations if realization slips; it's prescriptive, mandating handover plans at closure for continued executive oversight.",
      "ISO 21500:2021 uses neutral terms like \"realize benefits\" and \"maintain benefits,\" in a linear, improvement-focused process-group methodology that prioritizes post-project execution without planning details, emphasizing standardization for compliance across scales; it's concise, treating benefits as a closure output rather than an embedded thread.",
      "Methodologically, PMBOK is predictive and domain-holistic for dynamic value capture, PRINCE2 is tolerance-gated and lifecycle-continuous for controlled alignment, and ISO is execution-oriented and post-delivery for basic sustainment."
    ],
    unique: {
      pmbok: "uniquely details \"organizational enablers for benefits realization,\" such as change management strategies and capability-building initiatives (e.g., training matrices tied to maturity models, pages 95-100), providing a proactive, systemic framework for embedding benefits into enterprise processes, which goes beyond PRINCE2's profiles or ISO's maintenance by addressing cultural and structural barriers to long-term adoption.",
      prince2: "alone requires a \"baseline benefits profile\" established at initiation and updated progressively (pages 55-60), with explicit linkage to tolerances for automated viability assessments during stages, offering a unique governance tool that ensures benefits are dynamically justified and protected throughout the project, absent in PMBOK's adaptive plans or ISO's post-focus.",
      iso: "uniquely positions benefits realization within programme and portfolio improvement (10.2, pages 37-38), including aggregated tracking across multiple projects for strategic optimization (Annex B), enabling a hierarchical, enterprise-wide sustainment not as scaled in PMBOK's project domains or PRINCE2's single-project approaches."
    }
  },
  {
    topic: "Tailoring",
    similarities: [
      "The standards converge on evaluating project attributes—such as size, complexity, industry, team maturity, and regulatory environment—to selectively apply or modify processes, outputs, and tools, ensuring the methodology enhances rather than hinders delivery without over-engineering.",
      "Common practices include conducting tailoring assessments via checklists or maturity models (e.g., OPM3 for capability gaps), documenting decisions in a tailoring plan or log for transparency and audits, and iterating adaptations based on lessons from pilots or retrospectives.",
      "They overlap in risk-based scaling—simplifying for low-complexity projects (e.g., omitting formal boards) while enhancing for high-stakes ones (e.g., adding governance layers)—and in stakeholder involvement to align with cultural needs, promoting efficiency, engagement, and fit-for-purpose implementation.",
      "This shared guidance fosters agility by balancing standardization with flexibility, using criteria like governance needs or delivery speed to justify choices, ultimately optimizing resource use, reducing waste, and increasing success rates across diverse scenarios from startups to megaprojects."
    ],
    differences: [
      "PMBOK 7th Edition frames tailoring as a core \"principle\" with terms like \"life cycle selection\" (e.g., predictive, adaptive, hybrid), in a domain-based, holistic methodology that integrates adaptations across principles and domains for emergent customization, emphasizing tools like canvases for visual decision-making; it's inherently flexible, principle-led without mandatory steps.",
      "PRINCE2 terminology includes \"tailor to suit\" as a foundational principle with \"project context factors\" (e.g., scale, capability), in a structured, mandatory methodology applied to all 7 principles, themes, and processes via exception tolerances; it's prescriptive yet scalable, requiring justification in the Project Initiation Documentation.",
      "ISO 21500:2021 uses neutral terms like \"tailoring guidance\" and \"contextual adaptation,\" in a high-level, clause-based methodology that provides generic criteria for process groups without tools or principles; it's standardized and contextual, focusing on organizational fit for international use.",
      "Methodologically, PMBOK is interconnected and life-cycle-centric for dynamic tailoring, PRINCE2 is principle-embedded and environment-assessed for controlled adaptation, and ISO is foundational and compliance-oriented for broad applicability."
    ],
    unique: {
      pmbok: "uniquely offers a \"tailoring canvas\" tool—a visual matrix for mapping project attributes to domain/process adjustments (pages 16-18), including agile-specific hybrids like SAFe for enterprise scaling, providing a practical, decision-support artifact that enables rapid, collaborative customization not found in PRINCE2's assessments or ISO's guidance.",
      prince2: "alone mandates tailoring for \"sustainability and inclusivity\" within the principle (pages 30-35), requiring explicit consideration of ESG and diversity in adaptations (e.g., virtual tools for remote teams), integrating it with people elements for ethical scaling absent in PMBOK's canvases or ISO's general context.",
      iso: "uniquely extends tailoring to programme and portfolio levels (4.4.2, pages 13-15), with guidance for harmonizing processes across hierarchies (Annex B), offering a strategic, multi-project adaptation framework not as vertically integrated in PMBOK's domains or PRINCE2's project principles."
    }
  },
  {
    topic: "Sustainability",
    similarities: [
      "All emphasize incorporating environmental, social, and governance (ESG) considerations into project decisions to minimize negative impacts and maximize positive legacies, with overlapping guidance on conducting lifecycle assessments (e.g., cradle-to-grave carbon tracking) and setting measurable targets aligned with global standards like UN SDGs.",
      "Common practices include supplier evaluations for ethical sourcing, stakeholder consultations for social equity (e.g., diversity in teams), and reporting via ESG dashboards or audits to demonstrate compliance and continuous improvement.",
      "They converge on integrating sustainability with risks (e.g., climate vulnerability analysis), benefits (e.g., green ROI), and governance (e.g., board oversight), using tools like materiality matrices to prioritize issues.",
      "This shared framework promotes a triple bottom line approach—balancing profit, people, and planet—through policy embedding, training, and metrics like energy efficiency or inclusion indices, ensuring projects contribute to resilient, ethical organizations while mitigating reputational or regulatory risks in an increasingly scrutinized world."
    ],
    differences: [
      "PMBOK 7th Edition positions sustainability under the \"stewardship principle\" with terms like \"triple bottom line\" and \"ESG integration,\" in an adaptive, domain-based methodology that weaves it into uncertainty and value for resilient outcomes, emphasizing ethical leadership and tailoring to life cycles; it's principle-driven, holistic without specific targets.",
      "PRINCE2 uses \"sustainability targets\" and \"ESG performance measures,\" in a practice-integrated methodology linked to business justification and people management, requiring stage-based assessments and tolerances for deviations; it's targeted and governance-tied, prescriptive for measurable inclusion.",
      "ISO 21500:2021 employs neutral terminology like \"sustainability context\" and \"ESG factors,\" in a contextual, clause-based methodology that provides high-level guidelines for process embedding, focusing on organizational strategy without metrics; it's standardized and strategic, serving as a global baseline.",
      "Methodologically, PMBOK is ethical and resilience-focused for dynamic stewardship, PRINCE2 is performance-oriented and tolerance-bound for accountable delivery, and ISO is contextual and guideline-driven for broad compliance."
    ],
    unique: {
      pmbok: "uniquely fuses sustainability with \"ESG risk management\" techniques, such as scenario modeling for climate uncertainties (pages 2-4), extending to servant leadership for social equity in teams, offering a proactive, principle-rooted integration that anticipates future regulations not as risk-linked in PRINCE2's targets or ISO's context.",
      prince2: "alone develops a \"sustainability management approach\" as an extension of the business case (pages 22-25), mandating quantifiable targets (e.g., net-zero milestones) reviewed at stage boundaries with escalation for non-compliance, providing a unique operational accountability absent in PMBOK's principles or ISO's guidelines.",
      iso: "uniquely scales sustainability to portfolio governance (Annex C, pages 52-55), with processes for aggregating ESG impacts across projects (e.g., shared resource audits), enabling strategic, enterprise-level optimization not detailed in PMBOK's domains or PRINCE2's project targets."
    }
  },
  {
    topic: "Lessons Learned Management",
    similarities: [
      "All three standards highlight the systematic capture, documentation, and dissemination of lessons learned throughout the project life cycle, not just at the end, to improve future projects and organizational maturity.",
      "Common practices include maintaining a repository (e.g., logs or databases) for recording insights from successes, failures, and risks; conducting regular reviews or retrospectives at key milestones; and sharing these with stakeholders via reports or databases to foster continuous improvement.",
      "This overlapping guidance emphasizes proactive knowledge management, such as identifying what went well, what could be improved, and actionable recommendations, often tied to root cause analysis techniques like fishbone diagrams or after-action reviews.",
      "In detail, they all advocate for integrating lessons into updates of plans, processes, and organizational assets, ensuring that knowledge is not lost and contributes to efficiency gains, risk reduction, and better decision-making in subsequent phases or projects."
    ],
    differences: [
      "PMBOK 7th Edition approaches lessons learned through a principle-based, adaptive methodology, using terms like \"retrospectives\" (especially in agile contexts) and \"knowledge artifacts\" integrated into performance domains, focusing on real-time application via iterative cycles rather than formal logs; it's outcome-oriented, linking lessons to value delivery metrics and tailoring them to hybrid life cycles.",
      "PRINCE2 employs a more structured, process-driven methodology with specific management products like the \"Lessons Log\" (updated progressively) and \"Lessons Report\" (formalized at stage ends), using terminology such as \"lessons from experience\" tied to tolerances and exceptions; it's prescriptive, requiring mandatory reviews at stage boundaries with escalation if lessons impact business justification.",
      "ISO 21500:2021 uses a neutral, process-group methodology with terms like \"Collect Lessons Learned\" as a distinct process, emphasizing international standardization without specific tools, and integrates it linearly into controlling and closing groups; it's less detailed on application, focusing on high-level guidance for documentation and transfer to organizational knowledge bases.",
      "Methodologically, PMBOK is flexible and domain-integrated for dynamic environments, PRINCE2 is governance-heavy with staged formality, and ISO is concise and compliance-focused, often serving as a baseline for customization."
    ],
    unique: {
      pmbok: "uniquely incorporates lessons learned into adaptive models with \"knowledge-sharing platforms\" like wikis or AI-driven repositories for real-time collaboration (pages 22-25), emphasizing psychological safety in retrospectives to encourage candid feedback, which is not explicitly addressed in the others.",
      prince2: "alone mandates the use of lessons in the \"Project Initiation Documentation\" (PID) updates and requires a formal \"End Project Report\" that includes lessons for post-project handover (Closing Process, pages 225-230), providing a unique accountability mechanism through the Project Board's approval, absent in PMBOK's fluid domains or ISO's generic processes.",
      iso: "uniquely extends lessons learned to programme and portfolio levels (Clause 10.3, pages 38-40), including processes for aggregating insights across multiple projects into organizational standards, offering a strategic, hierarchical perspective not as detailed in PMBOK's project-centric view or PRINCE2's tactical stage focus."
    }
  },
  {
    topic: "Project Closure",
    similarities: [
      "The standards share guidance on formally ending projects or phases by verifying deliverables against acceptance criteria, obtaining stakeholder approvals, releasing resources, and archiving documentation to ensure all obligations are met and value is realized.",
      "Common practices include conducting final reviews (e.g., audits or inspections), handing over products to operations, updating organizational process assets with lessons learned, and celebrating achievements to maintain team morale.",
      "This overlapping emphasis ensures administrative closure (e.g., contract terminations) and technical closure (e.g., performance evaluations) are both addressed, with tools like checklists and sign-off forms to confirm no loose ends.",
      "In detail, all promote assessing benefits realization at closure, resolving outstanding issues, and obtaining formal acceptance to prevent disputes, fostering a structured transition that minimizes risks like scope creep in final stages and supports knowledge transfer for future endeavors."
    ],
    differences: [
      "PMBOK 7th Edition uses a domain-based, adaptive methodology with terms like \"final report\" and \"transition planning,\" integrating closure into iterative deliveries (e.g., in agile, via sprint reviews leading to project end); it focuses on outcomes like sustained value post-closure, with flexibility for premature terminations.",
      "PRINCE2 employs a process-oriented methodology with specific activities like \"Prepare Planned Closure\" and \"Hand Over Products,\" using terminology such as \"End Project Report\" and \"Post-Project Benefits Review Plan\"; it's highly prescriptive, requiring Project Board authorization and linking closure to business case viability through exception assessments.",
      "ISO 21500:2021 follows a straightforward process-group methodology with neutral terms like \"Close Project Phase or Project,\" emphasizing verification and release without detailed reports; it's less prescriptive, serving as a generic framework that can be scaled, with closure integrated into overall governance but without mandatory reviews.",
      "Methodologically, PMBOK is holistic and life-cycle adaptive, PRINCE2 is governance-gated with formal handovers, and ISO is minimalistic and internationally aligned, often used as a reference rather than a full method."
    ],
    unique: {
      pmbok: "uniquely addresses \"sustainable closure\" by incorporating environmental and social impact assessments in final transitions (pages 115-120), such as ensuring deliverables align with long-term stewardship goals, which is not a focus in the others' tactical closures.",
      prince2: "alone requires a \"Follow-On Action Recommendations\" section in the End Project Report (pages 225-230), detailing post-closure actions like benefits reviews scheduled months later, providing a unique forward-looking governance not emphasized in PMBOK's immediate outcomes or ISO's basic verification.",
      iso: "uniquely includes closure at the phase level with explicit links to portfolio handover (Clause 8.1.8 and Annex B), allowing for aggregated closures in multi-project environments, offering a broader strategic integration absent in PMBOK's project-specific domains or PRINCE2's single-project processes."
    }
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('pmbok');
  const [selectedTopic, setSelectedTopic] = useState(0);
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

  const toggleBookmark = (id) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
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

  const handleUniqueClick = (standardKey, uniqueText) => {
    console.log('Unique point clicked:', standardKey);
    navigateToSection(standardKey);
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

  const HomePage = () => (
    <div className="space-y-8">
      <div className={`text-center py-12 bg-gradient-to-r ${theme.gradient} text-white rounded-lg shadow-xl`}>
        <h1 className="text-5xl font-bold mb-4">PM Standards Hub</h1>
        <p className="text-xl mb-6">Compare PMBOK, PRINCE2, and ISO 21500/21502</p>
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
        <div className={`${cardBg} p-6 rounded-lg shadow-lg border-t-4 border-green-500 transform hover:scale-105 transition-transform`}>
          <BarChart3 className="w-12 h-12 text-green-500 mb-4" />
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>Insights Dashboard</h3>
          <p className={secondaryText}>Visual analytics and coverage matrix.</p>
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
            <span className={`font-semibold ${textColor}`}>4.0 Insights Dashboard</span>
          </div>
          <div className={`ml-8 space-y-2 ${secondaryText}`}>
            <div>4.1 Analytics Engine</div>
            <div>4.2 Visualization Components</div>
            <div>4.3 Summary Reports</div>
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
                  <div key={result.id} className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-sm font-semibold ${theme.text}`}>{result.standardName}</span>
                        <h4 className={`font-semibold ${textColor}`}>{result.title}</h4>
                        <p className={`text-sm ${secondaryText}`}>{result.content.substring(0, 100)}...</p>
                      </div>
                      <button
                        onClick={() => toggleBookmark(result.id)}
                        className={bookmarks.includes(result.id) ? 'text-yellow-500' : 'text-gray-400'}
                      >
                        <Bookmark className="w-5 h-5" fill={bookmarks.includes(result.id) ? 'currentColor' : 'none'} />
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
                      onClick={() => toggleBookmark(section.id)}
                      className={bookmarks.includes(section.id) ? 'text-yellow-500' : 'text-gray-400'}
                    >
                      <Bookmark className="w-5 h-5" fill={bookmarks.includes(section.id) ? 'currentColor' : 'none'} />
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
    const similarities = [
      {
        number: 1,
        title: "Core Definition of Project Management and Project Lifecycle",
        content: "All three standards define project management as the application of knowledge, skills, tools, and techniques to meet project requirements, emphasizing a temporary endeavor to create unique products, services, or results. They outline a lifecycle with universal phases: initiation (defining objectives), planning (detailing execution), execution/implementation (delivering work), monitoring/controlling (tracking progress), and closing (finalizing outcomes). This structure ensures alignment on how projects evolve from concept to delivery, with emphasis on iterative reviews and adaptability. ISO 21500 explicitly harmonizes with PMBOK's process-based lifecycle, while PRINCE2's stages map to these phases for controlled progression. Sections Referenced: PMBOK 7th Edition: Standard Part Section 1.2 (Key Terms & Concepts), page ≈ 4; Guide Part Section 2.3 / 2.3.5 (Development Approach & Life Cycle), pages ≈ 32–46 PRINCE2 7th Edition: Chapter 1 (Introduction), pages ≈ 1–18; Process chapters begin ~Chapter 12 (page ~216), with lifecycle mapping in process chapters (e.g. Chapter 16 begins ~page 249) ISO 21500:2012: Clause 3 (Project management concepts, including life cycle), pages 2–8; Clause 4.3 (Processes), page ≈ 13"
      },
      {
        number: 2,
        title: "Principles and Value-Driven Guidance",
        content: "Each standard adopts a principles-based foundation to guide ethical, effective decision-making. PMBOK 7th Edition introduces 12 principles (e.g., stewardship, value, systems thinking), which overlap with PRINCE2's 7 principles (e.g., continued business justification, learn from experience) and ISO 21500's implied principles (e.g., management by processes, stakeholder focus). These promote value delivery, risk awareness, and holistic thinking, with overlaps in emphasizing sustainability, inclusivity, and optimization. For instance, all stress aligning projects with organizational strategy and adapting to change, fostering a shift from rigid processes to outcome-oriented practices. This alignment supports integration, as PRINCE2's principles can underpin PMBOK's domains in ISO-compliant environments. Sections Referenced: PMBOK 7th Edition: The Standard — Section 3 (Project Management Principles, Sections 3.1–3.12), pages ~21–58 PRINCE2 7th Edition: Chapter 2 (The 7 PRINCE2 Principles), pages ≈ 19–30 ISO 21500:2012: Clause 3 (Project management concepts, pages 2–8); (ISO 21502:2020 supplements with governance/benefits/principles in its Clause 4 / Clauses in part 4.x)"
      },
      {
        number: 3,
        title: "Process Groups and Key Project Processes",
        content: "A major overlap is the five universal process groups (Initiating, Planning, Executing/Implementing, Monitoring & Controlling, Closing), which form the backbone of project execution. ISO 21500's 39 processes directly mirror PMBOK's (from earlier editions, retained conceptually in 7th), with identical groupings for scope, time, cost, quality, resources, risk, procurement, communication, and stakeholders. PRINCE2's 7 processes (e.g., Starting Up a Project, Managing Product Delivery) map to these groups, providing detailed \"how-to\" steps that complement PMBOK/ISO's \"what-to-do\" guidance. Common practices include defining baselines, managing changes, and ensuring deliverables meet requirements, enabling seamless process tailoring across standards. Sections Referenced: PMBOK 7th Edition: Guide Part — Tailoring is covered in the Guide’s Tailoring section (pages ≈ 133–151); Appendices X1–X5 are located ~pages 197–232 PRINCE2 7th Edition: Chapter 12 onwards (Processes) starting ~page 216; Chapter 16 (Controlling a Stage) ~page 249; mapping of processes to lifecycle phases within those process chapters ISO 21500:2012: Clause 4.3 through Clause 4.5 (Processes by group), pages ~13–28; Annex A (process-to-subject mapping), pages ~31–40"
      },
      {
        number: 4,
        title: "Knowledge Areas/Subjects and Domains",
        content: "All three categorize project elements into overlapping domains: Integration, Scope, Schedule/Time, Cost, Quality, Resources (human/material), Communications, Risk, Procurement, and Stakeholders. PMBOK's 8 Performance Domains (e.g., Team, Stakeholders, Delivery) align with PRINCE2's 7 Practice Themes (e.g., Business Case, Quality, Risk) and ISO's 10 Subject Groups. Shared guidance includes integrated planning (e.g., scope-creep prevention), resource allocation (balancing human and material needs), and performance measurement (using metrics like earned value.) This overlap facilitates cross-standard application, such as using PRINCE2's theme-based controls within PMBOK domains for ISO audits. Sections Referenced: PMBOK 7th Edition: Guide Part — Project Performance Domains sections (Stakeholders, Team, Development approach, Planning, Project work, Delivery, Measurement, Uncertainty) with approximate domain start pages ~8, 16, 32, 51, 69, 80, 93, 116 PRINCE2 7th Edition: Practice Themes chapters ~7 through ~13 (e.g. Plans, Quality, Risk, Change) — in the PDF these run roughly pages 95–240 ISO 21500:2012: Annex A (Subject group overviews & mapping), pages ~31–40"
      },
      {
        number: 5,
        title: "Stakeholder Management and Engagement",
        content: "A key modern overlap is proactive stakeholder identification, analysis, and engagement to ensure buy-in and mitigate conflicts. All standards advocate mapping stakeholders by influence/interest, developing communication plans, and monitoring engagement levels. PMBOK and ISO treat this as a dedicated domain/subject, while PRINCE2 integrates it via the Organization theme. Common tools include registers, matrices, and feedback loops, promoting inclusivity and value co-creation—especially relevant in ISO 21502's portfolio context. Sections Referenced: PMBOK 7th Edition: Guide Part — Stakeholders domain (Guide 2.1), starting ~page 8 PRINCE2 7th Edition: Organization / People / Stakeholder aspects appear in early chapters (e.g. Chapter 3 / 4), in the Organization theme chapters ~ pages 31–60 ISO 21500:2012: Annex A & Clause 4.3 subject group mapping of stakeholders, pages ~31–32; (ISO 21502:2020: Clause 5.x / stakeholder alignment sections in programme / portfolio guidance)"
      },
      {
        number: 6,
        title: "Risk Management Practices",
        content: "Unified approach to risk identification, assessment (qualitative/quantitative), response planning (avoid, mitigate, transfer, accept), and monitoring. All emphasize proactive risk registers, probability-impact matrices, and contingency planning, with integration into overall project controls. PRINCE2's Risk theme aligns with PMBOK's domain and ISO's subject, stressing opportunity capture alongside threats for balanced decision-making. Sections Referenced: PMBOK 7th Edition: Guide Part — Uncertainty domain (Guide 2.8), starting ~page 116 PRINCE2 7th Edition: Chapter for Risk theme (approx. Chapter 11 in the PDF), pages ~185–205 ISO 21500:2012: Annex A / Clause 4 process-to-subject mapping shows risk subject group, pages ~36–37"
      },
      {
        number: 7,
        title: "Quality and Delivery Assurance",
        content: "Focus on defining quality standards, assurance (prevention-focused), and control (inspection-focused) to deliver fit-for-purpose outcomes. Overlaps include planning quality metrics, audits, and continuous improvement, with PRINCE2's product-based focus complementing PMBOK/ISO's process-oriented methods. Sections Referenced: PMBOK 7th Edition: Guide Part — Measurement / Delivery domains (Guide 2.7, 2.6), starting ~page 93 (Measurement), ~page 80 (Delivery) PRINCE2 7th Edition: Quality theme chapter (approx. Chapter 9 in the PDF), pages ~135–155 ISO 21500:2012: Annex A / clause subject group mapping for quality subject, pages ~35–36"
      },
      {
        number: 8,
        title: "Governance, Business Justification, and Integration",
        content: "Emphasis on governance structures (roles like project board/sponsor), ongoing business case validation, and benefits realization. ISO 21502 extends this to programmes/portfolios, aligning with PRINCE2's stage-gate reviews and PMBOK's stewardship principle. All promote tailoring to context (e.g., agile hybrids) and ethical leadership. Sections Referenced: PMBOK 7th Edition: Standard Part: governance and tailoring are discussed in introductory / governance sections (front matter); Guide Part: leadership /"
      }
    ];

    const differencesTable = [
      { number: 1, category: "Overall Structure", pmbok: "Principle + Domain model (holistic)", prince2: "Process + Theme + Principle (methodical)", iso: "Process + Subject Group (guidance-only)" },
      { number: 2, category: "Terminology", pmbok: "\"Performance Domains\"", prince2: "\"Management Products\" (e.g., PID)", iso: "\"Subject Groups\" (neutral terms)" },
      { number: 3, category: "Methodology Focus", pmbok: "Knowledge-based (flexible toolkit)", prince2: "Prescriptive methodology (step-by-step)", iso: "High-level guidance (non-prescriptive)" },
      { number: 4, category: "Principles vs. Areas", pmbok: "12 Principles + 8 Domains", prince2: "7 Principles + 7 Themes", iso: "Implied principles + 10 Subjects" },
      { number: 5, category: "Governance & Roles", pmbok: "Servant leadership, flexible roles", prince2: "Defined hierarchy (Project Board)", iso: "Organizational context, no fixed roles" },
      { number: 6, category: "Lifecycle & Phasing", pmbok: "Adaptive, predictive, hybrid lifecycles", prince2: "Stage-based (mandatory tolerances)", iso: "Generic phases, no fixed model" },
      { number: 7, category: "Tailoring & Flexibility", pmbok: "Universal tailoring guide", prince2: "Context-specific tailoring (e.g., agile)", iso: "Scalable to org size, minimal tailoring" },
      { number: 8, category: "Agile/Hybrid Emphasis", pmbok: "Integrated hybrid models", prince2: "Agile extension (PRINCE2 Agile®)", iso: "Limited agile mentions, process-focused" },
      { number: 9, category: "Certification Path", pmbok: "PMP exam on domains/principles", prince2: "Practitioner exam on processes/themes", iso: "No certification; audit/compliance tool" },
      { number: 10, category: "Scope (Project/Programme)", pmbok: "Project-focused, light programme touch", prince2: "Project/programme via stages", iso: "Balanced project/programme/portfolio" },
      { number: 11, category: "Tools & Techniques Depth", pmbok: "Extensive appendices (e.g., EVM formulas)", prince2: "Integrated techniques (e.g., MoSCoW)", iso: "Basic overviews, no deep formulas" },
      { number: 12, category: "Measurement & Metrics", pmbok: "Outcome-focused KPIs (value delivery)", prince2: "Exception-based tolerances", iso: "Process maturity metrics (ISO-aligned)" }
    ];

    const detailedDifferences = [
      {
        number: 1,
        title: "Overall Structure and Philosophy",
        content: "PMBOK shifts from process-heavy (pre-7th) to a principles-domains model for holistic, value-centric thinking, emphasizing adaptability over rigidity. PRINCE2 is rigidly structured around a methodology triangle (principles, themes, processes) for controlled environments, ideal for public sector. ISO 21500/20502 is a lean, international standard with a linear process-subject framework, focusing on harmonization rather than deep philosophy—more \"what\" than \"how.\" This leads to PMBOK feeling expansive (370+ pages), PRINCE2 operational (500+ pages with templates), and ISO concise (50 pages). Sections Referenced: PMBOK 7th: Section 1.1 (Structure Overview, pp. 1–3); Chapter 2 (Philosophy Shift, pp. 11–48). PRINCE2 7th: Chapter 2 (Integrated Framework, pp. 15–35); Appendix C (Structure Diagrams, pp. 400–420). ISO 21500:2021: Section 1 (Scope and Structure, pp. 1–2); ISO 20502:2022 Section 1 (Framework, pp. 1–3)."
      },
      {
        number: 2,
        title: "Unique Terminologies",
        content: "PMBOK uses \"performance domains\" (e.g., \"Uncertainty\" for risk) and \"tailoring considerations\" for customization. PRINCE2 introduces \"management products\" (e.g., Project Initiation Documentation—PID) and \"tolerances\" (time/cost buffers). ISO employs neutral \"subject groups\" (e.g., \"Integration\") and \"enablers\" for processes, avoiding jargon for global accessibility. These can confuse hybrids—e.g., PMBOK's \"work package\" vs. PRINCE2's \"work package\" (similar but PID-tied). Sections Referenced: PMBOK 7th: Glossary (pp. 369–390); Section 1.2.4 (Terminology, pp. 5–7). PRINCE2 7th: Glossary (pp. 500–520); Chapter 5 (Key Terms, pp. 65–75). ISO 21500:2021: Annex A (Terms and Definitions, pp. 20–25); ISO 20502:2022 Annex B (Terminology, pp. 30–35)."
      },
      {
        number: 3,
        title: "Methodology Focus",
        content: "PMBOK is a \"body of knowledge\" (descriptive, toolkit-oriented) for broad application, encouraging user interpretation. PRINCE2 is a full methodology (prescriptive, with mandatory elements like stage boundaries) for repeatable success. ISO is purely guidance (non-mandatory, audit-friendly), lacking PRINCE2's \"how-to\" steps but aligning with standards like ISO 9001. Result: PMBOK suits innovators; PRINCE2, regulators; ISO, certifiers. Sections Referenced: PMBOK 7th: Foreword (Methodology Evolution, pp. vii–x); Section 1.3 (Application, pp. 9–10). PRINCE2 7th: Chapter 1 (Methodology Overview, pp. 5–15); Section 6.1 (Prescriptive Elements, pp. 75–80). ISO 21500:2021: Foreword (Guidance Nature, pp. i–ii); Section 2 (Normative References, p. 3)."
      },
      {
        number: 4,
        title: "Principles vs. Knowledge Areas/Subjects",
        content: "PMBOK's 12 principles (e.g., \"Holistic Thinking\") are aspirational, guiding domains without rigid application. PRINCE2's 7 principles (e.g., \"Manage by Exception\") are foundational and must be justified if deviated. ISO implies principles (e.g., \"Process Approach\") via 10 subjects but lacks explicit lists, focusing on maturity levels. Divergence: PMBOK is mindset-driven; PRINCE2 rule-bound; ISO procedural. Sections Referenced: PMBOK 7th: Chapter 2 (Principles, pp. 11–48); Chapter 3 (Domains, pp. 51–197). PRINCE2 7th: Chapter 3 (Principles, pp. 35–65); Chapters 7–13 (Themes, pp. 95–240). ISO 21500:2021: Section 3 (Concepts, pp. 3–5); Section 5 (Subjects, pp. 10–20)."
      },
      {
        number: 5,
        title: "Governance and Roles",
        content: "PMBOK promotes flexible, servant-leader roles (e.g., project manager as facilitator) with minimal hierarchy. PRINCE2 mandates a three-tier structure (Project Board, Manager, Team) with defined accountability via tolerances. ISO emphasizes organizational governance without specifying roles, focusing on alignment to strategy. This makes PRINCE2 hierarchical (UK govt influence), PMBOK collaborative, and ISO contextual. Sections Referenced: PMBOK 7th: Section 3.1 (Leadership Domain, pp. 59–70); Section 3.4 (Team, pp. 111–128). PRINCE2 7th: Chapter 8 (Organization Theme, pp. 115–135); Appendix D (Role Descriptions, pp. 421–450). ISO 21500:2021: Section 4.2 (Governance, pp. 6–7); ISO 20502:2022 Section 6 (Roles in Programmes, pp. 20–25)."
      },
      {
        number: 6,
        title: "Lifecycle and Phasing",
        content: "Detailed analysis for this category highlights the distinct lifecycle approaches as outlined in the table above, with PMBOK offering flexible lifecycles, PRINCE2 enforcing stage-based controls, and ISO providing generic guidance."
      },
      {
        number: 7,
        title: "Tailoring & Flexibility",
        content: "Detailed analysis for this category highlights the distinct tailoring approaches as outlined in the table above, with PMBOK providing universal guidance, PRINCE2 context-specific adaptations, and ISO scalable minimal tailoring."
      },
      {
        number: 8,
        title: "Agile/Hybrid Emphasis",
        content: "Detailed analysis for this category highlights the distinct agile emphases as outlined in the table above, with PMBOK integrating hybrids, PRINCE2 offering extensions, and ISO limited to process focus."
      },
      {
        number: 9,
        title: "Certification Path",
        content: "Detailed analysis for this category highlights the distinct certification paths as outlined in the table above, with PMBOK and PRINCE2 having exams, and ISO focused on compliance."
      },
      {
        number: 10,
        title: "Scope (Project/Programme)",
        content: "Detailed analysis for this category highlights the distinct scope coverages as outlined in the table above, with varying emphases on project, programme, and portfolio levels."
      },
      {
        number: 11,
        title: "Tools & Techniques Depth",
        content: "Detailed analysis for this category highlights the distinct depths of tools as outlined in the table above, with PMBOK extensive, PRINCE2 integrated, and ISO basic."
      },
      {
        number: 12,
        title: "Measurement & Metrics",
        content: "Detailed analysis for this category highlights the distinct metrics approaches as outlined in the table above, with PMBOK outcome-focused, PRINCE2 exception-based, and ISO process maturity."
      }
    ];

    const uniquePMBOK = [
      {
        number: 1,
        title: "Principles-based standard with 12 principles (not a pure process list)",
        explanation: "PMBOK-7 presents the practice as a set of 12 guiding principles (behavioral/governance rules) rather than the traditional detailed process-inputs-tools/techniques-outputs (ITTO) structure. This reframes project management toward guiding principles that apply across delivery approaches.",
        pg: "50",
        section: "PROJECT MANAGEMENT PRINCIPLES (3.1–3.12)"
      },
      {
        number: 2,
        title: "Project Performance Domains (eight domains replacing Knowledge Areas)",
        explanation: "Instead of the older Knowledge Areas, PMBOK-7 defines 8 project performance domains (e.g., Stakeholders, Team, Delivery, Planning, etc.) that represent interrelated capabilities for achieving outcomes promoting systems thinking.",
        pg: "91",
        section: "PROJECT PERFORMANCE DOMAINS (2.1–2.8)"
      },
      {
        number: 3,
        title: "System for Value Delivery / Systems view of projects",
        explanation: "PMBOK-7 explicitly frames projects within a value delivery system and emphasizes outcomes/value (not only outputs), with links between portfolio → program → project and organizational strategy. This systems perspective is central to the edition.",
        pg: "38",
        section: "A SYSTEM FOR VALUE DELIVERY ( 2.1–2.5)"
      },
      {
        number: 4,
        title: "Dedicated Tailoring section + emphasis on tailoring approach across contexts",
        explanation: "PMBOK-7 contains a standalone Tailoring section explaining how to adapt methods, tools, and artifacts to project context (size, risk, domain). Tailoring is treated as core guidance rather than an add-on.",
        pg: "195",
        section: " TAILORING (3.1–3.7)"
      },
      {
        number: 5,
        title: "Models, Methods, and Artifacts (MMA) catalogue",
        explanation: "The Guide includes a new high-level catalogue of models, methods, and artifacts that teams can choose from (linking each to performance domains) — i.e., a toolkit approach rather than prescriptive ITTO lists.",
        pg: "213",
        section: "MODELS, METHODS AND ARTIFACTS (4.1–4.7)"
      },
      {
        number: 6,
        title: "PMIstandards+™ digital integration (platform link to dynamic content)",
        explanation: "PMBOK-7 integrates with PMIstandards+, a digital platform for up-to-date “how-to” guidance and supplements; the printed guide points readers to this evolving online content. This product/platform linkage is a structural uniqueness.",
        pg: "90",
        section: "PMBOK® GUIDE → 1.4 Relationship to PMIstandards+"
      },
      {
        number: 7,
        title: "Explicit cross-approach coverage (predictive, adaptive, hybrid) as first-class content",
        explanation: "PMBOK-7 explicitly treats all delivery approaches (predictive/traditional, adaptive/agile, hybrid) as part of the standard and embeds guidance/considerations for each across sections. Earlier editions treated agile mainly as examples.",
        pg: "11",
        section: "1.2 The Standard for Project Management + 2.1 Creating Value"
      },
      {
        number: 8,
        title: "Outcomes-focused performance measures (outcome vs. output distinction)",
        explanation: "Strong emphasis on measuring outcomes and value rather than simply tracking production of deliverables — performance domains are evaluated through outcomes-focused measures.",
        pg: "129",
        section: "Measurement Performance Domain (2.7.1–2.7.8)"
      },
      {
        number: 9,
        title: "Separation between ANSI/ISO-type “Standard for Project Management” and the Guide",
        explanation: "This edition clearly distinguishes the formal Standard for Project Management from the PMBOK Guide text, making the standard portion explicit (normative guidance) while the Guide remains explanatory — first edition to make that separation prominent.",
        pg: "35",
        section: "Front Matter + 1.2 The Standard for Project Management and 1.1 Structure of the PMBOK® Guide"
      },
      {
        number: 10,
        title: "Systems thinking and interdependence language embedded throughout",
        explanation: "PMBOK-7 weaves systems thinking language through its structure — calling attention to interdependencies between performance domains and to change propagation across the value system (not present to same depth in PRINCE2/ISO).",
        pg: "11",
        section: "A SYSTEM FOR VALUE DELIVERY & 3.5 Recognize, Evaluate and Respond to System Interactions"
      }
    ];

    const uniquePRINCE2 = [
      "Process + Theme + Principle (methodical)",
      "\"Management Products\" (e.g., PID)",
      "Prescriptive methodology (step-by-step)",
      "7 Principles + 7 Themes",
      "Defined hierarchy (Project Board)",
      "Stage-based (mandatory tolerances)",
      "Context-specific tailoring (e.g., agile)",
      "Agile extension (PRINCE2 Agile®)",
      "Practitioner exam on processes/themes",
      "Project/programme via stages",
      "Integrated techniques (e.g., MoSCoW)",
      "Exception-based tolerances"
    ];

    const uniqueISO = [
      "Process + Subject Group (guidance-only)",
      "\"Subject Groups\" (neutral terms)",
      "High-level guidance (non-prescriptive)",
      "Implied principles + 10 Subjects",
      "Organizational context, no fixed roles",
      "Generic phases, no fixed model",
      "Scalable to org size, minimal tailoring",
      "Limited agile mentions, process-focused",
      "No certification; audit/compliance tool",
      "Balanced project/programme/portfolio",
      "Basic overviews, no deep formulas",
      "Process maturity metrics (ISO-aligned)"
    ];

    const stats = {
      totalTopics: 12,
      similarities: similarities.length,
      differences: detailedDifferences.length,
      uniquePoints: uniquePMBOK.length + uniquePRINCE2.length + uniqueISO.length,
      bookmarked: bookmarks.length
    };

    const [activeCategory, setActiveCategory] = useState('similarities');

    return (
      <div className="space-y-6">
        <div className={`${cardBg} p-6 rounded-lg shadow-lg`}>
          <h2 className={`text-3xl font-bold mb-2 ${textColor}`}>Insights Dashboard</h2>
          <p className={secondaryText}>Comparative analysis of PMBOK 7, PRINCE2, and ISO 21500/21502</p>

          <div className="grid md:grid-cols-3 gap-4 my-8">
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
              <div className={`text-lg font-semibold ${textColor}`}>Differences</div>
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
                      <th className={`px-4 py-2 border ${textColor}`}>ISO 21500/20502 Unique Aspect</th>
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

          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'home' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('library')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'library' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Library</span>
              </button>
              <button
                onClick={() => setCurrentPage('compare')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'compare' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
              >
                <GitCompare className="w-5 h-5" />
                <span className="hidden sm:inline">Compare</span>
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'dashboard' ? `${theme.primaryBtn} text-white shadow-lg` : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
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
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
    </div>
  );
};

export default App;