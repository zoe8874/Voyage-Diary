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
    }
  }
}
</script>

<template>
  <div>
    <NavigationBar/>

    <div class="page">
      <div class="container">
        <h1>Browse</h1>
        <p>Alle Reisegeschichten durchsuchen und filtern</p>

        <div class="filters">
          <input v-model="searchText" placeholder="Suchen nach Inhalt, Ort, User..."/>
          <input v-model="filterCountry" placeholder="Land filtern..."/>
          <select v-model="filterLanguage">
            <option value="">Alle Sprachen</option>
            <option v-for="lang in uniqueLanguages()" :key="lang" :value="lang">{{ lang }}</option>
          </select>
          <button class="reset-btn" @click="resetFilter">Zurücksetzen</button>
        </div>

        <p class="result-count">{{ filteredPosts.length }} Posts gefunden</p>
      </div>

      <div v-if="loading" class="container"><p>Loading...</p></div>

      <div v-else-if="filteredPosts.length === 0" class="container">
        <p>Keine Posts gefunden</p>
      </div>

      <div v-else class="posts-list">
        <div v-for="post in filteredPosts" :key="post.post_id" class="post-card">
          <img v-if="post.image_url" :src="post.image_url" class="post-image"/>

          <div class="post-author">
            <img v-if="post.users?.avatar_url" :src="post.users.avatar_url" class="avatar"/>
            <div>
              <strong>{{ post.users?.display_name || post.users?.username }}</strong>
              <span class="handle">@{{ post.users?.username }}</span>
            </div>
            <span class="lang-badge">{{ post.language }}</span>
          </div>

          <p class="post-content">{{ post.content }}</p>

          <div class="post-meta">
            <span v-if="post.location">{{ post.location }}, {{ post.country }}</span>
            <span>{{ formatDate(post.created_at) }}</span>
          </div>

          <div class="post-actions">
            <button :class="['action-btn', isLiked(post) ? 'liked' : '']" @click="toggleLike(post)">
              {{ isLiked(post) ? 'Geliked' : 'Liken' }} ({{ getLikeCount(post) }})
            </button>
            <button class="action-btn" @click="openPost(post)">Kommentare</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedPost" class="overlay" @click.self="selectedPost = null">
      <div class="modal-box">
        <button class="close-btn" @click="selectedPost = null">Schliessen</button>

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

</style>