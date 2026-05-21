<script>

export default {
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
    }
  }
}





</script>

<template>

<div>
  <nav>
      <button @click="navigateTotopPostsView"><p>Top Commits</p></button>
      <button @click="navigateTobrowseView"><p>Browse</p></button>
    <button @click="navigateTocreatePostView"><p>Create Post</p></button>
     <button @click="navigateToprofileView"><p>profile</p></button>
  </nav>
</div>



</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 1rem 2rem;
  margin: 1rem auto;

  width: fit-content;

  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
}

nav button {
  background: transparent;
  border: none;

  padding: 0.8rem 1.4rem;
  border-radius: 14px;

  font-size: 1rem;
  font-weight: 600;

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
</style>