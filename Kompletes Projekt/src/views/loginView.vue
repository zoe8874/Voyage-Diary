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
      const { error } = await supabase.auth.signInWithPassword({
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
  <div>

    <div class="lang-wrapper">
      <LanguageButtons/>
    </div>

    <div class="page">
      <div class="container">
        <h2>{{ $t('login') }}</h2>

        <form @submit.prevent="login">
          <input
              v-model="email"
              type="email"
              :placeholder="$t('email')"
              required
          />
          <input
              v-model="password"
              type="password"
              :placeholder="$t('password')"
              required
          />

          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

          <div class="button-group">
            <button type="submit" class="btn-primary">{{ $t('login') }}</button>
            <button type="button" class="btn-secondary" @click="navigateToRegistrationView">
              {{ $t('register') }}
            </button>
          </div>
        </form>
      </div>
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
}

h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 2rem;
  color: var(--heading-color);
  font-weight: 700;
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

.lang-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

@media (max-width: 550px) {
  .container {
    padding: 28px 20px;
  }
  h2 {
    font-size: 1.6rem;
  }
  .button-group {
    flex-direction: column;
    gap: 10px;
  }
  button {
    padding: 12px;
  }
}

@media (max-width: 400px) {
  .container {
    padding: 24px 16px;
  }
  input {
    padding: 12px 14px;
  }
}

dark_light {

  background: var(--input-bg);
  border: var(--input-border);
  border-radius: 14px;
  font-size: 14px;
  color: var(--text-primary);

  margin-top: 28px;
}
</style>