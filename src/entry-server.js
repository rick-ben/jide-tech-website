import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { routes, defaultDescription, getPrerenderPaths } from './router/routes.js'
import { docs } from './data/docs.js'
import { products } from './data/products.js'

export { getPrerenderPaths, products }

const FALLBACK_TITLE = '记得科技 | 有记才有得'

/**
 * 服务端渲染指定路径，返回页面正文与 meta，供构建期预渲染使用
 */
export async function render(url) {
  const app = createSSRApp(App)
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
    scrollBehavior() {
      return { top: 0 }
    }
  })
  app.use(router)

  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  const current = router.currentRoute.value
  const resolveMeta = (value) => (typeof value === 'function' ? value(current) : value)

  const doc =
    current.name === 'DocDetail'
      ? docs.find(d => d.id === current.params.docId) || null
      : null

  return {
    html,
    name: current.name || '',
    doc,
    title: resolveMeta(current.meta.title) || FALLBACK_TITLE,
    description: resolveMeta(current.meta.description) || defaultDescription
  }
}
