<template>
  <div>
    <div class="w-full flex justify-center items-center h-[40px] mb-6">
      <h1 class="text-2xl font-bold">تراکنش ها</h1>
    </div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else-if="months.length == 0" class="mx-4">
      تراکنشی تا کنون ثبت نشده است
    </div>
    <div v-else>
      <month-selector
        :months="months"
        :selectedMonth="selectedMonth"
        @monthChanged="updateSelectedMonth"
      />

      <div class="flex flex-col gap-4 bg-[#282828] px-4 py-5 mb-5">
        <div class="flex justify-between gap-2">
          <div
            class="w-100 flex flex-wrap grow justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
          >
            <div
              class="bg-primary-paket w-8 h-8 flex justify-center items-center rounded-lg rotate-180"
              v-html="arrow"
            ></div>
            <div>
              <h4 class="text-xs">پرداختی</h4>
              <span class="text-lg font-bold">{{
                numberFormat(getMonth(selectedMonth).sumOfWithdraws * -1)
              }}</span>
            </div>
          </div>
          <div
            class="w-100 flex flex-wrap grow justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
          >
            <div
              class="bg-[#248A3D] w-8 h-8 flex justify-center items-center rounded-lg"
              v-html="arrow"
            ></div>
            <div>
              <h4 class="text-xs">دریافتی</h4>
              <span class="text-lg font-bold"
                >{{ numberFormat(getMonth(selectedMonth).sumOfDeposits) }}
              </span>
            </div>
          </div>
        </div>
        <div class="tab-body flex flex-col gap-4 mx-1">
          <div class="w-full flex justify-between items-center">
            <span class="opacity-40">کل دوره</span>
            <span
              :class="
                getMonth(selectedMonth).total > 0
                  ? 'bg-[#248A3D] bg-opacity-25 px-1'
                  : 'text-primary-paket'
              "
              >{{ numberFormat(getMonth(selectedMonth).total) }}</span
            >
          </div>
          <!-- <div class="w-full flex justify-between items-center">
            <span class="opacity-40">مانده دوره های قبل</span>
            <span class="opacity-80 text-base">۷۷,۳۴۵,۶۷۸</span>
          </div> -->
        </div>
      </div>

      <transaction-list :days="getMonth(selectedMonth).days"></transaction-list>
    </div>
  </div>
</template>

<script>
import MonthSelector from '@/components/MonthSelector.vue'
import TransactionListMonth from '@/components/TransactionListMonth.vue'
import { getPersianMonthName } from '@/helpers/helper.js'
import { arrow } from '@/assets/icons.js'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'
import { numberFormat } from '@/helpers/number.js'

export default {
  components: {
    MonthSelector,
    TransactionListMonth,
    loadingSpinner,
  },
  data() {
    return {
      selectedMonth: 0,
      arrow,
      isLoading: false,
    }
  },
  computed: {
    transactions() {
      return this.$store.getters['transaction/transactions']
    },

    days() {
      const days = []

      // Loop over all transactions and group them by day
      this.transactions.forEach((transaction) => {
        const date = new Date(transaction.date)
        const dayTitle = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`

        // Check if there's already a day object for this day
        let day = days.find((d) => d.title === dayTitle)
        if (!day) {
          // If not, create a new day object
          day = {
            title: dayTitle,
            sum: 0,
            transactions: [],
          }
          days.push(day)
        }

        // Add the transaction to the day object
        day.sum += transaction.amount // Assuming there's an amount property on each transaction
        day.transactions.push(transaction)
        day.transactions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
      })

      days.sort((a, b) => {
        const aDate = new Date(
          a.title.replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3')
        )
        const bDate = new Date(
          b.title.replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3')
        )
        const now = new Date()
        const aDiff = Math.abs(now - aDate)
        const bDiff = Math.abs(now - bDate)
        return aDiff - bDiff
      })
      return days
    },

    months() {
      const months = {}

      // Loop over all days and group them by month
      this.days.forEach((day) => {
        const t = day.title.split('/')
        const monthTitle = `${t[0]} ${getPersianMonthName(t[1])}`
        // Check if there's already a month object for this month
        let month = months[monthTitle]
        if (!month) {
          // If not, create a new month object
          month = {
            title: monthTitle,
            days: [],
            sumOfDeposits: 0,
            sumOfWithdraws: 0,
            total: 0,
          }
          months[monthTitle] = month
        }

        // Add the day to the month object
        month.days.push(day)
        day.transactions.forEach((transaction) => {
          if (transaction.amount > 0) month.sumOfDeposits += transaction.amount
          else month.sumOfWithdraws += transaction.amount

          month.total += transaction.amount
        })
      })

      // Convert the months object to an array and sort it by title
      const sortedMonths = Object.values(months).sort((a, b) => {
        return new Date(`${b.title}/01`) - new Date(`${a.title}/01`)
      })

      return sortedMonths
    },
  },
  methods: {
    updateSelectedMonth(index) {
      this.selectedMonth = index
    },
    getMonth(selected) {
      if (this.months.length !== 0) return this.months[selected]
    },
    getPersianMonthName,
    numberFormat,
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