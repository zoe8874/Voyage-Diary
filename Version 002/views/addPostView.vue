<script setup>
import NavigationBar from "@/components/navigationBar.vue";
</script>

<template>
  <NavigationBar/>
  <div class="container">
    <h1>{{ $t('addPost') }}</h1>
    <p>{{ $t('pleaseAddPost') }}</p>
    <hr>

    <label for="title"><b>{{ $t('title') }}</b></label>
    <input type="text" :placeholder="$t('enterTitle')" name="title" id="title" required>

    <label for="Destination"><b>{{ $t('destination') }}</b></label>
    <input type="text" :placeholder="$t('enterDestination')" name="destination" id="destination" required>

    <label for="Category"><b>{{ $t('category') }}</b></label>
    <select name="cars" id="cars">
      <option value="1"></option> // muss noch angepasst werden, damit die Kategorien aus der Datenbank kommen
    </select>

    <label for ="image"><b>{{ $t('image') }}</b></label>
    <input type="file" id="image" name="image" accept="image/*">

    <label for="content"><b>{{ $t('description') }}</b></label>
    <textarea :placeholder="$t('enterDescription')" name="content" id="content" required></textarea>



    <hr>

    <button type="submit" class="addPostbtn">{{ $t('addPost') }}</button>

  </div>
</template>

<style scoped>

</style>