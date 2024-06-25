<script setup>
	import debounce from 'lodash.debounce';
	import axios from 'axios'; 
  const runtimeConfig = useRuntimeConfig();
  console.log('runtimeConfig: ', runtimeConfig);
	const addressResults = ref([]);
	const search = ref('');	
  const selectedAddress = ref();
	const ridingResult = ref();
	// const locationUri = runtimeConfig.public.LOCATION_API_URI;
	// const locationApiKey = runtimeConfig.public.LOCATION_API_KEY;
	const locationUri = 'https://places.geo.us-east-1.amazonaws.com/places/v0/indexes/TboPlaceIndexDev';
	const locationApiKey = 'v1.public.eyJqdGkiOiJmMzNlZWZiZC00ZDU5LTQwYzAtYjBjMC00YWRkM2U1Y2NhYzYifSULF22xK27rtGIVfmNmtXdcLYZaszl80iGeWjh-GxBLNXbIMFgx3qjCiwrwAGGFcUlTy7KtC7teqv6KsBcDVdSjwhtOPim3YqjdZW-HQqTL-DzLCeVtIChLphtb5k1xk88h5Ag50YAxx_-BZSC4CZZu_iif_kIf0R8eC9slRTlAOw63Xd1Z7FBPg-Ac0IiFmKBF4k6Tj4AmT1lsF2_rk-fykKbdnwh-cREWO0djmeNeTXHSeqv87qv3cSD4eK5bqLnngm5vXH6P1b-UZgEDOXOO0DAwMfFSiNYOO7ciOGRbMMiI-GYMpfYILDl10bXuMYO-mmpyUyBvt1MMDRhfVWY.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx';

	watch(search, debounce(()  =>  {
		updateAddressResults();
	}, 500));
	watch(selectedAddress, searchForAddressRiding);

	async function updateAddressResults(){
		console.log('search watch: ', search);
		selectedAddress.value  = null;
		if(search.value === ''){
			addressResults.value.length = 0;
		} else {
			const newAddressResults = await addressAutoComplete(search.value);
			addressResults.value.length = 0;
			addressResults.value.push(...newAddressResults);
		}
		console.log('addr res', addressResults.value, addressResults.length)
	}

	async function searchForAddressRiding(){
		getPlace(selectedAddress.placeId);
	}

	async function getPlace(placeId){

    var placeResult = await axios.get(`${locationUri}/places/${placeId}?key=${locationApiKey}`,
    );
		console.log('placeResult',placeResult);

	}

	async function addressAutoComplete(text) {
		console.log('addressAutoComplete: ', text);
    // TODO create env var for this
    var suggestions = await axios.post(`${locationUri}/search/suggestions?key=${locationApiKey}`,
    {
			"Text": text,
			"MaxResults": 5,
			"FilterCountries": ["CAN"],
			"FilterCategories": ["AddressType"],
			"BiasPosition": [ -79.93024131838833, 46.02582898725067], // Set to a location near Huntsville	
		});
     console.log('suggestions: ', suggestions);
    var results = suggestions.data.Results.map((e) => { return {label: e.Text, placeId: e.PlaceId } });
		console.log('results: ', results);
		return results;
  }
</script>

<template>
  <input
    v-model="search"
    type="text"
  >
  <div
    v-if="addressResults.length > 0"
  >
    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
      Select your address:
    </h3>
    <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white list-none">
      <li
        v-for="address in addressResults"
        :key="address.label"
        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
        <div class="flex items-center ps-3">
          <input
            :id="address.placeId"
            v-model="selectedAddress"
            type="radio"
            :value="address"
            name="list-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          >
          <label
            :for="address.placeId"
            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          > {{ address.label }} </label>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
</style>