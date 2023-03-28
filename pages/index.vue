<template>
  <div>
    <div class="w-full flex justify-center items-center h-[40px] mb-6">
      <img src="../assets/logo.svg" alt="پاکت" class="h-[100%]" />
    </div>
    <div class="w-full h-64 mb-8">
      <card-stack
        :cards="visibleCards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @hideCard="removeCardFromDeck"
      ></card-stack>
    </div>
    <p>home page</p>
  </div>
</template>

<script>
import CardStack from '@/components/slider/CardStack.vue'
export default {
  name: 'HomePage',
  components: { CardStack },

  data() {
    return {
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
