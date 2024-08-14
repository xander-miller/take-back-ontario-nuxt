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
        <h2>Sign up for Take Back Ontario</h2>
        <p class="prose-slate text-center">
          We never give or sell your information to anyone outside of TBO.<br>
          Membership is free.
        </p>
      </div>
      <authenticator
        initial-state="signUp"
        :services="services"
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
            <div class="text-sm italic mb-6">
              A referral code is required. If you don&apos;t have one,<br>
              please <a href="mailto:xander.miller@takebackontario.ca">contact us</a> to set up a face-to-face conversation.
            </div>
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-100%" />
              <label class="block text-gray-500 font-bold">
                <input
                  class="mr-2 leading-tight appearance-none"
                  type="checkbox"
                  name="custom:riding_contact"
                  checked
                >
                <span class="text-sm w-full font-bold">
                  Other members in my riding may see my name and contact information (recommended)
                </span>
              </label>
            </div>
          </form>
          <p class="text-sm italic">
            By creating an account, you agree that Take Back Ontario may contact you for meeting and event announcements, and for the purposes of managing your account.
          </p>
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

const amplifyFormValidationErrors = ref({});

const formFields = ref([
  {
    required: true,
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Name',
    error: '',
    errorMessage: 'Name is required',
    value: '',
    blur: false
  },
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
    id: 'phone-number',
    type: 'tel',
    name: 'phone_number',
    label: 'Phone Number',
    error: '',
    errorMessage: 'A valid phone number is required',
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
  },
  {
    required: true,
    id: 'confirm-password',
    type: 'password',
    name: 'confirm_password',
    label: 'Confirm Password',
    error: '',
    errorMessage: 'Passwords must match',
    value: '',
    blur: false
  },
  {
    required: true,
    id: 'referral-code',
    type: 'text',
    name: 'custom:referral_code',
    label: 'Referral Code',
    error: '',
    errorMessage: 'Referral code is required',
    value: '',
    blur: false
  },
  {
    required: true,
    id: 'riding-contact',
    type: 'checkbox',
    name: 'custom:riding_contact',
    label: 'I agree that others in my riding can contact me (recommended).',
    error: '',
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

const handleBlur = (fieldName) => {
  const field = formFields.value.find((f) => f.name === fieldName);
  field.blur = true;
  validateForm();
};

const validateForm = () => {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(?!555)\d{3}-?\d{3}-?\d{4}$/;
  

  // Validate each form field
  formFields.value.forEach(field => {
    if (field.required && !field.value) {
      errors[field.name] = field.errorMessage;
    } else if (field.name === 'email' && !emailPattern.test(field.value)) {
      errors.email = 'Email must be a valid email address';
    } else if (field.name === 'phone' && !phonePattern.test(field.value)) {
      errors.phone = 'Phone number must be a valid 10-digit number';
    } else if (field.name === 'password' && field.value.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (field.name === 'confirm_password' && field.value !== formFields.value.find(f => f.name === 'password').value) {
      errors.confirm_password = 'Passwords must match';
    }
    field.error = field.blur ? errors[field.name] || '' : '';
  });

  amplifyFormValidationErrors.value = errors;
};

const services = ref({
  async validateCustomSignUp(formData) {
    if (!formData.country_code) {
        formData.country_code = "+1"
    }
    validateForm();
    return amplifyFormValidationErrors.value;
  }
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