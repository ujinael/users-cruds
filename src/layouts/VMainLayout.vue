<template>
<div class="layout">
<VLayoutHeader/>
<main class="layout__main">
    <RouterView/>
</main>
</div>
</template>
<script setup lang="ts">
import VLayoutHeader from './components/VLayoutHeader.vue';
</script>
<style scoped lang="scss">
.layout{
  display: grid;
  grid-template-rows: min-content 1fr;
height: 100vh;

}
.layout__main{
  height: 100%;
  overflow: hidden;
}
@media screen and (min-width:960px) {
  .layout__main{
width:var(--main_width);
margin: auto;
}  
}
</style>