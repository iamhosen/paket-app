<template>
  <div>
    <div
      class="absolute mt-[-1em] t-0 w-full max-w-[500px] h-40 bg-[#282828] -z-10"
    ></div>
    <div
      class="w-full flex justify-center items-center h-10 mb-6"
      v-html="paket"
    ></div>
    <div class="w-full h-64 mb-2">
      <card-stack
        :cards="visibleCards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @hideCard="removeCardFromDeck"
      ></card-stack>
    </div>
    <home-tabs></home-tabs>
    <home-analysis></home-analysis>
  </div>
</template>

<script>
import CardStack from '@/components/slider/CardStack.vue'
import HomeTabs from '@/components/HomeTabs.vue'
import HomeAnalysis from '../components/HomeAnalysis.vue'

import { paket } from '@/assets/icons.js'

export default {
  name: 'HomePage',
  components: { CardStack, HomeTabs, HomeAnalysis },

  data() {
    return {
      paket,
      visibleCards: [
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
    handleCardAccepted() {
      // console.log('handleCardAccepted')
    },
    handleCardRejected() {
      // console.log('handleCardRejected')
    },
    removeCardFromDeck() {
      const holder = this.visibleCards[0]

      this.visibleCards.shift()

      setTimeout(() => {
        this.visibleCards.push(holder)
      }, 500)
    },
  },
}
</script>
