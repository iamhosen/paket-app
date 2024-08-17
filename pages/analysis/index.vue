<template>
  <div>
    <div class="w-full flex justify-center items-center h-[40px] mb-6">
      <h1 class="text-2xl font-bold">آنالیز</h1>
    </div>

    <TransactionMonthTabs
      :months="months"
      :selectedMonth="selectedMonth"
      @monthChanged="updateSelectedMonth"
    />

    <div
      v-if="months.length == 0"
      class="mx-4 text-center py-8 bg-primary rounded-lg bg-opacity-10"
    >
      🥲 تراکنشی تا کنون ثبت نشده است
    </div>
    <div v-else>
      <div class="p-4 space-y-4">
        <div
          v-if="monthWithdrawCategories"
          class="bg-box rounded-xl border-opacity-50 p-2"
        >
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-red-800"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="m3 7l6 6l4-4l8 8" />
                <path d="M21 10v7h-7" />
              </g>
            </svg>
            <span>دسته‌بندی خرج</span>
          </div>
          <BaseChart :categories="monthWithdrawCategories" />

          <div class="flex flex-col gap-1 bg-black rounded-lg px-4 mt-2">
            <div
              class="flex items-center justify-between gap-1 py-2"
              @click="isWithdrawOpen = !isWithdrawOpen"
            >
              <span class="text-sm">بیشتر</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                class="transition-all"
                :class="isWithdrawOpen ? 'transform rotate-180' : ''"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m6 9l6 6l6-6"
                />
              </svg>
            </div>
            <div v-if="isWithdrawOpen" class="grid grid-cols-2">
              <div class="flex flex-col gap-1">
                <div
                  v-for="(label, index) in monthWithdrawCategories.labels"
                  class="text-sm py-1 pr-2 rounded-r"
                  :class="index % 2 ? '' : 'bg-stone-900'"
                >
                  {{ label }}
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <div
                  v-for="(value, index) in monthWithdrawCategories.values"
                  class="text-sm text-left py-1 pl-2 rounded-l"
                  :class="index % 2 ? '' : 'bg-stone-900'"
                >
                  {{ currency(value) }}
                  <span class="text-xs opacity-40">ریال</span>
                </div>
              </div>

              <div class="col-span-full flex my-2">
                <div class="flex-grow">
                  <span class="text-xs opacity-40 pr-2">مجموع</span>
                </div>
                <div
                  class="text-sm ml-2 bg-red-700 rounded flex items-center gap-1"
                >
                  {{
                    currency(
                      monthWithdrawCategories.values.reduce((a, b) => a + b, 0)
                    )
                  }}
                  <span class="text-xs opacity-40">ریال</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="monthDepositCategories"
          class="bg-box rounded-xl border-opacity-50 p-2"
        >
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-green-800"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="m3 17l6-6l4 4l8-8" />
                <path d="M14 7h7v7" />
              </g>
            </svg>
            <span>دسته‌بندی درآمد</span>
          </div>
          <BaseChart :categories="monthDepositCategories" title="دریافتی" />

          <div class="flex flex-col gap-1 bg-black rounded-lg px-4 mt-2">
            <div
              class="flex items-center justify-between gap-1 py-2"
              @click="isDepositOpen = !isDepositOpen"
            >
              <span class="text-sm">بیشتر</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                class="transition-all"
                :class="isDepositOpen ? 'transform rotate-180' : ''"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m6 9l6 6l6-6"
                />
              </svg>
            </div>
            <div v-if="isDepositOpen" class="grid grid-cols-2">
              <div class="flex flex-col gap-1">
                <div
                  v-for="(label, index) in monthDepositCategories.labels"
                  class="text-sm py-1 pr-2 rounded-r"
                  :class="index % 2 ? '' : 'bg-stone-900'"
                >
                  {{ label }}
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <div
                  v-for="(value, index) in monthDepositCategories.values"
                  class="text-sm text-left py-1 pl-2 rounded-l"
                  :class="index % 2 ? '' : 'bg-stone-900'"
                >
                  {{ currency(value) }}
                  <span class="text-xs opacity-40">ریال</span>
                </div>
              </div>

              <div class="col-span-full flex my-2">
                <div class="flex-grow">
                  <span class="text-xs opacity-40 pr-2">مجموع</span>
                </div>
                <div
                  class="text-sm ml-2 bg-green-800 rounded flex items-center gap-1"
                >
                  {{
                    currency(
                      monthDepositCategories.values.reduce((a, b) => a + b, 0)
                    )
                  }}
                  <span class="text-xs opacity-40">ریال</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="lastYear.length"
          class="bg-box rounded-xl border-opacity-50 p-2"
        >
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16M7 14h.013m2.997 0h.005m2.995 0h.005m3 0h.005m-3.005 3h.005m-6.01 0h.005m2.995 0h.005"
              />
            </svg>
            <span>سال گذشته</span>
          </div>
          <AnalysisMonthly :months="lastYear" />
        </div>

        <div
          v-if="getSteppedLineChart()"
          class="bg-box rounded-xl border-opacity-50 p-2"
        >
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-red-800"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="m3 7l6 6l4-4l8 8" />
                <path d="M21 10v7h-7" />
              </g>
            </svg>
            <span>خرج روزانه</span>
          </div>
          <BaseSteplineChart :categories="getSteppedLineChart()" />
        </div>

        <div
          v-if="getSteppedLineChart('deposit')"
          class="bg-box rounded-xl border-opacity-50 p-2 pb-0"
        >
          <div class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="text-green-800"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="m3 17l6-6l4 4l8-8" />
                <path d="M14 7h7v7" />
              </g>
            </svg>
            <span>درآمد روزانه</span>
          </div>
          <BaseSteplineChart
            :categories="getSteppedLineChart('deposit')"
            color="#166534"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMonth: 0,
      isWithdrawOpen: false,
      isDepositOpen: false,
    }
  },
  computed: {
    transactions() {
      return this.$store.getters['transaction/getTransactionsByMonth']
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
    monthWithdrawCategories() {
      return this.$store.getters['category/getCategoryOverviewByMonth'](
        this.selectedMonth
      )
    },
    monthDepositCategories() {
      return this.$store.getters['category/getCategoryOverviewByMonth'](
        this.selectedMonth,
        'deposit'
      )
    },
    lastYear() {
      // get months from 12 month ago to selected month
      return this.months
        .slice(this.selectedMonth, this.selectedMonth + 12)
        .map((month) => ({
          title: month?.days?.[0].title.split('/').at(1),
          sumOfWithdraws: month.sumOfWithdraws,
          sumOfDeposits: month.sumOfDeposits,
        }))
    },
  },
  methods: {
    updateSelectedMonth(index) {
      this.selectedMonth = index
    },
    getSteppedLineChart(type = 'withdraw') {
      let sum = 0

      const values = []
      const labels = []

      const days = this.month.days.reverse()
      const lastDayOfMonth = days[0].title.split('/').at(-1) > 6 ? 30 : 31

      for (let i = 0; i <= lastDayOfMonth; i++) {
        let date = days?.[0].title.split('/')
        const day = i < 9 ? '0' + (i + 1) : i + 1 + ''

        const index = days.findIndex((d) => d.title.split('/').at(-1) == day)

        if (i > days.length - 1 || index === -1) {
          labels.push([date[0], date[1], day].join('/'))
          values.push(sum)
          continue
        } else {
          labels.push(days?.[index]?.title)
          if (type === 'withdraw') sum -= days?.[index]?.sumOfWithdraws
          else sum += days?.[index]?.sumOfDeposits

          values.push(sum)
        }
      }

      return { values, labels }
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
