<template>
  <div>
    <transaction-list-day
      v-for="day in days"
      :key="day.title"
      :day="day"
      @open="open"
    ></transaction-list-day>

    <transaction ref="swipeableBottomSheet">
      <transaction-content
        v-if="selectedTransaction"
        :transaction="selectedTransaction"
        @deleteTransaction="deleteTransaction"
      ></transaction-content>
    </transaction>
  </div>
</template>

<script>
import Transaction from '@/components/Transaction.vue'
import TransactionContent from '@/components/TransactionContent.vue'
import TransactionListDay from '@/components/TransactionListDay.vue'

export default {
  components: {
    Transaction,
    TransactionContent,
    TransactionListDay,
  },
  data() {
    return {
      selectedTransaction: null,
    }
  },
  props: {
    days: {
      type: Array,
      required: true,
    },
  },
  provide() {
    return {
      deleteTransaction: this.deleteTransaction,
    }
  },
  methods: {
    openTransaction(transaction) {
      this.selectedTransaction = transaction
      this.$refs.swipeableBottomSheet.setState('open')
    },
    open(transaction) {
      this.selectedTransaction = transaction
      this.$refs.swipeableBottomSheet.setState('open')
    },
    async deleteTransaction(transaction) {
      this.$refs.swipeableBottomSheet.setState('close')

      if (confirm('آیا از حذف این تراکنش مطمئن هستید؟')) {
        try {
          this.isLoading = true
          await this.$store.dispatch('transaction/delete', transaction)
          this.isLoading = false

          this.$toast.success('تراکنش با موفقیت حذف شد!', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
        } catch (e) {
          this.$toast.error(e, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
        }
      }
    },
  },
  mounted() {
    this.$refs.swipeableBottomSheet.setState('close')
  },
}
</script>