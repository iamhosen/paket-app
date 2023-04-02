<template>
  <div>
    <!-- header -->
    <the-header title="دسته بندی ها" add="/profile/category/new"></the-header>

    <!-- tabs -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else>
      <!-- tabs -->
      <picker
        :tabs="[
          { id: 'deposit', title: 'دریافتی' },
          { id: 'withdraw', title: 'پرداختی' },
        ]"
        @changeTab="changeTab"
      ></picker>

      <!-- items -->
      <div
        v-if="type === 'deposit'"
        class="bg-bg-input-paket rounded-[14px] mx-4"
      >
        <div v-if="deposites.length">
          <category-item
            v-for="category in deposites"
            :key="category.id"
            :category="category"
          ></category-item>
        </div>
        <div v-else>دسته بندی دریافتی یافت نشد!</div>
      </div>
      <div
        v-if="type === 'withdraw'"
        class="bg-bg-input-paket rounded-[14px] mx-4"
      >
        <div v-if="withdraws.length">
          <category-item
            v-for="category in withdraws"
            :key="category.id"
            :category="category"
          ></category-item>
        </div>
        <div v-else>دسته بندی پرداختی یافت نشد!</div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'
import CategoryItem from '@/components/CategoryItem.vue'
import Picker from '@/components/ui/Picker.vue'

export default {
  components: {
    TheHeader,
    loadingSpinner,
    CategoryItem,
    Picker,
  },
  data() {
    return {
      type: 'deposit',
      isLoading: false,
    }
  },
  computed: {
    activeTab: {
      get() {
        return this.type
      },
      set(newValue) {
        this.type = newValue
      },
    },
    withdraws() {
      return this.$store.getters['category/withdraws']
    },
    deposites() {
      return this.$store.getters['category/deposites']
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    },
  },
  async fetch() {
    try {
      this.isLoading = true
      await this.$store.dispatch('category/fetchCategories')
      this.isLoading = false
    } catch (err) {
      this.$toast.error(err, {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 10000,
      })
    }
  },
}
</script>