<script setup>
var emailPermission = ref();
  // TODO: write the result to NEO4j	
</script>

<template>
  <Card>
    <p>
      Do you give us permission to put you in contact with other TBO members in your area? This will be done via email blind carbon copy so that your email address is not exposed until you reply.
    </p>
    <br>
    <input 
      id="emailPermissionYes"
      v-model="emailPermission"
      :value="true"
      type="radio"
    >
    <label for="emailPermission"> <b>Yes</b>, let other riding members reach out to me.</label>
    <br>
    <input 
      id="emailPermissionNo"
      v-model="emailPermission"
      :value="false"
      type="radio"
    >
    <label for="emailPermission"> <b>No</b>, do not let other riding members get in touch with me.</label>
  </Card>
</template>
<style scoped></style>