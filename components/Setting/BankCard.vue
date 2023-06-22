<template>
  <nuxt-link
    :to="`/profile/source/${card.id}`"
    class="relative w-full h-full p-8 flex flex-col gap-y-4 rounded-xl"
    :class="
      card.name == 'بلوبانک'
        ? 'bg-[#D83541]'
        : card.name == 'سامان'
        ? 'bg-[#0075BC]'
        : card.name == 'صادرات'
        ? 'bg-[#00006C]'
        : card.name == 'پاسارگاد'
        ? 'bg-[#F3B23E]'
        : 'bg-primary-paket'
    "
  >
    <h3 class="text-xl">{{ card.name }}</h3>
    <span class="font-xero ltr text-[1.4em] text-center tracking-wider">
      <span v-for="(n, i) in formatCardNumber(card.card_number)" :key="i">
        {{ n }}
      </span>
    </span>
    <span class="flex flex-col">
      <p class="font-normal opacity-40">موجودی</p>
      <p class="font-bold text-2xl tracking-widest">
        {{ toPersianNumberFormat(card.total_amount) }}
      </p>
    </span>
  </nuxt-link>
</template>

<script>
import { toPersianNumberFormat } from '@/helpers/number.js'

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toPersianNumberFormat,

    formatCardNumber(cardNumber) {
      let number = cardNumber
      return [
        number?.slice(0, 4),
        number?.slice(4, 8),
        number?.slice(8, 12),
        number?.slice(12, 16),
      ]
    },
  },
}
</script>