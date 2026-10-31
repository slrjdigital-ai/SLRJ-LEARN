export type ChallengeDifficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface CodingChallenge {
  id: string;
  topicIndex: number; // 0 to 4
  topicTitle: string;
  title: string;
  difficulty: ChallengeDifficulty;
  xpReward: number;
  description: string;
  objective: string;
  constraints: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  testCases: TestCase[];
}

export interface TopicChallengesGroup {
  topicIndex: number;
  topicTitle: string;
  description: string;
  challenges: CodingChallenge[];
}

export const C_CODING_CHALLENGES: CodingChallenge[] = [
  // =========================================================================
  // TOPIC 1: Introduction, Variables & Data Types (5 Challenges)
  // =========================================================================
  {
    id: "c-t1-p1",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Print Hello, World!",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Welcome to C Programming! Your first task is to write a standard C program that prints the exact greeting 'Hello, World!' to standard output.",
    objective: "Print 'Hello, World!' followed by a newline character using printf.",
    constraints: ["Standard ISO C format", "Return 0 exit code on success"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Write your code below to print "Hello, World!"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`,
    hints: [
      "Use the printf function from <stdio.h>.",
      "The string literal must be wrapped in double quotes: \"Hello, World!\\n\"."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Hello, World!",
    explanation:
      "In C, printf prints formatted text to the terminal stream. main() returns 0 to inform the operating system that execution succeeded.",
    testCases: [
      {
        id: "t1-1",
        name: "Default Greeting",
        input: "",
        expectedOutput: "Hello, World!",
        isHidden: false,
      },
      {
        id: "t1-2",
        name: "Hidden Evaluation Test",
        input: "",
        expectedOutput: "Hello, World!",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t1-p2",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Add Two Numbers",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Declare two integer variables 'a' with value 15 and 'b' with value 25. Calculate their sum and print the result in the format: 'Sum = 40'.",
    objective: "Calculate sum of integers and print using the %d format specifier.",
    constraints: ["a = 15, b = 25", "Output format: Sum = <result>"],
    starterCode: `#include <stdio.h>

int main(void) {
    int a = 15;
    int b = 25;
    
    // Calculate sum and print "Sum = 40"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int a = 15;
    int b = 25;
    int sum = a + b;
    printf("Sum = %d\\n", sum);
    return 0;
}`,
    hints: [
      "Create a variable 'int sum = a + b;'.",
      "Use printf(\"Sum = %d\\n\", sum); to output the result."
    ],
    sampleInput: "(pre-defined: a=15, b=25)",
    sampleOutput: "Sum = 40",
    explanation:
      "The %d conversion specifier in C formats signed 32-bit integers in base 10.",
    testCases: [
      {
        id: "t2-1",
        name: "Standard Addition (15 + 25)",
        input: "",
        expectedOutput: "Sum = 40",
        isHidden: false,
      },
      {
        id: "t2-2",
        name: "Hidden Evaluation",
        input: "",
        expectedOutput: "Sum = 40",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t1-p3",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Calculate Area of a Rectangle",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Given a rectangle with length = 12 and breadth = 8, compute its area using the formula: Area = length * breadth. Print the result as: 'Area = 96'.",
    objective: "Compute rectangle area and print formatted output.",
    constraints: ["length = 12, breadth = 8", "Formula: length * breadth"],
    starterCode: `#include <stdio.h>

int main(void) {
    int length = 12;
    int breadth = 8;
    
    // Calculate and print the area: "Area = 96"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int length = 12;
    int breadth = 8;
    int area = length * breadth;
    printf("Area = %d\\n", area);
    return 0;
}`,
    hints: [
      "Multiply length and breadth with the * operator.",
      "Print using printf(\"Area = %d\\n\", area);"
    ],
    sampleInput: "length = 12, breadth = 8",
    sampleOutput: "Area = 96",
    explanation:
      "Multiplication in C uses the * binary arithmetic operator on primitive integers.",
    testCases: [
      {
        id: "t3-1",
        name: "Standard Dimensions (12 x 8)",
        input: "",
        expectedOutput: "Area = 96",
        isHidden: false,
      },
      {
        id: "t3-2",
        name: "Hidden Evaluation Check",
        input: "",
        expectedOutput: "Area = 96",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t1-p4",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Swap Two Variables",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Given two variables x = 10 and y = 20, swap their values using a temporary variable so that x becomes 20 and y becomes 10. Print the values before and after swapping.",
    objective: "Swap two integer variables using a temporary buffer variable.",
    constraints: ["Initial: x = 10, y = 20", "Swap in-memory values"],
    starterCode: `#include <stdio.h>

int main(void) {
    int x = 10;
    int y = 20;
    
    printf("Before: x = %d, y = %d\\n", x, y);
    
    // Swap the values of x and y using a temporary variable
    
    printf("After: x = %d, y = %d\\n", x, y);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int x = 10;
    int y = 20;
    
    printf("Before: x = %d, y = %d\\n", x, y);
    
    int temp = x;
    x = y;
    y = temp;
    
    printf("After: x = %d, y = %d\\n", x, y);
    return 0;
}`,
    hints: [
      "Store x into a temp variable: int temp = x;",
      "Assign y to x, then temp to y."
    ],
    sampleInput: "x = 10, y = 20",
    sampleOutput: "Before: x = 10, y = 20\nAfter: x = 20, y = 10",
    explanation:
      "Swapping requires a third temporary storage location to prevent overwriting the first value during assignment.",
    testCases: [
      {
        id: "t4-1",
        name: "Standard Swap (10 and 20)",
        input: "",
        expectedOutput: "Before: x = 10, y = 20\nAfter: x = 20, y = 10",
        isHidden: false,
      },
      {
        id: "t4-2",
        name: "Hidden Value Verification",
        input: "",
        expectedOutput: "Before: x = 10, y = 20\nAfter: x = 20, y = 10",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t1-p5",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Display Different Data Types",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Declare an int (42), float (3.14), double (2.7182), and char ('Z'). Print them on a single line formatted as: 'int: 42, float: 3.14, double: 2.7182, char: Z'.",
    objective: "Practice primitive data types and format specifiers (%d, %.2f, %.4f, %c).",
    constraints: ["Float precision: %.2f", "Double precision: %.4f"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Declare int, float, double, and char
    // Print in format: "int: 42, float: 3.14, double: 2.7182, char: Z"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int i = 42;
    float f = 3.14f;
    double d = 2.7182;
    char c = 'Z';
    
    printf("int: %d, float: %.2f, double: %.4f, char: %c\\n", i, f, d, c);
    return 0;
}`,
    hints: [
      "Use %d for int, %.2f for float, %.4f for double, and %c for char.",
      "Single quotes are used for characters: char c = 'Z';"
    ],
    sampleInput: "(none)",
    sampleOutput: "int: 42, float: 3.14, double: 2.7182, char: Z",
    explanation:
      "Each primitive data type in C maps to machine word sizes and requires corresponding conversion specifiers for standard output formatting.",
    testCases: [
      {
        id: "t5-1",
        name: "Standard Data Types Output",
        input: "",
        expectedOutput: "int: 42, float: 3.14, double: 2.7182, char: Z",
        isHidden: false,
      },
      {
        id: "t5-2",
        name: "Hidden Format Check",
        input: "",
        expectedOutput: "int: 42, float: 3.14, double: 2.7182, char: Z",
        isHidden: true,
      },
    ],
  },

  // =========================================================================
  // TOPIC 2: Operators, Conditions & Loops (6 Challenges)
  // =========================================================================
  {
    id: "c-t2-p1",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Check Even or Odd",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Given an integer variable 'num = 14', write an if-else condition using the modulo operator (%) to determine if it is Even or Odd. Output: '14 is Even'.",
    objective: "Use conditional if-else and modulus operator % 2.",
    constraints: ["num = 14", "Output format: <num> is Even / <num> is Odd"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = 14;
    
    // Check if num is even or odd and print result
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 14;
    if (num % 2 == 0) {
        printf("%d is Even\\n", num);
    } else {
        printf("%d is Odd\\n", num);
    }
    return 0;
}`,
    hints: [
      "If num % 2 == 0, the number divides evenly by 2 and is even.",
      "Otherwise, it is odd."
    ],
    sampleInput: "num = 14",
    sampleOutput: "14 is Even",
    explanation:
      "The modulo operator returns the division remainder. An even integer always has remainder 0 when divided by 2.",
    testCases: [
      {
        id: "t2-1-1",
        name: "Check 14 (Even)",
        input: "",
        expectedOutput: "14 is Even",
        isHidden: false,
      },
      {
        id: "t2-1-2",
        name: "Hidden Evaluation Test",
        input: "",
        expectedOutput: "14 is Even",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t2-p2",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Find Largest of Three Numbers",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given three numbers a = 45, b = 89, and c = 62, find the largest number using conditional logic (&& logical operator). Print: 'Largest: 89'.",
    objective: "Compare three integers using if-else if conditions.",
    constraints: ["a = 45, b = 89, c = 62", "Output: Largest: <max>"],
    starterCode: `#include <stdio.h>

int main(void) {
    int a = 45;
    int b = 89;
    int c = 62;
    
    // Find the largest among a, b, and c and print "Largest: 89"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int a = 45;
    int b = 89;
    int c = 62;
    
    int largest = a;
    if (b >= largest && b >= c) {
        largest = b;
    } else if (c >= largest) {
        largest = c;
    }
    
    printf("Largest: %d\\n", largest);
    return 0;
}`,
    hints: [
      "Compare a with b and c, then b with c.",
      "Alternatively, keep a 'largest' variable and update it when a bigger number is found."
    ],
    sampleInput: "a = 45, b = 89, c = 62",
    sampleOutput: "Largest: 89",
    explanation:
      "Logical AND (&&) verifies multiple boolean operands simultaneously for multi-branch decisions.",
    testCases: [
      {
        id: "t2-2-1",
        name: "Find Largest (45, 89, 62)",
        input: "",
        expectedOutput: "Largest: 89",
        isHidden: false,
      },
      {
        id: "t2-2-2",
        name: "Hidden Evaluation",
        input: "",
        expectedOutput: "Largest: 89",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t2-p3",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Check Positive, Negative or Zero",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Given an integer variable 'num = -15', write a program that evaluates if it is Positive, Negative, or Zero. Print: '-15 is Negative'.",
    objective: "Use multi-way branching to classify an integer's sign.",
    constraints: ["num = -15", "Output format: <num> is Positive/Negative/Zero"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = -15;
    
    // Check if num is Positive, Negative, or Zero
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = -15;
    if (num > 0) {
        printf("%d is Positive\\n", num);
    } else if (num < 0) {
        printf("%d is Negative\\n", num);
    } else {
        printf("%d is Zero\\n", num);
    }
    return 0;
}`,
    hints: [
      "Check num > 0 first, then num < 0, else 0."
    ],
    sampleInput: "num = -15",
    sampleOutput: "-15 is Negative",
    explanation:
      "Relational operators (> and <) test numeric inequality against the zero baseline.",
    testCases: [
      {
        id: "t2-3-1",
        name: "Check -15 (Negative)",
        input: "",
        expectedOutput: "-15 is Negative",
        isHidden: false,
      },
      {
        id: "t2-3-2",
        name: "Hidden Sign Evaluation",
        input: "",
        expectedOutput: "-15 is Negative",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t2-p4",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Print Multiplication Table",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Using a for loop, print the multiplication table of 6 from 1 to 5. Format each line as: '6 x 1 = 6', '6 x 2 = 12', etc.",
    objective: "Construct a bounded for loop to print multiples.",
    constraints: ["Table of 6", "Range: 1 to 5 inclusive"],
    starterCode: `#include <stdio.h>

int main(void) {
    int n = 6;
    
    // Write a for loop from 1 to 5 to print the table of 6
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int n = 6;
    for (int i = 1; i <= 5; i++) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}`,
    hints: [
      "Use for (int i = 1; i <= 5; i++).",
      "Print formatted string: printf(\"%d x %d = %d\\n\", n, i, n * i);"
    ],
    sampleInput: "n = 6, range: 1..5",
    sampleOutput: "6 x 1 = 6\n6 x 2 = 12\n6 x 3 = 18\n6 x 4 = 24\n6 x 5 = 30",
    explanation:
      "For loops combine loop initialization, boolean termination condition, and step increment in a single statement.",
    testCases: [
      {
        id: "t2-4-1",
        name: "Table of 6 (1 to 5)",
        input: "",
        expectedOutput: "6 x 1 = 6\n6 x 2 = 12\n6 x 3 = 18\n6 x 4 = 24\n6 x 5 = 30",
        isHidden: false,
      },
      {
        id: "t2-4-2",
        name: "Hidden Loop Range Check",
        input: "",
        expectedOutput: "6 x 1 = 6\n6 x 2 = 12\n6 x 3 = 18\n6 x 4 = 24\n6 x 5 = 30",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t2-p5",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Calculate Factorial",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Compute the factorial of n = 5 (5! = 5 * 4 * 3 * 2 * 1). Print the result as: 'Factorial of 5 = 120'.",
    objective: "Use accumulator multiplication inside a loop to compute n!.",
    constraints: ["n = 5", "Output format: Factorial of 5 = 120"],
    starterCode: `#include <stdio.h>

int main(void) {
    int n = 5;
    long long fact = 1;
    
    // Compute factorial of 5 using a loop
    
    printf("Factorial of %d = %lld\\n", n, fact);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int n = 5;
    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("Factorial of %d = %lld\\n", n, fact);
    return 0;
}`,
    hints: [
      "Multiply fact by i for each number from 1 up to n: fact *= i;"
    ],
    sampleInput: "n = 5",
    sampleOutput: "Factorial of 5 = 120",
    explanation:
      "Factorials grow exponentially. Using a loop with an accumulator computes the product in O(n) linear time.",
    testCases: [
      {
        id: "t2-5-1",
        name: "Factorial of 5",
        input: "",
        expectedOutput: "Factorial of 5 = 120",
        isHidden: false,
      },
      {
        id: "t2-5-2",
        name: "Hidden Factorial Test",
        input: "",
        expectedOutput: "Factorial of 5 = 120",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t2-p6",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Check Prime Numbers",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given an integer num = 29, verify whether it is a Prime number (divisible only by 1 and itself). Print: '29 is a Prime Number'.",
    objective: "Implement primality testing using loop divisibility checks.",
    constraints: ["num = 29", "Prime test up to sqrt(num) or i * i <= num"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = 29;
    int isPrime = 1; // 1 = true, 0 = false
    
    // Check if num is prime
    
    if (isPrime && num > 1) {
        printf("%d is a Prime Number\\n", num);
    } else {
        printf("%d is Not a Prime Number\\n", num);
    }
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 29;
    int isPrime = 1;
    if (num <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = 0;
                break;
            }
        }
    }
    if (isPrime && num > 1) {
        printf("%d is a Prime Number\\n", num);
    } else {
        printf("%d is Not a Prime Number\\n", num);
    }
    return 0;
}`,
    hints: [
      "Check if any integer from 2 up to i * i <= num divides num evenly (num % i == 0).",
      "If a divisor is found, set isPrime = 0 and break."
    ],
    sampleInput: "num = 29",
    sampleOutput: "29 is a Prime Number",
    explanation:
      "A prime number is greater than 1 with no positive divisors other than 1 and itself. Testing up to sqrt(n) optimizes trial division to O(sqrt(n)).",
    testCases: [
      {
        id: "t2-6-1",
        name: "Check 29 (Prime)",
        input: "",
        expectedOutput: "29 is a Prime Number",
        isHidden: false,
      },
      {
        id: "t2-6-2",
        name: "Hidden Primality Check",
        input: "",
        expectedOutput: "29 is a Prime Number",
        isHidden: true,
      },
    ],
  },

  // =========================================================================
  // TOPIC 3: Functions, Arrays & Strings (5 Challenges)
  // =========================================================================
  {
    id: "c-t3-p1",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Function to Add Two Numbers",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Create a reusable C function named 'add' that takes two integer parameters and returns their sum. In main(), invoke add(35, 65) and print: 'Result: 100'.",
    objective: "Declare and define a user function with parameters and return value.",
    constraints: ["Function signature: int add(int a, int b)", "Invoke with 35, 65"],
    starterCode: `#include <stdio.h>

// Define the add function here:
// int add(int a, int b) { ... }

int main(void) {
    int res = add(35, 65);
    printf("Result: %d\\n", res);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int res = add(35, 65);
    printf("Result: %d\\n", res);
    return 0;
}`,
    hints: [
      "Write: int add(int a, int b) { return a + b; } before main()."
    ],
    sampleInput: "add(35, 65)",
    sampleOutput: "Result: 100",
    explanation:
      "Functions encapsulate modular units of logic, keeping variables scoped to local stack frames.",
    testCases: [
      {
        id: "t3-1-1",
        name: "Function Invocation (35 + 65)",
        input: "",
        expectedOutput: "Result: 100",
        isHidden: false,
      },
      {
        id: "t3-1-2",
        name: "Hidden Function Evaluation",
        input: "",
        expectedOutput: "Result: 100",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t3-p2",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Find Largest Array Element",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given an array 'int arr[] = {23, 78, 12, 94, 56, 31};', write a loop to traverse the array and find the maximum element. Print: 'Maximum: 94'.",
    objective: "Traverse a contiguous array to find the global maximum value.",
    constraints: ["arr = {23, 78, 12, 94, 56, 31}", "Output: Maximum: 94"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[] = {23, 78, 12, 94, 56, 31};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    // Find the maximum value in arr and print "Maximum: 94"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[] = {23, 78, 12, 94, 56, 31};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    printf("Maximum: %d\\n", max);
    return 0;
}`,
    hints: [
      "Initialize max = arr[0]; then loop from index 1 to size - 1.",
      "If arr[i] > max, update max = arr[i];."
    ],
    sampleInput: "arr[] = {23, 78, 12, 94, 56, 31}",
    sampleOutput: "Maximum: 94",
    explanation:
      "Array elements are stored sequentially in memory. Linear traversal evaluates the maximum in O(n) time.",
    testCases: [
      {
        id: "t3-2-1",
        name: "Array Maximum Check",
        input: "",
        expectedOutput: "Maximum: 94",
        isHidden: false,
      },
      {
        id: "t3-2-2",
        name: "Hidden Array Evaluation",
        input: "",
        expectedOutput: "Maximum: 94",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t3-p3",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Reverse an Array",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given an array 'int arr[] = {1, 2, 3, 4, 5};', print the elements in reverse order separated by spaces: '5 4 3 2 1'.",
    objective: "Iterate backwards from size - 1 down to 0.",
    constraints: ["arr = {1, 2, 3, 4, 5}", "Output on a single line"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    // Print the array elements in reverse order separated by spaces
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    for (int i = size - 1; i >= 0; i--) {
        printf("%d%s", arr[i], i == 0 ? "\\n" : " ");
    }
    return 0;
}`,
    hints: [
      "Start loop at index size - 1 and decrement down to 0: for (int i = size - 1; i >= 0; i--)."
    ],
    sampleInput: "arr = {1, 2, 3, 4, 5}",
    sampleOutput: "5 4 3 2 1",
    explanation:
      "Reverse indexing accesses memory addresses from high offsets to low offsets.",
    testCases: [
      {
        id: "t3-3-1",
        name: "Reverse 1..5 Array",
        input: "",
        expectedOutput: "5 4 3 2 1",
        isHidden: false,
      },
      {
        id: "t3-3-2",
        name: "Hidden Reverse Evaluation",
        input: "",
        expectedOutput: "5 4 3 2 1",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t3-p4",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Calculate String Length",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Given the string 'char str[] = \"SLRJ Learn\";', compute its length without using the strlen() library function by looping until the null terminator '\\0'. Print: 'Length: 10'.",
    objective: "Traverse a null-terminated string to count characters manually.",
    constraints: ["str = \"SLRJ Learn\"", "No strlen() library call"],
    starterCode: `#include <stdio.h>

int main(void) {
    char str[] = "SLRJ Learn";
    int length = 0;
    
    // Calculate string length without strlen()
    
    printf("Length: %d\\n", length);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    char str[] = "SLRJ Learn";
    int length = 0;
    
    while (str[length] != '\\0') {
        length++;
    }
    
    printf("Length: %d\\n", length);
    return 0;
}`,
    hints: [
      "In C, strings always end with '\\0'.",
      "Use while (str[length] != '\\0') length++;"
    ],
    sampleInput: "str = \"SLRJ Learn\"",
    sampleOutput: "Length: 10",
    explanation:
      "C strings are character arrays terminating with a null byte (0x00). Counting iterations until '\\0' calculates string length.",
    testCases: [
      {
        id: "t3-4-1",
        name: "Length of 'SLRJ Learn'",
        input: "",
        expectedOutput: "Length: 10",
        isHidden: false,
      },
      {
        id: "t3-4-2",
        name: "Hidden String Length Check",
        input: "",
        expectedOutput: "Length: 10",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t3-p5",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Check Palindrome String",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given the string 'char str[] = \"radar\";', check if it is a Palindrome (reads the same forwards and backwards). Print: 'radar is a Palindrome'.",
    objective: "Compare characters using two-pointer approach from start and end.",
    constraints: ["str = \"radar\"", "Case-sensitive palindrome check"],
    starterCode: `#include <stdio.h>

int main(void) {
    char str[] = "radar";
    int isPalindrome = 1;
    
    // Check if str is a palindrome
    
    if (isPalindrome) {
        printf("%s is a Palindrome\\n", str);
    } else {
        printf("%s is Not a Palindrome\\n", str);
    }
    return 0;
}`,
    solutionCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "radar";
    int isPalindrome = 1;
    int len = strlen(str);
    
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            isPalindrome = 0;
            break;
        }
    }
    
    if (isPalindrome) {
        printf("%s is a Palindrome\\n", str);
    } else {
        printf("%s is Not a Palindrome\\n", str);
    }
    return 0;
}`,
    hints: [
      "Compare str[i] with str[len - 1 - i] up to len / 2.",
      "If any character differs, set isPalindrome = 0."
    ],
    sampleInput: "str = \"radar\"",
    sampleOutput: "radar is a Palindrome",
    explanation:
      "A palindrome exhibits bilateral symmetry. The two-pointer technique checks outer pairs inward in O(n/2) time.",
    testCases: [
      {
        id: "t3-5-1",
        name: "Check 'radar' (Palindrome)",
        input: "",
        expectedOutput: "radar is a Palindrome",
        isHidden: false,
      },
      {
        id: "t3-5-2",
        name: "Hidden Palindrome Evaluation",
        input: "",
        expectedOutput: "radar is a Palindrome",
        isHidden: true,
      },
    ],
  },

  // =========================================================================
  // TOPIC 4: Pointers & Memory Management (5 Challenges)
  // =========================================================================
  {
    id: "c-t4-p1",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Print Value and Address of a Variable",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Declare an integer 'val = 77'. Declare a pointer 'int *ptr = &val;'. Print the value accessed through the pointer: 'Value: 77'.",
    objective: "Understand the address-of (&) and dereference (*) operators.",
    constraints: ["val = 77", "Print value accessed via pointer"],
    starterCode: `#include <stdio.h>

int main(void) {
    int val = 77;
    int *ptr = &val;
    
    // Print the value of val using the pointer ptr
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int val = 77;
    int *ptr = &val;
    
    printf("Value: %d\\n", *ptr);
    return 0;
}`,
    hints: [
      "Use *ptr to dereference the pointer and get the value stored at that address: printf(\"Value: %d\\n\", *ptr);"
    ],
    sampleInput: "val = 77",
    sampleOutput: "Value: 77",
    explanation:
      "The & operator extracts the memory address of val, and *ptr dereferences that memory location.",
    testCases: [
      {
        id: "t4-1-1",
        name: "Pointer Dereference Value",
        input: "",
        expectedOutput: "Value: 77",
        isHidden: false,
      },
      {
        id: "t4-1-2",
        name: "Hidden Pointer Evaluation",
        input: "",
        expectedOutput: "Value: 77",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t4-p2",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Mutate Values Using Pointers",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given 'int num = 50;', declare a pointer to num. Mutate num to 250 by assigning through the pointer (*ptr = 250). Print: 'Original: 50, Modified: 250'.",
    objective: "Mutate variable state indirectly via pointer dereferencing.",
    constraints: ["Initial: num = 50", "Modify using *ptr = 250"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = 50;
    int *ptr = &num;
    
    printf("Original: %d, ", num);
    
    // Modify num using the pointer ptr to 250
    
    printf("Modified: %d\\n", num);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 50;
    int *ptr = &num;
    
    printf("Original: %d, ", num);
    
    *ptr = 250;
    
    printf("Modified: %d\\n", num);
    return 0;
}`,
    hints: [
      "Assigning to *ptr modifies the underlying memory location: *ptr = 250;"
    ],
    sampleInput: "num = 50, update to 250",
    sampleOutput: "Original: 50, Modified: 250",
    explanation:
      "Direct memory modification via pointers allows functions to mutate caller variables and manipulate data structures.",
    testCases: [
      {
        id: "t4-2-1",
        name: "Pointer Mutation (50 -> 250)",
        input: "",
        expectedOutput: "Original: 50, Modified: 250",
        isHidden: false,
      },
      {
        id: "t4-2-2",
        name: "Hidden Pointer Mutation Check",
        input: "",
        expectedOutput: "Original: 50, Modified: 250",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t4-p3",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Swap Two Numbers Using Pointers",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Implement a function 'void swap(int *a, int *b)' that swaps the values of two integers by reference. In main(), call swap(&x, &y) for x = 10 and y = 20. Print: 'Before: x=10, y=20\\nAfter: x=20, y=10'.",
    objective: "Implement pass-by-reference using pointers.",
    constraints: ["Function: void swap(int *a, int *b)", "x = 10, y = 20"],
    starterCode: `#include <stdio.h>

// Implement swap function using pointers:
// void swap(int *a, int *b) { ... }

int main(void) {
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After: x=%d, y=%d\\n", x, y);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After: x=%d, y=%d\\n", x, y);
    return 0;
}`,
    hints: [
      "In swap: int temp = *a; *a = *b; *b = temp;"
    ],
    sampleInput: "x = 10, y = 20",
    sampleOutput: "Before: x=10, y=20\nAfter: x=20, y=10",
    explanation:
      "C is strictly pass-by-value. Passing memory addresses simulates pass-by-reference, allowing swap() to modify main's stack frame.",
    testCases: [
      {
        id: "t4-3-1",
        name: "Swap by Reference (10 and 20)",
        input: "",
        expectedOutput: "Before: x=10, y=20\nAfter: x=20, y=10",
        isHidden: false,
      },
      {
        id: "t4-3-2",
        name: "Hidden Swap Check",
        input: "",
        expectedOutput: "Before: x=10, y=20\nAfter: x=20, y=10",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t4-p4",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Demonstrate Pointer Arithmetic",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Given 'int arr[] = {10, 20, 30, 40, 50};', use pointer arithmetic (*(ptr + i)) instead of array indexing to print all 5 elements separated by spaces: '10 20 30 40 50'.",
    objective: "Understand array decaying into pointers and pointer offset arithmetic.",
    constraints: ["Use *(ptr + i) to read elements", "Array of 5 integers"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    // Print all elements using pointer arithmetic *(ptr + i)
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    for (int i = 0; i < 5; i++) {
        printf("%d%s", *(ptr + i), i == 4 ? "\\n" : " ");
    }
    return 0;
}`,
    hints: [
      "The expression *(ptr + i) calculates the address ptr + i * sizeof(int) and dereferences it."
    ],
    sampleInput: "arr = {10, 20, 30, 40, 50}",
    sampleOutput: "10 20 30 40 50",
    explanation:
      "Array subscription arr[i] is syntactically equivalent to *(arr + i). Pointers advance by the type's byte size automatically.",
    testCases: [
      {
        id: "t4-4-1",
        name: "Pointer Arithmetic Traversal",
        input: "",
        expectedOutput: "10 20 30 40 50",
        isHidden: false,
      },
      {
        id: "t4-4-2",
        name: "Hidden Pointer Offset Check",
        input: "",
        expectedOutput: "10 20 30 40 50",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t4-p5",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Dynamic Memory Allocation (malloc & free)",
    difficulty: "Hard",
    xpReward: 100,
    description:
      "Allocate memory on the Heap for 3 integers using malloc(). Populate them with values 100, 200, and 300. Calculate their sum (600), print 'Sum: 600', and release memory using free().",
    objective: "Master dynamic heap allocation, NULL checking, and memory deallocation.",
    constraints: ["Use malloc(3 * sizeof(int))", "Always call free() to prevent leaks"],
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    // 1. Allocate heap memory for 3 ints
    // 2. Assign values: 100, 200, 300
    // 3. Print "Sum: 600"
    // 4. Free allocated memory
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = (int *)malloc(3 * sizeof(int));
    if (arr == NULL) {
        return 1;
    }
    
    arr[0] = 100;
    arr[1] = 200;
    arr[2] = 300;
    
    int sum = arr[0] + arr[1] + arr[2];
    printf("Sum: %d\\n", sum);
    
    free(arr);
    arr = NULL;
    return 0;
}`,
    hints: [
      "Allocate with: int *arr = (int *)malloc(3 * sizeof(int));",
      "Assign arr[0] = 100, arr[1] = 200, arr[2] = 300.",
      "Call free(arr) before returning 0."
    ],
    sampleInput: "malloc 3 ints",
    sampleOutput: "Sum: 600",
    explanation:
      "malloc allocates uninitialized bytes on the process heap. free() returns the memory chunk to the OS to avert memory leaks.",
    testCases: [
      {
        id: "t4-5-1",
        name: "Heap Allocation & Sum",
        input: "",
        expectedOutput: "Sum: 600",
        isHidden: false,
      },
      {
        id: "t4-5-2",
        name: "Hidden Heap Hygiene Check",
        input: "",
        expectedOutput: "Sum: 600",
        isHidden: true,
      },
    ],
  },

  // =========================================================================
  // TOPIC 5: Structures & File Handling (5 Challenges)
  // =========================================================================
  {
    id: "c-t5-p1",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Create a Student Structure",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Define a 'struct Student' containing id (int), name (string / char array), and gpa (float). Create an instance with id = 101, name = 'Shahid', and gpa = 3.95. Print: 'Student #101: Shahid (GPA: 3.95)'.",
    objective: "Define composite struct types and initialize struct members.",
    constraints: ["id = 101, name = 'Shahid', gpa = 3.95", "GPA format: %.2f"],
    starterCode: `#include <stdio.h>

struct Student {
    int id;
    char name[32];
    float gpa;
};

int main(void) {
    // Initialize student s and print "Student #101: Shahid (GPA: 3.95)"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

struct Student {
    int id;
    char name[32];
    float gpa;
};

int main(void) {
    struct Student s = {101, "Shahid", 3.95f};
    printf("Student #%d: %s (GPA: %.2f)\\n", s.id, s.name, s.gpa);
    return 0;
}`,
    hints: [
      "Initialize with: struct Student s = {101, \"Shahid\", 3.95f};",
      "Access members using the dot operator: s.id, s.name, s.gpa."
    ],
    sampleInput: "(struct Student instance)",
    sampleOutput: "Student #101: Shahid (GPA: 3.95)",
    explanation:
      "Structures group heterogeneous data elements contiguously in memory for semantic data modeling.",
    testCases: [
      {
        id: "t5-1-1",
        name: "Student Struct Instance",
        input: "",
        expectedOutput: "Student #101: Shahid (GPA: 3.95)",
        isHidden: false,
      },
      {
        id: "t5-1-2",
        name: "Hidden Struct Member Check",
        input: "",
        expectedOutput: "Student #101: Shahid (GPA: 3.95)",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t5-p2",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Store and Display Multiple Student Details",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Create an array of 2 students: #101 Shahid (90.0) and #102 Aarav (80.0). Calculate and print the average marks: 'Average Marks: 85.00'.",
    objective: "Work with arrays of structures and compute collective metrics.",
    constraints: ["Array of 2 Student records", "Average format: %.2f"],
    starterCode: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    float marks;
} Student;

int main(void) {
    Student cohort[2] = {
        {101, "Shahid", 90.0f},
        {102, "Aarav", 80.0f}
    };
    
    // Calculate and print average marks: "Average Marks: 85.00"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    float marks;
} Student;

int main(void) {
    Student cohort[2] = {
        {101, "Shahid", 90.0f},
        {102, "Aarav", 80.0f}
    };
    
    float avg = (cohort[0].marks + cohort[1].marks) / 2.0f;
    printf("Average Marks: %.2f\\n", avg);
    return 0;
}`,
    hints: [
      "Access marks via cohort[i].marks.",
      "Divide by 2.0f to preserve floating point precision."
    ],
    sampleInput: "cohort[2] = {90.0, 80.0}",
    sampleOutput: "Average Marks: 85.00",
    explanation:
      "Arrays of structs represent database tables in memory, where each array index represents a record tuple.",
    testCases: [
      {
        id: "t5-2-1",
        name: "Average Marks Evaluation",
        input: "",
        expectedOutput: "Average Marks: 85.00",
        isHidden: false,
      },
      {
        id: "t5-2-2",
        name: "Hidden Struct Array Check",
        input: "",
        expectedOutput: "Average Marks: 85.00",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t5-p3",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Create and Write to a File",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Write a C program that uses fopen() to open 'log.txt' in write mode ('w'), writes 'SLRJ Learn: Certified', and closes the file with fclose(). Print 'File written successfully' to stdout.",
    objective: "Implement basic file creation and writing with fopen and fclose.",
    constraints: ["File: log.txt", "Output: File written successfully"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Open "log.txt" in "w" mode, write text, and close the file
    // Print "File written successfully"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("log.txt", "w");
    if (fp != NULL) {
        fprintf(fp, "SLRJ Learn: Certified\\n");
        fclose(fp);
        printf("File written successfully\\n");
    }
    return 0;
}`,
    hints: [
      "FILE *fp = fopen(\"log.txt\", \"w\");",
      "Check fp != NULL, then fprintf(fp, \"...\"); fclose(fp);"
    ],
    sampleInput: "(file writing)",
    sampleOutput: "File written successfully",
    explanation:
      "File streams in C interface with OS kernel descriptors. fclose() flushes disk buffers and releases the file handle.",
    testCases: [
      {
        id: "t5-3-1",
        name: "File Write Success",
        input: "",
        expectedOutput: "File written successfully",
        isHidden: false,
      },
      {
        id: "t5-3-2",
        name: "Hidden File Stream Check",
        input: "",
        expectedOutput: "File written successfully",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t5-p4",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Read File Contents",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Simulate reading from a configuration stream. Check if file pointer is valid, read content buffer, and display: 'Stream read: SLRJ Learn Verified'.",
    objective: "Demonstrate file stream verification and formatted reading.",
    constraints: ["Check file handle before reading", "Output: Stream read: SLRJ Learn Verified"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Simulate checking a stream and printing:
    // "Stream read: SLRJ Learn Verified"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    char buffer[64] = "SLRJ Learn Verified";
    printf("Stream read: %s\\n", buffer);
    return 0;
}`,
    hints: [
      "Format output as: printf(\"Stream read: %s\\n\", buffer);"
    ],
    sampleInput: "(simulated stream)",
    sampleOutput: "Stream read: SLRJ Learn Verified",
    explanation:
      "Defensive file reading requires verifying stream handles against NULL to avoid segmentation faults on missing files.",
    testCases: [
      {
        id: "t5-4-1",
        name: "Stream Read Output",
        input: "",
        expectedOutput: "Stream read: SLRJ Learn Verified",
        isHidden: false,
      },
      {
        id: "t5-4-2",
        name: "Hidden Stream Reading Check",
        input: "",
        expectedOutput: "Stream read: SLRJ Learn Verified",
        isHidden: true,
      },
    ],
  },
  {
    id: "c-t5-p5",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Perform Basic File Operations",
    difficulty: "Hard",
    xpReward: 100,
    description:
      "Simulate a robust file logging operation: open stream in append mode, record entry count, and print: 'Log appended. Total records: 5'.",
    objective: "Combine file append modes and record counting.",
    constraints: ["Output format: Log appended. Total records: 5"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Perform log append simulation and print "Log appended. Total records: 5"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int recordCount = 5;
    printf("Log appended. Total records: %d\\n", recordCount);
    return 0;
}`,
    hints: [
      "Print: printf(\"Log appended. Total records: %d\\n\", recordCount);"
    ],
    sampleInput: "(log append mode)",
    sampleOutput: "Log appended. Total records: 5",
    explanation:
      "Append mode ('a' / 'a+') positions the write head at the end of the file, preserving existing historical records.",
    testCases: [
      {
        id: "t5-5-1",
        name: "Append Operation Record Check",
        input: "",
        expectedOutput: "Log appended. Total records: 5",
        isHidden: false,
      },
      {
        id: "t5-5-2",
        name: "Hidden Append Operation Check",
        input: "",
        expectedOutput: "Log appended. Total records: 5",
        isHidden: true,
      },
    ],
  },
];

export const TOPIC_CHALLENGES_METADATA: {
  topicIndex: number;
  topicTitle: string;
  description: string;
}[] = [
  {
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    description: "The C compilation model, GCC compiler, memory layout, variables, and primitive types.",
  },
  {
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    description: "Arithmetic, relational, and logical operators, branching conditions, and for/while loops.",
  },
  {
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    description: "User functions, stack frames, one-dimensional and multi-dimensional arrays, and null-terminated strings.",
  },
  {
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    description: "Memory addresses, pointer dereferencing, pointer arithmetic, pass-by-reference, and dynamic allocation (malloc/free).",
  },
  {
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    description: "Heterogeneous struct models, typedef, file streams (fopen/fprintf/fclose), and persistent I/O.",
  },
];

export function getChallengesForTopic(topicIndex: number): CodingChallenge[] {
  return C_CODING_CHALLENGES.filter((c) => c.topicIndex === topicIndex);
}

export function getChallengeById(id: string): CodingChallenge | undefined {
  return C_CODING_CHALLENGES.find((c) => c.id === id);
}
