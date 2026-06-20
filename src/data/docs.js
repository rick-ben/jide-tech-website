/**
 * 文档数据配置
 * 添加新文档只需在数组中新增一个对象即可
 *
 * 文档内容放在 src/docs/ 目录下，通过 import ?raw 导入
 */

// Import markdown files as raw strings
import lingxiAssistantIntroRaw from '@/docs/lingxi-assistant-intro.md?raw'
import passwordManagerIntroRaw from '@/docs/password-manager-intro.md?raw'
import loversNestDeployRaw from '@/docs/lovers-nest-deploy.md?raw'
import loversNestIntroRaw from '@/docs/lovers-nest-intro.md?raw'

export const docs = [
  {
    id: 'lingxi-assistant-intro',
    title: '灵犀 AI 智能助手 - 产品介绍',
    description: '了解灵犀 AI 智能助手的功能特性、多端形态、技术架构和适用场景',
    category: '产品文档',
    categoryIcon: 'bi-book-fill',
    tags: ['灵犀', 'AI 助手', '产品介绍'],
    productId: 'lingxi-assistant',
    date: '2026-06-20',
    rawContent: lingxiAssistantIntroRaw
  },
  {
    id: 'password-manager-intro',
    title: '密码管理器 - 产品介绍',
    description: '了解密码管理器的功能特性、安全架构、技术方案和适用场景',
    category: '产品文档',
    categoryIcon: 'bi-book-fill',
    tags: ['密码管理器', '安全', '产品介绍'],
    productId: 'password-manager',
    date: '2026-06-20',
    rawContent: passwordManagerIntroRaw
  },
  {
    id: 'lovers-nest-intro',
    title: '情侣小窝 - 产品介绍',
    description: '了解情侣小窝微信小程序的功能特性、使用场景和技术架构',
    category: '产品文档',
    categoryIcon: 'bi-book-fill',
    tags: ['情侣小窝', '微信小程序', '产品介绍'],
    productId: 'lovers-nest',
    date: '2022-12-06',
    rawContent: loversNestIntroRaw
  },
  {
    id: 'lovers-nest-deploy',
    title: '情侣小窝 - 微信云开发版安装部署教程',
    description: '从零开始部署情侣小窝小程序，包括云开发环境配置、数据库创建、云函数部署等完整步骤',
    category: '部署教程',
    categoryIcon: 'bi-gear-fill',
    tags: ['情侣小窝', '部署', '云开发', '微信小程序'],
    productId: 'lovers-nest',
    date: '2022-12-06',
    rawContent: loversNestDeployRaw
  }
]

/**
 * 获取所有文档
 */
export function getAllDocs() {
  return docs
}

/**
 * 根据 ID 获取文档
 */
export function getDocById(id) {
  return docs.find(d => d.id === id) || null
}

/**
 * 获取文档分类列表
 */
export function getCategories() {
  const cats = [...new Set(docs.map(d => d.category))]
  return cats.map(name => ({
    name,
    icon: docs.find(d => d.category === name)?.categoryIcon || 'bi-file-text-fill',
    docs: docs.filter(d => d.category === name)
  }))
}

/**
 * 根据产品 ID 获取相关文档
 */
export function getDocsByProduct(productId) {
  return docs.filter(d => d.productId === productId)
}

/**
 * 获取相邻文档（上一篇/下一篇）
 */
export function getAdjacentDocs(currentId) {
  const idx = docs.findIndex(d => d.id === currentId)
  return {
    prev: idx > 0 ? docs[idx - 1] : null,
    next: idx < docs.length - 1 ? docs[idx + 1] : null
  }
}
