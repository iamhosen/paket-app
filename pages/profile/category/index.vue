<template>
  <div>
    <!-- header -->
    <BaseHeader title="دسته بندی ها" add="/profile/category/new"></BaseHeader>

    <!-- tabs -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
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
          <Category
            v-for="category in deposites"
            :key="category.id"
            :category="category"
          ></Category>
        </div>
        <div v-else>دسته بندی دریافتی یافت نشد!</div>
      </div>
      <div
        v-if="type === 'withdraw'"
        class="bg-bg-input-paket rounded-[14px] mx-4"
      >
        <div v-if="withdraws.length">
          <Category
            v-for="category in withdraws"
            :key="category.id"
            :category="category"
          ></Category>
        </div>
        <div v-else>دسته بندی پرداختی یافت نشد!</div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/Base/Header.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'
import Category from '@/components/Setting/Category.vue'
import Picker from '@/components/Base/Picker.vue'

export default {
  components: {
    TheHeader,
    LoadingSpinner,
    Category,
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
      await this.$store.dispatch('loadUserData')
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