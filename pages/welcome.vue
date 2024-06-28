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
        <RidingSelector class="flex-none grow" />
        <div class="flex justify-center">
          <TboButton
            class="max-w-40"
            @click.prevent="authStore.signOutUser"
          >
            Finish Sign Up
          </TboButton>
        </div>
        <a
          style="display:none;"
          @click.prevent="authStore.signOutUser"
        >Sign Out</a>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { useUserStore } from '~/store/user';
import { ref, watch, toRefs } from 'vue';
import { useAuthStore } from '~/store/auth';
import RidingSelector from '~/components/RidingSelector.vue';

const { route } = toRefs(useAuthenticator());
const userStore = useUserStore();
const referralCode = ref('');
const emailPermission = ref('');
const authStore = useAuthStore();

watch(route, async () => {
  console.log('Route changed:', route.value);
  if (route.value === 'authenticated') {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log('user attributes in welcome:', userAttributes);
    } catch (error) {
      console.error(error);
    }
  }
});


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
