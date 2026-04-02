<script>


export default {
  methods: {
    changesprache(sprache) {
      this.$i18n.locale = sprache
      localStorage.setItem('sprache', sprache)
    },
    created() {
      const savedsprache = localStorage.getItem('sprache')
      if (savedsprache) {
        this.$i18n.locale = savedsprache
      }
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

</style>