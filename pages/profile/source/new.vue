<template>
  <div>
    <the-header title="منبع جدید"></the-header>

    <form action="" class="px-4">
      <div
        class="bg-[#1F1F1F] flex flex-col gap-4 justify-start p-4 rounded-xl mb-4"
      >
        <div class="opacity-50">نوع</div>
        <div class="flex gap-8">
          <span class="flex items-center gap-2">
            <input type="checkbox" class="bg-transparent" />
            <label class="opacity-50"> نقدی</label>
          </span>
          <span class="flex items-center gap-2">
            <input type="checkbox" class="bg-transparent" />
            <label class="opacity-50"> بانک</label>
          </span>
        </div>
      </div>

      <drop-down
        title="بانک"
        :items="[
          { id: 1, title: 'بلوبانک', icon: '/_nuxt/assets/profile.png' },
          { id: 2, title: 'سامان', icon: '/_nuxt/assets/profile.png' },
        ]"
      >
      </drop-down>

      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8">
        <label class="opacity-50">موجودی</label>
        <div class="flex gap-2 grow">
          <input
            class="focus:outline-none bg-transparent text-left grow"
            type="number"
            required
            inputmode="numeric"
            autofocus
          />
          <span class="opacity-50">ریال</span>
        </div>
      </div>

      <h3 class="opacity-50 mb-2">جزییات</h3>
      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
        <label class="opacity-50">شماره کارت</label>
        <input
          type="number"
          inputmode="numeric"
          class="font-xero text-left grow focus:outline-none bg-transparent placeholder:opacity-50"
          autofocus
        />
      </div>

      <textarea
        placeholder="توضیحات"
        rows="5"
        class="w-full bg-[#1F1F1F] rounded-xl p-4 text-[#8F8F8F] mb-8 focus:outline-none"
      >
      </textarea>

      <!-- Submit Button -->
      <button
        class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
      >
        ایجاد منبع جدید
      </button>
    </form>
  </div>
</template>

<script>
import TheHeader from '~/components/ui/TheHeader.vue'
import DropDown from '~/components/ui/DropDown.vue'

export default {
  components: {
    TheHeader,
    DropDown,
  },
}
</script>