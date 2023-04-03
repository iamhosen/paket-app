<template>
  <div class="day">
    <header
      class="flex justify-between px-4 py-[10px] text-[14px] border-b-[1px] border-[#3C3C43]"
    >
      <h3 class="font-bold">{{ day.title }}</h3>
      <span class="opacity-60">{{ numberFormat(day.sum) }}</span>
    </header>

    <div class="transactions p-4 flex flex-col gap-3">
      <transaction-item
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @open="$emit('open', transaction)"
      ></transaction-item>
    </div>
  </div>
</template>

<script>
import TransactionItem from '@/components/TransactionItem.vue'
import { numberFormat } from '@/helpers/number.js'

export default {
  components: {
    TransactionItem,
  },
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  computed: {
    transactions() {
      return this.day.transactions
    },
  },
  methods: {
    numberFormat,
  },
}
</script>