<template>
  <div>
    <the-header title="پیامک های بانکی"></the-header>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else class="px-4 flex flex-col gap-4">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      ></Notification>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/Base/TheHeader.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'
import Notification from '@/components/Setting/Notification.vue'

export default {
  components: {
    TheHeader,
    LoadingSpinner,
    Notification,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    notifications() {
      return this.$store.getters['notification/notifications']
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