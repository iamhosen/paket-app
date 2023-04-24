<template>
  <header class="scroll ltr border-b-[1px] border-[#3C3C43] text-[#3C3C43]">
    <nav class="vertical-align-middle w-full">
      <span
        v-for="(month, index) in months"
        :key="index"
        class="nav-item w-4/12 text-center inline-block pb-2"
        :class="{
          'border-b-2 border-primary-paket text-primary-paket font-bold':
            selectedMonth === index,
        }"
        @click="$emit('monthChanged', index)"
      >
        {{ month.title }}
      </span>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    months: {
      type: Array,
      required: true,
    },
    selectedMonth: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang='scss' scoped>
.scroll {
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>