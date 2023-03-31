<template>
  <div>
    <the-header title="دسته بندی جدید"></the-header>

    <form action="" class="px-4">
      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
        <input
          type="text"
          class="focus:outline-none bg-transparent placeholder:opacity-50"
          autofocus
          placeholder="نام دسته"
          required
        />
      </div>

      <div
        class="bg-[#1F1F1F] flex flex-col gap-4 justify-start p-4 rounded-xl mb-4"
      >
        <div class="opacity-50">نوع</div>
        <div class="flex gap-8">
          <span class="flex items-center gap-2">
            <input type="checkbox" class="bg-transparent" />
            <label class="opacity-50"> پرداختی</label>
          </span>
          <span class="flex items-center gap-2">
            <input type="checkbox" class="bg-transparent" />
            <label class="opacity-50"> دریافتی</label>
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
      >
        ایجاد دسته بندی
      </button>
    </form>
  </div>
</template>

<script>
import TheHeader from '~/components/ui/TheHeader.vue'

export default {
  components: {
    TheHeader,
  },
}
</script>