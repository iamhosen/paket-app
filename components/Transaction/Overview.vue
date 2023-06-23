<template>
  <div class="flex flex-col gap-4 bg-[#282828] px-4 py-5 mb-5">
    <div class="flex justify-between gap-2">
      <div
        class="w-100 flex flex-wrap grow basis-0.5 justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
      >
        <div
          class="bg-primary-paket w-8 h-8 flex justify-center items-center rounded-lg rotate-180"
          v-html="arrow"
        ></div>
        <div>
          <h4 class="text-xs">پرداختی</h4>
          <span class="text-lg font-bold">
            {{ currency(withdraws) }}
          </span>
        </div>
      </div>
      <div
        class="w-100 flex flex-wrap grow basis-0.5 justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
      >
        <div
          class="bg-[#248A3D] w-8 h-8 flex justify-center items-center rounded-lg"
          v-html="arrow"
        ></div>
        <div>
          <h4 class="text-xs">دریافتی</h4>
          <span class="text-lg font-bold">
            {{ currency(deposits) }}
          </span>
        </div>
      </div>
    </div>
    <div class="tab-body flex flex-col gap-4 mx-1">
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40 ltr">کل دوره</span>
        <span
          :class="
            total > 0 ? 'bg-[#248A3D] bg-opacity-25 px-1' : 'text-primary-paket'
          "
        >
          {{ currency(total) }}
        </span>
      </div>
      <div class="w-full flex justify-between items-center">
        <span class="opacity-40">مانده دوره های قبل</span>
        <span class="opacity-80 text-base">
          {{ currency(lastMonth) }}
        </span>
      </div>
    </div>

    <BaseChart v-if="categories" :categories="categories"></BaseChart>
  </div>
</template>

<script>
import { arrow } from '@/assets/icons.js'

export default {
  data() {
    return {
      arrow,
    }
  },
  props: {
    deposits: {
      type: Number,
      required: true,
    },
    withdraws: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    lastMonth: {
      type: Number,
      required: true,
    },
    categories: {
      type: Object,
      required: false,
    },
  },
}
</script>