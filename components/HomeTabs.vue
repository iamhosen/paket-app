<template>
  <div class="tab-wrapper mx-4 bg-box-paket p-4 rounded-2xl">
    <div class="tab-head mb-5">
      <ul
        class="flex flex-row rounded-lg justify-between bg-[#767680] p-1 bg-opacity-25 gap-1 cursor-pointer"
      >
        <li
          class="w-4/12 text-center py-1"
          :class="isDay"
          @click="changeTab('day')"
        >
          امروز
        </li>
        <li
          class="w-4/12 text-center py-1 border-x-2 border-[#545458] border-opacity-50"
          :class="isWeek"
          @click="changeTab('week')"
        >
          این هفته
        </li>
        <li
          class="w-4/12 text-center py-1"
          :class="isMonth"
          @click="changeTab('month')"
        >
          این ماه
        </li>
      </ul>
    </div>
    <div class="tab-body flex flex-col gap-4 mx-1">
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">کل دوره</span>
        <span class="bg-[#248A3D] bg-opacity-25 px-1">۷۷,۳۴۵,۶۷۸</span>
      </div>
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">پرداختی</span>
        <span class="opacity-80 text-base">۷۷,۳۴۵,۶۷۸</span>
      </div>
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">دریافتی</span>
        <span class="opacity-80 text-base">۷۷,۳۴۵,۶۷۸</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'day',
    }
  },
  computed: {
    isDay() {
      return this.activeTab === 'day' ? 'bg-primary-paket rounded-lg' : ''
    },
    isWeek() {
      return this.activeTab === 'week' ? 'bg-primary-paket rounded-lg' : ''
    },
    isMonth() {
      return this.activeTab === 'month' ? 'bg-primary-paket rounded-lg' : ''
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>