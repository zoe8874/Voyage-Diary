<script>
import LanguageButtons from "@/components/languageButtons.vue"
import supabase from "@/supabase"

export default {
  components: { LanguageButtons },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      errorMsg: '',
      successMsg: ''
    }
  },
  methods: {
    navigateToLoginView() {
      this.$router.push('/login')
    },
    async register() {
      this.errorMsg = ''

      if (this.password !== this.passwordRepeat) {
        this.errorMsg = this.$t('passwordMismatch')
        return
      }

      const { error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            username: this.username
          }
        }
      })

      if (error) {
        this.errorMsg = error.message
        return
      }

      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <LanguageButtons/>

  <div class="page">
    <div class="container">
<<<<<<< Updated upstream
      <h2>{{ $t('register') }}</h2>
      <p>{{ $t('pleaseRegister') }}</p>
=======
      <h1>{{ $t('register') }}</h1>


>>>>>>> Stashed changes

      <form @submit.prevent="register">
        <input v-model="username" type="text" :placeholder="$t('enterUsername')" id="username" required/>
        <input v-model="email" type="text" :placeholder="$t('enterEmail')" id="email" required/>
        <input v-model="password" type="password" :placeholder="$t('enterPassword')" id="psw" required/>
        <input v-model="passwordRepeat" type="password" :placeholder="$t('enterRepeatPassword')" id="psw-repeat" required/>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>

        <div class="button-group">
          <button type="submit" class="btn-primary">{{ $t('register') }}</button>
          <button type="button" class="btn-secondary" @click="navigateToLoginView">{{ $t('login') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  max-width: 450px;
  width: 100%;
  background: var(--container-bg);
  backdrop-filter: blur(10px);
  padding: 40px 32px;
  border-radius: 32px;
  box-shadow: var(--shadow-sm);
  border: var(--container-border);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

h2 {
  text-align: center;
  font-size: 2rem;
  color: var(--heading-color);
  font-weight: 700;
  margin: 0;
}

p {
  text-align: center;
  color: var(--text-secondary);
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

input {
  width: 100%;
  padding: 14px 18px;
  background: var(--input-bg);
  border: var(--input-border);
  border-radius: 20px;
  font-size: 1rem;
  color: var(--text-primary);
  transition: 0.2s;
}

input:focus {
  border-color: var(--heading-color);
  box-shadow: 0 0 0 3px rgba(124, 108, 255, 0.2);
  outline: none;
}

.error-msg {
  color: #ff8080;
  background: rgba(255, 128, 128, 0.1);
  padding: 8px 12px;
  border-radius: 16px;
  text-align: center;
  font-size: 0.9rem;
}

.success-msg {
  color: #80ff80;
  background: rgba(128, 255, 128, 0.1);
  padding: 8px 12px;
  border-radius: 16px;
  text-align: center;
  font-size: 0.9rem;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-primary {
  background: var(--btn-gradient);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.02);
  box-shadow: 0 8px 18px rgba(92, 92, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1.5px solid var(--heading-color);
  color: var(--heading-color);
}

.btn-secondary:hover {
  background: var(--heading-color);
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 550px) {
  .container { padding: 28px 20px; }
  h2 { font-size: 1.6rem; }
  .button-group { flex-direction: column; gap: 10px; }
  button { padding: 12px; }
}

@media (max-width: 400px) {
  .container { padding: 24px 16px; }
  input { padding: 12px 14px; }
}
</style>