<script setup>
import { onMounted, defineEmits } from 'vue'

const emit = defineEmits(['update:riding-id'])

onMounted(() => {
  const event = new Event('load-client-side-scripts');
  window.dispatchEvent(event);
  window.removeEventListener('load-client-side-scripts', () => {});
});

const updateRidingId = (id) => {
  console.log('Riding ID:', id);
  emit('update:riding-id', id);
};

</script>

<template>
  <div class="w-full mt-5 mb-12">
    <div class="relative right-0">
      <ClientOnly>
        <ul
          class="relative flex flex-wrap p-3 list-none rounded-lg bg-blue-gray-50/60"
          data-tabs="tabs"
          role="list"
        >
          <li class="z-30 flex-auto text-center mb-0">
            <a
              class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit !no-underline"
              data-tab-target=""
              active
              role="tab"
              aria-selected="true"
              aria-controls="select"
            >
              <span class="ml-1">Select your riding</span>
            </a>
          </li>
          <li class="z-30 flex-auto text-center mb-0">
            <a
              class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit !no-underline"
              data-tab-target=""
              role="tab"
              aria-selected="false"
              aria-controls="search"
            >
              <span class="ml-1">Search for your riding</span>
            </a>
          </li>
        </ul>
      </ClientOnly>
    </div>
    <div
      data-tab-content=""
      class="p-5"
    >
      <RidingSearch
        @update:riding-id="updateRidingId"
      />
      <div
        id="search"
        class="hidden opacity-0"
        role="tabpanel"
      >
        <p>Please enter your address in the box and select it from the choices that appear. We will try to find your riding for you.</p>
        <AddressSearch
          @update:riding-id="updateRidingId"
        />
      </div>
    </div>
  </div>
</template>

