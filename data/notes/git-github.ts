import { docNotesStyle } from "./notes-style";

export const gitGithubHtml = `
<div class="doc-notes-container">
${docNotesStyle}
<div class="book">
<section class="page cover">
  <h1>Git &amp; GitHub</h1>
  <p>Learn version control, commits, branches, merging, pull requests and safe collaboration.</p>
  <p><span class="tag">Detailed Learning Notes • Diagrams • Examples • Practice</span></p>
</section>

<section class="page">
<h2>1. What is Version Control?</h2>
<p>Version control records changes to files over time. It lets developers inspect history, create branches, collaborate and recover earlier versions.</p>
<p><b>Git</b> is the version control system. <b>GitHub</b> is an online platform for hosting Git repositories and collaboration.</p>

<h2>2. Git Architecture</h2>
<div class="diagram">
  <div class="row">
    <div class="box">Working Directory</div>
    <span class="arrow">→</span>
    <div class="box">Staging Area</div>
    <span class="arrow">→</span>
    <div class="box">Local Repository</div>
    <span class="arrow">→</span>
    <div class="box">Remote / GitHub</div>
  </div>
</div>

<h2>3. Create a Repository</h2>
<pre>mkdir my-project
cd my-project
git init
git status</pre>

<h2>4. First Commit</h2>
<pre>git add .
git commit -m "Initial commit"</pre>
<p><code>git add</code> selects changes for the next commit. <code>git commit</code> records a snapshot in the local repository.</p>

<h2>5. Connect GitHub</h2>
<pre>git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main</pre>

<h2>6. Everyday Workflow</h2>
<pre>git status
git add .
git commit -m "Describe the change"
git push</pre>

<h2>7. Branches</h2>
<p>Branches let you work on features or fixes separately from the main development line.</p>
<pre>git switch -c feature-login

# edit files

git add .
git commit -m "Add login form"

git switch main
git merge feature-login</pre>

<div class="diagram">
  <div class="row">
    <div class="box">main</div>
    <span class="arrow">→</span>
    <div class="box">A</div>
    <span class="arrow">→</span>
    <div class="box">B</div>
  </div>
  <p>↘</p>
  <div class="row">
    <div class="box">feature</div>
    <span class="arrow">→</span>
    <div class="box">C</div>
    <span class="arrow">→</span>
    <div class="box">D</div>
  </div>
</div>

<h2>8. Pull, Push and Clone</h2>
<pre>git clone YOUR_REPOSITORY_URL
git pull
git push</pre>
<p><code>clone</code> copies a remote repository, <code>pull</code> retrieves and integrates remote changes, and <code>push</code> uploads local commits.</p>

<h2>9. Merge Conflicts</h2>
<p>A merge conflict happens when Git cannot automatically combine changes. Open the conflicted file, decide which content should remain, remove conflict markers, test the project and commit the resolution.</p>

<h2>10. Pull Requests</h2>
<p>A pull request proposes merging changes into another branch. Teams can review code, discuss changes and run checks before merging.</p>

<h2>11. .gitignore</h2>
<pre>node_modules/
.env
dist/
.DS_Store</pre>
<p>Use <code>.gitignore</code> for files that should not be committed.</p>

<div class="warning"><b>Never commit secrets:</b> API keys, passwords, private certificates and database credentials should not be stored in a public repository.</div>
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
