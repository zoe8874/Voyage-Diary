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
  <languageButtons />


<section class="hero">
<div class="hero-content">
 
        
 
        <h1>{{ $t('welcome') }}</h1>
<h2>{{ $t('subtitle') }}</h2>
 
        <p class="hero-text">
          Discover inspiring travel stories from nomads around the world.
</p>
 

 
      </div>
</section>
 
    <!-- Stats Banner -->
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
 
      <p>
        Share your best travel stories and inspire thousands of travelers.
</p>
 
      <div class="cta-buttons">
<button class="primary-btn" @click="navigateToLoginView">
          Start your Diary →
</button>
 
        <button class="secondary-btn" @click="navigateToLoginView">
           Explore
</button>
</div>
 
    </section>
 
    <footer>
      © Team VoyageDiary 2026
</footer>
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
  color: white;
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
 
 
.trending-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(8px);
  padding: 10px 18px;
  border-radius: 999px;
  margin-bottom: 25px;
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
    color: #ffffff;
  }

  .hero h2 {
    color: #c7d2fe;
  }

  .hero-text {
    color: #cbd5e1;
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
 
</style>