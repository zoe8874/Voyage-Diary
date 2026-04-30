7<script >

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
  <body>


    <h1>{{ $t('welcome') }}</h1>
    <h2> {{$t('subtitle')}}</h2>


    <languageButtons/>






  <div id="upper-banner">
    <div id="Background-upper-banner">
      <div id="text-upper-banner">

      </div>
      <div id="button-upper-banner">
        <button id="start" @click="navigateToLoginView"> Start your Diary → </button>
        <button id="explore" @click="navigateToLoginView"> 🌐 Explore </button>
      </div>
    </div>
  </div>

  <div id="upper-lower-banner">

  </div>

  <div id="story-banner">

  </div>

  <div id="join-banner">

  </div>

  <footer>
    <p> © Team Voyagediary 2026 </p>
  </footer>

  </body>

  <router-view />

</template>

<style scoped>

#start{
  background-color: #5959f7;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 15px;
}

#explore{
  background-color: #5959f7;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 15px;
}

#upper-banner{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  background-color: blue;
}

#upper-banner{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

#upper-banner{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

#upper-banner{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}



</style>