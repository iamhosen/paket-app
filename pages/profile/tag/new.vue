<template>
  <div>
    <the-header title="برچسب جدید"></the-header>

    <form @submit.prevent="createTag" class="px-4">
      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
        <input
          v-model="title"
          type="text"
          class="focus:outline-none bg-transparent placeholder:opacity-50"
          autofocus
          placeholder="نام برچسب"
          required
        />
      </div>

      <button
        v-if="!isLoading"
        type="submit"
        class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
      >
        ایجاد برچسب
      </button>
      <button
        v-else
        class="w-full py-3.5 border-0 border-primary-paket text-primary-paket bg-primary-paket bg-opacity-10 rounded-xl flex justify-center items-center"
      >
        <loading-spinner />
      </button>
    </form>
  </div>
</template>

<script>
import TheHeader from '~/components/ui/TheHeader.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TheHeader,
    loadingSpinner,
  },
  data() {
    return {
      title: null,
      isLoading: false,
    }
  },
  methods: {
    async createTag() {
      let data = {
        user_id: this.$store.getters['auth/user'].id,
        title: this.title,
      }
      try {
        this.isLoading = true
        await this.$store.dispatch('tag/create', data)
        this.isLoading = false

        this.$toast.success('برچسب جدید با موفقیت ایجاد شد.', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        this.$router.push('/profile/tag')
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
      }
    },
  },
}
</script>