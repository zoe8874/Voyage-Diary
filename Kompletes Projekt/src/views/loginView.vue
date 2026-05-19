<script>
import LanguageButtons from "@/components/languageButtons.vue"
import supabase from "@/supabase"

export default {
  components: { LanguageButtons },
  data() {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    navigateToRegistrationView() {
      this.$router.push('/registration')
    },
    async login() {
      this.errorMsg = ''

      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })

      if (error) {
        this.errorMsg = error.message
        return
      }

      this.$router.push('/topPosts')
    }
  }
}
</script>

<template>
  <router-view />
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="text" placeholder="E-Mail" required/>
      <input v-model="password" type="password" placeholder="Passwort" required/>

      <p v-if="errorMsg" style="color:red">{{ errorMsg }}</p>

      <button type="submit">Anmelden</button>
      <button type="button" @click="navigateToRegistrationView">Registrieren</button>
    </form>
  </div>

  <LanguageButtons/>
</template>

<style>
form {
  padding: 20px;
  margin: 60px;
}
</style>