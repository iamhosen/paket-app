<template>
  <div class="w-full flex justify-between items-center h-[40px] mb-6 px-4">
    <nuxt-link v-if="add" :to="add">
      <span v-html="plus"></span>
    </nuxt-link>
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <a @click="$router.go(-1)" v-html="back"></a>
  </div>
</template>

<script>
import { back, plus } from '@/assets/icons.js'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    add: {
      type: String,
      default: '',
    },
  },
  data() {
    return { back, plus }
  },
}
</script>