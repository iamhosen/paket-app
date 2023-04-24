<template>
  <div class="p-4 bg-box-paket rounded-[13px] flex justify-between">
    <nuxt-link :to="`/notification/${notification.id}`" class="grow flex gap-3">
      <div
        class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg self-center"
        v-html="back"
      ></div>

      <div class="grow flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span
            class="ltr text-right"
            :class="
              notification.amount > 0
                ? 'bg-[#248A3D] bg-opacity-25 px-1'
                : 'text-primary-paket'
            "
            >{{ numberFormat(notification.amount ?? 0) }}</span
          >
          <p class="text-xs opacity-30">{{ notification.bank }}</p>
        </div>
      </div>
    </nuxt-link>

    <div class="flex justify-center gap-2 mr-8 items-stretch">
      <button
        class="bg-primary-paket bg-opacity-10 w-10 h-10 flex justify-center items-center rounded-[14px]"
        v-html="trash"
        @click="deleteNotification"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { back, trash, plus } from '@/assets/icons.js'
import { numberFormat } from '@/helpers/number.js'

export default {
  data() {
    return {
      back,
      trash,
      plus,
    }
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  methods: {
    numberFormat,

    deleteNotification() {
      try {
        if (confirm('آیا از حذف این پیامک مطمئن هستید؟')) {
          this.$store
            .dispatch('notification/delete', {
              id: this.notification.id,
              status: true,
            })
            .then(() =>
              this.$toast.success('پیامک با موفقیت حذف شد!', {
                theme: 'toasted-primary',
                position: 'top-center',
                duration: 10000,
              })
            )
        }
      } catch (error) {
        this.$toast.error(error, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
        })
      }
    },
  },
}
</script>