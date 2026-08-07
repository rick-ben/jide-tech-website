/**
 * 产品数据配置
 * 添加新产品只需在数组中新增一个对象即可
 *
 * icon 使用 Bootstrap Icons 类名 (https://icons.getbootstrap.com/)
 */
export const products = [
  {
    id: 'lingxi-assistant',
    name: 'LingXi AI Assistant',
    nameCN: '灵犀 AI 智能助手',
    tagline: '心有灵犀一点通 — 面向所有人的 AI 智能助手',
    description:
      '灵犀是一款面向所有人的 AI 智能助手，通过自然语言和语音完成工作。' +
      '命名来自「心有灵犀一点通」—— AI 洞察用户意图，一触即通。' +
      '支持桌面端、VS Code 扩展、CLI 终端三种产品形态，覆盖开发者、办公人员、项目经理等不同用户群体。' +
      '兼容 OpenAI、Anthropic、Gemini 三大标准协议，市面所有大模型均可自由接入，四模型槽智能调度，配备 35+ 内置工具，涵盖文件、搜索、代码、文档、图像、音频等全方位能力。',
    features: [
      { icon: 'bi-display', title: '多端覆盖', desc: '桌面端（Windows/Mac/Linux）、VS Code 扩展、CLI 终端，无缝适配各类工作场景' },
      { icon: 'bi-cpu', title: '全模型厂商接入', desc: '兼容 OpenAI、Anthropic、Gemini 三大标准协议，市面所有大模型均可自由接入，四模型槽智能调度' },
      { icon: 'bi-tools', title: '丰富工具集', desc: '50+ 内置工具，涵盖文件读写、代码搜索、办公文档、图像音频处理等' },
      { icon: 'bi-mic', title: '语音对话', desc: '支持连续语音对话模式，自动语音识别与播报，解放双手' },
      { icon: 'bi-shield-check', title: '安全可控', desc: '四层权限模型、本地优先处理，数据不上传云端，保障您的信息安全' },
      { icon: 'bi-lightning-charge', title: '流式响应', desc: '实时 Markdown 渲染，工具调用可视化，思考过程透明展示' },
      { icon: 'bi-grid-3x3-gap', title: '智能调度', desc: 'Agent Loop 自主执行 + 子 Agent 并行任务 + Skill 系统按需激活' },
      { icon: 'bi-puzzle', title: '扩展生态', desc: '开放 MCP 协议集成，支持自定义 Skills 和 Hooks，能力无限扩展' }
    ],
    techStack: ['TypeScript', 'Node.js', 'Electron', 'React 19', 'Tailwind CSS', 'VS Code Extension'],
    status: 'active',
    link: 'https://lingxi.regaing.com',
    linkType: 'access',
    npmLink: 'https://www.npmjs.com/package/@lingxi-agent/core',
    logo: '/logo/lingxi.png'
  },
  {
    id: 'password-manager',
    name: 'Password Manager',
    nameCN: '密码管理器',
    tagline: '安全、高效的企业级密码管理方案',
    description:
      '一款全功能密码管理器，支持密码存储、自动生成高强度密码、文件夹分类管理、TOTP 双重认证、密码健康度检测、数据导出导入等功能。' +
      '采用端到端加密技术，确保您的数据只有您自己能访问。',
    features: [
      { icon: 'bi-shield-lock-fill', title: '端到端加密', desc: 'AES-256 加密算法，数据传输与存储全程加密，确保密码安全无虞' },
      { icon: 'bi-key-fill', title: '密码生成器', desc: '智能生成高强度随机密码，支持自定义长度、字符类型和特殊符号' },
      { icon: 'bi-folder-fill', title: '文件夹管理', desc: '树形目录结构，自由创建文件夹，分类管理不同场景的账号密码' },
      { icon: 'bi-phone-fill', title: 'TOTP 双因素认证', desc: '内置一次性验证码生成器，扫码即可绑定，告别额外的验证器 App' },
      { icon: 'bi-heart-pulse-fill', title: '密码健康检测', desc: '自动检测弱密码、重复密码和过期密码，提供安全评分和改进建议' },
      { icon: 'bi-box-arrow-up', title: '数据导入导出', desc: '支持加密 JSON 格式导出备份，随时迁移数据，掌控权完全在您手中' },
      { icon: 'bi-globe2', title: '跨平台访问', desc: '支持桌面端、移动端，响应式设计自适应各种屏幕尺寸' },
      { icon: 'bi-lightning-charge-fill', title: '自动填充扩展', desc: '配套浏览器扩展，一键自动填写登录表单，告别手动输入' }
    ],
    techStack: ['Vue 3', 'Element Plus', 'Pinia', 'Vite', 'Spring Boot', 'PostgreSQL'],
    status: 'active',
    link: 'https://pwd.regaing.com',
    linkType: 'access',
    npmLink: 'https://www.npmjs.com/package/@lingxi-agent/pwd-mcp',
    logo: '/logo/password.png'
  },
  {
    id: 'lovers-nest',
    name: 'Lovers Nest',
    nameCN: '情侣小窝-微信云开发版',
    tagline: '专为情侣打造的微信小程序，记录恋爱中的点点滴滴',
    description:
      '情侣小窝是一款基于微信小程序的情侣专属空间。支持日记/动态发布、共享相册、纪念日倒数等功能。' +
      '基于微信云开发架构，无需搭建服务器，零成本部署。双方可以在小窝中共同记录生活瞬间，打造属于两个人的私密小天地。',
    features: [
      { icon: 'bi-journal-text', title: '日记动态发布', desc: '图文混排，支持双方共同发布动态、记录心情和日常点滴' },
      { icon: 'bi-images', title: '共享相册', desc: '创建专属相册，上传照片到共享空间，按分类管理美好回忆' },
      { icon: 'bi-calendar-heart-fill', title: '纪念日倒数', desc: '首页自动显示在一起的日期天数，让每一天都充满仪式感' },
      { icon: 'bi-shield-fill-check', title: '精细化权限', desc: '游客/成员两种模式，支持发布、相册、查看等多种权限设置' },
      { icon: 'bi-share-fill', title: '分享朋友圈', desc: '支持将动态分享到微信朋友圈，与好友分享幸福时刻' },
      { icon: 'bi-cloud-check-fill', title: '零服务器成本', desc: '基于微信云开发，自动扩容，无需自行搭建和维护服务器' }
    ],
    techStack: ['微信小程序', 'WeUI', '云开发', '云函数', 'Node.js'],
    status: 'active',
    link: 'https://gitee.com/regaing/our-nest',
    linkType: 'source'
  }

  // 未来产品添加示例：
  //   id: 'note-app',
  //   name: 'Smart Notes',
  //   nameCN: '智能笔记',
  //   tagline: 'AI 驱动的知识管理工具',
  //   description: '...',
  //   features: [{ icon: 'bi-journal-text', title: '...', desc: '...' }],
  //   techStack: [...],
  //   status: 'coming',
  //   link: ''
  // }
]

/**
 * 获取活跃产品列表
 */
export function getActiveProducts() {
  return products.filter(p => p.status === 'active')
}

/**
 * 获取即将推出的产品列表
 */
export function getComingProducts() {
  return products.filter(p => p.status === 'coming')
}
