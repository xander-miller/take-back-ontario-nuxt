<template>
  <NuxtLayout>
    <div>
      <fwb-dropdown class="dropdown-button" text="Click me" placement="top">
        <fwb-list-group>
          <fwb-list-group-item>Item #1</fwb-list-group-item>
          <fwb-list-group-item>Item #2</fwb-list-group-item>
          <fwb-list-group-item>Item #3</fwb-list-group-item>
        </fwb-list-group>
      </fwb-dropdown>
      <fwb-input placeholder="enter your first name" label="First name" />
    </div>
  </NuxtLayout>
</template>
<script setup>
// https://flowbite-vue.com/pages/getting-started
import { FwbDropdown, FwbListGroup, FwbListGroupItem, FwbInput } from 'flowbite-vue'
</script>

<style>
/* .dropdown-button button {
  background-color: rgb(181 53 44 / var(--tw-bg-opacity));
}
.dropdown-button button:hover {
  background-color: red;
} */
</style>