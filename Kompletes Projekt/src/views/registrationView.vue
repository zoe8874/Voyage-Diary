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
        this.errorMsg = 'Passwörter stimmen nicht überein'
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





<div class="page">
  <form @submit.prevent="register">
    <div class="container">
      <h1>{{ $t('register') }}</h1>
      <p>{{ $t('pleaseRegister') }}</p>
      <hr>

      <label for="username"><b>{{ $t('username') }}</b></label>
      <input v-model="username" type="text" :placeholder="$t('enterUsername')" id="username" required>

      <label for="email"><b>{{ $t('email') }}</b></label>
      <input v-model="email" type="text" :placeholder="$t('enterEmail')" id="email" required>

      <label for="psw"><b>{{ $t('password') }}</b></label>
      <input v-model="password" type="password" :placeholder="$t('enterPassword')" id="psw" required>

      <label for="psw-repeat"><b>{{ $t('repeatPassword') }}</b></label>
      <input v-model="passwordRepeat" type="password" :placeholder="$t('enterRepeatPassword')" id="psw-repeat" required>

      <p v-if="errorMsg" style="color:red">{{ errorMsg }}</p>
      <p v-if="successMsg" style="color:green">{{ successMsg }}</p>
      <hr>

      <button type="submit" class="registerbtn">{{ $t('register') }}</button>
    </div>

    <div class="container signin">
      <p>{{ $t('alreadyHaveAccountQuestion') }}</p>
      <button type="button" @click="navigateToLoginView">{{ $t('login') }}</button>
    </div>

    <LanguageButtons/>
  </form>
  </div>
</template>