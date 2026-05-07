<script>
export default {
  methods: {
    navigateTobeitragView() {
      this.$router.push('/topPosts')
    },
    navigateToregistrationView() {
      this.$router.push('/registration')
    }
  }
}
</script>

<template>
  <router-view />

  <div id="Outer">

    <div id="inner">
      <h2>Welcome Back!</h2>
      <p id="untertitel"> Continue your journey</p>
      <form>
        <input type="text" placeholder="Benutzername" />
        <input type="password" placeholder="Passwort" />

        <button @click="navigateTobeitragView">Anmelden</button>

        <button @click="navigateToregistrationView">Registrieren</button>

      </form>
    </div>

  </div>

  <footer>
    <p> © Team Voyagediary 2026 </p>
  </footer>

</template>

<style>

form  {
  padding: 20px;
  margin: 60px;

}



</style>