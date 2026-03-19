<script>


export default {
  methods: {
    changesprache(sprache) {
      this.$i18n.locale = sprache
      localStorage.setItem('sprache', sprache)
    },
    navigateToLoginView() {
      this.$router.push('/login')
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


<template>
  <body>
  <div>
    <h1>{{ $t('welcome') }}</h1>

    <button @click="changesprache('en')">{{ $t('sprache') }} (EN)</button>
    <button @click="changesprache('de')">{{ $t('sprache') }} (DE)</button>



  </div>
  <button @click="navigateToLoginView">Sign Up</button>
  </body>

  <router-view />

</template>

<style scoped>


</style>