<template>
  <NuxtLayout name="bare">
    <div v-if="authStore.isAuthenticated">
      <div
        id="cy"
        ref="refcy"
        style="width: 100%; height: 80vh; position: relative; display: block; box-sizing: border-box;"
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
import { watch, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola';

cytoscape.use(cola);

const authStore = useAuthStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const cytoScapeData = ref({});
const refcy = ref(null);

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

onMounted(() => {
  console.log('mounted');
  watch(cytoScapeData, (newData) => {
    console.log('cytoScapeData changed:', newData);

    if (newData.nodes && newData.edges && refcy.value) {
      console.log('refcy:', refcy.value);
      const cy = cytoscape({
        container: refcy.value,
        elements: {
          nodes: newData.nodes,
          edges: newData.edges
        },
        style: [
          {
            selector: 'node',
            style: {
              'width': '60px',
              'height': '60px',
              'background-color': '#fff',
              'outline-color': '#0096e3',
              'outline-width': '5px',
              'outline-opacity': 1,
              'label': 'data(name)',
              'font-size': '12px',
              'text-halign': 'center',
              'text-background-color': '#fff',
              'text-background-opacity': 0.5,
              'color': '#b42f2b',
              'overlay-padding': '4px',
            }
          },
          {
            selector: 'edge',
            style: {
              'width': '5px',
              'line-color': '#0096e3',
              'target-arrow-color': '#0096e3',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'arrow-scale': 1.5,
              'ghost': 'yes',
              'ghost-offset-x': '4px',
              'ghost-offset-y': '4px',
              'ghost-opacity': 0.1,
            }
          }
        ],
          layout: {
            animate: true, // whether to show the layout as it's running
            refresh: 6, // number of ticks per frame; higher is faster but more jerky
            maxSimulationTime: 4000, // max length in ms to run the layout
            ungrabifyWhileSimulating: true, // so you can't drag nodes during layout
            fit: true, // on every layout reposition of nodes, fit the viewport
            padding: 30, // padding around the simulation
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node

            // layout event callbacks
            ready: function(){}, // on layoutready
            stop: function(){}, // on layoutstop

            // positioning options
            randomize: false, // use random node positions at beginning of layout
            avoidOverlap: true, // if true, prevents overlap of node bounding boxes
            handleDisconnected: true, // if true, avoids disconnected components from overlapping
            convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
            nodeSpacing: function( node ){ return 10; }, // extra spacing around nodes
            flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
            alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
            gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
            centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)

            // different methods of specifying edge length
            // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
            edgeLength: undefined, // sets edge length directly in simulation
            edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
            edgeJaccardLength: undefined, // jaccard edge length in simulation

            // iterations of cola algorithm; uses default values on undefined
            unconstrIter: undefined, // unconstrained initial layout iterations
            userConstIter: undefined, // initial layout iterations with user-specified constraints
            allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
          }
        });
      }
    });
});




</script>

<style scoped></style>