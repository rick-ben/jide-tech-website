<template>
  <footer class="footer">
    <div class="footer__inner container">
      <!-- Brand -->
      <div class="footer__brand">
        <div class="footer__logo-row">
          <img src="/logo/logo1.png" alt="记得科技" class="footer__logo" />
        </div>
        <p class="footer__tagline">记所得，得所记 — 让每一次记录都有价值，让每一份数据都有保障</p>
      </div>

      <!-- Links -->
      <div class="footer__links">
        <div class="footer__col">
          <h4 class="footer__col-title">导航</h4>
          <router-link to="/" class="footer__link">首页</router-link>
          <router-link to="/products" class="footer__link">产品</router-link>
          <router-link to="/docs" class="footer__link">文档</router-link>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">产品</h4>
          <router-link to="/products#lingxi-assistant" class="footer__link">灵犀 AI 智能助手</router-link>
          <router-link to="/products" class="footer__link">密码管理器</router-link>
          <router-link to="/products#lovers-nest" class="footer__link">情侣小窝</router-link>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">联系</h4>
          <a href="mailto:lianhao@regaing.com" class="footer__link">
            <i class="bi bi-envelope-fill" style="margin-right: 6px; font-size: 12px;"></i>
            lianhao@regaing.com
          </a>
          <span class="footer__link" style="cursor: default;">
            <i class="bi bi-tencent-qq" style="margin-right: 6px; font-size: 12px;"></i>
            QQ：1848741639
          </span>
        </div>
        <div class="footer__col">
          <h4 class="footer__col-title">友链</h4>
          <a href="https://lingxi.regaing.com" target="_blank" rel="noopener" class="footer__link">
            <i class="bi bi-link-45deg" style="margin-right: 6px;"></i>
            灵犀 AI 智能助手
          </a>
          <a href="https://tool.regaing.cn/" target="_blank" rel="noopener" class="footer__link">
            <i class="bi bi-link-45deg" style="margin-right: 6px;"></i>
            记得网工具箱
          </a>
        </div>
      </div>
    </div>

    <div class="footer__bottom container">
      <p>&copy; {{ year }} 记得科技. All rights reserved.</p>
      <a class="footer__icp" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">蜀ICP备18029818号-5</a>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-bg-dark);
  color: var(--text-inverse);
  padding: var(--space-3xl) 0 0;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3xl);
  padding-bottom: var(--space-2xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Brand */
.footer__logo-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.footer__logo {
  height: 28px;
  width: auto;
  filter: brightness(0) invert(1);
}

.footer__name {
  font-size: var(--text-lg);
  font-weight: 700;
}

.footer__tagline {
  font-size: var(--text-sm);
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* Links */
.footer__links {
  display: flex;
  gap: var(--space-3xl);
}

.footer__col-title {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: var(--space-md);
}

.footer__link {
  display: flex;
  align-items: center;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: var(--space-sm);
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--text-inverse);
}
/* Bottom */
.footer__bottom {
  padding: var(--space-lg) 0;
  font-size: var(--text-xs);
  color: var(--text-muted);
  text-align: center;
}

/* ICP 备案号 */
a.footer__icp,
a.footer__icp:link,
a.footer__icp:visited,
a.footer__icp:hover,
a.footer__icp:active {
  color: var(--text-muted);
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer__inner {
    flex-direction: column;
    gap: var(--space-xl);
  }

  .footer__links {
    flex-direction: column;
    gap: var(--space-xl);
  }
}
</style>
