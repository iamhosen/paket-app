<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else>
      <the-header
        title="ویرایش برچسب"
        :trash="true"
        @delete="deleteTag"
      ></the-header>

      <form @submit.prevent="editTag" class="px-4">
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
          ثبت تغییرات
        </button>
        <button
          v-else
          class="w-full py-3.5 border-0 border-primary-paket text-primary-paket bg-primary-paket bg-opacity-10 rounded-xl flex justify-center items-center"
        >
          <loading-spinner />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '@/components/ui/TheHeader.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TheHeader,
    loadingSpinner,
  },

  data() {
    return {
      isLoading: false,

      tag: null,

      title: null,
    }
  },
  computed: {
    ...mapGetters('tag', ['getTagById']),
    ...mapGetters('tag', ['tags']),
  },
  methods: {
    setTag() {
      const route = this.$route.params.id.split('/').pop()
      this.tag = this.getTagById(route)
      this.title = this.tag.title
    },
    deleteTag() {
      if (confirm('آیا از حذف این برچسب مطمئن هستید؟')) {
        try {
          this.isLoading = true
          this.$store.dispatch('tag/delete', this.tag.id)
          this.isLoading = false

          this.$toast.success('برچسب با موفقیت حذف شد!', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
          this.$router.push('/profile/tag')
        } catch (e) {
          this.$toast.error(e, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
        }
      }
    },
    async editTag() {
      const tag = {
        id: this.tag.id,
        title: this.title,
      }

      if (this.title === this.tag.title) {
        this.$toast.error('تغییری اعمال نشده است!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        return
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('tag/edit', tag)
        this.isLoading = false

        this.$toast.success('برچسب با موفقیت ویرایش شد!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })

        this.$router.push(`/profile/tag/${this.tag.id}`)
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
    if (this.tags.length === 0) {
      try {
        this.isLoading = true
        await this.$store.dispatch('tag/fetchTags')
        this.isLoading = false

        this.setTag()
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
        })
      }
    } else {
      this.setTag()
    }
  },
}
</script>