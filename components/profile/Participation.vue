<script setup>
const participation = ref();	
</script>

<template>
  <p>Do you plan to vote with TBO in the next leadership selection vote?</p>
  <input 
    id="participationYes"
    v-model="participation"
    :value="true"
    type="radio"
  >
  <label for="participationYes"> <b>Yes</b>, put me in contact with other riding members</label>
  <br>
  <input 
    id="participationNo"
    v-model="participation"
    :value="false"
    type="radio"
  >
  <label for="participationNo"> <b>No</b>, do not put me in contact with other riding members</label>
</template>
<style scoped></style>