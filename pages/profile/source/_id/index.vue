<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else>
      <BaseHeader
        :title="bank.name"
        :edit="`/profile/source/${$route.params.id}/edit`"
      ></BaseHeader>

      <div class="flex flex-col gap-4 bg-[#282828] px-4 py-5 mb-5">
        <div class="tab-body flex flex-col gap-4 mx-1">
          <div class="w-full flex justify-between items-center">
            <span class="opacity-40 text-xl">موجودی</span>
            <span class="opacity-80 text-2xl font-bold">{{
              numberFormat(bank.total_amount)
            }}</span>
          </div>
          <div
            v-if="bank.card_number"
            class="w-full flex justify-between items-center"
          >
            <span class="opacity-40">شماره کارت</span>
            <span class="opacity-80 text-base">{{ bank.card_number }}</span>
          </div>
          <div
            v-if="bank.description"
            class="w-full flex justify-between items-center"
          >
            <span class="opacity-40">توضیحات</span>
            <span class="opacity-80 text-base">{{ bank.description }}</span>
          </div>
        </div>
        <div class="flex justify-between gap-2">
          <div
            class="w-100 flex flex-wrap grow justify-start items-center bg-back p-4 rounded-[10px] gap-[10px]"
          >
            <div
              class="bg-primary w-8 h-8 flex justify-center items-center rounded-lg rotate-180"
              v-html="arrow"
            ></div>
            <div>
              <h4 class="text-xs">پرداختی</h4>
              <span class="text-lg font-bold"
                >{{ numberFormat(sumOfWithdraws * -1) }}
              </span>
            </div>
          </div>
          <div
            class="w-100 flex flex-wrap grow justify-start items-center bg-back p-4 rounded-[10px] gap-[10px]"
          >
            <div
              class="bg-[#248A3D] w-8 h-8 flex justify-center items-center rounded-lg"
              v-html="arrow"
            ></div>
            <div>
              <h4 class="text-xs">دریافتی</h4>
              <span class="text-lg font-bold">{{
                numberFormat(sumOfDeposites)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!transactions.length" class="m-4">
        تاکنون تراکنشی با این منبع ثبت نشده است
      </div>
      <TransactionList :days="days" v-else></TransactionList>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { back, arrow } from '@/assets/icons.js'
import { numberFormat } from '@/helpers/number.js'
import TheHeader from '@/components/Base/Header.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'

export default {
  components: {
    TheHeader,
    LoadingSpinner,
  },

  data() {
    return {
      back,
      arrow,

      isLoading: false,
    }
  },

  computed: {
    ...mapGetters('transaction', ['getTransactionByBankId']),
    ...mapGetters('bank', ['getBankById']),
    ...mapGetters('bank', ['banks']),
    bank() {
      return this.getBankById(this.$route.params.id)
    },
    transactions() {
      return this.getTransactionByBankId(this.bank.id)
    },
    days() {
      const days = []

      // Loop over all transactions and group them by day
      this.transactions.forEach((transaction) => {
        const dayTitle = transaction.date.split(' ')[0]

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
        day.transactions.push(transaction)
        // Update the sum of the day
        day.sum += transaction.amount
        // Sort transactions by date
        day.transactions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
      })

      days.sort((a, b) => {
        const [aYear, aMonth, aDay] = a.title.split('/')
        const [bYear, bMonth, bDay] = b.title.split('/')

        if (aYear !== bYear) return aYear > bYear ? -1 : 1
        else if (aMonth !== bMonth) return aMonth > bMonth ? -1 : 1
        else if (aDay !== bDay) return aDay > bDay ? -1 : 1
        else return 0
      })

      return days
    },
    sumOfDeposites() {
      let sum = 0
      this.transactions.map((transaction) => {
        if (transaction.amount > 0) sum += transaction.amount
      })
      return sum
    },
    sumOfWithdraws() {
      let sum = 0
      this.transactions.map((transaction) => {
        if (transaction.amount < 0) sum += transaction.amount
      })
      return sum
    },
  },

  methods: {
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