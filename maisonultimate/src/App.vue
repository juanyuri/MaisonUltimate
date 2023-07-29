<template>
  <div class="app">
    <NavigationBar />
  </div>
</template>



<script setup>
import NavigationBar from '@/components/NavigationBar.vue'

</script>


<style>
* {
  margin: 0;
  padding: 0;
}

:root {
    --Navigation-Bar-bg-color: #177D6B;
    --Navigation-Bar-item-bg-color: #0D6354;
    --Navigation-Bar-item-height: 60px;
    --Navigation-Bar-item-border-radius: 8px;
}
</style>
