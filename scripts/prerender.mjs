/**
 * 构建期预渲染
 *
 * 把每个路由渲染成带正文与页面级 meta 的静态 HTML，
 * 让不执行 JS 的爬虫（含 AI 引擎）能直接读到内容。
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE = 'https://www.regaing.com'
const root = process.cwd()
const distDir = path.join(root, 'dist')
const templatePath = path.join(distDir, 'index.html')
const ssrEntryPath = path.join(root, 'dist-ssr', 'entry-server.mjs')

if (!fs.existsSync(ssrEntryPath)) {
  console.error(`[prerender] 未找到 SSR 产物：${ssrEntryPath}`)
  process.exit(1)
}

const template = fs.readFileSync(templatePath, 'utf-8')
const { render, getPrerenderPaths, products } = await import(pathToFileURL(ssrEntryPath).href)

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** 每页附加的结构化数据 */
function buildJsonLd(routePath, doc) {
  const blocks = []
  const url = routePath === '/' ? `${SITE}/` : `${SITE}${routePath}`

  const crumbs = [{ name: '首页', item: `${SITE}/` }]
  if (routePath.startsWith('/products')) crumbs.push({ name: '产品', item: `${SITE}/products` })
  if (routePath.startsWith('/docs')) {
    crumbs.push({ name: '文档', item: `${SITE}/docs` })
    if (doc) crumbs.push({ name: doc.title, item: url })
  }
  blocks.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item
    }))
  })

  if (routePath === '/products') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '记得科技产品',
      itemListElement: products
        .filter(p => p.status === 'active')
        .map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: p.nameCN,
            alternateName: p.name,
            description: p.tagline,
            url: p.link,
            applicationCategory: 'BusinessApplication',
            operatingSystem: p.techStack.slice(0, 3).join(', ')
          }
        }))
    })
  }

  if (routePath === '/docs') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '技术文档 | 记得科技',
      url: `${SITE}/docs`,
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${SITE}/#website` }
    })
  }

  if (doc) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: doc.title,
      description: doc.description,
      datePublished: doc.date,
      dateModified: doc.date,
      inLanguage: 'zh-CN',
      keywords: doc.tags.join(', '),
      author: { '@id': `${SITE}/#organization` },
      publisher: { '@id': `${SITE}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${SITE}/#website` }
    })
  }

  return blocks
    .map(block => `    <script type="application/ld+json">\n${JSON.stringify(block, null, 2)}\n    </script>`)
    .join('\n')
}

/** 用页面数据替换模板中的 meta 与正文 */
function buildHtml({ routePath, html, title, description, doc }) {
  const url = routePath === '/' ? `${SITE}/` : `${SITE}${routePath}`
  const t = escapeHtml(title)
  const d = escapeHtml(description)

  let out = template
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
  out = out.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`)
  out = out.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  out = out.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
  out = out.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`)
  out = out.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`)
  out = out.replace(/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${url}" />`)
  out = out.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${t}" />`)
  out = out.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${d}" />`)
  out = out.replace('<div id="app"></div>', `<div id="app">${html}</div>`)
  out = out.replace('</head>', `${buildJsonLd(routePath, doc)}\n  </head>`)

  return out
}

const pages = getPrerenderPaths()
const report = []

for (const routePath of pages) {
  const data = await render(routePath)
  const html = buildHtml({ routePath, ...data })

  const dir = routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8')

  report.push(`  ${routePath.padEnd(28)} ${(html.length / 1024).toFixed(1).padStart(6)} KB  ${data.title}`)
}

console.log(`[prerender] 已生成 ${pages.length} 个页面：`)
console.log(report.join('\n'))
