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

    <transaction ref="swipeableBottomSheet">
      <h1>Lorem Ipsum</h1>
      <h2>What is Lorem Ipsum?</h2>
      <p>
        <strong>Lorem Ipsum</strong> is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <h2>Where does it come from?</h2>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
      <h2>Why do we use it?</h2>
      <p>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </p>
    </transaction>
  </div>
</template>

<script>
import { arrow, back } from '@/assets/icons.js'
import TransactionVue from './Transaction.vue'

export default {
  components: {
    TransactionVue,
    // SwipeableBottomSheet,
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