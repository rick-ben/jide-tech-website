<template>
  <div class="docs-page">
    <!-- Page Header -->
    <section class="docs-hero">
      <div class="container">
        <span class="tag"><i class="bi bi-journal-text"></i> 文档</span>
        <h1 class="docs-hero__title">
          技术文档与<span class="text-gradient">教程</span>
        </h1>
        <p class="docs-hero__desc">
          详细的产品文档、部署教程和使用指南，帮助您快速上手
        </p>
      </div>
    </section>

    <!-- Docs by Category -->
    <section class="section" v-for="category in categories" :key="category.name">
      <div class="container">
        <div class="category-header">
          <i :class="`bi ${category.icon}`"></i>
          <h2 class="category-title">{{ category.name }}</h2>
          <span class="category-count">{{ category.docs.length }} 篇</span>
        </div>
        <div class="docs-grid">
          <router-link
            v-for="doc in category.docs"
            :key="doc.id"
            :to="`/docs/${doc.id}`"
            class="doc-card animate-in"
          >
            <div class="doc-card__icon">
              <i class="bi bi-file-text-fill"></i>
            </div>
            <div class="doc-card__body">
              <h3 class="doc-card__title">{{ doc.title }}</h3>
              <p class="doc-card__desc">{{ doc.description }}</p>
              <div class="doc-card__meta">
                <span class="doc-card__date">
                  <i class="bi bi-calendar3"></i> {{ doc.date }}
                </span>
                <span class="doc-card__tags">
                  <span class="mini-tag" v-for="tag in doc.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
                </span>
              </div>
            </div>
            <div class="doc-card__arrow">
              <i class="bi bi-chevron-right"></i>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-if="!categories.length" class="section" style="text-align: center; padding: var(--space-2xl) 0">
      <div class="container">
        <i class="bi bi-journal-x" style="font-size: 2rem; color: var(--text-muted); margin-right: 8px;"></i>
        <span style="color: var(--text-tertiary); font-size: var(--text-lg);">
          文档正在整理中，敬请期待
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getCategories } from '@/data/docs.js'

const categories = getCategories()
</script>

<style scoped>
/* ===== Hero ===== */
.docs-hero {
  padding: var(--space-4xl) 0 var(--space-3xl);
  text-align: center;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
}

.docs-hero__title {
  font-size: var(--text-5xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-top: var(--space-md);
}

.docs-hero__desc {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-top: var(--space-md);
}

/* ===== Category ===== */
.category-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 2px solid var(--border-light);
}

.category-header > .bi {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.category-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  flex: 1;
}

.category-count {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* ===== Docs Grid ===== */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--space-md);
}

/* ===== Doc Card ===== */
.doc-card {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  background: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-normal);
  opacity: 0;
}

.doc-card:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.doc-card__icon {
  font-size: 2rem;
  color: var(--color-primary);
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-lighter);
  border-radius: var(--radius-md);
}

.doc-card__body {
  flex: 1;
  min-width: 0;
}

.doc-card__title {
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.doc-card__desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doc-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.doc-card__date {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.doc-card__tags {
  display: flex;
  gap: 4px;
}

.mini-tag {
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 2px 8px;
  background: var(--color-bg-alt);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.doc-card__arrow {
  color: var(--text-tertiary);
  font-size: var(--text-lg);
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.doc-card:hover .doc-card__arrow {
  transform: translateX(4px);
  color: var(--color-primary);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .docs-hero__title {
    font-size: var(--text-3xl);
  }

  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
