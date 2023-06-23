<template>
  <div>
    <div class="w-full flex justify-center items-center h-[40px] mb-6">
      <h1 class="text-2xl font-bold">تراکنش ها</h1>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div
      v-else-if="months.length == 0"
      class="mx-4 text-center py-8 bg-primary-paket rounded-lg bg-opacity-10"
    >
      🥲 تراکنشی تا کنون ثبت نشده است
    </div>

    <div v-else>
      <TransactionMonthTabs
        :months="months"
        :selectedMonth="selectedMonth"
        @monthChanged="updateSelectedMonth"
      />

      <TransactionOverview
        :deposits="month.sumOfDeposits"
        :withdraws="-month.sumOfWithdraws"
        :total="month.total"
        :lastMonth="getTotalOfPastMonths"
        :categories="monthCategories"
      ></TransactionOverview>

      <TransactionList :days="month.days"></TransactionList>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'

export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      selectedMonth: 0,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    month() {
      if (this.months.length !== 0) return this.months[this.selectedMonth]
    },
    months() {
      return this.$store.getters['transaction/getTransactionsByMonth']
    },
    getTotalOfPastMonths() {
      return this.$store.getters['transaction/getTotalOfPastMonths'](
        this.selectedMonth + 1
      )
    },
    monthCategories() {
      return this.$store.getters['category/getCategoryOverviewByMonth'](
        this.selectedMonth
      )
    },
  },
  methods: {
    updateSelectedMonth(index) {
      this.selectedMonth = index
    },
  },
  async fetch() {
    try {
      await this.$store.dispatch('loadUserData')
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