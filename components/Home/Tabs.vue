<template>
  <div class="tab-wrapper mx-4 bg-back p-4 rounded-2xl mb-8">
    <div class="tab-head mb-5">
      <ul
        class="flex flex-row rounded-lg justify-between bg-[#767680] p-1 bg-opacity-25 gap-1 cursor-pointer"
      >
        <li
          class="w-1/2 text-center py-1 border-l-2 border-[#545458] border-opacity-50"
          :class="isWeek"
          @click="changeTab('week')"
        >
          این هفته
        </li>
        <li
          class="w-1/2 text-center py-1"
          :class="isMonth"
          @click="changeTab('month')"
        >
          این ماه
        </li>
      </ul>
    </div>
    <div class="tab-body flex flex-col gap-4 mx-1">
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">کل دوره</span>
        <span :class="totalStyle">
          {{ isWeek ? currency(weekTotal) : currency(monthTotal) }}
        </span>
      </div>
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">دریافتی</span>
        <span class="ltr bg-[#248A3D] bg-opacity-25 px-1">{{
          isWeek ? currency(weekDeposit) : currency(weekWithdraw)
        }}</span>
      </div>
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">پرداختی</span>
        <span class="text-primary text-base">{{
          isWeek ? currency(weekWithdraw) : currency(monthWithdraw)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { toEnglishNumber } from '@/helpers/number.js'
export default {
  data() {
    return {
      activeTab: 'week',
    }
  },
  computed: {
    date() {
      const formattedDate = new Intl.DateTimeFormat('fa-IR').format(Date.now())
      const [year, month, day] = formattedDate.split('/')
      return [
        toEnglishNumber(year),
        toEnglishNumber(month),
        toEnglishNumber(day),
      ]
    },
    firstOfWeek() {
      const date = this.$jalaali.jalaaliWeek(
        this.date[0],
        this.date[1],
        this.date[2]
      ).saturday
      return [date.jy, date.jm, date.jd]
    },
    firstOfMonth() {
      return [this.date[0], this.date[1], 1]
    },
    monthWithdraw() {
      const transaction = this.$store.getters[
        'transaction/getTransactionsFromDate'
      ](this.firstOfMonth)

      let sum = 0
      transaction.forEach((tr) => {
        if (tr.amount > 0 || tr.category_id === 16) return

        sum += tr.amount
      })

      return -sum
    },
    monthDeposit() {
      const transaction = this.$store.getters[
        'transaction/getTransactionsFromDate'
      ](this.firstOfMonth)

      let sum = 0
      transaction.forEach((tr) => {
        if (tr.amount < 0 || tr.category_id === 16) return

        sum += tr.amount
      })

      return sum
    },
    weekWithdraw() {
      const transaction = this.$store.getters[
        'transaction/getTransactionsFromDate'
      ](this.firstOfWeek)

      let sum = 0
      transaction.forEach((tr) => {
        if (tr.amount > 0 || tr.category_id === 16) return

        sum += tr.amount
      })

      return -sum
    },
    weekDeposit() {
      const transaction = this.$store.getters[
        'transaction/getTransactionsFromDate'
      ](this.firstOfWeek)

      let sum = 0
      transaction.forEach((tr) => {
        if (tr.amount < 0 || tr.category_id === 16) return

        sum += tr.amount
      })

      return sum
    },
    monthTotal() {
      return this.monthDeposit - this.monthWithdraw
    },
    weekTotal() {
      return this.weekDeposit - this.weekWithdraw
    },
    isWeek() {
      return this.activeTab === 'week' ? 'bg-primary rounded-lg' : ''
    },
    isMonth() {
      return this.activeTab === 'month' ? 'bg-primary rounded-lg' : ''
    },
    totalStyle() {
      if (
        (this.isWeek && this.weekTotal > 0) ||
        (this.isMonth && this.monthTotal > 0)
      )
        return 'bg-[#248A3D] bg-opacity-25 px-1'
      else return 'text-primary'
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab

      // if (tab === 'week') {
      //   this.data.total = this.weekTotal
      //   this.data.withdraw = this.weekWithdraw
      //   this.data.deposit = this.weekDeposit
      // } else if (tab === 'month') {
      //   this.data.total = this.monthTotal
      //   this.data.withdraw = this.monthWithdraw
      //   this.data.deposit = this.monthDeposit
      // }
    },
    toEnglishNumber,
  },

  mounted() {
    this.allTotal = this.$store.getters['bank/getAccountTotal']
  },
}
</script>