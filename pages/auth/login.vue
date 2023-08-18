<template>
  <div>
    <form @submit.prevent="login" class="mb-8">
      <div
        class="paket-form bg-[#1c1c1e] w-full border-2 border-opacity-20 border-primary rounded-xl px-4 mb-5"
      >
        <input
          v-model="email"
          type="email"
          id="email"
          class="paket-form__input w-full bg-transparent py-4 focus:outline-none border-b-[0.5px] border-[#38383A]"
          placeholder="ایمیل"
          required
        />

        <input
          v-model="password"
          type="password"
          id="password"
          class="paket-form__input w-full bg-transparent border-none py-4 focus:outline-none"
          placeholder="رمز عبور"
          required
        />
      </div>
      <button
        type="submit"
        v-if="!isLoading"
        class="w-full py-3.5 bg-primary rounded-xl text-center"
      >
        ورود به حساب
      </button>
      <button
        v-else
        class="w-full py-3.5 border-0 border-primary text-primary bg-primary bg-opacity-10 rounded-xl flex justify-center items-center"
      >
        <loading-spinner />
      </button>
    </form>

    <div class="flex justify-center items-center opacity-20 mb-8">
      <hr class="w-full" />
      <p class="mx-4">یا</p>
      <hr class="w-full" />
    </div>

    <nuxt-link
      to="/auth/register"
      class="block w-full py-3.5 border-2 border-primary text-primary bg-primary bg-opacity-10 rounded-xl text-center"
    >
      ساخت حساب جدید
    </nuxt-link>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'
export default {
  layout: 'auth',
  middleware: ['auth'],

  components: {
    LoadingSpinner,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.state.isLoading
      },
      set(newValue) {
        this.$store.commit('setLoading', newValue)
      },
    },
  },
  methods: {
    async login() {
      this.isLoading = true

      const user = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store
          .dispatch('auth/login', user)
          .then(() => this.$router.push('/'))
          .then(() =>
            this.$toast.show('با موفقیت وارد شدید!', {
              theme: 'toasted-primary',
              position: 'top-center',
              duration: 3000,
            })
          )
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
      }

      this.isLoading = false
    },
  },
}
</script>