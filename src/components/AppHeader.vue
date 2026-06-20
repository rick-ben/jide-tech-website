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
