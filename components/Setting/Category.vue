<template>
  <nuxt-link
    :to="`/profile/category/${category.id}`"
    class="flex items-center mx-4 py-4 gap-4 border-b-[.5px] border-[#545458] border-opacity-60"
  >
    <!-- for sub category  -->
    <!-- <div v-html="sub"></div> -->
    <div
      class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
      v-html="box"
    ></div>
    <span class="py-2">{{ category.name }}</span>
  </nuxt-link>
</template>

<script>
import { box } from '@/assets/icons.js'
export default {
  data() {
    return {
      box,
    }
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
}
</script>