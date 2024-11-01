<script setup lang="ts">
import AboutView from './AboutView.vue'
defineOptions({
  name: 'my-component',
})
</script>

<template>
  <main>
    homeView
    <span>123</span>
    <AboutView></AboutView>
  </main>
</template>
<style lang="scss" scoped>
main {
  width: 200vh;

  span {
    padding: 20px;
  }
}
</style>
