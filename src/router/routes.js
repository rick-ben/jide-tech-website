import { docs, getDocById } from '@/data/docs.js'

export const defaultDescription = '记得科技专注于打造安全、可靠、易用的 AI 数字化产品。涵盖 NearWork AI 智能体、记得·密码管理器等工具。'

// 文档页的 meta 需要按 docId 动态生成，供路由与预渲染共用
function docTitle(to) {
  const doc = getDocById(to.params.docId)
  return doc ? `${doc.title} | 记得科技` : '文档详情 | 记得科技'
}

function docDescription(to) {
  const doc = getDocById(to.params.docId)
  return doc ? doc.description : '查看详细的产品文档和部署教程'
}

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '记得科技 | 有记才有得 — AI 智能体与数字化工具',
      description: '从 AI 智能体到数字工具，记得科技致力于打造安全、可靠、易用的数字化产品。让每一次记录都有价值。'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue'),
    meta: {
      title: '产品 | 记得科技',
      description: '多模型 AI 智能体 NearWork、零信任架构的记得·密码管理器、情侣小窝微信小程序 — 每一款产品都凝聚着我们对安全、体验和品质的追求。'
    }
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/Docs.vue'),
    meta: {
      title: '技术文档 | 记得科技',
      description: '产品文档、部署教程和使用指南，帮助您快速上手记得科技的数字化产品。'
    }
  },
  {
    path: '/docs/:docId',
    name: 'DocDetail',
    component: () => import('@/views/DocDetail.vue'),
    meta: {
      title: docTitle,
      description: docDescription
    }
  }
]

/**
 * 预渲染页面清单：静态路由 + 每篇文档
 */
export function getPrerenderPaths() {
  return ['/', '/products', '/docs', ...docs.map(d => `/docs/${d.id}`)]
}
