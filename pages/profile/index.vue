<template>
  <div>
    <div
      class="w-full flex justify-center items-center h-10 mb-6"
      v-html="paket"
    ></div>

    <div
      class="flex bg-bg-input-paket mx-4 px-4 py-2 gap-4 rounded-[14px] items-center mb-5"
    >
      <img src="@/assets/profile.png" alt="پروفایل" class="h-[100%]" />
      <div class="p-2">
        <h1 class="text-xl font-bold mb-1">{{ user?.name }}</h1>
        <span class="text-sm opacity-50">{{ user?.email }}</span>
      </div>
    </div>

    <div class="mx-4 mb-5">
      <h3 class="mx-4 mb-2 text-[#EBEBF5] opacity-60 text-xs">تنظیمات</h3>
      <div class="bg-bg-input-paket rounded-[14px]">
        <!-- <SettingButton to="/" title="دفترهای خرج" :icon="wallet" /> -->
        <SettingButton to="/profile/source" title="منابع خرج" :icon="source" />
        <SettingButton
          to="/profile/category"
          title="دسته بندی ها"
          :icon="category"
        />
        <SettingButton to="/profile/tag" title="برچسب ها" :icon="tag" />
      </div>
    </div>

    <!-- <div class="mx-4 mb-5">
      <h3 class="mx-4 mb-2 text-[#EBEBF5] opacity-60 text-xs">
        اطلاعات کاربری
      </h3>
      <div class="bg-bg-input-paket rounded-[14px]">
        <SettingButton
          to="/"
          title="ویرایش اطلاعات کاربری"
          color="#FF453A"
          :icon="edit"
        />
        <SettingButton
          to="/"
          title="تغییر رمزعبور"
          color="#FF453A"
          :icon="lock"
        />
        <SettingButton
          to="/"
          title="انتقال اطلاعات"
          color="#FF453A"
          :icon="backup"
        />
      </div>
    </div> -->

    <div class="mx-4 mb-5">
      <div class="bg-bg-input-paket rounded-[14px]">
        <button
          @click="logout"
          to="/auth/login"
          class="flex items-center mx-4 py-3 gap-4"
        >
          <div
            class="bg-[#FF453A] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="exit"
          ></div>
          <span class="py-2">خروج از حساب</span>
        </button>
      </div>
    </div>

    <p
      class="mx-4 pb-8 text-left text-xs tracking-widest font-medium text-white opacity-30"
    >
      Packet by Hossein Amirhosseini
    </p>
  </div>
</template>

<script>
import {
  paket,
  wallet,
  source,
  category,
  tag,
  edit,
  lock,
  backup,
  exit,
} from '@/assets/icons.js'
export default {
  data() {
    return {
      paket,
      wallet,
      source,
      category,
      tag,
      edit,
      lock,
      backup,
      exit,
    }
  },
  computed: {
    user() {
      const user = this.$store.getters['auth/user']

      return {
        name: user?.user_metadata.full_name,
        email: user?.email,
      }
    },
  },

  methods: {
    logout() {
      if (confirm('آیا مطمئن هستید؟')) {
        try {
          this.$store.dispatch('auth/logout').then(() =>
            this.$toast.show('با موفقیت خارج شدید!', {
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
      }
    },
  },

  async fetch() {
    try {
      await this.$store.dispatch('loadUserData')
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