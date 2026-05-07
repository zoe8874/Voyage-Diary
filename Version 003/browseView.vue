<script >

import {defineComponent} from "vue";
import LanguageButtons from "@/components/languageButtons.vue";

export default defineComponent({
  components: {LanguageButtons}
})
</script>

<template>
  <div class="create-post">
    <div class="header">
      <h1>Create a New Post</h1>
      <p>Share your travel experience and inspire fellow nomads</p>
    </div>

    <form @submit.prevent="submitPost">


      <div class="form-group">
        <label for="title">Post Title</label>
        <input
            type="text"
            id="title"
            placeholder="e.g., Hidden Waterfalls in Bali: A Complete Guide"
        />
      </div>

      <div class="form-group">
        <label for="destination">Destination</label>
        <input
            type="text"
            id="destination"
            placeholder="e.g., Bali, Indonesia"
        />
      </div>


      <div class="form-group">
        <label for="category">Category</label>
        <select id="category">
          <option value="">Select a category</option>
          <option value="adventure">Adventure</option>
          <option value="culture">Culture</option>
          <option value="food">Food</option>
          <option value="nature">Nature</option>
          <option value="city">City</option>
        </select>
      </div>


      <div class="form-group">
        <label>Cover Image</label>
        <div class="upload-box">
          <input type="file" id="image" accept=".png,.jpg,.jpeg" hidden />
          <label for="image" class="upload-label">
            <span>🖼 Click to upload or drag and drop</span>
            <small>PNG, JPG up to 10MB</small>
          </label>
        </div>
      </div>


      <div class="form-group">
        <label for="story">Your Story</label>
        <textarea
            id="story"
            rows="8"
            placeholder="Share your experience, tips, and insights... Be detailed and helpful!"
        ></textarea>
        <small class="tip">💡 Tip: Include practical information like costs, best times to visit, and insider tips</small>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label for="tags">Tags</label>
        <input
            type="text"
            id="tags"
            placeholder="e.g., Bali, Waterfalls, Hidden Gems, Adventure (separate with commas)"
        />
      </div>


      <div class="buttons">
        <button type="submit" class="btn-publish">Publish Post</button>
        <button type="button" class="btn-cancel" @click="$router.go(-1)">Cancel</button>
      </div>

    </form>
  </div>

  <languageButtons/>

</template>

<style scoped>

</style>