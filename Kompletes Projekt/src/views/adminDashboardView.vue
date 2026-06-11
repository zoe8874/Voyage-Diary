<script>
import supabase from "@/supabase"

export default {
  data() {
    return {
      users: [],
      posts: [],
      activeTab: 'users',
      loading: true
    }
  },
  async mounted() {
    await this.checkAdmin()
    await this.loadData()
  },
  methods: {
    async checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user === null) {
        this.$router.push('/admin')
        return
      }

      const { data: profile } = await supabase
          .from('users').select('is_admin').eq('user_id', user.id).single()

      if (profile?.is_admin === false) {
        this.$router.push('/admin')
      }
    },

    async loadData() {
      const { data: users } = await supabase
          .from('users').select('*').order('created_at', { ascending: false })
      this.users = users || []

      const { data: posts } = await supabase
          .from('posts')
          .select('post_id, content, image_url, location, created_at, users(username)')
          .order('created_at', { ascending: false })
      this.posts = posts || []
      this.loading = false
    },

    async deleteUser(user_id) {
      const bestaetigt = confirm('User wirklich löschen?')
      if (bestaetigt === false) {
        return
      }
      await supabase.from('users').delete().eq('user_id', user_id)
      this.users = this.users.filter(u => u.user_id !== user_id)
    },

    async deletePost(post_id) {
      const bestaetigt = confirm('Post wirklich löschen?')
      if (bestaetigt === false) {
        return
      }
      await supabase.from('posts').delete().eq('post_id', post_id)
      this.posts = this.posts.filter(p => p.post_id !== post_id)
    },

    async logout() {
      await supabase.auth.signOut()
      this.$router.push('/topPosts')
    },

    formatDate(datum) {
      return new Date(datum).toLocaleDateString('de-CH')
    },

    truncate(text, maxLaenge = 80) {
      if (text?.length > maxLaenge) {
        return text.slice(0, maxLaenge) + '...'
      }
      return text
    }
  }
}
</script>

<template>
  <div class="admin">
    <div class="sidebar">
      <h2>Admin</h2>
      <button :class="['nav-btn', activeTab === 'users' ? 'active' : '']" @click="activeTab = 'users'">
        Users ({{ users.length }})
      </button>
      <button :class="['nav-btn', activeTab === 'posts' ? 'active' : '']" @click="activeTab = 'posts'">
        Posts ({{ posts.length }})
      </button>
      <button class="nav-btn" @click="logout">Ausloggen</button>
    </div>

    <div class="content">
      <div v-if="loading">Loading...</div>

      <div v-else-if="activeTab === 'users'">
        <h2>Users</h2>
        <table>
          <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Erstellt</th>
            <th>Aktion</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>@{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.is_admin ? 'Ja' : 'Nein' }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td>
              <button v-if="user.is_admin === false" class="delete-btn" @click="deleteUser(user.user_id)">
                Löschen
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="activeTab === 'posts'">
        <h2>Posts</h2>
        <table>
          <thead>
          <tr>
            <th>User</th>
            <th>Inhalt</th>
            <th>Ort</th>
            <th>Datum</th>
            <th>Aktion</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="post in posts" :key="post.post_id">
            <td>@{{ post.users?.username }}</td>
            <td>{{ truncate(post.content) }}</td>
            <td>{{ post.location || '—' }}</td>
            <td>{{ formatDate(post.created_at) }}</td>
            <td>
              <button class="delete-btn" @click="deletePost(post.post_id)">Löschen</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: #1a1a2e;
  color: #e2e8f0;
}

.sidebar {
  width: 240px;
  background: #16213e;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-right: 1px solid #0f3460;
}

.sidebar h2 {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
}

.nav-btn {
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: transparent;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn.active, .nav-btn:hover {
  background: #0f3460;
  color: #ffffff;
  border-color: #0f3460;
}

.content {
  flex: 1;
  padding: 50px;
  max-width: 1200px;
}

.content h2 {
  font-size: 28px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 32px;
}

.loading {
  font-size: 16px;
  color: #94a3b8;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #16213e;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  border: 1px solid #0f3460;
}

th {
  background: #0f3460;
  color: #ffffff;
  padding: 18px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 18px 24px;
  border-bottom: 1px solid #0f3460;
  font-size: 14px;
  color: #cbd5e1;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background: rgba(15, 52, 96, 0.3);
}

.delete-btn {
  background: rgba(233, 69, 96, 0.1);
  color: #e94560;
  border: 1px solid rgba(233, 69, 96, 0.2);
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #e94560;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(233, 69, 96, 0.2);
}

@media (max-width: 900px) {
  .admin {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #0f3460;
    box-sizing: border-box;
  }
  .content {
    padding: 24px;
  }
}
</style>