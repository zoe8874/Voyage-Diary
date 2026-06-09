<script>
export default {
  data() {
    return {
      menuOpen: false
    }
  },
  created() {
    const savedLang = localStorage.getItem('sprache')
    if (savedLang) {
      this.$i18n.locale = savedLang
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('sprache', lang)
      this.menuOpen = false
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>

<template>
  <div id="language-switcher">
    <button class="burger-lang" @click="toggleMenu">
      {{ $i18n.locale.toUpperCase() }}
    </button>

    <div v-if="menuOpen" class="dropdown-lang">
      <button @click="changeLanguage('en')">English (EN)</button>
      <button @click="changeLanguage('de')">Deutsch (DE)</button>
      <button @click="changeLanguage('es')">Español (ES)</button>
      <button @click="changeLanguage('fr')">Français (FR)</button>
      <button @click="changeLanguage('it')">Italiano (IT)</button>
    </div>
  </div>
</template>

<style scoped>

#language-switcher {
  position: relative;
  top: auto;
  right: auto;
  z-index: auto;
}
.burger-lang {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: var(--card-bg);
  border: 1px solid var(--container-border);
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s ease;
  color: var(--text-primary);
}

.burger-lang:hover {
  background: var(--heading-color);
  color: white;
}

.dropdown-lang {
  position: absolute;
  top: 56px;
  left: 0;
  right: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  padding: 12px;
  border-radius: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--container-border);
  min-width: 140px;
  z-index: 9999;
}

.dropdown-lang button {
  background: transparent;
  border: none;
  padding: 10px 16px;
  text-align: left;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: 0.2s;
}

.dropdown-lang button:hover {
  background: var(--heading-color);
  color: white;
}

/* Kleine Mobiloptimierung */
@media (max-width: 480px) {
  #language-switcher {
    top: 12px;
    right: 12px;
  }
  .burger-lang {
    width: 42px;
    height: 42px;
    font-size: 20px;
  }
}
</style>