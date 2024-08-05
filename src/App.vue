<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Menu from './components/Menu.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <div class="uk-container uk-animation-fade">
    <Menu />
    <RouterView />
    <Footer />
  </div>
</template>
