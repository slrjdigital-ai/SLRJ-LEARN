import { Course } from "./types";

export const DSA_AND_TOOLS_COURSES: Course[] = [
  // 5. Data Structures & Algorithms
  {
    id: "course-dsa-algorithms",
    slug: "data-structures-and-algorithms",
    aliases: ["dsa-essentials", "data-structures-and-algorithms-production"],
    title: "Data Structures & Algorithms in Production",
    description: "Master algorithmic problem solving, time and space complexity (Big-O), arrays, linked lists, hash tables, trees, graphs, dynamic programming, and technical interview mastery.",
    shortDescription: "Master algorithmic problem solving, Big-O analysis, trees, graphs, recursion, and dynamic programming.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    estimatedDuration: "30 Hours",
    estimatedDurationMinutes: 1800,
    totalLessons: 14,
    totalXp: 2200,
    icon: "🧩",
    color: "from-purple-700 to-indigo-950",
    skills: ["Big-O Complexity", "Linked Lists", "Trees & Graphs", "Hashing", "Dynamic Programming", "Algorithms"],
    skillsGained: [
      "Analyze time and memory complexity accurately using Big-O, Big-Omega, and Big-Theta notation",
      "Implement fundamental linear structures: dynamic arrays, linked lists, stacks, and queues",
      "Master collision resolution and sliding window techniques using Hash Maps",
      "Traverse trees and graphs using BFS, DFS, Dijkstra, and Topological Sort",
      "Solve complex optimization problems with Greedy Algorithms and Dynamic Programming",
      "Crack FAANG and top-tier technical interviews with structured patterns"
    ],
    prerequisites: ["Proficiency in at least one language (C, C++, Java, Python, or TypeScript)"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-03-02T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "dsa-mod-1",
        title: "Complexity Analysis & Core Linear Structures",
        description: "Big-O notation, arrays, strings, linked lists, stacks, and queues.",
        lessons: [
          {
            id: "dsa-l1",
            slug: "dsa-complexity-arrays",
            title: "Time & Space Complexity & Dynamic Arrays",
            duration: "50 mins",
            xpReward: 160,
            content: "Asymptotic analysis quantifies how algorithm resource consumption scales relative to input size N. Dynamic arrays provide O(1) indexed lookups and amortized O(1) appends by doubling backing capacity when full.",
            codeExample: {
              language: "typescript",
              code: `// Two-Pointer Technique: Reverse string in-place O(N) time, O(1) space\nfunction reverseArray<T>(arr: T[]): void {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    const temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    left++;\n    right--;\n  }\n}\n\nconst nums = [1, 2, 3, 4, 5];\nreverseArray(nums);\nconsole.log(nums); // [5, 4, 3, 2, 1]`,
              output: "[5, 4, 3, 2, 1]",
              explanation: "Two pointers converging from ends accomplish an in-place inversion in O(N/2) swaps."
            },
            commonMistakes: [
              {
                wrong: "Assuming array insertion at index 0 is O(1)",
                correct: "Recognize inserting at index 0 requires shifting all N elements (O(N) time)",
                reason: "Contiguous arrays must preserve consecutive memory address order."
              }
            ],
            keyTakeaways: [
              "O(1) is constant, O(log N) is logarithmic, O(N) is linear, and O(N^2) is quadratic.",
              "Amortized analysis measures the average time per operation over a long sequence."
            ],
            exercise: {
              id: "dsa-ex-1",
              type: "multiple-choice",
              prompt: "What is the worst-case time complexity of searching an element in an unsorted array of size N?",
              options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
              correctAnswer: 2,
              explanation: "In an unsorted array, linear search must examine every element in the worst case (O(N)).",
              hint: "Linear time."
            }
          }
        ]
      },
      {
        id: "dsa-mod-2",
        title: "Trees, Graphs & Dynamic Programming",
        description: "Binary search trees, graph traversals, and dynamic programming memoization.",
        lessons: [
          {
            id: "dsa-l2",
            slug: "dsa-graphs-dynamic-programming",
            title: "Graph Traversal (BFS/DFS) & Dynamic Programming",
            duration: "60 mins",
            xpReward: 200,
            content: "Graphs model networks of interconnected nodes. Breadth-First Search (BFS) finds shortest paths in unweighted graphs using a Queue, while Depth-First Search (DFS) explores deep paths with a Stack or recursion. Dynamic Programming breaks complex problems into overlapping subproblems with optimal substructure.",
            codeExample: {
              language: "typescript",
              code: `// Dynamic Programming: Fibonacci with Memoization O(N) time, O(N) space\nfunction fibMemo(n: number, memo: Record<number, number> = {}): number {\n  if (n <= 1) return n;\n  if (memo[n] !== undefined) return memo[n];\n  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n  return memo[n];\n}\n\nconsole.log("Fib(40):", fibMemo(40));`,
              output: "Fib(40): 102334155",
              explanation: "Memoization caches computed subproblems, collapsing O(2^N) recursion into linear O(N) execution."
            },
            commonMistakes: [
              {
                wrong: "Forgetting to track visited nodes in graph traversals",
                correct: "Maintain a Set of visited node IDs",
                reason: "Cyclic graphs cause infinite traversal loops unless visited vertices are tracked."
              }
            ],
            keyTakeaways: [
              "BFS uses a Queue; DFS uses a Stack or recursion.",
              "DP applies when subproblems overlap and possess optimal substructure."
            ],
            exercise: {
              id: "dsa-ex-2",
              type: "multiple-choice",
              prompt: "Which data structure is standard for implementing Breadth-First Search (BFS)?",
              options: ["Stack", "Queue", "Priority Queue", "Hash Map"],
              correctAnswer: 1,
              explanation: "BFS explores level by level using a FIFO Queue.",
              hint: "First-In, First-Out."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "dsa-pdf-1",
        title: "Data Structures & Algorithms Production Handbook",
        description: "Complete algorithmic patterns guide: two pointers, sliding window, binary search, graphs, and DP.",
        moduleTitle: "Algorithms Core",
        fileUrl: "/pdfs/dsa-essentials.pdf",
        fileSize: "7.2 MB",
        pageCount: 72,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 6. Git & GitHub
  {
    id: "course-git-github",
    slug: "git-github",
    aliases: ["software-engineering-career-devops", "git-mastery"],
    title: "Git & GitHub: Professional Version Control & Collaboration",
    description: "Master distributed version control, branching strategies, commit history hygiene, interactive rebase, pull request reviews, merge conflict resolution, and GitHub Actions CI/CD.",
    shortDescription: "Master Git version control, branching, merge conflict resolution, GitHub pull requests, and CI/CD workflows.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Tools & Developer Workflow",
    difficulty: "Beginner",
    estimatedDuration: "14 Hours",
    estimatedDurationMinutes: 840,
    totalLessons: 10,
    totalXp: 1300,
    icon: "🐙",
    color: "from-stone-700 to-slate-900",
    skills: ["Git CLI", "GitHub Workflows", "Branching Strategies", "Rebase & Merge", "Conflict Resolution", "Open Source"],
    skillsGained: [
      "Understand the Git internal object model (Blobs, Trees, Commits, Tags)",
      "Branch, stash, cherry-pick, and merge code with zero data loss",
      "Resolve complex three-way merge conflicts with confidence",
      "Rewrite and curate clean commit history using interactive rebase (git rebase -i)",
      "Create professional GitHub Pull Requests with automated checks and reviews",
      "Contribute effectively to open-source software repositories"
    ],
    prerequisites: ["Basic command line navigation"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-08T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "git-mod-1",
        title: "Repositories, Commits & The Git Object Model",
        description: "Git architecture, working directory, staging area, commit graphs, and inspection.",
        lessons: [
          {
            id: "git-l1",
            slug: "git-architecture-staging",
            title: "Git Architecture: Working Tree, Index & Commits",
            duration: "40 mins",
            xpReward: 120,
            content: "Git is a distributed version control system that stores snapshots of your project. The three trees of Git are: the Working Directory (your local files), the Staging Area / Index (files prepared for the next commit), and the Repository (committed history). Commits are cryptographically verified SHA-1/SHA-256 DAG nodes.",
            codeExample: {
              language: "bash",
              code: `# Initialize a new repository\ngit init\n\n# Stage changes\ngit add index.html style.css\n\n# Create a semantic snapshot commit\ngit commit -m "feat: implement responsive hero navigation bar"\n\n# Inspect status and history\ngit status\ngit log --oneline --graph`,
              output: "* 4a8f9c1 feat: implement responsive hero navigation bar",
              explanation: "git add stages files; git commit permanently writes a commit node to the DAG."
            },
            commonMistakes: [
              {
                wrong: "Committing node_modules or secrets to git repositories",
                correct: "Always create a .gitignore file before your initial commit",
                reason: "Once committed, files remain in repository history even after local deletion."
              }
            ],
            keyTakeaways: [
              "Git tracks content snapshots, not file diffs.",
              "Semantic commit messages (feat:, fix:, chore:) maintain team clarity."
            ],
            exercise: {
              id: "git-ex-1",
              type: "multiple-choice",
              prompt: "Which command moves changes from the working directory into the staging area?",
              options: ["git commit", "git push", "git add", "git stage-now"],
              correctAnswer: 2,
              explanation: "git add stages modified or new files into the index ready for commit.",
              hint: "Command name is 'add'."
            }
          }
        ]
      },
      {
        id: "git-mod-2",
        title: "Branching, Rebasing & Conflict Resolution",
        description: "Feature branches, interactive rebasing, merge conflicts, and GitHub collaboration.",
        lessons: [
          {
            id: "git-l2",
            slug: "git-branching-rebase-conflicts",
            title: "Branching, Interactive Rebase & Conflict Resolution",
            duration: "50 mins",
            xpReward: 150,
            content: "Branches are lightweight moveable pointers to commits. Merging combines branches by creating a merge commit, while rebasing replays your branch commits on top of another base, creating a linear project history. Conflicts happen when two branches modify the same line; Git stops and asks the developer to choose the correct content.",
            codeExample: {
              language: "bash",
              code: `# Create and switch to a feature branch\ngit checkout -b feature/auth-system\n\n# Rebase feature branch on updated main\ngit fetch origin\ngit rebase origin/main\n\n# If conflict occurs: resolve conflict markers, then:\ngit add auth.ts\ngit rebase --continue`,
              output: "Successfully rebased and updated refs/heads/feature/auth-system.",
              explanation: "Rebasing creates a clean, linear git commit log without cluttered merge commits."
            },
            commonMistakes: [
              {
                wrong: "Rebasing public branches that other developers are actively working on",
                correct: "Only rebase local, unpushed feature branches (The Golden Rule of Rebasing)",
                reason: "Rebasing rewrites commit SHA hashes, forcing other developers into divergent histories."
              }
            ],
            keyTakeaways: [
              "Never rebase shared public branches like main or master.",
              "Resolve merge conflicts manually by editing conflict markers (<<<<<<<, =======, >>>>>>>)."
            ],
            exercise: {
              id: "git-ex-2",
              type: "multiple-choice",
              prompt: "What is the key danger of rebasing a public shared branch?",
              options: [
                "It deletes repository files permanently",
                "It rewrites commit history and SHAs, breaking collaborator branches",
                "It locks the repository against further commits",
                "It converts text files to binary"
              ],
              correctAnswer: 1,
              explanation: "Rebasing generates brand new commit hashes, diverging from other developers' local branches.",
              hint: "Rewriting history."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "git-pdf-1",
        title: "Professional Git & GitHub Collaboration Guide",
        description: "Complete visual guide to the Git object model, interactive rebase, and open source pull requests.",
        moduleTitle: "Git Mastery",
        fileUrl: "/pdfs/git-github-guide.pdf",
        fileSize: "4.5 MB",
        pageCount: 44,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 18. AI-Assisted Coding & Developer Tools
  {
    id: "course-ai-assisted-coding",
    slug: "ai-assisted-coding",
    aliases: ["ai-developer-tools", "copilot-cursor-mastery"],
    title: "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    description: "Learn how modern software engineers 10x their productivity using AI coding assistants in IDEs (Cursor, Copilot, Antigravity), writing high-context prompts, generating tests, automated refactoring, and verifying AI code for security.",
    shortDescription: "Master AI coding assistants in IDEs, context prompting, automated refactoring, test generation, and security verification.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Tools & Developer Workflow",
    difficulty: "Beginner",
    estimatedDuration: "16 Hours",
    estimatedDurationMinutes: 960,
    totalLessons: 10,
    totalXp: 1450,
    icon: "🤖",
    color: "from-blue-700 to-violet-950",
    skills: ["AI Coding Assistants", "Context Prompting", "Automated Refactoring", "Test Generation", "Code Security Review", "AI Workflows"],
    skillsGained: [
      "Configure and maximize modern AI coding tools in VS Code, Cursor, and terminal environments",
      "Formulate precise, high-context prompts that eliminate hallucinations in code generation",
      "Direct AI assistants to debug complex stack traces and root causes interactively",
      "Perform architectural refactorings and apply design patterns with AI pair-programming",
      "Generate comprehensive unit and integration test suites with edge cases",
      "Audit AI-generated code for security flaws, dependency vulnerabilities, and license compliance"
    ],
    prerequisites: ["Basic familiarity with any programming language (Python, JavaScript, or C)"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-03-25T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "aic-mod-1",
        title: "AI-Assisted Development Fundamentals & IDE Setup",
        description: "Capabilities, limitations, configuring coding assistants, and context windows.",
        lessons: [
          {
            id: "aic-l1",
            slug: "ai-coding-fundamentals-setup",
            title: "AI Coding Assistant Mechanics & IDE Setup",
            duration: "40 mins",
            xpReward: 130,
            content: "AI coding assistants use Large Language Models trained on massive code corpora to autocomplete, synthesize, and refactor software. Understanding context windows, model temperature, and file indexing allows you to feed the exact architectural constraints needed for optimal code generation.",
            codeExample: {
              language: "markdown",
              code: `<!-- High-Context Prompting Example for AI Coding Assistants -->\nTask: Implement an idempotent rate-limiter middleware in TypeScript.\nFramework: Express.js\nStorage: Redis via ioredis\nRequirements:\n- Limit: 100 requests per 15 minutes per IP\n- Return HTTP 429 with Retry-After header on breach\n- Handle Redis connection drops gracefully with fail-open policy\n- Include comprehensive Vitest unit tests`,
              output: "Generates production-grade, tested, error-resilient middleware",
              explanation: "Providing explicit constraints and error-handling expectations prevents generic boilerplate."
            },
            commonMistakes: [
              {
                wrong: "Bluntly accepting AI-suggested code without reading and verifying logic",
                correct: "Treat AI like a brilliant junior pair-programmer: always review and verify every line",
                reason: "AI can generate subtle edge-case bugs or hallucinated library methods."
              }
            ],
            keyTakeaways: [
              "Specific constraints produce 10x better code than vague questions.",
              "Always feed relevant type definitions and interfaces in the context window."
            ],
            exercise: {
              id: "aic-ex-1",
              type: "multiple-choice",
              prompt: "What is the single most critical practice when using AI-generated code in production software?",
              options: [
                "Thorough human code review and automated test verification",
                "Accepting all completions to maximize typing speed",
                "Disabling linters to avoid syntax friction",
                "Hiding AI usage from version control"
              ],
              correctAnswer: 0,
              explanation: "Human code review and rigorous test verification ensure correctness, security, and maintainability.",
              hint: "Verification is key."
            }
          }
        ]
      },
      {
        id: "aic-mod-2",
        title: "Refactoring, Test Generation & Security Auditing",
        description: "Automated test generation, debugging workflows, and auditing AI code for vulnerabilities.",
        lessons: [
          {
            id: "aic-l2",
            slug: "ai-refactoring-tests-security",
            title: "Automated Test Generation & Security Review",
            duration: "50 mins",
            xpReward: 160,
            content: "AI assistants excel at test suite generation because tests follow rigorous input/output patterns. You can prompt AI to discover edge cases (null inputs, boundary limits, concurrency races). Crucially, developers must audit generated code against OWASP vulnerabilities and insecure defaults.",
            codeExample: {
              language: "typescript",
              code: `// Prompting for unit tests with edge-cases:\n// AI generates complete Vitest suite:\ndescribe("calculateDiscount", () => {\n  it("applies standard percentage discount", () => {\n    expect(calculateDiscount(100, 20)).toBe(80);\n  });\n  it("throws error on negative price", () => {\n    expect(() => calculateDiscount(-10, 10)).toThrow("Invalid price");\n  });\n  it("handles 100% discount boundary", () => {\n    expect(calculateDiscount(50, 100)).toBe(0);\n  });\n});`,
              output: "3 passing tests covering standard, boundary, and error cases",
              explanation: "Directing AI to specifically cover edge cases boosts test coverage dramatically."
            },
            commonMistakes: [
              {
                wrong: "Allowing AI to introduce unvetted third-party packages with security vulnerabilities",
                correct: "Verify all imported package names against the npm/PyPI registry before installation",
                reason: "AI hallucination can invent packages, opening package-hallucination attack vectors."
              }
            ],
            keyTakeaways: [
              "AI accelerates writing unit, integration, and end-to-end tests.",
              "Always check for hardcoded secrets, SQL injection, or unvalidated inputs in AI code."
            ],
            exercise: {
              id: "aic-ex-2",
              type: "multiple-choice",
              prompt: "What risk occurs if an AI assistant suggests an imported package that does not actually exist?",
              options: [
                "Package Hallucination vulnerability (potential supply chain exploit)",
                "Buffer Overflow",
                "Automatic compiler upgrade",
                "Infinite loop"
              ],
              correctAnswer: 0,
              explanation: "Attackers can register hallucinated package names on public registries to distribute malware.",
              hint: "Package Hallucination."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "aic-pdf-1",
        title: "AI-Assisted Software Engineering Handbook",
        description: "Master context prompting, Cursor & Copilot workflows, and security auditing for AI code.",
        moduleTitle: "AI Developer Workflows",
        fileUrl: "/pdfs/ai-assisted-coding-handbook.pdf",
        fileSize: "4.9 MB",
        pageCount: 46,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  }
];
