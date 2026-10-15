export interface MicroQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MicroActivity {
  type: "code" | "predict" | "interactive-drill";
  prompt: string;
  starterCode?: string;
  expectedOutput?: string;
  testAssertion?: string; // code expression to evaluate or output match
  options?: string[]; // for predict output
  correctOptionIndex?: number;
  explanation: string;
}

export interface MicroLesson {
  id: string;
  lessonNumber: number;
  title: string;
  estimatedMinutes: number;
  intro: string;
  learningObjective: string;
  explanation: string;
  keyTakeaways: string[];
  practicalExample: {
    language: string;
    code: string;
    notes: string;
  };
  interactiveActivity: MicroActivity;
  quiz: MicroQuiz;
  xpReward: number;
}

export interface MicroTopicSeries {
  slug: string;
  category: "Programming & Technology" | "Soft Skills" | "Career-Oriented" | "Fun & Creative";
  title: string;
  seriesTitle: string;
  description: string;
  icon: string;
  badge: string;
  level: "Beginner" | "Intermediate" | "All Levels";
  dailyCommitment: string;
  totalLessons: number;
  totalXP: number;
  skills: string[];
  color: string;
  bgGradient: string;
  lessons: MicroLesson[];
}

export const MICRO_TOPIC_SERIES: MicroTopicSeries[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // A. PROGRAMMING AND TECHNOLOGY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "python-basics",
    category: "Programming & Technology",
    title: "Python Fundamentals",
    seriesTitle: "Learn Python in 10 Minutes a Day",
    description:
      "Bite-sized Python mastery covering variables, dynamic data types, conditions, loops, functions, lists, and dictionaries.",
    icon: "🐍",
    badge: "Most Popular",
    level: "Beginner",
    dailyCommitment: "10 mins/day",
    totalLessons: 8,
    totalXP: 240,
    skills: ["Python 3", "Data Structures", "Control Flow", "Functions", "Algorithmic Logic"],
    color: "from-amber-400 to-yellow-500",
    bgGradient: "from-amber-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "py-01",
        lessonNumber: 1,
        title: "Variables & Dynamic Typing",
        estimatedMinutes: 8,
        intro: "In Python, variables are memory references created automatically when you assign a value with the `=` operator.",
        learningObjective: "Store strings, integers, and floats, and use f-strings for clean output formatting.",
        explanation:
          "Unlike static languages like C++ or Java, Python infers the data type at runtime. You do not declare `int` or `string` explicitly. Use descriptive `snake_case` variable names.",
        keyTakeaways: [
          "Variables are dynamically typed: `x = 42` (int), `x = 'hello'` (str).",
          "Use f-strings `f'Value: {x}'` for clean, readable interpolation.",
          "Check an object's type with the built-in `type(variable)` function.",
        ],
        practicalExample: {
          language: "python",
          code: `# Variable assignment & f-string formatting
student_name = "Alex"
current_streak = 5
xp_points = 1250
is_active = True

print(f"Learner {student_name} has a {current_streak}-day streak with {xp_points} XP!")`,
          notes: "Notice how f-strings cleanly embed expressions directly inside curly braces `{}`.",
        },
        interactiveActivity: {
          type: "code",
          prompt: "Create a variable `daily_minutes = 25` and print `Studied 25 minutes today!` using an f-string.",
          starterCode: `# Write your code below
daily_minutes = 25
# Print the required message using f-string:
`,
          expectedOutput: "Studied 25 minutes today!",
          explanation: "Using `print(f'Studied {daily_minutes} minutes today!')` correctly substitutes the variable.",
        },
        quiz: {
          question: "Which of the following is the modern, recommended way to format variables inside strings in Python 3.6+?",
          options: [
            "`'Name: ' + name + ' XP: ' + str(xp)`",
            "`f'Name: {name}, XP: {xp}'`",
            "`'Name: %s, XP: %d' % (name, xp)`",
            "`'Name: {0}'.format(name)`",
          ],
          correctIndex: 1,
          explanation: "F-strings (formatted string literals prefixed with `f`) are faster, more readable, and standard in modern Python.",
        },
        xpReward: 30,
      },
      {
        id: "py-02",
        lessonNumber: 2,
        title: "Lists & Array Manipulation",
        estimatedMinutes: 10,
        intro: "Lists are ordered, mutable collections in Python that can store multiple items of any type.",
        learningObjective: "Create, index, slice, and append elements into Python lists.",
        explanation:
          "Python lists use zero-based indexing. You can add items using `.append()`, remove with `.pop()`, and slice sub-lists using `[start:end]` notation.",
        keyTakeaways: [
          "Lists are declared with square brackets: `languages = ['Python', 'JS', 'Rust']`.",
          "Negative indices count backwards from the end: `languages[-1]` gets the last element.",
          "Slicing `[start:end]` excludes the element at the `end` index.",
        ],
        practicalExample: {
          language: "python",
          code: `tech_stack = ["HTML", "CSS", "JavaScript"]
tech_stack.append("Python")

print("First item:", tech_stack[0])
print("Last item:", tech_stack[-1])
print("Sliced:", tech_stack[1:3])`,
          notes: "`tech_stack[1:3]` outputs `['CSS', 'JavaScript']` because index 3 is non-inclusive.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "What will the following code output?\n\nitems = [10, 20, 30, 40, 50]\nprint(items[1:4])",
          options: ["[20, 30, 40]", "[10, 20, 30]", "[20, 30, 40, 50]", "[10, 20, 30, 40]"],
          correctOptionIndex: 0,
          explanation: "Slice [1:4] starts at index 1 (value 20) and stops before index 4 (value 50), giving [20, 30, 40].",
        },
        quiz: {
          question: "How do you access the very last element of a Python list `data` without knowing its length?",
          options: ["`data[len(data)]`", "`data[-1]`", "`data.last()`", "`data[end]`"],
          correctIndex: 1,
          explanation: "Python supports negative indexing, where `-1` always refers to the final element.",
        },
        xpReward: 30,
      },
      {
        id: "py-03",
        lessonNumber: 3,
        title: "Dictionaries & Key-Value Lookups",
        estimatedMinutes: 10,
        intro: "Dictionaries are hash-map data structures that map unique keys to values with O(1) average lookup time.",
        learningObjective: "Store structured student records and safely extract values using `.get()`.",
        explanation:
          "A dictionary is created with curly braces `{ key: value }`. Accessing a non-existent key with `[]` raises `KeyError`, whereas `.get('key', default)` safely returns a fallback.",
        keyTakeaways: [
          "Keys must be hashable/immutable (strings, numbers, tuples).",
          "Use `record.get('field', fallback)` to avoid `KeyError` crashes.",
          "Iterate over keys and values with `for k, v in record.items():`.",
        ],
        practicalExample: {
          language: "python",
          code: `student = {
    "name": "Sarah",
    "track": "Web Engineering",
    "streak": 7
}

# Safe lookup
score = student.get("score", 0)
print(f"{student['name']} current score: {score}")`,
          notes: "Notice that `student.get('score', 0)` returns `0` instead of crashing because `'score'` is missing.",
        },
        interactiveActivity: {
          type: "code",
          prompt: "Create a dictionary `user_profile = {'username': 'coder123', 'level': 4}` and print its level.",
          starterCode: `# Create the dictionary and print level
user_profile = {'username': 'coder123', 'level': 4}
print(user_profile['level'])
`,
          expectedOutput: "4",
          explanation: "Direct dictionary key subscript `user_profile['level']` returns `4`.",
        },
        quiz: {
          question: "What happens if you execute `my_dict['missing_key']` without using `.get()`?",
          options: [
            "It returns `None` silently.",
            "It automatically creates the key with value `None`.",
            "It raises a `KeyError` exception.",
            "It returns `-1`.",
          ],
          correctIndex: 2,
          explanation: "Accessing an undefined key directly with bracket syntax raises a `KeyError` in Python.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "javascript-challenges",
    category: "Programming & Technology",
    title: "JavaScript DOM & Interactivity",
    seriesTitle: "Build Your First Interactive Webpage",
    description:
      "Transform static pages into reactive web apps. Master DOM query selectors, event listeners, dynamic element creation, and state updates.",
    icon: "⚡",
    badge: "Interactive",
    level: "Beginner",
    dailyCommitment: "12 mins/day",
    totalLessons: 6,
    totalXP: 180,
    skills: ["DOM APIs", "Event Handling", "Arrow Functions", "Array Methods", "Web APIs"],
    color: "from-cyan-400 to-blue-500",
    bgGradient: "from-cyan-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "js-01",
        lessonNumber: 1,
        title: "DOM Query Selectors & Content Mutation",
        estimatedMinutes: 10,
        intro: "The Document Object Model (DOM) is an object representation of HTML elements that JavaScript can inspect and modify in real time.",
        learningObjective: "Select elements with `querySelector` and update text and styles dynamically.",
        explanation:
          "Modern JavaScript uses `document.querySelector('#id')` or `document.querySelectorAll('.class')` to target nodes with standard CSS selector syntax.",
        keyTakeaways: [
          "`querySelector` returns the first matching element or `null`.",
          "Use `textContent` to safely insert text without XSS vulnerability.",
          "Use `classList.add('active')` or `classList.toggle('hidden')` to adjust styles.",
        ],
        practicalExample: {
          language: "javascript",
          code: `// Grab an element and update text
const heading = document.querySelector("#status-banner");
if (heading) {
  heading.textContent = "🚀 Interactive Engine Ready!";
  heading.classList.add("text-emerald-400", "font-bold");
}`,
          notes: "Using `textContent` rather than `innerHTML` prevents malicious script injection.",
        },
        interactiveActivity: {
          type: "code",
          prompt: "Write a function `formatStreak(days)` that returns `'Streak: ' + days + ' days'`.",
          starterCode: `function formatStreak(days) {
  return "Streak: " + days + " days";
}
console.log(formatStreak(5));`,
          expectedOutput: "Streak: 5 days",
          explanation: "Function concatenation yields the desired format.",
        },
        quiz: {
          question: "Why is `textContent` preferred over `innerHTML` when rendering user-supplied strings?",
          options: [
            "It is slower but more colorful.",
            "It automatically parses Markdown formatting.",
            "It prevents Cross-Site Scripting (XSS) by not parsing HTML tags.",
            "It only works on `<input>` fields.",
          ],
          correctIndex: 2,
          explanation: "`textContent` treats input strictly as plain text, safeguarding your app from injection attacks.",
        },
        xpReward: 30,
      },
      {
        id: "js-02",
        lessonNumber: 2,
        title: "Event Listeners & Click Handling",
        estimatedMinutes: 10,
        intro: "Events are signals dispatched when the user clicks, types, scrolls, or submits a form.",
        learningObjective: "Attach click event listeners to trigger UI reactions and count interactions.",
        explanation:
          "`addEventListener('click', handler)` allows elements to react to user actions without cluttering HTML attributes like `onclick`.",
        keyTakeaways: [
          "Syntax: `button.addEventListener('click', (event) => { ... });`.",
          "Prevent default form submission reloads with `event.preventDefault()`.",
          "Always verify the element exists before attaching listeners.",
        ],
        practicalExample: {
          language: "javascript",
          code: `let count = 0;
const btn = document.querySelector("#counter-btn");

btn.addEventListener("click", () => {
  count += 1;
  btn.textContent = \`Clicked: \${count} times\`;
});`,
          notes: "Notice how state (`count`) increments and immediately drives the UI text.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "What will the following code log to the console?\n\nlet score = 10;\nfunction addBonus() {\n  let score = 20;\n}\naddBonus();\nconsole.log(score);",
          options: ["10", "20", "undefined", "ReferenceError"],
          correctOptionIndex: 0,
          explanation: "`let score = 20` inside `addBonus` creates a function-scoped variable that does not affect the outer `score = 10`.",
        },
        quiz: {
          question: "Which method prevents a `<form>` element from reloading the web browser page on submit?",
          options: [
            "`event.stopReload()`",
            "`event.preventDefault()`",
            "`event.cancelBubbling()`",
            "`return null;`",
          ],
          correctIndex: 1,
          explanation: "`event.preventDefault()` stops the default browser action, allowing single-page app JavaScript to handle submission.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "ai-machine-learning",
    category: "Programming & Technology",
    title: "AI & Machine Learning",
    seriesTitle: "AI Concepts Explained in Micro-Lessons",
    description:
      "Demystify artificial intelligence. Learn datasets, features, model training, loss functions, neural networks, and responsible ethical AI in bite-sized chunks.",
    icon: "🤖",
    badge: "Cutting-Edge",
    level: "Intermediate",
    dailyCommitment: "10 mins/day",
    totalLessons: 6,
    totalXP: 180,
    skills: ["AI Fundamentals", "Feature Engineering", "Gradient Descent", "Neural Networks", "LLM APIs"],
    color: "from-purple-400 to-indigo-500",
    bgGradient: "from-purple-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "ai-01",
        lessonNumber: 1,
        title: "What is Machine Learning vs Traditional Code?",
        estimatedMinutes: 8,
        intro: "In classical programming, humans write rules + data to produce answers. In Machine Learning, computers take data + answers to discover rules.",
        learningObjective: "Distinguish between rule-based algorithms and statistical pattern learning.",
        explanation:
          "Traditional software uses explicit `if/else` logic. When problems become too nuanced (like recognizing handwritten digits or predicting disease), we train statistical models on labeled examples.",
        keyTakeaways: [
          "Classical: Input Data + Handcrafted Rules = Output Answers.",
          "Machine Learning: Input Data + Known Answers = Learned Model (Rules).",
          "A trained model is essentially a mathematical function with optimized weights.",
        ],
        practicalExample: {
          language: "python",
          code: `# Conceptual difference:
# Traditional Rule-Based:
def is_spam_traditional(email_text):
    return "free money" in email_text.lower() or "win lottery" in email_text.lower()

# Machine Learning Pattern:
# model.predict(vectorized_text) -> outputs probability based on 1,000,000 training emails`,
          notes: "The ML approach adapts to evolving spam tactics without manual rule updates.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "Suppose a model predicts house prices from square footage and bedrooms. What role do square footage and bedrooms play?",
          options: ["Features (Inputs)", "Target Labels (Outputs)", "Hyperparameters", "Loss Functions"],
          correctOptionIndex: 0,
          explanation: "Square footage and bedroom count are the input characteristics or 'features' used to predict the target price.",
        },
        quiz: {
          question: "Which of the following problems is best suited for Machine Learning rather than handcrafted if-else statements?",
          options: [
            "Calculating sales tax based on zip code.",
            "Sorting a list of user IDs in ascending order.",
            "Detecting fraudulent credit card transactions in real time.",
            "Formatting a phone number as (XXX) XXX-XXXX.",
          ],
          correctIndex: 2,
          explanation: "Fraud detection involves subtle, evolving behavioral patterns that are impossible to capture fully with static rules.",
        },
        xpReward: 30,
      },
      {
        id: "ai-02",
        lessonNumber: 2,
        title: "Loss Functions & Gradient Descent",
        estimatedMinutes: 10,
        intro: "A machine learning model improves by measuring how wrong its predictions are, and nudging weights in the direction that reduces error.",
        learningObjective: "Explain how loss functions measure error and how gradient descent minimizes it.",
        explanation:
          "The loss function calculates a score indicating prediction inaccuracy (e.g. Mean Squared Error). Gradient descent computes partial derivatives (the gradient) and takes small steps downhill toward minimal error.",
        keyTakeaways: [
          "Loss Function: Quantifies how far predictions are from ground truth.",
          "Learning Rate: Controls the step size taken during weight updates.",
          "Overfitting: Occurs when a model memorizes noise instead of general patterns.",
        ],
        practicalExample: {
          language: "python",
          code: `# Conceptual Mean Squared Error (MSE) calculation
actuals = [100, 200, 300]
predictions = [110, 190, 315]

# Calculate squared differences
errors = [(act - pred) ** 2 for act, pred in zip(actuals, predictions)]
mse = sum(errors) / len(errors)
print(f"Mean Squared Error: {mse:.2f}")`,
          notes: "Gradient descent uses this error signal to nudge weights in the opposite direction of the gradient.",
        },
        interactiveActivity: {
          type: "code",
          prompt: "Write a line of Python to calculate the absolute error between `actual = 50` and `prediction = 42`.",
          starterCode: `actual = 50
prediction = 42
abs_error = abs(actual - prediction)
print(abs_error)`,
          expectedOutput: "8",
          explanation: "`abs(50 - 42)` evaluates to `8`.",
        },
        quiz: {
          question: "What happens if the learning rate in gradient descent is set too high?",
          options: [
            "The model trains instantly and achieves 100% accuracy.",
            "The optimization can overshoot the minimum and diverge or fail to converge.",
            "The computer runs out of RAM.",
            "It turns supervised learning into unsupervised learning.",
          ],
          correctIndex: 1,
          explanation: "A learning rate that is too aggressive causes steps to oscillate wildly and miss the optimal valley.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "data-science",
    category: "Programming & Technology",
    title: "Data Science with Python",
    seriesTitle: "Mini Projects with Python and Jupyter Notebook",
    description:
      "Clean messy datasets, analyze trends with Pandas, vectorize calculations with NumPy, and create storytelling charts.",
    icon: "📊",
    badge: "Practical",
    level: "Intermediate",
    dailyCommitment: "15 mins/day",
    totalLessons: 6,
    totalXP: 180,
    skills: ["Pandas", "NumPy", "Data Cleaning", "Matplotlib", "Exploratory Analysis"],
    color: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "ds-01",
        lessonNumber: 1,
        title: "Pandas DataFrames & Quick Summaries",
        estimatedMinutes: 10,
        intro: "A DataFrame is a 2-dimensional labeled data structure with columns of potentially different types, like a spreadsheet or SQL table in memory.",
        learningObjective: "Load datasets, inspect columns, and compute descriptive statistics in one command.",
        explanation:
          "`pandas` provides `.head()`, `.info()`, and `.describe()` to immediately summarize numeric distributions, medians, and missing null counts.",
        keyTakeaways: [
          "`df.head(5)` previews the first 5 records.",
          "`df.describe()` returns mean, standard deviation, quartiles, and min/max.",
          "`df.isnull().sum()` pinpoints columns needing cleaning.",
        ],
        practicalExample: {
          language: "python",
          code: `import pandas as pd

# Creating a mock student performance dataframe
data = {
    "student": ["Alex", "Sarah", "Priya", "Marcus"],
    "streak_days": [5, 4, 12, 9],
    "xp": [1250, 950, 2400, 1850]
}
df = pd.DataFrame(data)
print(df.describe())`,
          notes: "`describe()` gives an instant statistical summary of numeric fields.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "In Pandas, which method filters rows where `df['xp'] > 1000`?",
          options: ["`df[df['xp'] > 1000]`", "`df.filter('xp > 1000')`", "`df.where(xp > 1000)`", "`df.select('xp > 1000')`"],
          correctOptionIndex: 0,
          explanation: "Boolean indexing `df[condition]` is the idiomatic Pandas method to filter rows.",
        },
        quiz: {
          question: "Which Pandas method reveals the data types and count of non-null values for all columns?",
          options: ["`df.info()`", "`df.schema()`", "`df.types()`", "`df.count_all()`"],
          correctIndex: 0,
          explanation: "`df.info()` prints index range, column names, non-null counts, and memory usage.",
        },
        xpReward: 30,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // B. SOFT SKILLS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "communication-skills",
    category: "Soft Skills",
    title: "Communication Mastery",
    seriesTitle: "Daily Five-Minute Speaking Drills",
    description:
      "Deliver crystal-clear technical explanations, master the 30-second elevator pitch, listen actively in team standups, and communicate with clarity.",
    icon: "🎙️",
    badge: "High Impact",
    level: "All Levels",
    dailyCommitment: "5 mins/day",
    totalLessons: 5,
    totalXP: 150,
    skills: ["Elevator Pitch", "Executive Summaries", "Active Listening", "Cross-Functional Sync"],
    color: "from-sky-400 to-indigo-400",
    bgGradient: "from-sky-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "comm-01",
        lessonNumber: 1,
        title: "The 30-Second Engineering Elevator Pitch",
        estimatedMinutes: 5,
        intro: "Can you describe what you are building or working on in 30 seconds without rambling or drowning in jargon?",
        learningObjective: "Structure a concise 3-part pitch: Problem, Solution, and Concrete Impact.",
        explanation:
          "Executives, interviewers, and cross-functional team members care about outcomes. Use the PSI Formula: Problem (what hurts), Solution (what you built), Impact (what improved).",
        keyTakeaways: [
          "Hook: 'We noticed our checkout page took 4.2 seconds to load on mobile.'",
          "Action: 'I migrated our images to Next.js WebP dynamic caching and reduced bundle size by 40%.'",
          "Result: 'This boosted mobile conversion by 12% and cut server egress costs.'",
        ],
        practicalExample: {
          language: "markdown",
          code: `### The PSI Framework:
1. **Problem (1 sentence)**: "Junior developers were taking 3 days to configure local dev environments."
2. **Solution (1 sentence)**: "I created an automated Docker Compose environment with seed databases."
3. **Impact (1 sentence)**: "Onboarding time dropped from 3 days to under 15 minutes."`,
          notes: "Notice how the impact is quantified and directly answers 'Why should anyone care?'.",
        },
        interactiveActivity: {
          type: "interactive-drill",
          prompt: "Which of the following is the most compelling opening statement for an engineering sprint update?",
          options: [
            "'Uh, so yesterday I looked at some code and committed a few files into git.'",
            "'I optimized database indexes on the user search query, dropping search response latency from 680ms to 45ms.'",
            "'I spent 8 hours typing on VS Code and fixed some stuff in the backend.'",
            "'The server was slow so I did some general maintenance work.'",
          ],
          correctOptionIndex: 1,
          explanation: "Option B specifies what was done, the technical mechanism (indexes), and the quantified metric outcome.",
        },
        quiz: {
          question: "When explaining technical architecture to non-technical stakeholders (e.g. Product or Sales), what should you avoid?",
          options: [
            "Using business outcome metrics like latency and conversion.",
            "Deep, uncontextualized acronym dumps without explaining what they mean.",
            "High-level analogies like 'think of an API like a waiter taking orders'.",
            "Keeping the explanation under two minutes.",
          ],
          correctIndex: 1,
          explanation: "Dumping jargon and unexplained acronyms alienates non-technical partners and obscures the business value.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "critical-thinking",
    category: "Soft Skills",
    title: "Critical Thinking & Logic",
    seriesTitle: "Solve One Puzzle a Day",
    description:
      "Sharpen analytical reasoning, break complex problems into first principles, recognize hidden constraints, and solve logic puzzles.",
    icon: "🧩",
    badge: "Problem Solving",
    level: "All Levels",
    dailyCommitment: "5 mins/day",
    totalLessons: 5,
    totalXP: 150,
    skills: ["First Principles", "Root Cause Analysis", "Pattern Recognition", "Logic Puzzles"],
    color: "from-fuchsia-400 to-pink-500",
    bgGradient: "from-fuchsia-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "crit-01",
        lessonNumber: 1,
        title: "Root Cause Analysis: The 5 Whys Technique",
        estimatedMinutes: 6,
        intro: "When a bug or production incident happens, patching the immediate symptom often leaves the true systemic vulnerability untouched.",
        learningObjective: "Drill down through surface symptoms using the 5 Whys framework to discover systemic root causes.",
        explanation:
          "Developed by Toyota and adopted by top engineering teams, asking 'Why?' 5 times peels away layers of symptoms to expose organizational or procedural flaws.",
        keyTakeaways: [
          "Symptom: The server crashed with Out of Memory.",
          "Why 1: A query returned 500,000 records at once.",
          "Why 2: There was no pagination on the export endpoint.",
          "Why 3: The developer copy-pasted an internal debug script.",
          "Why 4: The PR review checklist lacked data-volume checks.",
          "Root Fix: Implement database query row limits AND update PR automated linter.",
        ],
        practicalExample: {
          language: "markdown",
          code: `Bug: "Users cannot log in after password reset."
- Why 1? The JWT token is rejected as invalid.
- Why 2? The token secret changed during redeployment.
- Why 3? JWT_SECRET was hardcoded to random UUID in memory instead of environment variable.
- Why 4? No CI/CD check verified mandatory production env variables.
- Why 5? The staging-to-prod deployment checklist wasn't automated.`,
          notes: "Fixing 'Why 5' prevents dozens of future outages, not just this one token issue.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "A database CPU spikes to 100% every morning at 9:00 AM. What is the most rigorous first troubleshooting step?",
          options: [
            "Reboot the database immediately and hope it goes away.",
            "Check slow-query logs and scheduled cron jobs running at 9:00 AM.",
            "Buy an 8x larger database tier without checking queries.",
            "Tell users not to log in at 9:00 AM.",
          ],
          correctOptionIndex: 1,
          explanation: "Checking logs and scheduled cron jobs investigates the factual root cause before spending money or taking uninformed action.",
        },
        quiz: {
          question: "What is the primary danger of stopping at the first 'Why' when an outage occurs?",
          options: [
            "You will write too much documentation.",
            "You only treat the immediate symptom, leaving the underlying defect to strike again.",
            "The computer won't let you deploy.",
            "It costs more money immediately.",
          ],
          correctIndex: 1,
          explanation: "Fixing only symptoms allows identical failures to recur under different disguises.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "leadership-basics",
    category: "Soft Skills",
    title: "Leadership & Teamwork",
    seriesTitle: "Micro-Lessons on Teamwork",
    description:
      "Cultivate engineering leadership. Learn empathetic code reviews, navigating git merge conflicts collaboratively, agile estimations, and resolving disagreements.",
    icon: "🤝",
    badge: "Collaboration",
    level: "All Levels",
    dailyCommitment: "5 mins/day",
    totalLessons: 5,
    totalXP: 150,
    skills: ["Code Review Empathy", "Disagree & Commit", "Agile Estimation", "Conflict Resolution"],
    color: "from-teal-400 to-emerald-500",
    bgGradient: "from-teal-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "lead-01",
        lessonNumber: 1,
        title: "Writing Constructive Code Reviews with Empathy",
        estimatedMinutes: 6,
        intro: "Code reviews are not tests of superiority; they are collaborative learning opportunities that protect production quality.",
        learningObjective: "Frame code suggestions as collaborative questions rather than harsh commands.",
        explanation:
          "Instead of 'Why did you write this garbage? This will break', use 'What do you think about extracting this loop into a helper function so we can reuse it in tests?' Label suggestions as `[nit]`, `[suggestion]`, or `[blocking]`.",
        keyTakeaways: [
          "Critique the code, never the person.",
          "Explain the 'why': 'If an array is empty here, line 42 might throw TypeError.'",
          "Praise elegant solutions and clean abstractions publicly.",
        ],
        practicalExample: {
          language: "markdown",
          code: `### Before vs After:
❌ "Your regex is unreadable and slow."
✅ "Could we add a brief comment explaining this regex pattern? Alternatively, String.includes() might be simpler here if we only need exact matches."

❌ "Fix this."
✅ "[nit] Consider naming this 'isActive' instead of 'flag' for clarity."`,
          notes: "Notice how constructive comments guide the author toward shared understanding without defensiveness.",
        },
        interactiveActivity: {
          type: "interactive-drill",
          prompt: "Which PR review comment best exemplifies empathetic, high-standard engineering?",
          options: [
            "'Rewrite this completely, I don't like it.'",
            "'Looks good, I didn't test it but merged.'",
            "'Nice work on the auth handler! Quick thought: if `email` is null, line 18 might throw. Could we add optional chaining `user?.email`?'",
            "'Why didn't you know about optional chaining?'",
          ],
          correctOptionIndex: 2,
          explanation: "Option C celebrates the achievement, pinpoints an edge-case risk with line numbers, and suggests a concrete remedy.",
        },
        quiz: {
          question: "What does prefixing a review comment with `[nit]` (nitpick) signal to the pull request author?",
          options: [
            "The PR is rejected and must be rewritten.",
            "It's a minor stylistic suggestion that shouldn't block merging if time is urgent.",
            "The comment is an automated bot warning.",
            "It indicates an emergency security vulnerability.",
          ],
          correctIndex: 1,
          explanation: "`[nit]` denotes trivial polish (formatting, naming) that the author may address at their discretion without blocking shipment.",
        },
        xpReward: 30,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // C. CAREER-ORIENTED LEARNING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "resume-building",
    category: "Career-Oriented",
    title: "Software Engineer Resume",
    seriesTitle: "Build Your Resume in Seven Steps",
    description:
      "Craft an ATS-optimized tech resume. Structure your personal summary, technical skills matrix, STAR project bullets, and portfolio links.",
    icon: "📄",
    badge: "Career Ready",
    level: "All Levels",
    dailyCommitment: "8 mins/day",
    totalLessons: 7,
    totalXP: 210,
    skills: ["ATS Optimization", "STAR Method", "Technical Skills Matrix", "GitHub Showcase"],
    color: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "res-01",
        lessonNumber: 1,
        title: "The Google XYZ Resume Formula",
        estimatedMinutes: 7,
        intro: "Hiring managers spend an average of 6 seconds scanning a resume. Vague bullets like 'responsible for backend' get passed over.",
        learningObjective: "Transform generic task descriptions into compelling, quantified accomplishment bullets.",
        explanation:
          "Google's formula for resume bullets is: 'Accomplished [X], as measured by [Y], by doing [Z]'. Start with a strong action verb, state the measurable outcome, and specify the technology used.",
        keyTakeaways: [
          "❌ 'Worked on the frontend search bar.'",
          "✅ 'Engineered debounced autocomplete search using React and Trie data structure, reducing API requests by 65% and improving search latency to <50ms.'",
          "Always provide live deployment links and public GitHub repositories for your flagship projects.",
        ],
        practicalExample: {
          language: "markdown",
          code: `### Transforming Resume Bullets:
- **X (What you accomplished)**: Decreased initial page load time from 4.8s to 1.2s
- **Y (How it was measured)**: Verified via Google Lighthouse score (improved from 48 to 98)
- **Z (How you did it)**: Implemented Next.js Server Components, code splitting, and WebP image optimization.

*Full Bullet*:
"Accelerated initial page load from 4.8s to 1.2s (98 Lighthouse score) by refactoring React client components into Next.js Server Components and implementing responsive WebP image pipelines."`,
          notes: "Quantifiable results demonstrate real-world engineering craftsmanship.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "Which bullet point follows the Google XYZ accomplishment formula best?",
          options: [
            "'Responsible for writing CSS and HTML code for various pages.'",
            "'Built a real-time collaborative whiteboard app used by 300+ students using WebSockets and Canvas API, cutting sync latency to <20ms.'",
            "'Learned React and Node.js during my spare time.'",
            "'Helped the senior engineer with some bug fixes.'",
          ],
          correctOptionIndex: 1,
          explanation: "Option B specifies what was built (whiteboard app), quantified impact (300+ students, <20ms latency), and exact tech stack (WebSockets, Canvas API).",
        },
        quiz: {
          question: "What is the recommended length for an entry-level to mid-level software engineering resume?",
          options: [
            "1 page strictly, focused on high-signal projects and skills.",
            "3 to 4 pages detailing every school assignment.",
            "A slideshow presentation.",
            "Length does not matter as long as there are many keywords.",
          ],
          correctIndex: 0,
          explanation: "A crisp 1-page resume maximizes readability and prevents recruiters from missing your strongest accomplishments.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "interview-prep",
    category: "Career-Oriented",
    title: "Technical Interview Drills",
    seriesTitle: "Daily Practice Questions and Answers",
    description:
      "Ace technical screenings and behavioral interviews. Master system design warmups, the JavaScript Event Loop, Big-O analysis, and behavioral questions.",
    icon: "💼",
    badge: "Interview Prep",
    level: "Intermediate",
    dailyCommitment: "10 mins/day",
    totalLessons: 6,
    totalXP: 180,
    skills: ["System Design", "Big-O Analysis", "Behavioral STAR", "Live Coding Communication"],
    color: "from-violet-400 to-purple-500",
    bgGradient: "from-violet-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "int-01",
        lessonNumber: 1,
        title: "Demystifying the JavaScript Event Loop & Microtasks",
        estimatedMinutes: 8,
        intro: "The Event Loop is the single most frequently asked JavaScript interview question for junior and senior engineers alike.",
        learningObjective: "Predict the exact execution order of synchronous code, Promises (microtasks), and setTimeout (macrotasks).",
        explanation:
          "JavaScript is single-threaded. Synchronous code on the Call Stack executes first. When the stack is empty, the Event Loop flushes all Microtasks (Promise `.then()` callbacks, `queueMicrotask`), before processing the next Macrotask (e.g. `setTimeout`).",
        keyTakeaways: [
          "Call Stack (Sync) -> Microtask Queue (Promises) -> Macrotask Queue (setTimeout/setInterval).",
          "Promises have higher execution priority than `setTimeout(..., 0)`.",
          "`async/await` is syntactic sugar over Promises; code after `await` is queued as a microtask.",
        ],
        practicalExample: {
          language: "javascript",
          code: `console.log("1 - Sync Start");

setTimeout(() => {
  console.log("4 - Macrotask (Timeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Microtask (Promise)");
});

console.log("2 - Sync End");

// Output Order:
// 1 - Sync Start
// 2 - Sync End
// 3 - Microtask (Promise)
// 4 - Macrotask (Timeout)`,
          notes: "Even though `setTimeout` has 0ms delay, the Promise microtask executes first!",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "What is the logged sequence of the following code?\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
          options: ["A, D, C, B", "A, B, C, D", "A, D, B, C", "C, A, D, B"],
          correctOptionIndex: 0,
          explanation: "Synchronous 'A' and 'D' run first. Then microtask 'C' (Promise) executes. Finally, macrotask 'B' (setTimeout) runs.",
        },
        quiz: {
          question: "Which queue is processed first after the current synchronous JavaScript call stack is emptied?",
          options: [
            "The Macrotask queue (setTimeout, setInterval).",
            "The Microtask queue (Promise.then, queueMicrotask).",
            "The Web Worker background thread.",
            "The DOM Rendering engine directly.",
          ],
          correctIndex: 1,
          explanation: "The microtask queue is always drained completely before the browser executes the next macrotask.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "freelancing-fundamentals",
    category: "Career-Oriented",
    title: "Freelancing Fundamentals",
    seriesTitle: "Learn How to Start Freelancing",
    description:
      "Turn your coding skills into independent client revenue. Master niche selection, proposal copywriting, pricing models, and client communication.",
    icon: "🌐",
    badge: "Freelance",
    level: "All Levels",
    dailyCommitment: "8 mins/day",
    totalLessons: 6,
    totalXP: 180,
    skills: ["Client Discovery", "Proposal Writing", "Value-Based Pricing", "Scope Management"],
    color: "from-amber-400 to-emerald-400",
    bgGradient: "from-amber-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "free-01",
        lessonNumber: 1,
        title: "Writing High-Converting Project Proposals",
        estimatedMinutes: 7,
        intro: "Most freelancers send 5-paragraph cover letters detailing their life story. Clients only care about whether you understand their specific problem.",
        learningObjective: "Draft a winning 4-paragraph proposal that focuses entirely on client outcomes and milestones.",
        explanation:
          "Structure: 1) Acknowledge their specific goal with empathy, 2) Outline the exact technical approach and milestones, 3) Share 1-2 relevant portfolio links, 4) Provide a clear call to action.",
        keyTakeaways: [
          "Do not say 'I am a passionate developer looking for opportunities.'",
          "Instead say: 'I reviewed your Figma designs and can implement this responsive layout in Next.js with sub-second page loads.'",
          "Scope creep defense: Always specify what is included and what costs extra.",
        ],
        practicalExample: {
          language: "markdown",
          code: `### Winning Proposal Template:
"Hi [Client Name],
I reviewed your requirement to integrate Stripe payments with your existing user database.

Here is how I plan to implement this:
1. Set up Stripe Webhooks to safely capture invoice.paid events.
2. Update user subscription status in PostgreSQL within a database transaction.
3. Test edge cases (card declines, chargebacks) using Stripe CLI mock events.

You can inspect a live subscription demo I built here: [link]
Are you free for a brief 10-minute sync this Tuesday to finalize the data fields?"`,
          notes: "Notice how the developer demonstrates exact domain knowledge without generic fluff.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "What is the best defense against 'scope creep' (clients asking for endless free additions)?",
          options: [
            "Do all the extra work for free to make the client happy.",
            "Write a clear Statement of Work (SOW) defining exact deliverables, with an hourly rate for changes outside scope.",
            "Block the client on email.",
            "Never give clients a completion deadline.",
          ],
          correctOptionIndex: 1,
          explanation: "A written Statement of Work protects both parties and creates an orderly way to invoice for added features.",
        },
        quiz: {
          question: "Educational Disclaimer: Does enrolling in freelancing educational courses guarantee immediate client income?",
          options: [
            "Yes, income is legally guaranteed.",
            "No; career modules provide educational guidance and frameworks, but client acquisition depends on personal skill, portfolio quality, and effort.",
            "Yes, if you study for 10 minutes a day.",
            "Only on weekends.",
          ],
          correctIndex: 1,
          explanation: "Educational guidance provides proven frameworks, but success depends on individual execution, portfolio building, and market conditions.",
        },
        xpReward: 30,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // D. FUN AND CREATIVE LEARNING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "coding-puzzles",
    category: "Fun & Creative",
    title: "Interactive Coding Puzzles",
    seriesTitle: "Guess the Output",
    description:
      "Test your sharp eye for trick syntax, closure scopes, type coercions, and asynchronous quirks before revealing the runtime explanation.",
    icon: "🎯",
    badge: "Mind Bender",
    level: "Intermediate",
    dailyCommitment: "5 mins/day",
    totalLessons: 6,
    totalXP: 180,
    skills: ["Code Tracing", "Type Coercion", "Closure Mechanics", "Debugging"],
    color: "from-rose-400 to-pink-500",
    bgGradient: "from-rose-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "puz-01",
        lessonNumber: 1,
        title: "The Python List Multiplication Trap",
        estimatedMinutes: 6,
        intro: "In Python, creating a 2D matrix using list multiplication `[[0] * 3] * 3` contains a notorious hidden trap for unwary developers.",
        learningObjective: "Predict what happens when mutating nested lists created via pointer multiplication.",
        explanation:
          "`[0] * 3` creates a single list `[0, 0, 0]`. When you multiply that list with `* 3`, Python does not clone the list 3 times—it copies the reference to the same list 3 times! Mutating row 0 mutates all rows simultaneously.",
        keyTakeaways: [
          "`matrix = [[0] * 3] * 3` creates 3 references pointing to the exact same memory address.",
          "Modifying `matrix[0][0] = 99` causes every row to change.",
          "Fix: Use list comprehension `matrix = [[0] * 3 for _ in range(3)]` to create independent row objects.",
        ],
        practicalExample: {
          language: "python",
          code: `# The Trap:
trap_matrix = [[0] * 2] * 2
trap_matrix[0][0] = 7
print("Trap output:", trap_matrix) # [[7, 0], [7, 0]]!

# The Correct Solution:
safe_matrix = [[0] * 2 for _ in range(2)]
safe_matrix[0][0] = 7
print("Safe output:", safe_matrix) # [[7, 0], [0, 0]]`,
          notes: "Notice how list comprehension allocates a brand new list in each iteration.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "What will the following Python code output?\n\na = [1, 2]\nb = a\nb.append(3)\nprint(a)",
          options: ["[1, 2]", "[1, 2, 3]", "[3]", "TypeError"],
          correctOptionIndex: 1,
          explanation: "In Python, variables store references to objects in memory. `b = a` points to the same list, so modifying `b` modifies `a`.",
        },
        quiz: {
          question: "How do you create a true independent shallow copy of a Python list `original`?",
          options: [
            "`copy_list = original`",
            "`copy_list = original.copy()` or `original[:]`",
            "`copy_list = clone(original)`",
            "`copy_list = &original`",
          ],
          correctIndex: 1,
          explanation: "`original.copy()` or slicing `original[:]` creates a new list container with duplicated top-level elements.",
        },
        xpReward: 30,
      },
      {
        id: "puz-02",
        lessonNumber: 2,
        title: "JavaScript Type Coercion: typeof NaN & Comparisons",
        estimatedMinutes: 6,
        intro: "JavaScript is famous for bizarre type coercion rules. Do you know what `typeof NaN` actually evaluates to?",
        learningObjective: "Understand JavaScript's IEEE-754 numeric representation and avoid `NaN === NaN` pitfalls.",
        explanation:
          "`NaN` stands for 'Not a Number', but according to the ECMAScript spec, its type is `number`! Furthermore, `NaN === NaN` evaluates to `false` because IEEE-754 specifies NaN cannot equal any value, including itself. Use `Number.isNaN(x)`.",
        keyTakeaways: [
          "`typeof NaN === 'number'` (Yes, really!).",
          "`NaN === NaN` is `false`. Always use `Number.isNaN()`.",
          "`[] + []` is `''` (empty string) due to primitive string conversion.",
        ],
        practicalExample: {
          language: "javascript",
          code: `console.log(typeof NaN); // "number"
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true

// Bizarre addition:
console.log([] + []); // "" (string)
console.log([] + {}); // "[object Object]"`,
          notes: "Strict equality checks cannot detect NaN. Always reach for `Number.isNaN()`.",
        },
        interactiveActivity: {
          type: "predict",
          prompt: "What does the following JavaScript expression evaluate to?\n\nconsole.log(typeof ('5' - 2));",
          options: ["'string'", "'number'", "'NaN'", "undefined"],
          correctOptionIndex: 1,
          explanation: "The minus operator `-` only works on numbers, so JavaScript automatically coerces `'5'` to the number `5`, resulting in `3` whose typeof is `'number'`.",
        },
        quiz: {
          question: "Which function should you use to accurately check if a variable `val` is `NaN`?",
          options: [
            "`val === NaN`",
            "`Number.isNaN(val)`",
            "`val == 'NaN'`",
            "`val.isNotANumber()`",
          ],
          correctIndex: 1,
          explanation: "`Number.isNaN()` is the modern, robust method that doesn't forcefully coerce non-numeric types.",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "gamified-quizzes",
    category: "Fun & Creative",
    title: "Gamified Quiz Arenas",
    seriesTitle: "Beat the Challenge",
    description:
      "Rapid-fire coding challenges with instant score multipliers, detailed explanations, and friendly competition to cement your knowledge.",
    icon: "⚡",
    badge: "Speed Run",
    level: "All Levels",
    dailyCommitment: "5 mins/day",
    totalLessons: 4,
    totalXP: 120,
    skills: ["Rapid Recall", "Syntax Mastery", "Time Management", "Mental Agility"],
    color: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "quiz-arena-01",
        lessonNumber: 1,
        title: "Frontend Rapid-Fire Trivia",
        estimatedMinutes: 5,
        intro: "Test your rapid recall across HTML5, CSS Grid, and modern JavaScript syntax.",
        learningObjective: "Reinforce foundational web mechanics under friendly timed conditions.",
        explanation:
          "Quick quizzes build strong retrieval pathways in memory. The faster you correctly identify concepts, the more natural they become during live coding.",
        keyTakeaways: [
          "Active recall strengthens synaptic connections much faster than passive re-reading.",
          "Identify your weak spots immediately and review targeted micro-lessons.",
        ],
        practicalExample: {
          language: "javascript",
          code: `// Quick check:
// Which CSS property aligns flex items along the cross axis?
// Answer: align-items!
//
// Which array method creates a new array with all elements that pass a test?
// Answer: .filter()!`,
          notes: "Quick recall allows you to code without pausing to Google simple syntax.",
        },
        interactiveActivity: {
          type: "interactive-drill",
          prompt: "Which HTML5 tag is the most semantically appropriate for site navigation links?",
          options: ["`<div class='nav'>`", "`<nav>`", "`<menu-bar>`", "`<section>`"],
          correctOptionIndex: 1,
          explanation: "`<nav>` is the dedicated semantic element recognized by screen readers and search engines.",
        },
        quiz: {
          question: "Which HTTP status code indicates a successfully processed request that returns no body content?",
          options: ["`200 OK`", "`204 No Content`", "`301 Moved Permanently`", "`404 Not Found`"],
          correctIndex: 1,
          explanation: "`204 No Content` signifies success without an entity body (commonly used for DELETE operations).",
        },
        xpReward: 30,
      },
    ],
  },

  {
    slug: "mini-projects",
    category: "Fun & Creative",
    title: "Practical Mini-Projects",
    seriesTitle: "Build a Calculator App in 15 Minutes",
    description:
      "Complete bite-sized, real-world portfolio applications in 15-minute bursts: interactive calculators, pomodoro timers, and markdown viewers.",
    icon: "🚀",
    badge: "Portfolio Ready",
    level: "Beginner",
    dailyCommitment: "15 mins/day",
    totalLessons: 4,
    totalXP: 160,
    skills: ["State Management", "DOM UI", "Mathematical Evaluation", "Component Architecture"],
    color: "from-emerald-400 to-cyan-500",
    bgGradient: "from-emerald-500/10 via-[#07131b] to-[#040814]",
    lessons: [
      {
        id: "proj-01",
        lessonNumber: 1,
        title: "Architecting a Clean Glassmorphic Calculator",
        estimatedMinutes: 15,
        intro: "A calculator is a classic project that teaches state machines, expression parsing, and edge-case handling (like dividing by zero).",
        learningObjective: "Manage numeric inputs, operator chaining, and clear actions cleanly in state.",
        explanation:
          "Rather than using `eval()` (which is dangerous and insecure), parse user keystrokes into `previousValue`, `operator`, and `currentValue`. Handle decimal inputs and clear actions gracefully.",
        keyTakeaways: [
          "Never use `eval()` on raw strings in production applications.",
          "Manage state cleanly: `display`, `previousOperand`, `operation`.",
          "Handle divide by zero by displaying a friendly `'Error'` message.",
        ],
        practicalExample: {
          language: "javascript",
          code: `// Safe calculator compute engine
function compute(prev, current, operation) {
  const a = parseFloat(prev);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return "";

  switch (operation) {
    case "+": return (a + b).toString();
    case "-": return (a - b).toString();
    case "*": return (a * b).toString();
    case "/": return b === 0 ? "Error: Div by 0" : (a / b).toString();
    default: return "";
  }
}

console.log("5 + 3 =", compute("5", "3", "+"));
console.log("10 / 0 =", compute("10", "0", "/"));`,
          notes: "Notice how clean switch statements prevent unexpected behavior and guard against division by zero.",
        },
        interactiveActivity: {
          type: "code",
          prompt: "Implement a function `addNumbers(a, b)` that returns their sum, and log `addNumbers(15, 25)`.",
          starterCode: `function addNumbers(a, b) {
  return a + b;
}
console.log(addNumbers(15, 25));`,
          expectedOutput: "40",
          explanation: "`addNumbers(15, 25)` returns `40`.",
        },
        quiz: {
          question: "Why should software engineers avoid using JavaScript's native `eval()` function to calculate user expressions?",
          options: [
            "It only works on negative numbers.",
            "It executes arbitrary strings as code, opening severe security and performance vulnerabilities.",
            "It requires an internet connection.",
            "It rounds all numbers to the nearest integer.",
          ],
          correctIndex: 1,
          explanation: "`eval()` executes whatever code is passed to it, exposing applications to injection attacks and deoptimizing the JS engine.",
        },
        xpReward: 40,
      },
    ],
  },
];

export function getMicroTopicBySlug(slug: string): MicroTopicSeries | undefined {
  return MICRO_TOPIC_SERIES.find((series) => series.slug === slug);
}

export function getAllMicroTopics(): MicroTopicSeries[] {
  return MICRO_TOPIC_SERIES;
}
