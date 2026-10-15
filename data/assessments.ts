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
  "course-web-dev-101": {
    courseId: "course-web-dev-101",
    courseTitle: "Web Development Foundations: HTML5, CSS3 & JavaScript",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-web-1",
        question: "Which HTML5 semantic element is most appropriate for enclosing the primary navigation links of a website?",
        type: "multiple-choice",
        options: ["<menu>", "<nav>", "<header>", "<section>"],
        correctAnswer: 1,
        explanation: "The <nav> element is specifically designated in HTML5 for major navigation blocks, ensuring screen readers and crawlers parse site hierarchy properly.",
      },
      {
        id: "q-web-2",
        question: "In modern CSS Flexbox, which property aligns flex items along the cross axis (perpendicular to flex-direction)?",
        type: "multiple-choice",
        options: ["justify-content", "align-items", "flex-wrap", "content-align"],
        correctAnswer: 1,
        explanation: "align-items distributes items along the cross axis, whereas justify-content aligns items along the main axis.",
      },
      {
        id: "q-web-3",
        question: "True or False: The CSS property 'box-sizing: border-box' includes padding and border within the specified element width and height.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "border-box ensures width and height include content, padding, and border, preventing layout breakage when styling elements.",
      },
      {
        id: "q-web-4",
        question: "Which JavaScript method is recommended to attach multiple non-overwriting event listeners to a DOM element?",
        type: "multiple-choice",
        options: ["element.onclick = fn", "element.addEventListener('click', fn)", "element.attachHandler('click', fn)", "element.listen('click', fn)"],
        correctAnswer: 1,
        explanation: "addEventListener supports registering multiple independent handlers on an event without overwriting existing callbacks.",
      },
      {
        id: "q-web-5",
        question: "What is the primary difference between 'let' and 'var' declarations in JavaScript?",
        type: "multiple-choice",
        options: [
          "'let' is block-scoped while 'var' is function-scoped",
          "'let' is hoisted to window while 'var' is not",
          "'var' prevents variable reassignment while 'let' allows it",
          "There is no difference in modern JavaScript"
        ],
        correctAnswer: 0,
        explanation: "'let' enforces block scoping within curly braces {}, whereas 'var' is hoisted and scoped to the enclosing function or global context.",
      },
    ],
  },
  "course-python-101": {
    courseId: "course-python-101",
    courseTitle: "Python Programming: Zero to Production",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-py-1",
        question: "Which built-in Python data structure is mutable and maintains insertion order as of Python 3.7+?",
        type: "multiple-choice",
        options: ["tuple", "dict", "frozenset", "int"],
        correctAnswer: 1,
        explanation: "In Python 3.7+, standard dictionaries (dict) are guaranteed to maintain insertion order while being fully mutable.",
      },
      {
        id: "q-py-2",
        question: "What is the output of `[x**2 for x in range(4) if x % 2 == 0]` in Python?",
        type: "multiple-choice",
        options: ["[0, 4]", "[1, 9]", "[0, 1, 4, 9]", "[0, 2, 4]"],
        correctAnswer: 0,
        explanation: "range(4) produces 0, 1, 2, 3. The even numbers are 0 and 2. 0^2 = 0 and 2^2 = 4, resulting in [0, 4].",
      },
      {
        id: "q-py-3",
        question: "True or False: In Python, strings and tuples are immutable objects.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Both strings and tuples in Python cannot be modified in-place once created; any transformation returns a new object.",
      },
      {
        id: "q-py-4",
        question: "Which keyword is used in Python to create a generator function that produces values on-demand?",
        type: "multiple-choice",
        options: ["return", "yield", "generate", "emit"],
        correctAnswer: 1,
        explanation: "'yield' pauses function execution and produces the next sequence item, keeping memory footprint minimal.",
      },
      {
        id: "q-py-5",
        question: "What does the 'with' statement in Python (context manager) guarantee when working with files?",
        type: "multiple-choice",
        options: [
          "It forces the file to be opened in read-only mode",
          "It automatically closes the file even if exceptions occur",
          "It accelerates disk read/write throughput by 50%",
          "It encrypts file contents using AES-256"
        ],
        correctAnswer: 1,
        explanation: "Context managers invoke __enter__ and __exit__, ensuring resources like file handles or sockets are closed reliably.",
      },
    ],
  },
  "course-js-ts-101": {
    courseId: "course-js-ts-101",
    courseTitle: "Modern JavaScript & TypeScript Architecture",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-jsts-1",
        question: "What is the primary difference in TypeScript between an 'interface' and a 'type' alias?",
        type: "multiple-choice",
        options: [
          "Interfaces support declaration merging; type aliases do not",
          "Types can only be used with primitive numbers",
          "Interfaces cannot be implemented by classes",
          "There are no semantic differences whatsoever"
        ],
        correctAnswer: 0,
        explanation: "TypeScript interfaces can be reopened and extended via declaration merging across files, which type aliases do not support.",
      },
      {
        id: "q-jsts-2",
        question: "What is the return type of an `async` function in TypeScript/JavaScript?",
        type: "multiple-choice",
        options: ["void", "Promise<T>", "Deferred<T>", "Observable<T>"],
        correctAnswer: 1,
        explanation: "All async functions inherently wrap their return values in a Promise.",
      },
      {
        id: "q-jsts-3",
        question: "True or False: In TypeScript, 'unknown' is a type-safe counterpart to 'any' that requires type narrowing before use.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Values of type 'unknown' cannot be accessed or called until verified with typeof, instanceof, or custom type guards.",
      },
      {
        id: "q-jsts-4",
        question: "Which JavaScript operator allows safe property navigation without throwing a TypeError on null or undefined?",
        type: "multiple-choice",
        options: ["??", "?.", "||", "&&"],
        correctAnswer: 1,
        explanation: "The optional chaining operator (?.) short-circuits to undefined if the reference is nullish.",
      },
      {
        id: "q-jsts-5",
        question: "What does the 'nullish coalescing operator' (??) check for, unlike the logical OR (||) operator?",
        type: "multiple-choice",
        options: [
          "Only null or undefined, preserving falsy values like 0 and ''",
          "Only false and NaN",
          "All truthy values",
          "It behaves identically to ||"
        ],
        correctAnswer: 0,
        explanation: "?? only triggers fallback on null and undefined, correctly keeping 0, false, and empty strings intact.",
      },
    ],
  },
  "course-dsa-101": {
    courseId: "course-dsa-101",
    courseTitle: "Data Structures & Algorithms for Coding Interviews",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-dsa-1",
        question: "What is the average-case time complexity of inserting and looking up keys in a standard Hash Table?",
        type: "multiple-choice",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        explanation: "Hash tables provide O(1) amortized constant time lookup and insertion with a well-distributed hash function.",
      },
      {
        id: "q-dsa-2",
        question: "Which algorithmic paradigm does Merge Sort utilize to achieve an O(n log n) worst-case time complexity?",
        type: "multiple-choice",
        options: ["Greedy Choice", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
        correctAnswer: 1,
        explanation: "Merge Sort recursively divides the array in halves (divide) and merges sorted subarrays (conquer).",
      },
      {
        id: "q-dsa-3",
        question: "True or False: In a Max Heap, every parent node is greater than or equal to its child nodes.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "By definition, a Max Heap enforces that root >= children for all subtrees.",
      },
      {
        id: "q-dsa-4",
        question: "Which data structure follows the First-In, First-Out (FIFO) principle?",
        type: "multiple-choice",
        options: ["Stack", "Queue", "Heap", "Binary Search Tree"],
        correctAnswer: 1,
        explanation: "Queues enforce FIFO ordering (enqueue at tail, dequeue at head), unlike Stacks (LIFO).",
      },
      {
        id: "q-dsa-5",
        question: "What is the worst-case time complexity of searching in an unbalanced Binary Search Tree?",
        type: "multiple-choice",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        correctAnswer: 2,
        explanation: "An unbalanced BST degrades into a linear linked list where searching requires visiting every node, yielding O(n).",
      },
    ],
  },
  "course-ai-ml-101": {
    courseId: "course-ai-ml-101",
    courseTitle: "Artificial Intelligence & LLM Application Engineering",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-ai-1",
        question: "What does RAG stand for in modern generative AI and LLM application engineering?",
        type: "multiple-choice",
        options: [
          "Retrieval-Augmented Generation",
          "Recursive-Automated Guidance",
          "Relational-Array Graphing",
          "Reinforcement Artificial Gradient"
        ],
        correctAnswer: 0,
        explanation: "RAG connects LLMs with external vector databases to retrieve contextual facts before generating answers.",
      },
      {
        id: "q-ai-2",
        question: "In transformer architectures, which mechanism enables tokens to capture relationships across long-range contexts?",
        type: "multiple-choice",
        options: ["Convolutional filters", "Self-Attention", "Recurrent pooling", "K-Means clustering"],
        correctAnswer: 1,
        explanation: "Self-attention calculates pairwise weight affinities between all tokens in a sequence concurrently.",
      },
      {
        id: "q-ai-3",
        question: "True or False: Vector embeddings convert text chunks into high-dimensional numerical vectors where semantic similarity corresponds to geometric proximity (e.g. cosine similarity).",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "Embeddings map semantic meaning to dense vector spaces where cosine distance correlates with conceptual similarity.",
      },
      {
        id: "q-ai-4",
        question: "What is temperature in LLM sampling?",
        type: "multiple-choice",
        options: [
          "GPU thermal throttle threshold",
          "Parameter controlling output randomness / creativity",
          "Number of tokens generated per second",
          "Context window byte capacity"
        ],
        correctAnswer: 1,
        explanation: "Higher temperature (>0.7) produces more exploratory outputs; lower temperature (<0.2) enforces deterministic answers.",
      },
      {
        id: "q-ai-5",
        question: "Which prompting technique involves showing the LLM one or more examples of the expected input-output format before asking it to solve a new task?",
        type: "multiple-choice",
        options: ["Zero-shot prompting", "Few-shot prompting", "Chain of thought", "Vectorization"],
        correctAnswer: 1,
        explanation: "Few-shot prompting demonstrates exemplar pairs to guide output format and reasoning style.",
      },
    ],
  },
  "course-sql-101": {
    courseId: "course-sql-101",
    courseTitle: "SQL & Relational Database Design",
    passingPercentage: 80,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q-sql-1",
        question: "Which SQL clause is used to filter the grouped results produced by a GROUP BY statement?",
        type: "multiple-choice",
        options: ["WHERE", "HAVING", "LIMIT", "FILTER"],
        correctAnswer: 1,
        explanation: "HAVING filters aggregated grouped records; WHERE filters individual rows before aggregation occurs.",
      },
      {
        id: "q-sql-2",
        question: "What does the 'A' in ACID transaction guarantees represent in database theory?",
        type: "multiple-choice",
        options: ["Atomicity", "Availability", "Authentication", "Asynchronous"],
        correctAnswer: 0,
        explanation: "Atomicity ensures all statements within a transaction succeed entirely or rollback cleanly with zero partial commits.",
      },
      {
        id: "q-sql-3",
        question: "True or False: A PRIMARY KEY constraint enforces both UNIQUE values and NOT NULL constraints on a table column.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "A primary key uniquely identifies every tuple in a relational table and can never be null.",
      },
      {
        id: "q-sql-4",
        question: "Which JOIN type returns all records from the left table and matched records from the right table, filling non-matching right columns with NULL?",
        type: "multiple-choice",
        options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "FULL OUTER JOIN"],
        correctAnswer: 1,
        explanation: "LEFT JOIN preserves all rows from the left relation, supplying NULL for unmatched attributes from the right relation.",
      },
      {
        id: "q-sql-5",
        question: "What is the primary benefit of creating an index on a frequently queried column?",
        type: "multiple-choice",
        options: [
          "Speeds up SELECT queries from O(n) table scans to O(log n) tree lookups",
          "Reduces total disk storage by compressing data",
          "Increases write speed for INSERT statements",
          "Automatically prevents SQL injection"
        ],
        correctAnswer: 0,
        explanation: "B-Tree indexes allow the query engine to pinpoint rows in logarithmic time instead of performing full table scans.",
      },
    ],
  },
};

export function getAssessmentForCourse(courseId: string): CourseAssessment | undefined {
  return COURSE_ASSESSMENTS[courseId];
}
