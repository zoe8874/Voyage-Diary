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
  
  <div class="page">
    <div class="container">
      
    <h2>Login</h2>

    <form @submit.prevent="login">
      <input v-model="email" type="text" placeholder="E-Mail" required/>
      <input v-model="password" type="password" placeholder="Passwort" required/>

      <p v-if="errorMsg" style="color:red">{{ errorMsg }}</p>

      <button type="submit">Anmelden</button>
      <button type="button" @click="navigateToRegistrationView">Registrieren</button>

    </form>
    </div>
  </div>

  <LanguageButtons/>
</template>

<style>


form {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
@media (prefers-color-scheme: dark) {

  .page {
    background: linear-gradient(135deg, #1e1e1e, #2c2c2c);
  }

  .container {
    background: rgba(30, 30, 30, 0.92);
    color: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.08);
  }

  h2 {
    color: #cfcfff;
  }

  input {
    background: #1f1f1f;
    color: white;
    border: 2px solid #444;
  }

  input:focus {
    border-color: #7c6cff;
  }

  button[type="button"] {
    background: #3a3a3a;
    color: white;
  }

  button[type="submit"] {
    background: #7c6cff;
    color: white;
  }

  button {
    color: white;
  }

  .error {
    color: #ff6b6b;
  }
}
</style>