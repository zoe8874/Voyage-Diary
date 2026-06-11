<script>
import supabase from "@/supabase";
import NavigationBar from "@/components/navigationBar.vue";

export default {
  components: { NavigationBar },
  data() {
    return {
      posts: [],
      filteredPosts: [],
      loading: true,
      selectedPost: null,
      comments: [],
      newComment: '',
      currentUser: null,
      searchText: '',
      filterLanguage: '',
      filterCountry: ''
    }
  },
  async mounted() {
    const { data: { user } } = await supabase.auth.getUser()
    this.currentUser = user
    await this.loadPosts()
  },
  watch: {
    searchText() { this.applyFilter() },
    filterLanguage() { this.applyFilter() },
    filterCountry() { this.applyFilter() }
  },
  methods: {
    async loadPosts() {
      const { data, error } = await supabase
          .from('posts')
          .select('post_id, content, image_url, location, country, language, created_at, users(username, display_name, avatar_url), likes(user_id)')
          .order('created_at', { ascending: false })

      if (error) { this.loading = false; return }

      this.posts = data
      this.filteredPosts = data
      this.loading = false
    },

    applyFilter() {
      let result = this.posts

      if (this.searchText.trim()) {
        const search = this.searchText.toLowerCase()
        result = result.filter(p =>
            p.content?.toLowerCase().includes(search) ||
            p.location?.toLowerCase().includes(search) ||
            p.country?.toLowerCase().includes(search) ||
            p.users?.username?.toLowerCase().includes(search) ||
            p.users?.display_name?.toLowerCase().includes(search)
        )
      }

      if (this.filterLanguage) {
        result = result.filter(p => p.language === this.filterLanguage)
      }

      if (this.filterCountry.trim()) {
        result = result.filter(p =>
            p.country?.toLowerCase().includes(this.filterCountry.toLowerCase())
        )
      }

      this.filteredPosts = result
    },

    resetFilter() {
      this.searchText = ''
      this.filterLanguage = ''
      this.filterCountry = ''
      this.filteredPosts = this.posts
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
      return new Date(dateStr).toLocaleDateString('de-CH', { day: 'numeric', month: 'short', year: 'numeric' })
    },

    getLikeCount(post) {
      return post.likes?.length || 0
    },

    uniqueLanguages() {
      return [...new Set(this.posts.map(p => p.language).filter(Boolean))]
    },
    truncate(text, len = 100) {
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
      <div class="container">
        <h1>{{ $t('browse') }}</h1>
        <p>{{ $t('browseSubtitle') }}</p>

        <div class="filters">
          <input v-model="searchText" :placeholder="$t('searchPlaceholder')"/>
          <input v-model="filterCountry" :placeholder="$t('filterCountry')"/>
          <select v-model="filterLanguage">
            <option value="">{{ $t('allLanguages') }}</option>
            <option v-for="lang in uniqueLanguages()" :key="lang" :value="lang">{{ lang }}</option>
          </select>
          <button class="reset-btn" @click="resetFilter">{{ $t('reset') }}</button>
        </div>

        <p class="result-count">{{ filteredPosts.length }} {{ $t('postsFound') }}</p>
      </div>

      <div v-if="loading" class="container"><p>{{ $t('loading') }}</p></div>

      <div v-else-if="filteredPosts.length === 0" class="container">
        <p>{{ $t('noPostsFound') }}</p>
      </div>

      <div v-else class="posts-list">
        <div v-for="post in filteredPosts" :key="post.post_id" class="post-card" @click="openPost(post)">
          <img v-if="post.image_url" :src="post.image_url" class="post-image"/>

          <div class="post-author">
            <img v-if="post.users?.avatar_url" :src="post.users.avatar_url" class="avatar"/>
            <div>
              <strong>{{ post.users?.display_name || post.users?.username }}</strong>
              <span class="handle">@{{ post.users?.username }}</span>
            </div>
            <span class="lang-badge">{{ post.language }}</span>
          </div>
          <p class="post-content">{{ truncate(post.content) }}</p>

          <div class="post-meta">
            <span v-if="post.location">{{ post.location }}, {{ post.country }}</span>
            <span>{{ formatDate(post.created_at) }}</span>
          </div>

          <div class="post-actions">
            <button :class="['action-btn', isLiked(post) ? 'liked' : '']" @click="toggleLike(post)">
              {{ isLiked(post) ? $t('liked') : $t('like') }} ({{ getLikeCount(post) }})
            </button>
            <button class="action-btn" @click="openPost(post)">{{ $t('comments') }}</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedPost" class="overlay" @click.self="selectedPost = null">
      <div class="modal-box">
        <button class="close-btn" @click="selectedPost = null">{{ $t('close') }}</button>

        <img v-if="selectedPost.image_url" :src="selectedPost.image_url" class="modal-image"/>

        <div class="post-author">
          <img v-if="selectedPost.users?.avatar_url" :src="selectedPost.users.avatar_url" class="avatar"/>
          <div>
            <strong>{{ selectedPost.users?.display_name || selectedPost.users?.username }}</strong>
            <span class="handle">@{{ selectedPost.users?.username }}</span>
          </div>
          <span class="lang-badge">{{ selectedPost.language }}</span>
        </div>

        <p class="post-content">{{ selectedPost.content }}</p>

        <div class="post-meta">
          <span v-if="selectedPost.location">{{ selectedPost.location }}, {{ selectedPost.country }}</span>
          <span>{{ formatDate(selectedPost.created_at) }}</span>
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





.page {
  min-height: 100vh;
  background: var(--bg-gradient);
  padding: 32px 20px 80px;
  color: var(--text-primary);
  display: flex !important;
  flex-direction: column !important;
  position: relative;
  z-index: 0;
  isolation: auto;
}

.container {
  max-width: 1100px;
  margin: 20px auto;
  width: 100%;
  position: relative;
  z-index: 999;

}

h1 {
  font-size: 2.5rem;
  color: var(--heading-color);
  margin-bottom: 8px;
}

.container > p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}


.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  background: var(--card-bg);
  padding: 20px;
  border-radius: 24px;
  border: var(--container-border);
}

.filters input,
.filters select {
  flex: 1;
  min-width: 150px;
  padding: 12px 16px;
  background: var(--input-bg);
  border: var(--input-border);
  border-radius: 40px;
  font-size: 0.9rem;
  color: var(--text-primary);
  outline: none;
  transition: 0.2s;
}

.filters input:focus,
.filters select:focus {
  border-color: var(--heading-color);
  box-shadow: 0 0 0 3px rgba(115, 118, 255, 0.2);
}

.reset-btn {
  background: transparent;
  border: 1.5px solid var(--heading-color);
  color: var(--heading-color);
  padding: 12px 24px;
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.reset-btn:hover {
  background: var(--heading-color);
  color: white;
  transform: translateY(-2px);
}

.result-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 24px;
  text-align: right;
}

/* ========== POSTS LIST (KARTEN) ========== */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;

}

.post-card {
  background: var(--card-bg);
  border-radius: 24px;
  overflow: hidden;
  border: var(--container-border);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.post-image {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--heading-color);
}

.post-author strong {
  color: var(--text-primary);
  font-size: 1rem;
  display: block;
}

.handle {
  font-size: 0.8rem;
  color: var(--heading-color);
}

.lang-badge {
  margin-left: auto;
  background: rgba(115, 118, 255, 0.15);
  color: var(--heading-color);
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 600;
}

.post-content {
  padding: 0 24px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
  word-break: break-word;
  overflow-wrap: break-word;
}

.post-meta {
  padding: 12px 24px;
  display: flex;
  gap: 20px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 12px;
}

.post-actions {
  padding: 0 24px 20px;
  display: flex;
  gap: 16px;
}

.action-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  color: var(--text-primary);
}

.action-btn:hover {
  background: var(--heading-color);
  border-color: var(--heading-color);
  color: white;
}

.action-btn.liked {
  background: var(--heading-color);
  color: white;
  border-color: var(--heading-color);
}

/* ========== MODAL (OVERLAY) ========== */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 20px;
}

.modal-box {
  background: var(--card-bg);
  border-radius: 32px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
  position: relative;
  border: var(--container-border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.close-btn {
  position: sticky;
  top: 0;
  float: right;
  background: var(--heading-color);
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 40px;
  cursor: pointer;
  margin-bottom: 16px;
  font-size: 0.8rem;
}

.modal-image {
  width: 100%;
  border-radius: 20px;
  margin: 16px 0;
}

.comment {
  background: var(--input-bg);
  border-radius: 20px;
  padding: 12px 16px;
  margin-bottom: 12px;
  border: 1px solid var(--border-color);
}

.comment p {
  margin: 6px 0;
  color: var(--text-primary);
}

.comment-date {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.comment-input {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.comment-input input {
  flex: 1;
  padding: 12px 16px;
  background: var(--input-bg);
  border: var(--input-border);
  border-radius: 40px;
  color: var(--text-primary);
}

.submit-btn {
  background: var(--btn-gradient);
  border: none;
  padding: 0 20px;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.link {
  color: var(--heading-color);
  cursor: pointer;
  text-decoration: underline;
}

.link:hover {
  opacity: 0.8;
}

hr {
  margin: 20px 0;
  border-color: var(--border-color);
}


@media (max-width: 768px) {
  .page {
    padding: 20px 16px 60px;
  }
  h1 {
    font-size: 2rem;
  }
  .filters {
    flex-direction: column;
  }
  .filters input,
  .filters select,
  .reset-btn {
    width: 100%;
  }
  .post-author {
    padding: 16px 20px 8px;
  }
  .post-content {
    padding: 0 20px;
  }
  .post-meta {
    padding: 8px 20px;
  }
  .post-actions {
    padding: 0 20px 16px;
  }
  .modal-box {
    padding: 20px;
    max-height: 90vh;
  }
}

@media (max-width: 480px) {
  .post-author {
    flex-wrap: wrap;
    gap: 8px;
  }
  .lang-badge {
    margin-left: 0;
  }
  .action-btn {
    flex: 1;
    text-align: center;
  }
  .comment-input {
    flex-direction: column;
  }
  .submit-btn {
    padding: 12px;
  }
}
</style>