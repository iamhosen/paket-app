<template>
  <div class="h-screen flex flex-col items-center">
    <img
      src="../assets/logo.svg"
      alt="پاکت"
      class="logo mt-[100px] mb-[50px]"
    />
    <div class="w-full px-6">
      <nuxt />
    </div>
    <p
      class="creator-tag text-xs tracking-widest font-medium mt-16 text-white opacity-30"
    >
      Packet by Hossein Amirhosseini
    </p>
  </div>
</template>

<style scoped>
.creator-tag {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>