<template>
  <div>
    <!-- header -->
    <div class="w-full flex justify-between items-center h-[40px] mb-6 px-4">
      <nuxt-link to="" v-html="plus"></nuxt-link>
      <h1 class="text-2xl font-bold">دسته بندی ها</h1>
      <a @click="$router.go(-1)" v-html="back"></a>
    </div>

    <!-- tabs -->
    <div class="tab-head mb-5 mx-4">
      <ul
        class="flex flex-row rounded-lg justify-between bg-[#767680] p-1 bg-opacity-25 gap-1 cursor-pointer"
      >
        <li
          class="w-1/2 text-center py-1"
          :class="isIncome"
          @click="changeTab('income')"
        >
          دریافتی
        </li>
        <li
          class="w-1/2 text-center py-1 border-r-2 border-[#545458] border-opacity-50"
          :class="isExpense"
          @click="changeTab('expense')"
        >
          پرداختی
        </li>
      </ul>
    </div>

    <!-- items -->
    <div class="bg-bg-input-paket rounded-[14px] mx-4">
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
      <nuxt-link
        to=""
        class="flex items-center mx-4 py-4 gap-4 border-b-[.5px] border-[#545458] border-opacity-60"
      >
        <div v-html="sub"></div>
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
import { back, plus, sub } from '@/assets/icons.js'
export default {
  data() {
    return {
      back,
      plus,
      sub,
      activeTab: 'income',
    }
  },
  computed: {
    isIncome() {
      return this.activeTab === 'income' ? 'bg-primary-paket rounded-lg' : ''
    },
    isExpense() {
      return this.activeTab === 'expense' ? 'bg-primary-paket rounded-lg' : ''
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>