// ============================================================================
// SLRJ Learn — Events & Challenges Central Data Store
// Comprehensive structured catalog covering Coding Challenges, Hackathons,
// Workshops, Webinars, Design Sprints, AI & Cybersecurity Labs, and Community.
// ============================================================================

export type EventCategory =
  | "Coding Challenges"
  | "Hackathons"
  | "Workshops"
  | "Webinars"
  | "Design Challenges"
  | "AI & Data Challenges"
  | "Cybersecurity Labs"
  | "Community Events";

export type EventFormat = "Online" | "In-Person" | "Hybrid";

export type EventDifficulty = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type EventStatus =
  | "Draft"
  | "Published"
  | "Registration Open"
  | "Registration Closed"
  | "Upcoming"
  | "Ongoing"
  | "Submission Closed"
  | "Under Review"
  | "Completed"
  | "Cancelled";

export interface EventAgendaSession {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerRole?: string;
  speakerAvatar?: string;
  startsAt: string; // ISO timestamp
  endsAt: string; // ISO timestamp
  joinUrl?: string;
}

export interface EventChallengePhase {
  id: string;
  phaseName: string;
  startsAt: string;
  endsAt: string;
  description: string;
}

export interface EventRule {
  id: string;
  title: string;
  description: string;
  type: "eligibility" | "tools" | "teams" | "submission" | "originality" | "disqualification";
}

export interface EventEvaluationCriterion {
  id: string;
  name: string;
  weight: number; // percentage
  description: string;
}

export interface EventReward {
  type: "certificate" | "xp" | "badge" | "swag" | "cloud_grant" | "mentorship";
  title: string;
  description: string;
  icon?: string;
}

export interface EventCodingChallenge {
  id: string;
  title: string;
  problemStatement: string;
  learningObjectives: string[];
  supportedLanguages: ("javascript" | "python" | "html")[];
  starterTemplateId: "web" | "python" | "react";
  starterCode?: string;
  sampleTestCases: {
    id: number;
    input: string;
    expected: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints: string[];
  submissionDeadline: string;
  maxScore: number;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  category: EventCategory;
  difficulty: EventDifficulty;
  format: EventFormat;
  status: EventStatus;
  isFeatured?: boolean;

  // Timing
  startAt: string;
  endAt: string;
  registrationOpensAt: string;
  registrationClosesAt: string;
  timezone: string;

  // Access & Venue
  venue?: string;
  meetingUrl?: string;
  organizer: {
    name: string;
    role: string;
    avatar: string;
    company: string;
  };

  // Capacity & Team settings
  capacity: number; // 0 for unlimited
  registeredCount: number;
  allowsTeams: boolean;
  minTeamSize?: number;
  maxTeamSize?: number;

  // Rules & Criteria
  rules: EventRule[];
  evaluationCriteria?: EventEvaluationCriterion[];
  rewards: EventReward[];
  certificateEligible: boolean;
  certificateTitle?: string;

  // Schedule breakdown
  agenda?: EventAgendaSession[];
  phases?: EventChallengePhase[];

  // Optional Integrated Code Challenge for playground evaluation
  codingChallenge?: EventCodingChallenge;

  // Cross-Ecosystem Linking
  relatedRoadmapIds: string[];
  relatedRoadmapStageIds?: number[];
  relatedCourseIds: string[];
  relatedProjectIds: string[];
  communityChannelUrl?: string;

  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ────────────────────────────────────────────────────────────────────────────
// MASTER EVENTS CATALOG (12 Realistic, High-Value Events)
// ────────────────────────────────────────────────────────────────────────────

export const EVENTS_CATALOG: EventItem[] = [
  {
    id: "evt-hackathon-saas-2026",
    slug: "build-something-amazing-fullstack-saas-hackathon",
    title: "Build Something Amazing: Full-Stack SaaS Hackathon",
    shortDescription:
      "A 48-hour global builder hackathon to design, build, and deploy a production-ready SaaS application with authentication, database, and real-time features.",
    fullDescription: `The **Build Something Amazing Hackathon** challenges developers and designers to build a complete, impactful SaaS product from scratch. 
    
Whether working solo or collaborating in cross-functional teams of up to 4 members, participants will architect a full-stack solution featuring user authentication, transactional data persistence, interactive frontend interfaces, and automated CI/CD deployment.

Mentors from industry leaders will be available for office hours during the event, and all submissions will be evaluated by an expert judging panel on technical execution, code quality, design usability, and real-world utility.`,
    coverImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    category: "Hackathons",
    difficulty: "Intermediate",
    format: "Hybrid",
    status: "Registration Open",
    isFeatured: true,

    startAt: "2026-10-24T09:00:00.000Z",
    endAt: "2026-10-26T18:00:00.000Z",
    registrationOpensAt: "2026-10-01T00:00:00.000Z",
    registrationClosesAt: "2026-10-23T23:59:00.000Z",
    timezone: "IST (UTC+05:30)",

    venue: "SLRJ Tech Hub Bangalore & Online via Discord",
    meetingUrl: "https://meet.slrjlearn.in/hackathon-saas-2026",
    organizer: {
      name: "Dr. Arvind Ramesh",
      role: "Lead Systems Architect & Director of Innovation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Innovation Labs",
    },

    capacity: 250,
    registeredCount: 168,
    allowsTeams: true,
    minTeamSize: 1,
    maxTeamSize: 4,

    rules: [
      {
        id: "r1",
        title: "Original Codebase",
        description: "All code must be authored during the 48-hour hackathon period. Open-source libraries and standard UI component libraries are welcomed.",
        type: "originality",
      },
      {
        id: "r2",
        title: "Team Sizes",
        description: "Teams may consist of 1 to 4 verified learners. One member will act as team lead and submit the official repository.",
        type: "teams",
      },
      {
        id: "r3",
        title: "Deliverables",
        description: "A public GitHub repository with comprehensive README, architectural diagram, and a working live demo URL are mandatory.",
        type: "submission",
      },
      {
        id: "r4",
        title: "Ethical Standards",
        description: "Zero tolerance for plagiarism, offensive content, or unauthorized API scrapers.",
        type: "disqualification",
      },
    ],

    evaluationCriteria: [
      { id: "c1", name: "Technical Execution & Architecture", weight: 35, description: "Clean code structure, database normalization, and robust error handling." },
      { id: "c2", name: "Design & UX Polish", weight: 25, description: "Responsive layouts, accessible components, and intuitive user workflows." },
      { id: "c3", name: "Problem Utility & Impact", weight: 25, description: "Does the SaaS address a genuine pain point for businesses or consumers?" },
      { id: "c4", name: "Documentation & Presentation", weight: 15, description: "Clear README documentation, setup steps, and 3-minute video/demo." },
    ],

    rewards: [
      { type: "certificate", title: "Official Finalist Certificate", description: "Verifiable SLRJ Learn credential with unique verification ID and score.", icon: "Award" },
      { type: "xp", title: "1,200 XP Boost", description: "Credited directly to your learner profile toward Level advancement.", icon: "Sparkles" },
      { type: "cloud_grant", title: "$1,000 Cloud Infrastructure Credits", description: "Provided by our cloud partners for winning team deployment.", icon: "Server" },
      { type: "mentorship", title: "1-on-1 Engineering Mentorship", description: "Direct architectural review session with senior tech leads.", icon: "Users" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ SaaS Hackathon Distinction Certificate",

    phases: [
      { id: "p1", phaseName: "Registration & Team Formation", startsAt: "2026-10-01T00:00:00.000Z", endsAt: "2026-10-23T23:59:00.000Z", description: "Register, find teammates in community channels, and set up local environments." },
      { id: "p2", phaseName: "Kickoff & Problem Reveal", startsAt: "2026-10-24T09:00:00.000Z", endsAt: "2026-10-24T10:00:00.000Z", description: "Live keynote streaming, API credits distribution, and official coding countdown starts." },
      { id: "p3", phaseName: "Sprint Coding & Mentor Check-ins", startsAt: "2026-10-24T10:00:00.000Z", endsAt: "2026-10-26T14:00:00.000Z", description: "Rapid prototyping, mentor debug support, and automated test check-ins." },
      { id: "p4", phaseName: "Submission Deadline", startsAt: "2026-10-26T14:00:00.000Z", endsAt: "2026-10-26T15:00:00.000Z", description: "Final push of GitHub repository and live deployment URL verification." },
      { id: "p5", phaseName: "Judging & Results Gala", startsAt: "2026-10-26T16:00:00.000Z", endsAt: "2026-10-26T18:00:00.000Z", description: "Top 5 finalists pitch live, winners announced, and certificates published." },
    ],

    relatedRoadmapIds: ["fullstack", "frontend", "backend"],
    relatedRoadmapStageIds: [3, 4, 6],
    relatedCourseIds: ["react-nextjs-fullstack", "backend-node-express-sql", "modern-javascript-typescript"],
    relatedProjectIds: ["proj-ecommerce", "proj-chat-app", "proj-task-manager"],
    communityChannelUrl: "/community",

    publishedAt: "2026-10-01T00:00:00.000Z",
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },

  {
    id: "evt-challenge-palindrome-algo",
    slug: "algorithmic-showdown-two-pointers-dynamic-programming",
    title: "Algorithmic Showdown: Two Pointers & Dynamic Programming",
    shortDescription:
      "A weekly technical coding challenge to implement an optimal $O(n^2)$ time, $O(1)$ space palindrome optimizer and verify against hidden test suites in Playground.",
    fullDescription: `Master core interview algorithms under real constraints. In this weekly coding challenge, learners will implement optimal substring algorithms using the Center-Expansion and Two-Pointers paradigms.
    
This event connects directly with your browser **Playground**, where you can write, run, and benchmark test cases in real-time before official submission.`,
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "Coding Challenges",
    difficulty: "Intermediate",
    format: "Online",
    status: "Ongoing",
    isFeatured: false,

    startAt: "2026-10-14T00:00:00.000Z",
    endAt: "2026-10-21T23:59:00.000Z",
    registrationOpensAt: "2026-10-10T00:00:00.000Z",
    registrationClosesAt: "2026-10-20T18:00:00.000Z",
    timezone: "UTC",

    organizer: {
      name: "Marcus Aurelius",
      role: "Lead Algorithms Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Competitive Coding Hub",
    },

    capacity: 0, // Unlimited
    registeredCount: 342,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Automated Suite", description: "Code will be run against 4 public tests and 6 private randomized stress tests.", type: "tools" },
      { id: "r2", title: "Time Limit", description: "Submissions taking longer than 150ms per test case will be flagged as Time Limit Exceeded (TLE).", type: "submission" },
      { id: "r3", title: "Memory Allocation", description: "Avoid allocating $O(n^2)$ dynamic matrices; optimal solutions run in $O(1)$ space.", type: "eligibility" },
    ],

    evaluationCriteria: [
      { id: "c1", name: "Correctness (Test Passes)", weight: 60, description: "Passes 100% of public and private edge cases." },
      { id: "c2", name: "Algorithmic Efficiency", weight: 30, description: "Runtime complexity $O(n^2)$ or better." },
      { id: "c3", name: "Code Cleanliness", weight: 10, description: "Readable variable naming and modular helper functions." },
    ],

    rewards: [
      { type: "xp", title: "450 XP", description: "Awarded automatically upon achieving 100% test pass rate.", icon: "Sparkles" },
      { type: "badge", title: "Algorithm Master Badge", description: "Unlocks the exclusive Algorithm Master achievement on your profile.", icon: "Award" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Algorithms Competence Certificate",

    codingChallenge: {
      id: "algo-palindrome-center",
      title: "Longest Palindromic Substring Optimizer",
      problemStatement: `Given a string \`s\`, return the longest palindromic substring in \`s\`. A palindrome is a sequence that reads identically forwards and backwards.

### Requirements:
- Solve using the **Two Pointers Center Expansion** method.
- Return the exact longest substring.
- Must execute within **$O(n^2)$ time** and **$O(1)$ auxiliary space**.`,
      learningObjectives: [
        "Master two-pointer palindrome center expansion",
        "Handle odd vs even length palindrome symmetry",
        "Avoid memory bloat compared to dynamic programming matrices",
      ],
      supportedLanguages: ["javascript", "python"],
      starterTemplateId: "python",
      starterCode: `def longest_palindrome(s: str) -> str:
    """
    Finds and returns the longest palindromic substring in s.
    Time Complexity: O(n^2)
    Space Complexity: O(1)
    """
    if not s or len(s) < 2:
        return s

    start = 0
    max_len = 1

    def expand(left: int, right: int):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            current_len = right - left + 1
            if current_len > max_len:
                start = left
                max_len = current_len
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)       # Odd length palindrome
        expand(i, i + 1)   # Even length palindrome

    return s[start : start + max_len]

# Test locally
print("Result for 'babad':", longest_palindrome("babad"))
print("Result for 'cbbd':", longest_palindrome("cbbd"))
`,
      sampleTestCases: [
        { id: 1, input: '"babad"', expected: '"bab"', explanation: '"aba" is also acceptable' },
        { id: 2, input: '"cbbd"', expected: '"bb"', explanation: 'Even length palindrome in center' },
        { id: 3, input: '"racecar"', expected: '"racecar"', explanation: 'Entire string is palindrome' },
        { id: 4, input: '"a"', expected: '"a"', explanation: 'Single character boundary case' },
      ],
      constraints: ["1 <= s.length <= 1000", "s consists of English uppercase & lowercase letters"],
      hints: [
        "There are 2n - 1 potential centers (each character and each gap between two characters).",
        "Expand outward from each center while characters on both ends match.",
      ],
      submissionDeadline: "2026-10-21T23:59:00.000Z",
      maxScore: 100,
    },

    relatedRoadmapIds: ["backend", "frontend", "fullstack"],
    relatedRoadmapStageIds: [1, 2],
    relatedCourseIds: ["python-programming-mastery", "modern-javascript-typescript"],
    relatedProjectIds: ["proj-weather"],

    publishedAt: "2026-10-10T00:00:00.000Z",
    createdAt: "2026-10-10T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },

  {
    id: "evt-workshop-react19-perf",
    slug: "modern-react-19-nextjs-performance-optimization-masterclass",
    title: "Modern React 19 & Next.js Performance Optimization",
    shortDescription:
      "Hands-on interactive technical workshop on React Server Components, Turbopack bundling, server actions, and sub-second Core Web Vitals.",
    fullDescription: `Join SLRJ engineering leads for a 3-hour deep dive into production-grade Next.js 16 and React 19 architecture.
    
Participants will follow live code-alongs examining:
- Server Components vs Client Boundaries
- Zero-bundle-size server data fetching
- Turbopack incremental build profiling
- Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP) reduction
- Suspense streaming with skeleton boundaries`,
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    category: "Workshops",
    difficulty: "Intermediate",
    format: "Online",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-10-28T14:00:00.000Z",
    endAt: "2026-10-28T17:30:00.000Z",
    registrationOpensAt: "2026-10-05T00:00:00.000Z",
    registrationClosesAt: "2026-10-28T13:00:00.000Z",
    timezone: "IST (UTC+05:30)",

    meetingUrl: "https://meet.slrjlearn.in/workshop-react19-perf",
    organizer: {
      name: "Priya Sharma",
      role: "Staff Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Architecture Group",
    },

    capacity: 150,
    registeredCount: 112,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Prerequisites", description: "Proficiency in JavaScript (ES6+) and modern React hooks is recommended.", type: "eligibility" },
      { id: "r2", title: "Active Participation", description: "Attendees will clone starter repositories and complete interactive profiling exercises.", type: "tools" },
    ],

    rewards: [
      { type: "certificate", title: "Workshop Attendance Certificate", description: "Issued to attendees who complete the live profiling lab.", icon: "Award" },
      { type: "xp", title: "300 XP", description: "Awarded upon session verification.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Advanced React Architecture Certificate",

    agenda: [
      {
        id: "s1",
        title: "Session 1: The Modern RSC Mental Model",
        description: "Deconstructing server trees vs hydration trees. Why React Server Components never send runtime bytes to the browser.",
        speaker: "Priya Sharma",
        speakerRole: "Staff Frontend Engineer",
        startsAt: "2026-10-28T14:00:00.000Z",
        endsAt: "2026-10-28T15:00:00.000Z",
        joinUrl: "https://meet.slrjlearn.in/workshop-react19-perf",
      },
      {
        id: "s2",
        title: "Session 2: Hands-on Bundle Breakdown & Web Vitals Profiling",
        description: "Analyzing bundle sizes using webpack-bundle-analyzer, removing unnecessary client state, and implementing streaming Suspense.",
        speaker: "Priya Sharma",
        speakerRole: "Staff Frontend Engineer",
        startsAt: "2026-10-28T15:15:00.000Z",
        endsAt: "2026-10-26T16:30:00.000Z",
        joinUrl: "https://meet.slrjlearn.in/workshop-react19-perf",
      },
      {
        id: "s3",
        title: "Session 3: Live Q&A & Code Audits",
        description: "Reviewing learner PRs, debugging hydration warnings, and sharing performance checklists.",
        speaker: "Priya Sharma",
        speakerRole: "Staff Frontend Engineer",
        startsAt: "2026-10-28T16:30:00.000Z",
        endsAt: "2026-10-28T17:30:00.000Z",
        joinUrl: "https://meet.slrjlearn.in/workshop-react19-perf",
      },
    ],

    relatedRoadmapIds: ["frontend", "fullstack"],
    relatedRoadmapStageIds: [3, 4],
    relatedCourseIds: ["react-nextjs-fullstack", "modern-javascript-typescript"],
    relatedProjectIds: ["proj-portfolio", "proj-ecommerce"],

    publishedAt: "2026-10-05T00:00:00.000Z",
    createdAt: "2026-10-05T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },

  {
    id: "evt-webinar-genai-rag",
    slug: "generative-ai-enterprise-rag-knowledge-base-architecture",
    title: "Generative AI & Enterprise RAG Knowledge Base Architecture",
    shortDescription:
      "A technical webinar exploring multi-document vector embedding pipelines, hybrid BM25 + dense retrieval, and autonomous LLM agents.",
    fullDescription: `Retrieval-Augmented Generation (RAG) is transforming how modern organizations query private knowledge bases.
    
In this live webinar, AI researchers and backend engineers will walk through:
- Document chunking strategies (semantic vs recursive)
- Vector indexing with cosine similarity and HNSW graphs
- Hybrid retrieval combining BM25 keyword matching with dense vectors
- Re-ranking algorithms using cross-encoders
- Guardrails and hallucination mitigation`,
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    category: "Webinars",
    difficulty: "Advanced",
    format: "Online",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-10-30T16:00:00.000Z",
    endAt: "2026-10-30T18:00:00.000Z",
    registrationOpensAt: "2026-10-10T00:00:00.000Z",
    registrationClosesAt: "2026-10-30T15:30:00.000Z",
    timezone: "IST (UTC+05:30)",

    meetingUrl: "https://meet.slrjlearn.in/webinar-genai-rag",
    organizer: {
      name: "Dr. Elena Rostova",
      role: "Lead AI Research Scientist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ AI Research",
    },

    capacity: 300,
    registeredCount: 228,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Target Audience", description: "Engineers interested in generative AI, vector databases, and enterprise search.", type: "eligibility" },
    ],

    rewards: [
      { type: "certificate", title: "AI Architecture Webinar Credential", description: "Official verifiable certificate of attendance.", icon: "Award" },
      { type: "xp", title: "250 XP", description: "Direct credit to learner profile.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Generative AI Architecture Certificate",

    agenda: [
      {
        id: "s1",
        title: "Part 1: The Modern Vector Retrieval Pipeline",
        description: "Embeddings, chunking boundaries, and vector store indices (Qdrant, Pinecone, pgvector).",
        speaker: "Dr. Elena Rostova",
        startsAt: "2026-10-30T16:00:00.000Z",
        endsAt: "2026-10-30T16:50:00.000Z",
      },
      {
        id: "s2",
        title: "Part 2: Re-ranking, Context Windows & Autonomous Tool Use",
        description: "Implementing cross-encoder re-ranking and integrating LLMs with tool-calling capabilities.",
        speaker: "Dr. Elena Rostova",
        startsAt: "2026-10-30T17:00:00.000Z",
        endsAt: "2026-10-30T18:00:00.000Z",
      },
    ],

    relatedRoadmapIds: ["ai", "data-science", "backend"],
    relatedRoadmapStageIds: [4, 5],
    relatedCourseIds: ["ai-agent-engineering", "data-science-machine-learning"],
    relatedProjectIds: ["proj-rag-agent"],

    publishedAt: "2026-10-10T00:00:00.000Z",
    createdAt: "2026-10-10T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },

  {
    id: "evt-lab-cybersecurity-owasp",
    slug: "defensive-cybersecurity-lab-web-application-penetration-owasp",
    title: "Defensive Cybersecurity Lab: Web App Vulnerabilities & OWASP",
    shortDescription:
      "An authorized defensive security lab to identify, reproduce, and patch critical OWASP Top 10 vulnerabilities including SQLi, SSRF, and broken access controls.",
    fullDescription: `Security is an essential requirement of modern software engineering. In this authorized educational defense lab, learners will inspect vulnerable web endpoints in a sandboxed staging environment.
    
Participants will:
- Discover SQL Injections and apply parameterized query mitigations
- Analyze Cross-Site Scripting (XSS) and implement Content Security Policies (CSP)
- Remediate Server-Side Request Forgery (SSRF) and broken Object-Level Authorization (BOLA)`,
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    category: "Cybersecurity Labs",
    difficulty: "Intermediate",
    format: "Online",
    status: "Registration Open",
    isFeatured: false,

    startAt: "2026-11-02T10:00:00.000Z",
    endAt: "2026-11-04T18:00:00.000Z",
    registrationOpensAt: "2026-10-12T00:00:00.000Z",
    registrationClosesAt: "2026-11-01T23:59:00.000Z",
    timezone: "UTC",

    organizer: {
      name: "Tariq Vance",
      role: "Lead Offensive & Defensive Security Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Cyber Defense Academy",
    },

    capacity: 100,
    registeredCount: 64,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Authorized Scope", description: "Attacks are restricted strictly to the designated isolated Docker sandbox containers.", type: "disqualification" },
      { id: "r2", title: "Defensive Patches", description: "Points are awarded both for finding the bug and writing the verified code fix.", type: "submission" },
    ],

    evaluationCriteria: [
      { id: "c1", name: "Vulnerability Identification", weight: 50, description: "Successfully capturing security flags and documenting reproduction steps." },
      { id: "c2", name: "Patch Implementation", weight: 50, description: "Submitting verified code pull requests that resolve the vulnerability without breaking functionality." },
    ],

    rewards: [
      { type: "certificate", title: "Cybersecurity Defensive Specialist Certificate", description: "Verifiable credential in OWASP Web Application Defense.", icon: "Award" },
      { type: "xp", title: "600 XP", description: "Direct XP credit.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Defensive Security Certificate",

    relatedRoadmapIds: ["cybersecurity", "backend"],
    relatedRoadmapStageIds: [2, 3],
    relatedCourseIds: ["cybersecurity-defensive-operations", "backend-node-express-sql"],
    relatedProjectIds: ["proj-security-scanner"],

    publishedAt: "2026-10-12T00:00:00.000Z",
    createdAt: "2026-10-12T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },

  {
    id: "evt-design-fintech-tokens",
    slug: "ui-ux-design-sprint-accessible-fintech-design-system",
    title: "UI/UX Design Sprint: Accessible FinTech Design System",
    shortDescription:
      "A 5-day product design sprint to create an accessible, WCAG AAA compliant design system for personal banking and investment dashboards.",
    fullDescription: `Great software begins with accessible, clear design. This UI/UX Design Sprint challenges designers and frontend developers to construct a reusable design token architecture and component library for a modern personal finance application.
    
Focus areas:
- WCAG 2.2 AAA contrast ratios and keyboard navigation
- Design token hierarchies (Color, Typography, Spacing, Elevation)
- Interactive states (hover, focus, disabled, active)
- Financial data visualization (spending pie charts, balance line graphs)`,
    coverImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    category: "Design Challenges",
    difficulty: "All Levels",
    format: "Hybrid",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-11-05T09:00:00.000Z",
    endAt: "2026-11-10T18:00:00.000Z",
    registrationOpensAt: "2026-10-15T00:00:00.000Z",
    registrationClosesAt: "2026-11-04T23:59:00.000Z",
    timezone: "IST (UTC+05:30)",

    venue: "SLRJ Innovation Labs & Figma Community",
    organizer: {
      name: "Sophia Martinez",
      role: "Head of Product Design & Accessibility",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Design Guild",
    },

    capacity: 120,
    registeredCount: 88,
    allowsTeams: true,
    minTeamSize: 1,
    maxTeamSize: 2,

    rules: [
      { id: "r1", title: "Accessibility Testing", description: "Submissions must include Stark / Lighthouse contrast ratio audit reports.", type: "submission" },
      { id: "r2", title: "Figma or Code Deliverable", description: "Submissions can be either a Figma component library or coded Tailwind/CSS components.", type: "tools" },
    ],

    evaluationCriteria: [
      { id: "c1", name: "Accessibility & Usability", weight: 40, description: "Color contrast, typography legibility, and logical focus orders." },
      { id: "c2", name: "System Consistency & Tokens", weight: 35, description: "Modular design tokens and atomic component structure." },
      { id: "c3", name: "Visual Polish & Innovation", weight: 25, description: "Professional visual hierarchy and thoughtful micro-interactions." },
    ],

    rewards: [
      { type: "certificate", title: "FinTech Design Systems Certificate", description: "Official design credential.", icon: "Award" },
      { type: "xp", title: "500 XP", description: "Direct XP boost.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Accessible Design Systems Certificate",

    relatedRoadmapIds: ["frontend", "fullstack"],
    relatedRoadmapStageIds: [1, 2],
    relatedCourseIds: ["ui-ux-design-systems", "web-development-foundations"],
    relatedProjectIds: ["proj-expense-tracker", "proj-portfolio"],

    publishedAt: "2026-10-15T00:00:00.000Z",
    createdAt: "2026-10-15T00:00:00.000Z",
    updatedAt: "2026-10-16T00:00:00.000Z",
  },

  {
    id: "evt-data-predictive-cup",
    slug: "ai-open-cup-real-estate-price-prediction-feature-engineering",
    title: "AI Open Cup: Housing Price Prediction & Feature Engineering",
    shortDescription:
      "A competitive machine learning cup to clean unstructured housing datasets, engineer non-linear features, and train gradient boosting models.",
    fullDescription: `Compete on structured data modeling. Learners are provided with a multi-attribute real estate transaction dataset containing missing values, categorical labels, and outlier distributions.
    
Participants will build an end-to-end Python ML pipeline using pandas, scikit-learn, and XGBoost/LightGBM, evaluated against a held-out test dataset on Root Mean Squared Logarithmic Error (RMSLE).`,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    category: "AI & Data Challenges",
    difficulty: "Intermediate",
    format: "Online",
    status: "Registration Open",
    isFeatured: false,

    startAt: "2026-11-08T00:00:00.000Z",
    endAt: "2026-11-15T23:59:00.000Z",
    registrationOpensAt: "2026-10-15T00:00:00.000Z",
    registrationClosesAt: "2026-11-07T18:00:00.000Z",
    timezone: "UTC",

    organizer: {
      name: "Marcus Aurelius",
      role: "Lead Machine Learning Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Data Labs",
    },

    capacity: 0,
    registeredCount: 142,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Target Metric", description: "Submissions will be automatically scored using RMSLE on the private test split.", type: "submission" },
      { id: "r2", title: "Reproducibility", description: "A Jupyter notebook or Python script with random seeds fixed must accompany the CSV submission.", type: "originality" },
    ],

    evaluationCriteria: [
      { id: "c1", name: "Model Accuracy (RMSLE Score)", weight: 70, description: "Objective mathematical ranking on unseen validation set." },
      { id: "c2", name: "Exploratory Data Analysis & Features", weight: 30, description: "Insightful feature engineering and handling of skewness." },
    ],

    rewards: [
      { type: "certificate", title: "Predictive Analytics Excellence Certificate", description: "Top 20% ranking certificate.", icon: "Award" },
      { type: "xp", title: "700 XP", description: "Credited upon valid submission.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Machine Learning Competence Certificate",

    relatedRoadmapIds: ["data-science", "ai"],
    relatedRoadmapStageIds: [2, 3],
    relatedCourseIds: ["data-science-machine-learning", "python-programming-mastery"],
    relatedProjectIds: ["proj-data-pipeline", "proj-rag-agent"],

    publishedAt: "2026-10-15T00:00:00.000Z",
    createdAt: "2026-10-15T00:00:00.000Z",
    updatedAt: "2026-10-16T00:00:00.000Z",
  },

  {
    id: "evt-bootcamp-devops-k8s",
    slug: "devops-intensive-infrastructure-as-code-kubernetes-deployment",
    title: "DevOps Intensive: Infrastructure-as-Code & Kubernetes",
    shortDescription:
      "A fast-paced 2-day technical bootcamp on containerizing microservices with Docker, writing Terraform recipes, and deploying resilient Kubernetes clusters.",
    fullDescription: `Bridge the gap between application code and reliable cloud infrastructure. 
    
In this intensive workshop, engineers will:
- Author multi-stage Dockerfiles for minimal production image footprints
- Write declarative Terraform configurations for VPC networks and managed clusters
- Deploy Kubernetes Pods, Deployments, Services, and Ingress controllers
- Set up automated rolling updates with zero-downtime health probes`,
    coverImage:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80",
    category: "Workshops",
    difficulty: "Advanced",
    format: "Online",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-11-14T10:00:00.000Z",
    endAt: "2026-11-15T18:00:00.000Z",
    registrationOpensAt: "2026-10-10T00:00:00.000Z",
    registrationClosesAt: "2026-11-13T23:59:00.000Z",
    timezone: "IST (UTC+05:30)",

    meetingUrl: "https://meet.slrjlearn.in/devops-intensive-k8s",
    organizer: {
      name: "Vikram Sen",
      role: "Principal Cloud Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Cloud Solutions",
    },

    capacity: 100,
    registeredCount: 79,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Prerequisites", description: "Familiarity with Linux command-line and basic networking concepts.", type: "eligibility" },
    ],

    rewards: [
      { type: "certificate", title: "Cloud & Kubernetes Specialist Certificate", description: "Verified credential in automated cluster orchestration.", icon: "Award" },
      { type: "xp", title: "500 XP", description: "Direct XP credit.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Cloud & DevOps Specialist Certificate",

    relatedRoadmapIds: ["cloud", "backend"],
    relatedRoadmapStageIds: [2, 3],
    relatedCourseIds: ["devops-cloud-docker-kubernetes", "backend-node-express-sql"],
    relatedProjectIds: ["proj-devops-pipeline"],

    publishedAt: "2026-10-10T00:00:00.000Z",
    createdAt: "2026-10-10T00:00:00.000Z",
    updatedAt: "2026-10-15T00:00:00.000Z",
  },

  {
    id: "evt-community-bugbash-2026",
    slug: "open-source-saturday-global-community-bug-bash-pr-marathon",
    title: "Open Source Saturday: Global Community Bug Bash & PR Sprint",
    shortDescription:
      "Join learners and maintainers around the globe to review open issues, write unit tests, fix documentation, and merge your first open-source pull requests.",
    fullDescription: `Open Source Saturday is SLRJ Learn's premier community collaboration event. Whether you are creating your very first Git pull request or you are a seasoned maintainer, you'll pair program with fellow learners on curated issues.
    
Participants receive guidance on Git branching, conventional commits, writing meaningful PR descriptions, and interacting respectfully in code reviews.`,
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    category: "Community Events",
    difficulty: "All Levels",
    format: "Hybrid",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-11-21T10:00:00.000Z",
    endAt: "2026-11-21T19:00:00.000Z",
    registrationOpensAt: "2026-10-16T00:00:00.000Z",
    registrationClosesAt: "2026-11-20T23:59:00.000Z",
    timezone: "IST (UTC+05:30)",

    venue: "SLRJ Student Center Bangalore & Discord Voice Lounges",
    meetingUrl: "https://meet.slrjlearn.in/open-source-saturday",
    organizer: {
      name: "Sarah Kim",
      role: "Community Director & Developer Advocate",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Community Guild",
    },

    capacity: 200,
    registeredCount: 135,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Code of Conduct", description: "Be welcoming, respectful, and supportive of all experience levels.", type: "originality" },
      { id: "r2", title: "Verified PRs", description: "Submissions must be legitimate code or doc contributions adhering to the repo contributing guide.", type: "submission" },
    ],

    rewards: [
      { type: "badge", title: "Open Source Contributor Badge", description: "Special highlight badge on your SLRJ profile.", icon: "Award" },
      { type: "xp", title: "350 XP", description: "Credited upon merged or reviewed pull request.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Community Contributor Certificate",

    relatedRoadmapIds: ["frontend", "backend", "fullstack"],
    relatedRoadmapStageIds: [1, 2],
    relatedCourseIds: ["web-development-foundations", "modern-javascript-typescript"],
    relatedProjectIds: ["proj-portfolio", "proj-task-manager"],
    communityChannelUrl: "/community",

    publishedAt: "2026-10-16T00:00:00.000Z",
    createdAt: "2026-10-16T00:00:00.000Z",
    updatedAt: "2026-10-16T00:00:00.000Z",
  },

  {
    id: "evt-competition-react-native-sprint",
    slug: "mobile-first-cross-platform-react-native-habit-tracker-sprint",
    title: "Mobile First: React Native Habit Tracker Sprint",
    shortDescription:
      "A 7-day mobile engineering sprint to construct an offline-first habit tracker app with gestures, local SQLite persistence, and streak charts.",
    fullDescription: `Build a production-grade mobile app. In this sprint, participants will develop a cross-platform mobile application utilizing React Native and Expo.
    
Key criteria:
- Smooth 60fps pan/swipe gesture handlers
- Offline-first SQLite database architecture
- Daily push notification reminders
- Clean mobile UI with dark/light theme switching`,
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    category: "Coding Challenges",
    difficulty: "Intermediate",
    format: "Online",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-11-23T09:00:00.000Z",
    endAt: "2026-11-30T18:00:00.000Z",
    registrationOpensAt: "2026-10-16T00:00:00.000Z",
    registrationClosesAt: "2026-11-22T23:59:00.000Z",
    timezone: "UTC",

    organizer: {
      name: "Tariq Vance",
      role: "Lead Mobile Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Mobile Labs",
    },

    capacity: 100,
    registeredCount: 52,
    allowsTeams: true,
    minTeamSize: 1,
    maxTeamSize: 2,

    rules: [
      { id: "r1", title: "Framework", description: "React Native with Expo or bare workflow is required.", type: "tools" },
      { id: "r2", title: "Video Walkthrough", description: "Submissions must include a 2-minute video screen recording on Android or iOS simulator.", type: "submission" },
    ],

    evaluationCriteria: [
      { id: "c1", name: "UI Polish & Smooth Gestures", weight: 35, description: "Fluid animations and responsive mobile UX." },
      { id: "c2", name: "Offline Persistence", weight: 35, description: "Rock-solid local storage with SQLite or AsyncStorage." },
      { id: "c3", name: "Code Modularity", weight: 30, description: "Clean custom hooks and TypeScript interfaces." },
    ],

    rewards: [
      { type: "certificate", title: "Mobile Engineering Sprint Certificate", description: "Verifiable mobile credential.", icon: "Award" },
      { type: "xp", title: "600 XP", description: "Profile XP reward.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Mobile Engineering Certificate",

    relatedRoadmapIds: ["mobile", "frontend"],
    relatedRoadmapStageIds: [2, 3],
    relatedCourseIds: ["mobile-app-development-react-native", "modern-javascript-typescript"],
    relatedProjectIds: ["proj-expense-tracker"],

    publishedAt: "2026-10-16T00:00:00.000Z",
    createdAt: "2026-10-16T00:00:00.000Z",
    updatedAt: "2026-10-16T00:00:00.000Z",
  },

  {
    id: "evt-webinar-microservices-distributed",
    slug: "architecting-resilient-backend-microservices-event-driven-apis",
    title: "Architecting Resilient Backend Microservices & Event-Driven APIs",
    shortDescription:
      "Deep dive into message queues, idempotency keys, distributed transaction patterns (Saga), and zero-downtime database migrations.",
    fullDescription: `Explore enterprise distributed systems engineering with senior backend architects. 
    
This webinar covers the challenges of scaling beyond monolithic architectures:
- Event-driven choreography vs orchestration
- Implementing the Saga pattern with compensating transactions
- Outbox pattern for reliable database-to-message-broker synchronization
- Graceful degradation and circuit breakers`,
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    category: "Webinars",
    difficulty: "Advanced",
    format: "Online",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-12-02T15:00:00.000Z",
    endAt: "2026-12-02T17:30:00.000Z",
    registrationOpensAt: "2026-10-16T00:00:00.000Z",
    registrationClosesAt: "2026-12-02T14:00:00.000Z",
    timezone: "IST (UTC+05:30)",

    meetingUrl: "https://meet.slrjlearn.in/webinar-microservices",
    organizer: {
      name: "Dr. Arvind Ramesh",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Distributed Systems Group",
    },

    capacity: 250,
    registeredCount: 165,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Target Level", description: "Intermediate to advanced backend engineers and system architects.", type: "eligibility" },
    ],

    rewards: [
      { type: "certificate", title: "Distributed Systems Architecture Certificate", description: "Verifiable attendance credential.", icon: "Award" },
      { type: "xp", title: "250 XP", description: "Direct XP credit.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Distributed Systems Certificate",

    relatedRoadmapIds: ["backend", "fullstack", "cloud"],
    relatedRoadmapStageIds: [3, 4],
    relatedCourseIds: ["backend-node-express-sql", "devops-cloud-docker-kubernetes"],
    relatedProjectIds: ["proj-chat-app", "proj-task-manager"],

    publishedAt: "2026-10-16T00:00:00.000Z",
    createdAt: "2026-10-16T00:00:00.000Z",
    updatedAt: "2026-10-16T00:00:00.000Z",
  },

  {
    id: "evt-challenge-creative-canvas",
    slug: "frontend-showcase-creative-canvas-css-interactive-animation",
    title: "Frontend Showcase: Creative Canvas & CSS Interactive Animation",
    shortDescription:
      "A creative coding challenge to build an interactive particle simulation, generative audio visualizer, or 3D product showcase using HTML5 Canvas & CSS.",
    fullDescription: `Combine artistic creativity with frontend engineering excellence. In this showcase, frontend developers will push the boundaries of modern CSS animations, SVG manipulation, and HTML5 Canvas context.
    
Submissions run live directly in the web browser and are evaluated on visual elegance, frame-rate consistency, and algorithmic creativity.`,
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    category: "Coding Challenges",
    difficulty: "All Levels",
    format: "Online",
    status: "Upcoming",
    isFeatured: false,

    startAt: "2026-12-05T00:00:00.000Z",
    endAt: "2026-12-12T23:59:00.000Z",
    registrationOpensAt: "2026-10-16T00:00:00.000Z",
    registrationClosesAt: "2026-12-04T18:00:00.000Z",
    timezone: "UTC",

    organizer: {
      name: "Priya Sharma",
      role: "Staff Frontend Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      company: "SLRJ Creative UI Guild",
    },

    capacity: 0,
    registeredCount: 89,
    allowsTeams: false,

    rules: [
      { id: "r1", title: "Frame Rate Performance", description: "Visual animations should maintain steady 60fps on modern desktop browsers.", type: "tools" },
      { id: "r2", title: "Playground Compatible", description: "Submissions can be built and previewed directly in the SLRJ Web Playground.", type: "submission" },
    ],

    evaluationCriteria: [
      { id: "c1", name: "Aesthetic Design & Creativity", weight: 40, description: "Visual impact and originality of concept." },
      { id: "c2", name: "Rendering Efficiency (FPS)", weight: 35, description: "Efficient requestAnimationFrame loops and minimal layout thrashing." },
      { id: "c3", name: "User Interactivity", weight: 25, description: "Mouse/touch responsive physics or sound reactivity." },
    ],

    rewards: [
      { type: "certificate", title: "Creative Frontend Mastery Certificate", description: "Verifiable design & code certificate.", icon: "Award" },
      { type: "xp", title: "450 XP", description: "Direct XP credit.", icon: "Sparkles" },
    ],

    certificateEligible: true,
    certificateTitle: "SLRJ Creative Frontend Engineering Certificate",

    codingChallenge: {
      id: "creative-particle-canvas",
      title: "Interactive Canvas Particle Field",
      problemStatement: `Construct an interactive particle network in HTML5 Canvas.
      
Particles should float smoothly, connect with connecting lines when close to each other, and gently push away from the learner's mouse cursor.`,
      learningObjectives: [
        "Master Canvas 2D context rendering API",
        "Implement particle distance checks in O(n^2) with threshold pruning",
        "Handle smooth mouse interaction vectors",
      ],
      supportedLanguages: ["javascript", "html"],
      starterTemplateId: "web",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #080D1A; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 2 + Math.random() * 2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#18B6D2';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
      sampleTestCases: [
        { id: 1, input: "Canvas initialized", expected: "60 FPS rendering", explanation: "Smooth continuous rendering loop" },
      ],
      constraints: ["No external heavy 3D game engines (Three.js allowed only if optimized)"],
      hints: [
        "Listen to pointermove on canvas and calculate Euclidean distance to each particle.",
      ],
      submissionDeadline: "2026-12-12T23:59:00.000Z",
      maxScore: 100,
    },

    relatedRoadmapIds: ["frontend"],
    relatedRoadmapStageIds: [1, 2],
    relatedCourseIds: ["web-development-foundations", "modern-javascript-typescript"],
    relatedProjectIds: ["proj-portfolio"],

    publishedAt: "2026-10-16T00:00:00.000Z",
    createdAt: "2026-10-16T00:00:00.000Z",
    updatedAt: "2026-10-16T00:00:00.000Z",
  },
];

// Helper functions for lookup & querying
export function getEventBySlug(slug: string): EventItem | undefined {
  return EVENTS_CATALOG.find((e) => e.slug === slug || e.id === slug);
}

export function getAllEvents(): EventItem[] {
  return EVENTS_CATALOG;
}

export function getFeaturedEvent(): EventItem {
  return EVENTS_CATALOG.find((e) => e.isFeatured) || EVENTS_CATALOG[0];
}

export function getEventsByCategory(category: string): EventItem[] {
  if (!category || category === "All Events") return EVENTS_CATALOG;
  return EVENTS_CATALOG.filter((e) => e.category === category);
}

export function getEventsForRoadmap(roadmapId: string): EventItem[] {
  return EVENTS_CATALOG.filter((e) => e.relatedRoadmapIds.includes(roadmapId));
}

export function getEventsForCourse(courseId: string): EventItem[] {
  return EVENTS_CATALOG.filter((e) => e.relatedCourseIds.includes(courseId));
}
