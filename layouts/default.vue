<template>
  <div>
    <Nuxt />
    <bottom-navigation></bottom-navigation>
  </div>
</template>


<script>
import BottomNavigation from '../components/ui/BottomNavigation.vue'
export default {
  components: { BottomNavigation },
}
</script>