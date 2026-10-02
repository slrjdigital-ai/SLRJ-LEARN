import { docNotesStyle } from "./notes-style";

export const cssFlexboxHtml = `
<div class="doc-notes-container">
${docNotesStyle}
<div class="book">
<section class="page cover">
  <h1>CSS Flexbox</h1>
  <p>Master CSS layout from the box model to responsive Flexbox and Grid layouts.</p>
  <p><span class="tag">Detailed Learning Notes • Diagrams • Examples • Practice</span></p>
</section>

<section class="page">
<h2>1. What is CSS?</h2>
<p><b>CSS (Cascading Style Sheets)</b> is used to control the presentation of HTML documents. HTML defines what the content is; CSS controls how that content looks and is arranged.</p>
<div class="diagram">
  <div class="row">
    <div class="box">HTML<br><small>Structure</small></div>
    <span class="arrow">→</span>
    <div class="box">CSS<br><small>Presentation</small></div>
    <span class="arrow">→</span>
    <div class="box">Styled Web Page</div>
  </div>
</div>

<h3>Ways to Add CSS</h3>
<pre>&lt;!-- Inline --&gt;
&lt;p style="color:blue"&gt;Hello&lt;/p&gt;

&lt;!-- Internal --&gt;
&lt;style&gt;
p { color: blue; }
&lt;/style&gt;

&lt;!-- External --&gt;
&lt;link rel="stylesheet" href="style.css"&gt;</pre>
<div class="tip"><b>Recommended:</b> Use external CSS for real projects because it keeps structure and presentation separate and makes styles reusable.</div>

<h2>2. CSS Syntax</h2>
<pre>selector {
  property: value;
}</pre>
<pre>p {
  color: blue;
  font-size: 18px;
}</pre>
<p>Here <code>p</code> is the selector, <code>color</code> and <code>font-size</code> are properties, and their assigned values define the style.</p>

<h2>3. Selectors</h2>
<table>
  <tr><th>Selector</th><th>Example</th><th>Meaning</th></tr>
  <tr><td>Element</td><td><code>p</code></td><td>Selects all paragraph elements.</td></tr>
  <tr><td>Class</td><td><code>.card</code></td><td>Selects elements with class="card".</td></tr>
  <tr><td>ID</td><td><code>#header</code></td><td>Selects the element with that ID.</td></tr>
  <tr><td>Universal</td><td><code>*</code></td><td>Selects all elements.</td></tr>
  <tr><td>Descendant</td><td><code>.card p</code></td><td>Selects paragraphs inside .card.</td></tr>
  <tr><td>Child</td><td><code>.card &gt; p</code></td><td>Selects direct child paragraphs.</td></tr>
  <tr><td>Group</td><td><code>h1,h2</code></td><td>Selects both headings.</td></tr>
</table>

<h2>4. Colors, Backgrounds and Text</h2>
<pre>body {
  background-color: #f5f7fb;
  color: #172033;
}

h1 {
  color: rgb(30, 64, 175);
  text-align: center;
}

.card {
  background: white;
  background-image: url("pattern.png");
}</pre>

<h3>Common Text Properties</h3>
<ul>
  <li><code>font-family</code> — chooses the font.</li>
  <li><code>font-size</code> — controls text size.</li>
  <li><code>font-weight</code> — controls thickness.</li>
  <li><code>line-height</code> — controls vertical spacing.</li>
  <li><code>text-align</code> — aligns text.</li>
  <li><code>text-decoration</code> — underline/other decoration.</li>
  <li><code>letter-spacing</code> — controls spacing between letters.</li>
</ul>

<h2>5. The CSS Box Model</h2>
<div class="diagram">
  <div class="box" style="padding:35px">
    <div class="box" style="padding:25px;background:#e8f0fc">
      <div class="box">Content</div>
      <p>← Padding →</p>
    </div>
    <p>Border surrounds padding</p>
  </div>
  <p>Margin creates space outside the element.</p>
</div>
<p>Every normal element can be understood using four areas: <b>content → padding → border → margin</b>.</p>
<pre>.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  margin: 30px;
}</pre>
<p><code>box-sizing: border-box</code> makes width/height calculations easier because padding and border are included in the declared size.</p>

<h2>6. Display and Positioning</h2>
<table>
  <tr><th>Value</th><th>Idea</th></tr>
  <tr><td>block</td><td>Starts on a new line and can take available width.</td></tr>
  <tr><td>inline</td><td>Flows within text; width/height behave differently.</td></tr>
  <tr><td>inline-block</td><td>Flows inline while allowing box dimensions.</td></tr>
  <tr><td>none</td><td>Element is removed from layout.</td></tr>
</table>
<pre>.box { position: relative; }
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
}</pre>
<p>Positioning values include <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code> and <code>sticky</code>.</p>

<h2>7. Flexbox</h2>
<p>Flexbox is a one-dimensional layout system. It is especially useful for rows, columns, navigation bars, cards and alignment.</p>
<pre>.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}</pre>
<table>
  <tr><th>Property</th><th>Purpose</th></tr>
  <tr><td>flex-direction</td><td>Sets row/column direction.</td></tr>
  <tr><td>justify-content</td><td>Aligns along the main axis.</td></tr>
  <tr><td>align-items</td><td>Aligns along the cross axis.</td></tr>
  <tr><td>gap</td><td>Creates spacing.</td></tr>
  <tr><td>flex-wrap</td><td>Allows wrapping.</td></tr>
  <tr><td>flex</td><td>Controls item flexibility.</td></tr>
</table>

<h2>8. CSS Grid</h2>
<p>Grid is a two-dimensional layout system. It is useful when you need to control both rows and columns.</p>
<pre>.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</pre>
<div class="diagram">
  <div class="row">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
  </div>
  <div class="row">
    <div class="box">4</div>
    <div class="box">5</div>
    <div class="box">6</div>
  </div>
</div>

<h2>9. Responsive Design</h2>
<p>Responsive design makes a website adapt to different screen sizes.</p>
<pre>.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }
}</pre>
<div class="tip"><b>Practice:</b> Build a responsive navbar, three-card section and mobile layout using Flexbox + Grid + media queries.</div>
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
