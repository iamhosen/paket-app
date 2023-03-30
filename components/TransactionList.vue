<template>
  <div>
    <div class="flex flex-col gap-4 bg-[#282828] px-4 py-5 mb-5">
      <div class="flex justify-between gap-2">
        <div
          class="w-100 flex flex-wrap grow justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
        >
          <div
            class="bg-primary-paket w-8 h-8 flex justify-center items-center rounded-lg rotate-180"
            v-html="arrow"
          ></div>
          <div>
            <h4 class="text-xs">پرداختی</h4>
            <span class="text-lg font-bold">۷۷,۳۴۵,۶۷۸ </span>
          </div>
        </div>
        <div
          class="w-100 flex flex-wrap grow justify-start items-center bg-bg-paket p-4 rounded-[10px] gap-[10px]"
        >
          <div
            class="bg-[#248A3D] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="arrow"
          ></div>
          <div>
            <h4 class="text-xs">دریافتی</h4>
            <span class="text-lg font-bold">۷۷,۳۴۵,۶۷۸ </span>
          </div>
        </div>
      </div>
      <div class="tab-body flex flex-col gap-4 mx-1">
        <div class="w-full flex justify-between items-center">
          <span class="opacity-40">کل دوره</span>
          <span class="bg-[#248A3D] bg-opacity-25 px-1">۷۷,۳۴۵,۶۷۸</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="opacity-40">مانده دوره های قبل</span>
          <span class="opacity-80 text-base">۷۷,۳۴۵,۶۷۸</span>
        </div>
      </div>
    </div>

    <div class="day">
      <header
        class="flex justify-between px-4 py-[10px] text-[14px] border-b-[1px] border-[#3C3C43]"
      >
        <h3 class="font-bold">شنبه ۲۷ فروردین</h3>
        <span class="opacity-60">۷۷,۳۴۵,۶۷۸</span>
      </header>

      <div class="transactions p-4 flex flex-col gap-3">
        <div
          class="transaction p-4 bg-box-paket rounded-[13px] flex gap-3 items-start"
          @click="open"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="back"
          ></div>

          <div class="grow flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <h1 class="text-base">خوراکی</h1>
              <p class="text-xs opacity-30">بلوبانک | توضیحات اضافی...</p>
            </div>
            <span>۷۷,۳۴۵,۶۷۸</span>
          </div>
        </div>
        <div
          class="transaction p-4 bg-box-paket rounded-[13px] flex gap-3 items-start"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="back"
          ></div>

          <div class="grow flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <h1 class="text-base">خوراکی</h1>
              <p class="text-xs opacity-30">بلوبانک | توضیحات اضافی...</p>
            </div>
            <span>۷۷,۳۴۵,۶۷۸</span>
          </div>
        </div>
        <div
          class="transaction p-4 bg-box-paket rounded-[13px] flex gap-3 items-start"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="back"
          ></div>

          <div class="grow flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <h1 class="text-base">خوراکی</h1>
              <p class="text-xs opacity-30">بلوبانک | توضیحات اضافی...</p>
            </div>
            <span>۷۷,۳۴۵,۶۷۸</span>
          </div>
        </div>
      </div>
    </div>
    <div class="day">
      <header
        class="flex justify-between px-4 py-[10px] text-[14px] border-b-[1px] border-[#3C3C43]"
      >
        <h3 class="font-bold">شنبه ۲۷ فروردین</h3>
        <span class="opacity-60">۷۷,۳۴۵,۶۷۸</span>
      </header>

      <div class="transactions p-4 flex flex-col gap-3">
        <div
          class="transaction p-4 bg-box-paket rounded-[13px] flex gap-3 items-start"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="back"
          ></div>

          <div class="grow flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <h1 class="text-base">خوراکی</h1>
              <p class="text-xs opacity-30">بلوبانک | توضیحات اضافی...</p>
            </div>
            <span>۷۷,۳۴۵,۶۷۸</span>
          </div>
        </div>
        <div
          class="transaction p-4 bg-box-paket rounded-[13px] flex gap-3 items-start"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="back"
          ></div>

          <div class="grow flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <h1 class="text-base">خوراکی</h1>
              <p class="text-xs opacity-30">بلوبانک | توضیحات اضافی...</p>
            </div>
            <span>۷۷,۳۴۵,۶۷۸</span>
          </div>
        </div>
        <div
          class="transaction p-4 bg-box-paket rounded-[13px] flex gap-3 items-start"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="back"
          ></div>

          <div class="grow flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <h1 class="text-base">خوراکی</h1>
              <p class="text-xs opacity-30">بلوبانک | توضیحات اضافی...</p>
            </div>
            <span>۷۷,۳۴۵,۶۷۸</span>
          </div>
        </div>
      </div>
    </div>

    <transaction ref="swipeableBottomSheet"> </transaction>
  </div>
</template>

<script>
import { arrow, back } from '@/assets/icons.js'
import Transaction from '@/components/Transaction.vue'

export default {
  components: {
    Transaction,
  },
  data() {
    return { arrow, back, selectedTransaction: null }
  },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openTransaction(transaction) {
      this.selectedTransaction = transaction
      this.$refs.swipeableBottomSheet.setState('open')
    },
    open() {
      this.$refs.swipeableBottomSheet.setState('open')
    },
  },
  mounted() {
    this.$refs.swipeableBottomSheet.setState('close')
  },
}
</script>