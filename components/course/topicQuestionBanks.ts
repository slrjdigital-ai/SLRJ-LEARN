import { QuizQuestionItem } from "./topicPracticeData";

/**
 * 20 Handcrafted, Deeply Technical Questions for each topic of C Programming
 */
export const C_PROGRAMMING_TOPIC_BANKS: Record<number, QuizQuestionItem[]> = {
  // Topic 1: Introduction, Variables & Data Types (20 Questions)
  0: [
    {
      id: "c-t1-q1",
      question: "Which phase of the C compilation pipeline replaces #include directives with actual header file contents?",
      options: ["Assembler", "Preprocessor", "Linker", "Machine Code Generator"],
      correctAnswer: 1,
      explanation: "The Preprocessor scans for all directives starting with '#' and textualizes header declarations before compilation.",
      hint: "It executes before the syntax analysis phase.",
    },
    {
      id: "c-t1-q2",
      question: "According to the ANSI/ISO C standard specification, what is the guaranteed size of sizeof(char)?",
      options: ["Platform dependent", "2 Bytes", "Exactly 1 Byte", "4 Bytes"],
      correctAnswer: 2,
      explanation: "ISO C defines sizeof(char) to be strictly 1 byte (which is CHAR_BIT bits, typically 8).",
      hint: "It represents a single ASCII character unit.",
    },
    {
      id: "c-t1-q3",
      question: "What is the standard return type of the main() function in ISO C?",
      options: ["void", "int", "size_t", "char *"],
      correctAnswer: 1,
      explanation: "Standard C dictates main() must return an 'int' representing the program termination exit code to the OS.",
      hint: "The return value communicates success (0) or error to the parent shell.",
    },
    {
      id: "c-t1-q4",
      question: "Which printf format specifier is specifically designed to print an 'unsigned long' integer?",
      options: ["%d", "%ld", "%lu", "%u"],
      correctAnswer: 2,
      explanation: "%lu denotes an unsigned long integer, while %ld is signed long and %u is unsigned int.",
      hint: "Look for 'l' for long and 'u' for unsigned.",
    },
    {
      id: "c-t1-q5",
      question: "In standard two's complement representation, what is the range of a signed 8-bit char?",
      options: ["0 to 255", "-128 to 127", "-127 to 128", "-256 to 255"],
      correctAnswer: 1,
      explanation: "Signed 8-bit integers use the most significant bit for the sign, giving -2^7 (-128) to 2^7 - 1 (127).",
      hint: "Negative 128 to positive 127.",
    },
    {
      id: "c-t1-q6",
      question: "Which keyword is used in C to prevent any subsequent modification of a variable's value after declaration?",
      options: ["static", "immutable", "const", "final"],
      correctAnswer: 2,
      explanation: "The 'const' type qualifier marks variables as read-only and triggers compiler errors if re-assigned.",
      hint: "Short for constant.",
    },
    {
      id: "c-t1-q7",
      question: "What is the default storage class for a local variable declared inside a function block in C?",
      options: ["extern", "auto", "register", "static"],
      correctAnswer: 1,
      explanation: "Local variables default to 'auto' (automatic storage duration), existing on the stack while in scope.",
      hint: "Automatic allocation and deallocation.",
    },
    {
      id: "c-t1-q8",
      question: "Which of the following is an invalid identifier in C?",
      options: ["_systemVar", "var_2_run", "2nd_counter", "MAX_BUFFER"],
      correctAnswer: 2,
      explanation: "C variable names must begin with a letter or an underscore (_), not a numeric digit.",
      hint: "Identifiers cannot start with a number.",
    },
    {
      id: "c-t1-q9",
      question: "In C numeric literals, what does the prefix '0x' or '0X' signify?",
      options: ["Octal constant", "Binary constant", "Hexadecimal constant", "Floating-point exponent"],
      correctAnswer: 2,
      explanation: "0x denotes base-16 (hexadecimal), whereas a leading '0' denotes base-8 (octal).",
      hint: "Base-16 radix.",
    },
    {
      id: "c-t1-q10",
      question: "What is the typical IEEE-754 memory footprint of a standard 'float' in C?",
      options: ["2 Bytes (16 bits)", "4 Bytes (32 bits)", "8 Bytes (64 bits)", "16 Bytes (128 bits)"],
      correctAnswer: 1,
      explanation: "Standard single-precision IEEE-754 floating point uses 32 bits (4 bytes): 1 sign bit, 8 exponent, 23 mantissa.",
      hint: "Single precision equals 4 bytes.",
    },
    {
      id: "c-t1-q11",
      question: "What happens when an arithmetic overflow occurs on a signed integer in standard C?",
      options: ["Wraps around modulo 2^32", "Throws a HardwareException", "Undefined behavior", "Sets value to INT_MAX"],
      correctAnswer: 2,
      explanation: "Signed integer overflow is undefined behavior in C. Unsigned overflow, by contrast, is guaranteed to wrap modulo 2^N.",
      hint: "ISO C does not define the outcome for signed overflow.",
    },
    {
      id: "c-t1-q12",
      question: "Which header file must be included to utilize the 'bool', 'true', and 'false' keywords in C99?",
      options: ["<boolean.h>", "<stdbool.h>", "<stdlib.h>", "<stddef.h>"],
      correctAnswer: 1,
      explanation: "<stdbool.h> defines bool, true (1), and false (0) as standardized macros in C99.",
      hint: "Starts with 'std' followed by 'bool'.",
    },
    {
      id: "c-t1-q13",
      question: "What exact data type does the 'sizeof' operator evaluate to in C?",
      options: ["unsigned int", "size_t", "long", "uintptr_t"],
      correctAnswer: 1,
      explanation: "sizeof returns size_t, an unsigned integral type defined in <stddef.h> large enough to contain the size of any object.",
      hint: "Defined in <stddef.h>.",
    },
    {
      id: "c-t1-q14",
      question: "Which escape sequence represents the null character used to terminate strings in C?",
      options: ["\\n", "\\0", "\\t", "\\e"],
      correctAnswer: 1,
      explanation: "'\\0' is ASCII code 0, marking the terminal boundary of strings in memory.",
      hint: "Backslash followed by digit zero.",
    },
    {
      id: "c-t1-q15",
      question: "What does the 'unsigned' modifier do when applied to an integer type?",
      options: ["Halves the storage footprint", "Eliminates negative numbers to double the positive range", "Forces floating-point rounding", "Stores numbers in big-endian order"],
      correctAnswer: 1,
      explanation: "Unsigned eliminates sign bit allocation, doubling the positive ceiling (e.g. 0 to 65535 for 16-bit).",
      hint: "All bits are used for magnitude.",
    },
    {
      id: "c-t1-q16",
      question: "In the GCC command 'gcc -Wall -Wextra main.c -o main', what is the purpose of the '-Wall' flag?",
      options: ["Write all debug logs to disk", "Enable all recommended compiler diagnostic warning messages", "Allocate all available RAM", "Optimize for maximum execution speed"],
      correctAnswer: 1,
      explanation: "-Wall enables all common compiler warnings, catching suspect syntax, uninitialized variables, and type mismatches.",
      hint: "'W' stands for Warnings.",
    },
    {
      id: "c-t1-q17",
      question: "What is the critical difference between #include <stdio.h> and #include \"my_header.h\"?",
      options: ["Angle brackets include binary libs; quotes include C source", "Angle brackets search system include paths; quotes search local directory first", "Quotes disable preprocessing", "No difference whatsoever"],
      correctAnswer: 1,
      explanation: "Quotes tell the preprocessor to look in the source directory first before checking system search paths.",
      hint: "Local project headers use double quotes.",
    },
    {
      id: "c-t1-q18",
      question: "Which C standard first introduced '//' single-line comments and flexible variable declarations?",
      options: ["K&R C (1978)", "ANSI C (C89/C90)", "C99", "C18"],
      correctAnswer: 2,
      explanation: "C99 introduced '//' line comments, inline declarations in 'for' loops, and <stdint.h>.",
      hint: "Published in 1999.",
    },
    {
      id: "c-t1-q19",
      question: "In the expression 'int a = 5; float b = 2.0; float c = a / b;', what happens during division?",
      options: ["Integer division yields 2.0", "Compiler error due to mismatched types", "'a' is implicitly promoted to float yielding 2.5", "Overflow occurs"],
      correctAnswer: 2,
      explanation: "Arithmetic promotion converts the lower-rank type (int) to the higher-rank type (float) before the operation.",
      hint: "Implicit type conversion to floating point.",
    },
    {
      id: "c-t1-q20",
      question: "What does the 'volatile' keyword signify to the C compiler when declaring a variable?",
      options: ["The variable can never change value", "The variable may be altered by external hardware or threads, preventing aggressive compiler caching", "The variable is stored on the GPU", "The variable must be initialized to 0"],
      correctAnswer: 1,
      explanation: "'volatile' warns the optimizer not to cache the variable in registers because its value can change asynchronously.",
      hint: "Common in embedded systems and memory-mapped hardware.",
    },
  ],

  // Topic 2: Operators, Conditions & Loops (20 Questions)
  1: [
    {
      id: "c-t2-q1",
      question: "In standard C conditional expressions, which value evaluates to logical false?",
      options: ["Any negative integer", "Exactly 0 (or NULL)", "-1", "Any non-zero float"],
      correctAnswer: 1,
      explanation: "In C, exactly 0 (and NULL pointer) evaluates to false. Any non-zero value evaluates to true.",
      hint: "Zero represents false.",
    },
    {
      id: "c-t2-q2",
      question: "What is the critical semantic difference between '=' and '==' in C?",
      options: ["'=' compares values; '==' copies variables", "'=' is the assignment operator; '==' is the relational equality operator", "Both are completely interchangeable", "'==' is only valid inside while loops"],
      correctAnswer: 1,
      explanation: "'=' assigns right operand to left; '==' tests whether operands have identical values.",
      hint: "A common bug is writing 'if (x = 5)' instead of 'if (x == 5)'.",
    },
    {
      id: "c-t2-q3",
      question: "What is the evaluated output of the integer division expression: 7 / 2?",
      options: ["3.5", "3", "4", "3.0"],
      correctAnswer: 1,
      explanation: "When both operands are integers, C truncates the fractional portion towards zero, yielding 3.",
      hint: "Integer division discards remainders.",
    },
    {
      id: "c-t2-q4",
      question: "What does the modulus operator '%' evaluate in the expression: 14 % 4?",
      options: ["3", "2", "3.5", "0"],
      correctAnswer: 1,
      explanation: "14 divided by 4 equals 3 with a remainder of 2. % returns the remainder.",
      hint: "Remainder calculation.",
    },
    {
      id: "c-t2-q5",
      question: "In a switch-case block, what occurs if a case matches but lacks a 'break' statement?",
      options: ["The program terminates with an error", "Execution continues directly into subsequent cases (fallthrough)", "The switch block repeats infinitely", "The compiler throws a fatal error"],
      correctAnswer: 1,
      explanation: "Without a break statement, execution falls through into subsequent cases regardless of their case labels.",
      hint: "Switch fallthrough.",
    },
    {
      id: "c-t2-q6",
      question: "Which loop construct is strictly guaranteed to execute its block at least once before testing its predicate?",
      options: ["for loop", "while loop", "do-while loop", "recursive loop"],
      correctAnswer: 2,
      explanation: "do-while tests its condition at the bottom of the loop body after the first execution.",
      hint: "Begins with the 'do' keyword.",
    },
    {
      id: "c-t2-q7",
      question: "What effect does the 'continue' statement have when encountered inside a loop body?",
      options: ["Exits the entire program", "Terminates the loop completely", "Skips the rest of the current iteration and advances to the next loop cycle", "Restarts the counter from 0"],
      correctAnswer: 2,
      explanation: "'continue' bypasses remaining statements in the current iteration and re-evaluates the loop condition or increment.",
      hint: "Advances to the next iteration.",
    },
    {
      id: "c-t2-q8",
      question: "How does logical short-circuit evaluation behave in the expression '(0 && my_function())'?",
      options: ["my_function() is executed first", "my_function() is never called because the left side is already false", "Both sides are always evaluated concurrently", "A runtime syntax error is raised"],
      correctAnswer: 1,
      explanation: "In '&&', if the left operand evaluates to 0 (false), the entire expression is false, so the right side is skipped.",
      hint: "Short-circuiting skips redundant operations.",
    },
    {
      id: "c-t2-q9",
      question: "Given: int x = 5; int y = ++x; What are the values of x and y respectively?",
      options: ["x = 5, y = 5", "x = 6, y = 6", "x = 6, y = 5", "x = 5, y = 6"],
      correctAnswer: 1,
      explanation: "Prefix increment (++x) increments x immediately to 6 and returns the new value (6).",
      hint: "Increment happens before assignment.",
    },
    {
      id: "c-t2-q10",
      question: "Given: int x = 5; int y = x++; What are the values of x and y respectively?",
      options: ["x = 6, y = 5", "x = 6, y = 6", "x = 5, y = 5", "x = 5, y = 6"],
      correctAnswer: 0,
      explanation: "Postfix increment (x++) evaluates to the current value (5) for assignment to y, then increments x to 6.",
      hint: "Original value is assigned before increment.",
    },
    {
      id: "c-t2-q11",
      question: "Which operator has the lowest precedence in C among arithmetic, logical, and assignment operators?",
      options: ["Addition (+)", "Logical AND (&&)", "Assignment (=)", "Equality (==)"],
      correctAnswer: 2,
      explanation: "Assignment operators (=, +=, etc.) have nearly the lowest precedence in the C operator hierarchy.",
      hint: "Evaluated last to store computed expressions.",
    },
    {
      id: "c-t2-q12",
      question: "What is the evaluated result of the bitwise AND operation: 5 & 3 (in binary: 0101 & 0011)?",
      options: ["1 (0001)", "7 (0111)", "2 (0010)", "0 (0000)"],
      correctAnswer: 0,
      explanation: "Bitwise AND produces a 1 bit only where both operands have 1s: 0101 & 0011 = 0001 (1).",
      hint: "Only bit 0 is set in both numbers.",
    },
    {
      id: "c-t2-q13",
      question: "What is the arithmetic effect of the bitwise left-shift operation: x << 1 for positive integers?",
      options: ["Divides x by 2", "Multiplies x by 2", "Adds 1 to x", "Calculates square root of x"],
      correctAnswer: 1,
      explanation: "Shifting left by 1 bit in binary shifts all digits to the next power of two, multiplying the value by 2.",
      hint: "Left shift multiplies by powers of two.",
    },
    {
      id: "c-t2-q14",
      question: "Which keyword immediately terminates an enclosing loop or switch block and transfers control to the next statement?",
      options: ["exit", "return", "break", "halt"],
      correctAnswer: 2,
      explanation: "'break' breaks out of the innermost while, for, do-while, or switch block.",
      hint: "Breaks out of the loop.",
    },
    {
      id: "c-t2-q15",
      question: "What is the proper syntax for the ternary conditional operator in C?",
      options: ["if (cond) expr1 else expr2", "cond ? expr1 : expr2", "expr1 when cond else expr2", "cond -> expr1 | expr2"],
      correctAnswer: 1,
      explanation: "The ternary operator uses 'condition ? expression_if_true : expression_if_false'.",
      hint: "Question mark and colon.",
    },
    {
      id: "c-t2-q16",
      question: "What is the result of the logical NOT expression: !5 in C?",
      options: ["-5", "0", "1", "true"],
      correctAnswer: 1,
      explanation: "Since 5 is a non-zero truthy integer, the logical NOT operator (!) inverts it to 0.",
      hint: "Inverting a truthy value yields 0.",
    },
    {
      id: "c-t2-q17",
      question: "What type of expression is legally required as the controlling expression in a C switch statement?",
      options: ["Any string literal", "Floating-point double", "Integer or enumeration type", "Struct pointer"],
      correctAnswer: 2,
      explanation: "C switch expressions must evaluate to an integral type (char, int, short, long, enum). Floats and strings are invalid.",
      hint: "Must evaluate to an integer or enum.",
    },
    {
      id: "c-t2-q18",
      question: "What is the outcome of the loop: for (int i = 0; i < 10; i--)?",
      options: ["Executes 10 times", "Does not execute", "Infinite loop due to continuous decrement", "Compiler syntax error"],
      correctAnswer: 2,
      explanation: "i decreases into negative values (0, -1, -2...), perpetually remaining < 10, resulting in an infinite loop.",
      hint: "i will never reach or exceed 10.",
    },
    {
      id: "c-t2-q19",
      question: "According to C operator precedence rules, how is 'a + b * c' evaluated?",
      options: ["(a + b) * c", "a + (b * c)", "Right-to-left strictly", "Undefined order"],
      correctAnswer: 1,
      explanation: "Multiplication (*) has higher precedence than addition (+), so b * c is calculated first.",
      hint: "Multiplication precedes addition.",
    },
    {
      id: "c-t2-q20",
      question: "What is the result of the bitwise XOR operation of any integer x with itself: (x ^ x)?",
      options: ["x", "1", "0", "-1"],
      correctAnswer: 2,
      explanation: "Bitwise XOR produces 1 only when bits differ. Any number XORed with itself results in all zeros (0).",
      hint: "Identical bits yield 0.",
    },
  ],

  // Topic 3: Functions, Arrays & Strings (20 Questions)
  2: [
    {
      id: "c-t3-q1",
      question: "What happens when an array name without brackets is passed to a function in C?",
      options: ["The full array is duplicated onto the stack", "It decays into a pointer to its first element (&arr[0])", "A compilation error occurs", "It converts into a linked list"],
      correctAnswer: 1,
      explanation: "In C, arrays decay into pointers to their first element when passed as function arguments.",
      hint: "Pointer decay principle.",
    },
    {
      id: "c-t3-q2",
      question: "In C, what character must terminate a valid character array string in memory?",
      options: ["'\\n'", "'\\0' (ASCII 0)", "'EOF'", "'.'"],
      correctAnswer: 1,
      explanation: "C strings are null-terminated character sequences ending with '\\0'.",
      hint: "The null byte.",
    },
    {
      id: "c-t3-q3",
      question: "Where are local non-static variables stored during a function invocation in C?",
      options: ["On the heap", "In CPU microcode", "On the call stack (stack frame)", "In the read-only text segment"],
      correctAnswer: 2,
      explanation: "Function local variables are pushed onto the call stack within the active stack frame and popped upon return.",
      hint: "The call stack.",
    },
    {
      id: "c-t3-q4",
      question: "What is a function prototype in C?",
      options: ["The compiled binary of a function", "A forward declaration specifying the return type, name, and parameter types", "A macro template", "The main entry point"],
      correctAnswer: 1,
      explanation: "A prototype informs the compiler about the function's signature before its actual implementation.",
      hint: "Enables safe forward referencing.",
    },
    {
      id: "c-t3-q5",
      question: "Which standard header file declares string utility functions such as strlen, strcpy, and strcmp?",
      options: ["<strings.h>", "<string.h>", "<stdlib.h>", "<stdio.h>"],
      correctAnswer: 1,
      explanation: "<string.h> contains the standard ANSI C string manipulation library.",
      hint: "Singular 'string.h'.",
    },
    {
      id: "c-t3-q6",
      question: "What is the asymptotic time complexity of the standard strlen(str) function?",
      options: ["O(1) because size is cached in a header", "O(n) where n is the length until '\\0'", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "C strings do not store length metadata; strlen iterates sequentially through memory until it encounters '\\0'.",
      hint: "Linear scan.",
    },
    {
      id: "c-t3-q7",
      question: "Why was the 'gets()' function deprecated in C99 and completely removed from the ISO C11 standard?",
      options: ["It was too slow compared to scanf", "It lacks buffer boundary checks, causing catastrophic buffer overflow vulnerabilities", "It only supported 7-bit ASCII", "It required root privileges"],
      correctAnswer: 1,
      explanation: "gets() reads input without bounds checking, allowing users to overflow buffers and hijack execution flow.",
      hint: "Buffer overflow security risk.",
    },
    {
      id: "c-t3-q8",
      question: "What is the recommended safe replacement for reading string lines with buffer bounds in C?",
      options: ["get_string()", "fgets()", "read_line()", "scan_s()"],
      correctAnswer: 1,
      explanation: "fgets(buffer, size, stdin) enforces an explicit maximum character limit, preventing overflows.",
      hint: "File gets with size limit.",
    },
    {
      id: "c-t3-q9",
      question: "How are multi-dimensional arrays (like 'int matrix[3][4]') ordered in contiguous memory in C?",
      options: ["Column-major order", "Row-major order", "Diagonal-major order", "Fragmented hashed order"],
      correctAnswer: 1,
      explanation: "C stores multi-dimensional arrays in row-major order: all elements of row 0, then row 1, etc.",
      hint: "Row by row.",
    },
    {
      id: "c-t3-q10",
      question: "What does the function 'strcmp(str1, str2)' return when both strings are identical in content?",
      options: ["1", "-1", "0", "true"],
      correctAnswer: 2,
      explanation: "strcmp returns 0 if both strings match, a negative value if str1 < str2, and positive if str1 > str2.",
      hint: "Zero indicates zero difference.",
    },
    {
      id: "c-t3-q11",
      question: "What is the programming technique where a function calls itself to solve smaller subproblems?",
      options: ["Inheritance", "Recursion", "Polymorphism", "Reflection"],
      correctAnswer: 1,
      explanation: "Recursion occurs when a function invokes itself with a base condition to terminate the call chain.",
      hint: "Self-referential function execution.",
    },
    {
      id: "c-t3-q12",
      question: "What catastrophic error occurs if a recursive function fails to hit a valid base termination condition?",
      options: ["Memory Leak on Heap", "Stack Overflow", "Bus Error", "Arithmetic Underflow"],
      correctAnswer: 1,
      explanation: "Each call pushes a new stack frame; without termination, stack memory is exhausted causing a Stack Overflow.",
      hint: "Exhausts the call stack.",
    },
    {
      id: "c-t3-q13",
      question: "What is the zero-based index of the first element in any C array?",
      options: ["0", "1", "-1", "Depends on array bounds"],
      correctAnswer: 0,
      explanation: "All C arrays use zero-based indexing, where arr[0] points directly to the base address offset + 0.",
      hint: "Zero offset.",
    },
    {
      id: "c-t3-q14",
      question: "What happens if code attempts to read or write beyond an array's boundary (e.g. arr[10] on int arr[5])?",
      options: ["Throws an ArrayIndexOutOfBoundsException", "Undefined behavior (may corrupt memory or cause segmentation fault)", "Silently expands the array", "Wraps around to arr[0]"],
      correctAnswer: 1,
      explanation: "C does not perform runtime bounds checking; out-of-bounds access is undefined behavior.",
      hint: "Undefined behavior with potential crash.",
    },
    {
      id: "c-t3-q15",
      question: "What does the 'static' keyword do when placed before a global function declaration in a C source file?",
      options: ["Caches return values in memory", "Restricts the function's scope to its translation unit (.c file)", "Prevents recursion", "Enables thread-safety"],
      correctAnswer: 1,
      explanation: "Static global functions have internal linkage and cannot be called or linked from outside that file.",
      hint: "Internal linkage.",
    },
    {
      id: "c-t3-q16",
      question: "Can a function in C safely return the address of a local automatic stack array?",
      options: ["Yes, modern GCC copies it automatically", "No, because local stack frames are destroyed on return, creating dangling pointers", "Yes, if declared with const", "Only on 64-bit platforms"],
      correctAnswer: 1,
      explanation: "Local variables are deallocated when their function returns. Returning their address creates undefined dangling pointers.",
      hint: "Stack variables do not outlive function returns.",
    },
    {
      id: "c-t3-q17",
      question: "What does the macro 'sizeof(arr) / sizeof(arr[0])' evaluate to for a stack-allocated array?",
      options: ["The total size in bytes", "The total count of elements in the array", "The size of each element", "The pointer address"],
      correctAnswer: 1,
      explanation: "Dividing total array bytes by the size of one element yields the number of items.",
      hint: "Element count calculation.",
    },
    {
      id: "c-t3-q18",
      question: "What is the critical precondition for safely calling 'strcpy(dest, src)'?",
      options: ["dest must be larger than 1024 bytes", "dest must point to allocated memory with capacity >= strlen(src) + 1", "src must be const", "dest must be allocated on the heap"],
      correctAnswer: 1,
      explanation: "dest must have enough room to store all characters of src plus the terminating '\\0'.",
      hint: "Must accommodate characters plus null terminator.",
    },
    {
      id: "c-t3-q19",
      question: "What is the memory difference between 'char a[] = \"hi\";' and 'char *b = \"hi\";'?",
      options: ["No difference", "'a' is a mutable array on the stack; 'b' points to a string literal in read-only memory", "'b' is allocated on the heap", "'a' is slower to access"],
      correctAnswer: 1,
      explanation: "Modifying elements in 'a' is valid; attempting to mutate '*b' causes a segmentation fault on read-only memory.",
      hint: "String literals are stored in read-only text segment.",
    },
    {
      id: "c-t3-q20",
      question: "What header file provides the macros 'va_start', 'va_arg', and 'va_end' for variadic functions in C?",
      options: ["<stdarg.h>", "<stdlib.h>", "<varargs.h>", "<stdio.h>"],
      correctAnswer: 0,
      explanation: "<stdarg.h> enables functions to handle an arbitrary number of parameters (like printf).",
      hint: "Standard arguments header.",
    },
  ],

  // Topic 4: Pointers & Dynamic Memory (20 Questions)
  3: [
    {
      id: "c-t4-q1",
      question: "What does the address-of operator '&' return when applied to a variable 'x'?",
      options: ["The value inside x", "The memory address where x is stored", "The data type size of x", "The bitwise inverse of x"],
      correctAnswer: 1,
      explanation: "& extracts the physical memory address (pointer) of the specified variable.",
      hint: "Address-of operator.",
    },
    {
      id: "c-t4-q2",
      question: "What does the dereference operator '*' do when applied to a valid pointer variable '*ptr'?",
      options: ["Multiplies the address by 2", "Accesses or mutates the value located at that address", "Frees the memory", "Checks if pointer is NULL"],
      correctAnswer: 1,
      explanation: "Dereferencing reads from or writes to the memory cell pointed to by the address.",
      hint: "Follows the address to its value.",
    },
    {
      id: "c-t4-q3",
      question: "Which C standard library function allocates raw uninitialized memory on the heap?",
      options: ["calloc()", "malloc()", "realloc()", "heap_alloc()"],
      correctAnswer: 1,
      explanation: "malloc(size) reserves the requested byte count on the heap without zeroing memory.",
      hint: "Memory allocate.",
    },
    {
      id: "c-t4-q4",
      question: "What is the key difference between calloc(n, size) and malloc(n * size)?",
      options: ["calloc allocates on stack; malloc on heap", "calloc initializes all allocated bytes to zero (0)", "malloc is thread-safe; calloc is not", "calloc cannot fail"],
      correctAnswer: 1,
      explanation: "calloc clears and zeroes the allocated buffer, whereas malloc leaves existing garbage values.",
      hint: "Clean allocation with zero initialization.",
    },
    {
      id: "c-t4-q5",
      question: "What does 'realloc(ptr, new_size)' do if the existing memory block cannot be expanded in place?",
      options: ["Crashes the application", "Allocates a new block elsewhere, copies existing data, frees old block, and returns new pointer", "Truncates the data", "Throws a MemoryException"],
      correctAnswer: 1,
      explanation: "realloc will allocate a fresh block elsewhere, copy over existing bytes, free old memory, and return the new address.",
      hint: "Relocates and preserves data.",
    },
    {
      id: "c-t4-q6",
      question: "What software defect occurs when heap memory is allocated with malloc() but never released with free()?",
      options: ["Segmentation Fault", "Memory Leak", "Stack Corruption", "Buffer Underflow"],
      correctAnswer: 1,
      explanation: "Unreleased heap memory remains reserved, steadily increasing the process memory footprint (a memory leak).",
      hint: "Reserved memory leaked over time.",
    },
    {
      id: "c-t4-q7",
      question: "What is a 'dangling pointer' in C?",
      options: ["A pointer initialized to NULL", "A pointer that points to deallocated memory that has already been freed", "A pointer that points to main()", "A pointer with double indirection"],
      correctAnswer: 1,
      explanation: "After free(ptr), the pointer still holds the old address. Accessing it causes unpredictable undefined behavior.",
      hint: "Points to released memory.",
    },
    {
      id: "c-t4-q8",
      question: "What is the standard representation of 'NULL' in modern C standard library headers?",
      options: ["-1", "((void *)0)", "9999", "Undefined"],
      correctAnswer: 1,
      explanation: "NULL is defined as an integer constant expression with value 0, often cast to ((void *)0).",
      hint: "Null pointer constant with address zero.",
    },
    {
      id: "c-t4-q9",
      question: "What typically occurs when an application attempts to dereference a NULL pointer (*ptr where ptr == NULL)?",
      options: ["The operation returns 0", "The OS sends SIGSEGV (Segmentation Fault) terminating the process", "The pointer auto-initializes to 1", "The compiler fixes it at compile time"],
      correctAnswer: 1,
      explanation: "Page 0 is protected by modern operating systems; reading address 0 generates a hardware fault (SIGSEGV).",
      hint: "Crash due to segmentation fault.",
    },
    {
      id: "c-t4-q10",
      question: "If 'int *p' points to address 0x1000 and sizeof(int) is 4 bytes, what address does 'p + 2' point to?",
      options: ["0x1002", "0x1004", "0x1008", "0x1016"],
      correctAnswer: 2,
      explanation: "Pointer arithmetic scales offsets by the element size: 0x1000 + (2 * 4) = 0x1008.",
      hint: "Scaled by sizeof(int).",
    },
    {
      id: "c-t4-q11",
      question: "What is a 'void *' pointer in C?",
      options: ["A pointer that points to nothing and cannot be assigned", "A generic untyped pointer capable of holding the address of any object", "A pointer allocated on GPU", "A function pointer return type only"],
      correctAnswer: 1,
      explanation: "void * is a universal pointer that can be converted to and from any object pointer without explicit casting.",
      hint: "Generic pointer type.",
    },
    {
      id: "c-t4-q12",
      question: "Why does standard ISO C forbid direct pointer arithmetic (e.g. ptr++) on a 'void *' pointer?",
      options: ["It lacks hardware support", "The size of 'void' is incomplete/unknown, making the stride byte count indeterminate", "It requires root permissions", "Only doubles support arithmetic"],
      correctAnswer: 1,
      explanation: "Because sizeof(void) is not defined in standard C, the compiler cannot know how many bytes to advance.",
      hint: "Unknown stride size.",
    },
    {
      id: "c-t4-q13",
      question: "What does a double pointer ('int **pp') store in memory?",
      options: ["A 64-bit float", "The memory address of another pointer variable", "An array of 2 integers", "A pointer with double precision"],
      correctAnswer: 1,
      explanation: "Double pointers hold the address of a pointer variable, commonly used to mutate pointer arguments in functions.",
      hint: "Pointer to a pointer.",
    },
    {
      id: "c-t4-q14",
      question: "What defensive programming practice should you apply immediately after calling 'free(ptr)'?",
      options: ["malloc(ptr)", "ptr = NULL;", "realloc(ptr, 0)", "sizeof(ptr)"],
      correctAnswer: 1,
      explanation: "Setting ptr = NULL ensures that any subsequent accidental dereference will fail predictably rather than corrupting memory.",
      hint: "Neutralize dangling pointers with NULL.",
    },
    {
      id: "c-t4-q15",
      question: "What value does malloc() return if the operating system cannot satisfy the requested allocation?",
      options: ["0xFFFFFFFF", "-1", "NULL", "Throws OutOfMemoryException"],
      correctAnswer: 2,
      explanation: "malloc returns NULL on failure; production code must always check 'if (ptr == NULL)' before using allocated memory.",
      hint: "Returns NULL on exhaustion.",
    },
    {
      id: "c-t4-q16",
      question: "Where in a compiled program's virtual memory map does malloc() allocate buffers?",
      options: ["The Call Stack", "The Heap segment", "The Text (Code) segment", "The BSS uninitialized global segment"],
      correctAnswer: 1,
      explanation: "Dynamic memory is managed in the Heap segment, growing upwards towards stack addresses.",
      hint: "Heap memory space.",
    },
    {
      id: "c-t4-q17",
      question: "What failure occurs when calling 'free(ptr)' twice on the same memory block (double free)?",
      options: ["Harmlessly ignored", "Undefined behavior, heap corruption, and severe security vulnerability", "Reclaims double the memory", "Resets the pointer"],
      correctAnswer: 1,
      explanation: "Double free corrupts heap allocator metadata tables, often causing crashes or allowing arbitrary code execution.",
      hint: "Heap corruption vulnerability.",
    },
    {
      id: "c-t4-q18",
      question: "What is pointer decay in C?",
      options: ["Gradual loss of memory address bits", "The implicit conversion of an array type to a pointer to its first element in expressions", "A dangling pointer expiring after timeout", "Defragmentation of heap"],
      correctAnswer: 1,
      explanation: "Array identifiers in most expressions implicitly decay into pointer values (&arr[0]).",
      hint: "Array to pointer conversion.",
    },
    {
      id: "c-t4-q19",
      question: "Which of the following correctly declares a pointer to a function taking two ints and returning void?",
      options: ["void *fn(int, int);", "void (*fn)(int, int);", "(*void) fn(int, int);", "void fn*(int, int);"],
      correctAnswer: 1,
      explanation: "Parentheses around (*fn) are required; without them, 'void *fn(int, int)' declares a function returning a void pointer.",
      hint: "Parentheses bind asterisk to function name.",
    },
    {
      id: "c-t4-q20",
      question: "What does subtracting two pointers into the same array ('ptr2 - ptr1') evaluate to?",
      options: ["The byte difference", "The number of array elements between them (type ptrdiff_t)", "A null pointer", "A bitwise XOR value"],
      correctAnswer: 1,
      explanation: "Pointer subtraction divides the byte distance by sizeof(*ptr), yielding the count of elements as type ptrdiff_t.",
      hint: "Count of elements, not raw bytes.",
    },
  ],

  // Topic 5: Structures, File Handling & Capstone Projects (20 Questions)
  4: [
    {
      id: "c-t5-q1",
      question: "Which keyword in C is used to aggregate variables of different data types into a unified composite record?",
      options: ["class", "struct", "record", "object"],
      correctAnswer: 1,
      explanation: "'struct' declares composite types containing heterogeneous members stored together in memory.",
      hint: "Structure keyword.",
    },
    {
      id: "c-t5-q2",
      question: "Which operator is used to access members of a structure through a pointer (e.g. ptr->member)?",
      options: [". (dot)", "-> (arrow)", ":: (scope)", "@ (at)"],
      correctAnswer: 1,
      explanation: "The arrow operator '->' dereferences the struct pointer and selects the member in one syntactic step.",
      hint: "Hyphen and greater-than sign.",
    },
    {
      id: "c-t5-q3",
      question: "What does the 'typedef' keyword accomplish in C struct declarations?",
      options: ["Dynamically allocates memory on heap", "Creates a type alias, allowing variables to be declared without writing 'struct' every time", "Marks the struct as immutable", "Enables OOP inheritance"],
      correctAnswer: 1,
      explanation: "'typedef struct { ... } Point;' allows declaring variables simply as 'Point p;' instead of 'struct Point p;'.",
      hint: "Type definition alias.",
    },
    {
      id: "c-t5-q4",
      question: "How does a 'union' differ fundamentally from a 'struct' in memory allocation?",
      options: ["A union allocates memory on the stack while struct is heap", "All members in a union share the exact same memory space, sized to its largest member", "Unions cannot contain primitives", "Unions are compiled to assembly directly"],
      correctAnswer: 1,
      explanation: "Unlike structs where members are placed sequentially, all union members overlap at offset 0 of the memory block.",
      hint: "Shared overlapping memory.",
    },
    {
      id: "c-t5-q5",
      question: "Which C standard library function is used to open a file stream and acquire a FILE pointer?",
      options: ["file_open()", "fopen()", "open_stream()", "fs_open()"],
      correctAnswer: 1,
      explanation: "fopen(path, mode) opens a file and returns a pointer to a FILE descriptor struct.",
      hint: "File open function.",
    },
    {
      id: "c-t5-q6",
      question: "Which file mode string opens a file for writing, truncating it to zero length or creating it if it doesn't exist?",
      options: ["\"r\"", "\"a\"", "\"w\"", "\"w+\""],
      correctAnswer: 2,
      explanation: "\"w\" opens for writing, immediately truncating any existing content or creating a new file.",
      hint: "Write mode.",
    },
    {
      id: "c-t5-q7",
      question: "What value does fopen() return if the requested file cannot be found or opened due to permissions?",
      options: ["-1", "0", "NULL", "EOF"],
      correctAnswer: 2,
      explanation: "fopen returns NULL on failure; safe code must verify 'if (fp == NULL)' before attempting I/O.",
      hint: "NULL file pointer.",
    },
    {
      id: "c-t5-q8",
      question: "Which function must be called when finished with a file stream to flush buffered data and release OS descriptors?",
      options: ["fclose()", "close_file()", "ffree()", "destruct()"],
      correctAnswer: 0,
      explanation: "fclose(fp) flushes internal write buffers, closes file handles, and releases FILE structures.",
      hint: "File close function.",
    },
    {
      id: "c-t5-q9",
      question: "Which function reads formatted input from an open file stream according to conversion specifiers?",
      options: ["scanf()", "fscanf()", "fread_formatted()", "fget_spec()"],
      correctAnswer: 1,
      explanation: "fscanf(fp, format, ...) reads formatted data from the specified stream rather than standard input.",
      hint: "File scanf.",
    },
    {
      id: "c-t5-q10",
      question: "Which function writes formatted text strings to an open file stream in C?",
      options: ["printf()", "fprintf()", "fwrite_string()", "fputs_fmt()"],
      correctAnswer: 1,
      explanation: "fprintf(fp, format, ...) writes formatted text directly to the file stream.",
      hint: "File printf.",
    },
    {
      id: "c-t5-q11",
      question: "Which functions are used for raw binary reading and writing of blocks (such as entire structs) to disk?",
      options: ["fgetc and fputc", "fread and fwrite", "read_bin and write_bin", "binary_in and binary_out"],
      correctAnswer: 1,
      explanation: "fread and fwrite read/write raw memory buffers without formatting, ideal for binary data and struct persistence.",
      hint: "Fast block binary I/O.",
    },
    {
      id: "c-t5-q12",
      question: "What does the call 'fseek(fp, 0, SEEK_END)' accomplish on an open file stream?",
      options: ["Rewinds to the beginning of the file", "Moves the file position indicator to the exact end of the file", "Deletes all file contents", "Checks if the file is readable"],
      correctAnswer: 1,
      explanation: "fseek with SEEK_END positions the indicator at the end of the file, commonly used with ftell() to measure file size.",
      hint: "Seeks to the end.",
    },
    {
      id: "c-t5-q13",
      question: "Which function returns the current byte offset of the file position indicator from the start of the file?",
      options: ["ftell()", "fpos()", "fsize()", "findex()"],
      correctAnswer: 0,
      explanation: "ftell(fp) returns the current offset in bytes as a long integer.",
      hint: "Tells the current position.",
    },
    {
      id: "c-t5-q14",
      question: "What is structure padding / alignment in C compilers?",
      options: ["Adding spaces to string members", "Unused padding bytes inserted between struct members to align addresses on natural CPU boundaries", "Encrypting sensitive struct fields", "Allocating structs in contiguous pages"],
      correctAnswer: 1,
      explanation: "CPUs access memory faster when 4-byte and 8-byte types start at aligned addresses; compilers insert padding bytes to enforce this.",
      hint: "Memory alignment for CPU performance.",
    },
    {
      id: "c-t5-q15",
      question: "What condition does the 'feof(fp)' function check on a file stream?",
      options: ["Whether the file exists on the hard drive", "Whether an end-of-file indicator has been triggered by a previous read operation", "Whether file write permissions are active", "Whether the file is currently empty"],
      correctAnswer: 1,
      explanation: "feof returns non-zero only after a read attempt has encountered the end-of-file indicator.",
      hint: "Tests EOF condition.",
    },
    {
      id: "c-t5-q16",
      question: "Which three standard I/O streams are opened automatically by the C runtime environment when a program begins?",
      options: ["input, output, logs", "stdin, stdout, stderr", "cin, cout, cerr", "dev_in, dev_out, dev_err"],
      correctAnswer: 1,
      explanation: "stdin (0), stdout (1), and stderr (2) are the standard POSIX and ISO C I/O streams.",
      hint: "Standard in, out, and error.",
    },
    {
      id: "c-t5-q17",
      question: "How do you declare a self-referential struct member (such as for a Linked List node) in C?",
      options: ["Node next;", "struct Node *next;", "self *next;", "void *next only"],
      correctAnswer: 1,
      explanation: "A struct cannot contain an instance of itself (infinite size), but can hold a pointer to another instance ('struct Node *next;').",
      hint: "Must be a pointer to the struct type.",
    },
    {
      id: "c-t5-q18",
      question: "What does the function 'fflush(fp)' do when called on an output file stream?",
      options: ["Clears the hard drive cache", "Forces any unwritten buffered data in memory to be flushed immediately to disk", "Closes the stream", "Deletes temporary files"],
      correctAnswer: 1,
      explanation: "fflush forces buffered output writes to complete without waiting for the buffer to fill.",
      hint: "Flushes buffer to disk.",
    },
    {
      id: "c-t5-q19",
      question: "How are command-line arguments accepted in the standard 'int main(int argc, char *argv[])' signature?",
      options: ["argc is character count; argv is a string", "argc is argument count; argv is an array of null-terminated argument strings", "argv contains environment variables only", "argc is the exit code"],
      correctAnswer: 1,
      explanation: "argc is the total number of arguments passed via shell; argv is an array of char pointers pointing to each argument string.",
      hint: "Argument count and argument vector.",
    },
    {
      id: "c-t5-q20",
      question: "In command-line programs, what is argv[0] conventionally guaranteed to contain?",
      options: ["The first user flag passed", "The program invocation name or file path", "The system username", "A NULL pointer"],
      correctAnswer: 1,
      explanation: "argv[0] holds the command or executable path used by the shell to invoke the program.",
      hint: "Program name.",
    },
  ],
};

/**
 * Intelligent topic question generator that guarantees 20 high-quality questions
 * for ANY module of ANY course!
 */
export function generateTwentyQuestionsForTopic(
  topicTitle: string,
  moduleIndex: number,
  courseCategory: string,
  courseTitle: string,
  existingQuestions: QuizQuestionItem[]
): QuizQuestionItem[] {
  const result: QuizQuestionItem[] = [...existingQuestions];

  // If already at 20+, slice to 20
  if (result.length >= 20) {
    return result.slice(0, 20);
  }

  // Question templates designed for software engineering & programming curriculum
  const conceptualTemplates = [
    {
      q: (t: string) => `What is the primary architectural purpose of mastering '${t}' in ${courseTitle}?`,
      opts: [
        `It establishes foundational structural integrity, correct syntax, and predictable state management.`,
        `It eliminates the need for unit tests and compiler warnings.`,
        `It bypasses underlying hardware instructions to simulate code.`,
        `It is strictly legacy and has no real-world production utility.`
      ],
      correct: 0,
      exp: `${topicTitle} provides the essential building blocks required to build reliable, high-performance software.`
    },
    {
      q: (t: string) => `Which common pitfall or anti-pattern should engineers avoid when implementing '${t}'?`,
      opts: [
        `Using descriptive identifier names and consistent formatting.`,
        `Failing to validate inputs, ignore edge cases, or neglecting memory bounds.`,
        `Adding detailed comments and comprehensive error handling.`,
        `Employing modular separation of concerns.`
      ],
      correct: 1,
      exp: `Neglecting boundary conditions and input validation is the leading source of security vulnerabilities and runtime crashes.`
    },
    {
      q: (t: string) => `How does '${t}' optimize runtime performance and resource management?`,
      opts: [
        `By avoiding unnecessary allocations and using efficient CPU/memory access patterns.`,
        `By disabling all compiler optimizations.`,
        `By running an infinite loop to prevent thread suspension.`,
        `By allocating maximum memory at boot time.`
      ],
      correct: 0,
      exp: `Clean execution patterns and minimal redundant overhead ensure systems run efficiently with predictable resource usage.`
    },
    {
      q: (t: string) => `When debugging issues related to '${t}', which diagnostic technique is most effective?`,
      opts: [
        `Deleting code randomly until the error stops appearing.`,
        `Using interactive debuggers, memory sanitizers, and inspecting stack traces.`,
        `Ignoring compiler warnings and disabling runtime checks.`,
        `Restarting the workstation without checking logs.`
      ],
      correct: 1,
      exp: `Systematic debugging with breakpoints, memory profiling, and compiler diagnostics locates root causes rapidly.`
    },
    {
      q: (t: string) => `What is the relationship between '${t}' and industry-standard clean code principles?`,
      opts: [
        `Clean code requires keeping all logic in a single massive file.`,
        `It promotes single responsibility, readability, defensive programming, and maintainability.`,
        `Clean code principles only apply to documentation, not implementation.`,
        `It forbids the use of data structures.`
      ],
      correct: 1,
      exp: `Readable, modular architecture allows engineering teams to scale, review, and maintain production codebases safely.`
    },
    {
      q: (t: string) => `In high-concurrency or mission-critical systems, why is rigorous understanding of '${t}' required?`,
      opts: [
        `To prevent race conditions, undefined state, and memory safety violations.`,
        `Because concurrency guarantees single-threaded execution.`,
        `To ensure code only runs during daytime hours.`,
        `It is not relevant to high-performance systems.`
      ],
      correct: 0,
      exp: `Mission-critical environments demand deterministic state transitions and robust error boundaries.`
    },
    {
      q: (t: string) => `How does compiler optimization interact with '${t}' during production builds?`,
      opts: [
        `Optimizers inline functions, eliminate dead code, and vectorize loops without altering semantics.`,
        `Optimizers rewrite logic to run backwards.`,
        `Optimizers disable memory allocation completely.`,
        `Optimizers increase binary size with random bytes.`
      ],
      correct: 0,
      exp: `Modern optimizing compilers analyze predictable control flow to transform source code into optimal machine instructions.`
    },
    {
      q: (t: string) => `What role does automated testing play when refactoring code in '${t}'?`,
      opts: [
        `It guarantees that existing behavior is preserved and regressions are immediately detected.`,
        `It slows down delivery with zero measurable benefit.`,
        `Tests replace the compiler completely.`,
        `Automated tests are only used for marketing websites.`
      ],
      correct: 0,
      exp: `Comprehensive regression test suites give developers confidence when optimizing or refactoring complex algorithms.`
    },
    {
      q: (t: string) => `Which standard metric best indicates successful mastery of '${t}'?`,
      opts: [
        `Lines of code written per hour regardless of quality.`,
        `The ability to write secure, bug-free, well-documented, and performant implementations.`,
        `Memorizing every compiler flag without writing code.`,
        `Refusing to use standard libraries.`
      ],
      correct: 1,
      exp: `Mastery is demonstrated through clean design, idiomatic language patterns, and resilient error handling.`
    },
    {
      q: (t: string) => `What is the consequence of violating type constraints or memory models in '${t}'?`,
      opts: [
        `Undefined behavior, memory corruption, segmentation faults, or silent data inaccuracies.`,
        `Instant conversion to Python syntax.`,
        `Automatic cloud backup.`,
        `Zero impact on compiled binaries.`
      ],
      correct: 0,
      exp: `Type safety violations corrupt state and generate unpredictable defects across execution environments.`
    },
  ];

  let templateIdx = 0;
  while (result.length < 20) {
    const tmpl = conceptualTemplates[templateIdx % conceptualTemplates.length];
    const qId = `gen-${moduleIndex}-q${result.length + 1}`;
    const questionText = tmpl.q(topicTitle);

    // Prevent duplicate questions
    if (!result.some((r) => r.question === questionText)) {
      result.push({
        id: qId,
        question: questionText,
        options: tmpl.opts,
        correctAnswer: tmpl.correct,
        explanation: tmpl.exp,
        hint: `Focus on best engineering practices and robust system architecture for ${topicTitle}.`,
      });
    }
    templateIdx++;
  }

  return result.slice(0, 20);
}
