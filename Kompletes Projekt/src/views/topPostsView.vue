<script>
import supabase from "@/supabase";
import NavigationBar from "@/components/navigationBar.vue";

export default {
  components: {NavigationBar},
  data() {
    return {
      posts: [],
      totalLikes: 0,
      loading: true,
      error: null
    }
  },
  async mounted() {
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
            users (
              username,
              display_name,
              avatar_url
            ),
            likes (count)
          `)
          .order('created_at', { ascending: false })

      console.log('Posts:', data)
      console.log('Fehler:', error)

      if (error) {
        this.error = error.message
        this.loading = false
        return
      }

      this.posts = data
      this.totalLikes = data.reduce((sum, post) => sum + (post.likes[0]?.count || 0), 0)
      this.loading = false
    },

    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('de-CH', { day: 'numeric', month: 'short' })
    },

    getLikeCount(post) {
      return post.likes[0]?.count || 0
    }
  }
}
</script>

<template>

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
              <strong>{{ post.users?.display_name }}</strong>
              <span>@{{ post.users?.username }}</span>
            </div>
            <span class="language">{{ post.language }}</span>
          </div>

          <p class="content">{{ post.content }}</p>

          <div class="location" v-if="post.location">
            📍 {{ post.location }}, {{ post.country }}
          </div>

          <div class="footer">
            <span>❤️ {{ getLikeCount(post) }}</span>
            <span>{{ formatDate(post.created_at) }}</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>

</style>