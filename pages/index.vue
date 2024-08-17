<template>
  <div>
    <div
      class="absolute mt-[-1em] t-0 w-full max-w-[500px] h-56 bg-purple-500 bg-opacity-10 -z-10"
    />

    <BaseHeader title="logo" :alert="true" />

    <div class="mx-4 mb-4 p-4 flex justify-between bg-back rounded-xl">
      <span class="opacity-40"> موجودی کل </span>
      <span class="font-bold">{{ currency(total) }} </span>
    </div>

    <HomeTabs />

    <div class="w-full h-64 mb-2" v-if="visibleCards.length">
      <CarouselCardStack :cards="visibleCards" @hideCard="removeCardFromDeck" />
    </div>

    <HomeAnalysis />
  </div>
</template>

<script>
import { paket } from '@/assets/icons.js'

export default {
  data() {
    return {
      paket,
      visibleCards: [],
    }
  },

  computed: {
    total() {
      return this.$store.getters['bank/getAccountTotal']
    },
    cards: {
      get() {
        return this.$store.getters['bank/banks'].map((bank) => ({
          ...bank,
          bank: bank.key,
        }))
      },
      set(value) {
        this.$store.commit('bank/setBanks', value)
      },
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

    this.visibleCards = this.cards
  },
}
</script>
