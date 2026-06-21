<template>
  <div class="home">
    <!-- ===== Hero ===== -->
    <section class="hero">
      <div class="hero__bg">
        <div class="hero__gradient"></div>
        <div class="hero__grid"></div>
      </div>
      <div class="container hero__content">
        <div class="hero__badge animate-in">
          <span class="tag"><i class="bi bi-cpu-fill"></i> AI 驱动</span>
        </div>
        <h1 class="hero__title animate-in" style="animation-delay: 0.1s">
          记所得，<span class="text-gradient">得所记</span>
        </h1>
        <p class="hero__desc animate-in" style="animation-delay: 0.2s">
          从 AI 智能助手到数字工具，记得科技致力于打造安全、可靠、易用的数字化产品。<br />
          让每一次记录都有价值，让每一份数据都有保障。
        </p>
        <div class="hero__actions animate-in" style="animation-delay: 0.3s">
          <router-link to="/products" class="btn btn-primary">
            探索产品
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>
      </div>
      <!-- Hero Illustration -->
      <div class="hero__illustration animate-in" style="animation-delay: 0.4s">
        <img
          src="/assets/images/hero-illustration.png"
          alt="记得科技"
          class="hero__img"
          @error="(e) => e.target.style.display = 'none'"
        />
      </div>
    </section>

    <!-- ===== Core Values ===== -->
    <section class="section values">
      <div class="container">
        <div class="values__header">
          <span class="tag">核心价值</span>
          <h2 class="section-title" style="margin-top: 16px">我们坚守的原则</h2>
        </div>
        <div class="values__grid">
          <div class="value-card animate-in" v-for="(v, i) in values" :key="i"
               :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="value-card__icon">
              <i :class="`bi ${v.icon}`"></i>
            </div>
            <h3 class="value-card__title">{{ v.title }}</h3>
            <p class="value-card__desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Products Preview ===== -->
    <section class="section products-preview">
      <div class="container">
        <div class="products-preview__header">
          <span class="tag">产品</span>
          <h2 class="section-title" style="margin-top: 16px">我们的产品</h2>
          <router-link to="/products" class="products-preview__more">
            查看全部
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>
        <div class="products-preview__grid">
          <div class="product-card animate-in" v-for="(p, i) in previewProducts" :key="p.id"
               :style="{ animationDelay: `${i * 0.15}s` }">
            <div class="product-card__icon">
              <img v-if="p.logo" :src="p.logo" :alt="p.nameCN" class="product-card__logo" />
              <i v-else :class="`bi ${p.features[0].icon}`"></i>
            </div>
            <h3 class="product-card__name">{{ p.nameCN }}</h3>
            <p class="product-card__tagline">{{ p.tagline }}</p>
            <div class="product-card__features">
              <span class="product-card__feature" v-for="f in p.features.slice(0, 4)" :key="f.title">
                <i :class="`bi ${f.icon}`"></i> {{ f.title }}
              </span>
            </div>
            <router-link :to="`/products#${p.id}`" class="product-card__link">
              了解详情 <i class="bi bi-arrow-right-short"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="section cta">
      <div class="container cta__inner">
        <h2 class="cta__title">准备好开始了吗？</h2>
        <p class="cta__desc">体验记得科技的产品，让每一次记录都有价值。</p>
        <router-link to="/products" class="btn btn-primary" style="font-size: 1.05rem; padding: 14px 36px">
          立即探索
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getActiveProducts } from '@/data/products.js'

const values = [
  {
    icon: 'bi-cpu-fill',
    title: '智能驱动',
    desc: '兼容 OpenAI、Anthropic、Gemini 三大协议，市面所有大模型自由接入，四模型槽智能调度。AI 洞察你的意图，让每一次交互都高效精准。'
  },
  {
    icon: 'bi-shield-lock-fill',
    title: '安全第一',
    desc: '端到端加密、四层权限模型、本地优先处理。安全不是功能，是我们的基因。'
  },
  {
    icon: 'bi-stars',
    title: '极简体验',
    desc: '去掉一切不必要的复杂性，让工具回归本质——简单、直观、好用。'
  },
  {
    icon: 'bi-lightning-charge-fill',
    title: '持续迭代',
    desc: '快速响应用户反馈，小步快跑，让产品不断进化。'
  }
]
const previewProducts = getActiveProducts()
</script>

<style scoped>
/* ===== Hero ===== */
.hero {
  position: relative;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(124, 58, 237, 0.05) 0%, transparent 70%);
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 70%);
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 640px;
  padding-top: var(--space-2xl);
}

.hero__badge {
  margin-bottom: var(--space-lg);
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: var(--space-lg);
}

.hero__desc {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-xl);
}

.hero__actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.hero__illustration {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: 50%;
  max-width: 700px;
}

.hero__img {
  width: 100%;
}

/* ===== Values ===== */
.values {
  background: var(--color-bg);
}

.values__header {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.values__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
}

.value-card {
  background: var(--color-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
  opacity: 0;
}

.value-card:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.value-card__icon {
  font-size: 1.75rem;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.value-card__title {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.value-card__desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ===== Products Preview ===== */
.products-preview {
  background: var(--color-white);
}

.products-preview__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-md);
  margin-bottom: var(--space-3xl);
}

.products-preview__header .section-title {
  flex: 1;
}

.products-preview__more {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 4px;
  transition: gap var(--transition-fast);
}

.products-preview__more:hover {
  gap: 8px;
}

.products-preview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-lg);
}

.product-card {
  background: var(--color-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
  opacity: 0;
}

.product-card:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.product-card__icon {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.product-card__logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.product-card__name {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.product-card__tagline {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
}

.product-card__features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.product-card__feature {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  background: var(--color-white);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.product-card__link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 2px;
  transition: opacity var(--transition-fast);
}

.product-card__link:hover {
  opacity: 0.7;
}

/* ===== CTA ===== */
.cta {
  background: var(--color-bg);
}

.cta__inner {
  text-align: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 100%);
  border-radius: var(--radius-xl);
  padding: var(--space-3xl) var(--space-2xl);
  color: var(--text-inverse);
}

.cta__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-md);
}

.cta__desc {
  font-size: var(--text-lg);
  opacity: 0.85;
  margin-bottom: var(--space-xl);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .hero__illustration {
    display: none;
  }

  .hero__content {
    max-width: 100%;
    text-align: center;
  }

  .hero__actions {
    justify-content: center;
  }

  .values__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .values__grid {
    grid-template-columns: 1fr;
  }

  .products-preview__grid {
    grid-template-columns: 1fr;
  }

  .hero__title {
    font-size: 2.2rem;
  }
}
</style>
