# 记得科技官方网站

> 🚀 **零后端 · 极简搭建 · 纯静态** — 一个可快速成型并部署的企业官网模板。

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-LingXi-6366f1)](https://lingxi.regaing.com)

---

## ✨ 特性

- ⚡ **极简架构** — Vue 3 + Vite，纯前端静态站点，无需后端服务
- 🎨 **现代设计** — 响应式布局，深色 Footer，渐变 Hero，卡片式产品展示
- 📄 **数据驱动** — 产品、文档均通过 JS 配置文件管理，增删改只需编辑数据文件
- 📝 **Markdown 文档** — 内置文档系统，支持 Markdown 渲染、代码高亮、目录导航
- 🔍 **SEO 友好** — 内置 sitemap.xml，语义化 HTML 结构
- 📱 **全端适配** — 桌面端、平板、手机完美响应式

## 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 构建 | Vite 5 |
| 路由 | Vue Router 4 |
| 图标 | Bootstrap Icons |
| 文档渲染 | Marked + Highlight.js |
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

构建产物在 `dist/` 目录，可部署到任何静态托管服务（Nginx、GitHub Pages、Vercel、Netlify 等）。

## 📁 项目结构

```
jide-tech-website/
├── public/              # 静态资源（Logo、图片、sitemap）
│   ├── assets/images/   # 产品预览图
│   └── logo/            # Logo 文件
├── src/
│   ├── components/      # 公共组件（Header、Footer）
│   ├── views/           # 页面组件（首页、产品页、文档页）
│   ├── data/            # 数据配置（产品、文档）
│   ├── router/          # 路由配置
│   ├── docs/            # Markdown 文档
│   └── main.js          # 入口
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
└── package.json
```

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

> 本项目的**全部代码**由 [**灵犀 AI 智能助手**](https://lingxi.regaing.com) 生成。

灵犀是一款面向所有人的 AI 智能助手，支持桌面端、VS Code 扩展、CLI 终端三种形态，接入 DeepSeek、OpenAI 等 7 家主流大模型。**从需求描述到完整可部署的官网**，灵犀完成了：

- ✅ 项目脚手架搭建
- ✅ 全部页面布局与样式
- ✅ 数据驱动架构设计
- ✅ 响应式适配
- ✅ Markdown 文档系统
- ✅ SEO 优化（sitemap）

👉 **想体验用 AI 写代码？访问 [lingxi.regaing.com](https://lingxi.regaing.com)**

## 📄 License

MIT © 记得科技
