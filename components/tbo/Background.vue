<template>
  <div class="page-container">
    <NuxtLayout name="bare">
      <div class="mx-auto container">
        <div class="hero-container">
          <div class="red-triangle">
            <div style="width: 100%; height: 100%">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon
                  points="50,100 0,0 100,0"
                  style="fill: #b42f2b"
                />
              </svg>
            </div>
          </div>
          <CnTowerChevron class="chevron" />
          <!-- <div class="blue-triangle"> -->
          <!--   <svg -->
          <!--     viewBox="0 0 100 100" -->
          <!--     preserveAspectRatio="none" -->
          <!--   > -->
          <!--     <polygon -->
          <!--       points="50,0 100,100 -25,150" -->
          <!--       style="fill: rgba(0, 150, 227, 0.7)" -->
          <!--     /> -->
          <!--   </svg> -->
          <!-- </div> -->
          <img
            src="/img/tbo-hero.png"
            class="tbo-hero"
          >
        </div>
      </div>
      <div />
      <div class="page-body-wrapper">
        <div class="px-8">
        <slot />
        </div>
        <!-- <div class="blue-triangle-separator"> -->
        <!--   <svg -->
        <!--     viewBox="0 0 100 100" -->
        <!--     preserveAspectRatio="none" -->
        <!--   > -->
        <!--     <polygon -->
        <!--       points="50,0 100,100 -25,150" -->
        <!--       style="fill: rgba(0, 150, 227, 0.7)" -->
        <!--     /> -->
        <!--   </svg> -->
        <!-- </div> -->
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import CnTowerChevron from "~/components/CnTowerChevron.vue";
const runtimeConfig = useRuntimeConfig()

const newSignUpMode = runtimeConfig.public.NEW_SIGN_UP

const link = newSignUpMode == "true" ? "/join": "https://docs.google.com/forms/d/e/1FAIpQLSc81gpDidaxKx8Mciv4Dr3oo0DjrdpNlCfcvGjDZp3mAlpW0g/viewform"

</script>

<style>
.template-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.join-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  z-index: 1000;
}

.blue-triangle-separator {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 75%;
  height: 15%;
  transform: skewX(45deg);
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
