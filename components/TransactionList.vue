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
  methods: {
    openTransaction(transaction) {
      this.selectedTransaction = transaction
      this.$refs.swipeableBottomSheet.setState('open')
    },
    open(transaction) {
      this.selectedTransaction = transaction
      this.$refs.swipeableBottomSheet.setState('open')
    },
  },
  mounted() {
    this.$refs.swipeableBottomSheet.setState('close')
  },
}
</script>