<template>
  <div>
    <the-header title="برچسب جدید"></the-header>

    <form action="" class="px-4">
      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
        <input
          type="text"
          class="focus:outline-none bg-transparent placeholder:opacity-50"
          autofocus
          placeholder="نام برچسب"
          required
        />
      </div>

      <!-- Submit Button -->
      <button
        class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
      >
        ایجاد برچسب
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