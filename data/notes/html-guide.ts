export const htmlGuideHtml = `
<div class="html-notes-container">
<style>
  .html-notes-container {
    --ink: #17233c;
    --blue: #2563eb;
    --paper: #fffdf5;
    --line: #d9e5f5;
    --yellow: #fff1a8;
    --pink: #ffe0e9;
    --green: #dcfce7;
    --code: #101827;
    font-family: Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
    line-height: 1.65;
    color: var(--ink);
  }
  .html-notes-container * {
    box-sizing: border-box;
  }
  .html-notes-container .book {
    max-width: 1050px;
    margin: 20px auto 40px;
    padding: 0;
  }
  .html-notes-container .page {
    background: repeating-linear-gradient(to bottom, var(--paper) 0, var(--paper) 31px, #dbe7f4 32px);
    margin: 32px 0;
    padding: 42px 55px 55px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    color: var(--ink);
  }
  .html-notes-container .page:before {
    content: "";
    position: absolute;
    left: 34px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #f39ab0cc;
  }
  .html-notes-container h1, 
  .html-notes-container h2, 
  .html-notes-container h3 {
    font-weight: 800;
    line-height: 1.25;
  }
  .html-notes-container h1 {
    font-size: 38px;
    text-align: center;
    color: #173b78;
    margin: 10px 0 8px;
  }
  .html-notes-container h2 {
    font-size: 28px;
    color: #173b78;
    border-bottom: 3px dashed #6b8fc7;
    padding-bottom: 8px;
    margin-top: 10px;
    margin-bottom: 16px;
  }
  .html-notes-container h3 {
    font-size: 22px;
    color: #2459a6;
    margin-top: 24px;
    margin-bottom: 12px;
  }
  .html-notes-container p, 
  .html-notes-container li {
    font-size: 17px;
    letter-spacing: .1px;
    color: var(--ink);
  }
  .html-notes-container ul, 
  .html-notes-container ol {
    margin: 12px 0 18px 24px;
    padding: 0;
  }
  .html-notes-container li {
    margin-bottom: 6px;
  }
  .html-notes-container .subtitle {
    text-align: center;
    font-size: 20px;
    margin-bottom: 24px;
  }
  .html-notes-container .tag {
    display: inline-block;
    background: var(--yellow);
    padding: 4px 12px;
    transform: rotate(-1deg);
    font-weight: bold;
    color: #713f12;
    border-radius: 4px;
  }
  .html-notes-container .note {
    background: #fff8c9;
    border-left: 6px solid #eab308;
    padding: 14px 18px;
    margin: 18px 0;
    border-radius: 0 6px 6px 0;
    color: #713f12;
  }
  .html-notes-container .tip {
    background: var(--green);
    border-left: 6px solid #16a34a;
    padding: 14px 18px;
    margin: 18px 0;
    border-radius: 0 6px 6px 0;
    color: #14532d;
  }
  .html-notes-container .warning {
    background: var(--pink);
    border-left: 6px solid #e11d48;
    padding: 14px 18px;
    margin: 18px 0;
    border-radius: 0 6px 6px 0;
    color: #881337;
  }
  .html-notes-container code {
    background: #e8eef8;
    padding: 2px 7px;
    border-radius: 5px;
    color: #1e40af;
    font-family: "Courier New", monospace;
    font-size: 15px;
  }
  .html-notes-container pre {
    background: var(--code);
    color: #e8f0ff;
    padding: 20px;
    border-radius: 12px;
    overflow-x: auto;
    font-family: "Courier New", monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 18px 0;
    box-shadow: inset 0 0 0 1px #ffffff15;
  }
  .html-notes-container pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  .html-notes-container .diagram {
    border: 2px dashed #6385bd;
    background: #f8fbff;
    border-radius: 15px;
    padding: 18px;
    margin: 20px 0;
    text-align: center;
  }
  .html-notes-container .diagram h3 {
    margin-top: 4px;
  }
  .html-notes-container .box {
    display: inline-block;
    border: 3px solid #3973d3;
    border-radius: 10px;
    padding: 10px 18px;
    background: white;
    margin: 7px;
    font-weight: bold;
    color: #1e3a8a;
  }
  .html-notes-container .arrow {
    font-size: 26px;
    color: #2459a6;
    margin: 0 5px;
  }
  .html-notes-container .tree {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .html-notes-container .row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .html-notes-container table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffffdd;
    margin: 18px 0;
    border-radius: 8px;
    overflow: hidden;
  }
  .html-notes-container th, 
  .html-notes-container td {
    border: 1px solid #9fb5d4;
    padding: 11px 14px;
    text-align: left;
    font-size: 16px;
  }
  .html-notes-container th {
    background: #dbeafe;
    color: #173b78;
    font-weight: 700;
  }
  .html-notes-container .check {
    list-style: none;
    margin-left: 0;
  }
  .html-notes-container .check li {
    position: relative;
    padding-left: 28px;
  }
  .html-notes-container .check li:before {
    content: "☐";
    position: absolute;
    left: 0;
    color: #2563eb;
    font-size: 18px;
  }
  .html-notes-container .example {
    border: 2px solid #8aa7d4;
    border-radius: 12px;
    padding: 15px;
    background: #ffffffaa;
    margin: 16px 0;
  }
  .html-notes-container .footer {
    text-align: center;
    margin-top: 30px;
    color: #47638e;
    font-size: 15px;
    font-weight: 600;
  }
  @media(max-width: 768px) {
    .html-notes-container .page {
      padding: 30px 20px 35px 38px;
    }
    .html-notes-container .page:before {
      left: 18px;
    }
    .html-notes-container h1 {
      font-size: 28px;
    }
    .html-notes-container h2 {
      font-size: 22px;
    }
    .html-notes-container h3 {
      font-size: 19px;
    }
    .html-notes-container p, 
    .html-notes-container li {
      font-size: 15px;
    }
    .html-notes-container pre {
      font-size: 13px;
      padding: 14px;
    }
    .html-notes-container .box {
      padding: 6px 12px;
      font-size: 14px;
    }
  }
</style>

<div class="book">

<section class="page">
  <h1>HTML — Detailed Notes</h1>
  <p class="subtitle"><span class="tag">Clean Study Notes • Simple Explanations • Diagrams • Examples • Practice</span></p>
  <p><b>HTML</b> stands for <b>HyperText Markup Language</b>. It is the standard markup language used to create the structure of web pages.</p>

  <div class="diagram">
    <h3>How a Web Page Works</h3>
    <div class="row">
      <div class="box">HTML<br><small>Structure</small></div>
      <span class="arrow">→</span>
      <div class="box">CSS<br><small>Design</small></div>
      <span class="arrow">→</span>
      <div class="box">JavaScript<br><small>Behaviour</small></div>
      <span class="arrow">→</span>
      <div class="box">Web Page</div>
    </div>
  </div>

  <div class="note"><b>Remember:</b> HTML is not a programming language. It is a markup language because we use tags to describe the structure and meaning of content.</div>

  <h3>Basic Uses of HTML</h3>
  <ul>
    <li>Create headings, paragraphs and lists.</li>
    <li>Add images, audio, video and hyperlinks.</li>
    <li>Create forms and collect user input.</li>
    <li>Build the semantic structure of websites.</li>
    <li>Provide content that CSS can style and JavaScript can make interactive.</li>
  </ul>
</section>

<section class="page">
  <h2>1. Basic Structure of an HTML Document</h2>
  <p>Every normal HTML document starts with a document type declaration followed by the <code>html</code>, <code>head</code> and <code>body</code> sections.</p>

  <div class="diagram">
    <div class="box">&lt;!DOCTYPE html&gt;</div>
    <div>↓</div>
    <div class="box">&lt;html&gt;</div>
    <div>↓</div>
    <div class="box">&lt;head&gt; → title, meta, CSS links</div>
    <div>↓</div>
    <div class="box">&lt;body&gt; → visible page content</div>
  </div>

<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;p&gt;This is my first web page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>

  <h3>Important Parts</h3>
  <table>
    <tr><th>Part</th><th>Purpose</th></tr>
    <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Tells the browser to use modern HTML parsing.</td></tr>
    <tr><td><code>&lt;html&gt;</code></td><td>Root element of the document.</td></tr>
    <tr><td><code>&lt;head&gt;</code></td><td>Contains metadata, title, stylesheets and other resources.</td></tr>
    <tr><td><code>&lt;body&gt;</code></td><td>Contains content displayed on the page.</td></tr>
    <tr><td><code>&lt;title&gt;</code></td><td>Sets the browser tab title.</td></tr>
  </table>
</section>

<section class="page">
  <h2>2. HTML Elements, Tags and Attributes</h2>

  <h3>HTML Tag</h3>
  <p>A tag is written inside angle brackets. Example: <code>&lt;p&gt;</code>.</p>

  <h3>HTML Element</h3>
  <p>An element normally contains an opening tag, content and a closing tag.</p>

  <div class="diagram">
    <div class="box">&lt;p&gt;</div>
    <span> → </span>
    <div class="box">Hello World</div>
    <span> → </span>
    <div class="box">&lt;/p&gt;</div>
    <p><b>Opening tag + Content + Closing tag = Element</b></p>
  </div>

  <h3>Attributes</h3>
  <p>Attributes provide extra information about an element. They are usually written inside the opening tag.</p>

<pre>&lt;a href="https://example.com" target="_blank"&gt;
  Visit Example
&lt;/a&gt;

&lt;img src="photo.jpg" alt="A mountain"&gt;</pre>

  <table>
    <tr><th>Attribute</th><th>Common use</th></tr>
    <tr><td><code>href</code></td><td>Specifies a link destination.</td></tr>
    <tr><td><code>src</code></td><td>Specifies a resource such as an image.</td></tr>
    <tr><td><code>alt</code></td><td>Alternative text for an image.</td></tr>
    <tr><td><code>id</code></td><td>Unique identifier for an element.</td></tr>
    <tr><td><code>class</code></td><td>Groups elements for CSS/JavaScript.</td></tr>
  </table>

  <div class="warning"><b>Common mistake:</b> Always quote attribute values when practical, e.g. <code>class="card"</code>.</div>
</section>

<section class="page">
  <h2>3. Headings, Paragraphs and Text Formatting</h2>

  <h3>Headings</h3>
  <p>HTML provides six heading levels: <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>. The number represents the heading level, not simply the visual size.</p>

<pre>&lt;h1&gt;Main Heading&lt;/h1&gt;
&lt;h2&gt;Section Heading&lt;/h2&gt;
&lt;h3&gt;Subsection&lt;/h3&gt;
&lt;h4&gt;Small Heading&lt;/h4&gt;
&lt;h5&gt;Smaller Heading&lt;/h5&gt;
&lt;h6&gt;Lowest Heading Level&lt;/h6&gt;</pre>

  <h3>Paragraphs and Line Breaks</h3>
<pre>&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;

&lt;p&gt;Line one&lt;br&gt;Line two&lt;/p&gt;</pre>

  <h3>Common Text Elements</h3>
  <table>
    <tr><th>Element</th><th>Meaning / use</th></tr>
    <tr><td><code>&lt;strong&gt;</code></td><td>Strong importance.</td></tr>
    <tr><td><code>&lt;em&gt;</code></td><td>Emphasis.</td></tr>
    <tr><td><code>&lt;mark&gt;</code></td><td>Highlighted text.</td></tr>
    <tr><td><code>&lt;small&gt;</code></td><td>Side comments or small print.</td></tr>
    <tr><td><code>&lt;del&gt;</code></td><td>Deleted text.</td></tr>
    <tr><td><code>&lt;ins&gt;</code></td><td>Inserted text.</td></tr>
    <tr><td><code>&lt;sub&gt;</code></td><td>Subscript.</td></tr>
    <tr><td><code>&lt;sup&gt;</code></td><td>Superscript.</td></tr>
  </table>

<pre>&lt;p&gt;H&lt;sub&gt;2&lt;/sub&gt;O&lt;/p&gt;
&lt;p&gt;x&lt;sup&gt;2&lt;/sup&gt; + y&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;
&lt;p&gt;&lt;strong&gt;Important!&lt;/strong&gt; Read this carefully.&lt;/p&gt;</pre>
</section>

<section class="page">
  <h2>4. Links and Images</h2>

  <h3>Hyperlinks</h3>
<pre>&lt;a href="https://www.google.com"&gt;Open Google&lt;/a&gt;

&lt;a href="about.html"&gt;About Us&lt;/a&gt;

&lt;a href="#contact"&gt;Go to Contact Section&lt;/a&gt;</pre>

  <div class="diagram">
    <div class="box">User clicks link</div>
    <span class="arrow">→</span>
    <div class="box">Browser reads href</div>
    <span class="arrow">→</span>
    <div class="box">Requested resource opens</div>
  </div>

  <h3>Images</h3>
<pre>&lt;img src="images/logo.png"
     alt="SLRJ Digital logo"
     width="300"&gt;</pre>

  <p><b>Why is <code>alt</code> important?</b> It provides alternative text when the image cannot be displayed and helps assistive technologies describe meaningful images.</p>

  <div class="tip"><b>Tip:</b> Use descriptive link text such as “Download HTML Notes” rather than “Click here”.</div>
</section>

<section class="page">
  <h2>5. Lists in HTML</h2>

  <h3>Unordered List</h3>
<pre>&lt;ul&gt;
  &lt;li&gt;HTML&lt;/li&gt;
  &lt;li&gt;CSS&lt;/li&gt;
  &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ul&gt;</pre>

  <h3>Ordered List</h3>
<pre>&lt;ol&gt;
  &lt;li&gt;Open the editor&lt;/li&gt;
  &lt;li&gt;Create index.html&lt;/li&gt;
  &lt;li&gt;Write HTML&lt;/li&gt;
  &lt;li&gt;Open it in a browser&lt;/li&gt;
&lt;/ol&gt;</pre>

  <h3>Description List</h3>
<pre>&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;Markup language for web structure.&lt;/dd&gt;

  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;Style sheet language for presentation.&lt;/dd&gt;
&lt;/dl&gt;</pre>

  <div class="diagram">
    <div class="box">UL → • Item</div>
    <div class="box">OL → 1. Item</div>
    <div class="box">DL → Term + Description</div>
  </div>
</section>

<section class="page">
  <h2>6. Tables</h2>
  <p>Tables are used for tabular data such as marks, schedules and product information. Do not use tables simply to position page elements.</p>

<pre>&lt;table&gt;
  &lt;caption&gt;Student Marks&lt;/caption&gt;

  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;HTML&lt;/th&gt;
      &lt;th&gt;CSS&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;

  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Shahid&lt;/td&gt;
      &lt;td&gt;90&lt;/td&gt;
      &lt;td&gt;85&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>

  <div class="diagram">
    <div class="box">&lt;table&gt;</div>
    <div>↓</div>
    <div class="row">
      <div class="box">&lt;caption&gt;</div>
      <div class="box">&lt;thead&gt; → &lt;tr&gt; → &lt;th&gt;</div>
      <div class="box">&lt;tbody&gt; → &lt;tr&gt; → &lt;td&gt;</div>
    </div>
  </div>

  <div class="note"><b>Remember:</b> <code>&lt;th&gt;</code> represents a header cell, while <code>&lt;td&gt;</code> represents a normal data cell.</div>
</section>

<section class="page">
  <h2>7. Forms</h2>
  <p>Forms allow users to enter and submit information.</p>

<pre>&lt;form action="/submit" method="post"&gt;

  &lt;label for="name"&gt;Name:&lt;/label&gt;
  &lt;input type="text" id="name" name="name"&gt;

  &lt;label for="email"&gt;Email:&lt;/label&gt;
  &lt;input type="email" id="email" name="email"&gt;

  &lt;label for="course"&gt;Course:&lt;/label&gt;
  &lt;select id="course" name="course"&gt;
    &lt;option&gt;HTML&lt;/option&gt;
    &lt;option&gt;CSS&lt;/option&gt;
  &lt;/select&gt;

  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>

  <h3>Common Input Types</h3>
  <table>
    <tr><th>Type</th><th>Purpose</th></tr>
    <tr><td>text</td><td>Single-line text.</td></tr>
    <tr><td>email</td><td>Email address input.</td></tr>
    <tr><td>password</td><td>Password input.</td></tr>
    <tr><td>number</td><td>Numeric input.</td></tr>
    <tr><td>date</td><td>Date selection.</td></tr>
    <tr><td>radio</td><td>Select one option from a group.</td></tr>
    <tr><td>checkbox</td><td>Select zero or more options.</td></tr>
    <tr><td>file</td><td>Select a file.</td></tr>
  </table>

  <div class="tip"><b>Good practice:</b> Connect every form control to a meaningful <code>&lt;label&gt;</code>.</div>
</section>

<section class="page">
  <h2>8. Semantic HTML</h2>
  <p>Semantic elements describe the meaning and role of their content. They make a page easier for people, search engines and assistive technologies to understand.</p>

  <div class="diagram">
    <div class="box">&lt;header&gt;</div>
    <div>↓</div>
    <div class="row">
      <div class="box">&lt;nav&gt;</div>
      <div class="box">&lt;main&gt;<br>↳ &lt;section&gt;<br>↳ &lt;article&gt;</div>
      <div class="box">&lt;aside&gt;</div>
    </div>
    <div>↓</div>
    <div class="box">&lt;footer&gt;</div>
  </div>

<pre>&lt;header&gt;
  &lt;h1&gt;My Blog&lt;/h1&gt;
&lt;/header&gt;

&lt;nav&gt;
  &lt;a href="/"&gt;Home&lt;/a&gt;
  &lt;a href="/notes"&gt;Notes&lt;/a&gt;
&lt;/nav&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;HTML Basics&lt;/h2&gt;
    &lt;p&gt;HTML creates page structure...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;

&lt;footer&gt;Copyright 2026&lt;/footer&gt;</pre>

  <table>
    <tr><th>Element</th><th>Typical role</th></tr>
    <tr><td>header</td><td>Introductory content or site header.</td></tr>
    <tr><td>nav</td><td>Navigation links.</td></tr>
    <tr><td>main</td><td>Main unique content of the page.</td></tr>
    <tr><td>section</td><td>Thematic grouping of content.</td></tr>
    <tr><td>article</td><td>Self-contained content.</td></tr>
    <tr><td>aside</td><td>Related or secondary content.</td></tr>
    <tr><td>footer</td><td>Footer information.</td></tr>
  </table>
</section>

<section class="page">
  <h2>9. Multimedia</h2>

  <h3>Audio</h3>
<pre>&lt;audio controls&gt;
  &lt;source src="song.mp3" type="audio/mpeg"&gt;
  Your browser does not support audio.
&lt;/audio&gt;</pre>

  <h3>Video</h3>
<pre>&lt;video controls width="640"&gt;
  &lt;source src="lesson.mp4" type="video/mp4"&gt;
  Your browser does not support video.
&lt;/video&gt;</pre>

  <h3>Embedding another page</h3>
<pre>&lt;iframe
  src="https://example.com"
  title="Example page"&gt;
&lt;/iframe&gt;</pre>

  <div class="warning"><b>Security note:</b> Only embed content from sources you trust and understand. Not every website permits itself to be displayed inside an iframe.</div>
</section>

<section class="page">
  <h2>10. Div, Span, Classes and IDs</h2>

  <h3>div</h3>
  <p><code>&lt;div&gt;</code> is a generic block-level container. It is useful when no more meaningful semantic element fits.</p>

  <h3>span</h3>
  <p><code>&lt;span&gt;</code> is a generic inline container.</p>

<pre>&lt;div class="card"&gt;
  &lt;h2&gt;HTML Notes&lt;/h2&gt;
  &lt;p&gt;Learn &lt;span class="highlight"&gt;HTML&lt;/span&gt; step by step.&lt;/p&gt;
&lt;/div&gt;</pre>

  <h3>Class vs ID</h3>
  <table>
    <tr><th>class</th><th>id</th></tr>
    <tr><td>Can be reused on many elements.</td><td>Should identify one unique element in a document.</td></tr>
    <tr><td>Commonly used for styling groups.</td><td>Useful for unique elements and fragment links.</td></tr>
    <tr><td>CSS selector: <code>.card</code></td><td>CSS selector: <code>#header</code></td></tr>
  </table>

<pre>&lt;h2 id="html"&gt;HTML&lt;/h2&gt;

&lt;div class="note"&gt;Important note&lt;/div&gt;
&lt;div class="note"&gt;Another note&lt;/div&gt;</pre>
</section>

<section class="page">
  <h2>11. HTML Entities and Comments</h2>

  <h3>Comments</h3>
<pre>&lt;!-- This is an HTML comment.
     It is not displayed on the page. --&gt;</pre>

  <h3>Entities</h3>
  <p>Some characters have special meaning in HTML, so entities can be used to represent them safely.</p>

  <table>
    <tr><th>Entity</th><th>Displayed character</th></tr>
    <tr><td><code>&amp;lt;</code></td><td>&lt;</td></tr>
    <tr><td><code>&amp;gt;</code></td><td>&gt;</td></tr>
    <tr><td><code>&amp;amp;</code></td><td>&amp;</td></tr>
    <tr><td><code>&amp;copy;</code></td><td>©</td></tr>
    <tr><td><code>&amp;nbsp;</code></td><td>Non-breaking space</td></tr>
  </table>

  <div class="note"><b>Example:</b> To display the literal text <code>&lt;h1&gt;</code> on a webpage, write <code>&amp;lt;h1&amp;gt;</code>.</div>
</section>

<section class="page">
  <h2>12. Accessibility and Good HTML Practices</h2>

  <ul class="check">
    <li>Use meaningful headings in a logical structure.</li>
    <li>Add useful <code>alt</code> text to meaningful images.</li>
    <li>Use labels for form controls.</li>
    <li>Use buttons for actions and links for navigation.</li>
    <li>Prefer semantic HTML over unnecessary <code>div</code> elements.</li>
    <li>Keep link text descriptive.</li>
    <li>Set the document language with <code>lang="en"</code> when appropriate.</li>
    <li>Make sure interactive controls can be used with a keyboard.</li>
  </ul>

  <h3>Example: Better HTML</h3>
<pre>&lt;article&gt;
  &lt;h2&gt;HTML Accessibility&lt;/h2&gt;

  &lt;img src="keyboard.jpg"
       alt="Person using a keyboard"&gt;

  &lt;p&gt;Accessible websites can be used by more people.&lt;/p&gt;

  &lt;a href="accessibility.html"&gt;
    Read accessibility guide
  &lt;/a&gt;
&lt;/article&gt;</pre>
</section>

<section class="page">
  <h2>13. Mini Project — Student Profile Page</h2>

  <p>Use the following example to combine headings, image, links, lists, semantic elements and a simple form.</p>

<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport"
        content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Student Profile&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

  &lt;header&gt;
    &lt;h1&gt;My Student Profile&lt;/h1&gt;
    &lt;p&gt;Learning web development step by step.&lt;/p&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;section&gt;
      &lt;h2&gt;About Me&lt;/h2&gt;
      &lt;img src="profile.jpg"
           alt="Student profile photo"
           width="180"&gt;
      &lt;p&gt;I am learning HTML, CSS and JavaScript.&lt;/p&gt;
    &lt;/section&gt;

    &lt;section&gt;
      &lt;h2&gt;Skills&lt;/h2&gt;
      &lt;ul&gt;
        &lt;li&gt;HTML&lt;/li&gt;
        &lt;li&gt;CSS&lt;/li&gt;
        &lt;li&gt;JavaScript&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/section&gt;

    &lt;section&gt;
      &lt;h2&gt;Contact&lt;/h2&gt;
      &lt;form&gt;
        &lt;label for="email"&gt;Email&lt;/label&gt;
        &lt;input type="email" id="email"&gt;
        &lt;button type="submit"&gt;Send&lt;/button&gt;
      &lt;/form&gt;
    &lt;/section&gt;
  &lt;/main&gt;

  &lt;footer&gt;
    &lt;p&gt;© 2026 Student Profile&lt;/p&gt;
  &lt;/footer&gt;

&lt;/body&gt;
&lt;/html&gt;</pre>

  <div class="diagram">
    <h3>Project Structure</h3>
    <div class="tree">
      <div class="box">student-profile/</div>
      <div>↓</div>
      <div class="row">
        <div class="box">index.html</div>
        <div class="box">profile.jpg</div>
      </div>
    </div>
  </div>
</section>

<section class="page">
  <h2>14. Quick Revision Sheet</h2>

  <table>
    <tr><th>Topic</th><th>Remember</th></tr>
    <tr><td>HTML</td><td>Structures web content.</td></tr>
    <tr><td>Element</td><td>Opening tag + content + closing tag, where applicable.</td></tr>
    <tr><td>Attribute</td><td>Provides additional information to an element.</td></tr>
    <tr><td>Heading</td><td><code>h1</code> to <code>h6</code>.</td></tr>
    <tr><td>Paragraph</td><td><code>p</code>.</td></tr>
    <tr><td>Link</td><td><code>a</code> with <code>href</code>.</td></tr>
    <tr><td>Image</td><td><code>img</code> with <code>src</code> and useful <code>alt</code>.</td></tr>
    <tr><td>List</td><td><code>ul</code>, <code>ol</code>, <code>li</code>.</td></tr>
    <tr><td>Table</td><td><code>table</code>, <code>tr</code>, <code>th</code>, <code>td</code>.</td></tr>
    <tr><td>Form</td><td><code>form</code>, <code>label</code>, <code>input</code>, <code>button</code>.</td></tr>
    <tr><td>Semantic HTML</td><td><code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code>, <code>article</code>, <code>footer</code>.</td></tr>
  </table>

  <h3>Practice Questions</h3>
  <ol>
    <li>What is HTML and why is it called a markup language?</li>
    <li>Explain the difference between an HTML tag and an element.</li>
    <li>What are attributes? Give three examples.</li>
    <li>Write the basic structure of an HTML document.</li>
    <li>Differentiate between ordered and unordered lists.</li>
    <li>What is the purpose of the <code>alt</code> attribute?</li>
    <li>Explain semantic HTML with examples.</li>
    <li>Create a form containing name, email and a submit button.</li>
    <li>Create a table containing three students and their marks.</li>
    <li>Build a simple student profile page using semantic HTML.</li>
  </ol>

  <div class="tip"><b>Final memory trick:</b> HTML = <b>Structure</b> → CSS = <b>Style</b> → JavaScript = <b>Behaviour</b>.</div>
  <div class="footer">HTML Detailed Notes • Theory + Diagrams + Examples • 2026</div>
</section>

</div>
</div>
`;
