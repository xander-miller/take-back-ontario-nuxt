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
          <div class="blue-triangle">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon
                points="50,0 100,100 -25,150"
                style="fill: rgba(0, 150, 227, 0.7)"
              />
            </svg>
          </div>
          <img
            src="/img/tbo-hero.png"
            class="tbo-hero"
          >
          <div class="simple-nav">
            <NuxtLink
              to="login"
              class="front-button hidden"
            >
              Log In
            </NuxtLink>
          </div>
          <nuxt-link :to="link">
            <button
              class="join-button hover:bg-red-800 bg-red-700 mt-36 text-white font-bold py-2 px-4 rounded-full shadow"
            >
              Join Take Back Ontario
            </button>
          </nuxt-link>
        </div>
      </div>
      <div />
      <div class="page-body-wrapper">
        <div class="page-body prose-slate prose-base md:prose-2xl pb-36">
          <p class="mt-12 max-w-5xl ml-auto mr-auto">
            <span
              class="mb-1 mt-10 text-left text-xl md:text-3xl font-bold max-w-5xl ml-0 mr-auto"
            >
              Our province is broken...
            </span>
            the pandemic exposed the rot in public health and education. Then
            came a cost of living crisis and a housing shortage. Ontario’s
            children are pessimistic about their futures, and their parents’
            trust in public institutions has plummeted. Apathy is a natural
            response, but one we cannot afford. If we don’t show up for our
            province, things are only going to get worse.
          </p>
          <h2
            class="mb-1 mt-10 text-center text-2xl md:text-5xl max-w-5xl ml-auto mr-auto"
            style="color: #b42f2b"
          >
            The world is run by those who show&nbsp;up
          </h2>
          <p class="mt-12 max-w-5xl ml-auto mr-auto">
            This didn’t happen by accident. Corrupt leadership, alongside our
            media and education systems have convinced us that our political
            power starts and ends with voting for pre-selected candidates once
            every few years.
            <strong>The broken state of Ontario is our fault.</strong> We
            stopped showing up.
          </p>
          <p class="mt-4 max-w-5xl ml-auto mr-auto">
            It’s not too late to take our province back. Ontario citizens broke
            Ontario by failing in our civic duty to engage in the operation of
            Ontario. But we can fix Ontario by showing up and taking
            responsibility for our province.
            <strong>
              Ontario has levers of power that Ontario citizens can operate.
            </strong>
          </p>
          <p class="mt-4 max-w-5xl ml-auto mr-auto">
            We have neglected the levers of power of Ontario and they are now
            being operated by activist ideologues and special interests. These
            levers of power are the citizens' to take back when we show up.
          </p>
          <h2
            class="mb-1 mt-10 text-center text-2xl md:text-5xl max-w-5xl ml-auto mr-auto"
            style="color: #b42f2b"
          >
            Therefore we show&nbsp;up
          </h2>
          <p class="mt-12 max-w-5xl ml-auto mr-auto">
            It is not too late to reverse this trend. We need to stand up to the
            bullies and participate and learn how to engage in civics and
            politics of Ontario. We need Ontario citizens to become political
            organizers and civic leaders. Where we see problems we need to lean
            in and take back instead of turning away. This requires us to
            develop our political and civic skills so we show up at the right
            place, the right time, and in the right way.
          </p>
          <h2
            class="mb-1 mt-10 text-center text-2xl md:text-5xl max-w-5xl ml-auto mr-auto"
            style="color: #b42f2b"
          >
            To take back Ontario
          </h2>
          <p class="mt-12 max-w-5xl ml-auto mr-auto z-10">
            By showing up you can make an impact that far exceeds your single
            vote at election time. Take Back Ontario is a network of citizens
            who educate and encourage one another to show up, identify the
            levers of power and to have an outside impact by taking them back
            with integrity and responsibility. Want things to change? The world
            is run by those who show up.
          </p>
          <div class="max-w-4xl text-center text-2xl md:text-3xl font-medium mr-auto ml-auto pb-24 z-10">
            I'm ready to show up!
            <nuxt-link
              class="text-center text-base hover:no-underline"
              :to="link"
            >
              <button
                class="join-button hover:bg-red-800 bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow !relative !block !transform-none !left-auto !bottom-auto mt-6 mr-auto ml-auto text"
              >
                Join Take Back Ontario
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
              style="fill: rgba(0, 150, 227, 0.7)"
            />
          </svg>
        </div>
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
