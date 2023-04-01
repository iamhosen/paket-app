<template>
  <div>
    <the-header title="منابع خرج" add="/profile/source/new"></the-header>

    <!-- cards -->
    <div v-if="banks?.length" class="mx-4 flex flex-col gap-4">
      <bank-card v-for="bank in banks" :key="bank.id" :card="bank"></bank-card>
    </div>
    <div v-else>منبعی موجود نیست!</div>
  </div>
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import BankCard from '@/components/BankCard.vue'

export default {
  components: {
    TheHeader,
    BankCard,
  },
  data() {
    return {
      // cards: [
      //   {
      //     id: 0,
      //     bank: 'SAMAN',
      //     title: 'بانک سامان',
      //     cardNumber: '6219 8619 6169 3270',
      //     total: 14800500,
      //     color: '#0075BC',
      //   },
      //   {
      //     id: 1,
      //     bank: 'BLUBANK',
      //     title: 'بلوبانک',
      //     cardNumber: '6219 8619 6169 3270',
      //     total: 14480000,
      //     color: '#CD323C',
      //   },
      //   {
      //     id: 2,
      //     bank: 'SADERAT',
      //     title: 'بانک صادرات',
      //     cardNumber: '6219 8619 6169 3270',
      //     total: 12480000,
      //     color: '#00006F',
      //   },
      //   {
      //     id: 3,
      //     bank: 'PASARGAD',
      //     title: 'بانک پاسارگاد',
      //     cardNumber: '6219 8619 6169 3270',
      //     total: 148000330,
      //     color: '#F3B23E',
      //   },
      // ],
    }
  },

  computed: {
    banks() {
      return this.$store.getters['bank/banks']
    },
  },
  methods: {},

  async fetch() {
    await this.$store.dispatch('bank/fetchBanks')
  },
}
</script>