<template>
  <div>
    <BaseHeader title="پیامک های بانکی"></BaseHeader>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <BaseLoadingSpinner class="h-16 w-16"></BaseLoadingSpinner>
    </div>
    <div
      v-else-if="notifications.length == 0"
      class="mx-4 text-center py-8 bg-primary-paket rounded-lg bg-opacity-10"
    >
      پیامک بانکی جدید نداری! 😊
    </div>
    <div v-else class="flex flex-col gap-4">
      <div class="day" v-for="day in days" :key="day.title">
        <header
          class="flex justify-between px-4 py-[10px] text-[14px] border-b-[1px] border-[#3C3C43]"
        >
          <h3 class="font-bold">{{ day.title }}</h3>
          <span class="opacity-60">{{ numberFormat(day.sum) }}</span>
        </header>

        <div class="transactions p-4 flex flex-col gap-3">
          <SettingNotification
            v-for="notification in day.transactions"
            :key="notification.id"
            :notification="notification"
          ></SettingNotification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat } from '@/helpers/number.js'

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

    days() {
      const days = []

      // Loop over all notifications and group them by day
      this.notifications.forEach((notification) => {
        const dayTitle = notification.date.split(' ')[0]

        // Check if there's already a day object for this day
        let day = days.find((d) => d.title === dayTitle)
        if (!day) {
          // If not, create a new day object
          day = {
            title: dayTitle,
            sum: 0,
            transactions: [],
          }
          days.push(day)
        }

        // Add the notifications to the day object
        day.sum += notification.amount
        day.transactions.push(notification)
        day.transactions.sort((a, b) => {
          const dateA = a.date.split(' ')[0].split('/')
          const dateB = b.date.split(' ')[0].split('/')
          if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0]
          if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1]
          if (dateA[2] !== dateB[2]) return dateB[2] - dateA[2]
        })
      })

      days.sort((a, b) => {
        const [aYear, aMonth, aDay] = a.title.split('/')
        const [bYear, bMonth, bDay] = b.title.split('/')

        if (aYear !== bYear) return aYear > bYear ? -1 : 1
        else if (aMonth !== bMonth) return aMonth > bMonth ? -1 : 1
        else if (aDay !== bDay) return aDay > bDay ? -1 : 1
        else return 0
      })

      return days
    },
  },

  methods: {
    numberFormat,
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