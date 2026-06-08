<script>
import LanguageButtons from "@/components/languageButtons.vue";

export default {
  components: { LanguageButtons },
  methods: {
    navigateToLoginView() {
      this.$router.push("/login");
    },
    navigateToRegistrationView() {
      this.$router.push("/registration");
    },
  },
};
</script>

<template>
  <div class="home-view">
    <LanguageButtons />

    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('welcome') }}</h1>
        <h2>{{ $t('subtitle') }}</h2>
        <p class="hero-text">
          Discover inspiring travel stories from nomads around the world.
        </p>
      </div>
    </section>

   
    <section class="stats-wrapper">
      <div class="stats-card">
        <div class="stat">
          <h3>10'000+</h3>
          <p>Total Travelers</p>
        </div>
        <div class="stat">
          <h3>25k</h3>
          <p>Stories Shared</p>
        </div>
        <div class="stat">
          <h3>150+</h3>
          <p>Countries</p>
        </div>
      </div>
    </section>

    <!-- Why Nomads Love Us -->
    <section class="content-section">
      <div class="section-title">
        <h2>Why Nomads Love Us</h2>
        <p>
          More than just a travel blog. It's a community of adventurers
          sharing real experiences.
        </p>
      </div>

      <div class="card-grid">
        <div class="info-card">
          <h3>Hidden Gems</h3>
          <p>Find authentic places beyond tourist hotspots.</p>
        </div>
        <div class="info-card">
          <h3>Real Stories</h3>
          <p>Travel experiences shared by real nomads.</p>
        </div>
        <div class="info-card">
          <h3>Community</h3>
          <p>Connect with explorers worldwide.</p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>Your Journey, Their Inspiration</h2>
      <p>Share your best travel stories and inspire thousands of travelers.</p>
      <div class="cta-buttons">
        <button class="primary-btn" @click="navigateToRegistrationView">
          Start your Diary →
        </button>
        <button class="secondary-btn" @click="navigateToLoginView">
          Explore
        </button>
      </div>
    </section>

    
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: var(--bg-gradient);
  font-family: Arial, sans-serif;
  color: var(--text-primary);
}


.hero {
  background: linear-gradient(135deg, var(--heading-color-light, #E5E3FF), var(--card-bg));
  padding: 80px 20px;
}

.hero-content {
  max-width: 900px;
  margin: auto;
  text-align: center;
}

.hero h1 {
  font-size: 56px;
  margin-bottom: 10px;
  color: var(--heading-color);
}

.hero h2 {
  font-size: 28px;
  opacity: 0.9;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.hero-text {
  font-size: 20px;
  opacity: 0.9;
  max-width: 650px;
  margin: auto;
  color: var(--text-secondary);
}

/* Stats Banner */
.stats-wrapper {
  margin-top: -40px;
  padding: 0 20px;
}

.stats-card {
  max-width: 900px;
  margin: auto;
  background: var(--card-bg);
  border-radius: 22px;
  padding: 30px;
  display: flex;
  justify-content: space-around;
  box-shadow: var(--shadow-sm);
  border: var(--container-border);
}

.stat {
  text-align: center;
}

.stat h3 {
  color: var(--heading-color);
  font-size: 32px;
  margin-bottom: 5px;
}

.stat p {
  color: var(--text-secondary);
}

/* Content Section */
.content-section {
  padding: 80px 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  font-size: 36px;
  margin-bottom: 10px;
  color: var(--heading-color);
}

.section-title p {
  color: var(--text-secondary);
  max-width: 650px;
  margin: auto;
}


.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: auto;
}

.info-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--shadow-sm);
  transition: 0.3s;
  border: var(--container-border);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}

.info-card h3 {
  margin-bottom: 10px;
  color: var(--heading-color);
}

.info-card p {
  color: var(--text-secondary);
}


.cta-section {
  max-width: 900px;
  margin: 0 auto 80px;
  background: var(--container-bg);
  backdrop-filter: blur(8px);
  padding: 60px 30px;
  border-radius: 30px;
  text-align: center;
  border: var(--container-border);
}

.cta-section h2 {
  font-size: 36px;
  margin-bottom: 15px;
  color: var(--heading-color);
}

.cta-section p {
  color: var(--text-secondary);
  margin-bottom: 25px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  border: none;
  padding: 14px 24px;
  border-radius: 14px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.25s;
  font-weight: 600;
}

.primary-btn {
  background: var(--btn-gradient);
  color: white;
}

.secondary-btn {
  background: transparent;
  border: 1.5px solid var(--heading-color);
  color: var(--heading-color);
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.secondary-btn:hover {
  background: var(--heading-color);
  color: white;
}

footer {
  text-align: center;
  padding: 30px;
  color: var(--text-secondary);
}


@media (max-width: 768px) {
  .hero {
    padding: 60px 16px;
  }
  .hero h1 {
    font-size: 40px;
  }
  .hero h2 {
    font-size: 22px;
  }
  .hero-text {
    font-size: 18px;
  }
  .stats-card {
    flex-direction: column;
    gap: 24px;
    padding: 24px;
  }
  .stat h3 {
    font-size: 28px;
  }
  .section-title h2 {
    font-size: 28px;
  }
  .cta-section {
    margin: 0 20px 60px;
    padding: 40px 20px;
  }
  .cta-section h2 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 32px;
  }
  .hero h2 {
    font-size: 18px;
  }
  .hero-text {
    font-size: 16px;
  }
  .content-section {
    padding: 50px 16px;
  }
  .info-card {
    padding: 20px;
  }
  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  .primary-btn, .secondary-btn {
    width: 100%;
  }
  
}
</style>