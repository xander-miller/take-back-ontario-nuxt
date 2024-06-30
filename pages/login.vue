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
        <h2>Log in to Take Back Ontario</h2>
      </div>
      <authenticator
        initial-state="login"
        :form-fields="authenticatorFormFields"
      >
        <template #sign-up-fields>
          <form class="w-full">
            <FormInput
              v-for="field in formFields"
              :id="field.id"
              :key="field.id"
              v-model="field.value"
              :type="field.type"
              :name="field.name"
              :label="field.label"
              :error="field.error"
              @blur="handleBlur"
            />
          </form>
        </template>
        <SignUp />
      </authenticator>
    </NuxtLayout>
  </div>
</template>

<script setup lang="js">
import { Authenticator, useAuthenticator, SignUp } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { toRefs, watch, ref, computed } from 'vue';
import FormInput from '../components/FormInput.vue';

const { route } = toRefs(useAuthenticator());

const formFields = ref([
  {
    required: true,
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Email',
    error: '',
    errorMessage: 'Email is required',
    value: '',
    blur: false
  },
  {
    required: true,
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Password',
    error: '',
    errorMessage: 'You need a password',
    value: '',
    blur: false
  }
]);

const authenticatorFormFields = computed(() => {
  const returnObject = { signUp: {}};
  formFields.value.forEach(field => {
    returnObject.signUp[field.name] = {
      isRequired: field.required,
    }
  });
  return returnObject;
});


watch(route, async () => {
  console.log('Route changed:', route.value);
  if (route.value === 'authenticated') {
    await navigateTo('/welcome');
  }
}, { immediate: true });

</script>


<style>
body {
  background-color: white;
}
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
.amplify-authenticator__tabs {
  display: none;
}
[type='checkbox'] {
  color: #3494c4;
  border-color: #3494c4 !important;
  --tw-ring-color: #3494c4 !important;
}
[data-amplify-authenticator] {
  --amplify-components-authenticator-router-background-color: rgba(255, 255, 255, 0);
  --amplify-components-authenticator-router-box-shadow: none;
  --amplify-colors-background-primary: rgba(255, 255, 255, 0);
  --amplify-colors-background-secondary: rgba(255, 255, 255, 0);
  --amplify-components-authenticator-router-border-style: none;
  --amplify-components-button-primary-background-color: #3494c4;
}
</style>