<template>
  <div>
    <the-header title="دسته بندی جدید"></the-header>

    <form @submit.prevent="createCategory" class="px-4">
      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
        <input
          v-model="title"
          type="text"
          class="focus:outline-none bg-transparent placeholder:opacity-50"
          autofocus
          placeholder="نام دسته"
          required
        />
      </div>

      <div
        class="bg-[#1F1F1F] flex flex-col gap-4 justify-start p-4 rounded-xl mb-4"
      >
        <div class="opacity-50">نوع</div>
        <div class="flex gap-8">
          <span class="flex items-center gap-2">
            <input
              type="radio"
              id="withdraw"
              name="type"
              value="withdraw"
              v-model="type"
              class="bg-transparent"
            />
            <label for="cash" class="opacity-50"> پرداختی</label>
          </span>
          <span class="flex items-center gap-2">
            <input
              type="radio"
              id="deposit"
              name="type"
              value="deposit"
              v-model="type"
              class="bg-transparent"
            />
            <label for="cash" class="opacity-50"> دریافتی</label>
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        v-if="!isLoading"
        type="submit"
        class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
      >
        ایجاد دسته بندی
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
      isLoading: false,
      title: null,
      type: null,
    }
  },
  methods: {
    async createCategory() {
      let data = {
        user_id: this.$store.getters['auth/user'].id,
        parent_id: 0,
        icon_id: null,
        name: this.title,
      }

      if (this.type === 'deposit') {
        data.type = 'deposit'
      } else {
        data.type = 'withdraw'
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('category/create', data)
        this.isLoading = false

        this.$toast.success('دسته جدید با موفقیت ایجاد شد.', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        this.$router.push('/profile/category')
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