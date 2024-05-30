<script setup>
import { ListBulletIcon } from '@heroicons/vue/16/solid';
import { MagnifyingGlassIcon, MapIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import { vModelSelect } from 'vue';
import { Geo } from "@aws-amplify/geo";
import "vue-search-select/dist/VueSearchSelect.css"
import ridingsData from '~/assets/json/ridings.json'

  var ridingsOptions = ridingsData.map((e) =>  { 
    return { text: e['name'], value: e['external_id']};
  });
  var selectedRiding = ref('');
  const selectedIndex = ref(0);
  var searchTerm = ref('');

  async function searchAddress() {
    // TODO: Fix the failure here, then we can add back our 2nd tab
    var result = await Geo.searchByText();
  }
</script>

<template>
  <Card class="grow">
    <p>What riding are you located in?</p>
    <Tabs
      v-model="selectedIndex"
      :tabs="[
        'Select Your Riding',
        // 'Search For Your Riding',
      ]"
    />
    <div v-if="selectedIndex==0">
      <ModelSelect
        v-model="selectedRiding"
        :options="ridingsOptions"
      /> 
    </div>
    <div v-if="selectedIndex==1">
      <Search
        v-model:searchTerm="searchTerm"
        input-place-holder="Search by address"
        @submit="searchAddress()"
      />
    </div>
  </Card>
</template>
<style scoped></style>