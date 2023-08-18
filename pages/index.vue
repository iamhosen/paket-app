<template>
  <div>
    <!-- <div
      class="absolute mt-[-1em] t-0 w-full max-w-[500px] h-40 bg-[#282828] -z-10"
    ></div> -->

    <BaseHeader title="logo" :alert="true"></BaseHeader>

    <div class="mx-4 mb-4 p-4 flex justify-between bg-back rounded-xl">
      <span class="opacity-40"> موجودی کل </span>
      <span class="font-bold">{{ currency(total) }} </span>
    </div>

    <!-- <div class="w-full h-64 mb-2">
      <CarouselCardStack
        :cards="visibleCards"
        @hideCard="removeCardFromDeck"
      ></CarouselCardStack>
    </div> -->

    <HomeTabs></HomeTabs>

    <HomeAnalysis />
  </div>
</template>

<script>
import { paket } from '@/assets/icons.js'

export default {
  data() {
    return {
      paket,
      // visibleCards: [
      //   {
      //     id: 0,
      //     bank: 'SAMAN',
      //     name: 'بانک سامان',
      //     card_number: '6219 8619 6169 3270',
      //     total_amount: 14800500,
      //   },
      //   {
      //     id: 1,
      //     name: 'بلوبانک',
      //     card_number: '6219 8619 6169 3270',
      //     total_amount: 14480000,
      //   },
      //   {
      //     id: 2,
      //     name: 'بانک صادرات',
      //     card_number: '6219 8619 6169 3270',
      //     total_amount: 12480000,
      //   },
      //   {
      //     id: 25,
      //     name: 'نقدی',
      //     card_number: null,
      //     total_amount: 10000,
      //   },
      // ],
    }
  },

  computed: {
    sources() {
      return this.$store.getters['bank/banks']
    },
    total() {
      return this.$store.getters['bank/getAccountTotal']
    },
  },

  methods: {
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
      await this.$store.dispatch('loadUserData')
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
