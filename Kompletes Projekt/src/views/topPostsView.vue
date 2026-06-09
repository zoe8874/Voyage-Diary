<script>
import supabase from "@/supabase";
import NavigationBar from "@/components/navigationBar.vue";

export default {
  components: { NavigationBar },
  data() {
    return {
      posts: [],
      totalLikes: 0,
      loading: true,
      error: null,
      selectedPost: null,
      comments: [],
      newComment: '',
      currentUser: null
    }
  },
  async mounted() {
    const { data: { user } } = await supabase.auth.getUser()
    this.currentUser = user
    await this.loadPosts()
  },
  methods: {
    async loadPosts() {
      const { data, error } = await supabase
          .from('posts')
          .select(`
          post_id,
          content,
          image_url,
          location,
          country,
          language,
          created_at,
          users (username, display_name, avatar_url),
          likes (user_id)
        `)
          .order('created_at', { ascending: false })

      if (error) { this.error = error.message; this.loading = false; return }

      this.posts = data
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 10)

      this.totalLikes = this.posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0)
      this.loading = false
    },

    async toggleLike(post) {
      if (!this.currentUser) { this.$router.push('/login'); return }
      const liked = post.likes?.some(l => l.user_id === this.currentUser.id)
      if (liked) {
        const { error } = await supabase.from('likes').delete().eq('user_id', this.currentUser.id).eq('post_id', post.post_id)
        if (!error) post.likes = post.likes.filter(l => l.user_id !== this.currentUser.id)
      } else {
        const { error } = await supabase.from('likes').insert({ user_id: this.currentUser.id, post_id: post.post_id })
        if (error && error.code === '23505') {
          post.likes = [...(post.likes || []), { user_id: this.currentUser.id }]
        } else if (!error) {
          post.likes = [...(post.likes || []), { user_id: this.currentUser.id }]
        }
      }
      this.totalLikes = this.posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0)
    },

    isLiked(post) {
      if (!this.currentUser) return false
      return post.likes?.some(l => l.user_id === this.currentUser.id)
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
      if (!this.newComment.trim() || !this.currentUser) return
      const { data } = await supabase
          .from('comments')
          .insert({ user_id: this.currentUser.id, post_id: this.selectedPost.post_id, content: this.newComment.trim(), language: 'de' })
          .select('comment_id, content, created_at, users(username)')
      if (data) { this.comments.push(data[0]); this.newComment = '' }
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('de-CH', { day: 'numeric', month: 'short' })
    },

    getLikeCount(post) {
      return post.likes?.length || 0
    }
  }
}
</script>

<template>
  <div>
    <NavigationBar/>

    <div class="top-posts">
      <div class="header">
        <p>Trending Now</p>
        <h1>Top Posts This Week</h1>
        <p>Discover the most loved stories from our community of nomads.</p>
        <div class="stats">
          <div>
            <strong>{{ totalLikes }}</strong>
            <span>Total Likes</span>
          </div>
          <div>
            <strong>{{ posts.length }}</strong>
            <span>Top Stories</span>
          </div>
        </div>
      </div>

      <div v-if="loading">Loading...</div>

      <div v-else>
        <div v-for="(post, index) in posts" :key="post.post_id" class="post-card">
          <span class="rank">{{ index + 1 }}</span>

          <img v-if="post.image_url" :src="post.image_url" :alt="post.content" class="post-image"/>

          <div class="post-info">
            <div class="author">
              <img v-if="post.users?.avatar_url" :src="post.users.avatar_url" class="avatar"/>
              <div>
                <strong>{{ post.users?.display_name || post.users?.username }}</strong>
                <span>@{{ post.users?.username }}</span>
              </div>
              <span class="language">{{ post.language }}</span>
            </div>

            <p class="content">{{ post.content }}</p>

            <div class="location" v-if="post.location">
              {{ post.location }}, {{ post.country }}
            </div>

            <div class="footer">
              <button :class="['like-btn', isLiked(post) ? 'liked' : '']" @click="toggleLike(post)">
                {{ isLiked(post) ? 'Geliked' : 'Liken' }} ({{ getLikeCount(post) }})
              </button>
              <button class="comment-btn" @click="openPost(post)">Kommentare</button>
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedPost" class="overlay" @click.self="selectedPost = null">
      <div class="modal-box">
        <button class="close-btn" @click="selectedPost = null">Schliessen</button>

        <img v-if="selectedPost.image_url" :src="selectedPost.image_url" class="modal-image"/>

        <div class="author">
          <img v-if="selectedPost.users?.avatar_url" :src="selectedPost.users.avatar_url" class="avatar"/>
          <div>
            <strong>{{ selectedPost.users?.display_name || selectedPost.users?.username }}</strong>
            <span>@{{ selectedPost.users?.username }}</span>
          </div>
          <span class="language">{{ selectedPost.language }}</span>
        </div>

        <p class="content">{{ selectedPost.content }}</p>

        <div class="location" v-if="selectedPost.location">
          {{ selectedPost.location }}, {{ selectedPost.country }}
        </div>

        <hr>
        <h3>Kommentare ({{ comments.length }})</h3>

        <div v-for="comment in comments" :key="comment.comment_id" class="comment">
          <strong>@{{ comment.users?.username }}</strong>
          <p>{{ comment.content }}</p>
          <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
        </div>

        <p v-if="comments.length === 0">Noch keine Kommentare</p>

        <div v-if="currentUser" class="comment-input">
          <input v-model="newComment" placeholder="Kommentar schreiben..." @keyup.enter="submitComment"/>
          <button class="submit-btn" @click="submitComment">Senden</button>
        </div>
        <p v-else>
          <span class="link" @click="$router.push('/login')">Einloggen</span> um zu kommentieren
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-posts {
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 20px 60px;
  font-family: 'Inter', sans-serif;
  color: var(--text-primary);
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.header p:first-child {
  color: var(--heading-color);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.header h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 15px;
  color: var(--heading-color);
}

.header p:last-of-type {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 600px;
  margin: 0 auto;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 35px;
}

.stats div {
  background: var(--card-bg);
  padding: 18px 30px;
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
  border: var(--container-border);
  min-width: 140px;
  text-align: center;
}

.stats strong {
  display: block;
  font-size: 1.8rem;
  color: var(--heading-color);
}

.stats span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.post-card {
  position: relative;
  display: flex;
  gap: 24px;
  background: var(--card-bg);
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: var(--shadow-sm);
  border: var(--container-border);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.rank {
  position: absolute;
  top: 18px;
  left: 18px;
  width: 42px;
  height: 42px;
  background: var(--heading-color);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 2;
}

.post-image {
  width: 320px;
  height: 260px;
  object-fit: cover;
  flex-shrink: 0;
}

.post-info {
  flex: 1;
  padding: 28px 28px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border-color);
}

.author strong {
  display: block;
  font-size: 1rem;
  color: var(--text-primary);
}

.author span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.language {
  margin-left: auto;
  background: rgba(115, 118, 255, 0.15);
  color: var(--heading-color) !important;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8rem !important;
  font-weight: 600;
}

.content {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 18px;
}

.location {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.footer {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
}

.footer span:last-child { margin-left: auto; }

.like-btn, .comment-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 6px;
  transition: 0.2s;
}

.like-btn:hover, .comment-btn:hover {
  background: rgba(115, 118, 255, 0.1);
  color: var(--heading-color);
}

.like-btn.liked {
  color: var(--heading-color);
  font-weight: 600;
}

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

.modal-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
}

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

.comment {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

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

.link { color: var(--heading-color); cursor: pointer; text-decoration: underline; }

@media (max-width: 850px) {
  .header h1 { font-size: 2.2rem; }
  .post-card { flex-direction: column; }
  .post-image { width: 100%; height: 240px; }
  .stats { flex-direction: column; align-items: center; gap: 18px; }
  .author { flex-wrap: wrap; }
  .language { margin-left: 0; }
}

@media (max-width: 500px) {
  .top-posts { padding: 100px 14px 40px; }
  .header h1 { font-size: 1.8rem; }
  .post-info { padding: 20px; }
  .content { font-size: 0.98rem; }
  .stats div { width: 100%; }
}
</style>