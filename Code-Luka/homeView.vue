<script>



</script>


<template>
  <body>


  <div id="sprachen">
    <p>sprachen(nicht mitkopieren, p zu h1)</p>

    <button @click="changesprache('en')">(EN)</button>
    <button @click="changesprache('de')">DE)</button>
    <button @click="changesprache('es')">(ES)</button>
    <button @click="changesprache('fr')">(FR)</button>
    <button @click="changesprache('it')">(IT)</button>


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