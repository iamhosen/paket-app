<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else>
      <the-header
        title="ویرایش دسته"
        :trash="true"
        @delete="deleteCategory"
      ></the-header>

      <form @submit.prevent="editCategory" class="px-4">
        <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
          <input
            v-model="name"
            type="text"
            class="focus:outline-none bg-transparent placeholder:opacity-50"
            autofocus
            placeholder="نام دسته"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
        >
          ثبت تغییرات
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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

      category: null,
      name: null,
    }
  },
  computed: {
    ...mapGetters('category', ['getCategoryById']),
    ...mapGetters('category', ['categories']),
  },
  methods: {
    setCategory() {
      const route = this.$route.params.id.split('/').pop()
      this.category = this.getCategoryById(route)
      this.name = this.category.name
      this.type = this.category.type
    },
    deleteCategory() {
      if (confirm('آیا از حذف این دسته مطمئن هستید؟')) {
        try {
          this.isLoading = true
          this.$store.dispatch('category/delete', this.category.id)
          this.isLoading = false

          this.$toast.success('دسته با موفقیت حذف شد!', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
          this.$router.push('/profile/category')
        } catch (e) {
          this.$toast.error(e, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
        }
      }
    },
    async editCategory() {
      const category = {
        id: this.category.id,
        name: this.name,
      }

      if (this.name === this.category.name) {
        this.$toast.error('تغییری اعمال نشده است!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        return
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('category/edit', category)
        this.isLoading = false

        this.$toast.success('دسته با موفقیت ویرایش شد!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })

        this.$router.push(`/profile/category/${this.category.id}`)
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
        })
      }
    },
  },

  async fetch() {
    if (this.categories.length === 0) {
      try {
        this.isLoading = true
        await this.$store.dispatch('category/fetchCategories')
        this.isLoading = false

        this.setCategory()
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
        })
      }
    } else {
      this.setCategory()
    }
  },
}
</script>