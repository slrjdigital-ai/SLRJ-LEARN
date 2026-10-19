import { Course } from "./types";

export const PROGRAMMING_LANGUAGES_COURSES: Course[] = [
  // 1. C Programming
  {
    id: "course-c-programming",
    slug: "c-programming",
    aliases: ["c-programming-mastery", "c-lang"],
    title: "C Programming: Fundamentals to System Architecture",
    description: "Master procedural programming, explicit memory management with pointers, structured data, low-level bitwise operations, file systems, and system programming in modern C.",
    shortDescription: "Master procedural programming, explicit memory allocation with pointers, structures, and low-level system design in C.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Programming Languages",
    difficulty: "Beginner",
    estimatedDuration: "20 Hours",
    estimatedDurationMinutes: 1200,
    totalLessons: 12,
    totalXp: 1500,
    icon: "⚙️",
    color: "from-blue-700 to-indigo-900",
    skills: ["C Syntax", "Pointers & Memory", "Dynamic Allocation", "Structures", "File Handling", "Data Structures in C"],
    skillsGained: [
      "Understand computer memory architecture and heap vs stack",
      "Master pointer arithmetic, dereferencing, and double pointers",
      "Implement dynamic memory allocation with malloc, calloc, realloc, and free",
      "Design complex data models with structs, unions, and typedef",
      "Read, write, and persist binary and text data to files",
      "Build real-world CLI utilities and systems applications"
    ],
    prerequisites: ["Basic computer literacy", "Logical thinking", "No prior coding required"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "c-mod-1",
        title: "Introduction, Variables & Data Types",
        description: "The C compilation model, GCC compiler, memory layout, variables, and primitive types.",
        lessons: [
          {
            id: "c-l1",
            slug: "c-introduction-compilation",
            title: "Introduction to C & The Compilation Pipeline",
            duration: "30 mins",
            xpReward: 100,
            content: "C is a compiled, statically typed language developed by Dennis Ritchie at Bell Labs. Every C program progresses through four distinct phases: Preprocessing (#include, macros), Compilation (C code to Assembly), Assembly (Assembly to Object code .o), and Linking (combining object code with libraries to produce an executable). Understanding this pipeline gives you direct insight into how hardware executes your software.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nint main(void) {\n    printf("Welcome to SLRJ Learn C Architecture!\\n");\n    return 0;\n}`,
              output: "Welcome to SLRJ Learn C Architecture!",
              explanation: "#include <stdio.h> links standard I/O functions. main() is the program entry point returning an exit code to the operating system."
            },
            commonMistakes: [
              {
                wrong: "void main()",
                correct: "int main(void)",
                reason: "Standard ISO C dictates main returns an int status code to the OS shell."
              }
            ],
            keyTakeaways: [
              "C programs compile directly to native machine code without virtual machines.",
              "The entry point is int main(void) returning 0 on success.",
              "Header files (.h) declare function prototypes; source files (.c) define them."
            ],
            exercise: {
              id: "c-ex-1",
              type: "multiple-choice",
              prompt: "Which phase of C compilation replaces #include directives with actual header file contents?",
              options: ["Assembler", "Preprocessor", "Linker", "Compiler Optimizer"],
              correctAnswer: 1,
              explanation: "The Preprocessor handles all directives beginning with '#' before compilation begins.",
              hint: "It occurs before the compiler parses syntax."
            }
          },
          {
            id: "c-l2",
            slug: "c-variables-data-types",
            title: "Variables, Constants & Memory Representation",
            duration: "35 mins",
            xpReward: 110,
            content: "Variables in C are named memory locations. Standard primitive types include int (typically 4 bytes), float (4 bytes IEEE-754), double (8 bytes), and char (1 byte ASCII). Qualifiers like signed, unsigned, short, and long modify ranges, while const declares immutable values.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nint main(void) {\n    int age = 21;\n    unsigned long memory_bytes = 1048576;\n    const double PI = 3.1415926535;\n    \n    printf("Age: %d, Memory: %lu, PI: %.4f\\n", age, memory_bytes, PI);\n    return 0;\n}`,
              output: "Age: 21, Memory: 1048576, PI: 3.1416",
              explanation: "%d formats signed integers, %lu formats unsigned long integers, and %.4f formats doubles to 4 decimal places."
            },
            commonMistakes: [
              {
                wrong: "char ch = 'hello';",
                correct: "char ch = 'h';",
                reason: "Single quotes represent a single char literal (1 byte). Strings require double quotes."
              }
            ],
            keyTakeaways: [
              "sizeof operator evaluates the memory footprint of any type or variable in bytes.",
              "Unsigned types store non-negative values, doubling positive capacity.",
              "Constants prevent accidental memory state mutation."
            ],
            exercise: {
              id: "c-ex-2",
              type: "multiple-choice",
              prompt: "What is the memory size of a standard 'char' in ANSI C?",
              options: ["2 Bytes", "4 Bytes", "1 Byte", "Platform dependent"],
              correctAnswer: 2,
              explanation: "In C standard specification, sizeof(char) is always guaranteed to be 1 byte.",
              hint: "It represents a single ASCII character."
            }
          }
        ]
      },
      {
        id: "c-mod-2",
        title: "Operators, Conditions & Loops",
        description: "Arithmetic, relational, logical operators, conditional branching, and iteration structures.",
        lessons: [
          {
            id: "c-l3",
            slug: "c-operators-conditions",
            title: "Operators & Conditional Branching (if, else, switch)",
            duration: "40 mins",
            xpReward: 120,
            content: "Control flow dictates program execution based on boolean truth values. In C, 0 evaluates to false and any non-zero integer evaluates to true. Switch-case statements allow jump-table branching across integral constants.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nint main(void) {\n    int score = 88;\n    if (score >= 90) {\n        printf("Grade: A\\n");\n    } else if (score >= 80) {\n        printf("Grade: B\\n");\n    } else {\n        printf("Grade: C\\n");\n    }\n    return 0;\n}`,
              output: "Grade: B",
              explanation: "Branch evaluations execute top-down until a condition tests true."
            },
            commonMistakes: [
              {
                wrong: "if (score = 100)",
                correct: "if (score == 100)",
                reason: "= is an assignment expression; == is the equality comparison operator."
              }
            ],
            keyTakeaways: [
              "Use == for comparison, not assignment.",
              "Always include break statements in switch cases unless fallthrough is intentional.",
              "Ternary operator (condition ? expr1 : expr2) enables concise inline expressions."
            ],
            exercise: {
              id: "c-ex-3",
              type: "multiple-choice",
              prompt: "In C, which value evaluates to false in an if condition?",
              options: ["-1", "0", "NULL pointer only", "Any negative number"],
              correctAnswer: 1,
              explanation: "In C, exactly 0 (or null pointer) evaluates to false. Any non-zero integer is true.",
              hint: "Zero represents false."
            }
          },
          {
            id: "c-l4",
            slug: "c-loops-iteration",
            title: "Loop Constructs: for, while, do-while & Flow Control",
            duration: "35 mins",
            xpReward: 120,
            content: "Loops repeat execution blocks until termination conditions are reached. for loops are ideal for counted iteration; while loops for indeterminate conditions; and do-while guarantees at least one execution before testing the predicate.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    for (int i = 1; i <= 5; i++) {\n        sum += i;\n    }\n    printf("Sum 1..5: %d\\n", sum);\n    return 0;\n}`,
              output: "Sum 1..5: 15",
              explanation: "for (init; condition; increment) governs loop lifecycle cleanly."
            },
            commonMistakes: [
              {
                wrong: "for(int i = 0; i < 10; i--);",
                correct: "for(int i = 0; i < 10; i++)",
                reason: "Wrong counter alteration results in an infinite loop."
              }
            ],
            keyTakeaways: [
              "break immediately terminates the nearest enclosing loop.",
              "continue skips the remainder of the current iteration and advances counter."
            ],
            exercise: {
              id: "c-ex-4",
              type: "multiple-choice",
              prompt: "Which loop guarantees its body executes at least once before checking the condition?",
              options: ["for loop", "while loop", "do-while loop", "nested loop"],
              correctAnswer: 2,
              explanation: "do-while evaluates its exit condition at the bottom of the block.",
              hint: "Begins with the 'do' keyword."
            }
          }
        ]
      },
      {
        id: "c-mod-3",
        title: "Functions, Arrays & Strings",
        description: "Modular functions, stack frames, multi-dimensional arrays, and null-terminated strings.",
        lessons: [
          {
            id: "c-l5",
            slug: "c-functions-modular",
            title: "User-Defined Functions & Stack Frames",
            duration: "40 mins",
            xpReward: 130,
            content: "Functions provide modularity, code reuse, and clean separation of concerns. In C, arguments are passed strictly by value. When a function executes, a stack frame is allocated storing local variables and return addresses.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nint calculate_power(int base, int exp) {\n    int result = 1;\n    for (int i = 0; i < exp; i++) {\n        result *= base;\n    }\n    return result;\n}\n\nint main(void) {\n    printf("2^5 = %d\\n", calculate_power(2, 5));\n    return 0;\n}`,
              output: "2^5 = 32",
              explanation: "Functions isolate local state and return values safely across call stacks."
            },
            commonMistakes: [
              {
                wrong: "Calling a function before declaring its prototype",
                correct: "int calculate_power(int base, int exp); declared above main",
                reason: "The C compiler requires function signatures declared prior to invocations."
              }
            ],
            keyTakeaways: [
              "Function prototypes inform compiler of argument types and return values.",
              "Local variables disappear when function scope exits."
            ],
            exercise: {
              id: "c-ex-5",
              type: "multiple-choice",
              prompt: "How are primitive arguments passed to functions by default in C?",
              options: ["By reference", "By value", "By pointer automatic", "By memory alias"],
              correctAnswer: 1,
              explanation: "C exclusively passes arguments by value. Passing references requires explicit pointers.",
              hint: "A copy of the argument value is pushed to the stack."
            }
          },
          {
            id: "c-l6",
            slug: "c-arrays-strings",
            title: "Arrays & Null-Terminated Strings",
            duration: "45 mins",
            xpReward: 140,
            content: "An array is a contiguous block of memory holding homogenous elements. In C, strings are simply char arrays terminated by a null character ('\\0', ASCII 0). Without the null terminator, standard string operations overrun memory.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char greeting[] = "Hello, C";\n    int len = strlen(greeting);\n    printf("Length: %d, Char 0: %c\\n", len, greeting[0]);\n    return 0;\n}`,
              output: "Length: 8, Char 0: H",
              explanation: "strlen calculates string length up to the null terminator character."
            },
            commonMistakes: [
              {
                wrong: "char name[5] = \"Shahid\";",
                correct: "char name[7] = \"Shahid\"; // 6 chars + 1 null terminator",
                reason: "String storage must account for the trailing '\\0' byte."
              }
            ],
            keyTakeaways: [
              "Array indexing is 0-based and bounds are not checked at runtime.",
              "String literals automatically append the '\\0' character.",
              "<string.h> provides strcpy, strlen, strcmp, and strcat."
            ],
            exercise: {
              id: "c-ex-6",
              type: "multiple-choice",
              prompt: "What character signifies the termination of a valid C string?",
              options: ["'\\n'", "'\\0'", "' ' (space)", "EOF"],
              correctAnswer: 1,
              explanation: "'\\0' (null character, ASCII 0) signals the boundary of a string.",
              hint: "Null byte."
            }
          }
        ]
      },
      {
        id: "c-mod-4",
        title: "Pointers & Dynamic Memory",
        description: "Memory addresses, pointer arithmetic, dereferencing, heap allocation, and memory safety.",
        lessons: [
          {
            id: "c-l7",
            slug: "c-pointers-memory-addresses",
            title: "Pointers: Memory Addresses & Dereferencing",
            duration: "50 mins",
            xpReward: 160,
            content: "A pointer is a variable that stores the memory address of another variable. The address-of operator (&) extracts an address, and the dereference operator (*) accesses or mutates the value stored at that address. Pointers enable pass-by-reference and dynamic data structures.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y);\n    return 0;\n}`,
              output: "x=20, y=10",
              explanation: "Passing &x and &y gives swap() direct access to mutate variables in main's stack frame."
            },
            commonMistakes: [
              {
                wrong: "int *ptr; *ptr = 50; // uninitialized pointer",
                correct: "int val = 0; int *ptr = &val; *ptr = 50;",
                reason: "Dereferencing uninitialized or wild pointers causes segmentation faults."
              }
            ],
            keyTakeaways: [
              "Pointers hold addresses in hexadecimal notation.",
              "Dereferencing reads or writes memory directly.",
              "Always initialize pointers to NULL or a valid address."
            ],
            exercise: {
              id: "c-ex-7",
              type: "multiple-choice",
              prompt: "Which operator is used to extract the memory address of an existing variable?",
              options: ["*", "&", "->", "%"],
              correctAnswer: 1,
              explanation: "& is the address-of operator in C.",
              hint: "Ampersand."
            }
          },
          {
            id: "c-l8",
            slug: "c-dynamic-memory-allocation",
            title: "Dynamic Memory: malloc, calloc, realloc & free",
            duration: "50 mins",
            xpReward: 160,
            content: "Dynamic memory allocation allocates memory on the Heap during program runtime. malloc allocates uninitialized bytes; calloc allocates zero-initialized memory; realloc resizes existing blocks; and free releases memory back to the operating system to prevent leaks.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = (int *)malloc(3 * sizeof(int));\n    if (!arr) return 1;\n    \n    arr[0] = 10; arr[1] = 20; arr[2] = 30;\n    printf("Element 1: %d\\n", arr[1]);\n    \n    free(arr);\n    arr = NULL;\n    return 0;\n}`,
              output: "Element 1: 20",
              explanation: "malloc allocates 12 bytes on the heap. free() returns it when finished."
            },
            commonMistakes: [
              {
                wrong: "Using memory after calling free(ptr)",
                correct: "free(ptr); ptr = NULL;",
                reason: "Dangling pointers point to deallocated memory, corrupting heaps."
              }
            ],
            keyTakeaways: [
              "Always check if pointer is non-NULL after malloc.",
              "Every allocation must correspond to exactly one free().",
              "Set pointers to NULL after freeing."
            ],
            exercise: {
              id: "c-ex-8",
              type: "multiple-choice",
              prompt: "What critical failure occurs if allocated heap memory is never released with free()?",
              options: ["Buffer Underflow", "Memory Leak", "Stack Overflow", "Type Coercion"],
              correctAnswer: 1,
              explanation: "Failing to free unused heap blocks leads to Memory Leaks, depleting system RAM.",
              hint: "Memory remains reserved indefinitely."
            }
          }
        ]
      },
      {
        id: "c-mod-5",
        title: "Structures, File Handling & Capstone Projects",
        description: "Composite data models, binary and text file I/O, and production CLI system engineering.",
        lessons: [
          {
            id: "c-l9",
            slug: "c-structures-unions",
            title: "Structures, Unions & Typedef",
            duration: "45 mins",
            xpReward: 150,
            content: "A struct groups variables of different types under a unified entity. The arrow operator (->) provides member access via struct pointers. typedef creates clean semantic aliases for complex type signatures.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[32];\n    float gpa;\n} Student;\n\nint main(void) {\n    Student s = {101, "Shahid", 3.95f};\n    printf("Student #%d: %s (GPA: %.2f)\\n", s.id, s.name, s.gpa);\n    return 0;\n}`,
              output: "Student #101: Shahid (GPA: 3.95)",
              explanation: "typedef struct allows declaring 'Student s' directly without struct keywords."
            },
            commonMistakes: [
              {
                wrong: "ptr.member when ptr is a pointer to a struct",
                correct: "ptr->member or (*ptr).member",
                reason: "Arrow operator dereferences and accesses members in one atomic step."
              }
            ],
            keyTakeaways: [
              "structs group heterogeneous data types contiguously in memory.",
              "typedef simplifies declaration syntax.",
              "The arrow operator -> accesses fields through pointers."
            ],
            exercise: {
              id: "c-ex-9",
              type: "multiple-choice",
              prompt: "Which operator is used to access struct members through a pointer to that struct?",
              options: [".", "->", "::", "@"],
              correctAnswer: 1,
              explanation: "The arrow operator (->) is syntactic sugar for (*ptr).member.",
              hint: "Composed of a hyphen and greater-than sign."
            }
          },
          {
            id: "c-l10",
            slug: "c-file-handling-project",
            title: "File Handling & Capstone: CLI Student Record Manager",
            duration: "55 mins",
            xpReward: 180,
            content: "File handling allows persistent storage across executions. fopen() opens a stream in read ('r'), write ('w'), or append ('a') mode. fprintf() and fscanf() handle formatted I/O, while fread() and fwrite() handle raw binary streams. fclose() flushes buffers and releases OS descriptors.",
            codeExample: {
              language: "c",
              code: `#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen("records.txt", "w");\n    if (!fp) return 1;\n    \n    fprintf(fp, "ID: 101, Name: Shahid, Status: Certified\\n");\n    fclose(fp);\n    printf("Record persisted successfully.\\n");\n    return 0;\n}`,
              output: "Record persisted successfully.",
              explanation: "fopen opens a file descriptor, fprintf writes formatted text, and fclose closes the stream."
            },
            commonMistakes: [
              {
                wrong: "Forgetting to check if fopen returns NULL",
                correct: "if (fp == NULL) { perror(\"Error opening file\"); return 1; }",
                reason: "Attempting to read or write to a NULL file pointer causes a crash."
              }
            ],
            keyTakeaways: [
              "Always check if file pointer is NULL before file operations.",
              "Always call fclose() to ensure data buffer is flushed to disk.",
              "Binary modes ('rb', 'wb') serialize structs directly to disk."
            ],
            exercise: {
              id: "c-ex-10",
              type: "multiple-choice",
              prompt: "Which mode in fopen() creates a new file for writing or truncates an existing file?",
              options: ["'r'", "'w'", "'a'", "'r+'"],
              correctAnswer: 1,
              explanation: "'w' opens a file for writing, creating it if it doesn't exist or truncating existing content.",
              hint: "Write mode."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "c-pdf-1",
        title: "C Language Architecture & Memory Layout Handbook",
        description: "Comprehensive guide to compilers, stack vs heap, pointer arithmetic, and system memory.",
        moduleTitle: "Foundations & Memory",
        fileUrl: "/pdfs/c-programming-guide.pdf",
        fileSize: "4.8 MB",
        pageCount: 42,
        displayOrder: 1,
        downloadAllowed: true
      },
      {
        id: "c-pdf-2",
        title: "Pointers, Structs & File I/O Cheat Sheet",
        description: "Quick reference for dynamic allocation, struct alignment, and file stream handling.",
        moduleTitle: "Pointers & Files",
        fileUrl: "/pdfs/c-pointers-cheatsheet.pdf",
        fileSize: "2.6 MB",
        pageCount: 28,
        displayOrder: 2,
        downloadAllowed: true
      }
    ]
  },

  // 2. Python Programming
  {
    id: "course-python-programming",
    slug: "python-programming",
    aliases: ["python-programming-mastery", "python-zero-to-hero"],
    title: "Python Programming: Zero to Production Mastery",
    description: "Learn clean, idiomatic Python 3 from core syntax, data structures, and comprehensions to object-oriented programming, decorators, generators, error handling, and production applications.",
    shortDescription: "Master Python 3 from syntax and collections to OOP, exception handling, and automation projects.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Programming Languages",
    difficulty: "Beginner",
    estimatedDuration: "22 Hours",
    estimatedDurationMinutes: 1320,
    totalLessons: 12,
    totalXp: 1600,
    icon: "🐍",
    color: "from-emerald-700 to-teal-900",
    skills: ["Python 3", "Data Structures", "OOP", "Decorators & Generators", "File I/O", "Testing"],
    skillsGained: [
      "Write idiomatic, PEP 8 compliant Python code",
      "Manipulate lists, dicts, sets, and tuples with comprehensions",
      "Design robust Object-Oriented architectures with inheritance and dunder methods",
      "Handle exceptions and manage system resources with context managers",
      "Serialize data with JSON, CSV, and sqlite3",
      "Build real-world automation scripts and data processing tools"
    ],
    prerequisites: ["No prior programming experience required"],
    accessType: "Free",
    isFeatured: true,
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "py-mod-1",
        title: "Syntax, Variables & Data Types",
        description: "Python execution model, dynamic typing, primitive data types, and string formatting.",
        lessons: [
          {
            id: "py-l1",
            slug: "python-syntax-variables",
            title: "Python Environment & Dynamic Typing",
            duration: "30 mins",
            xpReward: 100,
            content: "Python is an interpreted, high-level, dynamically typed language emphasizing readability. In Python, variables are labels bound to objects in heap memory. The Python Virtual Machine (PVM) compiles source code to bytecode (.pyc) and executes it efficiently.",
            codeExample: {
              language: "python",
              code: `name: str = "SLRJ Learner"\nscore: int = 98\nactive: bool = True\n\nprint(f"Learner {name} scored {score}% (Active: {active})")`,
              output: "Learner SLRJ Learner scored 98% (Active: True)",
              explanation: "F-strings (f\"...\") provide readable, inline expression interpolation."
            },
            commonMistakes: [
              {
                wrong: "Indenting with a mix of tabs and spaces",
                correct: "Configure editor to always use 4 spaces per indentation level (PEP 8)",
                reason: "Tab-space mixing causes IndentationError in Python 3."
              }
            ],
            keyTakeaways: [
              "Python uses indentation instead of curly braces to define scope.",
              "Everything in Python is an object, including functions and classes."
            ],
            exercise: {
              id: "py-ex-1",
              type: "multiple-choice",
              prompt: "What is the recommended number of spaces per indentation level according to PEP 8?",
              options: ["2 spaces", "4 spaces", "8 spaces", "1 tab"],
              correctAnswer: 1,
              explanation: "PEP 8 specifies exactly 4 spaces per indentation level.",
              hint: "Four spaces."
            }
          }
        ]
      },
      {
        id: "py-mod-2",
        title: "Collections & Control Flow",
        description: "Lists, dictionaries, sets, tuples, list comprehensions, and iteration patterns.",
        lessons: [
          {
            id: "py-l2",
            slug: "python-collections-comprehensions",
            title: "Lists, Dictionaries & Comprehensions",
            duration: "45 mins",
            xpReward: 140,
            content: "Python provides powerful built-in data structures: lists (mutable sequences), tuples (immutable sequences), dictionaries (key-value hash maps), and sets (unique element collections). List and dictionary comprehensions provide expressive, high-speed iteration syntax.",
            codeExample: {
              language: "python",
              code: `numbers = [1, 2, 3, 4, 5, 6]\neven_squares = [n ** 2 for n in numbers if n % 2 == 0]\n\nuser = {"name": "Shahid", "role": "Engineer"}\nprint("Squares:", even_squares)\nprint("Role:", user.get("role", "Guest"))`,
              output: "Squares: [4, 16, 36]\nRole: Engineer",
              explanation: "List comprehension evaluates filtered elements concisely. dict.get() safely retrieves keys without raising KeyError."
            },
            commonMistakes: [
              {
                wrong: "Using mutable default arguments in functions (def add(item, lst=[]))",
                correct: "def add(item, lst=None): if lst is None: lst = []",
                reason: "Default arguments are evaluated once at function definition time, sharing state across calls."
              }
            ],
            keyTakeaways: [
              "Tuples are hashable and can be dictionary keys; lists cannot.",
              "Dictionary lookups execute in O(1) average time complexity."
            ],
            exercise: {
              id: "py-ex-2",
              type: "multiple-choice",
              prompt: "Which Python collection is immutable and hashable?",
              options: ["list", "dict", "tuple", "set"],
              correctAnswer: 2,
              explanation: "Tuples cannot be modified after instantiation and are hashable.",
              hint: "Created with parentheses ()."
            }
          }
        ]
      },
      {
        id: "py-mod-3",
        title: "OOP, Exceptions & Practical Projects",
        description: "Object-oriented design, custom exceptions, context managers, and project architecture.",
        lessons: [
          {
            id: "py-l3",
            slug: "python-oop-classes",
            title: "Classes, Inheritance & Dunder Methods",
            duration: "50 mins",
            xpReward: 160,
            content: "Classes bundle data and behavior. Python uses explicit 'self' to refer to instances. Dunder (double underscore) methods like __init__, __str__, and __repr__ enable custom object behaviors and operator overloading.",
            codeExample: {
              language: "python",
              code: `class Course:\n    def __init__(self, title: str, xp: int):\n        self.title = title\n        self.xp = xp\n        \n    def __repr__(self) -> str:\n        return f"Course(title='{self.title}', xp={self.xp})"\n\nc = Course("Python Mastery", 1600)\nprint(c)`,
              output: "Course(title='Python Mastery', xp=1600)",
              explanation: "__init__ initializes state; __repr__ formats human-readable debug representations."
            },
            commonMistakes: [
              {
                wrong: "Omitting 'self' in class method signatures",
                correct: "def my_method(self, arg):",
                reason: "Instance methods implicitly receive the calling object instance as their first argument."
              }
            ],
            keyTakeaways: [
              "Use @property to encapsulate attributes with getters and setters.",
              "Context managers (with open(...) as f:) guarantee deterministic resource cleanup."
            ],
            exercise: {
              id: "py-ex-3",
              type: "multiple-choice",
              prompt: "Which dunder method is executed automatically when an object is instantiated in Python?",
              options: ["__start__", "__init__", "__new__ only", "__create__"],
              correctAnswer: 1,
              explanation: "__init__ is the initializer called immediately after instance creation.",
              hint: "Short for initialize."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "py-pdf-1",
        title: "Python 3 Standard Library & Idioms Handbook",
        description: "Complete guide to built-in functions, itertools, collections, and clean Pythonic architecture.",
        moduleTitle: "Pythonic Core",
        fileUrl: "/pdfs/python-complete-notes.pdf",
        fileSize: "5.4 MB",
        pageCount: 52,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 3. JavaScript & TypeScript
  {
    id: "course-javascript-typescript",
    slug: "javascript-typescript",
    aliases: ["modern-javascript-typescript", "js-ts-enterprise"],
    title: "JavaScript & TypeScript: Enterprise Modern Web Core",
    description: "Deep dive into execution context, event loop, closures, async/await, and enterprise TypeScript type systems, interfaces, and generics.",
    shortDescription: "Master JS closures, asynchronous event loops, and robust TypeScript types, interfaces, and generics.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Programming Languages",
    difficulty: "Intermediate",
    estimatedDuration: "24 Hours",
    estimatedDurationMinutes: 1440,
    totalLessons: 12,
    totalXp: 1800,
    icon: "⚡",
    color: "from-amber-600 to-yellow-800",
    skills: ["JavaScript ES6+", "Event Loop", "Promises & Async", "TypeScript", "Generics", "Type Guards"],
    skillsGained: [
      "Master closures, prototypes, lexical scoping, and the execution context",
      "Understand microtasks, macrotasks, and the V8 asynchronous event loop",
      "Write asynchronous code with Promises, async/await, and AbortController",
      "Model complex application domain states with TypeScript discriminated unions",
      "Implement generic functions and interfaces with strict type safety",
      "Compile and bundle scalable modern applications"
    ],
    prerequisites: ["Basic HTML/CSS concepts", "General programming fundamentals"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "js-mod-1",
        title: "JavaScript Engine & Asynchronous Architecture",
        description: "Event loop, closures, promises, and async/await mechanics.",
        lessons: [
          {
            id: "js-l1",
            slug: "js-event-loop-closures",
            title: "Execution Context, Closures & The Event Loop",
            duration: "45 mins",
            xpReward: 140,
            content: "JavaScript is single-threaded and non-blocking, driven by an event loop. Closures occur when an inner function retains access to its enclosing lexical scope even after the outer function has returned. The event loop prioritizes the Call Stack, then Microtask Queue (Promises, queueMicrotask), and finally Macrotask Queue (setTimeout, I/O).",
            codeExample: {
              language: "javascript",
              code: `function createCounter(initial = 0) {\n  let count = initial;\n  return {\n    increment: () => ++count,\n    get: () => count\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.get()); // 11`,
              output: "11\n11",
              explanation: "The returned object methods close over the private 'count' variable."
            },
            commonMistakes: [
              {
                wrong: "Expecting setTimeout(fn, 0) to execute immediately before synchronous code",
                correct: "Understand setTimeout pushes tasks to macrotask queue, executing after the call stack clears",
                reason: "Synchronous code and microtasks always finish before macrotasks run."
              }
            ],
            keyTakeaways: [
              "Closures enable data privacy and factory patterns without classes.",
              "Promises resolve in the microtask queue with higher priority than timers."
            ],
            exercise: {
              id: "js-ex-1",
              type: "multiple-choice",
              prompt: "Which queue takes priority over the macrotask queue in JavaScript's event loop?",
              options: ["Microtask queue", "Rendering queue only", "Worker thread queue", "Timer heap"],
              correctAnswer: 0,
              explanation: "The microtask queue (Promises, queueMicrotask) is drained completely before the next macrotask executes.",
              hint: "Prefix 'micro'."
            }
          }
        ]
      },
      {
        id: "ts-mod-2",
        title: "TypeScript Type System & Generics",
        description: "Static typing, interfaces, discriminated unions, and generic programming.",
        lessons: [
          {
            id: "ts-l2",
            slug: "typescript-types-generics",
            title: "Discriminated Unions & Generics",
            duration: "50 mins",
            xpReward: 160,
            content: "TypeScript adds static typing on top of JavaScript. Discriminated unions allow you to safely model state transitions, and Generics allow you to write reusable algorithms without sacrificing type specificity.",
            codeExample: {
              language: "typescript",
              code: `type ApiResponse<T> =\n  | { status: "success"; data: T }\n  | { status: "error"; message: string };\n\nfunction handleResponse<T>(res: ApiResponse<T>) {\n  if (res.status === "success") {\n    console.log("Success with data:", res.data);\n  } else {\n    console.error("Error:", res.message);\n  }\n}\n\nhandleResponse({ status: "success", data: { id: 101, name: "Shahid" } });`,
              output: "Success with data: { id: 101, name: 'Shahid' }",
              explanation: "The 'status' field acts as the discriminant tag, narrowing the payload safely."
            },
            commonMistakes: [
              {
                wrong: "Using 'any' everywhere in TypeScript",
                correct: "Use 'unknown' when type is uncertain, or generic parameters with constraints",
                reason: "'any' turns off type checking entirely, defeating TypeScript's purpose."
              }
            ],
            keyTakeaways: [
              "Discriminated unions enable exhaustive pattern matching.",
              "Generics provide type parameters that adapt to the arguments passed."
            ],
            exercise: {
              id: "ts-ex-1",
              type: "multiple-choice",
              prompt: "What is the key advantage of 'unknown' over 'any' in TypeScript?",
              options: [
                "'unknown' requires type narrowing or assertion before operations",
                "'unknown' allows calling any method without checks",
                "'unknown' converts to string automatically",
                "There is no difference"
              ],
              correctAnswer: 0,
              explanation: "'unknown' is the type-safe counterpart of any. You must verify its type before accessing properties.",
              hint: "It forces you to check the type first."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "js-pdf-1",
        title: "Modern JavaScript & TypeScript Architecture Handbook",
        description: "Deep dive into JS internals, V8 optimizations, and enterprise TypeScript design patterns.",
        moduleTitle: "TypeScript Core",
        fileUrl: "/pdfs/modern-javascript-typescript.pdf",
        fileSize: "6.2 MB",
        pageCount: 58,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 8. C++ Programming
  {
    id: "course-cpp-programming",
    slug: "cpp-programming",
    aliases: ["cpp-masterclass", "cplusplus-engineering"],
    title: "C++ Programming: Modern C++20 & High-Performance Engineering",
    description: "Master modern C++20, RAII, pointers, references, smart pointers, templates, the Standard Template Library (STL), and high-performance engineering.",
    shortDescription: "Master modern C++20, RAII, smart pointers, templates, and the STL for high-performance software.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Programming Languages",
    difficulty: "Intermediate",
    estimatedDuration: "25 Hours",
    estimatedDurationMinutes: 1500,
    totalLessons: 12,
    totalXp: 1850,
    icon: "⚡",
    color: "from-blue-600 to-cyan-900",
    skills: ["Modern C++20", "RAII", "Smart Pointers", "Templates & STL", "OOP", "Concurrency"],
    skillsGained: [
      "Understand memory models, value categories (lvalue/rvalue), and move semantics",
      "Master RAII (Resource Acquisition Is Initialization) for automatic resource safety",
      "Replace raw pointers with unique_ptr, shared_ptr, and weak_ptr",
      "Utilize STL containers (vector, unordered_map, set) and algorithms",
      "Write high-performance generic code using function and class templates",
      "Build optimized C++ applications with zero-cost abstractions"
    ],
    prerequisites: ["Basic understanding of programming or C syntax"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-10T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "cpp-mod-1",
        title: "Syntax, Pointers, References & RAII",
        description: "Modern C++ compilation, references, value categories, and memory management.",
        lessons: [
          {
            id: "cpp-l1",
            slug: "cpp-references-smart-pointers",
            title: "References, Move Semantics & Smart Pointers",
            duration: "50 mins",
            xpReward: 160,
            content: "Modern C++ avoids manual new/delete in favor of smart pointers (std::unique_ptr, std::shared_ptr). References provide safe memory aliases without pointer syntax. Move semantics (std::move) transfer ownership of resources without expensive deep copying.",
            codeExample: {
              language: "cpp",
              code: `#include <iostream>\n#include <memory>\n#include <string>\n\nclass Resource {\npublic:\n    Resource(std::string name) : m_name(name) {\n        std::cout << "Allocated: " << m_name << "\\n";\n    }\n    ~Resource() {\n        std::cout << "Destroyed: " << m_name << "\\n";\n    }\nprivate:\n    std::string m_name;\n};\n\nint main() {\n    auto res = std::make_unique<Resource>("DatabaseConnection");\n    return 0; // Automatically freed via RAII\n}`,
              output: "Allocated: DatabaseConnection\nDestroyed: DatabaseConnection",
              explanation: "std::unique_ptr automatically destroys the resource when exiting scope."
            },
            commonMistakes: [
              {
                wrong: "Calling delete on a raw pointer managed by unique_ptr",
                correct: "Let the smart pointer manage the lifecycle automatically",
                reason: "Manual deletion causes double-free vulnerabilities."
              }
            ],
            keyTakeaways: [
              "RAII guarantees cleanup even when exceptions occur.",
              "std::make_unique provides safe, exception-free allocation."
            ],
            exercise: {
              id: "cpp-ex-1",
              type: "multiple-choice",
              prompt: "Which smart pointer represents sole, exclusive ownership of a heap resource in C++?",
              options: ["std::shared_ptr", "std::unique_ptr", "std::weak_ptr", "std::auto_ptr"],
              correctAnswer: 1,
              explanation: "std::unique_ptr enforces exclusive ownership; it cannot be copied, only moved.",
              hint: "It has 'unique' in the name."
            }
          }
        ]
      },
      {
        id: "cpp-mod-2",
        title: "Templates & Standard Template Library (STL)",
        description: "Generic programming, containers, iterators, and high-performance algorithms.",
        lessons: [
          {
            id: "cpp-l2",
            slug: "cpp-stl-templates",
            title: "STL Containers, Iterators & Lambda Algorithms",
            duration: "55 mins",
            xpReward: 170,
            content: "The Standard Template Library (STL) provides industry-grade algorithms and data structures. Containers like std::vector and std::unordered_map offer optimal memory cache locality and O(1) hash lookups.",
            codeExample: {
              language: "cpp",
              code: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {9, 2, 7, 1, 5};\n    std::sort(nums.begin(), nums.end());\n    \n    for (const auto& n : nums) {\n        std::cout << n << " ";\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
              output: "1 2 5 7 9 ",
              explanation: "std::sort uses Introsort (quicksort + heapsort + insertion sort) running in O(N log N) time."
            },
            commonMistakes: [
              {
                wrong: "Invalidating iterators by modifying a vector during ranged-for loop iteration",
                correct: "Use index-based loops or standard algorithms when mutating vector size",
                reason: "Vector reallocation moves elements to new memory, turning existing iterators into wild pointers."
              }
            ],
            keyTakeaways: [
              "std::vector is the default container of choice in modern C++ due to contiguous cache layout.",
              "Algorithms operate uniformly across containers using iterators."
            ],
            exercise: {
              id: "cpp-ex-2",
              type: "multiple-choice",
              prompt: "What is the average time complexity of lookups in std::unordered_map?",
              options: ["O(log N)", "O(1)", "O(N)", "O(N log N)"],
              correctAnswer: 1,
              explanation: "std::unordered_map is implemented with a hash table, providing O(1) average lookup.",
              hint: "Constant time."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "cpp-pdf-1",
        title: "Modern C++20 Engineering & STL Handbook",
        description: "Comprehensive guide to RAII, move semantics, smart pointers, and high-performance STL patterns.",
        moduleTitle: "Modern C++ Architecture",
        fileUrl: "/pdfs/cpp-complete-notes.pdf",
        fileSize: "5.9 MB",
        pageCount: 54,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  },

  // 9. Java Programming
  {
    id: "course-java-programming",
    slug: "java-programming",
    aliases: ["java-enterprise-core", "java-mastery"],
    title: "Java Programming: Core to Enterprise Architecture",
    description: "Master Java 21, JVM internal memory, OOP, Collections Framework, Streams API, multithreading, concurrency, and enterprise design patterns.",
    shortDescription: "Master core Java, OOP, the Collections Framework, Streams API, and multithreading.",
    thumbnailUrl: "/course-web-dev.jpg",
    category: "Programming Languages",
    difficulty: "Intermediate",
    estimatedDuration: "26 Hours",
    estimatedDurationMinutes: 1560,
    totalLessons: 12,
    totalXp: 1850,
    icon: "☕",
    color: "from-orange-600 to-red-900",
    skills: ["Java 21", "JVM Architecture", "Collections Framework", "Streams API", "Multithreading", "OOP Design"],
    skillsGained: [
      "Understand JVM bytecode execution, JIT compilation, and Garbage Collection",
      "Design robust systems using Polymorphism, Interfaces, and Abstract Classes",
      "Leverage the Java Collections Framework (ArrayList, HashMap, TreeSet)",
      "Write declarative, functional pipelines with Java Streams and Lambdas",
      "Handle concurrency with Threads, ExecutorService, and Virtual Threads",
      "Build enterprise-grade backend services and CLI applications"
    ],
    prerequisites: ["Basic computer programming fundamentals"],
    accessType: "Free",
    isFeatured: false,
    createdAt: "2026-03-15T00:00:00Z",
    updatedAt: "2026-10-19T00:00:00Z",
    modules: [
      {
        id: "java-mod-1",
        title: "Core Syntax & Object-Oriented Architecture",
        description: "JVM internals, memory model, classes, inheritance, and interfaces.",
        lessons: [
          {
            id: "java-l1",
            slug: "java-oop-interfaces",
            title: "OOP Principles & Interface Contracts",
            duration: "45 mins",
            xpReward: 140,
            content: "Java is an object-oriented language running on the Java Virtual Machine (JVM). Interfaces define contracts without implementation details, allowing loose coupling and dependency inversion in enterprise software.",
            codeExample: {
              language: "java",
              code: `interface NotificationService {\n    void send(String message);\n}\n\nclass EmailService implements NotificationService {\n    @Override\n    public void send(String message) {\n        System.out.println("Email dispatched: " + message);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        NotificationService service = new EmailService();\n        service.send("Welcome to SLRJ Learn!");\n    }\n}`,
              output: "Email dispatched: Welcome to SLRJ Learn!",
              explanation: "Polymorphism lets you program to an interface rather than a concrete class."
            },
            commonMistakes: [
              {
                wrong: "Using == to compare String objects in Java (str1 == str2)",
                correct: "str1.equals(str2)",
                reason: "== compares object reference identity in memory, while .equals() compares character contents."
              }
            ],
            keyTakeaways: [
              "Always use .equals() for string and object content equality.",
              "Interfaces provide multiple inheritance of type and support default methods."
            ],
            exercise: {
              id: "java-ex-1",
              type: "multiple-choice",
              prompt: "What does the '==' operator compare when applied to two Java Objects?",
              options: [
                "Their memory references/addresses",
                "Their internal string characters",
                "Their hashcode values",
                "Their class types"
              ],
              correctAnswer: 0,
              explanation: "In Java, == on object references checks if both variables point to the exact same memory address.",
              hint: "Reference equality."
            }
          }
        ]
      },
      {
        id: "java-mod-2",
        title: "Collections, Streams & Concurrency",
        description: "Java Collections, functional Streams, and multithreading concurrency.",
        lessons: [
          {
            id: "java-l2",
            slug: "java-streams-concurrency",
            title: "Java Streams API & Thread Executors",
            duration: "55 mins",
            xpReward: 170,
            content: "Introduced in Java 8, the Streams API enables declarative data transformation pipelines (filter, map, reduce). Modern Java concurrency uses ExecutorService and Virtual Threads to handle high-throughput workloads.",
            codeExample: {
              language: "java",
              code: `import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of("Alex", "Shahid", "Sarah", "Sam");\n        List<String> sNames = names.stream()\n            .filter(n -> n.startsWith("S"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n            \n        System.out.println("Filtered: " + sNames);\n    }\n}`,
              output: "Filtered: [SHAHID, SARAH, SAM]",
              explanation: "Streams process collections fluently without manual loop counters or mutating state."
            },
            commonMistakes: [
              {
                wrong: "Reusing a Java Stream after terminal operation has executed",
                correct: "Instantiate a new stream pipeline for subsequent queries",
                reason: "Streams are single-use consumable pipelines; invoking operations on a closed stream throws IllegalStateException."
              }
            ],
            keyTakeaways: [
              "Streams do not store data; they transform data pipelines lazily.",
              "ExecutorService manages worker thread pools efficiently."
            ],
            exercise: {
              id: "java-ex-2",
              type: "multiple-choice",
              prompt: "Which operation closes a Java Stream pipeline and yields a concrete result?",
              options: ["Intermediate operation", "Terminal operation", "Lazy evaluation", "Predicate operation"],
              correctAnswer: 1,
              explanation: "A terminal operation (e.g., collect, forEach, reduce) triggers stream pipeline execution and produces a result.",
              hint: "Terminal means final."
            }
          }
        ]
      }
    ],
    pdfLessons: [
      {
        id: "java-pdf-1",
        title: "Enterprise Java Architecture & Concurrency Handbook",
        description: "Master Java 21, JVM memory tuning, the Collections Framework, and Streams API.",
        moduleTitle: "Enterprise Java Core",
        fileUrl: "/pdfs/java-complete-notes.pdf",
        fileSize: "6.5 MB",
        pageCount: 60,
        displayOrder: 1,
        downloadAllowed: true
      }
    ]
  }
];
