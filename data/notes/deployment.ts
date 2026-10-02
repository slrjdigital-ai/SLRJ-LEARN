import { docNotesStyle } from "./notes-style";

export const deploymentHtml = `
<div class="doc-notes-container">
${docNotesStyle}
<div class="book">
<section class="page cover">
  <h1>Website Deployment</h1>
  <p>Learn how to move applications from localhost to production with domains, environment variables and testing.</p>
  <p><span class="tag">Detailed Learning Notes • Diagrams • Examples • Practice</span></p>
</section>

<section class="page">
<h2>1. What is Deployment?</h2>
<p><b>Deployment</b> means making an application available in an environment where users can access it, usually through a public URL.</p>
<div class="diagram">
  <div class="row">
    <div class="box">Local Code</div>
    <span class="arrow">→</span>
    <div class="box">Git Repository</div>
    <span class="arrow">→</span>
    <div class="box">Hosting</div>
    <span class="arrow">→</span>
    <div class="box">Live Website</div>
  </div>
</div>

<h2>2. Development vs Production</h2>
<table>
  <tr><th>Development</th><th>Production</th></tr>
  <tr><td>Used while building and testing.</td><td>Used by real users.</td></tr>
  <tr><td>Often runs on localhost.</td><td>Runs on hosted infrastructure.</td></tr>
  <tr><td>Debugging is common.</td><td>Requires stable configuration and monitoring.</td></tr>
</table>

<h2>3. Typical Deployment Flow</h2>
<ol>
  <li>Build the project locally.</li>
  <li>Test all major features.</li>
  <li>Commit the code to Git.</li>
  <li>Push to a remote repository.</li>
  <li>Connect the repository to a hosting service.</li>
  <li>Configure build/start settings.</li>
  <li>Add environment variables.</li>
  <li>Deploy.</li>
  <li>Test the production URL.</li>
</ol>

<h2>4. Build Commands</h2>
<pre>npm install
npm run build</pre>
<p>Commands vary by framework. The build process converts source code into files suitable for deployment.</p>

<h2>5. Environment Variables</h2>
<p>Environment variables hold configuration that should not be hard-coded into source code.</p>
<pre>DATABASE_URL=...
API_KEY=...
NODE_ENV=production</pre>
<div class="warning"><b>Important:</b> A value used by frontend JavaScript may be visible to users. Never assume a frontend environment variable is secret just because it came from an environment file.</div>

<h2>6. Domain and DNS</h2>
<p>A domain is the human-readable address of a website. DNS connects that domain name to the appropriate internet service.</p>
<div class="diagram">
  <div class="row">
    <div class="box">example.com</div>
    <span class="arrow">→ DNS</span>
    <div class="box">Hosting / Server</div>
    <span class="arrow">→</span>
    <div class="box">Website</div>
  </div>
</div>

<h2>7. HTTPS</h2>
<p>HTTPS encrypts communication between the browser and server using TLS. Modern websites should use HTTPS, especially when handling accounts or sensitive information.</p>

<h2>8. Frontend Deployment</h2>
<p>A static or frontend application can often be deployed by connecting its Git repository to a hosting provider. The provider installs dependencies, runs the build command and serves the generated output.</p>

<h2>9. Backend Deployment</h2>
<p>A backend requires a runtime/server environment, environment variables, database connectivity and appropriate network configuration. The backend should listen on the port provided by its hosting environment when required.</p>

<h2>10. Production Checklist</h2>
<ul>
  <li>Responsive design works on mobile.</li>
  <li>No broken links.</li>
  <li>No unexpected console errors.</li>
  <li>Production API URLs are correct.</li>
  <li>Database connection works.</li>
  <li>Environment variables are configured.</li>
  <li>Authentication and authorization are tested.</li>
  <li>Forms validate input.</li>
  <li>Error and loading states are handled.</li>
  <li>HTTPS is enabled.</li>
  <li>Important pages have useful titles and metadata.</li>
</ul>

<h2>11. Common Deployment Problems</h2>
<table>
  <tr><th>Problem</th><th>Possible reason</th></tr>
  <tr><td>Build fails</td><td>Dependency, syntax or configuration error.</td></tr>
  <tr><td>API works locally but not online</td><td>Incorrect production URL, CORS or environment configuration.</td></tr>
  <tr><td>Database connection fails</td><td>Incorrect credentials, network rules or environment variable.</td></tr>
  <tr><td>Page refresh gives 404</td><td>SPA routing may need hosting configuration.</td></tr>
</table>

<div class="tip"><b>Practice:</b> Deploy a small portfolio or notes website, connect a custom domain, test it on mobile and document the deployment steps.</div>
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
