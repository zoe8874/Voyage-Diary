<script>
import NavigationBar from "@/components/navigationBar.vue"
import supabase from "@/supabase"

export default {
  components: { NavigationBar },

  data() {
    return {
      user: null,
      username: '',
      display_name: '',
      avatar_url: '',
      loading: true,
      saving: false
    }
  },

  async mounted() {
    await this.loadProfile()
  },

  methods: {
    async loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        this.$router.push('/login')
        return
      }

      this.user = user

      const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', user.id)
          .single()

      if (profile) {
        this.username = profile.username || ''
        this.display_name = profile.display_name || ''
        this.avatar_url = profile.avatar_url || ''
      }

      this.loading = false
    },

    async saveProfile() {
      this.saving = true

      const { error } = await supabase
          .from('users')
          .update({
            username: this.username,
            display_name: this.display_name,
            avatar_url: this.avatar_url
          })
          .eq('user_id', this.user.id)

      this.saving = false

      if (error) {
        alert('Fehler beim Speichern')
        console.error(error)
        return
      }

      alert('Profil gespeichert!')
      this.$router.push('/profile')
    }
  }
}
</script>

<template>
  <div>
    <NavigationBar />

    <div class="page">

      <div v-if="loading" class="loading">
        Lädt...
      </div>

      <div v-else class="edit-card">

        <h1>Edit Profile</h1>

        <div class="avatar-preview">
          <img
              v-if="avatar_url"
              :src="avatar_url"
              class="avatar"
          />
          <div v-else class="avatar-placeholder">
            {{ (display_name || username || '?')[0].toUpperCase() }}
          </div>
        </div>

        <div class="field">
          <label>Username</label>
          <input
              v-model="username"
              type="text"
              placeholder="Username"
          />
        </div>

        <div class="field">
          <label>Display Name</label>
          <input
              v-model="display_name"
              type="text"
              placeholder="Display name"
          />
        </div>

        <div class="field">
          <label>Avatar URL</label>
          <input
              v-model="avatar_url"
              type="text"
              placeholder="https://..."
          />
        </div>

        <div class="buttons">
          <button class="cancel" @click="$router.back()">
            Cancel
          </button>

          <button
              class="save"
              @click="saveProfile"
              :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
  padding: 32px 16px 100px;
  display: flex;
  justify-content: center;
}

.edit-card {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
}

h1 {
  margin-bottom: 28px;
  font-size: 28px;
}

.avatar-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #7376ff;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #7376ff;
  color: white;
  font-size: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.field {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #666;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #7376ff;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 28px;
}

.cancel,
.save {
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

.cancel {
  background: #eee;
}

.save {
  background: #7376ff;
  color: white;
}

.save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>