export interface AssessmentQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false";
  options: string[];
  correctAnswer: number; // Index 0..3 (kept on server only)
  explanation: string;
}

export interface CourseAssessment {
  courseId: string;
  courseTitle: string;
  passingPercentage: number; // 80%
  timeLimitMinutes: number;
  questions: AssessmentQuestion[];
}

export const COURSE_ASSESSMENTS: Record<string, CourseAssessment> = {
  // 1. C Programming
  "c-programming": {
    courseId: "c-programming",
    courseTitle: "C Programming: Fundamentals to System Architecture",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-c-1",
        question: "Which preprocessor directive is used to link standard header files in C?",
        type: "multiple-choice",
        options: ["#import", "#include", "#link", "#use"],
        correctAnswer: 1,
        explanation: "#include tells the C preprocessor to insert the contents of the specified header file.",
      },
      {
        id: "q-c-2",
        question: "What is the return type of the 'sizeof' operator in ANSI C?",
        type: "multiple-choice",
        options: ["int", "size_t", "unsigned long long", "float"],
        correctAnswer: 1,
        explanation: "sizeof evaluates to size_t, an unsigned integral data type defined in <stddef.h>.",
      },
      {
        id: "q-c-3",
        question: "True or False: In C, arrays are passed to functions by passing a pointer to their first element.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Arrays decay into pointers to their first element when passed as function arguments.",
      },
      {
        id: "q-c-4",
        question: "Which function allocates uninitialized heap memory in C?",
        type: "multiple-choice",
        options: ["calloc()", "malloc()", "realloc()", "alloc()"],
        correctAnswer: 1,
        explanation: "malloc() allocates raw uninitialized bytes on the heap.",
      },
      {
        id: "q-c-5",
        question: "Which operator is used to access struct members through a pointer?",
        type: "multiple-choice",
        options: [".", "->", "::", "@"],
        correctAnswer: 1,
        explanation: "The arrow operator (->) dereferences the pointer and accesses the specified member.",
      },
    ],
  },
  "course-c-programming": {
    courseId: "course-c-programming",
    courseTitle: "C Programming: Fundamentals to System Architecture",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-c-1",
        question: "Which preprocessor directive is used to link standard header files in C?",
        type: "multiple-choice",
        options: ["#import", "#include", "#link", "#use"],
        correctAnswer: 1,
        explanation: "#include tells the C preprocessor to insert the contents of the specified header file.",
      },
      {
        id: "q-c-2",
        question: "What is the return type of the 'sizeof' operator in ANSI C?",
        type: "multiple-choice",
        options: ["int", "size_t", "unsigned long long", "float"],
        correctAnswer: 1,
        explanation: "sizeof evaluates to size_t, an unsigned integral data type defined in <stddef.h>.",
      },
      {
        id: "q-c-3",
        question: "True or False: In C, arrays are passed to functions by passing a pointer to their first element.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Arrays decay into pointers to their first element when passed as function arguments.",
      },
      {
        id: "q-c-4",
        question: "Which function allocates uninitialized heap memory in C?",
        type: "multiple-choice",
        options: ["calloc()", "malloc()", "realloc()", "alloc()"],
        correctAnswer: 1,
        explanation: "malloc() allocates raw uninitialized bytes on the heap.",
      },
      {
        id: "q-c-5",
        question: "Which operator is used to access struct members through a pointer?",
        type: "multiple-choice",
        options: [".", "->", "::", "@"],
        correctAnswer: 1,
        explanation: "The arrow operator (->) dereferences the pointer and accesses the specified member.",
      },
    ],
  },

  // 2. Python Programming
  "python-programming": {
    courseId: "python-programming",
    courseTitle: "Python Programming: Zero to Production Mastery",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-py-1",
        question: "Which of the following data types in Python is immutable?",
        type: "multiple-choice",
        options: ["List", "Dictionary", "Tuple", "Set"],
        correctAnswer: 2,
        explanation: "Tuples cannot be altered, appended, or mutated after creation, making them immutable and hashable.",
      },
      {
        id: "q-py-2",
        question: "What is the purpose of the '__init__' method in a Python class?",
        type: "multiple-choice",
        options: ["To destroy an object", "To initialize instance state upon creation", "To compile bytecode", "To import modules"],
        correctAnswer: 1,
        explanation: "__init__ acts as the constructor initializing instance attributes.",
      },
      {
        id: "q-py-3",
        question: "True or False: A list comprehension [x*2 for x in nums] runs in compiled C bytecode and is generally faster than an explicit append loop.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "List comprehensions optimize loop overhead in Python bytecode, executing significantly faster.",
      },
      {
        id: "q-py-4",
        question: "Which keyword is used to handle exceptions in Python?",
        type: "multiple-choice",
        options: ["catch", "except", "rescue", "handle"],
        correctAnswer: 1,
        explanation: "Python uses 'try' and 'except' blocks for exception handling.",
      },
      {
        id: "q-py-5",
        question: "What statement is used to ensure system resources are safely closed with context managers?",
        type: "multiple-choice",
        options: ["using", "with", "open-lock", "defer"],
        correctAnswer: 1,
        explanation: "The 'with' statement invokes __enter__ and __exit__ to guarantee deterministic cleanup.",
      },
    ],
  },

  // 3. JavaScript & TypeScript
  "javascript-typescript": {
    courseId: "javascript-typescript",
    courseTitle: "JavaScript & TypeScript: Enterprise Modern Web Core",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-js-1",
        question: "What is the primary difference between 'let' and 'var' declarations in JavaScript?",
        type: "multiple-choice",
        options: [
          "'let' is block-scoped; 'var' is function-scoped",
          "'let' is hoisted to global scope; 'var' is not",
          "'var' cannot be reassigned",
          "There is no difference in ES6"
        ],
        correctAnswer: 0,
        explanation: "'let' binds strictly to enclosing curly-brace blocks, avoiding variable leakage.",
      },
      {
        id: "q-js-2",
        question: "In the JavaScript Event Loop, which queue executes before the Macrotask queue?",
        type: "multiple-choice",
        options: ["Microtask queue", "Animation frame queue", "Timer heap", "I/O queue"],
        correctAnswer: 0,
        explanation: "Promises and queueMicrotask drain completely before the event loop advances to macrotasks.",
      },
      {
        id: "q-js-3",
        question: "What does the TypeScript 'unknown' type enforce compared to 'any'?",
        type: "multiple-choice",
        options: [
          "Type checking and narrowing before accessing properties",
          "Automatic casting to string",
          "Disabling all compiler errors",
          "Execution on web workers only"
        ],
        correctAnswer: 0,
        explanation: "'unknown' is the type-safe counterpart of any, requiring runtime type checks before usage.",
      },
      {
        id: "q-js-4",
        question: "Which TypeScript feature allows creating reusable components that work over a variety of types rather than a single one?",
        type: "multiple-choice",
        options: ["Generics", "Namespaces", "Enums", "Decorators"],
        correctAnswer: 0,
        explanation: "Generics (<T>) parameterized types enable type-safe, reusable data structures and algorithms.",
      },
    ],
  },

  // 4. HTML & CSS
  "html-css": {
    courseId: "html-css",
    courseTitle: "HTML & CSS: Responsive Architecture & Design Systems",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-hc-1",
        question: "Which HTML5 semantic element is most appropriate for primary site navigation?",
        type: "multiple-choice",
        options: ["<menu>", "<nav>", "<header>", "<section>"],
        correctAnswer: 1,
        explanation: "<nav> is specifically designated for major navigation link groups.",
      },
      {
        id: "q-hc-2",
        question: "Which CSS property aligns flex items along the cross axis in Flexbox?",
        type: "multiple-choice",
        options: ["justify-content", "align-items", "flex-wrap", "content-align"],
        correctAnswer: 1,
        explanation: "align-items distributes items along the cross axis (perpendicular to flex-direction).",
      },
      {
        id: "q-hc-3",
        question: "True or False: 'box-sizing: border-box' includes padding and border within the specified width and height.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "border-box ensures declared dimensions encapsulate content, padding, and borders.",
      },
      {
        id: "q-hc-4",
        question: "Which CSS layout model is optimal for complex, two-dimensional grid layouts?",
        type: "multiple-choice",
        options: ["CSS Grid", "CSS Flexbox", "CSS Float", "CSS Multi-Column"],
        correctAnswer: 0,
        explanation: "CSS Grid is a 2D layout engine governing rows and columns simultaneously.",
      },
    ],
  },

  // 5. Data Structures & Algorithms
  "data-structures-and-algorithms": {
    courseId: "data-structures-and-algorithms",
    courseTitle: "Data Structures & Algorithms in Production",
    passingPercentage: 80,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "q-dsa-1",
        question: "What is the average time complexity of lookups in a well-balanced Hash Map?",
        type: "multiple-choice",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctAnswer: 0,
        explanation: "Hash maps compute index positions via hash functions, achieving O(1) constant time lookups on average.",
      },
      {
        id: "q-dsa-2",
        question: "Which traversal explores graph neighbors layer by layer using a FIFO Queue?",
        type: "multiple-choice",
        options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Binary Search", "Topological Sort"],
        correctAnswer: 1,
        explanation: "BFS explores level by level using a Queue, guaranteeing shortest paths on unweighted graphs.",
      },
      {
        id: "q-dsa-3",
        question: "What two properties must a problem have for Dynamic Programming to apply?",
        type: "multiple-choice",
        options: [
          "Overlapping subproblems and optimal substructure",
          "Linear time and constant memory",
          "Sorting and binary searching",
          "Greedy choice and recursion only"
        ],
        correctAnswer: 0,
        explanation: "DP is applicable when solutions to subproblems overlap and can be cached to build optimal global solutions.",
      },
    ],
  },

  // 6. Git & GitHub
  "git-github": {
    courseId: "git-github",
    courseTitle: "Git & GitHub: Professional Version Control & Collaboration",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-git-1",
        question: "Which command moves changes from the working tree to the staging area?",
        type: "multiple-choice",
        options: ["git commit", "git add", "git checkout", "git push"],
        correctAnswer: 1,
        explanation: "git add stages changes in the index ready for the next commit.",
      },
      {
        id: "q-git-2",
        question: "What does the command 'git rebase -i' allow a developer to do?",
        type: "multiple-choice",
        options: [
          "Interactively rewrite, squash, reorder, or edit commits in history",
          "Delete the remote repository",
          "Create a new remote branch",
          "Compile code automatically"
        ],
        correctAnswer: 0,
        explanation: "Interactive rebase allows squashing, rewording, and restructuring local commit history.",
      },
      {
        id: "q-git-3",
        question: "True or False: You should never rebase a public shared branch like 'main'.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Rebasing rewrites commit SHA hashes, causing divergence for all collaborators sharing that branch.",
      },
    ],
  },

  // 7. Generative AI & Large Language Models (LLMs)
  "generative-ai-llms": {
    courseId: "generative-ai-llms",
    courseTitle: "Generative AI & Large Language Models (LLMs): Enterprise Architectures",
    passingPercentage: 80,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "q-llm-1",
        question: "What fundamental mechanism enables Transformers to process all tokens in a prompt in parallel?",
        type: "multiple-choice",
        options: ["Self-Attention", "Recurrent Hidden State", "Convolutional Stride", "Markov Chains"],
        correctAnswer: 0,
        explanation: "Self-attention computes dynamic attention weights between all token pairs simultaneously.",
      },
      {
        id: "q-llm-2",
        question: "What is the primary role of a Vector Database in a RAG architecture?",
        type: "multiple-choice",
        options: [
          "Index and retrieve dense embedding vectors via nearest-neighbor similarity search",
          "Execute Python scripts",
          "Store audio files only",
          "Replace SQL transactions"
        ],
        correctAnswer: 0,
        explanation: "Vector databases perform k-NN semantic search over high-dimensional text embeddings.",
      },
      {
        id: "q-llm-3",
        question: "What does 'Hallucination' refer to in the context of Large Language Models?",
        type: "multiple-choice",
        options: [
          "Generating factually inaccurate or unsubstantiated information with high confidence",
          "Crashing the GPU memory buffer",
          "Encoding images into text",
          "Translating between languages"
        ],
        correctAnswer: 0,
        explanation: "Hallucination is generating plausible-sounding but factually fabricated responses.",
      },
    ],
  },

  // 8. C++ Programming
  "cpp-programming": {
    courseId: "cpp-programming",
    courseTitle: "C++ Programming: Modern C++20 & High-Performance Engineering",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-cpp-1",
        question: "What does the RAII idiom stand for in C++ software engineering?",
        type: "multiple-choice",
        options: [
          "Resource Acquisition Is Initialization",
          "Runtime Allocation In Inheritance",
          "Recursive Algorithms In Iteration",
          "Read Access In Interfaces"
        ],
        correctAnswer: 0,
        explanation: "RAII binds the lifecycle of resources to object scope, ensuring automatic deallocation in destructors.",
      },
      {
        id: "q-cpp-2",
        question: "Which smart pointer in modern C++ represents exclusive, non-copyable ownership of a heap resource?",
        type: "multiple-choice",
        options: ["std::unique_ptr", "std::shared_ptr", "std::weak_ptr", "std::auto_ptr"],
        correctAnswer: 0,
        explanation: "std::unique_ptr guarantees sole ownership with zero overhead compared to raw pointers.",
      },
      {
        id: "q-cpp-3",
        question: "What is the standard container of choice in modern C++ due to optimal contiguous memory locality?",
        type: "multiple-choice",
        options: ["std::vector", "std::list", "std::deque", "std::forward_list"],
        correctAnswer: 0,
        explanation: "std::vector stores elements contiguously, maximizing CPU L1/L2 cache hit rates.",
      },
    ],
  },

  // 9. Java Programming
  "java-programming": {
    courseId: "java-programming",
    courseTitle: "Java Programming: Core to Enterprise Architecture",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-java-1",
        question: "In Java, what does the '==' operator compare when used between two object references?",
        type: "multiple-choice",
        options: [
          "Memory reference addresses",
          "Character contents",
          "Hash codes",
          "Class types"
        ],
        correctAnswer: 0,
        explanation: "The == operator checks reference identity. Use .equals() for content comparison.",
      },
      {
        id: "q-java-2",
        question: "Which method terminates a Java Stream pipeline and executes the accumulated operations?",
        type: "multiple-choice",
        options: ["Terminal operation (e.g. collect, forEach)", "Intermediate operation (e.g. filter)", "Lazy operation", "Peek operation"],
        correctAnswer: 0,
        explanation: "Terminal operations trigger the lazy execution of the entire stream pipeline.",
      },
      {
        id: "q-java-3",
        question: "True or False: An interface in modern Java (Java 8+) can contain concrete default methods.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Java 8 introduced default methods in interfaces to allow backward-compatible API evolution.",
      },
    ],
  },

  // 10. React & Next.js
  "react-nextjs": {
    courseId: "react-nextjs",
    courseTitle: "React & Next.js: Full-Stack Enterprise Architecture",
    passingPercentage: 80,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "q-next-1",
        question: "What is the primary benefit of React Server Components (RSC) in Next.js App Router?",
        type: "multiple-choice",
        options: [
          "They render on the server and add zero JavaScript to the client bundle",
          "They replace CSS entirely",
          "They allow running native C code in the browser",
          "They eliminate the need for databases"
        ],
        correctAnswer: 0,
        explanation: "RSCs execute exclusively on the server, reducing client bundle size and latency.",
      },
      {
        id: "q-next-2",
        question: "Which directive must be placed at the top of a file to declare a Client Component in Next.js?",
        type: "multiple-choice",
        options: ["'use client';", "'use browser';", "'client-side';", "'export client;'"],
        correctAnswer: 0,
        explanation: "'use client' marks the boundary between Server Components and interactive browser components.",
      },
      {
        id: "q-next-3",
        question: "What feature in Next.js allows executing server-side mutations directly from form submissions without boilerplate API endpoints?",
        type: "multiple-choice",
        options: ["Server Actions ('use server')", "WebSockets", "Redux Thunks", "Client fetchers"],
        correctAnswer: 0,
        explanation: "Server Actions provide type-safe asynchronous RPC functions directly callable from components.",
      },
    ],
  },

  // 11. Node.js & Express
  "nodejs-express": {
    courseId: "nodejs-express",
    courseTitle: "Node.js & Express: Scalable Backend Services & APIs",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-node-1",
        question: "What function must custom Express middleware call to pass execution to the next handler?",
        type: "multiple-choice",
        options: ["next()", "continue()", "forward()", "proceed()"],
        correctAnswer: 0,
        explanation: "Invoking next() passes control down the middleware pipeline.",
      },
      {
        id: "q-node-2",
        question: "True or False: A standard JWT token payload is encrypted and unreadable by clients.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False! JWT payloads are Base64URL-encoded (publicly readable). They are signed, not encrypted.",
      },
      {
        id: "q-node-3",
        question: "Which C library powers asynchronous non-blocking I/O and thread pooling in Node.js?",
        type: "multiple-choice",
        options: ["Libuv", "GLib", "OpenSSL only", "V8 Engine only"],
        correctAnswer: 0,
        explanation: "Libuv provides the event loop, thread pool, and asynchronous file/network I/O in Node.js.",
      },
    ],
  },

  // 12. SQL & MongoDB
  "sql-mongodb": {
    courseId: "sql-mongodb",
    courseTitle: "SQL & MongoDB: Relational & Document Data Architecture",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-db-1",
        question: "Which SQL clause is used to filter aggregated results produced by a GROUP BY statement?",
        type: "multiple-choice",
        options: ["HAVING", "WHERE", "FILTER", "LIMIT"],
        correctAnswer: 0,
        explanation: "HAVING filters groups of aggregated records, whereas WHERE filters individual rows prior to aggregation.",
      },
      {
        id: "q-db-2",
        question: "What is the primary format used by MongoDB to store documents on disk?",
        type: "multiple-choice",
        options: ["BSON (Binary JSON)", "Raw CSV", "XML", "YAML"],
        correctAnswer: 0,
        explanation: "MongoDB stores data as BSON (Binary JSON), extending JSON with datatypes like Date and ObjectId.",
      },
      {
        id: "q-db-3",
        question: "Which indexing structure is commonly used by relational databases to provide O(log N) lookups?",
        type: "multiple-choice",
        options: ["B-Tree", "Linked List", "Binary Heap", "Stack"],
        correctAnswer: 0,
        explanation: "B-Trees balance search, insertion, and range queries across disk blocks efficiently.",
      },
    ],
  },

  // 13. AI & Machine Learning
  "ai-machine-learning": {
    courseId: "ai-machine-learning",
    courseTitle: "AI & Machine Learning: From Mathematics to Production Models",
    passingPercentage: 80,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "q-aiml-1",
        question: "What metric is most appropriate for evaluating a classification model on heavily imbalanced data?",
        type: "multiple-choice",
        options: ["F1-Score / PR-AUC", "Accuracy", "Mean Absolute Error", "R-Squared"],
        correctAnswer: 0,
        explanation: "F1-Score harmonizes precision and recall, preventing deceptive high accuracy on majority classes.",
      },
      {
        id: "q-aiml-2",
        question: "What phenomenon occurs when a model learns training data noise and fails to generalize to unseen test data?",
        type: "multiple-choice",
        options: ["Overfitting (High Variance)", "Underfitting (High Bias)", "Feature Scaling", "Data Leakage"],
        correctAnswer: 0,
        explanation: "Overfitting occurs when high model complexity captures training noise rather than general patterns.",
      },
      {
        id: "q-aiml-3",
        question: "Which algorithm iteratively adjusts neural network weights using gradient descent and the chain rule?",
        type: "multiple-choice",
        options: ["Backpropagation", "Forward Propagation", "K-Means", "PCA"],
        correctAnswer: 0,
        explanation: "Backpropagation calculates loss gradients backwards through layers using calculus chain rules.",
      },
    ],
  },

  // 14. AI Agents & Automation
  "ai-agents-automation": {
    courseId: "ai-agents-automation",
    courseTitle: "AI Agents & Automation: Workflow Orchestration & MCP",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-agta-1",
        question: "What does the ReAct pattern combine in autonomous agent workflows?",
        type: "multiple-choice",
        options: ["Reasoning and Acting in an iterative loop", "React.js and TypeScript", "Recursion and Actions", "Redux and APIs"],
        correctAnswer: 0,
        explanation: "ReAct alternates between cognitive reasoning steps and environmental tool executions.",
      },
      {
        id: "q-agta-2",
        question: "What protocol standardizes tool and resource sharing between AI models and external environments?",
        type: "multiple-choice",
        options: ["Model Context Protocol (MCP)", "HTTP/2 alone", "GraphQL", "SOAP"],
        correctAnswer: 0,
        explanation: "MCP (Model Context Protocol) is an open specification for connecting AI agents to external tools and data.",
      },
    ],
  },

  // 15. Cybersecurity Fundamentals
  "cybersecurity-fundamentals": {
    courseId: "cybersecurity-fundamentals",
    courseTitle: "Cybersecurity Fundamentals: Network Defense & Secure Systems",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-cyb-1",
        question: "What are the three pillars of the CIA Triad in information security?",
        type: "multiple-choice",
        options: [
          "Confidentiality, Integrity, and Availability",
          "Control, Inspection, and Authorization",
          "Cryptography, Internet, and Authentication",
          "Compliance, Identity, and Access"
        ],
        correctAnswer: 0,
        explanation: "Confidentiality (privacy), Integrity (accuracy), and Availability (accessibility) form the core triad.",
      },
      {
        id: "q-cyb-2",
        question: "Which technique is the proven defense against SQL Injection attacks?",
        type: "multiple-choice",
        options: [
          "Parameterized queries (Prepared Statements)",
          "Frontend character counters",
          "Hiding database table names",
          "Changing port numbers"
        ],
        correctAnswer: 0,
        explanation: "Parameterized statements separate SQL syntax from user data, preventing arbitrary code injection.",
      },
      {
        id: "q-cyb-3",
        question: "Which protocol provides encrypted HTTP communications using TLS/SSL?",
        type: "multiple-choice",
        options: ["HTTPS", "HTTP", "FTP", "SNMP"],
        correctAnswer: 0,
        explanation: "HTTPS encrypts transport traffic using TLS/SSL to prevent eavesdropping and tampering.",
      },
    ],
  },

  // 16. AI Agents & Agentic AI
  "agentic-ai-autonomous-systems": {
    courseId: "agentic-ai-autonomous-systems",
    courseTitle: "AI Agents & Agentic AI: Autonomous Workflows & Multi-Agent Systems",
    passingPercentage: 80,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "q-agnt-1",
        question: "What is the defining capability that separates Agentic AI from a passive chatbot?",
        type: "multiple-choice",
        options: [
          "Autonomous planning, tool calling, environmental feedback, and self-correction toward a goal",
          "Higher streaming speed",
          "Larger font sizes",
          "Pre-rendered HTML output"
        ],
        correctAnswer: 0,
        explanation: "Agentic AI exhibits agency: planning tasks, invoking external tools, observing results, and iterating autonomously.",
      },
      {
        id: "q-agnt-2",
        question: "In multi-agent systems, what is the role of a Supervisor Agent?",
        type: "multiple-choice",
        options: [
          "Decompose goals, delegate tasks to specialized worker agents, and review final outputs",
          "Format CSS code",
          "Store database backups",
          "Generate token embeddings"
        ],
        correctAnswer: 0,
        explanation: "The supervisor agent acts as an orchestrator directing tasks among specialized subagents.",
      },
    ],
  },

  // 17. Generative AI & LLM Application Development
  "genai-llm-application-development": {
    courseId: "genai-llm-application-development",
    courseTitle: "Generative AI & LLM Application Development: Production Systems",
    passingPercentage: 80,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "q-genapp-1",
        question: "What mechanism guarantees that an LLM response strictly conforms to a specified JSON schema?",
        type: "multiple-choice",
        options: [
          "Constrained decoding / Structured Outputs API",
          "Writing 'Please do not output errors' in the prompt",
          "Regular expressions after generation only",
          "Increasing temperature to 2.0"
        ],
        correctAnswer: 0,
        explanation: "Structured output APIs use grammar-constrained decoding at sampling time to guarantee valid JSON schemas.",
      },
      {
        id: "q-genapp-2",
        question: "What does 'Hybrid Search' combine in modern enterprise RAG systems?",
        type: "multiple-choice",
        options: [
          "Dense vector semantic search with sparse keyword search (BM25)",
          "Audio and video search",
          "Relational tables and spreadsheets",
          "HTML and Markdown files"
        ],
        correctAnswer: 0,
        explanation: "Hybrid search merges vector embeddings for conceptual meaning with BM25 for exact keyword matching.",
      },
    ],
  },

  // 18. AI-Assisted Coding & Developer Tools
  "ai-assisted-coding": {
    courseId: "ai-assisted-coding",
    courseTitle: "AI-Assisted Coding & Developer Tools: Accelerated Software Engineering",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-aicode-1",
        question: "What is the most effective approach to prompting AI coding assistants for reliable architectural code?",
        type: "multiple-choice",
        options: [
          "Provide explicit constraints, frameworks, error-handling rules, and relevant types in context",
          "Give one-word vague instructions",
          "Tell the AI to invent new libraries",
          "Disable all unit testing"
        ],
        correctAnswer: 0,
        explanation: "High-context prompts containing types, constraints, and test expectations yield superior code generation.",
      },
      {
        id: "q-aicode-2",
        question: "What security vulnerability can occur if a developer blindly imports a non-existent package hallucinated by an AI?",
        type: "multiple-choice",
        options: [
          "Package Hallucination / Supply Chain exploit",
          "Buffer overflow",
          "Hardware overheating",
          "Database lock"
        ],
        correctAnswer: 0,
        explanation: "Attackers can register hallucinated package names with malicious payloads on npm or PyPI.",
      },
    ],
  },

  // 19. AI Chatbots & Voice AI
  "ai-chatbots-voice-ai": {
    courseId: "ai-chatbots-voice-ai",
    courseTitle: "AI Chatbots & Voice AI: Conversational Intelligence & Real-Time Audio",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-voice-1",
        question: "What total response latency is widely considered the threshold for natural conversational Voice AI?",
        type: "multiple-choice",
        options: ["Under 500 milliseconds", "Over 5 seconds", "10 seconds", "1 minute"],
        correctAnswer: 0,
        explanation: "Sub-500ms latency enables fluid, human-like voice conversational interaction without awkward silences.",
      },
      {
        id: "q-voice-2",
        question: "Which model family is widely adopted for state-of-the-art Speech-to-Text (STT) transcription?",
        type: "multiple-choice",
        options: ["Whisper", "ResNet", "BERT", "Word2Vec"],
        correctAnswer: 0,
        explanation: "Whisper is an open-source encoder-decoder transformer trained on vast multilingual audio.",
      },
    ],
  },

  // 20. Cloud-Native & Serverless Development
  "cloud-native-serverless": {
    courseId: "cloud-native-serverless",
    courseTitle: "Cloud-Native & Serverless Development: Scalable Distributed Systems",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-cloud-1",
        question: "What is a primary operational benefit of multi-stage Docker builds?",
        type: "multiple-choice",
        options: [
          "Drastically smaller production image sizes by omitting build tools and development dependencies",
          "Automatic compilation to web assembly",
          "Disabling networking",
          "Encrypting hard drives"
        ],
        correctAnswer: 0,
        explanation: "Multi-stage builds copy only compiled artifacts into clean, minimal runtime images.",
      },
      {
        id: "q-cloud-2",
        question: "Which Kubernetes resource routes external HTTP/HTTPS traffic to internal cluster services?",
        type: "multiple-choice",
        options: ["Ingress", "ConfigMap", "DaemonSet", "PersistentVolume"],
        correctAnswer: 0,
        explanation: "An Ingress controller manages external routing, host-based routing, and TLS termination.",
      },
    ],
  },

  // 21. AI Data Analytics & Business Intelligence
  "ai-data-analytics-bi": {
    courseId: "ai-data-analytics-bi",
    courseTitle: "AI Data Analytics & Business Intelligence: Dashboards to Predictive Insights",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-bi-1",
        question: "Why are vectorized operations in Pandas/NumPy preferred over Python 'for' loops for data processing?",
        type: "multiple-choice",
        options: [
          "They execute in compiled C/Fortran leveraging SIMD hardware, running 100x+ faster",
          "They take more memory",
          "They require no variables",
          "They only work on text files"
        ],
        correctAnswer: 0,
        explanation: "Vectorization offloads computations to optimized C libraries, avoiding Python loop overhead.",
      },
      {
        id: "q-bi-2",
        question: "What is the primary role of an executive KPI card in a business intelligence dashboard?",
        type: "multiple-choice",
        options: [
          "Communicate critical business metric status (revenue, churn, margin) concisely at a glance",
          "Display raw database server logs",
          "Render 3D animated graphs",
          "Export CSV files only"
        ],
        correctAnswer: 0,
        explanation: "KPI cards surface high-impact metrics to decision-makers immediately.",
      },
    ],
  },

  // Backwards compatibility legacy aliases
  "course-web-dev-101": {
    courseId: "course-web-dev-101",
    courseTitle: "HTML & CSS: Responsive Architecture & Design Systems",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-leg-1",
        question: "Which HTML5 semantic element is most appropriate for primary site navigation?",
        type: "multiple-choice",
        options: ["<menu>", "<nav>", "<header>", "<section>"],
        correctAnswer: 1,
        explanation: "<nav> is specifically designated for major navigation link groups.",
      },
    ],
  },
};

// Aliases for alternate route parameter formats
COURSE_ASSESSMENTS["ai-agents-agentic-ai"] = COURSE_ASSESSMENTS["agentic-ai-autonomous-systems"];
COURSE_ASSESSMENTS["generative-ai-llm-application-development"] = COURSE_ASSESSMENTS["genai-llm-application-development"];
COURSE_ASSESSMENTS["ai-assisted-coding-developer-tools"] = COURSE_ASSESSMENTS["ai-assisted-coding-tools"];
COURSE_ASSESSMENTS["ai-chatbots-voice-ai"] = COURSE_ASSESSMENTS["ai-chatbots-voice-interfaces"];
COURSE_ASSESSMENTS["cloud-native-serverless-development"] = COURSE_ASSESSMENTS["cloud-native-serverless"];
COURSE_ASSESSMENTS["ai-data-analytics-business-intelligence"] = COURSE_ASSESSMENTS["ai-data-analytics-bi"];

export function getAssessment(idOrSlug: string): CourseAssessment | undefined {
  if (!idOrSlug) return undefined;
  if (COURSE_ASSESSMENTS[idOrSlug]) return COURSE_ASSESSMENTS[idOrSlug];

  const normalized = idOrSlug.toLowerCase().trim();
  if (COURSE_ASSESSMENTS[normalized]) return COURSE_ASSESSMENTS[normalized];

  const stripped = normalized.replace(/^course-/, "");
  if (COURSE_ASSESSMENTS[stripped]) return COURSE_ASSESSMENTS[stripped];

  const prefixed = `course-${normalized}`;
  if (COURSE_ASSESSMENTS[prefixed]) return COURSE_ASSESSMENTS[prefixed];

  return Object.values(COURSE_ASSESSMENTS).find(
    (a) =>
      a.courseId === idOrSlug ||
      a.courseId === stripped ||
      a.courseId === prefixed
  );
}

