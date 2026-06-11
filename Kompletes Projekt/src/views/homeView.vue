<script>
import LanguageButtons from "@/components/languageButtons.vue";

export default {
  components: { LanguageButtons },

  methods: {
    navigateToLoginView() {
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <div class="home-view">

    <div class="lang-wrapper">
      <LanguageButtons/>
    </div>

    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('welcome') }}</h1>
        <h2>{{ $t('subtitle') }}</h2>
        <p class="hero-text">{{ $t('heroText') }}</p>
      </div>
    </section>


    <section class="stats-wrapper">
      <div class="stats-card">
        <div class="stat">
          <h3>10'000+</h3>
          <p>{{ $t('totalTravelers') }}</p>
        </div>
        <div class="stat">
          <h3>25k</h3>
          <p>{{ $t('storiesShared') }}</p>
        </div>
        <div class="stat">
          <h3>150+</h3>
          <p>{{ $t('countries') }}</p>
        </div>
      </div>
    </section>

    
    <section class="content-section">
      <div class="section-title">
        <h2>{{ $t('whyNomads') }}</h2>
        <p>{{ $t('whyNomadsText') }}</p>
      </div>

      <div class="card-grid">
        <div class="info-card">
          <h3>{{ $t('hiddenGems') }}</h3>
          <p>{{ $t('hiddenGemsText') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('realStories') }}</h3>
          <p>{{ $t('realStoriesText') }}</p>
        </div>
        <div class="info-card">
          <h3>{{ $t('community') }}</h3>
          <p>{{ $t('communityText') }}</p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>{{ $t('ctaTitle') }}</h2>
      <p>{{ $t('ctaText') }}</p>
      <div class="cta-buttons">
        <button class="primary-btn" @click="navigateToLoginView">{{ $t('startDiary') }}</button>
        <button class="secondary-btn" @click="navigateToLoginView">{{ $t('explore') }}</button>
      </div>
    </section>

    
  </div>
</template>

<style scoped>

.home-view {
  min-height: 100vh;
  background: linear-gradient(to bottom, #eef2ff, white);
  font-family: Arial, sans-serif;
}


.hero {
  background: linear-gradient(135deg, #E5E3FF, #ffffff);
  color: rgb(84, 84, 84);
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
}

.hero h2 {
  font-size: 28px;
  opacity: 0.9;
  margin-bottom: 20px;
}

.hero-text {
  font-size: 20px;
  opacity: 0.9;
  max-width: 650px;
  margin: auto;
}



.stats-wrapper {
  margin-top: -40px;
  padding: 0 20px;
}

.stats-card {
  max-width: 900px;
  margin: auto;
  background: white;
  border-radius: 22px;
  padding: 30px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.stat {
  text-align: center;
}

.stat h3 {
  color: #5959f7;
  font-size: 32px;
  margin-bottom: 5px;
}

.stat p {
  color: #777;
}



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
}

.section-title p {
  color: #666;
  max-width: 650px;
  margin: auto;
}




.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
  gap: 25px;
  max-width: 1200px;
  margin: auto;
}

.info-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  transition: 0.3s;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-card h3 {
  margin-bottom: 10px;
}



.cta-section {
  max-width: 900px;
  margin: 0 auto 80px;
  background: linear-gradient(135deg, #e0e7ff, #ede9fe);
  padding: 60px 30px;
  border-radius: 30px;
  text-align: center;
}

.cta-section h2 {
  font-size: 36px;
  margin-bottom: 15px;
}

.cta-section p {
  color: #666;
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
}

.primary-btn {
  background: #5959f7;
  color: white;
}

.secondary-btn {
  background: white;
  color: #5959f7;
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
}



footer {
  text-align: center;
  padding: 30px;
  color: #777;
}

@media (prefers-color-scheme: dark) {
  div.home-view {
    background: transparent;
  }

  .home-view {
    background: linear-gradient(to bottom, #0f172a, #111827);
    color: #f1f5f9;
  }



  .hero {
    background: linear-gradient(135deg, #1e1b4b, #111827);
  }

  .hero h1 {
    color: #bccfe6;
  }

  .hero h2 {
    color: #c7d2fe;
  }

  .hero-text {
    color: #bccfe6;
  }


  .stats-card {
    background: #1e1e1e;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.05);
  }

  .stat h3 {
    color: #a99bff;
  }

  .stat p {
    color: #94a3b8;
  }



  .section-title h2 {
    color: #f8fafc;
  }

  .section-title p {
    color: #94a3b8;
  }



  .info-card {
    background: #1e1e1e;
    color: #f1f5f9;
    box-shadow: 0 8px 24px rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.05);
  }

  .info-card p {
    color: #cbd5e1;
  }

  .info-card:hover {
    box-shadow: 0 12px 28px rgba(0,0,0,0.75);
  }


  .cta-section {
    background: linear-gradient(135deg, #1e1b4b, #27272a);
    border: 1px solid rgba(255,255,255,0.05);
  }

  .cta-section h2 {
    color: white;
  }

  .cta-section p {
    color: #cbd5e1;
  }

  .primary-btn {
    background: #7c6cff;
    color: white;
  }

  .secondary-btn {
    background: #2a2a2a;
    color: #dbe4ff;
  }

  .primary-btn:hover,
  .secondary-btn:hover {
    box-shadow: 0 8px 18px rgba(0,0,0,0.45);
  }



  footer {
    color: #94a3b8;
  }
}

.lang-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

</style>