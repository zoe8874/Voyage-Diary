<script>



</script>


<template>
  <body>


  <div id="sprachen">
    <h1>{{ $t('welcome') }}</h1>

    <button @click="changesprache('en')">{{ $t('sprache') }} (EN)</button>
    <button @click="changesprache('de')">{{ $t('sprache') }} (DE)</button>
    <button @click="changesprache('es')">{{ $t('sprache') }} (ES)</button>
    <button @click="changesprache('fr')">{{ $t('sprache') }} (FR)</button>
    <button @click="changesprache('it')">{{ $t('sprache') }} (IT)</button>


  </div>

  <div id="upper-banner">
    <div id="Background-upper-banner">
      <div id="text-upper-banner">

      </div>
      <div id="button-upper-banner">
        <button id="start"> Start your Diary → </button>
        <button id="explore"> 🌐 Explore </button>
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
}



</style>