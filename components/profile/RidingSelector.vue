<script setup>
import { ListBulletIcon } from '@heroicons/vue/16/solid';
import { MagnifyingGlassIcon, MapIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import { vModelSelect } from 'vue';
import "vue-search-select/dist/VueSearchSelect.css"
import ridingsData from '~/assets/json/ridings.json'

  var tabs=[
    { name: 'Select your Riding', id: 'select', icon: MagnifyingGlassIcon },
    { name:'Search for your riding', id: 'search', icon: MapIcon },
  ];
  var ridingsOptions = ridingsData.map((e) =>  { 
    return { text: e['name'], id: e['external_id']};
  });
  const selectedIndex = ref(0);
  var searchTerm = ref('');
</script>

<template>
  <Card class="grow">
    <Tabs
      v-model="selectedIndex"
      :tabs="['Select Your Riding', 'Search For Your Riding']"
    />
    <div v-if="selectedIndex==0">
      <ModelSelect
        :options="ridingsOptions"
      /> 
    </div>
    <div v-if="selectedIndex==1">
      <Search
        v-model:searchTerm="searchTerm"
        input-place-holder="Search by address"
        @on-submit="console.log(`submitted: ${searchTerm}`)"
      />
    </div>
  </Card>
</template>
<style scoped></style>