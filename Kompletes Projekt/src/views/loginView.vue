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
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(135deg, #f3e8ff, #ffffff);
  padding: 30px;
  gap: 20px;
}

.card {
  width: 100%;
  max-width: 420px;

  background: white;
  padding: 30px;

  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  border-radius: 12px;
  border: 2px solid #ddd;
  outline: none;
}

input:focus {
  border-color: #5c5cff;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

button[type="submit"] {
  background: #5c5cff;
  color: white;
}

button[type="button"] {
  background: #eee;
}

.error {
  color: red;
}
</style>