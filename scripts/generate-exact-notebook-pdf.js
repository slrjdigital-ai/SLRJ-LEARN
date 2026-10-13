const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateExactNotebookPdf() {
  const doc = await PDFDocument.create();

  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const courier = await doc.embedFont(StandardFonts.Courier);
  const courierBold = await doc.embedFont(StandardFonts.CourierBold);

  const W = 595.28; // A4 Width
  const H = 841.89; // A4 Height

  function newPage(pageNumber, totalPages = 10) {
    const page = doc.addPage([W, H]);

    // Outer notebook border
    page.drawRectangle({
      x: 25,
      y: 25,
      width: W - 50,
      height: H - 50,
      borderWidth: 1,
      borderColor: rgb(0.1, 0.1, 0.1),
      color: rgb(0.99, 0.99, 0.98),
    });

    // Top Header
    page.drawText('HTML HANDWRITTEN NOTEBOOK  |  Basic -> Intermediate -> Advanced -> Pro', {
      x: 35,
      y: H - 42,
      size: 8,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawLine({
      start: { x: 35, y: H - 46 },
      end: { x: W - 35, y: H - 46 },
      thickness: 0.8,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Bottom Footer
    page.drawLine({
      start: { x: 35, y: 46 },
      end: { x: W - 35, y: 46 },
      thickness: 0.8,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText(`Page ${pageNumber} of ${totalPages}`, {
      x: 35,
      y: 35,
      size: 7.5,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText('SLRJ Digital Learning Hub  *  Study - Write - Practice - Build - Revise', {
      x: W / 2 - 140,
      y: 35,
      size: 7.5,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });

    return page;
  }

  function drawDivider(page, y) {
    page.drawLine({
      start: { x: 35, y: y },
      end: { x: W - 35, y: y },
      thickness: 0.8,
      color: rgb(0.2, 0.2, 0.2),
    });
    return y - 12;
  }

  function drawBox(page, label, content, y, height = 30) {
    const boxX = 35;
    const boxW = W - 70;
    const boxY = y - height;

    page.drawRectangle({
      x: boxX,
      y: boxY,
      width: boxW,
      height: height,
      borderWidth: 1,
      borderColor: rgb(0.1, 0.1, 0.1),
      color: rgb(1, 1, 1),
    });

    let textY = y - 14;
    if (label) {
      page.drawText(label, {
        x: boxX + 8,
        y: textY,
        size: 8,
        font: helveticaBold,
        color: rgb(0.1, 0.1, 0.1),
      });
      textY -= 11;
    }

    if (content) {
      const isCode = content.includes('<') || content.includes('>');
      page.drawText(content, {
        x: boxX + 8,
        y: textY,
        size: 7.5,
        font: isCode ? courier : helvetica,
        color: rgb(0.15, 0.15, 0.15),
        maxWidth: boxW - 16,
      });
    }

    return boxY - 10;
  }

  function drawLines(page, lines, startY, options = {}) {
    let y = startY;
    const size = options.size || 8;
    const gap = options.gap || 11.5;
    const font = options.font || helvetica;
    const leftX = options.x || 35;

    for (const l of lines) {
      if (l === '') {
        y -= 4;
        continue;
      }
      page.drawText(l, {
        x: leftX,
        y: y,
        size: size,
        font: l.startsWith('LEVEL ') || l.startsWith('How to use') || l.startsWith('Learning progression') || l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.') || l.startsWith('4.') || l.startsWith('5.') || l.startsWith('6.') || l.startsWith('7.') || l.startsWith('8.') || l.startsWith('9.') || l.startsWith('10.') || l.startsWith('11.') || l.startsWith('12.') || l.startsWith('13.') || l.startsWith('14.') || l.startsWith('15.') || l.startsWith('16.') || l.startsWith('17.') || l.startsWith('18.') || l.startsWith('19.') || l.startsWith('20.') || l.startsWith('21.') || l.startsWith('22.') || l.startsWith('23.') || l.startsWith('24.') || l.startsWith('25.') || l.startsWith('26.') || l.startsWith('27.') || l.startsWith('28.') || l.startsWith('29.') || l.startsWith('30.') || l.startsWith('31.') || l.startsWith('32.') || l.startsWith('33.') || l.startsWith('34.') || l.startsWith('35.') || l.startsWith('36.') || l.startsWith('37.') || l.startsWith('38.') || l.startsWith('39.') || l.startsWith('40.') ? helveticaBold : font,
        color: rgb(0.1, 0.1, 0.1),
        maxWidth: W - leftX - 35,
      });
      y -= gap;
    }
    return y;
  }

  // Diagram 1: HTML Document Structure
  function drawDiagramDocumentStructure(page, y) {
    const cx = W / 2;

    page.drawText('HTML document structure', {
      x: cx - 75,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 22;

    // Box 1: <!DOCTYPE html>
    const b1W = 420;
    const b1H = 24;
    page.drawRectangle({
      x: cx - b1W / 2,
      y: y - b1H,
      width: b1W,
      height: b1H,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('<!DOCTYPE html>', {
      x: cx - 45,
      y: y - 16,
      size: 10,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    y -= b1H;

    // Arrow & Text
    y -= 14;
    page.drawText('Document type declaration', {
      x: cx - 65,
      y: y,
      size: 7.5,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    y -= 6;
    page.drawLine({ start: { x: cx, y: y }, end: { x: cx, y: y - 8 }, thickness: 1, color: rgb(0, 0, 0) });
    y -= 10;

    // Box 2: <html> .. </html>
    const b2W = 380;
    const b2H = 24;
    page.drawRectangle({
      x: cx - b2W / 2,
      y: y - b2H,
      width: b2W,
      height: b2H,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('<html> .. </html>', {
      x: cx - 42,
      y: y - 16,
      size: 10,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    y -= b2H;

    // Text & Branching
    y -= 14;
    page.drawText('Root element', {
      x: cx - 28,
      y: y,
      size: 7.5,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    y -= 6;

    // Child boxes: <head> and <body>
    const subW = 140;
    const subH = 24;
    const leftX = cx - 160;
    const rightX = cx + 20;

    // Head Box
    page.drawRectangle({
      x: leftX,
      y: y - subH,
      width: subW,
      height: subH,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('<head>', {
      x: leftX + 48,
      y: y - 16,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // Body Box
    page.drawRectangle({
      x: rightX,
      y: y - subH,
      width: subW,
      height: subH,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('<body>', {
      x: rightX + 48,
      y: y - 16,
      size: 9.5,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    y -= subH + 12;
    page.drawText('Metadata, title, links', {
      x: leftX + 22,
      y: y,
      size: 7.5,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText('Visible page content', {
      x: rightX + 26,
      y: y,
      size: 7.5,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });

    return y - 14;
  }

  // Diagram 2: Typical Form Flow
  function drawDiagramFormFlow(page, y) {
    const cx = W / 2;

    page.drawText('Typical form flow', {
      x: cx - 50,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 22;

    const steps = ['User input', '<form>', 'Validation', 'Submit', 'Server / API'];
    const boxW = 82;
    const boxH = 34;
    const gap = 18;
    const totalW = steps.length * boxW + (steps.length - 1) * gap;
    let currX = (W - totalW) / 2;

    for (let i = 0; i < steps.length; i++) {
      page.drawRectangle({
        x: currX,
        y: y - boxH,
        width: boxW,
        height: boxH,
        borderWidth: 1.5,
        borderColor: rgb(0, 0, 0),
        color: rgb(1, 1, 1),
      });

      page.drawText(steps[i], {
        x: currX + (boxW - helveticaBold.widthOfTextAtSize(steps[i], 8)) / 2,
        y: y - 20,
        size: 8,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      if (i < steps.length - 1) {
        // Arrow
        const arrowStartX = currX + boxW + 3;
        const arrowEndX = currX + boxW + gap - 3;
        const arrowY = y - boxH / 2;
        page.drawLine({
          start: { x: arrowStartX, y: arrowY },
          end: { x: arrowEndX, y: arrowY },
          thickness: 1.2,
          color: rgb(0, 0, 0),
        });
        page.drawLine({
          start: { x: arrowEndX - 3, y: arrowY + 2 },
          end: { x: arrowEndX, y: arrowY },
          thickness: 1.2,
          color: rgb(0, 0, 0),
        });
        page.drawLine({
          start: { x: arrowEndX - 3, y: arrowY - 2 },
          end: { x: arrowEndX, y: arrowY },
          thickness: 1.2,
          color: rgb(0, 0, 0),
        });
      }

      currX += boxW + gap;
    }

    return y - boxH - 14;
  }

  // Diagram 3: Semantic Page Layout
  function drawDiagramSemanticLayout(page, y) {
    const cx = W / 2;

    page.drawText('Semantic page layout', {
      x: cx - 60,
      y: y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 22;

    const totalW = 380;
    const startX = (W - totalW) / 2;

    // Header
    page.drawRectangle({
      x: startX,
      y: y - 22,
      width: totalW,
      height: 22,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('HEADER', { x: cx - 20, y: y - 15, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 26;

    // Nav
    page.drawRectangle({
      x: startX,
      y: y - 18,
      width: totalW,
      height: 18,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('NAV', { x: cx - 10, y: y - 13, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 22;

    // Main + Aside
    const mainW = 245;
    const asideW = 125;
    const gap = 10;
    const middleH = 70;

    page.drawRectangle({
      x: startX,
      y: y - middleH,
      width: mainW,
      height: middleH,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('MAIN', { x: startX + mainW / 2 - 12, y: y - 30, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });
    page.drawText('SECTION / ARTICLE', { x: startX + mainW / 2 - 42, y: y - 44, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });

    page.drawRectangle({
      x: startX + mainW + gap,
      y: y - middleH,
      width: asideW,
      height: middleH,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('ASIDE', { x: startX + mainW + gap + asideW / 2 - 14, y: y - 38, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });

    y -= middleH + 4;

    // Footer
    page.drawRectangle({
      x: startX,
      y: y - 18,
      width: totalW,
      height: 18,
      borderWidth: 1.5,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1),
    });
    page.drawText('FOOTER', { x: cx - 18, y: y - 13, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });

    return y - 28;
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 1: Intro, Goal, Learning Progression
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(1);
    let y = H - 65;

    page.drawText('HTML', { x: 35, y: y, size: 14, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 16;
    page.drawText('HANDWRITTEN NOTEBOOK', { x: 35, y: y, size: 14, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 14;
    page.drawText('Basic -> Intermediate -> Advanced -> Pro', { x: 35, y: y, size: 9.5, font: helvetica, color: rgb(0.2, 0.2, 0.2) });
    y -= 22;

    y = drawDiagramDocumentStructure(page, y);

    y = drawBox(page, 'GOAL', 'Build strong HTML fundamentals, write clean semantic pages, create forms and multimedia, understand accessibility/SEO, and become ready for CSS, JavaScript and React.', y, 32);

    page.drawText('Study - Write - Practice - Build - Revise', { x: 35, y: y, size: 8.5, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
    y -= 12;

    page.drawText('How to use these notes', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Read the concept first, then type the code yourself instead of only copying it.',
      'Underline or highlight the Remember boxes while revising.',
      'After each level, complete the practice questions and mini-project.',
      'Keep one folder called html-practice and create a separate file for every exercise.',
      'Use index.html as the main entry page for multi-page projects.'
    ], y);
    y -= 6;

    page.drawText('Learning progression', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Level                    | You will learn',
      'LEVEL 1 - BASIC          | Structure, tags, text, links, images, lists, tables',
      'LEVEL 2 - INTERMEDIATE   | Forms, semantic HTML, multimedia, entities, paths',
      'LEVEL 3 - ADVANCED       | Accessibility, SEO, responsive structure, SVG, Canvas, templates',
      'LEVEL 4 - PRO            | Clean architecture, validation, performance, security awareness, real projects'
    ], y, { size: 7.5, gap: 11 });
    y -= 4;

    y = drawBox(page, 'RULE', 'HTML is about structure and meaning. CSS controls appearance. JavaScript controls behavior.', y, 24);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 2: LEVEL 1 — Topics 1 to 4
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(2);
    let y = H - 65;

    page.drawText('LEVEL 1 - HTML BASICS', { x: 35, y: y, size: 10, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    page.drawText('1. What is HTML?', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'HTML - HyperText Markup Language. It is the standard markup language used to structure content on web pages.',
      'HyperText - Text that can contain links to other resources or pages.',
      'Markup - Special tags that tell the browser what a piece of content represents.'
    ], y);
    y -= 4;

    y = drawBox(page, 'First HTML example', '<h1>Hello World</h1><p>This is my first webpage.</p>', y, 24);
    y = drawBox(page, 'REMEMBER', 'HTML is NOT a programming language. It is a markup language.', y, 24);

    page.drawText('PRACTICE  (Try these without looking at the answer.)', { x: 35, y: y, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 10;
    y = drawLines(page, [
      '1. Write a heading containing your name.',
      '2. Create a paragraph describing your college.',
      '3. Explain in one line why HTML is called a markup language.',
      'Answer space:  ________________________________________________',
      '               ________________________________________________'
    ], y, { size: 7.5, gap: 10 });
    y -= 6;

    page.drawText('2. HTML document structure', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Standard HTML5 skeleton', '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Page</title></head><body><h1>Welcome!</h1></body></html>', y, 32);

    y = drawLines(page, [
      '<!DOCTYPE html> tells the browser to use modern HTML standards.',
      '<html> is the root element.',
      '<head> contains metadata and resources that are not normal page content.',
      '<title> becomes the browser-tab title.',
      '<body> contains the visible page content.',
      'lang="en" helps browsers, search engines and accessibility tools understand the language.'
    ], y, { size: 7.5, gap: 10.5 });
    y -= 4;

    y = drawBox(page, 'COMMON MISTAKE', 'Do not put normal visible content inside <head>. Put it inside <body>.', y, 24);

    page.drawText('3. Tags, elements and attributes', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Tag - A markup token such as <p> or </p>.',
      'Element - The complete structure, for example <p>Hello</p>.',
      'Attribute - Extra information placed inside an opening tag, for example <a href="...">.'
    ], y);
    y -= 4;

    y = drawBox(page, 'Attribute example', '<a href="https://example.com" target="_blank">Visit</a>', y, 24);
    y = drawBox(page, 'REMEMBER', 'Opening tag + content + closing tag = element. Some elements such as <img> are void elements and do not need a closing tag.', y, 28);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 3: LEVEL 1 — Topics 4 to 10
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(3);
    let y = H - 65;

    page.drawText('4. Text formatting', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Text elements', '<h1>Main heading</h1><h2>Subheading</h2><p>Normal paragraph.</p><strong>Important text</strong><em>Emphasized text</em><mark>Highlighted text</mark><small>Small text</small>H2O   x2', y, 28);

    y = drawLines(page, [
      '<h1> to <h6>: heading hierarchy.  |  <p>: paragraph.  |  <strong>: strong importance.  |  <em>: emphasis.',
      '<mark>: highlighted relevance.  |  <br>: line break (use sparingly).  |  <hr>: thematic break.'
    ], y);
    y -= 4;

    page.drawText('PRACTICE  (Try these without looking at the answer.)', { x: 35, y: y, size: 8, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 10;
    y = drawLines(page, [
      '1. Create an h1, h2 and h3 hierarchy.',
      '2. Write a paragraph using strong, em and mark.',
      '3. Write H2O and x2 using HTML.',
      'Answer space:  ________________________________________________'
    ], y, { size: 7.5, gap: 10 });
    y -= 6;

    page.drawText('5. Comments & 6. Links', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'HTML comment', '<!-- This comment is not displayed on the page -->', y, 22);
    y = drawBox(page, 'TIP', 'Comments are useful for explaining sections of your code, but never place passwords or secrets in comments.', y, 24);
    y = drawBox(page, 'Different link types', '<a href="about.html">About Us</a>  |  <a href="https://www.google.com">External</a>  |  <a href="mailto:hello@example.com">Email us</a>  |  <a href="tel:+911234567890">Call us</a>', y, 26);
    y = drawBox(page, 'REMEMBER', 'href is the destination. The text between <a> and </a> is the clickable content.', y, 22);

    page.drawText('7. Images & 8. File paths', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Image example', '<img src="images/photo.jpg" alt="A mountain landscape" width="600" height="400">', y, 24);
    y = drawLines(page, [
      'src = image path or URL. | alt = meaningful alternative text for accessibility. | Use width/height to avoid CLS.'
    ], y);
    y -= 4;

    y = drawBox(page, 'Relative paths', 'index.html | images/photo.jpg | pages/about.html  -->  From pages/about.html: <img src="../images/photo.jpg" alt="...">', y, 24);
    y = drawBox(page, 'THINK', '../ means "go up one folder". ./ means "current folder".', y, 22);

    page.drawText('9. Lists & 10. Tables', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'List types', '<ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>  |  <ol><li>Open VS Code</li><li>Write HTML</li></ol>  |  <dl><dt>HTML</dt><dd>Structures web content.</dd></dl>', y, 28);
    y = drawBox(page, 'Accessible table structure', '<table><caption>Student Marks</caption><thead><tr><th>Name</th><th>Marks</th></tr></thead><tbody><tr><td>Rahul</td><td>85</td></tr></tbody></table>', y, 28);

    y = drawLines(page, [
      '<table> creates table. | <caption> gives table a title. | <thead>, <tbody> group rows. | <th> is header; <td> is data.',
      'Use tables for tabular data, not for page layout.'
    ], y);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 4: LEVEL 2 — Forms, Inputs & Fieldset (Topics 11 to 13)
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(4);
    let y = H - 65;

    page.drawText('LEVEL 2 - INTERMEDIATE HTML', { x: 35, y: y, size: 10, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    page.drawText('11. Forms', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawDiagramFormFlow(page, y);

    y = drawBox(page, 'Basic form', '<form action="/submit" method="post"><label for="name">Name</label><input id="name" name="name" type="text" required><label for="email">Email</label><input id="email" name="email" type="email" required><button type="submit">Register</button></form>', y, 32);

    y = drawLines(page, [
      'label connects a description to a form control. | id should be unique on the page.',
      'name identifies submitted form data. | required asks the browser to require a value.',
      'method="get" is common for query/search forms; method="post" is used for sensitive/state changes.',
      'HTML validation improves UX but does not replace server-side validation.'
    ], y);
    y -= 8;

    page.drawText('12. Common input types', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Input types', '<input type="text"> <input type="email"> <input type="password"> <input type="number"> <input type="date"> <input type="time"> <input type="file"> <input type="radio" name="gender"> <input type="checkbox" name="skills"> <input type="submit" value="Send">', y, 28);
    y = drawBox(page, 'SECURITY', 'Never trust browser validation alone. A backend must validate and sanitize submitted data.', y, 24);

    page.drawText('13. Select, textarea and fieldset', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Form controls', '<label for="course">Course</label><select id="course" name="course"><option value="cse">CSE</option><option value="aiml">AI & ML</option></select> <label for="message">Message</label><textarea id="message" name="message" rows="5"></textarea> <fieldset><legend>Contact preference</legend><label><input type="radio" name="contact"> Email</label><label><input type="radio" name="contact"> Phone</label></fieldset>', y, 42);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 5: LEVEL 2 — Semantics, Media, Entities, Head (14 to 20)
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(5);
    let y = H - 65;

    page.drawText('14. Semantic HTML', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawDiagramSemanticLayout(page, y);

    y = drawBox(page, 'Semantic layout', '<header>...</header><nav>...</nav><main><section><article>...</article></section><aside>...</aside></main><footer>...</footer>', y, 26);
    y = drawBox(page, 'PRO HABIT', 'Prefer semantic elements when they accurately describe the content. This improves structure, accessibility and maintainability.', y, 26);

    page.drawText('15. div and span & 16. Audio and video', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'div - A generic block-level container used when no more meaningful semantic element fits.',
      'span - A generic inline container used when no more meaningful inline element fits.'
    ], y);
    y -= 4;

    y = drawBox(page, 'Generic containers', '<div class="card"><h2>Travel Package</h2><p>Explore <span class="highlight">Goa</span>.</p></div>', y, 24);
    y = drawBox(page, 'Multimedia', '<audio controls><source src="music.mp3" type="audio/mpeg">Your browser does not support audio.</audio> <video controls width="640"><source src="intro.mp4" type="video/mp4">Your browser does not support video.</video>', y, 32);

    page.drawText('17. iframe, 18. Entities, 19. Head, 20. Global Attributes', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Embedded content', '<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Video player" width="560" height="315" allowfullscreen></iframe>', y, 26);
    y = drawBox(page, 'Common entities', '&lt; -> <  |  &gt; -> >  |  &amp; -> &  |  &nbsp; -> space  |  &copy; -> (C)  |  &reg; -> (R)', y, 24);
    y = drawBox(page, 'Useful head elements', '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Portfolio."><title>Portfolio</title><link rel="stylesheet" href="style.css"></head>', y, 32);
    y = drawBox(page, 'Global attributes', '<section id="about" class="card" title="About section"><p lang="en">Hello!</p></section><div data-user-id="42">Profile</div>', y, 24);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 6: LEVEL 3 — Advanced HTML (Topics 21 to 28)
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(6);
    let y = H - 65;

    page.drawText('LEVEL 3 - ADVANCED HTML', { x: 35, y: y, size: 10, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    page.drawText('21. Accessibility fundamentals', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Use semantic elements before reaching for ARIA. | Every informative image needs useful alt text; decorative images use alt="".',
      'Every form control should have an associated label. | Maintain a logical heading hierarchy.',
      'Make interactive controls keyboard accessible. | Use buttons for actions and links for navigation.',
      'Do not communicate important information using color alone.'
    ], y);
    y -= 4;

    y = drawBox(page, 'Accessible form and image', '<label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email"><img src="college-building.jpg" alt="Main entrance of the college">', y, 26);

    page.drawText('22. Buttons vs links & 23. SEO-friendly HTML', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Choosing the right element', '<!-- Navigation --><a href="/dashboard">Open dashboard</a>  |  <!-- Action --><button type="button">Add to cart</button>', y, 24);
    y = drawBox(page, 'SIMPLE RULE', 'If it takes the user somewhere -> link. If it makes something happen -> button.', y, 22);
    y = drawBox(page, 'SEO-oriented head + heading', '<title>Best Travel Packages in Maharashtra | TravelGo</title><meta name="description" content="Explore curated travel packages."><h1>Travel Packages in Maharashtra</h1>', y, 26);

    page.drawText('24. Responsive, 25. SVG, 26. Canvas, 27. Details, 28. Dialog', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'HTML foundation for responsive CSS', '<meta name="viewport" content="width=device-width, initial-scale=1.0"><main><section class="hero"><h1>Explore More</h1><p>Travel smart.</p></section></main>', y, 26);
    y = drawBox(page, 'Inline SVG', '<svg width="120" height="80" viewBox="0 0 120 80" role="img" aria-label="Blue circle"><circle cx="60" cy="40" r="30" fill="blue" /></svg>', y, 24);
    y = drawBox(page, 'Canvas element', '<canvas id="myCanvas" width="400" height="200">Your browser does not support canvas.</canvas>', y, 22);
    y = drawBox(page, 'Expandable native UI', '<details><summary>What is HTML?</summary><p>HTML structures content on the web.</p></details>', y, 22);
    y = drawBox(page, 'Dialog element', '<dialog id="terms"><p>Please read the terms.</p><button type="button">Close</button></dialog>', y, 22);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 7: LEVEL 4 — Pro HTML (Topics 29 to 34)
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(7);
    let y = H - 65;

    page.drawText('LEVEL 4 - PRO / PROFESSIONAL HTML', { x: 35, y: y, size: 10, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    page.drawText('29. Clean HTML architecture', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Recommended project structure', 'project/ |-- index.html |-- pages/ (about.html, contact.html) |-- assets/ (images/, icons/) |-- css/ (style.css) \\-- js/ (script.js)', y, 26);

    y = drawLines(page, [
      'Keep HTML, CSS and JavaScript responsibilities separate. | Use consistent indentation. | Choose meaningful class names.',
      'Avoid deeply nested markup when a simpler structure works. | Keep repeated navigation/footer structures consistent.'
    ], y);
    y -= 4;

    page.drawText('30. Maintainable class naming (BEM Philosophy)', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'Readable component-like naming', '<article class="product-card"><img class="product-card__image" src="coffee.jpg" alt="Latte"><div class="product-card__content"><h2 class="product-card__title">Latte</h2><p class="product-card__price">149</p></div></article>', y, 32);
    y = drawBox(page, 'TIP', 'A class name should tell you what an element represents, not how it looks. Prefer product-card over red-box.', y, 24);

    page.drawText('31. HTML validation, 32. Performance, 33. Security, 34. Full-Stack', { x: 35, y: y, size: 9, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawBox(page, 'DEBUG METHOD', 'When page looks strange: inspect element -> check HTML nesting -> validate with W3C -> check CSS/JS.', y, 24);
    y = drawBox(page, 'Performance-aware image', '<img src="gallery.jpg" alt="Beach at sunset" width="1200" height="800" loading="lazy">', y, 24);
    y = drawBox(page, 'GOLDEN RULE', 'Anything shipped to the browser can be inspected by the user. Never hide secrets in HTML, CSS or client-side JavaScript.', y, 26);
    y = drawBox(page, 'From HTML to full-stack thinking', '<!-- Frontend --><form action="/api/register" method="post"><label for="name">Name</label><input id="name" name="name" required><button type="submit">Create account</button></form> --> Backend: Browser -> HTTP request -> Node.js/Express -> Database', y, 34);
    y = drawBox(page, 'NEXT STEP', 'After HTML, learn CSS deeply, then JavaScript, then HTTP/APIs, then backend (Node.js/Express) and a database.', y, 24);
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 8: 35. Cheat Sheet & 36. Common Mistakes Checklist
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(8);
    let y = H - 65;

    page.drawText('35. HTML Cheat Sheet', { x: 35, y: y, size: 9.5, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Category   | Important elements',
      'Structure  | <!DOCTYPE html>, <html>, <head>, <body>',
      'Text       | <h1>...<h6>, <p>, <strong>, <em>, <mark>, <br>, <hr>',
      'Links      | <a href="...">',
      'Images     | <img src="..." alt="...">',
      'Lists      | <ul>, <ol>, <li>, <dl>, <dt>, <dd>',
      'Tables     | <table>, <caption>, <thead>, <tbody>, <tr>, <th>, <td>',
      'Forms      | <form>, <label>, <input>, <select>, <option>, <textarea>, <button>',
      'Semantic   | <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>',
      'Media      | <audio>, <video>, <source>, <iframe>',
      'Advanced   | <svg>, <canvas>, <details>, <summary>, <dialog>, data-*'
    ], y, { size: 7.5, gap: 11 });
    y -= 10;

    page.drawText('36. Common mistakes checklist', { x: 35, y: y, size: 9.5, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      '[ ] Forgetting <!DOCTYPE html>.',
      '[ ] Using multiple identical id values.',
      '[ ] Missing alt text on meaningful images.',
      '[ ] Using <div> everywhere instead of semantic elements.',
      '[ ] Using tables for page layout.',
      '[ ] Using <br> repeatedly to create spacing.',
      '[ ] Using a link for an action that should be a button.',
      '[ ] Putting secrets in client-side code.',
      '[ ] Relying only on client-side validation.',
      '[ ] Writing invalid or incorrectly nested HTML.'
    ], y, { size: 8, gap: 13 });
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 9: 37. 30-Day Practice Plan & 38. Mini-Projects
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(9);
    let y = H - 65;

    page.drawText('37. 30-day HTML practice plan', { x: 35, y: y, size: 9.5, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Days         | Focus                                         | Build',
      'Days 1-3     | Structure + headings + paragraphs + comments  | Create a personal intro page',
      'Days 4-6     | Links + images + paths                        | Create a 3-page mini site',
      'Days 7-9     | Lists + tables                                | Create a student timetable + marks table',
      'Days 10-13   | Forms + validation                            | Create a registration page',
      'Days 14-16   | Semantic HTML                                 | Create a blog layout',
      'Days 17-19   | Audio + video + iframe                        | Create a media page',
      'Days 20-22   | Accessibility + SEO                           | Improve the blog for real users',
      'Days 23-25   | SVG + details + dialog                        | Create an FAQ/product page',
      'Days 26-28   | Architecture + validation                     | Clean and validate your project',
      'Days 29-30   | Final project                                 | Build a complete multi-page website'
    ], y, { size: 7.5, gap: 11 });
    y -= 10;

    page.drawText('38. Mini-projects - Basic -> Pro', { x: 35, y: y, size: 9.5, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      'Project 1 - Personal Profile | Stack: HTML only | Build: Heading, image, bio, skills list, links.',
      'Project 2 - College Timetable | Stack: HTML only | Build: Table, caption, headings and accessible structure.',
      'Project 3 - Registration Form | Stack: HTML + validation | Build: Labels, inputs, select, checkbox, radio, required.',
      'Project 4 - Restaurant Menu | Stack: HTML + CSS | Build: Semantic sections, cards, prices, images and navigation.',
      'Project 5 - Travel Agency | Stack: HTML + CSS + JS | Build: Multi-page site, packages, booking form, gallery and FAQ.',
      'Project 6 - Student Portfolio | Stack: HTML + CSS + JS | Build: Projects, skills, contact form, responsive layout.',
      'Project 7 - Full-stack starter | Stack: HTML + CSS + JS + Node.js | Build: Frontend form -> API -> database -> response.'
    ], y, { size: 7.5, gap: 12 });
  }

  // ─────────────────────────────────────────────────────────────
  // PAGE 10: 39. Revision Questions & 40. Final Project Checklist
  // ─────────────────────────────────────────────────────────────
  {
    const page = newPage(10);
    let y = H - 65;

    page.drawText('39. Final revision questions', { x: 35, y: y, size: 9.5, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      '1. What does HTML stand for? (HyperText Markup Language)',
      '2. What is the difference between a tag and an element? (Tag is syntax token; element is opening tag + content + closing tag)',
      '3. What is the purpose of <!DOCTYPE html>? (Tells the browser engine to render in modern standards mode)',
      '4. What is the difference between id and class? (id is unique per page; class is reusable across elements)',
      '5. Why is alt important on images? (Crucial for accessibility screen-readers and displays when network fails)',
      '6. When should you use a button instead of a link? (Link if navigating to URL; Button if making an action happen)',
      '7. What is semantic HTML? (Using elements that convey structural meaning to browsers and search bots)',
      '8. What is the purpose of the label element in a form? (Connects label to input and enlarges clickable hit area)',
      '9. Why should tables not be used for page layout? (Ruins accessibility, complicated responsive design)',
      '10. What does the viewport meta tag do? (Directs mobile browsers to scale viewport to device width at 1:1)',
      '11. What is the difference between SVG and Canvas? (SVG is vector/DOM; Canvas is raster/scriptable)',
      '12. Why is server-side validation still necessary? (Client validation can easily be bypassed by users in DevTools)',
      '13. Why should secrets never be placed in HTML? (Frontend code is public; visible via View Source and DevTools)',
      '14. How does semantic HTML help accessibility and maintainability? (Clear hierarchy, standardized hooks)',
      '15. How would you organize a multi-page HTML project? (index.html at root, pages/ for subpages, assets/ for media)'
    ], y, { size: 7, gap: 9.8 });
    y -= 8;

    page.drawText('40. Final project checklist', { x: 35, y: y, size: 9.5, font: helveticaBold, color: rgb(0, 0, 0) });
    y -= 4;
    y = drawDivider(page, y);

    y = drawLines(page, [
      '[ ] At least 5 pages connected with working links          [ ] Consistent header/navigation/footer',
      '[ ] Semantic HTML used where appropriate                    [ ] All meaningful images have useful alt text',
      '[ ] Forms have labels and appropriate input types          [ ] No duplicate id values',
      '[ ] Clean indentation and readable naming                  [ ] Mobile viewport meta tag included',
      '[ ] Page titles and descriptions added                     [ ] HTML validated and obvious errors fixed',
      '[ ] No passwords/API keys/secrets in frontend files        [ ] CSS and JavaScript kept separate from HTML'
    ], y, { size: 7.5, gap: 10.5 });
    y -= 10;

    y = drawBox(page, 'YOU ARE READY FOR THE NEXT LEVEL', 'Once you can build the projects above without copying the examples, move to CSS -> JavaScript -> DOM -> APIs -> Node.js/Express -> Database -> React.', y, 26);

    page.drawText('KEEP BUILDING.', { x: 35, y: y - 2, size: 8.5, font: helveticaBold, color: rgb(0, 0, 0) });
    page.drawText('Learn the tag -> understand the meaning -> type the code -> build something real.', { x: 125, y: y - 2, size: 8, font: helvetica, color: rgb(0.2, 0.2, 0.2) });
  }

  const pdfBytes = await doc.save();
  const outputPath = path.join(__dirname, '..', 'public', 'pdfs', 'html5-complete-notes.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`[OK] Exact Handwritten Notebook PDF created successfully at: ${outputPath} (${(pdfBytes.length / 1024).toFixed(1)} KB, 10 Pages)`);
}

generateExactNotebookPdf().catch(err => {
  console.error('Failed to generate exact PDF:', err);
  process.exit(1);
});
