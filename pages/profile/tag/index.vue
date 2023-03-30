<template>
  <div>
    <div class="w-full flex justify-between items-center h-[40px] mb-6 px-4">
      <nuxt-link to="" v-html="plus"></nuxt-link>
      <h1 class="text-2xl font-bold">برچسب ها</h1>
      <a @click="$router.go(-1)" v-html="back"></a>
    </div>

    <!-- items -->
    <div class="bg-bg-input-paket rounded-[14px] mx-4">
      <nuxt-link
        to="/profile/tag/id"
        class="flex items-center mx-4 py-4 gap-4 border-b-[.5px] border-[#545458] border-opacity-60"
      >
        <div
          class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
          v-html="back"
        ></div>
        <span class="py-2">خوراکی</span>
      </nuxt-link>

      <nuxt-link
        to=""
        class="flex items-center mx-4 py-4 gap-4 border-b-[.5px] border-[#545458] border-opacity-60"
      >
        <div
          class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
          v-html="back"
        ></div>
        <span class="py-2">خوراکی</span>
      </nuxt-link>
      <nuxt-link to="" class="flex items-center mx-4 py-4 gap-4">
        <div
          class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
          v-html="back"
        ></div>
        <span class="py-2">خوراکی</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { back, plus } from '@/assets/icons.js'
export default {
  data() {
    return {
      back,
      plus,
    }
  },
}
</script>