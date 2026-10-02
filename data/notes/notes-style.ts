export const docNotesStyle = `
<style>
.doc-notes-container {
  color: #172033;
  font-family: Arial, "Segoe UI", Roboto, sans-serif;
  line-height: 1.7;
}
.doc-notes-container * {
  box-sizing: border-box;
}
.doc-notes-container .book {
  max-width: 1100px;
  margin: 10px auto 40px;
  padding: 0;
}
.doc-notes-container .page {
  background: #ffffff;
  margin: 28px 0;
  padding: 42px 48px;
  border: 1px solid #dce3ef;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  color: #172033;
}
.doc-notes-container .cover {
  background: linear-gradient(135deg, #101a35, #172b55);
  color: white;
  text-align: center;
  padding: 60px 30px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.doc-notes-container .cover h1 {
  font-size: 42px;
  margin: 0 0 12px;
  color: #ffffff;
  font-weight: 800;
}
.doc-notes-container .cover p {
  font-size: 19px;
  color: #dbe7ff;
  margin: 8px 0;
}
.doc-notes-container h2 {
  font-size: 28px;
  color: #173d7a;
  border-bottom: 3px solid #dbe7f8;
  padding-bottom: 8px;
  margin-top: 36px;
  font-weight: 800;
}
.doc-notes-container h3 {
  font-size: 22px;
  color: #2256a0;
  margin-top: 22px;
  font-weight: 700;
}
.doc-notes-container p, 
.doc-notes-container li {
  font-size: 17px;
  color: #172033;
}
.doc-notes-container ul,
.doc-notes-container ol {
  margin: 12px 0 18px 24px;
  padding: 0;
}
.doc-notes-container li {
  margin-bottom: 6px;
}
.doc-notes-container code {
  background: #eef3fa;
  padding: 2px 7px;
  border-radius: 5px;
  color: #163b72;
  font-family: Consolas, "Courier New", monospace;
  font-size: 15px;
}
.doc-notes-container pre {
  background: #101827;
  color: #eaf1ff;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  font: 14px/1.6 Consolas, "Courier New", monospace;
  margin: 18px 0;
  box-shadow: inset 0 0 0 1px #ffffff15;
}
.doc-notes-container pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}
.doc-notes-container .note,
.doc-notes-container .tip,
.doc-notes-container .warning {
  padding: 14px 18px;
  border-radius: 10px;
  margin: 18px 0;
}
.doc-notes-container .note {
  background: #fff7cc;
  border-left: 6px solid #eab308;
  color: #713f12;
}
.doc-notes-container .tip {
  background: #e4f8eb;
  border-left: 6px solid #16a34a;
  color: #14532d;
}
.doc-notes-container .warning {
  background: #ffe7ec;
  border-left: 6px solid #e11d48;
  color: #881337;
}
.doc-notes-container .diagram {
  background: #f7faff;
  border: 2px dashed #9db7dc;
  border-radius: 14px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
}
.doc-notes-container .row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.doc-notes-container .box {
  background: white;
  border: 2px solid #3973d3;
  border-radius: 10px;
  padding: 12px 18px;
  font-weight: bold;
  min-width: 120px;
  color: #173d7a;
}
.doc-notes-container .arrow {
  font-size: 26px;
  color: #3566a7;
}
.doc-notes-container table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
  font-size: 15px;
  background: white;
  color: #172033;
  border-radius: 8px;
  overflow: hidden;
}
.doc-notes-container th,
.doc-notes-container td {
  border: 1px solid #c8d5e8;
  padding: 11px 14px;
  vertical-align: top;
  color: #172033;
}
.doc-notes-container th {
  background: #e8f0fc;
  text-align: left;
  color: #173d7a;
  font-weight: 700;
}
.doc-notes-container .tag {
  display: inline-block;
  background: #fff0a8;
  color: #222;
  padding: 5px 14px;
  border-radius: 20px;
  font-weight: bold;
}
.doc-notes-container .small {
  font-size: 14px;
  color: #5c6c84;
}
@media(max-width: 768px) {
  .doc-notes-container .page {
    padding: 28px 20px;
  }
  .doc-notes-container .cover h1 {
    font-size: 32px;
  }
  .doc-notes-container h2 {
    font-size: 23px;
  }
  .doc-notes-container p, 
  .doc-notes-container li {
    font-size: 15px;
  }
  .doc-notes-container pre {
    font-size: 13px;
    padding: 14px;
  }
}
</style>
`;
