<template>
  <div class="doc-detail-page" v-if="doc">
    <!-- Header -->
    <section class="doc-header">
      <div class="container">
        <nav class="doc-breadcrumb">
          <router-link to="/docs" class="doc-breadcrumb__link">
            <i class="bi bi-journal-text"></i> 文档
          </router-link>
          <i class="bi bi-chevron-right"></i>
          <span>{{ doc.category }}</span>
        </nav>
        <h1 class="doc-header__title">{{ doc.title }}</h1>
        <p class="doc-header__desc">{{ doc.description }}</p>
        <div class="doc-header__meta">
          <span class="doc-header__date">
            <i class="bi bi-calendar3"></i> {{ doc.date }}
          </span>
          <span class="doc-header__category tag">
            <i :class="`bi ${doc.categoryIcon}`"></i> {{ doc.category }}
          </span>
          <span class="mini-tag" v-for="tag in doc.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section doc-content-section">
      <div class="container">
        <div class="doc-layout">
          <!-- Main Content -->
          <article class="doc-main">
            <DocViewer :content="doc.rawContent" />
          </article>

          <!-- Sidebar -->
          <aside class="doc-sidebar">
            <!-- Table of Contents -->
            <div class="doc-toc" v-if="headings.length">
              <h4 class="doc-toc__title"><i class="bi bi-list-ul"></i> 目录导航</h4>
              <nav class="doc-toc__nav">
                <a
                  v-for="(h, i) in headings"
                  :key="i"
                  :href="`#${h.id}`"
                  :class="['doc-toc__link', `doc-toc__link--h${h.level}`]"
                  @click.prevent="scrollToHeading(h.id)"
                >{{ h.text }}</a>
              </nav>
            </div>

            <!-- Product Link -->
            <div class="doc-side-card" v-if="doc.productId">
              <h4 class="doc-side-card__title">
                <i class="bi bi-box-seam-fill"></i> 相关产品
              </h4>
              <router-link :to="`/products#${doc.productId}`" class="doc-side-card__link">
                查看产品详情 <i class="bi bi-arrow-right-short"></i>
              </router-link>
            </div>
          </aside>
        </div>

        <!-- Prev / Next -->
        <nav class="doc-pagination">
          <router-link
            v-if="adjacent.prev"
            :to="`/docs/${adjacent.prev.id}`"
            class="doc-pagination__link doc-pagination__link--prev"
          >
            <i class="bi bi-arrow-left"></i>
            <div>
              <span class="doc-pagination__label">上一篇</span>
              <span class="doc-pagination__title">{{ adjacent.prev.title }}</span>
            </div>
          </router-link>
          <div v-else class="doc-pagination__spacer"></div>

          <router-link
            v-if="adjacent.next"
            :to="`/docs/${adjacent.next.id}`"
            class="doc-pagination__link doc-pagination__link--next"
          >
            <div>
              <span class="doc-pagination__label">下一篇</span>
              <span class="doc-pagination__title">{{ adjacent.next.title }}</span>
            </div>
            <i class="bi bi-arrow-right"></i>
          </router-link>
          <div v-else class="doc-pagination__spacer"></div>
        </nav>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta">
      <div class="container cta__inner">
        <h2 class="cta__title">还有疑问？</h2>
        <p class="cta__desc">查看其他相关文档，或在产品页面了解更多信息。</p>
        <router-link to="/docs" class="btn btn-primary" style="font-size: 1.05rem; padding: 14px 36px">
          <i class="bi bi-journal-text"></i> 浏览更多文档
        </router-link>
      </div>
    </section>
  </div>

  <!-- Not Found -->
  <div v-else class="doc-not-found">
    <div class="container" style="text-align: center; padding: var(--space-4xl) 0;">
      <i class="bi bi-file-earmark-x" style="font-size: 4rem; color: var(--text-muted);"></i>
      <h2 style="margin-top: var(--space-lg);">文档未找到</h2>
      <p style="color: var(--text-secondary); margin-top: var(--space-sm);">
        抱歉，您要查看的文档不存在或已被移除。
      </p>
      <router-link to="/docs" class="btn btn-primary" style="margin-top: var(--space-xl);">
        <i class="bi bi-arrow-left"></i> 返回文档列表
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import DocViewer from '@/components/DocViewer.vue'
import { getDocById, getAdjacentDocs } from '@/data/docs.js'

const route = useRoute()

const docId = computed(() => route.params.docId)
const doc = computed(() => getDocById(docId.value))
const adjacent = computed(() => getAdjacentDocs(docId.value))

// Extract headings for TOC
const headings = ref([])

function extractHeadings() {
  nextTick(() => {
    const article = document.querySelector('.doc-main')
    if (!article) return
    const hs = article.querySelectorAll('h1, h2, h3')
    headings.value = Array.from(hs)
      .filter(h => h.id)
      .map(h => ({
        id: h.id,
        text: h.textContent.replace('#', '').trim(),
        level: parseInt(h.tagName[1])
      }))
  })
}

function scrollToHeading(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Watch for doc changes to re-extract headings
watch(doc, () => {
  headings.value = []
  extractHeadings()
}, { immediate: false })

onMounted(() => {
  extractHeadings()
})
</script>

<style scoped>
/* ===== Header ===== */
.doc-header {
  padding: var(--space-4xl) 0 var(--space-3xl);
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
}

.doc-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
}

.doc-breadcrumb__link {
  color: var(--color-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.doc-breadcrumb__link:hover {
  text-decoration: underline;
}

.doc-header__title {
  font-size: var(--text-5xl);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.doc-header__desc {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-top: var(--space-md);
  max-width: 700px;
}

.doc-header__meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  flex-wrap: wrap;
}

.doc-header__date {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.doc-header__category {
  font-weight: 600;
}

.mini-tag {
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 2px 8px;
  background: var(--color-bg-alt);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
}

/* ===== Layout ===== */
.doc-content-section {
  background: var(--color-bg);
}

.doc-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: var(--space-3xl);
  align-items: start;
}

/* ===== Main Content ===== */
.doc-main {
  background: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  min-width: 0;
}

/* ===== Sidebar ===== */
.doc-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 24px);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.doc-toc,
.doc-side-card {
  background: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
}

.doc-toc__title,
.doc-side-card__title {
  font-size: var(--text-sm);
  font-weight: 700;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-primary);
}

.doc-toc__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 50vh;
  overflow-y: auto;
}

.doc-toc__link {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  border-left: 2px solid transparent;
  line-height: 1.4;
}

.doc-toc__link:hover {
  color: var(--color-primary);
  background: var(--color-primary-lighter);
  border-left-color: var(--color-primary);
}

.doc-toc__link--h1 { padding-left: 10px; font-weight: 600; }
.doc-toc__link--h2 { padding-left: 20px; }
.doc-toc__link--h3 { padding-left: 30px; }

.doc-side-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  transition: opacity var(--transition-fast);
}

.doc-side-card__link:hover {
  opacity: 0.7;
}

/* ===== Pagination ===== */
.doc-pagination {
  display: flex;
  justify-content: space-between;
  gap: var(--space-lg);
  margin-top: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--border-color);
}

.doc-pagination__spacer {
  flex: 1;
}

.doc-pagination__link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  max-width: 400px;
  padding: var(--space-lg);
  background: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.doc-pagination__link:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.doc-pagination__link--next {
  text-align: right;
  justify-content: flex-end;
}

.doc-pagination__link > .bi {
  font-size: 1.25rem;
  color: var(--color-primary);
  flex-shrink: 0;
}

.doc-pagination__label {
  display: block;
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: 2px;
}

.doc-pagination__title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}

/* ===== Not Found ===== */
.doc-not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  .doc-layout {
    grid-template-columns: 1fr;
  }

  .doc-sidebar {
    position: static;
    order: -1;
  }

  .doc-toc__nav {
    max-height: none;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .doc-toc__link {
    border-left: none;
    border-bottom: 2px solid transparent;
    padding: 4px 8px;
  }

  .doc-toc__link:hover {
    border-left-color: transparent;
    border-bottom-color: var(--color-primary);
  }
}

@media (max-width: 768px) {
  .doc-header__title {
    font-size: var(--text-3xl);
  }

  .doc-main {
    padding: var(--space-lg);
  }

  .doc-pagination {
    flex-direction: column;
  }

  .doc-pagination__link {
    max-width: none;
  }
}
</style>
