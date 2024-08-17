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
          to="login"
          class="front-button"
        >
          Log In
        </NuxtLink>
      </div>
      <div class="page-body-wrapper">
        <div class="page-body prose-slate prose-2xl pb-36">
          <p class="mt-12 max-w-5xl ml-auto mr-auto">
            <span
              class="mb-1 mt-10 text-left text-3xl font-bold max-w-5xl ml-0 mr-auto"
            >
              Our province is broken...
            </span>
            in an Ontario where people are struggling to find housing,
            where the cost of living is skyrocketing, and people have little hope for the future.
            Less than half of eligible voters are turning out to the polls,
            and civic participation is extremely low.
          </p>
          <p class="mt-4 max-w-5xl ml-auto mr-auto">
            <strong>Ontario citizens have been bullied and misled</strong> into not participating in the political process. We let the captured media and education system convince us that politics does not require our participation beyond voting for who they tell us to vote for and we stopped showing up.
          </p>
          <p class="mt-4 max-w-5xl ml-auto mr-auto">
            Ontario citizens are frustrated but they are also disillusioned and disengaged.
            <strong>Our leaders listen to those who can fund or fire them</strong>,
            special interests no longer had any opposition and grew to fill the void we left behind.
          </p>
          <p class="max-w-4xl ml-0 mr-auto text-3xl font-medium text-left">
            The result? A province that no longer works for Ontario citizens, but for corporations and activist ideologues.
          </p>
          <h2
            class="mb-1 mt-10 text-center text-5xl max-w-5xl ml-0 mr-auto"
            style="color:#b42f2b;"
          >
            The world is run by those who show&nbsp;up
          </h2>
          <p class="mt-12 max-w-5xl ml-auto mr-auto">
            Ontario citizens stopped participating. There were special interests who convinced use to stop participating but we let ourselves be convinced. <strong>The broken state of Ontario is our fault.</strong> We stopped showing up.
          </p>
          <p class="mt-4 max-w-5xl ml-auto mr-auto">
            It’s not too late to take our province back. If Ontario citizens can take responsibility for breaking Ontario, then we can also take responsibility for fixing Ontario. <strong>Ontario has levers of power that Ontario citizens can operate. </strong>
          </p><p class="mt-4 max-w-5xl ml-auto mr-auto">
            We have neglected the levers of power of Ontario and they are now being operated by activist ideologues and special interests. These levers of power are the citizens to take back when we show up. 
          </p>
          <h2
            class="mb-1 mt-10 text-center text-5xl max-w-5xl ml-auto mr-auto"
            style="color:#b42f2b;"
          >
            So we show&nbsp;up
          </h2>
          <p class="mt-12 max-w-5xl ml-auto mr-auto">
            It’s not too late to take our province back,
            but it requires us to show up at the right place, the right time, and in the right way.
            By joining Take Back Ontario, you will learn how to <strong>have an outsized impact</strong> by building your own political power,
            identifying the levers of power, and pulling those levers in effective ways.
          </p>
          <h2
            class="mb-1 mt-10 text-center text-5xl max-w-5xl ml-auto mr-auto"
            style="color:#b42f2b;"
          >
            To take back Ontario
          </h2>
          <p class="max-w-4xl text-center text-3xl font-medium mr-auto ml-auto">
            You can make a big difference. You just have to show up.
          </p>
          <div class="text-center relative pb-24">
            I'm ready to show up!
            <nuxt-link
              class="text-center text-base hover:no-underline"
              to="/join"
            >
              <button class="join-button hover:bg-red-800 bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow !relative !block !transform-none !left-auto !bottom-auto mt-6 mr-auto ml-auto text">
                Join
                Take Back Ontario
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="blue-triangle-separator">
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
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import CnTowerChevron from '~/components/CnTowerChevron.vue';
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
  transform: translateX(-50%);
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