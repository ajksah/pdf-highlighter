// App.jsx
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import myFile from './static/sample.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

function App() {
/*   const myFile =replace myFile import with this if u have a url of pdf instead */


  /* ───────────────────────── STATE ───────────────────────── */
  const [numPages, setNumPages]   = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [popupPos, setPopupPos]   = useState({ visible: false, x: 0, y: 0 });
  const [annotations, setAnnotations] = useState([]);
  const [commentMode, setCommentMode] = useState(false);
 const [commentText, setCommentText] = useState('');
const [showCommentBox, setShowCommentBox] = useState(false);

const [activeComment, setActiveComment] = useState(null);


  const selectionRangeRef = useRef(null);           // always holds a DOM Range
  const commentPosRef     = useRef({ x: 0, y: 0 }); // where to pop the comment UI

  /* ──────────────────── DOCUMENT LIFECYCLE ────────────────── */
  const onDocumentLoad = ({ numPages }) => {
    console.log('✅ PDF loaded – pages:', numPages);
    setNumPages(numPages);
  };
  const onPageLoadSuccess = (p) => console.log(`✅ Page ${p.pageNumber} rendered`);
  const onPageLoadError   = (e) => console.error('❌ Page render error:', e);

  /* ───────────────────── TEXT  SELECTION ──────────────────── */
  const handleMouseUp = () => {
    const sel = window.getSelection();
    const text = sel?.toString().trim();

    if (!text) return; // nothing selected
    console.log('📌 MouseUp selection →', text);

    const range = sel.getRangeAt(0);
    selectionRangeRef.current = range; // **store the real Range**
    const rect = range.getBoundingClientRect();

    setSelectedText(text);
    setPopupPos({
      visible: true,
      x: rect.right + window.scrollX,
      y: rect.top + window.scrollY - 6,
    });
  };

  /* ───────────────────── HIGHLIGHT FLOW ───────────────────── */
  const applyHighlight = (color, keepRange = false) => {
    try {
      const rangeRef = selectionRangeRef.current;
      if (!rangeRef || typeof rangeRef.surroundContents !== 'function') {
        console.error('❌ applyHighlight >> invalid Range:', rangeRef);
        return;
      }

      const range = rangeRef.cloneRange();       // work on a copy
      console.log('🖍️  Cloned range text:', range.toString());

      const span = document.createElement('span');
      span.style.backgroundColor = rgba(color);
      span.style.padding = '1px 2px';
      span.style.borderRadius = '2px';

      range.surroundContents(span);              // mutate DOM
      const { left, top } = span.getBoundingClientRect();
      const highlight = {
        text: range.toString(),
        color,
        comment: null,
        x: left + window.scrollX,
        y: top + window.scrollY,
      };

      setAnnotations((prev) => [...prev, highlight]);
      console.log('🌈 Highlight saved:', highlight);

        // cleanup UI
      setPopupPos({ visible: false, x: 0, y: 0 });
      if (!keepRange) {
  window.getSelection().removeAllRanges();
  selectionRangeRef.current = null;
}

      setSelectedText('');
    } catch (err) {
      console.error('🚨 applyHighlight error:', err);
    }
  };

  /* ─────────────────── DOUBLE‑CLICK  → COMMENT MODE ───────── */
  const handleDoubleClick = () => {
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    if (!text) return;

    const range = sel.getRangeAt(0);
    selectionRangeRef.current = range;           // keep the Range
    const rect = range.getBoundingClientRect();
    commentPosRef.current = {
      x: rect.right + window.scrollX,
      y: rect.top + window.scrollY - 10,
    };

    setSelectedText(text);
    setCommentMode(true);
    setCommentText('');
    setPopupPos({ visible: false });
    console.log('💬 Comment mode ON for:', text);
    window.getSelection().removeAllRanges();
  };

  /* ───────────────────── COMMENT SUBMIT ───────────────────── */
  const submitComment = () => {
    const range = selectionRangeRef.current;
    if (!range) {
      console.warn('🧐 No range for comment');
      return;
    }

    // attach icon just after the highlighted span or text
    const icon = document.createElement('span');
  icon.textContent = '💬';
icon.style.marginLeft = '4px';
icon.style.fontSize = '14px';
icon.style.color = '#555';
icon.style.verticalAlign = 'middle';

// Store the comment in a data attribute
icon.setAttribute('data-comment', commentText);

// On click, show the comment in an alert box or toggle UI
icon.onclick = () => {
  const msg = icon.getAttribute('data-comment');
  setActiveComment(msg); // optional for displaying in a UI
  alert(`💬 Comment:\n\n${msg}`); // basic approach
};

    icon.style.cursor = 'pointer';
    icon.style.userSelect = 'none';
    icon.style.fontSize   = '12px';
    icon.style.marginLeft = '4px';
    range.endContainer.parentElement.appendChild(icon);

    const { left, top } = range.getBoundingClientRect();
    const note = {
      text: selectedText,
      color: 'yellow',
      comment: commentText,
      x: left + window.scrollX,
      y: top + window.scrollY,
    };

    setAnnotations((prev) => [...prev, note]);
    console.log('📝 Comment saved:', note);

    // reset UI
   setCommentMode(false);
setShowCommentBox(false);
    setCommentText('');
    selectionRangeRef.current = null;
    setSelectedText('');
  };

  /* ─────────────── LOG ANNOTATION STATE ON CHANGE ─────────── */
  useEffect(() => {
    if (annotations.length) {
      console.log('📦 annotations now =', annotations);
    }
  }, [annotations]);

  /* ───────────────────────── HELPERS ──────────────────────── */
  const rgba = (c) => {
    switch (c) {
      case 'yellow': return 'rgba(255,255,0,0.4)';
      case 'red':    return 'rgba(255,0,0,0.3)';
      case 'blue':   return 'rgba(0,0,255,0.3)';
      default:       return 'rgba(0,0,0,0.1)';
    }
  };

  /* ─────────────────────────── UI ─────────────────────────── */
  return (
    <div
      className="App"
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      <h2>PDF Annotator</h2>

      {selectedText && (
        <p className="info-box">
          📝 <strong>Selected:</strong> {selectedText}
        </p>
      )}

      {/* highlight colour popup (single‑click) */}
      {popupPos.visible && (
        <div
          className="color-popup"
          style={{ top: popupPos.y, left: popupPos.x }}
        >
          {['blue', 'yellow', 'red'].map((c) => (
            <span
              key={c}
              className="swatch"
              style={{ backgroundColor: c }}
          onClick={() => applyHighlight(c, true)}   
              title={`Highlight ${c}`}
            />
          ))}
        </div>
      )}

      {/* comment UI (double‑click) */}
      {commentMode && (
        <div
          className="comment-box"
          style={{ top: commentPosRef.current.y, left: commentPosRef.current.x }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          {['blue', 'yellow', 'red'].map((c) => (
  <span
    key={c}
    className="swatch"
    style={{ backgroundColor: c }}
    onClick={() => applyHighlight(c, true)} // ⬅ KEEP RANGE ALIVE
    title={`Highlight ${c}`}
  />
))}

            <button
              style={{
                padding: '2px 8px',
                fontSize: 13,
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            onClick={() => setShowCommentBox(true)}

            >
              💬 Comment
            </button>
          </div>

         {showCommentBox && (
  <>
    <textarea
      placeholder="Add a comment..."
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
    />
    <button onClick={submitComment}>💾 Save Comment</button>
  </>
)}

        </div>
      )}

      {/* PDF itself */}
      <Document file={myFile} onLoadSuccess={onDocumentLoad}>
        {Array.from({ length: numPages ?? 0 }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            renderAnnotationLayer={false}
            renderMode="canvas"
            onLoadSuccess={onPageLoadSuccess}
            onRenderError={onPageLoadError}
          />
        ))}
      </Document>
    </div>
  );
}

export default App;
