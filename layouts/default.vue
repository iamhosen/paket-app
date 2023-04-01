<template>
  <div class="pt-4">
    <nuxt class="mb-24" />
    <bottom-navigation></bottom-navigation>
  </div>
</template>


<script>
import BottomNavigation from '../components/ui/BottomNavigation.vue'
export default {
  name: 'default',
  components: { BottomNavigation },
}
</script>

