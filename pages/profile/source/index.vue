<template>
  <div>
    <the-header title="منابع خرج" add="/profile/source/new"></the-header>

    <!-- cards -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else-if="banks.length" class="mx-4 flex flex-col gap-4">
      <bank-card v-for="bank in banks" :key="bank.id" :card="bank"></bank-card>
    </div>
    <div v-else>منبعی موجود نیست!</div>
  </div>
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import BankCard from '@/components/BankCard.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TheHeader,
    BankCard,
    loadingSpinner,
  },
  data() {
    return {
      isLoading: false,
    }
  },

  computed: {
    banks() {
      return this.$store.getters['bank/banks']
    },
  },

  async fetch() {
    try {
      this.isLoading = true
      await this.$store.dispatch('bank/fetchBanks')
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