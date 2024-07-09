<script setup>
import debounce from 'lodash.debounce';
import { ref, watch } from 'vue';
import FormInput from './FormInput.vue';

const addressResults = ref([]);
const search = ref('');
const selectedAddress = ref();
const ridingResult = ref();

// Watch search input and debounce the updateAddressResults function
watch(search, debounce(() => {
  updateAddressResults();
}, 500));

// Watch selectedAddress and fetch place details when changed
watch(selectedAddress, searchForAddressRiding);

// Function to update address results
async function updateAddressResults(){
  console.log('search watch: ', search.value);
  selectedAddress.value = null;
  if(search.value === ''){
    addressResults.value = [];
  } else {
    const newAddressResults = await addressAutoComplete(search.value);
    addressResults.value = newAddressResults;
  }
  console.log('addr res', addressResults.value, addressResults.value.length);
}

// Function to fetch place details for the selected address
async function searchForAddressRiding(){
  if (selectedAddress.value) {
    await getPlace(selectedAddress.value.placeId);
    addressResults.value = addressResults.value.filter(e => e.placeId == selectedAddress.value.placeId);
  }
}

// Function to fetch place details from Netlify function
async function getPlace(placeId) {
  try {
    // Fetch the place details from Netlify function
    const response = await fetch('/.netlify/functions/geoCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ placeId })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('placeResult', data);
    const point = data.Place.Geometry.Point;

    // Fetch representatives from Open API using lat/long
    const representativesResponse = await fetch(`https://represent.opennorth.ca/representatives/?point=${point[1]},${point[0]}`);

    if (!representativesResponse.ok) {
      throw new Error(`HTTP error! status: ${representativesResponse.status}`);
    }

    // Read the response body as JSON
    const representatives = await representativesResponse.json();
    console.log('representatives', representatives);
    const ridingInfo = representatives.objects.filter(e => e.representative_set_name === 'Legislative Assembly of Ontario')[0];
    console.log(ridingInfo);
    // Update the state with the representatives data if needed
    ridingResult.value = {
      riding: ridingInfo.district_name,
      mpp: ridingInfo.name,
      party: ridingInfo.party_name,
    };
  } catch (error) {
    console.error('Error fetching place details or representatives:', error);
  }
}

// Function to fetch address suggestions from Netlify function
async function addressAutoComplete(text) {
  try {
    const response = await fetch('/.netlify/functions/findAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Text: text })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('suggestions: ', data);
    if (!data.Results || data.Results.length === 0) {
      console.log('no results')
      return [];
    }
    return data.Results.map((e) => ({ label: e.Text, placeId: e.PlaceId }));
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    return [];
  }
}
</script>

<template>
  <FormInput
    id="searchbox"
    v-model="search"
    class="mt-4"
    type="text"
    name="search"
    label="Enter your address"
  />
  <div
    v-if="addressResults.length > 0"
  >
    <h3 class="mb-4 font-semibold text-gray-500">
      Select your address from the list
    </h3>
    <ul class="w-full text-sm mb-4 font-medium text-gray-500 rounded-lg bg-gray-200 list-none">
      <li
        v-for="address in addressResults"
        :key="address.placeId"
        class="w-full border-gray-500 rounded-t-lg font-semibold"
      >
        <div class="flex items-center ps-3">
          <input
            :id="address.placeId"
            v-model="selectedAddress"
            type="radio"
            :value="address"
            name="list-radio"
            class="w-4 h-4 text-tboblue bg-gray-100 focus:ring-tboblue focus:ring-2"
          >
          <label
            :for="address.placeId"
            class="w-full py-3 ms-2 text-sm font-medium text-gray-700"
          > {{ address.label }} </label>
        </div>
      </li>
    </ul>
    <div v-if="ridingResult?.riding">
      <h3 class="mb-4 mt-4 font-semibold text-gray-500">
        We found your riding!
      </h3>
      <p class="text-gray-700">
        Riding: <strong>{{ ridingResult.riding }}</strong>
      </p>
      <p class="text-gray-700">
        MPP: {{ ridingResult.mpp }}, {{ ridingResult.party }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
