<script >



import LanguageButtons from "@/components/languageButtons.vue";

export default {
  components: {LanguageButtons},
  methods: {

    navigateToLoginView() {
      this.$router.push('/login')
    }
  }

}

</script>

<template>

  <form action="action_page.php">
    <div class="container">
      <h1>{{ $t('register') }}</h1>
      <p>{{ $t('pleaseRegister') }}</p>
      <hr>

      <label for="username"><b>{{ $t('username') }}</b></label>
      <input type="text" :placeholder= "$t('enterUsername')" name="username" id="username" required>

      <label for="email"><b>{{ $t('email') }}</b></label>
      <input type="text" :placeholder="$t('enterEmail')" name="email" id="email" required>

      <label for="psw"><b>{{ $t('password') }}</b></label>
      <input type="password" :placeholder="$t('enterPassword')" name="psw" id="psw" required>

      <label for="psw-repeat"><b>{{ $t('repeatPassword') }}</b></label>
      <input type="password" :placeholder="$t('enterRepeatPassword')"  name="psw-repeat" id="psw-repeat" required>
      <hr>

      <button type="submit" class="registerbtn">{{ $t('register') }}</button>

    </div>

    <div class="container signin">
      <p>{{ $t('alreadyHaveAccountQuestion') }}</p>
      <button id="start" @click="navigateToLoginView">{{ $t('login') }}</button>
    </div>

    <LanguageButtons/>
  </form>





</template>

<style scoped>

</style>