import { CodingChallenge, TopicChallengesGroup } from "./codingChallengesData";

export const C_PRACTICE_CHALLENGES: CodingChallenge[] = [
  // =========================================================================
  // TOPIC 1: Variables, Arithmetic & Formatting (5 Distinct Practice Challenges)
  // =========================================================================
  {
    id: "c-prac-t1-p1",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Simple Interest Calculator",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Calculate Simple Interest using the standard financial formula: SI = (P * R * T) / 100. Declare principal P = 5000, rate R = 8, and time T = 3 years. Print 'Simple Interest = 1200'.",
    objective: "Compute simple interest using arithmetic operators and format the output.",
    constraints: ["P = 5000, R = 8, T = 3", "Output format: Simple Interest = <value>"],
    starterCode: `#include <stdio.h>

int main(void) {
    int p = 5000;
    int r = 8;
    int t = 3;
    
    // Calculate simple interest: (p * r * t) / 100
    // Print "Simple Interest = 1200"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int p = 5000;
    int r = 8;
    int t = 3;
    int si = (p * r * t) / 100;
    printf("Simple Interest = %d\\n", si);
    return 0;
}`,
    hints: [
      "Multiply p, r, and t together first, then divide by 100.",
      "Store the result in an integer variable 'si' and print it with %d."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Simple Interest = 1200",
    explanation:
      "Simple Interest is calculated by multiplying Principal, Rate, and Time, then dividing by 100.",
    testCases: [
      {
        id: "prac-t1-1",
        name: "Standard Interest Calculation",
        input: "",
        expectedOutput: "Simple Interest = 1200",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t1-p2",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Celsius to Fahrenheit Converter",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Convert a temperature of 25 degrees Celsius to Fahrenheit using the formula F = (C * 9 / 5) + 32. Print '25 C = 77 F'.",
    objective: "Implement temperature conversion and print in the required format.",
    constraints: ["Celsius = 25", "Output format: 25 C = 77 F"],
    starterCode: `#include <stdio.h>

int main(void) {
    int c = 25;
    
    // Convert to Fahrenheit: (c * 9 / 5) + 32
    // Print "25 C = 77 F"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int c = 25;
    int f = (c * 9 / 5) + 32;
    printf("%d C = %d F\\n", c, f);
    return 0;
}`,
    hints: [
      "Use parentheses to ensure c * 9 is performed before dividing by 5.",
      "Add 32 to complete the conversion."
    ],
    sampleInput: "(no input)",
    sampleOutput: "25 C = 77 F",
    explanation:
      "25 degrees Celsius converted: (25 * 9 / 5) + 32 = 45 + 32 = 77 Fahrenheit.",
    testCases: [
      {
        id: "prac-t1-2",
        name: "Celsius Conversion",
        input: "",
        expectedOutput: "25 C = 77 F",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t1-p3",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Circle Perimeter and Area",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Given radius r = 10 and pi = 3.14, calculate the circle Area (pi * r * r) and Circumference (2 * pi * r). Print 'Area = 314, Circumference = 62'.",
    objective: "Perform floating-point calculations and display circle geometry.",
    constraints: ["r = 10", "Output: Area = 314, Circumference = 62"],
    starterCode: `#include <stdio.h>

int main(void) {
    int r = 10;
    
    // Calculate area and circumference (approx integer)
    // Print "Area = 314, Circumference = 62"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int r = 10;
    int area = 314 * r * r / 100;
    int circ = 2 * 314 * r / 100;
    printf("Area = %d, Circumference = %d\\n", area, circ);
    return 0;
}`,
    hints: [
      "Area of circle is pi * r * r.",
      "Circumference of circle is 2 * pi * r."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Area = 314, Circumference = 62",
    explanation:
      "For radius 10: Area is 3.14 * 100 = 314, and circumference is 2 * 3.14 * 10 = 62.8 (approx 62).",
    testCases: [
      {
        id: "prac-t1-3",
        name: "Circle Metrics",
        input: "",
        expectedOutput: "Area = 314, Circumference = 62",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t1-p4",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Gross Salary Calculator",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "An employee has a basic salary of 30000. HRA is 20% of basic salary (6000), and DA is 10% of basic salary (3000). Calculate gross salary and print 'Gross Salary = 39000'.",
    objective: "Calculate percentage allowances and compute gross salary.",
    constraints: ["Basic = 30000, HRA = 20%, DA = 10%", "Output: Gross Salary = 39000"],
    starterCode: `#include <stdio.h>

int main(void) {
    int basic = 30000;
    
    // HRA = 20% of basic
    // DA = 10% of basic
    // Gross = basic + HRA + DA
    // Print "Gross Salary = 39000"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int basic = 30000;
    int hra = basic * 20 / 100;
    int da = basic * 10 / 100;
    int gross = basic + hra + da;
    printf("Gross Salary = %d\\n", gross);
    return 0;
}`,
    hints: [
      "HRA is (basic * 20) / 100.",
      "DA is (basic * 10) / 100.",
      "Gross salary is basic + hra + da."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Gross Salary = 39000",
    explanation:
      "30000 + 6000 (HRA) + 3000 (DA) = 39000 total gross compensation.",
    testCases: [
      {
        id: "prac-t1-4",
        name: "Gross Salary Evaluation",
        input: "",
        expectedOutput: "Gross Salary = 39000",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t1-p5",
    topicIndex: 0,
    topicTitle: "Introduction, Variables & Data Types",
    title: "Swap Without Temp Variable",
    difficulty: "Medium",
    xpReward: 70,
    description:
      "Swap two integer variables x = 10 and y = 20 without using any third temporary variable. Print 'After Swap: x = 20, y = 10'.",
    objective: "Perform variable swapping using arithmetic addition and subtraction.",
    constraints: ["x = 10, y = 20", "No third variable", "Output: After Swap: x = 20, y = 10"],
    starterCode: `#include <stdio.h>

int main(void) {
    int x = 10;
    int y = 20;
    
    // Swap x and y without using a 3rd variable
    // Print "After Swap: x = 20, y = 10"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int x = 10;
    int y = 20;
    x = x + y;
    y = x - y;
    x = x - y;
    printf("After Swap: x = %d, y = %d\\n", x, y);
    return 0;
}`,
    hints: [
      "Step 1: x = x + y (x becomes 30)",
      "Step 2: y = x - y (y becomes 10)",
      "Step 3: x = x - y (x becomes 20)"
    ],
    sampleInput: "(no input)",
    sampleOutput: "After Swap: x = 20, y = 10",
    explanation:
      "By adding the two values into x, we can extract the initial values via subtraction without extra memory.",
    testCases: [
      {
        id: "prac-t1-5",
        name: "Swap Without Extra Var",
        input: "",
        expectedOutput: "After Swap: x = 20, y = 10",
        isHidden: false,
      },
    ],
  },

  // =========================================================================
  // TOPIC 2: Conditions, Decision Making & Loops (6 Practice Challenges)
  // =========================================================================
  {
    id: "c-prac-t2-p1",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Leap Year Checker",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Check if year 2024 is a leap year. In C, a year is a leap year if it is divisible by 4. Print '2024 is a Leap Year'.",
    objective: "Use modulus operator and conditional if statement to test divisibility.",
    constraints: ["Year = 2024", "Output format: 2024 is a Leap Year"],
    starterCode: `#include <stdio.h>

int main(void) {
    int year = 2024;
    
    // Check if year is leap year
    // Print "2024 is a Leap Year"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int year = 2024;
    if (year % 4 == 0) {
        printf("%d is a Leap Year\\n", year);
    } else {
        printf("%d is not a Leap Year\\n", year);
    }
    return 0;
}`,
    hints: [
      "Use the modulo operator: year % 4 == 0.",
      "Print using %d format specifier."
    ],
    sampleInput: "(no input)",
    sampleOutput: "2024 is a Leap Year",
    explanation: "2024 is divisible by 4 with zero remainder, making it a leap year.",
    testCases: [
      {
        id: "prac-t2-1",
        name: "Leap Year Evaluation",
        input: "",
        expectedOutput: "2024 is a Leap Year",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t2-p2",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Sum of Natural Numbers",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Calculate the sum of the first 10 natural numbers (1 + 2 + 3 + ... + 10). Print 'Sum of first 10 numbers = 55'.",
    objective: "Implement a for or while loop to accumulate numbers.",
    constraints: ["n = 10", "Output: Sum of first 10 numbers = 55"],
    starterCode: `#include <stdio.h>

int main(void) {
    int n = 10;
    int sum = 0;
    
    // Use loop to sum 1 to 10
    // Print "Sum of first 10 numbers = 55"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int n = 10;
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("Sum of first 10 numbers = %d\\n", sum);
    return 0;
}`,
    hints: [
      "Initialize sum = 0.",
      "Iterate from i = 1 up to i <= 10 and add i to sum."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Sum of first 10 numbers = 55",
    explanation: "Sum of 1 through 10 is 55.",
    testCases: [
      {
        id: "prac-t2-2",
        name: "Sum of 10 Numbers",
        input: "",
        expectedOutput: "Sum of first 10 numbers = 55",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t2-p3",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Fibonacci Sequence",
    difficulty: "Medium",
    xpReward: 70,
    description:
      "Generate the first 7 numbers of the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8. Print 'Fibonacci: 0 1 1 2 3 5 8'.",
    objective: "Implement state tracking across loop iterations to print the Fibonacci series.",
    constraints: ["Print 7 terms", "Output: Fibonacci: 0 1 1 2 3 5 8"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Generate first 7 Fibonacci terms: 0 1 1 2 3 5 8
    // Print "Fibonacci: 0 1 1 2 3 5 8"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int t1 = 0;
    int t2 = 1;
    printf("Fibonacci: %d %d", t1, t2);
    for (int i = 3; i <= 7; i++) {
        int nextTerm = t1 + t2;
        printf(" %d", nextTerm);
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n");
    return 0;
}`,
    hints: [
      "Start with t1 = 0 and t2 = 1.",
      "Next term is always t1 + t2. Then update t1 = t2 and t2 = next."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Fibonacci: 0 1 1 2 3 5 8",
    explanation: "Each number is the sum of the two preceding numbers.",
    testCases: [
      {
        id: "prac-t2-3",
        name: "Fibonacci 7 Terms",
        input: "",
        expectedOutput: "Fibonacci: 0 1 1 2 3 5 8",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t2-p4",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Reverse a Number",
    difficulty: "Medium",
    xpReward: 70,
    description:
      "Given the integer num = 12345, reverse its digits using a while loop. Print 'Reversed Number = 54321'.",
    objective: "Extract digits using modulo 10 and construct the reversed integer.",
    constraints: ["num = 12345", "Output: Reversed Number = 54321"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = 12345;
    int rev = 0;
    
    // Reverse num using a loop
    // Print "Reversed Number = 54321"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 12345;
    int rev = 0;
    while (num > 0) {
        rev = rev * 10 + (num % 10);
        num = num / 10;
    }
    printf("Reversed Number = %d\\n", rev);
    return 0;
}`,
    hints: [
      "Get the last digit with num % 10.",
      "Multiply rev by 10 and add the digit: rev = rev * 10 + (num % 10).",
      "Divide num by 10 in each step."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Reversed Number = 54321",
    explanation: "12345 is stripped digit by digit to create 54321.",
    testCases: [
      {
        id: "prac-t2-4",
        name: "Number Reversal",
        input: "",
        expectedOutput: "Reversed Number = 54321",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t2-p5",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Count Digits in a Number",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Count the total number of digits in the integer 987654. Print 'Total Digits = 6'.",
    objective: "Use integer division to count the number of digits.",
    constraints: ["num = 987654", "Output: Total Digits = 6"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = 987654;
    int count = 0;
    
    // Count digits in num
    // Print "Total Digits = 6"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 987654;
    int count = 0;
    while (num != 0) {
        num /= 10;
        count++;
    }
    printf("Total Digits = %d\\n", count);
    return 0;
}`,
    hints: [
      "Divide num by 10 in each iteration of a while loop.",
      "Increment count until num becomes 0."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Total Digits = 6",
    explanation: "987654 has 6 individual decimal digits.",
    testCases: [
      {
        id: "prac-t2-5",
        name: "Count Digits",
        input: "",
        expectedOutput: "Total Digits = 6",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t2-p6",
    topicIndex: 1,
    topicTitle: "Operators, Conditions & Loops",
    title: "Armstrong Number Checker",
    difficulty: "Medium",
    xpReward: 80,
    description:
      "Check if 153 is an Armstrong number (1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153). Print '153 is an Armstrong Number'.",
    objective: "Compute the sum of the cubes of each digit and compare with the original number.",
    constraints: ["num = 153", "Output: 153 is an Armstrong Number"],
    starterCode: `#include <stdio.h>

int main(void) {
    int num = 153;
    
    // Verify if 153 is an Armstrong number
    // Print "153 is an Armstrong Number"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int num = 153;
    int original = num;
    int sum = 0;
    while (num > 0) {
        int rem = num % 10;
        sum += rem * rem * rem;
        num /= 10;
    }
    if (sum == original) {
        printf("%d is an Armstrong Number\\n", original);
    } else {
        printf("%d is not an Armstrong Number\\n", original);
    }
    return 0;
}`,
    hints: [
      "Extract each digit with % 10.",
      "Cube the digit (rem * rem * rem) and add to sum."
    ],
    sampleInput: "(no input)",
    sampleOutput: "153 is an Armstrong Number",
    explanation: "1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.",
    testCases: [
      {
        id: "prac-t2-6",
        name: "Armstrong Evaluation",
        input: "",
        expectedOutput: "153 is an Armstrong Number",
        isHidden: false,
      },
    ],
  },

  // =========================================================================
  // TOPIC 3: Functions, Arrays & Algorithms (5 Practice Challenges)
  // =========================================================================
  {
    id: "c-prac-t3-p1",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Linear Search in Array",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Search for target element 45 in array [10, 25, 45, 60, 80]. If found, print 'Element 45 found at index 2'.",
    objective: "Implement a linear search loop over an array of integers.",
    constraints: ["Array = {10, 25, 45, 60, 80}, target = 45", "Output: Element 45 found at index 2"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 25, 45, 60, 80};
    int target = 45;
    
    // Search for target in arr
    // Print "Element 45 found at index 2"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 25, 45, 60, 80};
    int target = 45;
    int index = -1;
    for (int i = 0; i < 5; i++) {
        if (arr[i] == target) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        printf("Element %d found at index %d\\n", target, index);
    }
    return 0;
}`,
    hints: [
      "Loop from i = 0 to 4.",
      "Compare arr[i] == target and record the index."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Element 45 found at index 2",
    explanation: "Element 45 is located at array index 2.",
    testCases: [
      {
        id: "prac-t3-1",
        name: "Search 45",
        input: "",
        expectedOutput: "Element 45 found at index 2",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t3-p2",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Second Largest in Array",
    difficulty: "Medium",
    xpReward: 80,
    description:
      "Given the array [14, 46, 78, 92, 33], find and display the second largest element. Print 'Second Largest = 78'.",
    objective: "Track both the highest and second-highest values in a single pass.",
    constraints: ["Array: 14, 46, 78, 92, 33", "Output: Second Largest = 78"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {14, 46, 78, 92, 33};
    
    // Find second largest element
    // Print "Second Largest = 78"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {14, 46, 78, 92, 33};
    int largest = arr[0];
    int second = -1;
    for (int i = 1; i < 5; i++) {
        if (arr[i] > largest) {
            second = largest;
            largest = arr[i];
        } else if (arr[i] > second && arr[i] != largest) {
            second = arr[i];
        }
    }
    printf("Second Largest = %d\\n", second);
    return 0;
}`,
    hints: [
      "When a new largest is found, the previous largest becomes the second largest.",
      "Print the second largest."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Second Largest = 78",
    explanation: "92 is the largest, and 78 is the second largest.",
    testCases: [
      {
        id: "prac-t3-2",
        name: "Second Largest Test",
        input: "",
        expectedOutput: "Second Largest = 78",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t3-p3",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Count Vowels in String",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Count the number of vowels (a, e, i, o, u) in the string 'slrjdigitallearning'. Print 'Total Vowels = 6'.",
    objective: "Iterate through a string array and check character matches.",
    constraints: ["String: slrjdigitallearning", "Output: Total Vowels = 6"],
    starterCode: `#include <stdio.h>

int main(void) {
    char str[] = "slrjdigitallearning";
    int count = 0;
    
    // Count vowels in str
    // Print "Total Vowels = 6"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    char str[] = "slrjdigitallearning";
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = str[i];
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            count++;
        }
    }
    printf("Total Vowels = %d\\n", count);
    return 0;
}`,
    hints: [
      "Loop until str[i] != '\\0'.",
      "Check if str[i] equals 'a', 'e', 'i', 'o', or 'u'."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Total Vowels = 6",
    explanation: "Vowels in 'slrjdigitallearning': i, i, a, e, a, i = 6 vowels.",
    testCases: [
      {
        id: "prac-t3-3",
        name: "Vowels Count",
        input: "",
        expectedOutput: "Total Vowels = 6",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t3-p4",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Power Function",
    difficulty: "Medium",
    xpReward: 70,
    description:
      "Write a function power(int base, int exp) that calculates base raised to exp. For base 2 and exp 6, print '2^6 = 64'.",
    objective: "Declare and call a modular helper function in C.",
    constraints: ["base = 2, exp = 6", "Output: 2^6 = 64"],
    starterCode: `#include <stdio.h>

int power(int base, int exp) {
    // Implement power calculation
    return 0;
}

int main(void) {
    int res = power(2, 6);
    printf("2^6 = %d\\n", res);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int power(int base, int exp) {
    int res = 1;
    for (int i = 0; i < exp; i++) {
        res *= base;
    }
    return res;
}

int main(void) {
    int res = power(2, 6);
    printf("2^6 = %d\\n", res);
    return 0;
}`,
    hints: [
      "Initialize res = 1.",
      "Multiply res by base exp times."
    ],
    sampleInput: "(no input)",
    sampleOutput: "2^6 = 64",
    explanation: "2 raised to power 6 is 64.",
    testCases: [
      {
        id: "prac-t3-4",
        name: "Power 2^6",
        input: "",
        expectedOutput: "2^6 = 64",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t3-p5",
    topicIndex: 2,
    topicTitle: "Functions, Arrays & Strings",
    title: "Sum of Array Elements",
    difficulty: "Easy",
    xpReward: 50,
    description:
      "Given the array [5, 10, 15, 20, 25], calculate the sum of all elements. Print 'Array Sum = 75'.",
    objective: "Accumulate values from an array.",
    constraints: ["Array: 5, 10, 15, 20, 25", "Output: Array Sum = 75"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {5, 10, 15, 20, 25};
    int sum = 0;
    
    // Sum elements
    // Print "Array Sum = 75"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {5, 10, 15, 20, 25};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("Array Sum = %d\\n", sum);
    return 0;
}`,
    hints: [
      "Iterate through arr[0] to arr[4].",
      "Add arr[i] to sum."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Array Sum = 75",
    explanation: "5 + 10 + 15 + 20 + 25 = 75.",
    testCases: [
      {
        id: "prac-t3-5",
        name: "Array Sum Test",
        input: "",
        expectedOutput: "Array Sum = 75",
        isHidden: false,
      },
    ],
  },

  // =========================================================================
  // TOPIC 4: Pointers & Memory Operations (5 Practice Challenges)
  // =========================================================================
  {
    id: "c-prac-t4-p1",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Array Sum Using Pointers",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Traverse and sum elements of array [10, 20, 30, 40] using a pointer. Print 'Pointer Sum = 100'.",
    objective: "Use pointer arithmetic and dereferencing *(ptr + i) to read array values.",
    constraints: ["Array: 10, 20, 30, 40", "Output: Pointer Sum = 100"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[4] = {10, 20, 30, 40};
    int *ptr = arr;
    int sum = 0;
    
    // Sum array using *ptr
    // Print "Pointer Sum = 100"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[4] = {10, 20, 30, 40};
    int *ptr = arr;
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += *(ptr + i);
    }
    printf("Pointer Sum = %d\\n", sum);
    return 0;
}`,
    hints: [
      "ptr points to the first element of arr.",
      "*(ptr + i) accesses the element at offset i."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Pointer Sum = 100",
    explanation: "Dereferencing *(ptr + i) visits each element: 10+20+30+40 = 100.",
    testCases: [
      {
        id: "prac-t4-1",
        name: "Pointer Array Sum",
        input: "",
        expectedOutput: "Pointer Sum = 100",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t4-p2",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Find Max Element via Pointer",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Find the maximum value in array [34, 12, 85, 45, 67] using pointer traversal. Print 'Maximum Value = 85'.",
    objective: "Compare memory contents using pointer dereferencing.",
    constraints: ["Array: 34, 12, 85, 45, 67", "Output: Maximum Value = 85"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {34, 12, 85, 45, 67};
    int *ptr = arr;
    int max = *ptr;
    
    // Find max using ptr
    // Print "Maximum Value = 85"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[5] = {34, 12, 85, 45, 67};
    int *ptr = arr;
    int max = *ptr;
    for (int i = 1; i < 5; i++) {
        if (*(ptr + i) > max) {
            max = *(ptr + i);
        }
    }
    printf("Maximum Value = %d\\n", max);
    return 0;
}`,
    hints: [
      "Initialize max = *ptr.",
      "Check if *(ptr + i) is greater than max in loop."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Maximum Value = 85",
    explanation: "85 is the highest value in the array.",
    testCases: [
      {
        id: "prac-t4-2",
        name: "Max via Pointer",
        input: "",
        expectedOutput: "Maximum Value = 85",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t4-p3",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Reverse String with Pointers",
    difficulty: "Hard",
    xpReward: 85,
    description:
      "Reverse the string 'learn' using two pointers (left and right). Print 'Reversed: nrael'.",
    objective: "Implement in-place two-pointer string reversal.",
    constraints: ["String: learn", "Output: Reversed: nrael"],
    starterCode: `#include <stdio.h>

int main(void) {
    char str[] = "learn";
    
    // Reverse str using pointers
    // Print "Reversed: nrael"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    char str[] = "learn";
    char *start = str;
    char *end = str + 4; // points to 'n'
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
    printf("Reversed: %s\\n", str);
    return 0;
}`,
    hints: [
      "start points to index 0, end points to index 4.",
      "Swap characters at *start and *end, then move pointers inward."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Reversed: nrael",
    explanation: "'learn' reversed yields 'nrael'.",
    testCases: [
      {
        id: "prac-t4-3",
        name: "String Reverse Pointers",
        input: "",
        expectedOutput: "Reversed: nrael",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t4-p4",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Element Count via Pointer",
    difficulty: "Medium",
    xpReward: 70,
    description:
      "Count the number of positive integers in array [10, 20, 30, 40, 50, -1] where -1 is the sentinel terminator. Print 'Element Count = 5'.",
    objective: "Use a pointer while loop with a sentinel value.",
    constraints: ["Terminator: -1", "Output: Element Count = 5"],
    starterCode: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50, -1};
    int *ptr = arr;
    int count = 0;
    
    // Count elements until -1 using ptr
    // Print "Element Count = 5"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50, -1};
    int *ptr = arr;
    int count = 0;
    while (*ptr != -1) {
        count++;
        ptr++;
    }
    printf("Element Count = %d\\n", count);
    return 0;
}`,
    hints: [
      "Check *ptr != -1.",
      "Increment count and advance ptr: ptr++."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Element Count = 5",
    explanation: "Five elements precede the sentinel value -1.",
    testCases: [
      {
        id: "prac-t4-4",
        name: "Sentinel Pointer Count",
        input: "",
        expectedOutput: "Element Count = 5",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t4-p5",
    topicIndex: 3,
    topicTitle: "Pointers & Memory Management",
    title: "Dynamic Allocation for Integers",
    difficulty: "Hard",
    xpReward: 90,
    description:
      "Simulate dynamic allocation of 3 integers: assign 100, 200, 300 to memory slots. Print 'Values: 100 200 300'.",
    objective: "Understand dynamic heap allocation and sequential pointer addressing.",
    constraints: ["Values: 100, 200, 300", "Output: Values: 100 200 300"],
    starterCode: `#include <stdio.h>

int main(void) {
    int data[3] = {100, 200, 300};
    int *p = data;
    
    // Print "Values: 100 200 300"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    int data[3] = {100, 200, 300};
    int *p = data;
    printf("Values: %d %d %d\\n", *(p + 0), *(p + 1), *(p + 2));
    return 0;
}`,
    hints: [
      "Access elements via *(p + 0), *(p + 1), and *(p + 2)."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Values: 100 200 300",
    explanation: "Values are stored at sequential memory addresses.",
    testCases: [
      {
        id: "prac-t4-5",
        name: "Heap Memory Simulation",
        input: "",
        expectedOutput: "Values: 100 200 300",
        isHidden: false,
      },
    ],
  },

  // =========================================================================
  // TOPIC 5: Structures & File Management (5 Practice Challenges)
  // =========================================================================
  {
    id: "c-prac-t5-p1",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Employee Payroll Structure",
    difficulty: "Medium",
    xpReward: 80,
    description:
      "Define a struct Employee with id = 101, name = 'John Doe', and salary = 45000. Print 'ID: 101, Name: John Doe, Salary: 45000'.",
    objective: "Define and initialize a C structure with member access.",
    constraints: ["ID: 101, John Doe, 45000", "Output format: ID: 101, Name: John Doe, Salary: 45000"],
    starterCode: `#include <stdio.h>

struct Employee {
    int id;
    char name[20];
    int salary;
};

int main(void) {
    // Initialize struct and print details
    // Print "ID: 101, Name: John Doe, Salary: 45000"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

struct Employee {
    int id;
    char name[20];
    int salary;
};

int main(void) {
    struct Employee emp = {101, "John Doe", 45000};
    printf("ID: %d, Name: %s, Salary: %d\\n", emp.id, emp.name, emp.salary);
    return 0;
}`,
    hints: [
      "Use structure initializer: struct Employee emp = {101, \"John Doe\", 45000};",
      "Access fields using dot operator: emp.id, emp.name, emp.salary."
    ],
    sampleInput: "(no input)",
    sampleOutput: "ID: 101, Name: John Doe, Salary: 45000",
    explanation: "Structures group multiple related fields under a single user-defined type.",
    testCases: [
      {
        id: "prac-t5-1",
        name: "Employee Record",
        input: "",
        expectedOutput: "ID: 101, Name: John Doe, Salary: 45000",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t5-p2",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Book Inventory System",
    difficulty: "Easy",
    xpReward: 60,
    description:
      "Define a struct Book with title = 'Clean Code' and price = 850. Print 'Book: Clean Code, Price: 850'.",
    objective: "Store and format record fields from a struct.",
    constraints: ["Title: Clean Code, Price: 850", "Output: Book: Clean Code, Price: 850"],
    starterCode: `#include <stdio.h>

struct Book {
    char title[30];
    int price;
};

int main(void) {
    // Initialize book
    // Print "Book: Clean Code, Price: 850"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

struct Book {
    char title[30];
    int price;
};

int main(void) {
    struct Book b = {"Clean Code", 850};
    printf("Book: %s, Price: %d\\n", b.title, b.price);
    return 0;
}`,
    hints: [
      "Initialize b with {\"Clean Code\", 850}.",
      "Print using %s and %d."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Book: Clean Code, Price: 850",
    explanation: "Structures simplify inventory tracking by pairing names with numerical metadata.",
    testCases: [
      {
        id: "prac-t5-2",
        name: "Book Record",
        input: "",
        expectedOutput: "Book: Clean Code, Price: 850",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t5-p3",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Student Grade Card",
    difficulty: "Medium",
    xpReward: 80,
    description:
      "Given student 'Alex' with marks [85, 90, 89], calculate average (88) and grade 'A'. Print 'Student: Alex, Average: 88, Grade: A'.",
    objective: "Process array data nested within a structure context.",
    constraints: ["Name: Alex, Average: 88, Grade: A", "Output: Student: Alex, Average: 88, Grade: A"],
    starterCode: `#include <stdio.h>

int main(void) {
    char name[] = "Alex";
    int marks[3] = {85, 90, 89};
    
    // Calculate average and print grade card
    // Print "Student: Alex, Average: 88, Grade: A"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    char name[] = "Alex";
    int marks[3] = {85, 90, 89};
    int avg = (marks[0] + marks[1] + marks[2]) / 3;
    char grade = 'A';
    printf("Student: %s, Average: %d, Grade: %c\\n", name, avg, grade);
    return 0;
}`,
    hints: [
      "Average is (85 + 90 + 89) / 3 = 88.",
      "Print grade with %c format specifier."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Student: Alex, Average: 88, Grade: A",
    explanation: "Student performance metrics formatted into a report card.",
    testCases: [
      {
        id: "prac-t5-3",
        name: "Grade Card Report",
        input: "",
        expectedOutput: "Student: Alex, Average: 88, Grade: A",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t5-p4",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Append Record to Log File",
    difficulty: "Medium",
    xpReward: 70,
    description:
      "Simulate appending a transaction log entry into system.log. Print 'Log entry written successfully'.",
    objective: "Understand file append mode ('a') semantics in standard I/O.",
    constraints: ["Output: Log entry written successfully"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Write log entry simulation
    // Print "Log entry written successfully"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    printf("Log entry written successfully\\n");
    return 0;
}`,
    hints: [
      "In standard C, fopen with 'a' mode appends without truncating existing content.",
      "Print the confirmation message."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Log entry written successfully",
    explanation: "Append mode enables streaming audit trails without overwriting past entries.",
    testCases: [
      {
        id: "prac-t5-4",
        name: "Log Append Test",
        input: "",
        expectedOutput: "Log entry written successfully",
        isHidden: false,
      },
    ],
  },
  {
    id: "c-prac-t5-p5",
    topicIndex: 4,
    topicTitle: "Structures & File Handling",
    title: "Read Config File Line",
    difficulty: "Medium",
    xpReward: 75,
    description:
      "Simulate reading an environment configuration setting 'PORT=3000' from a file stream. Print 'Config: PORT=3000'.",
    objective: "Format configuration key-value pairs read from file streams.",
    constraints: ["Output: Config: PORT=3000"],
    starterCode: `#include <stdio.h>

int main(void) {
    // Read and format config
    // Print "Config: PORT=3000"
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main(void) {
    printf("Config: PORT=3000\\n");
    return 0;
}`,
    hints: [
      "In production, fgets reads buffered configuration files until newline.",
      "Print formatted key-value pair."
    ],
    sampleInput: "(no input)",
    sampleOutput: "Config: PORT=3000",
    explanation: "Configuration parsers read environment overrides upon server boot.",
    testCases: [
      {
        id: "prac-t5-5",
        name: "Config Read Test",
        input: "",
        expectedOutput: "Config: PORT=3000",
        isHidden: false,
      },
    ],
  },
];

export function getPracticeChallengesForTopic(topicIndex: number): CodingChallenge[] {
  return C_PRACTICE_CHALLENGES.filter((c) => c.topicIndex === topicIndex);
}

export function getAllPracticeChallenges(): CodingChallenge[] {
  return C_PRACTICE_CHALLENGES;
}
