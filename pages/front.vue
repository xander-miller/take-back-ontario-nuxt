<template>
  <div class="page-container">
    <div class="hero-container">
      <div class="red-triangle">
        <div style="width: 100%; height: 100%;">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="50,100 0,0 100,0"
              style="fill: #b42f2b;"
            />
          </svg>
        </div>
      </div>
      <CnTowerChevron class="chevron" />
      <div class="blue-triangle">
        <div style="width: 100%; height: 100%;">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="50,0 100,100 0,100"
              style="fill: rgba(0, 150, 227, 0.7);"
            />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <img
        src="/img/tbo-hero.png"
        class="tbo-hero"
      >
    </div>
    <div class="simple-nav">
      <a
        href="/profile"
        class="front-button"
      >JOIN</a>
      <a
        href="/about"
        class="front-button"
      >LEARN MORE</a>
    </div>
  </div>
</template>

<script setup>
import CnTowerChevron from '~/components/CnTowerChevron.vue';
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}

.simple-nav {
  width: 40%;
  min-width: 300px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 3%;
  right: 0px;
}
.simple-nav a {
  line-height: 1em;
  color: white;
  font-size: 1.5rem;
}

.tbo-hero {
  position: absolute;
  width: 100%;
  top: 10%;
  left: 7%;
  width: 39%;
  height: auto;
}

.page-container {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: white;
}

.hero-container {
  position: relative;
  width: 100%;
  height: auto;
  padding-bottom: 54%;
  overflow: hidden;
  background-color: white;
}

.chevron {
  position: absolute;
  bottom: -10%;
  right: -25%;
  width: 90%;
  height: 90%;
}

.red-triangle {
  position: absolute;
  top: -7%;
  right: -55%;
  width: 124%;
  height: 80%;
}

.blue-triangle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 55%;
  height: 35%;
}
</style>