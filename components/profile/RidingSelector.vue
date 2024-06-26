<script async setup>
import { ListBulletIcon } from '@heroicons/vue/16/solid';
import { MagnifyingGlassIcon, MapIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import "vue-search-select/dist/VueSearchSelect.css"
import ridingsData from '~/assets/json/ridings.json'



  var ridingsOptions = ridingsData.map((e) =>  { 
    return { text: e['name'], value: e['external_id']};
  });
  var selectedRiding = ref('');
  const selectedIndex = ref(0);

</script>

<template>
  <Card class="grow">
    <p>What riding are you located in?</p>
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
  </Card>
</template>
<style scoped></style>