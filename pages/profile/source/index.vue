<template>
  <div>
    <the-header title="منابع خرج" add="/profile/source/new"></the-header>

    <!-- cards -->
    <div class="mx-4 flex flex-col gap-4">
      <nuxt-link
        to="/profile/source/id"
        class="w-full h-full p-8 flex flex-col gap-y-4 rounded-xl"
        v-for="card in cards"
        :key="card.id"
        :style="{ background: card.color }"
      >
        <h3 class="text-xl">{{ card.title }}</h3>
        <span class="font-xero ltr text-[1.4em] text-center tracking-wider">{{
          card.cardNumber
        }}</span>
        <span class="flex flex-col">
          <p class="font-normal opacity-40">موجودی</p>
          <p class="font-bold text-2xl tracking-widest">
            {{ toPersianNumberFormat(card.total) }}
          </p>
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import { toPersianNumberFormat } from '@/helpers/number.js'

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      cards: [
        {
          id: 0,
          bank: 'SAMAN',
          title: 'بانک سامان',
          cardNumber: '6219 8619 6169 3270',
          total: 14800500,
          color: '#0075BC',
        },
        {
          id: 1,
          bank: 'BLUBANK',
          title: 'بلوبانک',
          cardNumber: '6219 8619 6169 3270',
          total: 14480000,
          color: '#CD323C',
        },
        {
          id: 2,
          bank: 'SADERAT',
          title: 'بانک صادرات',
          cardNumber: '6219 8619 6169 3270',
          total: 12480000,
          color: '#00006F',
        },
        {
          id: 3,
          bank: 'PASARGAD',
          title: 'بانک پاسارگاد',
          cardNumber: '6219 8619 6169 3270',
          total: 148000330,
          color: '#F3B23E',
        },
      ],
    }
  },

  methods: {
    toPersianNumberFormat,
  },
}
</script>