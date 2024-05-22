<script setup>
var emailPermission = ref();
  // TODO: write the result to NEO4j	
</script>

<template>
  <p>
    Would you like to be connected with other TBO members in your area?
  </p>
  <br>
  <input 
    id="emailPermissionYes"
    v-model="emailPermission"
    :value="true"
    type="radio"
  >
  <label for="emailPermission"> <b>Yes</b>, put me in contact with other riding members</label>
  <br>
  <input 
    id="emailPermissionNo"
    v-model="emailPermission"
    :value="false"
    type="radio"
  >
  <label for="emailPermission"> <b>No</b>, do not put me in contact with other riding members</label>
</template>
<style scoped></style>