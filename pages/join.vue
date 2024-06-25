<template>
  <div class="page-container">
    <NuxtLayout name="bare">
      <div class="signup-header">
        <img
          src="/img/tbo-trillium.png"
          class="tbo-trillium"
        >
        <h2>Sign up for Take Back Ontario</h2>
        <p class="prose-slate text-center">
          We never give or sell your information to anyone.
          Being a member is free. A referral code is mandatory. If you don&apos;t have one, please email <a href="mailto:xander.miller@takebackontario.ca">Xander Miller</a> to set up a face-to-face conversation.
        </p>
      </div>
      <authenticator
        initial-state="signUp"
        :services="services"
      >
        <template #sign-up-fields>
          <form class="w-full">
            <div
              class="md:flex md:items-center mb-6"
            >
              <div class="md:w-100%">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Name
                </label>
              </div>
              <div class="grow">
                <input
                  id="inline-full-name"
                  name="name"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full"
                  type="text"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-100%">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Email
                </label>
              </div>
              <div class="grow">
                <input
                  id="inline-full-name"
                  name="email"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full"
                  type="text"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-100%">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Password
                </label>
              </div>
              <div class="grow">
                <input
                  id="inline-full-name"
                  name="password"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full"
                  type="password"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-100%">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Confirm Password
                </label>
              </div>
              <div class="grow">
                <input
                  id="inline-full-name"
                  name="confirm_password"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full"
                  type="password"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-100%">
                <label
                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Referral Code
                </label>
              </div>
              <div class="grow">
                <input
                  id="inline-full-name"
                  name="custom:referral_code"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-full"
                  type="text"
                >
              </div>
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-100%" />
              <label class="block text-gray-500 font-bold">
                <input
                  class="mr-2 leading-tight"
                  type="checkbox"
                  name="custom:riding_contact"
                >
                <span class="text-sm w-full">
                  Other members in my riding may see my name and contact information (recommended)
                </span>
              </label>
            </div>
          </form>
        </template>
        <signUp />
        <div>
          {{ validationErrors.value }}
        </div>
      </authenticator>
    </NuxtLayout>
  </div>
</template>

<script setup lang="js">
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import {
  Authenticator,
  AuthenticatorSignUpFormFields,
  // Vue Composable to get access to validation errors
  useAuthenticator,
  // Amplify UI Primitives to simplify the custom fields
  AmplifyCheckBox,
} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import { toRefs, watch } from 'vue';

const { validationErrors } = toRefs(useAuthenticator());

const services = {
  async validateCustomSignUp(formData) {
    if (!formData.name) {
      return {
        name: 'Name field is required',
      };
    }
  },
};

watch(validationErrors, (newErrors) => {
  console.log('Validation Errors:', newErrors);
});

const formFields = {
  signUp: {
    name: {
      required: true,
      placeholder: 'Enter your name',
      label: 'Name',
    },
    'phone_number': {
      required: true,
      placeholder: 'Enter your phone number',
      label: 'Phone Number',
      type: 'phone_number',
    },
    'custom:referral_code': {
			label: 'Referral Code',
			placeholder: 'Enter a referral code',
			isRequired: true,
		},
    'custom:riding_contact': {
      label: 'Can we contact you?',
      type: 'AmplifyCheckBox',
    },
    'phone_number': {
      required: true,
      placeholder: 'Enter your phone number',
      label: 'Phone Number',
      type: 'phone_number',
    },
  },
};
</script>

<style>
body {
  background-color: white;
}
.page-container {
  padding-top: 80px;
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
[data-amplify-authenticator] {
  --amplify-components-authenticator-router-background-color: rgba(255, 255, 255, 0);
  --amplify-components-authenticator-router-box-shadow: none;
  --amplify-colors-background-primary: rgba(255, 255, 255, 0);
  --amplify-colors-background-secondary: rgba(255, 255, 255, 0);
  --amplify-components-authenticator-router-border-style: none;
}
</style>