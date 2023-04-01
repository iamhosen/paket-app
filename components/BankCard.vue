<template>
  <nuxt-link
    :to="`/profile/source/${card.id}`"
    class="w-full h-full p-8 flex flex-col gap-y-4 rounded-xl bg-primary-paket"
  >
    <h3 class="text-xl">{{ card.name }}</h3>
    <span class="font-xero ltr text-[1.4em] text-center tracking-wider">{{
      card.card_number
    }}</span>
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
  },
}
</script>