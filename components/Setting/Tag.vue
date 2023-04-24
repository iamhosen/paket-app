<template>
  <nuxt-link
    :to="`/profile/tag/${tag.id}`"
    class="flex items-center mx-4 py-4 gap-4 border-b-[.5px] border-[#545458] border-opacity-60"
  >
    <div
      class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
      v-html="hash"
    ></div>
    <span class="py-2">{{ tag.title }}</span>
  </nuxt-link>
</template>

<script>
import { hash } from '@/assets/icons.js'
export default {
  data() {
    return {
      hash,
    }
  },

  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
}
</script>