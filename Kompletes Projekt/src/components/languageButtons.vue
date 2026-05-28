<script>
export default {
  data() {
    return {
      menuOpen: false
    }
  },

  created() {
    const savedsprache = localStorage.getItem('sprache')
    if (savedsprache) {
      this.$i18n.locale = savedsprache
    }
  },

  methods: {
    changesprache(sprache) {
      this.$i18n.locale = sprache
      localStorage.setItem('sprache', sprache)
      this.menuOpen = false
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>

<template>
  <div id="sprachen">


    <button class="burger" @click="toggleMenu">
      {{ $t('|||') }}
    </button>

    <div v-if="menuOpen" class="dropdown">
      <button @click="changesprache('en')">English (EN)</button>
      <button @click="changesprache('de')">Deutsch (DE)</button>
      <button @click="changesprache('es')">Español (ES)</button>
      <button @click="changesprache('fr')">Français (FR)</button>
      <button @click="changesprache('it')">Italiano (IT)</button>
    </div>

  </div>

</template>

<style scoped>

#sprachen {
  position: fixed;
  top: 0;
  right: 0;
  padding: 15px;
  z-index: 1000;
}

.burger {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  border: none;
  border-radius: 10px;
  background: #f3f3ff;
  cursor: pointer;
  transition: 0.2s ease;
}

.burger:hover {
  background: #e3e3ff;
}


.dropdown {
  position: absolute;
  top: 65px;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  z-index: 100;
}
@media (prefers-color-scheme: dark) {
  .burger {background: #1a1a1a}
  
}
</style>