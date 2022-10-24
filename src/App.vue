
<template>
  <component :is="layout">
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const defaultLayout = 'layout-not-connected'
const layout = computed(()=>{       
return route.meta.layout || defaultLayout
})

</script>
<style lang="scss">
@import "@/assets/main.scss"; 
@import "@/assets/variables.scss";

</style>