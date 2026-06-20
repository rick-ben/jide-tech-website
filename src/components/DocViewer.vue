<template>
  <div class="doc-viewer">
    <div class="markdown-body" v-html="renderedHtml"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, nextTick } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

// Configure marked renderer
const renderer = new marked.Renderer()

// Helper: extract plain text from inline tokens for IDs and attributes
function extractText(tokens) {
  if (!tokens) return ''
  if (typeof tokens === 'string') return tokens
  if (Array.isArray(tokens)) {
    return tokens.map(t => t.text || t.raw || extractText(t.tokens) || '').join('')
  }
  return tokens.text || tokens.raw || ''
}

// Helper: render inline tokens to HTML using the parser
function renderInline(parser, tokens) {
  if (!tokens) return ''
  if (typeof tokens === 'string') return tokens
  return parser.parseInline(tokens)
}

// Custom code block rendering with highlight.js
renderer.code = function (token) {
  const text = typeof token.text === 'string' ? token.text : ''
  const lang = token.lang || ''
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  try {
    const highlighted = hljs.highlight(text, { language }).value
    return `<div class="code-block">
      <div class="code-block__header">
        <span class="code-block__lang">${language}</span>
        <button class="code-block__copy" onclick="
          navigator.clipboard.writeText(this.parentElement.nextElementSibling.textContent);
          this.textContent='已复制';
          setTimeout(()=>this.textContent='复制',1500)
        ">复制</button>
      </div>
      <pre><code class="hljs language-${language}">${highlighted}</code></pre>
    </div>`
  } catch {
    return `<pre><code>${text}</code></pre>`
  }
}

// Custom image rendering
renderer.image = function (token) {
  const href = token.href || ''
  const title = token.title || ''
  const text = token.text || ''
  const titleAttr = title ? ` title="${title}"` : ''
  const altAttr = text || '图片'
  return `<figure class="doc-image">
    <img src="${href}" alt="${altAttr}"${titleAttr} loading="lazy" />
    ${title ? `<figcaption>${title}</figcaption>` : ''}
  </figure>`
}

// Custom table rendering — marked v18 cells are objects with .text
renderer.table = function (token) {
  const header = token.header || []
  const rows = token.rows || []
  const cellText = (cell) => {
    if (typeof cell === 'string') return cell
    if (cell && typeof cell.text === 'string') return cell.text
    if (cell && cell.tokens) return extractText(cell.tokens)
    return ''
  }
  const headerHtml = '<thead><tr>' + header.map(c => `<th>${cellText(c)}</th>`).join('') + '</tr></thead>'
  const bodyHtml = '<tbody>' + rows.map(row =>
    '<tr>' + row.map(c => `<td>${cellText(c)}</td>`).join('') + '</tr>'
  ).join('') + '</tbody>'
  return `<div class="table-wrapper"><table>${headerHtml}${bodyHtml}</table></div>`
}

// Custom heading rendering with anchor IDs
renderer.heading = function (token) {
  const depth = token.depth || 2
  // Use parser to render inline tokens like bold/italic inside headings
  const renderedText = renderInline(this.parser, token.tokens)
  const plainText = extractText(token.tokens)
  const id = plainText
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w一-鿿]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `<h${depth} id="${id}" class="doc-heading">
    ${renderedText}
    <a href="#${id}" class="heading-anchor" title="链接到此标题">#</a>
  </h${depth}>`
}

// Custom link rendering (external links open in new tab)
renderer.link = function (token) {
  const href = token.href || ''
  const title = token.title || ''
  const renderedText = renderInline(this.parser, token.tokens)
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'))
  const titleAttr = title ? ` title="${title}"` : ''
  const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  const icon = isExternal ? ' <i class="bi bi-box-arrow-up-right" style="font-size:0.75em;"></i>' : ''
  return `<a href="${href}"${titleAttr}${targetAttr}>${renderedText}${icon}</a>`
}

// Custom blockquote rendering
renderer.blockquote = function (token) {
  const content = this.parser.parse(token.tokens)
  return `<blockquote class="doc-blockquote">${content}</blockquote>`
}

// Custom paragraph rendering — handle inline tokens properly
renderer.paragraph = function (token) {
  const content = renderInline(this.parser, token.tokens)
  return `<p>${content}</p>`
}

// Custom listitem rendering
renderer.listitem = function (token) {
  const content = this.parser.parse(token.tokens)
  return `<li>${content}</li>`
}

// Custom tablecell rendering (fallback for inline tokens in cells)
renderer.tablecell = function (token) {
  const content = renderInline(this.parser, token.tokens)
  const tag = token.header ? 'th' : 'td'
  const align = token.align ? ` align="${token.align}"` : ''
  return `<${tag}${align}>${content}</${tag}>`
}

marked.setOptions({
  renderer,
  gfm: true,
  breaks: true
})

const renderedHtml = computed(() => {
  if (!props.content) return '<p class="doc-empty">暂无内容</p>'
  try {
    return marked.parse(props.content)
  } catch (e) {
    console.error('Markdown parse error:', e)
    return '<p class="doc-error">文档解析失败</p>'
  }
})

// Add smooth scroll for anchor links after render
onMounted(() => {
  document.querySelectorAll('.doc-viewer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
})
</script>

<style scoped>
.doc-viewer {
  width: 100%;
}

/* ===== Markdown Body ===== */
.markdown-body {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--text-primary);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 2em;
  margin-bottom: 0.75em;
  font-weight: 700;
  line-height: 1.3;
  scroll-margin-top: calc(var(--header-height) + 20px);
}

.markdown-body :deep(h1) { font-size: 2rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5em; }
.markdown-body :deep(h2) { font-size: 1.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.4em; }
.markdown-body :deep(h3) { font-size: 1.25rem; }
.markdown-body :deep(h4) { font-size: 1.1rem; }
.markdown-body :deep(h5) { font-size: 1rem; }

.doc-heading {
  position: relative;
}

.doc-heading .heading-anchor {
  opacity: 0;
  font-size: 0.85em;
  margin-left: 8px;
  color: var(--color-primary);
  transition: opacity var(--transition-fast);
  text-decoration: none;
}

.doc-heading:hover .heading-anchor {
  opacity: 1;
}

/* Paragraphs & Text */
.markdown-body :deep(p) {
  margin-bottom: 1.2em;
}

.markdown-body :deep(strong) {
  font-weight: 700;
  color: var(--text-primary);
}

.markdown-body :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color var(--transition-fast);
}

.markdown-body :deep(a:hover) {
  color: var(--color-primary-dark);
}

/* Lists */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin-bottom: 1.2em;
  padding-left: 1.5em;
}

.markdown-body :deep(li) {
  margin-bottom: 0.4em;
}

.markdown-body :deep(ul) {
  list-style: disc;
}

.markdown-body :deep(ol) {
  list-style: decimal;
}

.markdown-body :deep(li > ul),
.markdown-body :deep(li > ol) {
  margin-top: 0.4em;
  margin-bottom: 0;
}

/* Code Blocks */
.markdown-body :deep(.code-block) {
  margin: 1.5em 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.markdown-body :deep(.code-block__header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #1e293b;
  font-size: var(--text-xs);
}

.markdown-body :deep(.code-block__lang) {
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  font-family: var(--font-mono);
}

.markdown-body :deep(.code-block__copy) {
  padding: 2px 10px;
  font-size: var(--text-xs);
  font-family: var(--font-sans);
  font-weight: 500;
  color: #cbd5e1;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.markdown-body :deep(.code-block__copy:hover) {
  background: rgba(255,255,255,0.2);
  color: #fff;
}

.markdown-body :deep(pre) {
  margin: 0;
  padding: 16px 20px;
  background: #0d1117;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.markdown-body :deep(pre code) {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.7;
  color: #e6edf3;
}

/* Inline code */
.markdown-body :deep(:not(pre) > code) {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 2px 6px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-sm);
  color: #d63384;
  border: 1px solid var(--border-light);
}

/* Tables */
.markdown-body :deep(.table-wrapper) {
  margin: 1.5em 0;
  overflow-x: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.markdown-body :deep(th) {
  background: var(--color-bg-alt);
  font-weight: 700;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 2px solid var(--border-color);
  white-space: nowrap;
}

.markdown-body :deep(td) {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-light);
}

.markdown-body :deep(tr:last-child td) {
  border-bottom: none;
}

.markdown-body :deep(tr:hover td) {
  background: var(--color-bg);
}

/* Images */
.markdown-body :deep(.doc-image) {
  margin: 2em 0;
  text-align: center;
}

.markdown-body :deep(.doc-image img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
}

.markdown-body :deep(.doc-image figcaption) {
  margin-top: 0.75em;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-style: italic;
}

/* Blockquotes */
.markdown-body :deep(.doc-blockquote) {
  margin: 1.5em 0;
  padding: 16px 20px;
  background: var(--color-primary-lighter);
  border-left: 4px solid var(--color-primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--text-secondary);
}

.markdown-body :deep(.doc-blockquote p) {
  margin-bottom: 0.5em;
}

.markdown-body :deep(.doc-blockquote p:last-child) {
  margin-bottom: 0;
}

/* Horizontal Rule */
.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 2em 0;
}

/* Empty/Error states */
.markdown-body :deep(.doc-empty),
.markdown-body :deep(.doc-error) {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--text-tertiary);
  font-size: var(--text-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .markdown-body :deep(h1) { font-size: 1.5rem; }
  .markdown-body :deep(h2) { font-size: 1.25rem; }
  .markdown-body :deep(h3) { font-size: 1.1rem; }

  .markdown-body :deep(pre) {
    padding: 12px 14px;
  }

  .markdown-body :deep(pre code) {
    font-size: 0.8125rem;
  }
}
</style>
