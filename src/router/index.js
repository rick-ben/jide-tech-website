import { createRouter, createWebHistory } from 'vue-router'

const defaultDescription = '记得科技专注于打造安全、可靠、易用的 AI 数字化产品。涵盖灵犀 AI 智能助手、密码管理器等工具。'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '记得科技 | 有记才有得',
      description: '从 AI 智能助手到数字工具，记得科技致力于打造安全、可靠、易用的数字化产品。让每一次记录都有价值。'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue'),
    meta: {
      title: '产品 | 记得科技',
      description: '全模型厂商接入的灵犀 AI 智能助手、端到端加密的密码管理器、情侣小窝微信小程序 — 每一款产品都凝聚着我们对安全、体验和品质的追求。'
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
      title: '文档详情 | 记得科技',
      description: '查看详细的产品文档和部署教程'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const title = to.meta.title || '记得科技 | 有记才有得'
  const description = to.meta.description || defaultDescription

  document.title = title

  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', description)
  }
})

export default router
