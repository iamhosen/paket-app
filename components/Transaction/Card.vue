<template>
  <div
    class="transaction p-4 bg-box rounded-[13px] flex gap-3 items-start"
    @click="open"
  >
    <div
      class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
      v-html="back"
    ></div>

    <div class="grow flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <h1 class="text-base">{{ category.name }}</h1>
        <p class="text-xs opacity-30">
          {{ bank.name }}
          {{ transaction.description ? `| ${transaction.description}` : '' }}
        </p>
      </div>
      <span
        class="ltr"
        :class="
          transaction.amount > 0
            ? 'bg-[#248A3D] bg-opacity-25 px-1'
            : 'text-primary'
        "
        >{{ numberFormat(transaction.amount) }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { back } from '@/assets/icons.js'
import { numberFormat } from '@/helpers/number.js'

export default {
  data() {
    return {
      back,
    }
  },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('bank', ['getBankById']),
    ...mapGetters('category', ['getCategoryById']),
    bank() {
      return this.getBankById(this.transaction.bank_id)
    },
    category() {
      return this.getCategoryById(this.transaction.category_id)
    },
  },
  methods: {
    numberFormat,
    open() {
      this.$emit('open')
    },
  },
}
</script>