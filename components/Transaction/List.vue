<template>
  <div>
    <TransactionDay
      v-for="day in days"
      :key="day.title"
      :day="day"
      @open="open"
    ></TransactionDay>

    <BottomDrawer ref="swipeableBottomSheet">
      <TransactionDetail
        v-if="selectedTransaction"
        :transaction="selectedTransaction"
        @deleteTransaction="deleteTransaction"
      ></TransactionDetail>
    </BottomDrawer>
  </div>
</template>

<script>
import BottomDrawer from '@/components/Base/BottomDrawer.vue'

export default {
  components: {
    BottomDrawer,
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