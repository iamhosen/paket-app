<template>
  <div>
    <BaseHeader title="منابع خرج" add="/profile/source/new"></BaseHeader>

    <!-- cards -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else-if="banks.length" class="mx-4 flex flex-col gap-4">
      <BankCard v-for="bank in banks" :key="bank.id" :card="bank"></BankCard>
    </div>
    <div v-else>منبعی موجود نیست!</div>
  </div>
</template>

<script>
import TheHeader from '@/components/Base/Header.vue'
import BankCard from '@/components/Setting/BankCard.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'

export default {
  components: {
    TheHeader,
    BankCard,
    LoadingSpinner,
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