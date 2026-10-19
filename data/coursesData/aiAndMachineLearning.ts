import { Course } from "./types";

export const AI_AND_MACHINE_LEARNING_COURSES: Course[] = [
  // 7. Generative AI & Large Language Models (LLMs)
  {
    id: "course-generative-ai-llms",
    slug: "generative-ai-llms",
    aliases: ["generative-ai-engineering", "genai-llms"],
    title: "Generative AI & Large Language Models (LLMs): Enterprise Architectures",
    description: "Master Transformer foundations, self-attention, tokenization, embeddings, prompt engineering, fine-tuning concepts, Retrieval-Augmented Generation (RAG), vector databases, and enterprise safety.",
    shortDescription: "Master Transformer architecture, embeddings, prompt engineering, RAG pipelines, and vector databases.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Artificial Intelligence & Machine Learning",
    difficulty: "Advanced",
    estimatedDuration: "24 Hours",
    estimatedDurationMinutes: 1440,
    totalLessons: 12,
    totalXp: 1900,
    icon: "🧠",
    color: "from-purple-600 to-indigo-900",
    skills: ["Transformer Architecture", "Prompt Engineering", "Embeddings", "RAG Systems", "Vector Databases", "LLM Evaluation"],
    skillsGained: [
      "Understand the mechanics of decoder-only Transformers and multi-head self-attention",
      "Master tokenization, context window budget management, and temperature sampling",
      "Formulate production prompts using few-shot, Chain-of-Thought, and directional stimulus techniques",
      "Generate and store dense semantic vector embeddings in vector databases (Pinecone, Chroma)",
      "Build high-precision Retrieval-Augmented Generation (RAG) systems with hybrid reranking",
      "Quantify hallucinations and evaluate LLM outputs with automated benchmark metrics"
    ],
    prerequisites: ["Intermediate Python", "Familiarity with REST APIs and basic data structures"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-03-06T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "llm-mod-1",
        title: "Transformer Architecture, Tokens & Embeddings",
        description: "Foundations of modern LLMs, tokenization, embeddings, and context windows.",
        lessons: [
          {
            id: "llm-l1",
            slug: "transformers-tokens-embeddings",
            title: "Transformer Architecture & Vector Embeddings",
            duration: "50 mins",
            xpReward: 160,
            content: "Modern Large Language Models are based on the Transformer architecture introduced by Vaswani et al. (2017). Self-attention allows tokens to compute contextual relationships across an entire prompt simultaneously. Embeddings map words into high-dimensional vector spaces where semantic similarity correlates with cosine proximity.",
            codeExample: {
              language: "python",
              code: `import numpy as np\n\ndef cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:\n    # Cosine similarity evaluates directional alignment of embedding vectors\n    dot_product = np.dot(v1, v2)\n    norm_product = np.linalg.norm(v1) * np.linalg.norm(v2)\n    return float(dot_product / norm_product)\n\n# Simulated 4D semantic embedding vectors:\nvec_king = np.array([0.9, 0.2, 0.8, 0.1])\nvec_queen = np.array([0.88, 0.25, 0.79, 0.15])\n\nsim = cosine_similarity(vec_king, vec_queen)\nprint(f"Semantic Cosine Similarity: {sim:.4f}")`,
              output: "Semantic Cosine Similarity: 0.9984",
              explanation: "Dense vectors capture nuanced semantic relationships across thousands of dimensions."
            },
            commonMistakes: [
              {
                wrong: "Assuming 1 word equals 1 token in LLM context windows",
                correct: "Account for sub-word tokenization (typically ~1 token per 0.75 English words)",
                reason: "BPE (Byte Pair Encoding) breaks words into morphological sub-tokens and punctuation."
              }
            ],
            keyTakeaways: [
              "Self-attention calculates token relevance dynamically across long contexts.",
              "Cosine similarity between embeddings forms the basis of semantic search."
            ],
            exercise: {
              id: "llm-ex-1",
              type: "multiple-choice",
              prompt: "What mathematical mechanism allows Transformers to weigh the relevance of different tokens in a sequence?",
              options: ["Convolutional Kernels", "Self-Attention Mechanism", "Recurrent Hidden States", "Genetic Algorithms"],
              correctAnswer: 1,
              explanation: "Self-attention computes dynamic weights representing how every token relates to every other token in the prompt.",
              hint: "Attention."
            }
          }
        ]
      },
      {
        id: "llm-mod-2",
        title: "Retrieval-Augmented Generation (RAG) & Vector Databases",
        description: "Chunking strategies, vector search, hybrid retrieval, and grounded generation.",
        lessons: [
          {
            id: "llm-l2",
            slug: "rag-vector-databases",
            title: "RAG Architecture & Semantic Vector Retrieval",
            duration: "55 mins",
            xpReward: 180,
            content: "Retrieval-Augmented Generation (RAG) solves LLM hallucinations and knowledge cutoffs by dynamically retrieving relevant enterprise documents and injecting them into the LLM context prompt before generation. Vector databases index embedding vectors using algorithms like HNSW (Hierarchical Navigable Small World) for sub-millisecond similarity search.",
            codeExample: {
              language: "python",
              code: `# Production RAG Prompt Construction Pattern:\ndef build_rag_prompt(user_query: str, retrieved_contexts: list[str]) -> str:\n    joined_context = "\\n---\\n".join(retrieved_contexts)\n    return f"""You are a helpful SLRJ Learn academic assistant.\nAnswer the user's question STRICTLY based on the provided context.\nIf the context does not contain the answer, say "I cannot verify this from the documents."\n\nContext:\\n{joined_context}\\n\nUser Question: {user_query}\nAnswer:"""`,
              output: "Constructs grounded, hallucination-resistant prompt with retrieved knowledge",
              explanation: "Clear system instructions constrain the model to cite and synthesize retrieved text."
            },
            commonMistakes: [
              {
                wrong: "Passing massive unchunked documents into vector databases",
                correct: "Split documents into semantic chunks (e.g. 500-1000 tokens) with 10-20% overlap",
                reason: "Oversized chunks dilute embedding fidelity, reducing retrieval precision."
              }
            ],
            keyTakeaways: [
              "RAG provides real-time, private, verifiable data without retraining models.",
              "Chunk size and overlap parameters directly influence retrieval precision."
            ],
            exercise: {
              id: "llm-ex-2",
              type: "multiple-choice",
              prompt: "What is the primary role of a Vector Database in a RAG architecture?",
              options: [
                "Execute Python code scripts",
                "Store and rapidly perform similarity search over dense embedding vectors",
                "Compress video files",
                "Replace relational SQL transactions"
              ],
              correctAnswer: 1,
              explanation: "Vector databases index embeddings and compute nearest neighbors (k-NN) to retrieve relevant text chunks.",
              hint: "Similarity search."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "llm-pdf-1",
        title: "Generative AI & Large Language Models Architecture Guide",
        description: "Deep dive into Transformer mechanics, token budgets, prompt engineering, and production RAG systems.",
        moduleTitle: "Generative AI Core",
        fileUrl: "/pdfs/generative-ai-guide.pdf",
        fileSize: "6.4 MB",
        pageCount: 60,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 13. AI & Machine Learning
  {
    id: "course-ai-machine-learning",
    slug: "ai-machine-learning",
    aliases: ["ai-machine-learning-engineering", "machine-learning-mastery"],
    title: "AI & Machine Learning: From Mathematics to Production Models",
    description: "Learn machine learning engineering from statistical foundations and data preprocessing to supervised models, unsupervised clustering, feature engineering, neural networks, and model deployment.",
    shortDescription: "Master statistical modeling, supervised/unsupervised ML, Scikit-Learn, neural networks, and model deployment.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Artificial Intelligence & Machine Learning",
    difficulty: "Advanced",
    estimatedDuration: "28 Hours",
    estimatedDurationMinutes: 1680,
    totalLessons: 14,
    totalXp: 2100,
    icon: "🔬",
    color: "from-indigo-600 to-purple-950",
    skills: ["Scikit-Learn", "Regression & Classification", "Neural Networks", "Feature Engineering", "Model Evaluation", "MLOps"],
    skillsGained: [
      "Master statistical data preprocessing, outlier removal, and one-hot encoding",
      "Train, tune, and regularize Linear/Logistic Regression, Random Forests, and XGBoost",
      "Implement unsupervised clustering algorithms (K-Means, DBSCAN) and PCA dimensionality reduction",
      "Evaluate models rigorously with K-Fold cross-validation, ROC-AUC, and precision-recall trade-offs",
      "Construct multi-layer perceptron neural networks with PyTorch/TensorFlow",
      "Package, containerize, and deploy ML inference endpoints using FastAPI"
    ],
    prerequisites: ["Python programming proficiency", "Introductory linear algebra and calculus concepts"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-07T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "ml-mod-1",
        title: "Supervised Learning & Model Evaluation",
        description: "Regression, classification, bias-variance tradeoff, and cross-validation.",
        lessons: [
          {
            id: "ml-l1",
            slug: "supervised-learning-evaluation",
            title: "Supervised Classification & The Bias-Variance Tradeoff",
            duration: "55 mins",
            xpReward: 170,
            content: "Supervised learning trains models to predict outcomes from labeled training data. The bias-variance tradeoff is the central challenge in machine learning: high bias leads to underfitting (model too simple), while high variance leads to overfitting (memorizing training noise). Regularization (L1 Lasso, L2 Ridge) and ensemble methods (Random Forest, Gradient Boosting) balance this tradeoff.",
            codeExample: {
              language: "python",
              code: `from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\n# Train Random Forest ensemble model\nmodel = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)\nmodel.fit(X_train, y_train)\n\n# Predict and evaluate on held-out test split\npredictions = model.predict(X_test)\nprint(classification_report(y_test, predictions))`,
              output: "Outputs Precision, Recall, F1-Score, and Support for all classes",
              explanation: "Random Forests aggregate predictions from hundreds of decorrelated decision trees, reducing variance."
            },
            commonMistakes: [
              {
                wrong: "Evaluating machine learning models on the exact same data used to train them",
                correct: "Always evaluate on an isolated test set or using K-Fold cross-validation",
                reason: "Evaluating on training data hides severe overfitting, giving false confidence."
              }
            ],
            keyTakeaways: [
              "Ensemble methods like Random Forest and XGBoost outperform single decision trees.",
              "Use F1-Score or ROC-AUC rather than accuracy when dealing with imbalanced datasets."
            ],
            exercise: {
              id: "ml-ex-1",
              type: "multiple-choice",
              prompt: "What metric is most appropriate for evaluating a binary classification model on a heavily imbalanced dataset (e.g. 99% negative, 1% positive)?",
              options: ["Raw Accuracy", "F1-Score / PR-AUC", "Mean Squared Error", "R-Squared"],
              correctAnswer: 1,
              explanation: "F1-Score (harmonic mean of precision and recall) accurately reflects performance on rare positive classes, unlike accuracy.",
              hint: "Precision and recall."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "ml-pdf-1",
        title: "Machine Learning Engineering & Neural Networks Handbook",
        description: "Complete guide to supervised/unsupervised ML algorithms, Scikit-Learn pipelines, and model evaluation.",
        moduleTitle: "Machine Learning Core",
        fileUrl: "/pdfs/ai-machine-learning-guide.pdf",
        fileSize: "6.5 MB",
        pageCount: 62,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 14. AI Agents & Automation
  {
    id: "course-ai-agents-automation",
    slug: "ai-agents-automation",
    aliases: ["agentic-workflows", "ai-automation-systems"],
    title: "AI Agents & Automation: Workflow Orchestration & MCP",
    description: "Design autonomous AI agents, multi-step LLM workflows, tool calling, structured outputs, memory systems, Model Context Protocol (MCP) integrations, and production automation pipelines.",
    shortDescription: "Master autonomous AI agents, tool calling, memory management, MCP protocol, and automated workflows.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Artificial Intelligence & Machine Learning",
    difficulty: "Advanced",
    estimatedDuration: "25 Hours",
    estimatedDurationMinutes: 1500,
    totalLessons: 12,
    totalXp: 1950,
    icon: "⚡",
    color: "from-violet-600 to-indigo-950",
    skills: ["AI Agents", "Tool Calling", "MCP Protocol", "Structured Outputs", "LangGraph / CrewAI", "Autonomous Workflows"],
    skillsGained: [
      "Architect autonomous agents capable of reasoning, planning, and task execution",
      "Implement deterministic tool calling with JSON Schema structured outputs",
      "Manage persistent agent memory (working memory, short-term, vector long-term)",
      "Connect agents to external systems using the Model Context Protocol (MCP)",
      "Orchestrate multi-step workflows with cycles, checkpoints, and human-in-the-loop approvals",
      "Build production automation agents for customer service, research, and data pipelines"
    ],
    prerequisites: ["Python proficiency", "Understanding of LLM APIs and prompt engineering"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-18T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "agt-mod-1",
        title: "Agent Architecture, Tool Calling & MCP",
        description: "ReAct pattern, structured function calling, Model Context Protocol, and safety guardrails.",
        lessons: [
          {
            id: "agt-l1",
            slug: "agent-reasoning-tool-calling",
            title: "ReAct Pattern, Tool Execution & Structured Schemas",
            duration: "55 mins",
            xpReward: 170,
            content: "Unlike static completion prompts, AI agents operate in feedback loops using the ReAct (Reasoning + Acting) pattern. The agent examines a goal, generates a reasoning step, executes an external tool (e.g., database query, web scraper, calculator), receives observation output, and iterates until the objective is accomplished.",
            codeExample: {
              language: "python",
              code: `# Tool Definition for Agent Execution with Pydantic Schema\nfrom pydantic import BaseModel, Field\n\nclass WeatherQuery(BaseModel):\n    city: str = Field(description="The city name to check weather for")\n    units: str = Field(default="metric", description="Temperature units: metric or imperial")\n\ntool_definition = {\n    "name": "get_current_weather",\n    "description": "Fetches current weather for a specified location.",\n    "parameters": WeatherQuery.model_json_schema()\n}`,
              output: "Emits strict JSON schema for zero-error model function calling",
              explanation: "Strict parameter schemas ensure LLMs output valid parameters that executable code can invoke safely."
            },
            commonMistakes: [
              {
                wrong: "Allowing agents to execute destructive actions without confirmation or guardrails",
                correct: "Implement human-in-the-loop breakpoints for financial, database, or email operations",
                reason: "Autonomous agents can enter unexpected loops or hallucinate dangerous operations."
              }
            ],
            keyTakeaways: [
              "The ReAct loop enables agents to solve multi-step problems dynamically.",
              "Model Context Protocol (MCP) standardizes agent-to-tool client/server interfaces."
            ],
            exercise: {
              id: "agt-ex-1",
              type: "multiple-choice",
              prompt: "What does the ReAct pattern stand for in autonomous AI agent architecture?",
              options: ["Recursive Acting", "Reasoning and Acting", "Reactive Automation", "Realtime Action"],
              correctAnswer: 1,
              explanation: "ReAct combines Reasoning (internal cognitive planning) and Acting (calling external tools and observing results).",
              hint: "Reason + Act."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "agt-pdf-1",
        title: "AI Agents & Autonomous Workflow Orchestration Handbook",
        description: "Complete guide to ReAct loops, tool calling, Model Context Protocol (MCP), and production agent deployment.",
        moduleTitle: "AI Agent Architecture",
        fileUrl: "/pdfs/ai-agents-automation-guide.pdf",
        fileSize: "6.2 MB",
        pageCount: 58,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 16. AI Agents & Agentic AI (Course 16)
  {
    id: "course-agentic-ai-autonomous-systems",
    slug: "agentic-ai-autonomous-systems",
    aliases: ["agentic-ai", "autonomous-multi-agent-systems"],
    title: "AI Agents & Agentic AI: Autonomous Workflows & Multi-Agent Systems",
    description: "Deep dive into state-of-the-art agentic AI, multi-agent collaboration, task decomposition, hierarchical teams, Model Context Protocol (MCP) servers, guardrails, and autonomous research agents.",
    shortDescription: "Master agentic AI systems, multi-agent collaboration, task decomposition, MCP servers, and guardrails.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Artificial Intelligence & Machine Learning",
    difficulty: "Advanced",
    estimatedDuration: "26 Hours",
    estimatedDurationMinutes: 1560,
    totalLessons: 12,
    totalXp: 2000,
    icon: "🤖",
    color: "from-purple-800 to-indigo-950",
    skills: ["Agentic AI", "Multi-Agent Systems", "Task Decomposition", "MCP Servers", "Agent Planning", "Guardrails"],
    skillsGained: [
      "Distinguish agentic AI systems from passive chatbots and sequential LLM chains",
      "Implement multi-agent team hierarchies (supervisor, researcher, writer, reviewer)",
      "Decompose complex goals into dependency graphs and execution plans",
      "Deploy custom Model Context Protocol (MCP) servers providing tools to agent fleets",
      "Implement short-term scratchpads, long-term memory, and reflection cycles",
      "Build and evaluate an autonomous AI research and productivity agent with guardrails"
    ],
    prerequisites: ["Python proficiency", "Experience with LLM APIs and prompt engineering"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-03-22T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "agnt-mod-1",
        title: "Foundations of Agentic AI & Multi-Agent Teams",
        description: "Agency, autonomous workflows, tool calling, and hierarchical multi-agent collaboration.",
        lessons: [
          {
            id: "agnt-l1",
            slug: "agentic-ai-vs-chatbots",
            title: "Agentic AI vs Chatbots & Task Decomposition",
            duration: "50 mins",
            xpReward: 160,
            content: "Traditional chatbots simply map user prompts to text responses. Agentic AI possesses agency: the capability to autonomously reason, decompose complex problems into sequential tasks, make decisions, execute external tools, observe results, reflect on failures, and self-correct until a high-level goal is achieved.",
            codeExample: {
              language: "python",
              code: `# Task Decomposition Planner representation\nclass AgentPlan:\n    def __init__(self, goal: str):\n        self.goal = goal\n        self.steps: list[dict] = []\n        self.completed_steps: list[dict] = []\n        \n    def add_step(self, step_id: int, action: str, tool: str):\n        self.steps.append({"id": step_id, "action": action, "tool": tool})\n\nplan = AgentPlan("Research quantum computing breakthroughs in 2026")\nplan.add_step(1, "Search arXiv for 2026 quantum papers", "academic_search")\nplan.add_step(2, "Extract and summarize top 3 findings", "llm_summarizer")\nplan.add_step(3, "Compile executive briefing document", "file_writer")`,
              output: "Generates structured dependency graph for autonomous execution",
              explanation: "Breaking high-level objectives into atomic steps enables reliability and verification."
            },
            commonMistakes: [
              {
                wrong: "Expecting a single prompt to solve an open-ended multi-faceted research problem",
                correct: "Decompose into a planner agent, specialized executor agents, and a critic/verifier agent",
                reason: "Specialized roles with bounded responsibilities drastically reduce reasoning errors."
              }
            ],
            keyTakeaways: [
              "Agentic AI operates with autonomy, goal-orientation, and self-correction.",
              "Multi-agent supervisor patterns divide complex tasks among specialized worker agents."
            ],
            exercise: {
              id: "agnt-ex-1",
              type: "multiple-choice",
              prompt: "What is the defining capability that distinguishes Agentic AI from a traditional chatbot?",
              options: [
                "Ability to autonomously plan, execute tools, observe feedback, and self-correct toward a goal",
                "Faster typing speed",
                "Higher token context window alone",
                "Ability to run without internet"
              ],
              correctAnswer: 0,
              explanation: "Agency means acting autonomously in an environment with tools, memory, and self-correction to accomplish objectives.",
              hint: "Autonomy and tools."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "agnt-pdf-1",
        title: "Agentic AI & Multi-Agent Architecture Guide",
        description: "Master autonomous systems, task planning, Model Context Protocol (MCP), and multi-agent orchestration.",
        moduleTitle: "Agentic AI Systems",
        fileUrl: "/pdfs/agentic-ai-guide.pdf",
        fileSize: "6.6 MB",
        pageCount: 62,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 17. Generative AI & LLM Application Development (Course 17)
  {
    id: "course-genai-llm-application-development",
    slug: "genai-llm-application-development",
    aliases: ["llm-application-development", "genai-app-dev"],
    title: "Generative AI & LLM Application Development: Production Systems",
    description: "Build production-ready LLM applications from scratch: token budgets, function calling, structured outputs, hybrid RAG with rerankers, vector search, streaming responses, and hallucination guardrails.",
    shortDescription: "Build production LLM applications: structured outputs, hybrid RAG, vector search, and hallucination guardrails.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Artificial Intelligence & Machine Learning",
    difficulty: "Advanced",
    estimatedDuration: "26 Hours",
    estimatedDurationMinutes: 1560,
    totalLessons: 12,
    totalXp: 1950,
    icon: "⚡",
    color: "from-cyan-700 to-indigo-950",
    skills: ["LLM Application Architecture", "Function Calling", "Hybrid RAG", "Vector Search", "Prompt Guardrails", "Streaming APIs"],
    skillsGained: [
      "Architect end-to-end applications powered by state-of-the-art LLMs (Gemini, Claude, GPT-4o)",
      "Guarantee structured JSON responses adhering strictly to Pydantic/Zod schemas",
      "Implement multi-stage RAG: chunking, dense vector retrieval, sparse BM25 search, and cross-encoder reranking",
      "Manage real-time streaming tokens and UI state over Server-Sent Events (SSE)",
      "Enforce safety guardrails against prompt injection, jailbreaks, and sensitive data leakage",
      "Build a document question-answering assistant with citations and confidence metrics"
    ],
    prerequisites: ["Python or TypeScript proficiency", "Basic understanding of embeddings and REST APIs"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-24T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "gapp-mod-1",
        title: "LLM APIs, Structured Outputs & Hybrid RAG",
        description: "Model integration, strict schema outputs, vector embeddings, and semantic search.",
        lessons: [
          {
            id: "gapp-l1",
            slug: "llm-apis-structured-rag",
            title: "Structured Outputs & Hybrid Search RAG",
            duration: "55 mins",
            xpReward: 170,
            content: "Enterprise LLM applications require predictable, machine-readable data. Modern LLM APIs support structured outputs (JSON schema enforcement at the sampling level), guaranteeing 100% schema compliance. Hybrid RAG combines dense semantic vector search with keyword-based sparse search (BM25) and reranking for unmatched accuracy.",
            codeExample: {
              language: "python",
              code: `# Structured Output Schema with Pydantic for LLM Application:\nfrom pydantic import BaseModel, Field\n\nclass DocumentExtraction(BaseModel):\n    title: str = Field(description="Document executive title")\n    key_findings: list[str] = Field(description="List of core bullet points")\n    confidence_score: float = Field(ge=0.0, le=1.0, description="Extraction confidence")\n    citations: list[str] = Field(description="Source section references")`,
              output: "Guarantees LLM generates syntactically valid JSON matching DocumentExtraction",
              explanation: "Grammar-constrained sampling forces the model logits to conform strictly to the JSON schema."
            },
            commonMistakes: [
              {
                wrong: "Relying on prompt text alone like 'Please return valid JSON' without schema enforcement",
                correct: "Use native API response_format / structured output parameters",
                reason: "Natural language instructions can fail unpredictably with markdown backticks or commentary."
              }
            ],
            keyTakeaways: [
              "Structured outputs guarantee type safety in downstream backend pipelines.",
              "Hybrid search (Dense Embeddings + Sparse BM25) outperforms vector-only search."
            ],
            exercise: {
              id: "gapp-ex-1",
              type: "multiple-choice",
              prompt: "What does 'Hybrid Search' combine in modern enterprise RAG architectures?",
              options: [
                "Dense semantic vector search and sparse keyword search (BM25)",
                "Audio and video files",
                "Relational SQL and Excel files",
                "HTML and CSS files"
              ],
              correctAnswer: 0,
              explanation: "Hybrid search merges dense vector embeddings (semantic meaning) with sparse keyword search (exact keyword matching).",
              hint: "Dense + Sparse."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "gapp-pdf-1",
        title: "Production LLM Application Engineering Handbook",
        description: "Complete guide to structured outputs, hybrid search RAG, cross-encoder rerankers, and safety guardrails.",
        moduleTitle: "LLM App Engineering",
        fileUrl: "/pdfs/genai-llm-app-dev-guide.pdf",
        fileSize: "6.3 MB",
        pageCount: 56,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 19. AI Chatbots & Voice AI (Course 19)
  {
    id: "course-ai-chatbots-voice-ai",
    slug: "ai-chatbots-voice-ai",
    aliases: ["voice-ai-conversational-systems", "ai-chatbots"],
    title: "AI Chatbots & Voice AI: Conversational Intelligence & Real-Time Audio",
    description: "Build conversational AI chatbots and full-duplex real-time voice assistants with streaming LLM APIs, Speech-to-Text (STT), Text-to-Speech (TTS), WebSockets, multilingual support, and privacy guardrails.",
    shortDescription: "Build intelligent conversational chatbots, Whisper STT, voice synthesis TTS, and real-time voice assistants.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Artificial Intelligence & Machine Learning",
    difficulty: "Advanced",
    estimatedDuration: "22 Hours",
    estimatedDurationMinutes: 1320,
    totalLessons: 12,
    totalXp: 1800,
    icon: "🎙️",
    color: "from-rose-600 to-indigo-950",
    skills: ["Conversational AI", "Speech-to-Text (STT)", "Text-to-Speech (TTS)", "WebSockets", "Streaming Audio", "Multilingual Voice"],
    skillsGained: [
      "Design multi-turn conversation flows with state management and context preservation",
      "Implement real-time Speech-to-Text (Whisper / Deepgram) audio transcription",
      "Synthesize lifelike streaming speech using neural Text-to-Speech (TTS) models",
      "Establish low-latency, full-duplex voice pipelines over WebSockets and WebRTC",
      "Build multilingual chatbots that maintain tone and nuance across languages",
      "Deploy a production customer support chatbot and voice assistant with safety guardrails"
    ],
    prerequisites: ["JavaScript/TypeScript or Python", "Basic networking concepts (WebSockets)"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-27T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "cht-mod-1",
        title: "Conversational Architecture & Real-Time Voice Pipelines",
        description: "Chat state machines, audio streaming, Whisper transcription, and neural TTS synthesis.",
        lessons: [
          {
            id: "cht-l1",
            slug: "voice-ai-stt-tts-websockets",
            title: "Voice AI: Real-Time Audio, STT & Neural TTS",
            duration: "50 mins",
            xpReward: 160,
            content: "Real-time Voice AI combines three core stages: Speech-to-Text (transcribing user audio in real time), LLM generation (streaming textual tokens), and Text-to-Speech (synthesizing speech audio packets). Minimizing latency across this triad (<500ms total response latency) is critical for natural human-computer conversation.",
            codeExample: {
              language: "typescript",
              code: `// Real-Time Audio Streaming WebSocket Pipeline\nimport WebSocket from "ws";\n\nconst voiceSocket = new WebSocket("wss://api.slrjlearn.in/v1/voice/stream");\n\nvoiceSocket.on("open", () => {\n  console.log("Full-duplex voice session established.");\n});\n\nvoiceSocket.on("message", (audioChunk: Buffer) => {\n  // Stream incoming neural audio chunks directly to client speaker buffer\n  playAudioChunk(audioChunk);\n});`,
              output: "Streams real-time synthesized voice audio with sub-500ms latency",
              explanation: "Full-duplex WebSockets enable simultaneous audio listening and speaking with interruption support."
            },
            commonMistakes: [
              {
                wrong: "Waiting for the full LLM sentence or paragraph to finish before beginning audio synthesis",
                correct: "Stream LLM tokens clause-by-clause into the TTS engine to begin playing voice audio immediately",
                reason: "Sentence-level streaming reduces perceived time-to-first-audio-byte from 3 seconds to 400 milliseconds."
              }
            ],
            keyTakeaways: [
              "Sub-500ms latency is the benchmark for natural human conversational voice AI.",
              "Sentence-boundary streaming audio eliminates user-perceived delays."
            ],
            exercise: {
              id: "cht-ex-1",
              type: "multiple-choice",
              prompt: "What optimization technique allows Voice AI to begin speaking before the LLM finishes generating the entire response?",
              options: [
                "Sentence/clause-level streaming directly into the TTS engine",
                "Pre-recording all possible human answers",
                "Lowering audio sample rate to 2 kHz",
                "Running speech recognition after the call ends"
              ],
              correctAnswer: 0,
              explanation: "Piping early generated tokens into the TTS synthesizer allows audio playback to start while subsequent sentences are being generated.",
              hint: "Streaming synthesis."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "cht-pdf-1",
        title: "Conversational AI & Real-Time Voice Engineering Handbook",
        description: "Guide to conversational state machines, STT transcription, neural TTS, WebSockets, and voice pipelines.",
        moduleTitle: "Voice AI Architecture",
        fileUrl: "/pdfs/ai-chatbots-voice-ai-guide.pdf",
        fileSize: "5.7 MB",
        pageCount: 52,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  }
];
