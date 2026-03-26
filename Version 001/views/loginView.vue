<script>
export default {
  methods: {
    navigateTobeitragView() {
      this.$router.push('/beitrag')
    }
  }
}
</script>

<template>
  <router-view />
  <div>
    <h2>Login</h2>
    <form>
      <input type="text" placeholder="Benutzername" />
      <input type="password" placeholder="Passwort" />

      <button @click="navigateTobeitragView">Anmelden</button>

    </form>
  </div>

</template>

<style scoped>




</style>