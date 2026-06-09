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

@media (min-width: 768px) and (max-width: 1024px) {
 
  .desktop-nav {
    width: 95%;
    max-width: 1400px;
    padding: 1.2rem 1.8rem;
    gap: 1.5rem;
    border-radius: 80px;
  }

  
  .logo {
    width: 14%;
    min-width: 100px;
  }

 
  .desktop-nav button {
    padding: 0.8rem 1.8rem;
    font-size: 1.1rem;
  }


  .admin-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  
  .burger-lang {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }

  
  .dropdown-lang {
    top: 64px;
    right: 0;
    left: auto;
    min-width: 180px;
    padding: 16px;
  }

  .dropdown-lang button {
    padding: 12px 18px;
    font-size: 1rem;
  }
}

@media (max-width: 767px) {
 
  .mobile-nav {
    padding: 0.8rem 1rem;
    justify-content: space-between;
    background: var(--container-bg);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .mobile-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo {
    width: 100px; 
    min-width: 80px;
  }

  .burger-btn {
    font-size: 32px; 
    padding: 10px 14px;
  }

 
  .burger-lang {
    width: 48px;
    height: 48px;
    font-size: 22px;
  }

  
  .dropdown-lang {
    position: fixed;
    top: 70px;
    right: 16px;
    left: auto;
    min-width: 200px;
    padding: 16px;
    border-radius: 20px;
  }

  .dropdown-lang button {
    padding: 14px 18px;
    font-size: 1rem;
  }

  /* Hamburger-Dropdown-Menü (für Seiten-Navigation) */
  .mobile-dropdown {
    top: 72px;
    right: 16px;
    left: auto;
    width: auto;
    min-width: 220px;
    padding: 16px;
    gap: 12px;
    background: var(--card-bg);
    border-radius: 24px;
  }

  .mobile-dropdown button {
    padding: 14px 20px;
    font-size: 1rem;
    text-align: left;
    width: 100%;
    border-radius: 40px;
  }

  /* Trennlinie nicht anzeigen auf Mobil (optional) */
  .lang-divider {
    display: none;
  }
}
</style>