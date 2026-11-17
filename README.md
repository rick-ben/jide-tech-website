# 记得科技官方网站

> 🚀 **零后端 · 极简搭建 · 纯静态** — 一个可快速成型并部署的企业官网模板。

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-NearWork-6366f1)](https://nearwork.regaing.com)

---

## ✨ 特性

- ⚡ **极简架构** — Vue 3 + Vite，纯前端静态站点，无需后端服务
- 🎨 **现代设计** — 响应式布局，深色 Footer，渐变 Hero，卡片式产品展示
- 📄 **数据驱动** — 产品、文档均通过 JS 配置文件管理，增删改只需编辑数据文件
- 📝 **Markdown 文档** — 内置文档系统，支持 Markdown 渲染、代码高亮、目录导航
- 🔍 **SEO / GEO 友好** — 构建期预渲染每页正文，自带 meta / canonical / JSON-LD / sitemap / robots.txt / llms.txt
- 📱 **全端适配** — 桌面端、平板、手机完美响应式

## 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 构建 | Vite 5 |
| 路由 | Vue Router 4 |
| 图标 | Bootstrap Icons |
| 文档渲染 | Marked + Highlight.js |
| 预渲染 | @vue/server-renderer + 自写 prerender 脚本 |
| 部署 | 纯静态，任意静态托管服务 |

## 🚀 快速开始

```bash
# 克隆项目 (Gitee)
git clone https://gitee.com/regaing/jide-tech-website.git

# 克隆项目 (GitHub)
git clone https://github.com/rick-ben/jide-tech-website
cd jide-tech-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

`npm run build` 会依次执行三步：客户端构建 → SSR 构建（输出 `dist-ssr/`）→ 预渲染（为每个路由生成带正文的静态 HTML）。

构建产物在 `dist/` 目录，可直接部署到任何静态托管服务（Nginx、GitHub Pages、Vercel、Netlify 等）。Nginx 需保留 `try_files $uri $uri/ /index.html;`，以便命中预渲染出的子目录页面。

## 📁 项目结构

```
jide-tech-website/
├── public/              # 静态资源（Logo、图片、sitemap、robots.txt、llms.txt、og-image）
│   ├── assets/images/   # 产品预览图
│   └── logo/            # Logo 文件
├── scripts/
│   └── prerender.mjs    # 构建期预渲染脚本
├── src/
│   ├── components/      # 公共组件（Header、Footer、DocViewer）
│   ├── views/           # 页面组件（首页、产品页、文档页）
│   ├── data/            # 数据配置（产品、文档）
│   ├── router/          # 路由配置（routes.js 供客户端与预渲染共用）
│   ├── docs/            # Markdown 文档
│   ├── entry-server.js  # 预渲染入口（SSR）
│   └── main.js          # 客户端入口
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
└── package.json
```

## 🔍 SEO 与 GEO

站点为**构建期预渲染**的静态站：每个路由（首页 / 产品 / 文档列表 / 每篇文档）都会生成独立的 `index.html`，
正文与 meta 直接写在 HTML 里，不依赖 JS 即可抓取。

| 产物 | 作用 |
|------|------|
| 每页静态 HTML | title、description、canonical、og / twitter 均为页面级 |
| `public/robots.txt` | 声明 sitemap，显式允许主流 AI 爬虫（GPTBot、ClaudeBot、PerplexityBot 等） |
| `public/llms.txt` | 给 AI 引擎的产品事实清单（GEO），含关键数字与官方链接 |
| `public/sitemap.xml` | 全站 URL 与更新频率 |
| 结构化数据 | 每页自动注入 BreadcrumbList；产品页 ItemList、文档页 TechArticle；首页 Organization + WebSite |
| `public/og-image.png` | 1200×630 分享封面 |

新增产品或文档后，预渲染会自动覆盖（路由清单来自 `getPrerenderPaths()`），无需手工新增 HTML。新增路由时记得同步：
`src/router/routes.js`（页面 meta）、`public/sitemap.xml`、`public/llms.txt`。

## 🎯 添加新产品

只需在 `src/data/products.js` 中新增一个对象：

```js
{
  id: 'my-product',
  name: 'My Product',
  nameCN: '我的产品',
  tagline: '一句话介绍',
  description: '详细描述...',
  features: [
    { icon: 'bi-star', title: '特性一', desc: '说明' },
  ],
  techStack: ['Vue 3', 'Node.js'],
  status: 'active',
  link: 'https://example.com',
  linkType: 'access',  // 'access'=快速访问 / 'source'=查看源码
  logo: '/logo/my-product.png',  // 可选
}
```

同样，在 `src/docs/` 目录添加 `.md` 文件并在 `src/data/docs.js` 注册即可新增文档。

## 🤖 100% AI 开发

> 本项目的**全部代码**由 [**NearWork**](https://nearwork.regaing.com) 生成。

NearWork 是一款装在自己电脑上的多模型 AI 智能体，可接入 16 家模型供应商，内置 75 个工具与 MCP 插件，覆盖桌面端、命令行、VS Code 扩展与网页对话。**从需求描述到完整可部署的官网**，NearWork 完成了：

- ✅ 项目脚手架搭建
- ✅ 全部页面布局与样式
- ✅ 数据驱动架构设计
- ✅ 响应式适配
- ✅ Markdown 文档系统
- ✅ SEO 优化（sitemap）

👉 **想体验用 AI 写代码？访问 [nearwork.regaing.com](https://nearwork.regaing.com)**

## 📄 License

MIT © 记得科技
