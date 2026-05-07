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
    <ul>
      <li>
        <button @click="navigateTotopPostsView">Top Commits</button>
      </li>
      <li>
        <button @click="navigateTobrowseView">Browse</button>
      </li>
      <li>
        <button @click="navigateTocreatePostView">Create Post</button>
      </li>
      <li>
        <button @click="navigateToprofileView">profile</button>
      </li>
    </ul>




  </nav>
</div>



</template>

<style scoped>





</style>