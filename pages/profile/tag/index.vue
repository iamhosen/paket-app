<template>
  <div>
    <BaseHeader title="برچسب ها" add="/profile/tag/new"></BaseHeader>

    <!-- items -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else-if="tags.length" class="bg-bg-input-paket rounded-[14px] mx-4">
      <SettingTag v-for="tag in tags" :key="tag.id" :tag="tag"></SettingTag>
    </div>
    <div v-else>برچسبی موجود نیست!</div>
  </div>
</template>

<script>
import TheHeader from '@/components/Base/Header.vue'
import SettingTag from '@/components/Setting/Tag.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'

export default {
  components: {
    TheHeader,
    SettingTag,
    LoadingSpinner,
  },

  data() {
    return {
      isLoading: false,
    }
  },

  computed: {
    tags() {
      return this.$store.getters['tag/tags']
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