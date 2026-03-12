<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
    <p>{{ $t('login') }}</p>
    <button @click="changesprache('en')">{{ $t('sprache') }} (EN)</button>
    <button @click="changesprache('de')">{{ $t('sprache') }} (DE)</button>

  </div>
</template>

<script>
export default {
  methods: {
    changesprache(sprache) {
      this.$i18n.locale = sprache
      localStorage.setItem('sprache', sprache)
    }
  },
  created() {
    const savedsprache = localStorage.getItem('sprache')
    if (savedsprache) {
      this.$i18n.locale = savedsprache
    }
  }
}
</script>