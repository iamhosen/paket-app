<template>
  <div>
    <the-header title="برچسب ها" add="/profile/tag/new"></the-header>

    <!-- items -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else-if="tags.length" class="bg-bg-input-paket rounded-[14px] mx-4">
      <tag-item v-for="tag in tags" :key="tag.id" :tag="tag"></tag-item>
    </div>
    <div v-else>برچسبی موجود نیست!</div>
  </div>
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import TagItem from '@/components/TagItem.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TheHeader,
    TagItem,
    loadingSpinner,
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
      await this.$store.dispatch('tag/fetchTags')
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