<script>
import supabase from "@/supabase"

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    async adminLogin() {
      this.errorMsg = ''

      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })

      if (error !== null) {
        this.errorMsg = 'Falsche Zugangsdaten'
        return
      }

      const { data: profile } = await supabase
          .from('users')
          .select('is_admin')
          .eq('user_id', data.user.id)
          .single()

      if (profile?.is_admin === false) {
        this.errorMsg = 'Kein Zugriff'
        await supabase.auth.signOut()
        return
      }

      this.$router.push('/admin/dashboard')
    },

    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <div class="admin-login">
    <div class="box">
      <h1>Admin</h1>
      <p>Voyage Diary Administration</p>
      <hr>
      <input v-model="email" type="email" placeholder="Email"/>
      <input v-model="password" type="password" placeholder="Passwort"/>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <button @click="adminLogin">Einloggen</button>
      <button class="return-btn" @click="goBack">Zurück zur Website</button>
    </div>
  </div>
</template>

<style scoped>
.admin-login {
  min-height: 100vh;
  background: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}

.box {
  background: #16213e;
  border: 1px solid #0f3460;
  border-radius: 24px;
  padding: 50px 40px;
  width: 100%;
  max-width: 400px;
  color: #ffffff;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

h1 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

p {
  color: #94a3b8;
  font-size: 15px;
  margin-bottom: 32px;
}

hr {
  border: none;
  border-top: 1px solid #0f3460;
  margin-bottom: 32px;
}

input {
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #0f3460;
  background: #0f3460;
  color: #ffffff;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #e94560;
}

button {
  width: 100%;
  padding: 14px;
  background: #e94560;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  background: #c73652;
  box-shadow: 0 4px 12px rgba(233, 69, 96, 0.2);
}

.return-btn {
  background: transparent;
  color: #94a3b8;
  border: 1px solid #0f3460;
  margin-top: 12px;
}

.return-btn:hover {
  background: #0f3460;
  color: #ffffff;
  box-shadow: none;
}

.error {
  color: #e94560;
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 16px;
}
</style>