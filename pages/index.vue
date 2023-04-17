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
    <!-- <home-analysis></home-analysis> -->
  </div>
</template>

<script>
import { paket } from '@/assets/icons.js'
import HomeTabs from '@/components/HomeTabs.vue'
import CardStack from '@/components/slider/CardStack.vue'
// import HomeAnalysis from '../components/HomeAnalysis.vue'

export default {
  name: 'HomePage',

  components: {
    HomeTabs,
    CardStack,
    // HomeAnalysis
  },

  data() {
    return {
      paket,
      visibleCards: [
        {
          id: 0,
          bank: 'SAMAN',
          name: 'بانک سامان',
          card_number: '6219 8619 6169 3270',
          total_amount: 14800500,
        },
        {
          id: 1,
          name: 'بلوبانک',
          card_number: '6219 8619 6169 3270',
          total_amount: 14480000,
        },
        {
          id: 2,
          name: 'بانک صادرات',
          card_number: '6219 8619 6169 3270',
          total_amount: 12480000,
        },
        {
          id: 25,
          name: 'نقدی',
          card_number: null,
          total_amount: 10000,
        },
      ],
    }
  },

  computed: {
    sources() {
      return this.$store.getters['bank/banks']
    },
  },

  methods: {
    handleCardAccepted() {},
    handleCardRejected() {},
    removeCardFromDeck() {
      const holder = this.visibleCards[0]

      this.visibleCards.shift()

      setTimeout(() => {
        this.visibleCards.push(holder)
      }, 500)
    },
  },
  async fetch() {
    try {
      this.isLoading = true
      await this.$store.dispatch('loadUserData')
      this.isLoading = false
    } catch (err) {
      this.$toast.error(err, {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 10000,
      })
    }
  },
}
</script>
