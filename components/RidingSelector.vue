<script async setup>
import ridingsData from '~/assets/json/ridings.json'



  var ridingsOptions = ridingsData.map((e) =>  { 
    return { text: e['name'], value: e['external_id']};
  });
  var selectedRiding = ref('');
  const selectedIndex = ref(0);

</script>

<template>
  <Tabs
    v-model="selectedIndex"
    :tabs="[
      'Select Your Riding',
      'Search For Your Riding',
    ]"
  />
  <div v-if="selectedIndex==0">
    <ModelSelect
      v-model="selectedRiding"
      :options="ridingsOptions"
    /> 
  </div>
  <div v-if="selectedIndex==1">
    <AddressSearch />
  </div>
</template>
<style scoped></style>