<script>
import LanguageButtons from "@/components/languageButtons.vue"

export default {
  components: { LanguageButtons },
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    navigateTotopPostsView() { this.$router.push('/topPosts'); this.mobileMenuOpen = false },
    navigateTobrowseView() { this.$router.push('/browse'); this.mobileMenuOpen = false },
    navigateTocreatePostView() { this.$router.push('/addPost'); this.mobileMenuOpen = false },
    navigateToprofileView() { this.$router.push('/profile'); this.mobileMenuOpen = false },
    navigateToAdminView() { this.$router.push('/admin'); this.mobileMenuOpen = false },
    toggleMobileMenu() { this.mobileMenuOpen = !this.mobileMenuOpen }
  }
}
</script>

<template>
  <div>
    <nav class="desktop-nav">
      <img src="../assets/Bild (1).png" alt="Logo" class="logo"/>
      <div class="nav-links">
        <button @click="navigateTotopPostsView">Top Posts</button>
        <button @click="navigateTobrowseView">Browse</button>
        <button @click="navigateTocreatePostView">Create Post</button>
        <button @click="navigateToprofileView">Profile</button>
        <button class="admin-btn" @click="navigateToAdminView">Admin</button>
      </div>
      <span class="lang-divider"></span>
      <LanguageButtons/>
    </nav>

    <div class="mobile-nav">
      <div class="mobile-left">
        <img src="../assets/Bild (1).png" alt="Logo" class="logo"/>
        <button class="burger-btn" @click="toggleMobileMenu">☰</button>
      </div>
      <LanguageButtons/>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-dropdown">
      <button @click="navigateTotopPostsView">Top Posts</button>
      <button @click="navigateTobrowseView">Browse</button>
      <button @click="navigateTocreatePostView">Create Post</button>
      <button @click="navigateToprofileView">Profile</button>
      <button @click="navigateToAdminView">Admin</button>
    </div>
  </div>
</template>

<style scoped>
.desktop-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0.3rem auto;
  width: 90%;
  max-width: 1200px;
  background: var(--container-bg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: visible;
}

.logo {
  width: 12%;
  min-width: 80px;
  max-width: 140px;
  height: auto;
}

.nav-links {
  display: flex;
  gap: 0.8rem;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.desktop-nav button,
.mobile-dropdown button {
  background: transparent;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.desktop-nav button:hover,
.mobile-dropdown button:hover {
  background-color: var(--heading-color);
  color: white;
  transform: translateY(-2px);
}

.admin-btn {
  padding: 6px 12px;
  font-size: 0.8rem;
  color: #aaa;
  border: 1px solid #eee;
  border-radius: 8px;
}

.admin-btn:hover {
  background: #f0f0f0 !important;
  color: #555 !important;
  transform: none !important;
}

.lang-divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
  margin: 0 8px;
  display: inline-block;
  align-self: center;
}

.mobile-nav {
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: var(--container-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.mobile-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.burger-btn {
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: 12px;
}

.burger-btn:hover {
  background: rgba(0,0,0,0.05);
}

.mobile-dropdown {
  position: fixed;
  top: 70px;
  right: 16px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  z-index: 1001;
  border: 1px solid var(--container-border);
}

.mobile-dropdown button {
  white-space: nowrap;
  text-align: left;
  padding: 10px 20px;
}

@media (max-width: 1024px) {
  .desktop-nav { display: none; }
  .mobile-nav { display: flex; }
}

@media (min-width: 1025px) {
  .mobile-nav, .mobile-dropdown { display: none !important; }
}
</style>