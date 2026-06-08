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
            likes (
              count
            )
          `)
          .order('created_at', { ascending: false })

      console.log('Posts:', data)
      console.log('Fehler:', error)

      if (error) {
        this.error = error.message
        this.loading = false
        return
      }

      // Nach Likes sortieren und nur Top 10 anzeigen
      this.posts = data
          .sort((a, b) => {
            const likesA = a.likes?.length || 0
            const likesB = b.likes?.length || 0

            return likesB - likesA
          })
          .slice(0, 10)

      // Total Likes berechnen
      this.totalLikes = this.posts.reduce(
          (sum, post) => sum + (post.likes?.length || 0),
          0
      )

      this.loading = false
    },

    formatDate(dateStr) {
      const date = new Date(dateStr)

      return date.toLocaleDateString('de-CH', {
        day: 'numeric',
        month: 'short'
      })
    },

    getLikeCount(post) {
      return post.likes?.length || 0
    }
  }
}
</script>

<template>

  <div>

    <NavigationBar />

    <div class="top-posts">

      <div class="header">

        <p>Trending Now</p>

        <h1>Top Posts This Week</h1>

        <p>
          Discover the most loved stories from our community of nomads.
        </p>

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

      <div v-if="loading">
        Loading...
      </div>

      <div v-else>

        <div class="grid">

          <div
              v-for="(post, index) in posts"
              :key="post.post_id"
              class="post-card"
          >

            <span class="rank">
              {{ index + 1 }}
            </span>

            <img
                v-if="post.image_url"
                :src="post.image_url"
                :alt="post.content"
                class="post-image"
            />

            <div class="post-info">

              <div class="author">

                <img
                    v-if="post.users?.avatar_url"
                    :src="post.users.avatar_url"
                    class="avatar"
                />

                <div>
                  <strong>{{ post.users?.display_name }}</strong>
                  <span>@{{ post.users?.username }}</span>
                </div>

                <span class="language">
                  {{ post.language }}
                </span>

              </div>

              <p class="content">
                {{ post.content }}
              </p>

              <div class="location" v-if="post.location">
                📍 {{ post.location }}, {{ post.country }}
              </div>

              <div class="footer">

                <span>
                  ♡ {{ getLikeCount(post) }}
                </span>

                <span>
                  {{ formatDate(post.created_at) }}
                </span>

              </div>

            </div>

          </div>

        </div>

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
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
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
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
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
  border: 3px solid var(--border-color, #e2e8f0);
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
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color, #e2e8f0);
  padding-top: 16px;
}

.top-posts > div[v-if] {
  text-align: center;
  padding: 50px;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

/* ========== RESPONSIVE (bleibt fast unverändert) ========== */
@media (max-width: 850px) {
  .header h1 {
    font-size: 2.2rem;
  }
  .post-card {
    flex-direction: column;
  }
  .post-image {
    width: 100%;
    height: 240px;
  }
  .stats {
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .author {
    flex-wrap: wrap;
  }
  .language {
    margin-left: 0;
  }
}

@media (max-width: 500px) {
  .top-posts {
    padding: 100px 14px 40px;
  }
  .header h1 {
    font-size: 1.8rem;
  }
  .post-info {
    padding: 20px;
  }
  .content {
    font-size: 0.98rem;
  }
  .stats div {
    width: 100%;
  }
}
</style>