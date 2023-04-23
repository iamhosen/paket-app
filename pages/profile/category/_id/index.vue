<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else>
      <the-header
        :title="category.name"
        :edit="`/profile/category/${$route.params.id}/edit`"
      ></the-header>

      <div class="flex flex-col gap-4 bg-[#282828] px-4 py-5 mb-5">
        <div class="flex justify-between gap-2">
          <div
            class="w-100 flex flex-wrap grow justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
          >
            <div
              class="w-8 h-8 flex justify-center items-center rounded-lg rotate-180"
              :class="
                category.type === 'deposit'
                  ? 'bg-[#248A3D] rotate-0'
                  : 'bg-primary-paket rotate-180'
              "
              v-html="arrow"
            ></div>
            <div>
              <h4 v-if="category.type === 'deposit'" class="text-xs">
                دریافتی
              </h4>
              <h4 v-else class="text-xs">پرداختی</h4>
              <span class="text-lg font-bold">{{ numberFormat(sum) }} </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!transactions.length" class="m-4">
        تاکنون تراکنشی در این دسته ثبت نشده است
      </div>
      <transaction-list :days="days" v-else></transaction-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { arrow } from '@/assets/icons.js'
import { numberFormat } from '@/helpers/number.js'
import TheHeader from '@/components/ui/TheHeader.vue'
import TransactionList from '@/components/TransactionList.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TheHeader,
    loadingSpinner,
    TransactionList,
  },
  data() {
    return {
      arrow,
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters('transaction', ['getTransactionByCategoryId']),
    ...mapGetters('category', ['getCategoryById']),
    ...mapGetters('category', ['categories']),
    category() {
      return this.getCategoryById(this.$route.params.id)
    },
    transactions() {
      return this.getTransactionByCategoryId(this.category.id)
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
    sum() {
      return this.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      )
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