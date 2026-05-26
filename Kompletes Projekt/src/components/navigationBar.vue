<script>
export default {
  data() {
    return {
      darkMode: false
    }
  },

  methods: {
    navigateTotopPostsView() {
      this.$router.push('/topPosts')
    },

    navigateTobrowseView() {
      this.$router.push('/browse')
    },

    navigateTocreatePostView() {
      this.$router.push('/addPost')
    },

    navigateToprofileView() {
      this.$router.push('/profile')
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode
    }
  }
}
</script>

<template>
  <div>
    <nav :class="{ dark: darkMode }">
      <img src="../assets/Bild (1).png" alt="Logo" class="Logo"/>

      <button @click="navigateTotopPostsView">
        <p>Top Commits</p>
      </button>

      <button @click="navigateTobrowseView">
        <p>Browse</p>
      </button>

      <button @click="navigateTocreatePostView">
        <p>Create Post</p>
      </button>

      <button @click="navigateToprofileView">
        <p>Profile</p>
      </button>

      <hr style="height: 34px; border: none; border-left: 2px solid rgba(0, 0, 0, 0.2);"  >
      <button @click="toggleDarkMode">
        <p>{{ darkMode ? ' Light' : ' Dark' }}</p>
      </button>
    </nav>
  </div>
</template>

<style scoped>
Logo {
  size: 40%;
}


nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 1rem ;
  margin: 1rem auto;

  width: 100%;

  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.3);
  

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);

  transition: all 0.3s ease;
}

img.Logo {
  width: 15%;
 ;
}

nav button {
  background: transparent;
  border: none;

  padding: 0.8rem 1.4rem auto;
  border-radius: 14px;

  font-size: auto;
  font-weight: 60;

  color: #2d2d2d;

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    transform 0.2s ease,
    color 0.25s ease;
}

nav button:hover {
  background-color: #E9E7FF;
  color: #5b4bdb;

  transform: translateY(-2px);
}

nav button:active {
  transform: scale(0.96);
}

nav p {
  margin: 0;
}



nav.dark {
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.4),
    0 1px 3px rgba(0, 0, 0, 0.3);
}

nav.dark button {
  color: #f5f5f5;
}

nav.dark button:hover {
  background-color: #333;
  color: #9d8cff;
}
</style>