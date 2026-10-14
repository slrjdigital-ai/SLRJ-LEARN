const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function buildHtml5NotebookPdf() {
  const doc = await PDFDocument.create();

  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const courier = await doc.embedFont(StandardFonts.Courier);
  const courierBold = await doc.embedFont(StandardFonts.CourierBold);

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  function createBasePage(pageNumber, totalPages, pageTitle, pageCategory = 'LEVEL 1 - 4') {
    const page = doc.addPage([A4_WIDTH, A4_HEIGHT]);
    const { width, height } = page.getSize();

    // Top Header Banner
    page.drawRectangle({
      x: 0,
      y: height - 76,
      width: width,
      height: 76,
      color: rgb(0.02, 0.02, 0.08), // #050514
    });

    // Gold/Amber accent line
    page.drawRectangle({
      x: 0,
      y: height - 79,
      width: width,
      height: 3,
      color: rgb(0.96, 0.62, 0.05), // #F59E0B
    });

    // Branding
    page.drawText('SLRJ LEARN', {
      x: 36,
      y: height - 32,
      size: 15,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });

    page.drawText('|  HTML HANDWRITTEN NOTEBOOK (BASIC -> PRO)', {
      x: 145,
      y: height - 31,
      size: 8.5,
      font: helveticaBold,
      color: rgb(0.96, 0.62, 0.05),
    });

    page.drawText(pageTitle, {
      x: 36,
      y: height - 52,
      size: 11,
      font: helveticaBold,
      color: rgb(0.85, 0.9, 1),
    });

    page.drawText(`Category: HTML / WEB DEV  |  ${pageCategory}`, {
      x: width - 215,
      y: height - 52,
      size: 7.5,
      font: helvetica,
      color: rgb(0.65, 0.75, 0.9),
    });

    // Bottom Footer
    page.drawRectangle({
      x: 36,
      y: 36,
      width: width - 72,
      height: 1,
      color: rgb(0.85, 0.85, 0.9),
    });

    page.drawText(`Page ${pageNumber} of ${totalPages}`, {
      x: 36,
      y: 22,
      size: 8,
      font: helveticaBold,
      color: rgb(0.4, 0.45, 0.55),
    });

    page.drawText('SLRJ Learn Hub | Open Education Series | https://slrjlearn.in', {
      x: 115,
      y: 22,
      size: 7.5,
      font: helvetica,
      color: rgb(0.4, 0.45, 0.55),
    });

    page.drawText('Think - Build - Grow', {
      x: width - 125,
      y: 22,
      size: 8,
      font: helveticaBold,
      color: rgb(0.96, 0.62, 0.05),
    });

    return { page, width, height };
  }

  function drawSectionHeader(page, title, y) {
    page.drawRectangle({
      x: 36,
      y: y - 2,
      width: 4,
      height: 14,
      color: rgb(0.96, 0.62, 0.05),
    });
    page.drawText(title, {
      x: 46,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.08, 0.1, 0.2),
    });
    return y - 18;
  }

  function drawTextLines(page, lines, startY, options = {}) {
    let y = startY;
    const fontSize = options.size || 8.5;
    const lineGap = options.gap || 12.5;
    const font = options.font || helvetica;
    const color = options.color || rgb(0.15, 0.15, 0.2);
    const leftX = options.x || 36;

    for (const line of lines) {
      if (line === '') {
        y -= 6;
        continue;
      }
      const isBullet = line.startsWith('*') || line.startsWith('  -') || line.startsWith('  1.') || line.startsWith('  2.') || line.startsWith('  3.') || line.startsWith('  4.');
      page.drawText(line, {
        x: isBullet ? leftX + 8 : leftX,
        y: y,
        size: fontSize,
        font: isBullet ? helveticaBold : font,
        color: color,
        maxWidth: A4_WIDTH - leftX - 36,
      });
      y -= lineGap;
    }
    return y;
  }

  function drawCalloutBox(page, label, text, y, type = 'remember') {
    const isError = type === 'warning' || type === 'mistake';
    const bgColor = isError ? rgb(0.99, 0.94, 0.94) : rgb(0.98, 0.96, 0.9);
    const borderColor = isError ? rgb(0.85, 0.2, 0.2) : rgb(0.85, 0.55, 0.05);
    const textColor = isError ? rgb(0.65, 0.1, 0.1) : rgb(0.45, 0.25, 0.02);

    page.drawRectangle({
      x: 36,
      y: y - 24,
      width: A4_WIDTH - 72,
      height: 28,
      color: bgColor,
    });

    page.drawRectangle({
      x: 36,
      y: y - 24,
      width: 4,
      height: 28,
      color: borderColor,
    });

    page.drawText(`${label}: `, {
      x: 48,
      y: y - 16,
      size: 8,
      font: helveticaBold,
      color: borderColor,
    });

    page.drawText(text, {
      x: 48 + helveticaBold.widthOfTextAtSize(`${label}: `, 8),
      y: y - 16,
      size: 8,
      font: helvetica,
      color: textColor,
      maxWidth: A4_WIDTH - 130,
    });

    return y - 36;
  }

  function drawCodeBox(page, title, codeLines, startY) {
    const boxHeight = codeLines.length * 11 + 24;
    let y = startY;

    // Box container
    page.drawRectangle({
      x: 36,
      y: y - boxHeight,
      width: A4_WIDTH - 72,
      height: boxHeight,
      color: rgb(0.04, 0.05, 0.1),
    });

    // Window top bar
    page.drawRectangle({
      x: 36,
      y: y - 18,
      width: A4_WIDTH - 72,
      height: 18,
      color: rgb(0.08, 0.1, 0.18),
    });

    // Window controls
    page.drawCircle({ x: 48, y: y - 9, size: 3, color: rgb(0.9, 0.3, 0.3) });
    page.drawCircle({ x: 58, y: y - 9, size: 3, color: rgb(0.9, 0.7, 0.2) });
    page.drawCircle({ x: 68, y: y - 9, size: 3, color: rgb(0.2, 0.8, 0.4) });

    page.drawText(title, {
      x: 82,
      y: y - 13,
      size: 7.5,
      font: courierBold,
      color: rgb(0.75, 0.85, 0.95),
    });

    let codeY = y - 30;
    for (const line of codeLines) {
      const isComment = line.trim().startsWith('<!--') || line.trim().startsWith('//');
      page.drawText(line, {
        x: 48,
        y: codeY,
        size: 7.5,
        font: courier,
        color: isComment ? rgb(0.4, 0.65, 0.5) : rgb(0.25, 0.85, 0.95),
      });
      codeY -= 11;
    }

    return y - boxHeight - 10;
  }

  function drawTable(page, headers, rows, startY) {
    let y = startY;
    const colWidth = (A4_WIDTH - 72) / headers.length;

    // Header row
    page.drawRectangle({
      x: 36,
      y: y - 18,
      width: A4_WIDTH - 72,
      height: 18,
      color: rgb(0.08, 0.1, 0.2),
    });

    for (let c = 0; c < headers.length; c++) {
      page.drawText(headers[c], {
        x: 42 + c * colWidth,
        y: y - 13,
        size: 8,
        font: helveticaBold,
        color: rgb(1, 1, 1),
      });
    }
    y -= 18;

    // Rows
    for (let r = 0; r < rows.length; r++) {
      const isAlt = r % 2 === 1;
      page.drawRectangle({
        x: 36,
        y: y - 16,
        width: A4_WIDTH - 72,
        height: 16,
        color: isAlt ? rgb(0.95, 0.96, 0.98) : rgb(1, 1, 1),
      });

      page.drawRectangle({
        x: 36,
        y: y - 16,
        width: A4_WIDTH - 72,
        height: 1,
        color: rgb(0.88, 0.9, 0.94),
      });

      for (let c = 0; c < headers.length; c++) {
        page.drawText(rows[r][c] || '', {
          x: 42 + c * colWidth,
          y: y - 12,
          size: 7.5,
          font: c === 0 ? helveticaBold : helvetica,
          color: c === 0 ? rgb(0.85, 0.45, 0.05) : rgb(0.2, 0.2, 0.25),
        });
      }
      y -= 16;
    }

    return y - 12;
  }

  const TOTAL_PAGES = 10;

  // -------------------------------------------------------------
  // PAGE 1: Handbook Overview & Roadmap
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(1, TOTAL_PAGES, 'HANDBOOK OVERVIEW & 4-LEVEL PROGRESSION', 'CURRICULUM');
    let y = A4_HEIGHT - 100;

    page.drawText('HTML HANDWRITTEN NOTEBOOK', {
      x: 36,
      y: y,
      size: 18,
      font: helveticaBold,
      color: rgb(0.05, 0.08, 0.18),
    });
    y -= 18;

    page.drawText('Basic -> Intermediate -> Advanced -> Pro Engineering Architecture', {
      x: 36,
      y: y,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0.85, 0.5, 0.05),
    });
    y -= 26;

    y = drawCalloutBox(page, '[GOAL]', 'Build strong HTML fundamentals, write clean semantic pages, create accessible forms, and become ready for CSS, JS & React.', y, 'remember');

    y = drawSectionHeader(page, 'Study - Write - Practice - Build - Revise (How to Use These Notes)', y);
    y = drawTextLines(page, [
      '1. Read the concept first, then type the code yourself in VS Code instead of only copying it.',
      '2. Underline or highlight the Remember boxes while revising for technical interviews.',
      '3. After completing each level, build the practice challenges and mini-project.',
      '4. Keep one dedicated folder called "html-practice" and create a separate file for every exercise.',
      '5. Always use index.html as the main entry page for multi-page projects.'
    ], y);
    y -= 12;

    y = drawSectionHeader(page, '4-Level Learning Progression Matrix', y);
    y = drawTable(page, ['Level', 'Curriculum Focus', 'Key Skills Acquired'], [
      ['LEVEL 1 - BASIC', 'Structure, tags, text, links, images, lists, tables', 'DOM Tree, HTML5 Skeleton, Paths, Lists'],
      ['LEVEL 2 - INTERMEDIATE', 'Forms, semantic layout, multimedia, entities, head', 'Accessible Forms, Input Types, Semantics'],
      ['LEVEL 3 - ADVANCED', 'Accessibility, SEO, responsive, SVG, Canvas, dialog', 'WCAG A11y, Technical SEO, Native APIs'],
      ['LEVEL 4 - PRO', 'Architecture, validation, performance, security, backend', 'BEM Naming, Image Opt, Security, Full-Stack']
    ], y);
    y -= 6;

    y = drawCalloutBox(page, '[RULE]', 'HTML is about structure & meaning. CSS controls appearance. JavaScript controls behavior.', y, 'remember');
  }

  // -------------------------------------------------------------
  // PAGE 2: Level 1 - HTML Basics & Document Structure
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(2, TOTAL_PAGES, 'LEVEL 1 - HTML BASICS & DOCUMENT STRUCTURE', 'LEVEL 1');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '1. What is HTML?', y);
    y = drawTextLines(page, [
      '* HTML stands for HyperText Markup Language - the standard markup language used to structure web content.',
      '* HyperText: Text that contains links to other web resources, pages, or files.',
      '* Markup: Special syntax tags that tell the browser what a piece of content represents (headings, paragraphs, lists).',
      '* First Example: <h1>Hello World</h1><p>This is my first webpage.</p>'
    ], y);
    y -= 8;

    y = drawCalloutBox(page, '[REMEMBER]', 'HTML is NOT a programming language. It is a declarative markup language with zero variables or logic.', y, 'remember');

    y = drawSectionHeader(page, '2. HTML Document Structure Architecture', y);
    y = drawTextLines(page, [
      'Every valid web document follows a strict tree hierarchy:',
      '  1. <!DOCTYPE html>       -> Document type declaration: instructs browser to use standard HTML5 mode.',
      '  2. <html lang="en">      -> Root element: wraps all page contents; lang attribute aids screen-readers and SEO.',
      '  3.   <head>              -> Metadata container: contains machine instructions (charset, viewport, title, css).',
      '  4.   <body>              -> Visible page container: holds all user-visible page content (headings, images, forms).'
    ], y);
    y -= 8;

    y = drawCodeBox(page, 'Standard HTML5 Production Skeleton', [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '  <head>',
      '    <meta charset="UTF-8">',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <title>My First Webpage</title>',
      '  </head>',
      '  <body>',
      '    <h1>Welcome to Web Development!</h1>',
      '    <p>This is standards-compliant HTML5.</p>',
      '  </body>',
      '</html>'
    ], y);
    y -= 14;

    y = drawCalloutBox(page, '[COMMON MISTAKE]', 'Do not put normal visible content inside <head>. Put all visible elements inside <body>.', y, 'mistake');

    y = drawSectionHeader(page, '3. Tags, Elements and Attributes', y);
    y = drawTextLines(page, [
      '* Tag: Markup token enclosed in brackets (<p> or </p>).',
      '* Element: Opening tag + Content + Closing tag (e.g. <p>Hello</p>).',
      '* Attribute: Extra metadata inside opening tag (e.g. <a href="https://example.com" target="_blank">Visit</a>).',
      '* Void Elements: Self-closing tags that cannot contain children (<img>, <br>, <hr>, <input>, <meta>, <link>).'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 3: Level 1 - Text, Links, Images & Tables
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(3, TOTAL_PAGES, 'LEVEL 1 - TEXT, LINKS, IMAGES & TABLES', 'LEVEL 1');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '4. Text Formatting & Heading Hierarchy', y);
    y = drawTextLines(page, [
      '* <h1> to <h6>: Heading hierarchy. Use exactly one <h1> per page for the main subject; use <h2>-<h6> for subtopics.',
      '* <p>: Paragraph text block. | <strong>: Strong importance (bold). | <em>: Stress emphasis (italic).',
      '* <mark>: Highlighted relevance. | <small>: Fine print disclaimer. | <sub> & <sup>: Subscript (H2O) & Superscript (x2).',
      '* <br>: Semantic line break (use sparingly). | <hr>: Thematic horizontal rule across sections.'
    ], y);
    y -= 8;

    y = drawSectionHeader(page, '5. Comments & Security Awareness', y);
    y = drawTextLines(page, [
      '* Syntax: <!-- This comment is not displayed on the screen -->',
      '* Security: Anyone can view HTML comments via DevTools or View Source. NEVER store passwords or secrets in comments.'
    ], y);
    y -= 8;

    y = drawSectionHeader(page, '6. Links & Anchor Elements', y);
    y = drawTextLines(page, [
      '* Internal: <a href="about.html">About</a> | External: <a href="https://google.com" target="_blank">Google</a>',
      '* Email: <a href="mailto:hello@slrjlearn.in">Email Us</a> | Phone: <a href="tel:+911234567890">Call Us</a>',
      '* Remember: "href" is destination. Clickable text goes between <a> and </a>.'
    ], y);
    y -= 8;

    y = drawSectionHeader(page, '7. Images & 8. File Paths', y);
    y = drawTextLines(page, [
      '* Image Syntax: <img src="images/photo.jpg" alt="Mountain sunset landscape" width="600" height="400">',
      '* "alt" attribute is mandatory: reads aloud to screen readers and displays when network fails.',
      '* File Paths: "./" or "file.html" = current folder. "../" = go up one parent folder. "images/" = subfolder.'
    ], y);
    y -= 8;

    y = drawSectionHeader(page, '9. Lists & 10. Accessible Tables', y);
    y = drawTextLines(page, [
      '* <ul> + <li>: Unordered bulleted list. | <ol> + <li>: Ordered numbered list. | <dl> + <dt> + <dd>: Description list.',
      '* Tables: <table>, <caption> (accessible title), <thead> (headers), <tbody> (data), <th> (scope="col"), <td> (cell).',
      '* Rule: Use tables strictly for tabular, multidimensional data - NEVER for page layout.'
    ], y);
    y -= 10;

    y = drawCodeBox(page, 'Accessible HTML Table Example', [
      '<table>',
      '  <caption>Student Examination Results</caption>',
      '  <thead>',
      '    <tr><th scope="col">Student Name</th><th scope="col">Marks</th></tr>',
      '  </thead>',
      '  <tbody>',
      '    <tr><td>Rahul Sharma</td><td>85%</td></tr>',
      '    <tr><td>Asha Patel</td><td>91%</td></tr>',
      '  </tbody>',
      '</table>'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 4: Level 2 - Forms & Semantic Layout
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(4, TOTAL_PAGES, 'LEVEL 2 - FORMS & SEMANTIC PAGE LAYOUT', 'LEVEL 2');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '11. Forms Architecture & Submission Pipeline', y);
    y = drawTextLines(page, [
      'Typical Form Flow: User Input -> <form> container -> Client Validation -> Submit (POST/GET) -> Server / API',
      '* <label for="id">: Connects descriptive text to input field for screen-readers and clickable touch targets.',
      '* <input id="id" name="name" required>: "id" pairs with label; "name" identifies the key sent in HTTP payload.',
      '* method="post": For passwords, sensitive data, and mutations. | method="get": For searches and query parameters.'
    ], y);
    y -= 8;

    y = drawCodeBox(page, 'Accessible Form Fieldset & Controls', [
      '<form action="/api/register" method="post">',
      '  <label for="name">Full Name</label>',
      '  <input id="name" name="name" type="text" required placeholder="John">',
      '  <label for="email">Email</label>',
      '  <input id="email" name="email" type="email" required placeholder="john@example.com">',
      '  <fieldset>',
      '    <legend>Notification Preference</legend>',
      '    <label><input type="radio" name="notify" value="email" checked> Email</label>',
      '    <label><input type="radio" name="notify" value="sms"> SMS</label>',
      '  </fieldset>',
      '  <button type="submit">Create Account</button>',
      '</form>'
    ], y);
    y -= 14;

    y = drawSectionHeader(page, '12. Common Input Types & 13. Form Controls', y);
    y = drawTextLines(page, [
      '* Input Types: text, email, password, number, date, time, file, radio, checkbox, submit, color, range.',
      '* <select> + <option>: Dropdown menus. | <textarea rows="5">: Multi-line text input.',
      '* <fieldset> + <legend>: Group related controls together logically (such as billing address or radio choices).'
    ], y);
    y -= 8;

    y = drawCalloutBox(page, '[SECURITY ALERT]', 'Never trust client-side validation alone. The server backend must always re-validate and sanitize input.', y, 'warning');

    y = drawSectionHeader(page, '14. Semantic HTML Layout Elements', y);
    y = drawTextLines(page, [
      'Semantic tags convey meaning and hierarchy to browsers, search bots, and assistive readers:',
      '  - <header>: Introduction, branding, primary page title.',
      '  - <nav>: Primary navigational links bar.',
      '  - <main>: Unique central body content of the document (only one allowed per page).',
      '  - <section>: Thematic section with its own heading. | <article>: Independent reusable item (blog/card).',
      '  - <aside>: Related side content, author bio, or sidebar. | <footer>: Copyright, legal links, sitemap.'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 5: Level 2 - Media, Entities & Head Metadata
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(5, TOTAL_PAGES, 'LEVEL 2 - MEDIA, ENTITIES & HEAD METADATA', 'LEVEL 2');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '15. Containers: <div> vs <span>', y);
    y = drawTextLines(page, [
      '* <div>: Generic block-level container. Starts on a new line and takes 100% width. Use only for styling when no semantic tag fits.',
      '* <span>: Generic inline container. Wraps text without line breaks. Ideal for styling small words or icons inside paragraphs.'
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '16. Multimedia: Native Audio & Video', y);
    y = drawCodeBox(page, 'Native Audio and Video Embeds with Fallbacks', [
      '<audio controls>',
      '  <source src="podcast.mp3" type="audio/mpeg">',
      '  Your browser does not support the audio element.',
      '</audio>',
      '',
      '<video controls width="640" poster="preview.jpg">',
      '  <source src="course-intro.mp4" type="video/mp4">',
      '  Your browser does not support the video element.',
      '</video>'
    ], y);
    y -= 14;

    y = drawSectionHeader(page, '17. Embedded Content: <iframe>', y);
    y = drawTextLines(page, [
      '* Embed external videos or documents: <iframe src="https://youtube.com/embed/..." title="Video" width="560" height="315" allowfullscreen></iframe>',
      '* Accessibility: Always include a descriptive "title" attribute for screen-readers. Embed only from trusted domains.'
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '18. Common HTML Character Entities', y);
    y = drawTable(page, ['Entity Code', 'Rendered Symbol', 'Description'], [
      ['&lt;', '<', 'Less than symbol (used to display raw HTML tags)'],
      ['&gt;', '>', 'Greater than symbol'],
      ['&amp;', '&', 'Ampersand symbol'],
      ['&nbsp;', '[Space]', 'Non-breaking space (prevents automatic line breaks)'],
      ['&copy;', '(C)', 'Copyright notice symbol'],
      ['&reg;', '(R)', 'Registered trademark symbol']
    ], y);
    y -= 6;

    y = drawSectionHeader(page, '19. Head Elements & 20. Global Attributes', y);
    y = drawTextLines(page, [
      '* <meta charset="UTF-8">: Declares UTF-8 Unicode character set.',
      '* <meta name="viewport" content="width=device-width, initial-scale=1.0">: Enables mobile responsive scaling.',
      '* Global Attributes: "id" (unique per page), "class" (reusable hook), "title" (tooltip), "lang" (language), "data-*" (custom data).'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 6: Level 3 - Accessibility, SEO & Modern Elements
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(6, TOTAL_PAGES, 'LEVEL 3 - ACCESSIBILITY, SEO & MODERN APIS', 'LEVEL 3');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '21. Accessibility Fundamentals (WCAG)', y);
    y = drawTextLines(page, [
      '* First Rule of ARIA: Use native semantic HTML elements before writing custom ARIA attributes.',
      '* Alt Text: Every informative image needs descriptive alt text; decorative graphics can use empty alt="".',
      '* Form Pairing: Every form field must be explicitly associated with a <label for="id">.',
      '* Heading Structure: Keep heading levels logical (h1 -> h2 -> h3). Never skip levels purely for styling.',
      '* Keyboard Accessibility: Ensure all interactive controls are reachable with Tab and triggerable via Enter/Space.'
    ], y);
    y -= 8;

    y = drawCalloutBox(page, '[DECISION RULE]', 'If it takes the user somewhere -> link <a href="...">. If it makes something happen -> button <button>.', y, 'remember');

    y = drawSectionHeader(page, '23. Technical SEO in HTML & 24. Responsive Structure', y);
    y = drawTextLines(page, [
      '* Give each page a unique <title> (50-60 chars) and descriptive <meta name="description"> (140-160 chars).',
      '* Use exactly one <h1> element on the page describing the primary page topic.',
      '* Write descriptive anchor link text (avoid generic "click here"; use "view full syllabus").',
      '* Include mobile viewport meta tag; HTML sets up flexible content containers for CSS media queries.'
    ], y);
    y -= 8;

    y = drawSectionHeader(page, '25. Inline SVG & 26. Canvas Basics', y);
    y = drawTextLines(page, [
      '* SVG (Scalable Vector Graphics): XML-based vector graphics that scale infinitely without pixelation. Styleable via CSS.',
      '* Canvas (<canvas>): Scriptable pixel raster surface drawn using JavaScript 2D/WebGL context for charts and games.'
    ], y);
    y -= 8;

    y = drawSectionHeader(page, '27. Details/Summary & 28. Native Dialog', y);
    y = drawCodeBox(page, 'Native Accordion & Modal (Zero JavaScript)', [
      '<!-- Accordion with native open/close -->',
      '<details>',
      '  <summary>What is HTML5?</summary>',
      '  <p>HTML5 is the latest HTML standard with native multimedia and semantic tags.</p>',
      '</details>',
      '',
      '<!-- Native Modal Dialog -->',
      '<dialog id="termsModal">',
      '  <p>Please accept terms and conditions.</p>',
      '  <form method="dialog"><button>Close</button></form>',
      '</dialog>'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 7: Level 4 - Clean Architecture, Validation & Security
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(7, TOTAL_PAGES, 'LEVEL 4 - ARCHITECTURE, VALIDATION & SECURITY', 'LEVEL 4');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '29. Clean Project Architecture & Separation of Concerns', y);
    y = drawTextLines(page, [
      'Recommended Directory Structure:',
      '  project/ |-- index.html |-- pages/ (about.html, contact.html) |-- assets/ (images/, icons/) |-- css/ |-- js/',
      '* Keep HTML (structure), CSS (presentation), and JavaScript (interaction) strictly separated in separate files.',
      '* Maintain consistent indentation (2 or 4 spaces) throughout all documents.'
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '30. Maintainable Class Naming (BEM Methodology)', y);
    y = drawTextLines(page, [
      '* Name classes after what an element represents, not how it looks (e.g. "product-card" instead of "red-box").',
      '* Block: .product-card  |  Element: .product-card__title, .product-card__price  |  Modifier: .product-card--featured'
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '31. HTML Validation & Debugging Workflow', y);
    y = drawTextLines(page, [
      '4-Step Debugging Method when page layout looks strange:',
      '  1. Right-click and choose "Inspect" in Browser DevTools.',
      '  2. Check HTML nesting and verify all opened tags are correctly closed.',
      '  3. Validate page with official W3C Validator (validator.w3.org) to fix syntax errors.',
      '  4. Inspect CSS rules and check JavaScript Console for runtime errors.'
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '32. Performance-Aware HTML', y);
    y = drawTextLines(page, [
      '* Use appropriately sized images instead of huge originals.',
      '* Add loading="lazy" on below-the-fold images to defer network fetching until scrolled into view.',
      '* Set explicit width and height on images to eliminate Cumulative Layout Shift (CLS).'
    ], y);
    y -= 10;

    y = drawCalloutBox(page, '[SECURITY RULE]', 'Anything shipped to browser can be inspected by users. Never store secrets, passwords, or API keys in frontend code.', y, 'warning');

    y = drawSectionHeader(page, '34. Forms + Full-Stack Backend Thinking', y);
    y = drawTextLines(page, [
      'Frontend HTML Form -> HTTP Request (POST) -> Backend Node/Express Server -> Database -> JSON Response',
      '* After mastering HTML, learn CSS deeply, then JavaScript/DOM, then HTTP/APIs, then backend Node.js & databases.'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 8: HTML Master Cheat Sheet & Checklist
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(8, TOTAL_PAGES, 'HTML CHEAT SHEET & COMMON MISTAKES CHECKLIST', 'REFERENCE');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '35. Complete HTML Elements Master Reference', y);
    y = drawTable(page, ['Category', 'Core Elements', 'Primary Function'], [
      ['Structure', '<!DOCTYPE html>, <html>, <head>, <body>', 'Document root, standards mode & metadata'],
      ['Text', '<h1>-<h6>, <p>, <strong>, <em>, <mark>, <small>', 'Headings, paragraphs & typography semantics'],
      ['Links', '<a href="...">', 'Hyperlinks (internal, external, email, phone)'],
      ['Images', '<img src="..." alt="...">', 'Embed graphics with accessible text'],
      ['Lists', '<ul>, <ol>, <li>, <dl>, <dt>, <dd>', 'Bulleted, numbered & description lists'],
      ['Tables', '<table>, <caption>, <thead>, <tbody>, <th>, <td>', 'Tabular data with accessible headers'],
      ['Forms', '<form>, <label>, <input>, <select>, <button>', 'Interactive user input collection'],
      ['Semantic', '<header>, <nav>, <main>, <article>, <footer>', 'Semantic layout meaning for SEO & A11y'],
      ['Media', '<audio>, <video>, <source>, <iframe>', 'Native multimedia players & embeds'],
      ['Modern', '<svg>, <canvas>, <details>, <summary>, <dialog>', 'Vector graphics, accordions & native modals']
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '36. Top 10 Common Mistakes Checklist', y);
    y = drawTextLines(page, [
      '[ ] 1. Forgetting <!DOCTYPE html> declaration at top of file.',
      '[ ] 2. Using multiple identical "id" values on the same page.',
      '[ ] 3. Missing or empty "alt" text on meaningful informative images.',
      '[ ] 4. Using generic <div> everywhere instead of semantic elements (<header>, <nav>, <main>, <article>).',
      '[ ] 5. Using <table> elements for page layout styling.',
      '[ ] 6. Using repeated <br><br> tags to create vertical spacing instead of CSS margin/padding.',
      '[ ] 7. Using a link <a> for an action that should be a <button>.',
      '[ ] 8. Putting private secrets, database keys, or passwords in client-side code or comments.',
      '[ ] 9. Relying only on client-side form validation without backend validation.',
      '[ ] 10. Writing invalid, unclosed, or incorrectly nested HTML tags.'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 9: 30-Day Practice Plan & 7 Mini-Projects
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(9, TOTAL_PAGES, '30-DAY PRACTICE PLAN & 7 MINI-PROJECTS', 'PRACTICE');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '37. 30-Day Day-by-Day HTML Practice Curriculum', y);
    y = drawTable(page, ['Days', 'Curriculum Focus', 'Hands-On Build Deliverable'], [
      ['Days 1-3', 'Structure + Headings + Paragraphs', 'Create a personal intro page with clean skeleton'],
      ['Days 4-6', 'Links + Images + Relative Paths', 'Create a 3-page connected mini website'],
      ['Days 7-9', 'Lists + Accessible Tables', 'Create a student timetable + marks gradebook'],
      ['Days 10-13', 'Forms + Fieldsets + Validation', 'Create a comprehensive student registration page'],
      ['Days 14-16', 'Semantic HTML Layout', 'Create a multi-column tech blog layout'],
      ['Days 17-19', 'Audio + Video + Sandboxed iframes', 'Create a multimedia audio/video showcase page'],
      ['Days 20-22', 'Accessibility (WCAG) + SEO', 'Audit and enhance website for screen-readers & SEO'],
      ['Days 23-25', 'Inline SVG + Details + Dialog', 'Create an interactive FAQ accordion & modal'],
      ['Days 26-28', 'Architecture + W3C Validation', 'Refactor into clean folders and validate syntax'],
      ['Days 29-30', 'Final Capstone Project', 'Build a complete 5-page production website']
    ], y);
    y -= 10;

    y = drawSectionHeader(page, '38. 7 Mini-Projects: Basic -> Pro', y);
    y = drawTextLines(page, [
      '* Project 1 - Personal Profile (HTML Only): Heading, profile image with alt, bio, skills bullet list, social links.',
      '* Project 2 - College Timetable (HTML Only): Table, caption, headings with scope, accessible tabular layout.',
      '* Project 3 - Registration Form (HTML + Validation): Labels, text, email, select dropdown, radio, checkbox, required.',
      '* Project 4 - Restaurant Menu (HTML + CSS): Semantic sections, article cards, prices, food images, dietary badges.',
      '* Project 5 - Travel Agency (HTML + CSS + JS): Multi-page site, destination packages, booking form, FAQ accordion.',
      '* Project 6 - Student Portfolio (HTML + CSS + JS): Featured projects, skills showcase, contact inquiry form, responsive.',
      '* Project 7 - Full-Stack Starter (HTML + Node/Express): Frontend form -> HTTP API -> Database -> confirmation.'
    ], y);
  }

  // -------------------------------------------------------------
  // PAGE 10: Revision Q&A & Final Project Checklist
  // -------------------------------------------------------------
  {
    const { page } = createBasePage(10, TOTAL_PAGES, 'FINAL REVISION Q&A & LAUNCH CHECKLIST', 'MASTERY');
    let y = A4_HEIGHT - 100;

    y = drawSectionHeader(page, '39. Final Revision Questions & Answers', y);
    y = drawTextLines(page, [
      '1. What does HTML stand for? HyperText Markup Language.',
      '2. Tag vs Element: Tag is token (<p>); Element is opening tag + content + closing tag (<p>Hello</p>).',
      '3. Purpose of <!DOCTYPE html>: Informs the browser engine to render in standards mode instead of quirks mode.',
      '4. id vs class: "id" must be unique per document; "class" is reusable across multiple elements.',
      '5. Importance of alt: Screen-readers announce it to visually impaired users; browsers display it if image fails.',
      '6. Button vs Link: Use <a> for navigating to a new URL; use <button> for triggering actions.',
      '7. Semantic HTML: Tags that convey explicit meaning about structure to browsers, search engines, and screen-readers.',
      '8. Purpose of <label>: Connects accessible text to form inputs and enlarges clickable hit areas.',
      '9. Why not tables for layout: Breaks screen readers, complicates responsiveness, and produces bloated markup.',
      '10. Viewport meta tag: Directs mobile browsers to scale viewport dimensions to physical device width at 1:1 ratio.',
      '11. SVG vs Canvas: SVG is vector/DOM-based; Canvas is scriptable pixel raster drawing surface.',
      '12. Server-side validation: Client validation is easily bypassed via DevTools/curl; server must guarantee security.',
      '13. No secrets in HTML: Frontend code is public; anyone can view source in browser DevTools.',
      '14. Semantics maintainability: Developers can immediately recognize layout sections without deciphering classes.',
      '15. Multi-page organization: Use index.html entry point, /pages for subpages, and /assets for images/css/js.'
    ], y, { size: 7.5, gap: 11 });
    y -= 10;

    y = drawSectionHeader(page, '40. Final Production Launch Checklist (12 Points)', y);
    y = drawTextLines(page, [
      '[ ] 1. At least 5 pages connected with working links.  [ ] 2. Consistent header, nav and footer structure.',
      '[ ] 3. Semantic HTML used throughout.                  [ ] 4. All meaningful images have descriptive alt text.',
      '[ ] 5. All forms have labels and input types.         [ ] 6. Zero duplicate "id" attribute values.',
      '[ ] 7. Clean indentation and readable BEM naming.     [ ] 8. Mobile viewport meta tag included.',
      '[ ] 9. Unique descriptive page titles and meta.        [ ] 10. Code validated using W3C Validator.',
      '[ ] 11. Zero secrets/passwords in frontend code.      [ ] 12. CSS and JavaScript kept separate from HTML.'
    ], y, { size: 7.5, gap: 11 });
    y -= 12;

    y = drawCalloutBox(page, '[NEXT LEVEL READY]', 'Once you build the projects above without copying, move to CSS -> JavaScript -> DOM -> APIs -> Node.js -> React.', y, 'remember');
  }

  const pdfBytes = await doc.save();
  const outputPath = path.join(__dirname, '..', 'public', 'pdfs', 'html5-complete-notes.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`[OK] Successfully generated html5-complete-notes.pdf (${(pdfBytes.length / 1024).toFixed(1)} KB, 10 Pages)`);
}

buildHtml5NotebookPdf().catch(err => {
  console.error('Failed to generate HTML5 Notebook PDF:', err);
  process.exit(1);
});
