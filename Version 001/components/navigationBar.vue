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
      this.$router.push('/createPost')
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
      <button @click="navigateTotopPostsView">Top Commits</button>
      <button @click="navigateTobrowseView">Browse</button>
    <button @click="navigateTocreatePostView">Create Post</button>
     <button @click="navigateToprofileView">profile</button>
  </nav>
</div>



</template>

<style scoped>

</style>