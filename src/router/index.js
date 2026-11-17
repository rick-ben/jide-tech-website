import { createRouter, createWebHistory } from 'vue-router'
import { routes, defaultDescription } from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// meta 支持函数（如文档页需要按 docId 生成标题）
function resolveMeta(value, to) {
  return typeof value === 'function' ? value(to) : value
}

router.afterEach((to) => {
  const title = resolveMeta(to.meta.title, to) || '记得科技 | 有记才有得'
  const description = resolveMeta(to.meta.description, to) || defaultDescription

  document.title = title

  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', description)
  }
})

export default router
