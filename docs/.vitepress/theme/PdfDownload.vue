<template>
  <Teleport to="body">
    <button
      v-if="showButton"
      @click="downloadPdf"
      :disabled="loading"
      class="pdf-btn"
      :class="{ loading }"
      title="Download this page as PDF"
    >
      <span v-if="!loading">⬇ PDF</span>
      <span v-else class="pdf-spinner">⏳</span>
    </button>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route  = useRoute()
const loading = ref(false)
const showButton = ref(false)

// ── Only show on unit / question pages ─────────────────────────────────────
function checkRoute() {
  const p = route.path
  showButton.value = p.includes('/units/') || p.includes('/questions/')
}
onMounted(checkRoute)
watch(() => route.path, checkRoute)

// ── Build the raw GitHub URL from the current VitePress route ──────────────
// route.path  →  /st/units/unit-1/p1   (no extension, no base)
// raw URL     →  https://raw.githubusercontent.com/kuntalojha/st/main/docs/st/units/unit-1/p1.md
function getRawUrl() {
  const GITHUB_USER   = 'kuntalojha'
  const GITHUB_REPO   = 'st'
  const GITHUB_BRANCH = 'main'

  // window.location.pathname = /st/st/units/unit-1/p1.html
  // remove leading /st/ → st/units/unit-1/p1.html
  // remove .html → st/units/unit-1/p1
  // result: docs/st/units/unit-1/p1.md ✅
  const cleanPath = window.location.pathname
    .replace(/^\/st\//, '')
    .replace(/\.html$/, '')

  return `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/docs/${cleanPath}.md`
}

// ── Load external scripts on demand ───────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload  = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

// ── Main download function ─────────────────────────────────────────────────
async function downloadPdf() {
  loading.value = true

  try {
    // Load dependencies
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js')
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')

    // 1. Fetch raw markdown from GitHub
    const rawUrl  = getRawUrl()
    const res     = await fetch(rawUrl)
    if (!res.ok) throw new Error(`Could not fetch markdown: ${res.status}`)
    let markdown  = await res.text()

    // Strip frontmatter (--- ... ---)
    markdown = markdown.replace(/^---[\s\S]*?---\n/, '').trim()

    // 2. Parse markdown into tokens
    const md     = window.markdownit({ html: false, breaks: true })
    const tokens = md.parse(markdown, {})

    // 3. Build PDF using jsPDF
    const { jsPDF } = window.jspdf
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

    // Page dimensions
    const PAGE_W      = 210
    const PAGE_H      = 297
    const MARGIN_L    = 16
    const MARGIN_R    = 16
    const MARGIN_TOP  = 32   // space for header
    const MARGIN_BOT  = 22   // space for footer
    const CONTENT_W   = PAGE_W - MARGIN_L - MARGIN_R
    let   cursorY     = MARGIN_TOP
    let   pageNum     = 1

    const COLLEGE = 'SHARAD INSTITUTE OF TECHNOLOGY COLLEGE OF ENGINEERING'
    const SUBJECT = 'Software Testing - Study Notes'
    const AUTHOR  = 'Kuntal Ojha - kuntalojha.github.io'
    // Strip emojis from title — jsPDF helvetica can't render them
    const pageTitle = (document.title?.replace(' | Software Testing', '').trim() || 'Notes')
      .replace(/[\u{1F000}-\u{1FFFF}|\u{2600}-\u{27FF}|\u{FE00}-\u{FEFF}]/gu, '').trim()
    const lastUpdated = document.querySelector('.VPLastUpdated span')?.textContent?.trim() || 
  new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
const today = `Last updated: ${lastUpdated}`
    const filename = pageTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.pdf'

    // ── Draw header ─────────────────────────────────────────────────────────
    function drawHeader() {
      // College name - left
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(58, 71, 196)   // indigo
      doc.text(COLLEGE, MARGIN_L, 10)
      
      // Author - left below
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      doc.setTextColor(30, 41, 59)
      doc.text('- Mr. KUNTAL OJHA', MARGIN_L, 19)

      // Subject - left below college
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(100, 116, 139)
      doc.text(SUBJECT, MARGIN_L, 15)

      // Page title - right top
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(100, 116, 139)
      doc.text(pageTitle, PAGE_W - MARGIN_R, 10, { align: 'right' })

      // Date - right below
      doc.text(today, PAGE_W - MARGIN_R, 15, { align: 'right' })
      
      // Divider line
      doc.setDrawColor(99, 102, 241)
      doc.setLineWidth(0.5)
      doc.line(MARGIN_L, 22, PAGE_W - MARGIN_R, 22)
    }

    // ── Draw footer ─────────────────────────────────────────────────────────
    function drawFooter(pNum, total) {
      // Line
      doc.setDrawColor(99, 102, 241)
      doc.setLineWidth(0.4)
      doc.line(MARGIN_L, PAGE_H - 14, PAGE_W - MARGIN_R, PAGE_H - 14)

      // Copyright left
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(100, 116, 139)
      doc.text(`© ${new Date().getFullYear()} ${AUTHOR}`, MARGIN_L, PAGE_H - 9)

      // Page number right
      doc.text(`Page ${pNum} of ${total}`, PAGE_W - MARGIN_R, PAGE_H - 9, { align: 'right' })
    }

    // ── New page helper ──────────────────────────────────────────────────────
    function addPage() {
      doc.addPage()
      pageNum++
      cursorY = MARGIN_TOP
      drawHeader()
    }

    // ── Check space remaining ────────────────────────────────────────────────
    function ensureSpace(needed) {
      if (cursorY + needed > PAGE_H - MARGIN_BOT) {
        addPage()
      }
    }

    // ── Text helpers ─────────────────────────────────────────────────────────
    function addText(text, opts = {}) {
      const {
        fontSize   = 10,
        fontStyle  = 'normal',
        color      = [15, 23, 42],
        indent     = 0,
        lineGap    = 1.5,
        maxWidth   = CONTENT_W,
      } = opts

      doc.setFont('helvetica', fontStyle)
      doc.setFontSize(fontSize)
      doc.setTextColor(...color)

      const lines = doc.splitTextToSize(text, maxWidth - indent)
      const lineH = fontSize * 0.4 + lineGap

      ensureSpace(lines.length * lineH + 2)
      doc.text(lines, MARGIN_L + indent, cursorY)
      cursorY += lines.length * lineH
    }

    function addSpacing(mm = 3) {
      cursorY += mm
    }

    // ── Sanitize text: replace unsupported chars ──────────────────────────────
    function sanitize(text) {
      return text
        .replace(/₹/g, 'Rs.')           // rupee symbol → Rs.
        .replace(/—/g, '-')             // em dash
        .replace(/–/g, '-')             // en dash
        .replace(/'/g, "'")             // curly apostrophe
        .replace(/'/g, "'")
        .replace(/"/g, '"')
        .replace(/"/g, '"')
        .replace(/[^\x00-\x7F₹]/g, (c) => {
          // keep common latin chars, strip true emojis
          const code = c.codePointAt(0)
          if (code > 0x2FFF) return ''  // strip emojis & CJK
          return c
        })
    }

    // ── Render inline tokens (handles bold, italic, code, text) ──────────────
    // Segments: [{text, bold, italic}]
    function renderInline(children, startX, fontSize = 10) {
      // Build segments
      const segments = []
      let bold = false, italic = false
      for (const child of children) {
        if (child.type === 'strong_open')  { bold = true;  continue }
        if (child.type === 'strong_close') { bold = false; continue }
        if (child.type === 'em_open')      { italic = true;  continue }
        if (child.type === 'em_close')     { italic = false; continue }
        if (child.type === 'softbreak' || child.type === 'hardbreak') {
          segments.push({ text: '\n', bold: false, italic: false })
          continue
        }
        if (child.type === 'text' || child.type === 'code_inline') {
          segments.push({ text: sanitize(child.content), bold, italic })
        }
      }

      // Now render segments line-aware
      // First, flatten into a single string to split into lines, then re-apply styles
      // Simple approach: render word by word tracking x position
      const lineH = fontSize * 0.42 + 1.8
      const maxX  = MARGIN_L + CONTENT_W
      let x = startX

      ensureSpace(lineH + 2)

      for (const seg of segments) {
        if (seg.text === '\n') {
          cursorY += lineH
          x = startX
          ensureSpace(lineH)
          continue
        }

        const style = seg.bold && seg.italic ? 'bolditalic'
                    : seg.bold   ? 'bold'
                    : seg.italic ? 'italic'
                    : 'normal'

        doc.setFont('helvetica', style)
        doc.setFontSize(fontSize)
        doc.setTextColor(30, 41, 59)

        // split by spaces to wrap manually
        const words = seg.text.split(' ')
        for (let wi = 0; wi < words.length; wi++) {
          const word = words[wi] + (wi < words.length - 1 ? ' ' : '')
          const w    = doc.getTextWidth(word)
          if (x + w > maxX && x !== startX) {
            cursorY += lineH
            x = startX
            ensureSpace(lineH)
          }
          doc.text(word, x, cursorY)
          x += w
        }
      }
      cursorY += lineH
    }

    // ── Render list (bullet or ordered, handles nesting) ──────────────────────
    function renderList(tokens, startIdx, ordered, baseIndent, depth = 0) {
      const closeType = ordered ? 'ordered_list_close' : 'bullet_list_close'
      const openType  = ordered ? 'ordered_list_open'  : 'bullet_list_open'
      let j   = startIdx + 1
      let num = 1
      const indent = baseIndent + (depth * 5)

      while (j < tokens.length) {
        const t = tokens[j]

        // nested list
        if (t.type === 'bullet_list_open') {
          renderList(tokens, j, false, indent + 2, depth + 1)
          // skip to close
          let d = 1, k = j + 1
          while (k < tokens.length) {
            if (tokens[k].type === 'bullet_list_open')  d++
            if (tokens[k].type === 'bullet_list_close') { d--; if (d === 0) break }
            k++
          }
          j = k + 1; continue
        }
        if (t.type === 'ordered_list_open') {
          renderList(tokens, j, true, indent + 2, depth + 1)
          let d = 1, k = j + 1
          while (k < tokens.length) {
            if (tokens[k].type === 'ordered_list_open')  d++
            if (tokens[k].type === 'ordered_list_close') { d--; if (d === 0) break }
            k++
          }
          j = k + 1; continue
        }

        if (t.type === closeType) break

        if (t.type === 'inline') {
          const children = t.children || []
          if (children.length) {
            ensureSpace(8)

            if (ordered) {
              // number
              doc.setFont('helvetica', 'bold')
              doc.setFontSize(9.5)
              doc.setTextColor(99, 102, 241)
              doc.text(`${num}.`, indent + 1, cursorY)
              num++
              renderInline(children, indent + 7, 10)
            } else {
              // bullet dot
              doc.setFillColor(99, 102, 241)
              doc.circle(indent + 2.5, cursorY - 1.2, depth === 0 ? 1 : 0.7, 'F')
              renderInline(children, indent + 6, 10)
            }
            addSpacing(1)
          }
        }
        j++
      }
    }

    // ── Render markdown tokens → PDF ─────────────────────────────────────────
    // We walk the token stream from markdown-it
    let i = 0
    while (i < tokens.length) {
      const token = tokens[i]

      // ── H1 ────────────────────────────────────────────────────────────────
      if (token.type === 'heading_open' && token.tag === 'h1') {
        const content = tokens[i + 1]?.content || ''
        addSpacing(4)
        ensureSpace(12)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(18)
        doc.setTextColor(15, 23, 42)
        const lines = doc.splitTextToSize(content, CONTENT_W)
        doc.text(lines, MARGIN_L, cursorY)
        cursorY += lines.length * 8
        // underline
        doc.setDrawColor(99, 102, 241)
        doc.setLineWidth(0.6)
        doc.line(MARGIN_L, cursorY, MARGIN_L + 40, cursorY)
        cursorY += 4
        i += 3; continue
      }

      // ── H2 ────────────────────────────────────────────────────────────────
      if (token.type === 'heading_open' && token.tag === 'h2') {
        const content = tokens[i + 1]?.content || ''
        addSpacing(5)
        ensureSpace(10)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(14)
        doc.setTextColor(58, 71, 196)
        const lines = doc.splitTextToSize(content, CONTENT_W)
        doc.text(lines, MARGIN_L, cursorY)
        cursorY += lines.length * 6.5
        // subtle underline
        doc.setDrawColor(200, 204, 255)
        doc.setLineWidth(0.3)
        doc.line(MARGIN_L, cursorY, PAGE_W - MARGIN_R, cursorY)
        cursorY += 3
        i += 3; continue
      }

      // ── H3 ────────────────────────────────────────────────────────────────
      if (token.type === 'heading_open' && token.tag === 'h3') {
        const content = tokens[i + 1]?.content || ''
        addSpacing(3)
        ensureSpace(8)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11.5)
        doc.setTextColor(30, 41, 59)
        const lines = doc.splitTextToSize(content, CONTENT_W)
        doc.text(lines, MARGIN_L, cursorY)
        cursorY += lines.length * 5.5
        i += 3; continue
      }

      // ── H4 ────────────────────────────────────────────────────────────────
      if (token.type === 'heading_open' && token.tag === 'h4') {
        const content = tokens[i + 1]?.content || ''
        addSpacing(2)
        addText(content, { fontSize: 10.5, fontStyle: 'bold', color: [30, 41, 59] })
        addSpacing(1)
        i += 3; continue
      }

      // ── Paragraph ─────────────────────────────────────────────────────────
      if (token.type === 'paragraph_open') {
        const inline = tokens[i + 1]
        if (inline?.type === 'inline') {
          addSpacing(1)
          renderInline(inline.children || [], MARGIN_L, 10)
          addSpacing(2)
        }
        i += 3; continue
      }

      // ── Blockquote ────────────────────────────────────────────────────────
      if (token.type === 'blockquote_open') {
        // collect all text inside blockquote
        let bqText = ''
        let j = i + 1
        while (j < tokens.length && tokens[j].type !== 'blockquote_close') {
          if (tokens[j].type === 'inline') {
            bqText += tokens[j].content + ' '
          }
          j++
        }
        bqText = sanitize(bqText.trim())
        if (bqText) {
          addSpacing(2)
          const lines = doc.splitTextToSize(bqText, CONTENT_W - 10)
          const bqH   = lines.length * 5 + 6
          ensureSpace(bqH + 2)

          // background box
          doc.setFillColor(238, 240, 255)
          doc.roundedRect(MARGIN_L, cursorY - 3, CONTENT_W, bqH, 2, 2, 'F')

          // left accent bar
          doc.setFillColor(99, 102, 241)
          doc.rect(MARGIN_L, cursorY - 3, 2.5, bqH, 'F')

          // text
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(9.5)
          doc.setTextColor(58, 71, 196)
          doc.text(lines, MARGIN_L + 7, cursorY + 1.5)
          cursorY += bqH + 1
          addSpacing(2)
        }
        i = j + 1; continue
      }

      // ── Bullet list ────────────────────────────────────────────────────────
      if (token.type === 'bullet_list_open') {
        renderList(tokens, i, false, MARGIN_L)
        // find close
        let j = i + 1
        let depth = 1
        while (j < tokens.length) {
          if (tokens[j].type === 'bullet_list_open') depth++
          if (tokens[j].type === 'bullet_list_close') { depth--; if (depth === 0) break }
          j++
        }
        addSpacing(2)
        i = j + 1; continue
      }

      // ── Ordered list ──────────────────────────────────────────────────────
      if (token.type === 'ordered_list_open') {
        renderList(tokens, i, true, MARGIN_L)
        let j = i + 1
        let depth = 1
        while (j < tokens.length) {
          if (tokens[j].type === 'ordered_list_open') depth++
          if (tokens[j].type === 'ordered_list_close') { depth--; if (depth === 0) break }
          j++
        }
        addSpacing(2)
        i = j + 1; continue
      }

      // ── Horizontal rule ───────────────────────────────────────────────────
      if (token.type === 'hr') {
        addSpacing(3)
        doc.setDrawColor(226, 232, 240)
        doc.setLineWidth(0.4)
        doc.line(MARGIN_L, cursorY, PAGE_W - MARGIN_R, cursorY)
        addSpacing(3)
        i++; continue
      }

      // ── Code block ────────────────────────────────────────────────────────
      if (token.type === 'fence' || token.type === 'code_block') {
        const code  = token.content.trim()
        const lines = code.split('\n')
        const boxH  = lines.length * 4.5 + 8
        ensureSpace(boxH + 4)

        doc.setFillColor(248, 250, 252)
        doc.roundedRect(MARGIN_L, cursorY - 2, CONTENT_W, boxH, 2, 2, 'F')
        doc.setDrawColor(226, 232, 240)
        doc.setLineWidth(0.3)
        doc.roundedRect(MARGIN_L, cursorY - 2, CONTENT_W, boxH, 2, 2, 'S')

        doc.setFont('courier', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(30, 41, 59)
        lines.forEach((line, idx) => {
          doc.text(line, MARGIN_L + 4, cursorY + 2 + idx * 4.5)
        })
        cursorY += boxH + 2
        addSpacing(3)
        i++; continue
      }

      i++
    }

    // ── Stamp headers and footers on all pages ─────────────────────────────
    const total = doc.internal.getNumberOfPages()
    for (let p = 1; p <= total; p++) {
      doc.setPage(p)
      drawHeader()
      drawFooter(p, total)
    }

    doc.save(filename)

  } catch (err) {
    console.error('PDF generation failed:', err)
    alert('PDF generation failed. Check console for details.')
  }

  loading.value = false
}
</script>

<style>
.pdf-btn {
  position: fixed;
  bottom: 28px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 999px;
  border: none;
  background: #6366f1;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.45);
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
  font-family: inherit;
}
.pdf-btn:hover:not(:disabled) {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.55);
}
.pdf-btn.loading {
  background: #818cf8;
  cursor: not-allowed;
}
</style>
