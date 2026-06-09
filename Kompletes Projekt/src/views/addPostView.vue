<script setup>
import NavigationBar from "@/components/navigationBar.vue"
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import supabase from "@/supabase"
import { franc } from 'franc-min'

const router = useRouter()

const title = ref('')
const destination = ref('')
const country = ref('')
const content = ref('')
const image = ref(null)
const errorMsg = ref('')
const loading = ref(false)

const formValid = computed(() => {
  return title.value.trim() !== '' &&
      destination.value.trim() !== '' &&
      country.value.trim() !== '' &&
      content.value.trim() !== ''
})

function onImageChange(e) {
  image.value = e.target.files[0]
}

async function submitPost() {
  errorMsg.value = ''
  loading.value = true

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    errorMsg.value = 'Du bist nicht eingeloggt'
    loading.value = false
    return
  }

  let image_url = null

  if (image.value) {
    const fileExt = image.value.name.split('.').pop()
    const fileName = `${user.id}_${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, image.value)

    if (uploadError) {
      errorMsg.value = uploadError.message
      loading.value = false
      return
    }

    const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName)

    image_url = urlData.publicUrl
  }

  const langCode = franc(content.value)
  const sprachCodes = { 'deu': 'de', 'eng': 'en', 'fra': 'fr', 'ita': 'it', 'spa': 'es' }
  const language = sprachCodes[langCode] || 'de'

  const { error } = await supabase.from('posts').insert({
    user_id: user.id,
    content: title.value + '\n\n' + content.value,
    image_url,
    location: destination.value,
    country: country.value,
    language
  })

  if (error) {
    errorMsg.value = error.message
    loading.value = false
    return
  }

  router.push('/topPosts')
}
</script>

<template>
  <div>
    <NavigationBar/>
    <div class="content">
      <div class="container">
        <h1>{{ $t('addPost') }}</h1>
        <p>{{ $t('pleaseAddPost') }}</p>
        <hr>

        <label for="title"><b>{{ $t('title') }}</b></label>
        <input v-model="title" type="text" :placeholder="$t('enterTitle')" id="title" required>

        <label for="destination"><b>{{ $t('destination') }}</b></label>
        <input v-model="destination" type="text" :placeholder="$t('enterDestination')" id="destination" required>

        <label for="country"><b>{{ $t('country') }}</b></label>
        <input v-model="country" type="text" :placeholder="$t('enterCountry')" id="country" required>

        <label for="image"><b>{{ $t('image') }}</b></label>
        <input type="file" id="image" accept="image/*" @change="onImageChange">

        <label for="content"><b>{{ $t('description') }}</b></label>
        <textarea v-model="content" :placeholder="$t('enterDescription')" id="content" required></textarea>

        <p v-if="errorMsg" style="color:red">{{ errorMsg }}</p>
        <hr>

        <button @click="submitPost" :disabled="loading || !formValid" class="addPostbtn">
          {{ loading ? '...' : $t('addPost') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin-bottom: 1%;
}

h1 {
  color: var(--heading-color);
}

.addPostbtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>