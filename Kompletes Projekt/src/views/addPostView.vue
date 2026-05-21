<script setup>
import NavigationBar from "@/components/navigationBar.vue"
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from "@/supabase"
import { franc } from 'franc-min'

const router = useRouter()

const title = ref('')
const destination = ref('')
const content = ref('')
const image = ref(null)
const errorMsg = ref('')
const loading = ref(false)

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
  
  <div class="container">
    <h1>{{ $t('addPost') }}</h1>
    <p>{{ $t('pleaseAddPost') }}</p>
    <hr>

    <label for="title"><b>{{ $t('title') }}</b></label>
    <input v-model="title" type="text" :placeholder="$t('enterTitle')" id="title" required>

    <label for="destination"><b>{{ $t('destination') }}</b></label>
    <input v-model="destination" type="text" :placeholder="$t('enterDestination')" id="destination" required>

    <label for="image"><b>{{ $t('image') }}</b></label>
    <input type="file" id="image" accept="image/*" @change="onImageChange">

    <label for="content"><b>{{ $t('description') }}</b></label>
    <textarea v-model="content" :placeholder="$t('enterDescription')" id="content" required></textarea>

    <p v-if="errorMsg" style="color:red">{{ errorMsg }}</p>
    <hr>

    <button @click="submitPost" :disabled="loading" class="addPostbtn">
      {{ loading ? '...' : $t('addPost') }}
    </button>
  </div>
  </div>
</template>
<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3e8ff, #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.container {
  width: 100%;
  max-width: 700px;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);

  padding: 40px;
  border-radius: 24px;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 14px;
}

h1 {
  text-align: center;
  color: #5c5cff;
  font-size: 2rem;
  margin-bottom: 0;
  font-family: Arial;
  font-weight: Bold;
}

p {
  text-align: center;
  color: #666;
  margin-top: 0;
  font-family:Arial;
}

label {
  margin-top: 10px;
  font-weight: 600;
  color: #333;
  font-family:Arial;
}

input,
textarea {
  width: 100%;
  padding: 14px;

  border: 2px solid #e0d7ff;
  border-radius: 14px;

  font-size: 1rem;

  outline: none;

  transition: 0.25s ease;
  background: white;
}

input:focus,
textarea:focus {
  border-color: #5c5cff;
  box-shadow: 0 0 0 4px rgba(92, 92, 255, 0.15);
}

textarea {
  min-height: 140px;
  resize: vertical;
}

input[type="file"] {
  padding: 10px;
  background: #fafafa;
}

.addPostbtn {
  margin-top: 15px;
  width: 100%;
  padding: 15px;

  background: linear-gradient(135deg, #5c5cff, #a99bff);
  border: none;
  border-radius: 14px;

  color: white;
  font-size: 1rem;
  font-weight: 700;

  cursor: pointer;

  transition: 0.25s ease;
}

.addPostbtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(92, 92, 255, 0.25);
}

.addPostbtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>