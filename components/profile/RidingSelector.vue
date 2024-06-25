<script async setup>
import { ListBulletIcon } from '@heroicons/vue/16/solid';
import { MagnifyingGlassIcon, MapIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import { vModelSelect } from 'vue';
import { Geo } from "@aws-amplify/geo";
import "vue-search-select/dist/VueSearchSelect.css"
import ridingsData from '~/assets/json/ridings.json'
import axios from 'axios'; 



  var ridingsOptions = ridingsData.map((e) =>  { 
    return { text: e['name'], value: e['external_id']};
  });
  var selectedRiding = ref('');
  const selectedIndex = ref(0);
  var searchTerm = ref('');
  var searchResults =  ref([]);

  async function searchAddress(text) {
    // TODO create env var for this
    var suggestions = await axios.post('https://places.geo.us-east-1.amazonaws.com/places/v0/indexes/TboPlaceIndexDev/search/suggestions?key=v1.public.eyJqdGkiOiJmMzNlZWZiZC00ZDU5LTQwYzAtYjBjMC00YWRkM2U1Y2NhYzYifSULF22xK27rtGIVfmNmtXdcLYZaszl80iGeWjh-GxBLNXbIMFgx3qjCiwrwAGGFcUlTy7KtC7teqv6KsBcDVdSjwhtOPim3YqjdZW-HQqTL-DzLCeVtIChLphtb5k1xk88h5Ag50YAxx_-BZSC4CZZu_iif_kIf0R8eC9slRTlAOw63Xd1Z7FBPg-Ac0IiFmKBF4k6Tj4AmT1lsF2_rk-fykKbdnwh-cREWO0djmeNeTXHSeqv87qv3cSD4eK5bqLnngm5vXH6P1b-UZgEDOXOO0DAwMfFSiNYOO7ciOGRbMMiI-GYMpfYILDl10bXuMYO-mmpyUyBvt1MMDRhfVWY.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx',
    {
    "Text": text,
    "MaxResults": 5,
    "FilterCountries": ["CAN"],
    "FilterCategories": ["AddressType"],
    // "BiasPosition": [ -79.93024131838833, 46.02582898725067], // Set to a location near Huntsville
}
    );
    console.log('suggestions: ', suggestions);
    var results =   suggestions.data.Results.map((e) => { return {label: e.Text, placeId: e.PlaceId } });
    console.log('geocode: ', geocode);
    searchResults.value.splice(0, searchResults.value.length, ...results);
    console.log('GEOCODE: ', searchResults.value);
    var selectedResult = ref();
    
  }
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