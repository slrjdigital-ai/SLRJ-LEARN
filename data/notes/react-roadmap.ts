import { docNotesStyle } from "./notes-style";

export const reactRoadmapHtml = `
<div class="doc-notes-container">
${docNotesStyle}
<div class="book">
<section class="page cover">
  <h1>React.js Roadmap</h1>
  <p>Learn React systematically from JSX and components to hooks, APIs, routing and projects.</p>
  <p><span class="tag">Detailed Learning Notes • Diagrams • Examples • Practice</span></p>
</section>

<section class="page">
<h2>1. What is React?</h2>
<p><b>React</b> is a JavaScript library for building user interfaces using reusable components.</p>
<div class="diagram">
  <div class="row">
    <div class="box">Components</div>
    <span class="arrow">→</span>
    <div class="box">Props</div>
    <span class="arrow">→</span>
    <div class="box">State</div>
    <span class="arrow">→</span>
    <div class="box">UI</div>
  </div>
</div>

<h2>2. JSX</h2>
<p>JSX lets you write markup-like syntax inside JavaScript code.</p>
<pre>function Welcome() {
  const name = "Shahid";

  return (
    &lt;section&gt;
      &lt;h1&gt;Hello {name}&lt;/h1&gt;
      &lt;p&gt;Welcome to SLRJ Digital.&lt;/p&gt;
    &lt;/section&gt;
  );
}</pre>
<p>JavaScript expressions can be placed inside <code>{ }</code>. JSX attributes use names such as <code>className</code> instead of HTML's <code>class</code>.</p>

<h2>3. Components</h2>
<pre>function Header() {
  return &lt;header&gt;SLRJ DIGITAL&lt;/header&gt;;
}

function App() {
  return (
    &lt;&gt;
      &lt;Header /&gt;
      &lt;main&gt;Home page&lt;/main&gt;
    &lt;/&gt;
  );
}</pre>

<h2>4. Props</h2>
<pre>function Card({ title, description }) {
  return (
    &lt;article&gt;
      &lt;h2&gt;{title}&lt;/h2&gt;
      &lt;p&gt;{description}&lt;/p&gt;
    &lt;/article&gt;
  );
}

function App() {
  return (
    &lt;Card
      title="HTML Notes"
      description="Learn HTML step by step."
    /&gt;
  );
}</pre>
<div class="note"><b>Props are read-only inputs.</b> A child component should not directly modify its props.</div>

<h2>5. State with useState</h2>
<pre>import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      Count: {count}
    &lt;/button&gt;
  );
}</pre>

<h2>6. Events</h2>
<pre>function Button() {
  function handleClick() {
    console.log("Clicked");
  }

  return &lt;button onClick={handleClick}&gt;Click&lt;/button&gt;;
}</pre>

<h2>7. Conditional Rendering</h2>
<pre>function Status({ loggedIn }) {
  return loggedIn
    ? &lt;p&gt;Welcome back!&lt;/p&gt;
    : &lt;p&gt;Please log in.&lt;/p&gt;;
}</pre>

<h2>8. Lists and Keys</h2>
<pre>const skills = ["HTML", "CSS", "JavaScript"];

function Skills() {
  return (
    &lt;ul&gt;
      {skills.map(skill =&gt; (
        &lt;li key={skill}&gt;{skill}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</pre>

<h2>9. useEffect</h2>
<pre>import { useEffect } from "react";

useEffect(() =&gt; {
  console.log("Component effect");
}, []);</pre>
<p>An empty dependency array generally means the effect runs after the component is initially mounted. Dependencies determine when an effect should run again.</p>

<h2>10. API Integration</h2>
<pre>const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() =&gt; {
  fetch("/api/users")
    .then(res =&gt; {
      if (!res.ok) throw new Error("Failed");
      return res.json();
    })
    .then(setUsers)
    .catch(err =&gt; setError(err.message))
    .finally(() =&gt; setLoading(false));
}, []);</pre>

<h2>11. React Router Concept</h2>
<p>Routing allows different URLs to display different UI views without building separate applications.</p>
<pre>/
/about
/projects
/blog
/contact</pre>

<h2>12. React Learning Roadmap</h2>
<ol>
  <li>Modern JavaScript</li>
  <li>JSX</li>
  <li>Components</li>
  <li>Props</li>
  <li>State</li>
  <li>Events and forms</li>
  <li>Lists and conditional rendering</li>
  <li>Hooks</li>
  <li>Routing</li>
  <li>API integration</li>
  <li>Authentication</li>
  <li>State management</li>
  <li>Testing and deployment</li>
</ol>
<div class="tip"><b>Projects:</b> Counter → Todo → Notes app → API dashboard → Authentication → Full-stack application.</div>
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
