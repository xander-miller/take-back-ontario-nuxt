<template>
  <TboBackground class="w-full">
    <h1>CODES PAGE</h1>

    
    <TboButton
      @click="generateNewReferralCode"
    >
      Generate a new referral code
    </TboButton>

    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <li v-for="[name, code] in codes" class="pb-3 sm:pb-4">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
             <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {{name != null ? name : "Referral Code"}}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {{code}}
                </p>
             </div>
             <div class="flex-shrink-0">
                <CopyButton info="Copy Link" :value="code"/>
             </div>
          </div>
       </li>
    </ul>
  </TboBackground>

</template>

<script setup>
  var codes = ref([])
  function generateNewReferralCode() {
    // TODO:get a referral code that is unique

    codes.value.push([null, makeRandomCode(8)]);
  }
  function makeRandomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

</script>
<style scoped>

</style>
