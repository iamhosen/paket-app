<template>
  <div>
    <div class="w-full flex justify-center items-center h-[40px] mb-6">
      <h1 class="text-2xl font-bold">تراکنش ها</h1>
    </div>
    <div>
      <month-selector
        :months="months"
        :selectedMonth="selectedMonth"
        @monthChanged="updateSelectedMonth"
      />

      <transaction-list :transactions="selectedMonthTransactions" />
    </div>
  </div>
</template>

<script>
import MonthSelector from '@/components/MonthSelector.vue'
import TransactionList from '@/components/TransactionList.vue'

export default {
  components: {
    MonthSelector,
    TransactionList,
  },
  data() {
    return {
      months: [
        '۱۴۰۲ فروردین',
        '۱۴۰۱ اسفند',
        '۱۴۰۱ بهمن',
        '۱۴۰۱ دی',
        '۱۴۰۱ آذر',
        '۱۴۰۱ آبان',
        '۱۴۰۱ مهر',
        '۱۴۰۱ شهریور',
        '۱۴۰۱ مرداد',
        '۱۴۰۱ تیر',
        '۱۴۰۱ خرداد',
        '۱۴۰۱ اردیبهشت',
      ],
      selectedMonth: 0,
      transactions: [
        {
          id: 1,
          date: '2023-03-15',
          amount: 100,
          description: 'Groceries',
        },
        {
          id: 2,
          date: '2023-03-20',
          amount: 50,
          description: 'Gas',
        },
        // ... more transactions
      ],
    }
  },
  computed: {
    selectedMonthTransactions() {
      const today = new Date()
      const selectedDate = new Date(
        today.getFullYear(),
        today.getMonth() - this.selectedMonth,
        1
      )
      const selectedMonth = selectedDate.getMonth() + 1
      const selectedYear = selectedDate.getFullYear()
      return this.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        const transactionMonth = transactionDate.getMonth() + 1
        const transactionYear = transactionDate.getFullYear()
        return (
          transactionMonth === selectedMonth && transactionYear === selectedYear
        )
      })
    },
  },
  methods: {
    updateSelectedMonth(index) {
      this.selectedMonth = index
    },
  },
}
</script>