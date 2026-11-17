/**
 * 产品数据配置
 * 添加新产品只需在数组中新增一个对象即可
 *
 * icon 使用 Bootstrap Icons 类名 (https://icons.getbootstrap.com/)
 */
export const products = [
  {
    id: 'nearwork',
    name: 'AI 智能体',
    nameCN: 'NearWork',
    tagline: '事归其位，人得其所 — 装在自己电脑上的 AI 工作伙伴',
    description:
      'NearWork 是一款装在自己电脑上的多模型 AI 智能体：说一句话，它会读文件、跑命令、查网页、写文档、操作本机应用，把需求直接变成可交付的结果。' +
      '通过 OpenAI、Anthropic、Gemini 三种标准协议接入 DeepSeek、通义千问、Kimi、智谱、豆包、OpenAI、Anthropic、Gemini 等 16 家模型供应商，官方额度与自带 API Key 随时切换。' +
      '内置 75 个工具与 MCP 插件、22 个技能，覆盖 Windows / macOS / Linux 桌面端、命令行、VS Code 扩展与网页对话。' +
      '配置、会话、技能与知识库都保存在本机，只有发给所选模型的请求会离开电脑。',
    features: [
      { icon: 'bi-display', title: '多端覆盖', desc: 'Windows / macOS / Linux 桌面端、命令行、VS Code 扩展与网页对话，同一个引擎随处接续' },
      { icon: 'bi-cpu', title: '16 家模型自由选', desc: '兼容 OpenAI / Anthropic / Gemini 三种主流协议，官方额度或自带 API Key，切换不丢上下文' },
      { icon: 'bi-grid-3x3-gap', title: '七个模型槽位', desc: '极速、思考、视觉、图像编辑、语音生成、语音识别、向量嵌入各管一件事，成本与效果各归各位' },
      { icon: 'bi-tools', title: '75 个内置工具', desc: '文件读写、命令执行、网页抓取、文档表格、图像语音，按任务需要加载，不乱塞给模型' },
      { icon: 'bi-pc-display', title: '替你操作电脑', desc: '看屏幕、点鼠标、敲键盘，跨应用完成填表、点按、截图等重复操作' },
      { icon: 'bi-mic', title: '语音与定时任务', desc: '连续语音对话，说出想法即可开工；定时任务无人值守，到点自动执行' },
      { icon: 'bi-shield-check', title: '数据本地优先', desc: '配置、会话与知识库留在本机，API Key 加密存储，四种权限模式拦截危险操作' },
      { icon: 'bi-people', title: '团队与扩展', desc: 'MCP 插件接外部服务，22 个内置技能按需激活，多智能体分工执行后自动汇总' }
    ],
    techStack: ['桌面端', '命令行', 'VS Code 扩展', '网页对话', 'MCP'],
    status: 'active',
    link: 'https://nearwork.regaing.com',
    linkType: 'access',
    npmLink: 'https://www.npmjs.com/package/@lingxi-agent/core',
    logo: '/logo/nearwork.png'
  },
  {
    id: 'password-manager',
    name: 'Password Manager',
    nameCN: '记得 · 密码管理器',
    tagline: '零信任架构 — 主密码从不离开你的设备',
    description:
      '一款零信任架构的密码管理器：所有敏感数据在浏览器端完成 AES-256-GCM 加密后才传输，服务端只保存密文——它拿不到你的主密码，也打不开你的保险库。' +
      '登录采用 OPAQUE 协议（RFC 9807），主密码连派生值都不会离开设备。' +
      '支持密码生成、文件夹分类、TOTP 二次验证、密码健康与泄露检测、加密导入导出；配套 Chrome 扩展自动填充，并提供 MCP 服务让 AI 助手安全取用账号。',
    features: [
      { icon: 'bi-shield-lock-fill', title: '零信任加密', desc: '客户端加密后才上传，服务端零明文存储，拿不到主密码就打不开保险库' },
      { icon: 'bi-key-fill', title: '主密码不出设备', desc: 'OPAQUE 登录协议（RFC 9807），服务端接触不到口令和口令派生值' },
      { icon: 'bi-stars', title: '密码生成器', desc: '按长度与字符类型生成高强度随机密码，生成即存，不用自己编' },
      { icon: 'bi-folder-fill', title: '文件夹管理', desc: '树形目录分类，工作、生活、财务各归其位，查找不用翻半天' },
      { icon: 'bi-phone-fill', title: 'TOTP 二次验证', desc: '验证码内置生成，扫码即绑定，不必再装额外的验证器 App' },
      { icon: 'bi-heart-pulse-fill', title: '健康与泄露检测', desc: '扫描弱密码、重复密码与已泄露密码，以 k-匿名方式核对，不上传明文' },
      { icon: 'bi-lightning-charge-fill', title: 'Chrome 自动填充', desc: '配套浏览器扩展，登录时一键填写，告别手动输入和复制粘贴' },
      { icon: 'bi-robot', title: 'AI 助手接入', desc: '提供 MCP 服务，AI 助手可代为查询取用账号；账号统一存放在本机加密文件' }
    ],
    techStack: ['Web 管理端', 'Chrome 扩展', 'MCP', 'OPAQUE', 'AES-256-GCM', 'TOTP'],
    status: 'active',
    link: 'https://pwd.regaing.com',
    linkType: 'access',
    npmLink: 'https://www.npmjs.com/package/credential-vault-mcp',
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
