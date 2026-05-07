<script>
import LanguageButtons from "@/components/languageButtons.vue";

export default {
  components: {LanguageButtons},
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
  <div>
    <h2>Login</h2>
    <form>
      <input type="text" placeholder="Benutzername" />
      <input type="password" placeholder="Passwort" />

      <button @click="navigateTobeitragView">Anmelden</button>

      <button @click="navigateToregistrationView">Registrieren</button>

    </form>
  </div>

  <languageButtons/>

</template>

<style>

form  {
  padding: 20px;
  margin: 60px;

}



</style>