<template>
  <div class="tab-head mb-5 mx-4">
    <ul
      class="flex flex-row rounded-lg justify-between bg-[#767680] p-1 bg-opacity-25 gap-1 cursor-pointer"
    >
      <li
        v-for="tab in tabs"
        :key="tab.id"
        @click="changeTab(tab)"
        :class="
          activeTabId == tab.id
            ? `bg-${tab.color ? `[${tab.color}]` : 'primary-paket'} rounded-lg`
            : ''
        "
        class="w-1/2 text-center py-1 transition-all"
      >
        {{ tab.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabId: null,
    }
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    value: {
      type: Number,
      default: null,
    },
  },
  computed: {
    activeTab() {
      return this.tabs.find((tab) => tab.id === this.activeTabId)
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTabId = tab.id
      this.$emit('changeTab', tab.id)
    },
  },
  mounted() {
    this.activeTabId = this.value || this.tabs[0].id
  },
  watch: {
    activeTabId(newValue) {
      this.$emit('changeTab', newValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-head ul li {
  border-right: 1px solid #545458;
  &:first-child {
    border-right: none;
  }
}
</style>