<template>
  <NuxtLayout>
    <div v-if="authStore.authStatus === 'authenticated'">
      <div
        id="cy"
        ref="cy"
        style="width: 400px; height: 400px;"
      />
    </div>
    <div v-else>
      Loading...
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import { useUserStore } from '~/store/user';
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import cytoscape from 'cytoscape'

const authStore = useAuthStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const cytoScapeData = ref({});

definePageMeta({
  middleware: 'auth'
});

// Watch the authStatus ref
watch(user, async (newUser) => {
  console.log('User Changed', newUser.jwt);
  if (newUser.jwt) {
    console.log('User is now authenticated');
    let networkGraphData;
    try {
      networkGraphData = await userStore.fetchNetworkFromNeo4j(newUser.jwt);
    } catch (error) {
      console.error(error);
    }
    console.log('networkGraphData:', networkGraphData);
    cytoScapeData.value = networkGraphData;
  }
}, { immediate: true, deep: true });

watch(cytoScapeData, (newData) => {
  console.log('cytoScapeData changed:', newData);

  if (newData.nodes && newData.edges) {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: {
        nodes: newData.nodes,
        edges: newData.edges
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(id)'  // Use 'data(id)' if 'label' is not available
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      layout: {
        name: 'grid'
      }
    });

    // Optional: Perform any additional setup or updates to the Cytoscape instance
  }
});


</script>

<style scoped></style>