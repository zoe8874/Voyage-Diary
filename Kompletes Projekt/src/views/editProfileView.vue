<script>
import NavigationBar from "@/components/navigationBar.vue"
import supabase from "@/supabase"

export default {
  components: { NavigationBar },

  data() {
    return {
      user: null,
      email: '',
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
        this.email = profile.email || ''
        this.username = profile.username || ''
        this.display_name = profile.display_name || ''
        this.avatar_url = profile.avatar_url || ''
      }

      this.loading = false
    },

    async saveProfile() {
      this.saving = true

      try {
        if (this.email !== this.user.email) {
          const { error: authError } = await supabase.auth.updateUser({
            email: this.email
          })

          if (authError) throw authError
        }

        const { error: profileError } = await supabase
            .from('users')
            .update({
              email: this.email,
              username: this.username,
              display_name: this.display_name,
              avatar_url: this.avatar_url
            })
            .eq('user_id', this.user.id)

        if (profileError) throw profileError

        alert('Profil gespeichert!')
        this.$router.push('/profile')

      } catch (error) {
        console.error(error)
        alert(error.message || 'Fehler beim Speichern')
      }

      this.saving = false
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
          <label>Email</label>
          <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
          />
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
  background: var(--bg-gradient);
  padding: 32px 16px 100px;
  display: flex;
  justify-content: center;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary);
}

.edit-card {
  width: 100%;
  max-width: 520px;
  background: var(--card-bg);
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--shadow-sm);
  border: var(--container-border);
}

h1 {
  margin-bottom: 28px;
  font-size: 28px;
  color: var(--heading-color);
  text-align: center;
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
  border: 3px solid var(--heading-color);
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--heading-color);
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
  color: var(--text-secondary);
}

input {
  width: 100%;
  padding: 12px 14px;
  background: var(--input-bg);
  border: var(--input-border);
  border-radius: 14px;
  font-size: 14px;
  color: var(--text-primary);
  outline: none;
  transition: 0.2s;
}

dark_light {

  background: var(--input-bg);
  border: var(--input-border);
  border-radius: 14px;
  font-size: 14px;
  color: var(--text-primary);

  margin-top: 28px;
}
input:focus {
  border-color: var(--heading-color);
  box-shadow: 0 0 0 3px rgba(115, 118, 255, 0.2);
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.cancel,
.save {
  border: none;
  padding: 12px 24px;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: 0.2s;
}

.cancel {
  background: transparent;
  border: 1.5px solid var(--text-secondary);
  color: var(--text-secondary);
}

.cancel:hover {
  background: var(--text-secondary);
  color: white;
}

.save {
  background: var(--btn-gradient);
  color: white;
}

.save:hover {
  transform: translateY(-2px);
  filter: brightness(1.02);
}

.save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 550px) {
  .edit-card {
    padding: 24px 20px;
  }

  h1 {
    font-size: 24px;
  }

  .buttons {
    flex-direction: column;
  }

  .cancel,
  .save {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 400px) {
  .edit-card {
    padding: 20px 16px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .edit-card {
    max-width: 720px;
    padding: 48px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 40px;
  }

  .avatar {
    width: 140px;
    height: 140px;
  }

  .avatar-placeholder {
    width: 140px;
    height: 140px;
    font-size: 56px;
  }

  .field {
    margin-bottom: 28px;
  }

  label {
    font-size: 16px;
    margin-bottom: 10px;
  }

  input {
    padding: 16px 20px;
    font-size: 18px;
    border-radius: 16px;
  }

  .buttons {
    gap: 20px;
    margin-top: 40px;
  }

  .cancel,
  .save {
    padding: 16px 32px;
    font-size: 18px;
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  .edit-card {
    max-width: 780px;
    padding: 52px;
  }
}

@media (max-width: 767px) {
  .edit-card {
    max-width: 100%;
    padding: 24px 20px;
  }

  h1 {
    font-size: 26px;
  }

  input {
    font-size: 16px;
  }
}
</style>