<script setup>
import NavigationBar from "@/components/navigationBar.vue";
</script>

<template>
  <NavigationBar/>
  <div class="page">
    <div class="container">
      <h1>{{ ('addPost') }}</h1>
      <p class="subtitle">{{ ('pleaseAddPost') }}</p>

   

      <div class="form-group">
        <label for="title">
          <b>{{ ('title') }}</b>
        </label>
        <input
          type="text"
          :placeholder="('enterTitle')"
          name="title"
          id="title"
          required
        >
      </div>

      <div class="form-group">
        <label for="destination">
          <b>{{ ('destination') }}</b>
        </label>
        <input
          type="text"
          :placeholder="('enterDestination')"
          name="destination"
          id="destination"
          required
        >
      </div>

      <div class="form-group">
        <label for="category">
          <b>{{ ('category') }}</b>
        </label>

        <select name="category" id="category">
          <option value="">
            Kategorie auswählen
          </option>

         
          <option value="1">Adventure</option>
          <option value="2">Beach</option>
          <option value="3">City</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">
          <b>{{ ('image') }}</b>
        </label>

        <input class="imag"
          type="file"
          id="image"
          name="image"
          accept="image/*"
        >
      </div>

      <div class="form-group">
        <label for="content">
          <b>{{ ('description') }}</b>
        </label>

        <textarea
          :placeholder="('enterDescription')"
          name="content"
          id="content"
          required
        ></textarea>
      </div>

   

      <button type="submit" class="addPostbtn">
        {{ ('addPost') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e8ff, #ffff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.container {
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.imag{
  border-style: dashed;
}

h1 {
  text-align: center;
  color:  #5959f7;
  margin-bottom: 10px;
  font-size: 2rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 25px;
}



.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
}

label {
  margin-bottom: 8px;
  color: #333;
}

input,
select,
textarea {
  padding: 14px;
  border: 2px solid #b5acfe  ;
  border-radius: 12px;
  font-size: 1rem;
  transition: 0.3s ease;
  outline: none;
  
}

input:focus,
select:focus,
textarea:focus {
  border-color: blueviolet;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.2);
}

textarea {
  min-height: 140px;
  resize: vertical;
}

.addPostbtn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #5C5CFF, #b5acfe);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.addPostbtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(138, 43, 226, 0.3);
}
</style>