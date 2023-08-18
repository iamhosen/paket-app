<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else>
      <BaseHeader
        :title="tag.title"
        :edit="`/profile/tag/${$route.params.id}/edit`"
      ></BaseHeader>

      <div class="flex flex-col gap-4 bg-[#282828] px-4 py-5 mb-5">
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
              <span class="text-lg font-bold">{{
                numberFormat(sumOfWithdraws)
              }}</span>
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
        تاکنون تراکنشی با این برچسب ثبت نشده است
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
    ...mapGetters('transaction', ['getTransactionByTagId']),
    ...mapGetters('tag', ['getTagById']),
    ...mapGetters('tag', ['tags']),
    tag() {
      return this.getTagById(this.$route.params.id)
    },
    transactions() {
      return this.getTransactionByTagId(this.tag.id)
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
        day.sum += transaction.amount // Assuming there's an amount property on each transaction
        day.transactions.push(transaction)
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