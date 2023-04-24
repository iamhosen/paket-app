<template>
  <div>
    <BaseHeader title="پیامک های بانکی"></BaseHeader>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <BaseLoadingSpinner class="h-16 w-16"></BaseLoadingSpinner>
    </div>
    <div v-else class="px-4 flex flex-col gap-4">
      <SettingNotification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      ></SettingNotification>
    </div>
  </div>
</template>

<script>
export default {
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