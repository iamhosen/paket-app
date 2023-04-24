<template>
  <div>
    <header class="w-full flex flex-col justify-center items-center my-5">
      <div
        class="ltr flex items-center flex-row-reverse gap-2 text-4xl font-bold"
      >
        {{ transaction.amount }}
        <span class="text-base font-thin opacity-50">ریال</span>
      </div>
      <div class="ltr opacity-50">{{ date }}</div>
    </header>
    <div class="px-4 mb-5">
      <div class="flex justify-between gap-4 mb-5">
        <nuxt-link
          :to="`/profile/source/${bank.id}`"
          class="w-100 flex flex-wrap grow justify-start items-center bg-box-paket p-4 rounded-[10px] gap-[10px]"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg rotate-180"
            v-html="arrow"
          ></div>
          <div class="flex flex-col gap-1">
            <h4 class="text-xs opacity-30">منبع</h4>
            <span class="text-lg">{{ bank.name }} </span>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="`/profile/category/${category.id}`"
          class="w-100 flex flex-wrap grow justify-start items-center bg-box-paket p-4 rounded-[10px] gap-[10px]"
        >
          <div
            class="bg-[#5E5CE6] w-8 h-8 flex justify-center items-center rounded-lg"
            v-html="arrow"
          ></div>
          <div class="flex flex-col gap-1">
            <h4 class="text-xs opacity-30">دسته</h4>
            <span class="text-lg">{{ category.name }}</span>
          </div>
        </nuxt-link>
      </div>

      <div
        v-if="transaction.description || tag"
        class="w-100 flex flex-col flex-wrap items-start bg-box-paket p-4 rounded-[10px] gap-[10px]"
      >
        <p class="opacity-50 mb-4">
          {{ transaction.description }}
        </p>

        <div
          v-if="tag"
          class="p-2 text-sm bg-opacity-5 bg-[#ffffff] rounded-md text-[#949494]"
        >
          # {{ tag.title }}
        </div>
      </div>
    </div>
    <div class="px-4 flex justify-center gap-3 items-stretch">
      <button
        class="bg-primary-paket bg-opacity-10 px-5 rounded-[14px]"
        v-html="trash"
        @click="deleteTransaction(transaction)"
      ></button>
      <nuxt-link
        :to="`/transaction/${transaction.id}/edit`"
        class="border-[1px] border-primary-paket rounded-[14px] grow py-4 font-bold text-primary-paket flex justify-center items-center gap-2"
      >
        <span v-html="editOrange" class="fill-primary-paket"></span>
        ویرایش
      </nuxt-link>
    </div>

    <pre class="text-[12px] opacity-40 p-4">{{ transaction.sms }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { arrow, editOrange, trash } from '@/assets/icons.js'

export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('bank', ['getBankById']),
    ...mapGetters('category', ['getCategoryById']),
    ...mapGetters('tag', ['getTagById']),
    date() {
      return this.transaction.date.replace('T', ' | ').replace(/-/g, '/')
    },
    bank() {
      return this.getBankById(this.transaction.bank_id)
    },
    category() {
      return this.getCategoryById(this.transaction.category_id)
    },
    tag() {
      return this.transaction.tag_id
        ? this.getTagById(this.transaction.tag_id)
        : null
    },
  },
  data() {
    return {
      arrow,
      editOrange,
      trash,
      isLoading: false,
    }
  },
  inject: ['deleteTransaction'],
}
</script>