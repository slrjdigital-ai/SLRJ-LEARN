import { docNotesStyle } from "./notes-style";

export const jsBasicsHtml = `
<div class="doc-notes-container">
${docNotesStyle}
<div class="book">
<section class="page cover">
  <h1>JavaScript Basics</h1>
  <p>Learn JavaScript from variables and functions through DOM, events, arrays, objects and async programming.</p>
  <p><span class="tag">Detailed Learning Notes • Diagrams • Examples • Practice</span></p>
</section>

<section class="page">
<h2>1. What is JavaScript?</h2>
<p><b>JavaScript</b> adds logic and behaviour to websites. It can react to clicks, validate forms, modify HTML/CSS, communicate with APIs and manage application state.</p>
<div class="diagram">
  <div class="row">
    <div class="box">HTML<br><small>Structure</small></div>
    <span class="arrow">+</span>
    <div class="box">CSS<br><small>Presentation</small></div>
    <span class="arrow">+</span>
    <div class="box">JavaScript<br><small>Behaviour</small></div>
  </div>
</div>

<h2>2. Variables</h2>
<pre>let username = "Shahid";
const year = 2026;
let score = 95;

console.log(username);
console.log(year);</pre>
<p><code>let</code> permits reassignment. <code>const</code> prevents reassignment of the variable binding. Avoid using <code>var</code> in new code unless you specifically need its older scoping behaviour.</p>

<h2>3. Data Types</h2>
<table>
  <tr><th>Type</th><th>Example</th></tr>
  <tr><td>String</td><td><code>"Hello"</code></td></tr>
  <tr><td>Number</td><td><code>100</code></td></tr>
  <tr><td>Boolean</td><td><code>true</code></td></tr>
  <tr><td>Undefined</td><td><code>let x;</code></td></tr>
  <tr><td>Null</td><td><code>let x=null;</code></td></tr>
  <tr><td>BigInt</td><td><code>123n</code></td></tr>
  <tr><td>Symbol</td><td>Unique symbol value.</td></tr>
  <tr><td>Object</td><td><code>{name:"Shahid"}</code></td></tr>
</table>

<h2>4. Operators</h2>
<pre>let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);</pre>
<p>Comparison operators include <code>===</code>, <code>!==</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Logical operators include <code>&amp;&amp;</code>, <code>||</code> and <code>!</code>.</p>

<h2>5. Conditions</h2>
<pre>const marks = 72;

if (marks &gt;= 90) {
  console.log("A");
} else if (marks &gt;= 60) {
  console.log("B");
} else {
  console.log("Needs improvement");
}</pre>
<h3>Ternary Operator</h3>
<pre>const result = marks &gt;= 40 ? "Pass" : "Fail";</pre>

<h2>6. Loops</h2>
<pre>for (let i = 1; i &lt;= 5; i++) {
  console.log(i);
}

const skills = ["HTML", "CSS", "JavaScript"];

for (const skill of skills) {
  console.log(skill);
}</pre>

<h2>7. Functions</h2>
<pre>function add(a, b) {
  return a + b;
}

const result = add(10, 20);</pre>
<h3>Arrow Function</h3>
<pre>const multiply = (a, b) =&gt; a * b;</pre>

<h2>8. Arrays</h2>
<pre>const fruits = ["Apple", "Banana", "Mango"];

fruits.push("Orange");

console.log(fruits[0]);
console.log(fruits.length);

const upper = fruits.map(fruit =&gt; fruit.toUpperCase());</pre>
<p>Important array methods include <code>map()</code>, <code>filter()</code>, <code>find()</code>, <code>reduce()</code>, <code>forEach()</code>, <code>includes()</code> and <code>push()</code>.</p>

<h2>9. Objects</h2>
<pre>const student = {
  name: "Shahid",
  age: 20,
  course: "Web Development"
};

console.log(student.name);
console.log(student["course"]);</pre>

<h2>10. DOM</h2>
<pre>const title = document.querySelector("#title");
title.textContent = "New Heading";
title.style.color = "blue";</pre>
<div class="diagram">
  <div class="row">
    <div class="box">HTML</div>
    <span class="arrow">→</span>
    <div class="box">DOM Tree</div>
    <span class="arrow">→</span>
    <div class="box">JavaScript changes nodes</div>
  </div>
</div>

<h2>11. Events</h2>
<pre>const button = document.querySelector("#btn");

button.addEventListener("click", () =&gt; {
  alert("Button clicked!");
});</pre>

<h2>12. Async JavaScript and Promises</h2>
<pre>async function loadUsers() {
  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}</pre>

<h2>13. Modules</h2>
<pre>// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";</pre>

<div class="tip"><b>Learning order:</b> syntax → variables → conditions → loops → functions → arrays/objects → DOM → events → async/await → modules → projects.</div>
</section>

<section class="page">
  <h2>Quick Revision</h2>
  <ul>
    <li>Read each concept and understand what problem it solves.</li>
    <li>Type every example yourself and change the values to see what happens.</li>
    <li>Use browser developer tools to inspect and debug your work.</li>
    <li>Build a small project before moving to the next topic.</li>
    <li>Write your own short summary after completing the chapter.</li>
  </ul>
  <h3>Practice Project</h3>
  <p>Build a small real-world project using the concepts from this chapter. Add validation, responsive design and clear error handling where appropriate.</p>
  <div class="tip"><b>Study method:</b> Learn → Type the example → Change it → Break it intentionally → Fix it → Build a mini project.</div>
</section>
</div>
</div>
`;
