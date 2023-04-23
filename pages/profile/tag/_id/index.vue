<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else>
      <the-header
        :title="tag.title"
        :edit="`/profile/tag/${$route.params.id}/edit`"
      ></the-header>

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
                numberFormat(sumOfWithdraws)
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
      <transaction-list :days="days" v-else></transaction-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { back, arrow } from '@/assets/icons.js'
import { numberFormat } from '@/helpers/number.js'
import TheHeader from '@/components/ui/TheHeader.vue'
import TransactionList from '@/components/TransactionList.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TransactionList,
    TheHeader,
    loadingSpinner,
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