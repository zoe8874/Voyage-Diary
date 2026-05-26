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
    }
  }
}
</script>

<template>
  <div id="sprachen">


    <button @click="changesprache('en')">{{ $t('sprache') }} (EN)</button>
    <button @click="changesprache('de')">{{ $t('sprache') }} (DE)</button>
    <button @click="changesprache('es')">{{ $t('sprache') }} (ES)</button>
    <button @click="changesprache('fr')">{{ $t('sprache') }} (FR)</button>
    <button @click="changesprache('it')">{{ $t('sprache') }} (IT)</button>


  </div>
</template>

<style scoped>
#sprachen {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.burger {
  font-size: 24px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #f3f3ff;
  cursor: pointer;
  transition: 0.2s ease;
}

.burger:hover {
  background: #e3e3ff;
}

/* Dropdown Menu */
.dropdown {
  position: absolute;
  top: 55px;
  right: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background: white;
  padding: 12px;
  border-radius: 12px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.dropdown button {
  padding: 8px 14px;
  border: none;
  border-radius: 10px;

  background: #f3f3ff;
  cursor: pointer;

  transition: 0.2s ease;
  font-weight: 600;
  text-align: left;
}

.dropdown button:hover {
  background: #e3e3ff;
  transform: translateX(3px);
}
</style>