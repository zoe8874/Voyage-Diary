<script>
import NavigationBar from "@/components/navigationBar.vue"
import supabase from "@/supabase"

export default {
  components: { NavigationBar },
  data() {
    return {
      user: null,
      profile: null,
      myPosts: [],
      likedPosts: [],
      totalLikes: 0,
      loading: true,
      activeTab: 'posts'
    }
  },
  async mounted() {
    await this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { this.$router.push('/login'); return }
      this.user = user

      const { data: profile } = await supabase
          .from('users').select('*').eq('user_id', user.id).single()
      this.profile = profile

      const { data: myPosts } = await supabase
          .from('posts')
          .select('post_id, content, image_url, location, country, language, created_at, likes(count)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      this.myPosts = myPosts || []
      this.totalLikes = this.myPosts.reduce((sum, p) => sum + (p.likes[0]?.count || 0), 0)

      const { data: likedPosts } = await supabase
          .from('likes')
          .select('posts(post_id, content, image_url, location, country, created_at, users(username, display_name), likes(count))')
          .eq('user_id', user.id)
      this.likedPosts = likedPosts?.map(l => l.posts).filter(Boolean) || []
      this.loading = false
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('de-CH', { day: 'numeric', month: 'short', year: 'numeric' })
    },
    formatJoined(dateStr) {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    },
    getLikeCount(post) {
      return post.likes?.[0]?.count || 0
    },
    truncate(text, len = 160) {
      if (!text) return ''
      return text.length > len ? text.slice(0, len) + '...' : text
    }
  }
}
</script>

<template>
  <div>
  <NavigationBar/>

  <div class="page">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <div v-else class="profile-wrapper">

      <div class="profile-header">
        <div class="avatar-wrap">
          <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="avatar"/>
          <div v-else class="avatar-placeholder">
            {{ (profile?.display_name || profile?.username || '?')[0].toUpperCase() }}
          </div>
        </div>

        <div class="profile-info">
          <div class="name-row">
            <h1>{{ profile?.display_name || profile?.username }}</h1>
            <button class="edit-btn" @click="$router.push('./editProfileView')">Edit Profile</button>
          </div>
          <p class="handle">@{{ profile?.username }}</p>
          <p v-if="profile?.bio" class="bio">{{ profile.bio }}</p>
          <div class="meta">
            <span v-if="profile?.location">📍 {{ profile.location }}</span>
            <span v-if="profile?.created_at">🗓 Joined {{ formatJoined(profile.created_at) }}</span>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <strong>{{ myPosts.length }}</strong>
          <span>Posts</span>
        </div>
        <div class="stat-box">
          <strong>{{ totalLikes }}</strong>
          <span>Total Likes</span>
        </div>
        <div class="stat-box">
          <strong>{{ likedPosts.length }}</strong>
          <span>Liked</span>
        </div>
      </div>

      <div class="tabs">
        <button :class="['tab', activeTab === 'posts' ? 'active' : '']" @click="activeTab = 'posts'">
          My Posts ({{ myPosts.length }})
        </button>
        <button :class="['tab', activeTab === 'liked' ? 'active' : '']" @click="activeTab = 'liked'">
          Liked ({{ likedPosts.length }})
        </button>
      </div>

      <div class="posts-list">
        <template v-if="activeTab === 'posts'">
          <div v-for="post in myPosts" :key="post.post_id" class="post-card">
            <img v-if="post.image_url" :src="post.image_url" class="post-img"/>
            <div class="post-body">
              <div class="post-author">
                <div class="author-avatar">
                  {{ (profile?.display_name || profile?.username || '?')[0].toUpperCase() }}
                </div>
                <div>
                  <strong>{{ profile?.display_name || profile?.username }}</strong>
                  <span class="handle">@{{ profile?.username }}</span>
                </div>
                <span class="lang-badge">{{ post.language }}</span>
              </div>
              <p class="post-content">{{ truncate(post.content) }}</p>
              <div class="post-footer">
                <span v-if="post.location">📍 {{ post.location }}</span>
                <span>❤️ {{ getLikeCount(post) }}</span>
                <span>{{ formatDate(post.created_at) }}</span>
              </div>
            </div>
          </div>
          <p v-if="myPosts.length === 0" class="empty">Noch keine Posts – teile dein erstes Abenteuer!</p>
        </template>

        <template v-if="activeTab === 'liked'">
          <div v-for="post in likedPosts" :key="post?.post_id" class="post-card">
            <img v-if="post?.image_url" :src="post.image_url" class="post-img"/>
            <div class="post-body">
              <div class="post-author">
                <div class="author-avatar">
                  {{ (post?.users?.display_name || post?.users?.username || '?')[0].toUpperCase() }}
                </div>
                <div>
                  <strong>{{ post?.users?.display_name || post?.users?.username }}</strong>
                  <span class="handle">@{{ post?.users?.username }}</span>
                </div>
              </div>
              <p class="post-content">{{ truncate(post?.content) }}</p>
              <div class="post-footer">
                <span v-if="post?.location">📍 {{ post.location }}</span>
                <span>❤️ {{ getLikeCount(post) }}</span>
                <span>{{ formatDate(post?.created_at) }}</span>
              </div>
            </div>
          </div>
          <p v-if="likedPosts.length === 0" class="empty">Noch keine gelikten Posts.</p>
        </template>
      </div>

    </div>
  </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  min-height: 100vh;
  background: #ffffff;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a1a;
  padding: 32px 16px 80px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e8e0d5;
  border-top-color: #7376ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.profile-wrapper {
  max-width: 720px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
  margin-bottom: 20px;
}

.avatar-wrap { flex-shrink: 0; }

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #7376ff;
}

.avatar-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7376ff, #7376ff);
  color: white;

  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-info { flex: 1; }

.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.name-row h1 {
 
  font-size: 24px;
  color: #1a1a1a;
}

.edit-btn {
  background: white;
  border: 1.5px solid #7376ff;
  color: #7376ff;
  padding: 6px 16px;
  border-radius: 20px;
 
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.edit-btn:hover {
  background: #7376ff;
  color: white;
}

.handle {
  color: #7376ff;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
}

.bio {
  font-size: 14px;
  color: #7376ff;
  line-height: 1.6;
  margin-bottom: 10px;
}

.meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #888;
  flex-wrap: wrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.stat-box {
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.stat-box strong {
  display: block;
  
  font-size: 26px;
  color: #7376ff;
  margin-bottom: 4px;
}

.stat-box span {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tab {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid #e8e0d5;
  background: white;

  font-size: 14px;
  font-weight: 500;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #7376ff;
  border-color: #7376ff;
  color: white;
}

.post-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  margin-bottom: 16px;
  transition: transform 0.2s;
}

.post-card:hover { transform: translateY(-2px); }

.post-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-body { padding: 20px; }

.post-author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7376ff, #7386ff);
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.post-author strong { font-size: 14px; display: block; }
.post-author .handle { font-size: 12px; margin-bottom: 0; }

.lang-badge {
  margin-left: auto;
  background: #faf0e6;
  color: #7376ff;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.post-content {
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 12px;
}

.post-footer {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #aaa;
  flex-wrap: wrap;
}

.empty {
  text-align: center;
  color: #aaa;
  padding: 40px;
  font-size: 14px;
}
</style>