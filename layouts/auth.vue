<template>
  <div class="h-screen flex flex-col items-center">
    <img
      src="@/assets/logo.svg"
      alt="پاکت"
      class="logo mt-36 mb-16"
    />
    <div class="w-full px-6">
      <nuxt />
    </div>
    <p class="text-xs tracking-widest font-medium mt-16 text-white opacity-30">
      Paket by Hossein Amirhosseini
    </p>
  </div>
</template>

<script>
export default {
  name: 'auth',
}
</script>