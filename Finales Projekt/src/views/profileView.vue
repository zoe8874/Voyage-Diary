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
      activeTab: 'posts',
      selectedPost: null,
      comments: [],
      newComment: ''
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

    truncate(text, len = 100) {
      if (!text) return ''
      return text.length > len ? text.slice(0, len) + '...' : text
    },

    async openPost(post) {
      this.selectedPost = post
      this.newComment = ''
      const { data } = await supabase
          .from('comments')
          .select('comment_id, content, created_at, users(username)')
          .eq('post_id', post.post_id)
          .order('created_at', { ascending: true })
      this.comments = data || []
    },

    async submitComment() {
      if (!this.newComment.trim() || !this.user) return
      const { data } = await supabase
          .from('comments')
          .insert({ user_id: this.user.id, post_id: this.selectedPost.post_id, content: this.newComment.trim(), language: 'de' })
          .select('comment_id, content, created_at, users(username)')
      if (data) { this.comments.push(data[0]); this.newComment = '' }
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
              <button class="edit-btn" @click="$router.push('/profile/editProfile')">{{ $t('editProfile') }}</button>
            </div>
            <p class="handle">@{{ profile?.username }}</p>
            <p v-if="profile?.bio" class="bio">{{ profile.bio }}</p>
            <div class="meta">
              <span v-if="profile?.location">{{ profile.location }}</span>
              <span v-if="profile?.created_at">{{ $t('joined') }} {{ formatJoined(profile.created_at) }}</span>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <strong>{{ myPosts.length }}</strong>
            <span>{{ $t('myPosts') }}</span>
          </div>
          <div class="stat-box">
            <strong>{{ totalLikes }}</strong>
            <span>{{ $t('totalLikes') }}</span>
          </div>
          <div class="stat-box">
            <strong>{{ likedPosts.length }}</strong>
            <span>{{ $t('liked') }}</span>
          </div>
        </div>

        <div class="tabs">
          <button :class="['tab', activeTab === 'posts' ? 'active' : '']" @click="activeTab = 'posts'">
            {{ $t('myPosts') }} ({{ myPosts.length }})
          </button>
          <button :class="['tab', activeTab === 'liked' ? 'active' : '']" @click="activeTab = 'liked'">
            {{ $t('liked') }} ({{ likedPosts.length }})
          </button>
        </div>

        <div class="posts-list">
          <template v-if="activeTab === 'posts'">
            <div v-for="post in myPosts" :key="post.post_id" class="post-card" @click="openPost(post)">
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
                  <span v-if="post.location">{{ post.location }}</span>
                  <span>❤ {{ getLikeCount(post) }}</span>
                  <span>{{ formatDate(post.created_at) }}</span>
                </div>
              </div>
            </div>
            <p v-if="myPosts.length === 0" class="empty">{{ $t('noPostsYet') }}</p>
          </template>

          <template v-if="activeTab === 'liked'">
            <div v-for="post in likedPosts" :key="post?.post_id" class="post-card" @click="openPost(post)">
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
                  <span v-if="post?.location">{{ post.location }}</span>
                  <span>❤ {{ getLikeCount(post) }}</span>
                  <span>{{ formatDate(post?.created_at) }}</span>
                </div>
              </div>
            </div>
            <p v-if="likedPosts.length === 0" class="empty">{{ $t('noLikedPosts') }}</p>
          </template>
        </div>

      </div>
    </div>

    <div v-if="selectedPost" class="overlay" @click.self="selectedPost = null">
      <div class="modal-box">
        <button class="close-btn" @click="selectedPost = null">{{ $t('close') }}</button>

        <img v-if="selectedPost.image_url" :src="selectedPost.image_url" class="modal-image"/>

        <div class="post-author">
          <div class="author-avatar">
            {{ (selectedPost?.users?.display_name || selectedPost?.users?.username || profile?.username || '?')[0].toUpperCase() }}
          </div>
          <div>
            <strong>{{ selectedPost?.users?.display_name || selectedPost?.users?.username || profile?.display_name || profile?.username }}</strong>
            <span class="handle">@{{ selectedPost?.users?.username || profile?.username }}</span>
          </div>
        </div>

        <p class="post-content" style="word-break: break-word;">{{ selectedPost.content }}</p>

        <div class="post-footer" v-if="selectedPost.location">
          <span>{{ selectedPost.location }}</span>
        </div>

        <hr>
        <h3>{{ $t('comments') }} ({{ comments.length }})</h3>

        <div v-for="comment in comments" :key="comment.comment_id" class="comment">
          <strong>@{{ comment.users?.username }}</strong>
          <p>{{ comment.content }}</p>
          <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
        </div>

        <p v-if="comments.length === 0">{{ $t('noComments') }}</p>

        <div class="comment-input">
          <input v-model="newComment" :placeholder="$t('writeComment')" @keyup.enter="submitComment"/>
          <button class="submit-btn" @click="submitComment">{{ $t('send') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bg-gradient: linear-gradient(135deg, #f3e8ff, #ffffff);
  --text-primary: #1e293b;
  --text-secondary: #666;
  --heading-color: #5c5cff;
  --container-bg: rgba(255, 255, 255, 0.9);
  --container-border: 1px solid rgba(0, 0, 0, 0.05);
  --card-bg: white;
  --input-bg: white;
  --input-border: 2px solid #e0d7ff;
  --btn-gradient: linear-gradient(135deg, #5c5cff, #a99bff);
  --shadow-sm: 0 20px 50px rgba(0, 0, 0, 0.08);
  --border-color: #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-gradient: linear-gradient(135deg, #0f0f0f, #1a1a1a);
    --text-primary: #e5e7eb;
    --text-secondary: #9ca3af;
    --heading-color: #a99bff;
    --container-bg: rgba(30, 30, 30, 0.95);
    --container-border: 1px solid rgba(255, 255, 255, 0.1);
    --card-bg: #1e1e1e;
    --input-bg: #2a2a2a;
    --input-border: 2px solid #4a4a4a;
    --btn-gradient: linear-gradient(135deg, #7c6cff, #5c5cff);
    --shadow-sm: 0 20px 50px rgba(0, 0, 0, 0.5);
    --border-color: #333;
  }
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.page {
  min-height: 100vh;
  background: var(--bg-gradient);
  font-family: 'DM Sans', sans-serif;
  color: var(--text-primary);
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
  border: 3px solid var(--border-color);
  border-top-color: var(--heading-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.profile-wrapper { max-width: 720px; margin: 0 auto; }

.profile-header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
}

.avatar-wrap { flex-shrink: 0; }

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--heading-color);
}

.avatar-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--heading-color);
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

.name-row h1 { font-size: 24px; color: var(--text-primary); }

.edit-btn {
  background: var(--card-bg);
  border: 1.5px solid var(--heading-color);
  color: var(--heading-color);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.edit-btn:hover { background: var(--heading-color); color: white; }

.handle { color: var(--heading-color); font-size: 14px; margin-bottom: 10px; display: block; }
.bio { font-size: 14px; color: var(--text-primary); line-height: 1.6; margin-bottom: 10px; }
.meta { display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary); flex-wrap: wrap; }

.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }

.stat-box {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.stat-box strong { display: block; font-size: 26px; color: var(--heading-color); margin-bottom: 4px; }
.stat-box span { font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }

.tabs { display: flex; gap: 8px; margin-bottom: 20px; }

.tab {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1.5px solid var(--border-color);
  background: var(--card-bg);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active { background: var(--heading-color); border-color: var(--heading-color); color: white; }

.post-card {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: 16px;
  transition: transform 0.2s;
  cursor: pointer;
}

.post-card:hover { transform: translateY(-2px); }

.post-img { width: 100%; height: 200px; object-fit: cover; }
.post-body { padding: 20px; }

.post-author { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--btn-gradient);
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.post-author strong { font-size: 14px; display: block; color: var(--text-primary); }
.post-author .handle { font-size: 12px; margin-bottom: 0; color: var(--heading-color); }

.lang-badge {
  margin-left: auto;
  background: var(--input-bg);
  color: var(--heading-color);
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.post-content {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 12px;
  word-break: break-word;
}

.post-footer { display: flex; gap: 16px; font-size: 13px; color: var(--text-secondary); flex-wrap: wrap; }

.empty { text-align: center; color: var(--text-secondary); padding: 40px; font-size: 14px; }

.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-box {
  background: var(--card-bg);
  border-radius: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: var(--container-border);
}

.modal-image { width: 100%; height: 220px; object-fit: cover; border-radius: 14px; }

.close-btn {
  align-self: flex-end;
  border: none;
  background: none;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-secondary);
}

hr { border: none; border-top: 1px solid var(--border-color); }
h3 { font-size: 1rem; color: var(--text-primary); margin: 0; }

.comment { border-bottom: 1px solid var(--border-color); padding-bottom: 10px; }
.comment strong { font-size: 13px; color: var(--heading-color); }
.comment p { font-size: 14px; color: var(--text-primary); text-align: left; margin: 4px 0; }
.comment-date { font-size: 12px; color: var(--text-secondary); }

.comment-input { display: flex; gap: 8px; }

.comment-input input {
  flex: 1;
  padding: 14px;
  border: var(--input-border);
  border-radius: 14px;
  font-size: 1rem;
  outline: none;
  background: var(--input-bg);
  color: var(--text-primary);
}

.comment-input input:focus { border-color: var(--heading-color); }

.submit-btn {
  padding: 14px 20px;
  background: var(--btn-gradient);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .profile-wrapper { max-width: 1000px; }
  .profile-header { padding: 40px; gap: 40px; }
  .avatar, .avatar-placeholder { width: 120px; height: 120px; font-size: 48px; }
  .name-row h1 { font-size: 32px; }
  .edit-btn { padding: 10px 24px; font-size: 16px; }
  .bio { font-size: 16px; }
  .meta { font-size: 15px; gap: 24px; }
  .stat-box { padding: 28px; }
  .stat-box strong { font-size: 36px; }
  .stat-box span { font-size: 14px; }
  .tab { padding: 16px; font-size: 16px; }
  .post-card { margin-bottom: 24px; }
  .post-img { height: 260px; }
  .post-body { padding: 24px; }
  .post-author strong { font-size: 16px; }
  .post-author .handle { font-size: 14px; }
  .post-content { font-size: 16px; }
  .post-footer { font-size: 14px; gap: 20px; }
  .lang-badge { font-size: 13px; padding: 4px 12px; }
  button, .tab, .edit-btn, .submit-btn { min-height: 48px; }
}

@media (min-width: 1024px) and (max-width: 1366px) {
  .profile-wrapper { max-width: 1100px; }
  .name-row h1 { font-size: 40px; }
  .avatar, .avatar-placeholder { width: 140px; height: 140px; }
}
</style>