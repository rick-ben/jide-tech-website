<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__inner container">
      <!-- Logo -->
      <router-link to="/" class="header__logo">
        <img
          src="/logo/logo1.png"
          alt="记得科技"
          class="header__logo-img"
        />
      </router-link>

      <!-- Nav -->
      <nav class="header__nav">
        <router-link to="/" class="header__link">首页</router-link>
        <router-link to="/products" class="header__link">产品</router-link>
        <router-link to="/docs" class="header__link">文档</router-link>
        <!-- 开源仓库（Gitee） -->
        <a
          href="https://gitee.com/regaing"
          class="header__gitee"
          target="_blank"
          rel="noopener"
          title="开源仓库（Gitee）"
          aria-label="开源仓库（Gitee）"
        >
          <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle fill="#C71D23" cx="44.8544363" cy="44.8544363" r="44.8544363"></circle>
            <path fill="#FFFFFF" d="M67.558546,39.8714292 L42.0857966,39.8714292 C40.8627004,39.8720094 39.8710953,40.8633548 39.8701949,42.0864508 L39.8687448,47.623783 C39.867826,48.8471055 40.8592652,49.8390642 42.0825879,49.8393845 C42.0827874,49.8393846 42.0829869,49.8393846 42.0831864,49.8387862 L57.5909484,49.838657 C58.8142711,49.8386283 59.8059783,50.830319 59.8059885,52.0536417 C59.8059885,52.0536479 59.8059885,52.053654 59.8059701,52.0536602 L59.8059701,52.6073539 L59.8059701,52.6073539 L59.8059701,53.161115 C59.8059701,56.8310831 56.8308731,59.80618 53.160905,59.80618 L32.1165505,59.80618 C30.8934034,59.806119 29.9018373,58.8145802 29.9017425,57.5914331 L29.9011625,36.5491188 C29.9008781,32.8791508 32.8758931,29.9039718 36.5458611,29.9038706 C36.5459222,29.9038706 36.5459833,29.9038706 36.5460443,29.9040538 L67.5523638,29.9040538 C68.77515,29.9026795 69.7666266,28.9118177 69.7687593,27.6890325 L69.7721938,22.1516997 C69.774326,20.928378 68.7832423,19.9360642 67.5599198,19.9353054 C67.5594619,19.9353051 67.5590039,19.935305 67.558546,19.9366784 L36.5479677,19.9366784 C27.3730474,19.9366784 19.935305,27.3744208 19.935305,36.549341 L19.935305,67.558546 C19.935305,68.7818687 20.927004,69.7735676 22.1503267,69.7735676 L54.8224984,69.7735676 C63.079746,69.7735676 69.7735676,63.079746 69.7735676,54.8224984 L69.7735676,42.0864509 C69.7735676,40.8631282 68.7818687,39.8714292 67.558546,39.8714292 Z"></path>
          </svg>
        </a>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button
        class="header__menu-btn"
        @click="menuOpen = !menuOpen"
        aria-label="菜单"
      >
        <i :class="menuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
      </button>
    </div>

    <!-- Mobile Nav -->
    <transition name="slide-down">
      <nav v-if="menuOpen" class="header__mobile-nav">
        <router-link to="/" class="header__mobile-link" @click="menuOpen = false">首页</router-link>
        <router-link to="/products" class="header__mobile-link" @click="menuOpen = false">产品</router-link>
        <router-link to="/docs" class="header__mobile-link" @click="menuOpen = false">文档</router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-normal);
}

.header--scrolled {
  border-bottom-color: var(--border-color);
  box-shadow: var(--shadow-sm);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  transition: opacity var(--transition-fast);
}

.header__logo:hover {
  opacity: 0.8;
}

.header__logo-img {
  height: 36px;
  width: auto;
}

/* Desktop Nav */
.header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.header__link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  padding: var(--space-xs) 0;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}

.header__link:hover,
.header__link.router-link-active {
  color: var(--text-primary);
}

.header__link.router-link-active {
  border-bottom-color: var(--color-primary);
}

/* Gitee Link */
.header__gitee {
  display: inline-flex;
  align-items: center;
  line-height: 0;
  padding: var(--space-xs) 0;
  transition: opacity var(--transition-fast);
}

.header__gitee svg {
  width: 18px;
  height: 18px;
  display: block;
}

.header__gitee:hover {
  opacity: 0.75;
}

/* Mobile Menu Btn */
.header__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--text-primary);
  transition: color var(--transition-fast);
}

.header__menu-btn:hover {
  color: var(--color-primary);
}

/* Mobile Nav */
.header__mobile-nav {
  display: none;
  background: var(--color-white);
  border-bottom: 1px solid var(--border-color);
  padding: var(--space-md) var(--space-lg);
}

.header__mobile-link {
  display: block;
  padding: var(--space-md) 0;
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
  transition: color var(--transition-fast);
}

.header__mobile-link:last-child {
  border-bottom: none;
}

.header__mobile-link:hover {
  color: var(--color-primary);
}

/* Slide down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .header__nav {
    display: none;
  }

  .header__menu-btn {
    display: flex;
  }

  .header__mobile-nav {
    display: block;
  }
}
</style>
