<template>
  <div>
    <the-header title="پیامک های بانکی"></the-header>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else class="px-4 flex flex-col gap-4">
      <notification-item
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      ></notification-item>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'
import NotificationItem from '@/components/NotificationItem.vue'

export default {
  components: {
    TheHeader,
    loadingSpinner,
    NotificationItem,
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