<template>
  <div class="products-page">
    <!-- Page Header -->
    <section class="products-hero">
      <div class="container">
        <span class="tag"><i class="bi bi-grid-3x3-gap-fill"></i> 产品</span>
        <h1 class="products-hero__title">
          用心打造的<span class="text-gradient">数字工具</span>
        </h1>
        <p class="products-hero__desc">
          每一款产品都凝聚着我们对安全、体验和品质的追求
        </p>
      </div>
    </section>

    <!-- Active Products -->
    <section class="section product-detail" v-for="product in activeProducts" :key="product.id" :id="product.id">
      <div class="container">
        <div class="product-detail__card">
          <!-- Product Header -->
          <div class="product-detail__header">
            <div class="product-detail__info">
              <div class="product-detail__icon">
                <i v-if="!product.logo" :class="`bi ${product.features[0]?.icon || 'bi-box-seam-fill'}`" class="product-detail__icon-fallback"></i>
                <img
                  :src="product.logo || `/logo/product_${product.id}_logo.png`"
                  :alt="product.nameCN"
                  class="product-detail__icon-img"
                  @error="(e) => e.target.style.display = 'none'"
                />
              </div>
              <div>
                <div class="product-detail__name-row">
                  <h2 class="product-detail__name">{{ product.nameCN }}</h2>
                  <span class="tag">{{ product.name }}</span>
                </div>
                <p class="product-detail__tagline">{{ product.tagline }}</p>
              </div>
            </div>
            <div class="product-detail__tech">
              <span class="tech-badge" v-for="tech in product.techStack" :key="tech">{{ tech }}</span>
            </div>
          </div>

          <!-- Product Image -->
          <div class="product-detail__image">
            <img
              :src="`/assets/images/${product.id}-preview.png`"
              :alt="product.nameCN"
              class="product-detail__img"
              @error="(e) => onImageError(e, product.id)"
            />
            <div class="product-detail__img-placeholder" v-if="imgErrors[product.id]">
              <i class="bi bi-image" style="font-size: 3rem; color: var(--text-muted);"></i>
              <span>{{ product.nameCN }} 预览</span>
            </div>
          </div>

          <!-- Description -->
          <div class="product-detail__desc">
            <h3><i class="bi bi-info-circle-fill"></i> 产品介绍</h3>
            <p>{{ product.description }}</p>
          </div>

          <!-- Features Grid -->
          <div class="product-detail__features">
            <h3><i class="bi bi-grid-fill"></i> 核心功能</h3>
            <div class="features-grid">
              <div class="feature-item" v-for="f in product.features" :key="f.title">
                <span class="feature-item__icon">
                  <i :class="`bi ${f.icon}`"></i>
                </span>
                <div>
                  <h4 class="feature-item__title">{{ f.title }}</h4>
                  <p class="feature-item__desc">{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Action -->
          <!-- Action -->
          <div class="product-detail__actions">
            <!-- 闭源产品：快速访问按钮 -->
            <a v-if="product.linkType === 'access'" :href="product.link" class="btn btn-primary" target="_blank" rel="noopener">
              <i class="bi bi-rocket-takeoff-fill"></i> 快速访问
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
            <!-- npm 使用按钮 -->
            <a v-if="product.npmLink" :href="product.npmLink" class="btn btn-outline" target="_blank" rel="noopener">
              <i class="bi bi-box-seam"></i> npm 使用
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
            <!-- 开源产品：查看源码按钮 -->
            <a v-if="product.linkType === 'source'" :href="product.link" class="btn btn-primary" target="_blank" rel="noopener">
              <i class="bi bi-github"></i> 查看源码
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon -->
    <section class="section coming-soon" v-if="comingProducts.length">
      <div class="container">
        <h2 class="section-title" style="text-align: center; margin-bottom: var(--space-3xl)">
          即将推出
        </h2>
        <div class="coming-soon__grid">
          <div class="coming-card" v-for="p in comingProducts" :key="p.id">
            <div class="coming-card__icon">
              <i class="bi bi-tools"></i>
            </div>
            <h3 class="coming-card__name">{{ p.nameCN }}</h3>
            <p class="coming-card__tagline">{{ p.tagline }}</p>
            <span class="tag tag-coming">即将推出</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="section" style="text-align: center; padding: var(--space-2xl) 0">
      <div class="container">
        <i class="bi bi-stars" style="font-size: 2rem; color: var(--text-muted); margin-right: 8px;"></i>
        <span style="color: var(--text-tertiary); font-size: var(--text-lg);">
          更多产品正在规划中，敬请期待
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getActiveProducts, getComingProducts } from '@/data/products.js'

const activeProducts = getActiveProducts()
const comingProducts = getComingProducts()

const imgErrors = reactive({})

function onImageError(e, productId) {
  e.target.style.display = 'none'
  imgErrors[productId] = true
}
</script>

<style scoped>
/* ===== Hero ===== */
.products-hero {
  padding: var(--space-4xl) 0 var(--space-3xl);
  text-align: center;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
}

.products-hero__title {
  font-size: var(--text-5xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-top: var(--space-md);
}

.products-hero__desc {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-top: var(--space-md);
}

/* ===== Product Detail Card ===== */
.product-detail {
  padding-top: 0;
}

.product-detail__card {
  background: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
}

/* Header */
.product-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
  flex-wrap: wrap;
}

.product-detail__info {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.product-detail__icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-lighter);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.product-detail__icon-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.product-detail__icon-fallback {
  position: absolute;
  font-size: 2rem;
  color: var(--color-primary);
}

.product-detail__name-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xs);
}

.product-detail__name {
  font-size: var(--text-3xl);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.product-detail__tagline {
  font-size: var(--text-base);
  color: var(--text-secondary);
}

.product-detail__tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.tech-badge {
  font-size: var(--text-xs);
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  background: var(--color-bg-alt);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
}

/* Image */
.product-detail__image {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-2xl);
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-detail__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-detail__img-placeholder {
  text-align: center;
  color: var(--text-tertiary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

/* Description */
.product-detail__desc {
  margin-bottom: var(--space-2xl);
}

.product-detail__desc h3,
.product-detail__features h3 {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.product-detail__desc p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.8;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
}

.feature-item {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--color-bg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  transition: all var(--transition-normal);
}

.feature-item:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-sm);
}

.feature-item__icon {
  font-size: 1.25rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-item__title {
  font-size: var(--text-base);
  font-weight: 600;
  margin-bottom: 4px;
}

.feature-item__desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Actions */
.product-detail__actions {
  margin-top: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--border-light);
  display: flex;
  gap: var(--space-md);
}

.product-detail__actions .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

/* ===== Coming Soon ===== */
.coming-soon {
  background: var(--color-white);
  border-top: 1px solid var(--border-light);
}

.coming-soon__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-lg);
}

.coming-card {
  background: var(--color-bg);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-normal);
}

.coming-card:hover {
  border-color: var(--color-primary-light);
  border-style: solid;
}

.coming-card__icon {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.coming-card__name {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.coming-card__tagline {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .products-hero__title {
    font-size: var(--text-3xl);
  }

  .product-detail__header {
    flex-direction: column;
  }

  .product-detail__info {
    flex-direction: column;
    align-items: flex-start;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .product-detail__card {
    padding: var(--space-lg);
  }
}
</style>
