<script>



</script>


<template>
  <body>


  <button @click="navigateToLoginView">Sign Up</button>

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

</style>