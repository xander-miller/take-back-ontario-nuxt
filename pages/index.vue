<template>
  <div class="page-container">
    <NuxtLayout name="bare">
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
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="50,0 100,100 -25,150"
              style="fill: rgba(0, 150, 227, 0.7);"
            />
          </svg>
        </div>
        <img
          src="/img/tbo-hero.png"
          class="tbo-hero"
        >
        <nuxt-link
          to="/join"
        >
          <button class="join-button hover:bg-red-800 bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow">
            Join
            Take Back Ontario
          </button>
        </nuxt-link>
      </div>
      <div />
      <div class="simple-nav">
        <NuxtLink
          to="welcome"
          class="front-button"
        >
          Log In
        </NuxtLink>
      </div>
      <div class="page-body-wrapper">
        <div class="page-body prose-slate prose-xl">
          <h1
            class="prose-h1"
            style="color:#b42f2b;"
          >
            What is Take Back Ontario?
          </h1>
          <h2 class="prose-h2 m-0">
            <strong>Ontario</strong> joins the Canadian <strong>"Take Back"</strong> Movement
          </h2>
          <p class="mt-12 mb-0">
            <strong>Take Back Ontario</strong> is a <strong>citizen-led</strong> organization that
            <strong>teaches Ontarians</strong> how to take back their political power in our province.
          </p>
          <p class="mt-12 mb-0">
            Take Back Ontario believes that informed citizens leaning into politics with
            <strong>personal responsibility, discipline and fortitude</strong> will restore <strong>prosperity,
              freedom</strong> and <strong>order</strong> to our institutions and province.
          </p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import CnTowerChevron from '~/components/CnTowerChevron.vue';
</script>

<style scoped>
.join-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

}

svg {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
}

.simple-nav {
  width: 40%;
  min-width: 300px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  position: absolute;
  top: 1%;
  right: 0px;
  z-index: 100;
}

.simple-nav a {
  line-height: 1em;
  color: white;
}

.tbo-hero {
  position: absolute;
  width: 100%;
  top: 7%;
  left: 7%;
  width: 39%;
  height: auto;
}

.hero-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 54%;
  background-color: white;
  z-index: 100;
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
  bottom: -1px;
  right: 0;
  width: 55%;
  height: 35%;
}

.blue-triangle svg {
  overflow: visible;
}
</style>