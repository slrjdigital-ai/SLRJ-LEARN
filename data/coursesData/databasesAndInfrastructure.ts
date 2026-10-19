import { Course } from "./types";

export const DATABASES_AND_INFRASTRUCTURE_COURSES: Course[] = [
  // 12. SQL & MongoDB
  {
    id: "course-sql-mongodb",
    slug: "sql-mongodb",
    aliases: ["sql-and-relational-databases", "databases-mastery"],
    title: "SQL & MongoDB: Relational & Document Data Architecture",
    description: "Master relational schema design, ACID transactions, complex SQL joins, indexing, query optimization, and document-oriented NoSQL engineering with MongoDB and aggregation pipelines.",
    shortDescription: "Master relational SQL schemas, joins, B-tree indexing, and MongoDB document database aggregation pipelines.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Databases",
    difficulty: "Advanced",
    estimatedDuration: "20 Hours",
    estimatedDurationMinutes: 1200,
    totalLessons: 12,
    totalXp: 1700,
    icon: "🗄️",
    color: "from-blue-700 to-emerald-900",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Database Normalization", "Aggregation Pipeline", "Indexing"],
    skillsGained: [
      "Design normalized relational databases (1NF to 3NF) with primary and foreign keys",
      "Write multi-table SQL queries with INNER, LEFT, and FULL OUTER joins",
      "Optimize slow database queries using B-Tree and GIN indexes and EXPLAIN ANALYZE",
      "Model flexible schema document architectures with MongoDB and BSON",
      "Process high-volume data analytics using the MongoDB Aggregation Framework ($match, $group, $lookup)",
      "Select the right database architecture (SQL vs NoSQL) for enterprise workloads"
    ],
    prerequisites: ["Basic programming concepts"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-14T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "db-mod-1",
        title: "Relational Databases, Joins & Query Optimization",
        description: "RDBMS architecture, ACID transactions, multi-table joins, and indexing strategies.",
        lessons: [
          {
            id: "db-l1",
            slug: "sql-joins-indexing",
            title: "SQL Complex Joins, Window Functions & Indexing",
            duration: "50 mins",
            xpReward: 160,
            content: "Relational database management systems (RDBMS) enforce data integrity through schemas, constraints, and ACID properties. Indexes (typically B-Trees) accelerate WHERE clause lookups from O(N) full table scans to O(log N) tree traversals.",
            codeExample: {
              language: "sql",
              code: `-- Multi-table join with aggregation & indexing\nSELECT \n    u.id AS user_id,\n    u.name,\n    COUNT(c.id) AS completed_courses,\n    AVG(a.score) AS average_assessment_score\nFROM users u\nJOIN enrollments e ON u.id = e.user_id\nJOIN courses c ON e.course_id = c.id\nLEFT JOIN assessments a ON u.id = a.user_id AND c.id = a.course_id\nWHERE e.status = 'completed'\nGROUP BY u.id, u.name\nHAVING COUNT(c.id) >= 3\nORDER BY average_assessment_score DESC;`,
              output: "Returns aggregated user performance metrics across 3 joined tables",
              explanation: "HAVING filters grouped aggregates, and foreign keys enforce referential integrity."
            },
            commonMistakes: [
              {
                wrong: "Over-indexing every single column in a table",
                correct: "Index columns frequently used in WHERE filters, JOIN conditions, and ORDER BY clauses",
                reason: "Every write (INSERT/UPDATE/DELETE) must update all indexes, degrading write throughput."
              }
            ],
            keyTakeaways: [
              "B-Tree indexes speed up equality and range queries dramatically.",
              "Use EXPLAIN ANALYZE to inspect query execution plans and index usage."
            ],
            exercise: {
              id: "db-ex-1",
              type: "multiple-choice",
              prompt: "Which clause is used to filter aggregated groups produced by a GROUP BY statement in SQL?",
              options: ["WHERE", "HAVING", "FILTER", "LIMIT"],
              correctAnswer: 1,
              explanation: "HAVING filters groups of aggregated rows; WHERE filters individual rows before aggregation.",
              hint: "Starts with 'H'."
            }
          }
        ]
      },
      {
        id: "db-mod-2",
        title: "MongoDB & Document-Oriented Architecture",
        description: "BSON data model, CRUD queries, indexing, and the aggregation pipeline.",
        lessons: [
          {
            id: "db-l2",
            slug: "mongodb-aggregation-pipeline",
            title: "MongoDB Aggregation Pipeline & Flexible Schemas",
            duration: "50 mins",
            xpReward: 160,
            content: "MongoDB stores records as flexible, JSON-like BSON documents. The aggregation pipeline processes documents through ordered stages ($match, $group, $sort, $project, $lookup), providing powerful analytics and cross-collection joins.",
            codeExample: {
              language: "javascript",
              code: `// MongoDB Aggregation Pipeline Example:\ndb.orders.aggregate([\n  { $match: { status: "completed" } },\n  {\n    $group: {\n      _id: "$category",\n      totalRevenue: { $sum: "$amount" },\n      averageOrder: { $avg: "$amount" },\n      orderCount: { $sum: 1 }\n    }\n  },\n  { $sort: { totalRevenue: -1 } }\n]);`,
              output: "Yields revenue and order statistics grouped by category",
              explanation: "Stages pipe their output into the subsequent stage sequentially."
            },
            commonMistakes: [
              {
                wrong: "Placing $match stages after heavy $group operations in MongoDB aggregations",
                correct: "Place $match as early as possible to filter documents before grouping",
                reason: "Early filtering drastically reduces the working dataset, maximizing index utilization."
              }
            ],
            keyTakeaways: [
              "MongoDB provides dynamic schemas ideal for polymorphic and hierarchical data.",
              "The aggregation framework processes multi-stage transformations natively on the server."
            ],
            exercise: {
              id: "db-ex-2",
              type: "multiple-choice",
              prompt: "Which aggregation stage in MongoDB groups documents by a specified identifier expression?",
              options: ["$filter", "$group", "$collect", "$aggregate"],
              correctAnswer: 1,
              explanation: "$group groups documents by a specified _id key and accumulates aggregated calculations.",
              hint: "$group."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "db-pdf-1",
        title: "SQL & MongoDB Database Architecture Handbook",
        description: "Complete guide to database normalization, indexing, query execution plans, and NoSQL design.",
        moduleTitle: "Database Systems",
        fileUrl: "/pdfs/sql-mongodb-guide.pdf",
        fileSize: "5.7 MB",
        pageCount: 52,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 15. Cybersecurity Fundamentals
  {
    id: "course-cybersecurity-fundamentals",
    slug: "cybersecurity-fundamentals",
    aliases: ["cybersecurity-os-networking", "security-core"],
    title: "Cybersecurity Fundamentals: Network Defense & Secure Systems",
    description: "Learn foundational cybersecurity, OSI networking models, Linux security auditing, encryption, authentication, OWASP Top 10 vulnerabilities, secure coding, and defensive security labs.",
    shortDescription: "Master networking defense, Linux security, cryptography, OWASP Top 10 vulnerabilities, and security auditing.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Cybersecurity",
    difficulty: "Advanced",
    estimatedDuration: "18 Hours",
    estimatedDurationMinutes: 1080,
    totalLessons: 12,
    totalXp: 1550,
    icon: "🛡️",
    color: "from-red-700 to-rose-950",
    skills: ["Network Security", "Linux Hardening", "Cryptography", "OWASP Top 10", "Vulnerability Scanning", "Zero Trust"],
    skillsGained: [
      "Understand the OSI 7-layer networking stack, TCP/IP handshakes, and packet analysis",
      "Audit and harden Linux environments with permissions, firewalls (UFW), and SSH keys",
      "Apply symmetric (AES) and asymmetric (RSA/ECC) cryptography, hashing, and TLS/SSL",
      "Identify and remediate the OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF, SSRF)",
      "Implement secure authentication, Multi-Factor Authentication (MFA), and RBAC access control",
      "Conduct authorized vulnerability assessments with industry tools (Nmap, Wireshark)"
    ],
    prerequisites: ["Familiarity with operating systems, command line, and basic networking"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-03-04T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "sec-mod-1",
        title: "Networking Basics, Linux & Cryptography",
        description: "OSI model, TCP/IP, Linux permissions, symmetric and asymmetric encryption.",
        lessons: [
          {
            id: "sec-l1",
            slug: "security-networking-crypto",
            title: "Network Fundamentals, CIA Triad & Cryptography",
            duration: "45 mins",
            xpReward: 140,
            content: "Cybersecurity safeguards digital assets across Confidentiality, Integrity, and Availability (the CIA Triad). Cryptography protects data at rest and in transit: symmetric encryption (e.g. AES-256) uses a shared secret key for high throughput, while asymmetric encryption (e.g. RSA, Elliptic Curve) uses public/private keypairs for secure key exchange and digital signatures.",
            codeExample: {
              language: "bash",
              code: `# Inspect network connections and active listening ports\nss -tuln\n\n# Generate a secure 4096-bit Ed25519 SSH keypair\nssh-keygen -t ed25519 -C "admin@slrjlearn.in"\n\n# Verify file integrity using SHA-256 cryptographic hash\nsha256sum software_release.tar.gz`,
              output: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 software_release.tar.gz",
              explanation: "Cryptographic hashes ensure data integrity; any tampering alters the resulting hash output completely."
            },
            commonMistakes: [
              {
                wrong: "Using deprecated hash functions like MD5 or SHA-1 for password storage or security integrity",
                correct: "Use modern adaptive hashing algorithms like Argon2id or bcrypt for credentials, and SHA-256 for files",
                reason: "MD5 and SHA-1 suffer from collision attacks and can be cracked in milliseconds on GPUs."
              }
            ],
            keyTakeaways: [
              "Confidentiality, Integrity, and Availability form the CIA Triad of information security.",
              "Asymmetric cryptography solves the key distribution problem over insecure channels."
            ],
            exercise: {
              id: "sec-ex-1",
              type: "multiple-choice",
              prompt: "Which of the following is considered an asymmetric encryption algorithm?",
              options: ["AES-256", "RSA", "ChaCha20", "DES"],
              correctAnswer: 1,
              explanation: "RSA utilizes public and private keypairs, making it an asymmetric cryptographic system.",
              hint: "Named after Rivest, Shamir, and Adleman."
            }
          }
        ]
      },
      {
        id: "sec-mod-2",
        title: "OWASP Top 10 Web Security & Vulnerability Assessment",
        description: "SQL injection, XSS, CSRF, broken access control, and defense-in-depth.",
        lessons: [
          {
            id: "sec-l2",
            slug: "owasp-web-vulnerabilities",
            title: "OWASP Top 10: SQL Injection, XSS & Remediation",
            duration: "55 mins",
            xpReward: 170,
            content: "Web applications are prime targets for cyberattacks. SQL Injection (SQLi) occurs when untrusted input concatenates directly into database queries; Cross-Site Scripting (XSS) occurs when unescaped user input executes malicious JavaScript inside victim browsers. Remediation requires parameterized queries and strict Content Security Policies (CSP).",
            codeExample: {
              language: "typescript",
              code: `// VULNERABLE: Direct string concatenation opens SQL Injection\n// db.query(\`SELECT * FROM users WHERE email = '\${userInput}'\`);\n\n// SECURE: Parameterized queries treat user input strictly as data values\nconst query = 'SELECT id, email, role FROM users WHERE email = $1';\nconst result = await db.query(query, [userInput]);`,
              output: "Safely executes database query without vulnerability to SQL injection",
              explanation: "Prepared statements pre-compile SQL grammar, rendering user input incapable of altering query syntax."
            },
            commonMistakes: [
              {
                wrong: "Relying purely on client-side validation to stop security attacks",
                correct: "Always validate, sanitize, and verify authorizations on the backend server",
                reason: "Attackers can bypass frontend validation easily via curl, Postman, or automated scripts."
              }
            ],
            keyTakeaways: [
              "Always use parameterized queries/prepared statements to eliminate SQL injection.",
              "Never trust any client input; enforce defense-in-depth on the server."
            ],
            exercise: {
              id: "sec-ex-2",
              type: "multiple-choice",
              prompt: "What is the primary, proven defense against SQL Injection vulnerabilities?",
              options: [
                "Parameterized queries / Prepared statements",
                "Firewalls alone",
                "Frontend JavaScript input length checks",
                "Hiding the database port number"
              ],
              correctAnswer: 0,
              explanation: "Parameterized statements separate SQL logic from data parameters, preventing arbitrary command injection.",
              hint: "Parameterized."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "sec-pdf-1",
        title: "Cybersecurity Defense & OWASP Top 10 Handbook",
        description: "Complete guide to network security, Linux hardening, cryptography, and secure web application coding.",
        moduleTitle: "Security Defense",
        fileUrl: "/pdfs/cybersecurity-guide.pdf",
        fileSize: "5.8 MB",
        pageCount: 56,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 20. Cloud-Native & Serverless Development
  {
    id: "course-cloud-native-serverless",
    slug: "cloud-native-serverless",
    aliases: ["cloud-devops-microservices", "serverless-cloud-native"],
    title: "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    description: "Architect, containerize, and deploy highly scalable cloud-native microservices and serverless architectures using Docker, Kubernetes, Serverless functions, API Gateways, and automated CI/CD.",
    shortDescription: "Master cloud architecture, Docker containers, Kubernetes, serverless functions, and automated CI/CD pipelines.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Cloud & DevOps",
    difficulty: "Advanced",
    estimatedDuration: "22 Hours",
    estimatedDurationMinutes: 1320,
    totalLessons: 12,
    totalXp: 1750,
    icon: "☁️",
    color: "from-sky-600 to-indigo-900",
    skills: ["Cloud Architecture", "Docker", "Kubernetes", "Serverless Functions", "API Gateways", "CI/CD"],
    skillsGained: [
      "Understand cloud infrastructure models (IaaS, PaaS, Serverless FaaS) and well-architected principles",
      "Author optimized multi-stage Dockerfiles with minimal image layers and hardened security",
      "Deploy and manage containerized workloads using Kubernetes Pods, Deployments, and Services",
      "Build auto-scaling serverless APIs with event-driven architectures and message queues",
      "Configure API Gateways, rate limiting, and distributed tracing across microservices",
      "Construct automated continuous integration and continuous deployment (CI/CD) pipelines"
    ],
    prerequisites: ["Basic Linux commands and Node.js or Python backend knowledge"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-26T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "cloud-mod-1",
        title: "Cloud Computing, Serverless & Containers",
        description: "Cloud fundamentals, serverless functions, and production Docker containerization.",
        lessons: [
          {
            id: "cloud-l1",
            slug: "cloud-serverless-docker",
            title: "Serverless Architecture & Multi-Stage Dockerfiles",
            duration: "45 mins",
            xpReward: 140,
            content: "Cloud-native applications leverage cloud scalability from inception. Serverless (Function-as-a-Service) executes code in ephemeral containers on demand, scaling from zero to thousands of concurrent executions with zero server maintenance. Docker ensures consistent execution across development and cloud environments.",
            codeExample: {
              language: "dockerfile",
              code: `# Multi-stage Dockerfile for production Node.js service\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package*.json ./\nRUN npm ci --only=production\nUSER node\nEXPOSE 3000\nCMD ["node", "dist/server.js"]`,
              output: "Builds a secure, lightweight (50MB) container running as non-root user",
              explanation: "Multi-stage builds separate development dependencies from the lean production image."
            },
            commonMistakes: [
              {
                wrong: "Running Docker containers as the default root user",
                correct: "Specify 'USER node' or an unprivileged UID inside the Dockerfile",
                reason: "Root container breakouts compromise the host operating system."
              }
            ],
            keyTakeaways: [
              "Serverless functions charge only for exact execution time in milliseconds.",
              "Multi-stage Docker builds reduce image size by up to 90% and harden security."
            ],
            exercise: {
              id: "cloud-ex-1",
              type: "multiple-choice",
              prompt: "What is a primary advantage of Serverless Function-as-a-Service (FaaS)?",
              options: [
                "Automatic scaling from zero with pay-per-execution billing",
                "Permanent dedicated virtual machine instances",
                "Unlimited execution time without timeouts",
                "Manual server patching requirements"
              ],
              correctAnswer: 0,
              explanation: "Serverless automatically scales with traffic, scaling down to zero when idle with zero ongoing cost.",
              hint: "Scale to zero."
            }
          }
        ]
      },
      {
        id: "cloud-mod-2",
        title: "Kubernetes, Microservices & CI/CD Pipelines",
        description: "Kubernetes orchestration, API gateways, event queues, and automated deployments.",
        lessons: [
          {
            id: "cloud-l2",
            slug: "kubernetes-microservices-cicd",
            title: "Kubernetes Deployments, Ingress & CI/CD",
            duration: "55 mins",
            xpReward: 170,
            content: "Kubernetes automates container deployment, self-healing, and scaling. Deployments manage replicated Pods, Services provide stable virtual IPs and load balancing, and Ingress routes external traffic. CI/CD pipelines automate testing, container image building, and canary deployments to clusters.",
            codeExample: {
              language: "yaml",
              code: `# Kubernetes Deployment Manifest\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-service\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: api\n  template:\n    metadata:\n      labels:\n        app: api\n    spec:\n      containers:\n      - name: api\n        image: registry.slrjlearn.in/api:v1.2\n        ports:\n        - containerPort: 3000\n        resources:\n          limits:\n            memory: "256Mi"\n            cpu: "500m"`,
              output: "Kubernetes orchestrator maintains 3 healthy, load-balanced replicas automatically",
              explanation: "Declarative YAML defines desired state; Kubernetes controllers reconcile active state to match."
            },
            commonMistakes: [
              {
                wrong: "Omitting CPU and memory limits in Kubernetes container specs",
                correct: "Always define resource requests and limits for every container",
                reason: "Without resource limits, memory leaks in a single container can crash entire cluster worker nodes."
              }
            ],
            keyTakeaways: [
              "Kubernetes provides automated rollouts, rollbacks, and self-healing.",
              "CI/CD pipelines automate quality gates, testing, and production deployments."
            ],
            exercise: {
              id: "cloud-ex-2",
              type: "multiple-choice",
              prompt: "Which Kubernetes object defines how traffic from outside the cluster is routed to internal services?",
              options: ["ConfigMap", "Ingress", "DaemonSet", "PersistentVolume"],
              correctAnswer: 1,
              explanation: "An Ingress controller manages external HTTP/HTTPS routing and TLS termination into internal services.",
              hint: "Ingress."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "cloud-pdf-1",
        title: "Cloud-Native, Docker & Kubernetes Engineering Handbook",
        description: "Production guide to containerization, microservices communication, Kubernetes, and CI/CD pipelines.",
        moduleTitle: "Cloud Architecture",
        fileUrl: "/pdfs/cloud-native-serverless-guide.pdf",
        fileSize: "6.1 MB",
        pageCount: 58,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 21. AI Data Analytics & Business Intelligence
  {
    id: "course-ai-data-analytics-bi",
    slug: "ai-data-analytics-bi",
    aliases: ["data-analytics-business-intelligence", "ai-analytics-mastery"],
    title: "AI Data Analytics & Business Intelligence: Dashboards to Predictive Insights",
    description: "Transform raw data into strategic business decisions using Python, NumPy, Pandas, SQL for analytics, data visualization, Power BI, and modern AI-assisted querying and automated reporting.",
    shortDescription: "Master Python data analysis, Pandas, SQL analytics, Power BI dashboards, and AI-assisted business reporting.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Data Analytics",
    difficulty: "Advanced",
    estimatedDuration: "20 Hours",
    estimatedDurationMinutes: 1200,
    totalLessons: 12,
    totalXp: 1650,
    icon: "📊",
    color: "from-amber-600 to-rose-900",
    skills: ["Data Analytics", "Pandas & NumPy", "SQL for Analytics", "Power BI", "Data Visualization", "AI Querying"],
    skillsGained: [
      "Process, clean, transform, and aggregate structured datasets using Python and Pandas",
      "Write advanced analytical SQL queries with Window Functions, CTEs, and cohorts",
      "Build informative, publication-grade data visualizations with Seaborn and Plotly",
      "Design interactive executive business intelligence dashboards with Power BI",
      "Leverage AI text-to-SQL assistants to query large data warehouses autonomously",
      "Translate quantitative statistical insights into actionable commercial strategies"
    ],
    prerequisites: ["Basic familiarity with spreadsheets or introductory Python"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-28T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "da-mod-1",
        title: "Python for Data Analysis: NumPy, Pandas & SQL",
        description: "Data frames, data cleaning, statistical summarization, and analytical SQL.",
        lessons: [
          {
            id: "da-l1",
            slug: "pandas-numpy-data-cleaning",
            title: "Pandas DataFrames, Data Cleaning & Transformations",
            duration: "45 mins",
            xpReward: 140,
            content: "Pandas is the bedrock of Python data analytics. DataFrames provide columnar memory representations with vectorized computations. Data analysts spend up to 80% of their time cleaning dirty data: handling missing values, standardizing dates, pivoting, and deduplicating records.",
            codeExample: {
              language: "python",
              code: `import pandas as pd\n\n# Load and clean customer analytics dataset\ndf = pd.DataFrame({\n    "customer_id": [101, 102, 103, 104],\n    "churned": [False, True, False, False],\n    "monthly_spend": [120.50, 45.00, 210.00, None]\n})\n\n# Impute missing values with median\nmedian_spend = df["monthly_spend"].median()\ndf["monthly_spend"] = df["monthly_spend"].fillna(median_spend)\n\n# Aggregation summary\nsummary = df.groupby("churned")["monthly_spend"].mean()\nprint(summary)`,
              output: "churned\nFalse    150.25\nTrue      45.00\nName: monthly_spend, dtype: float64",
              explanation: "Groupby computes segment averages quickly, revealing churn patterns in customer spend."
            },
            commonMistakes: [
              {
                wrong: "Iterating through DataFrame rows with for loops (iterrows)",
                correct: "Use vectorized operations or df.apply()",
                reason: "Vectorized operations run in compiled C/Fortran code, executing hundreds of times faster than Python loops."
              }
            ],
            keyTakeaways: [
              "Always inspect data distributions and missing values with df.info() and df.describe().",
              "Vectorized operations leverage SIMD CPU hardware for extreme computational speed."
            ],
            exercise: {
              id: "da-ex-1",
              type: "multiple-choice",
              prompt: "Which Pandas method returns summary statistics (mean, std, min, max, percentiles) for numerical columns?",
              options: ["df.summary()", "df.describe()", "df.stats()", "df.inspect()"],
              correctAnswer: 1,
              explanation: "df.describe() generates comprehensive descriptive statistics for all numerical features.",
              hint: "Describe."
            }
          }
        ]
      },
      {
        id: "da-mod-2",
        title: "Dashboards, Power BI & AI-Assisted Business Intelligence",
        description: "Visual storytelling, Power BI data modeling, DAX, and AI natural-language querying.",
        lessons: [
          {
            id: "da-l2",
            slug: "powerbi-ai-analytics-dashboards",
            title: "Interactive Dashboards & AI-Powered Querying",
            duration: "55 mins",
            xpReward: 170,
            content: "Business Intelligence transforms complex datasets into clear visual dashboards. Modern BI tools integrate with AI models for text-to-SQL generation, automated anomaly detection, and natural language query generation, enabling non-technical stakeholders to query real-time enterprise metrics.",
            codeExample: {
              language: "python",
              code: `# AI-assisted automated anomaly reporting snippet:\ndef detect_revenue_anomalies(df, threshold=2.0):\n    mean = df['revenue'].mean()\n    std = df['revenue'].std()\n    df['z_score'] = (df['revenue'] - mean) / std\n    anomalies = df[df['z_score'].abs() > threshold]\n    return anomalies[['date', 'revenue', 'z_score']]\n\nprint("Automated anomaly detection pipeline configured.")`,
              output: "Automated anomaly detection pipeline configured.",
              explanation: "Statistical Z-scores flag significant revenue variations for automated reporting."
            },
            commonMistakes: [
              {
                wrong: "Overcrowding dashboards with dozens of complex 3D charts",
                correct: "Focus on 4-6 high-impact KPIs aligned with business objectives using clean 2D charts",
                reason: "Cluttered dashboards create cognitive overload and obscure critical executive insights."
              }
            ],
            keyTakeaways: [
              "Every chart should drive a specific business decision.",
              "AI accelerates data extraction by converting natural language prompts into precise SQL queries."
            ],
            exercise: {
              id: "da-ex-2",
              type: "multiple-choice",
              prompt: "In business intelligence dashboards, what metric best summarizes high-level performance at a glance?",
              options: ["Raw database logs", "Key Performance Indicator (KPI) cards", "Full unpivoted tables", "Scatterplot matrices"],
              correctAnswer: 1,
              explanation: "KPI summary cards highlight essential targets (revenue, retention, growth) immediately.",
              hint: "KPI."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "da-pdf-1",
        title: "AI Data Analytics & Business Intelligence Handbook",
        description: "Complete guide to Pandas data wrangling, SQL analytics, visualization, and executive Power BI dashboards.",
        moduleTitle: "Data Analytics Core",
        fileUrl: "/pdfs/ai-data-analytics-bi-guide.pdf",
        fileSize: "5.5 MB",
        pageCount: 54,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  }
];
