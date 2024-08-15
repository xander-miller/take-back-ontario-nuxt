<template>
  <div 
    class="page-container"
    style="padding-top: 60px;"
  >
    <NuxtLayout name="bare">
      <div class="signup-header">
        <img
          src="/img/tbo-trillium.png"
          class="tbo-trillium"
        >
        <h2>Welcome to Take Back Ontario!</h2>
        <p class="prose-slate text-center">
          Let&rsquo;s get you set up.
          Use the tools below to select or find your electoral district.
        </p>
      </div>
      <div class="mainbody mb-12 flex flex-col content-center justify-center">
        <RidingSelector
          class="flex-none grow"
          @update:riding-id="updateRidingId($event)"
        />
        <div class="flex justify-center">
          <TboButton
            class="max-w-40"
            :disabled="!ridingId"
            @click.prevent="finishSignUp"
          >
            Finish Sign Up
          </TboButton>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';
import RidingSelector from '~/components/RidingSelector.vue';

const userStore = useUserStore();
const ridingId = ref(null);

const updateRidingId = (id) => {
  console.log('updated riding id', id);
  ridingId.value = id;
};

definePageMeta({
  middleware: 'auth'
});

const finishSignUp = async () => {
  console.log('Finishing sign up');
  await userStore.setRiding(ridingId.value);
  await navigateTo('/dashboard');
  return;
};
</script>

<style>
body {
  background-color: white;
}

.signup-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.tbo-trillium {
  width: 100px;
  height: 96.7px;

}
</style>
<style scoped>
.mainbody {
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
