<template>
  <nuxt-link
    :to="to"
    class="flex items-center mx-4 py-3 gap-4 border-b-[.5px] border-[#545458] border-opacity-60"
  >
    <div
      v-if="icon"
      class="w-8 h-8 flex justify-center items-center rounded-lg"
      :class="`bg-[${color}]`"
      v-html="icon"
    ></div>
    <span class="py-2">{{ title }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'بدون عنوان',
    },
    color: {
      type: String,
      required: false,
      default: '#5E5CE6',
    },
    to: {
      type: String,
      required: true,
      default: '',
    },
    icon: {
      required: false,
    },
  },
}
</script>