<template>
  <div>
    <form action="" class="mb-8">
      <div
        class="paket-form bg-[#1c1c1e] w-full border-2 border-opacity-20 border-[#EB5340] rounded-xl px-4 mb-5"
      >
        <input
          type="name"
          id="name"
          class="paket-form__input w-full bg-transparent py-4 focus:outline-none border-b-[0.5px] border-[#38383A]"
          placeholder="نام"
          required
        />

        <input
          type="email"
          id="email"
          class="paket-form__input w-full bg-transparent py-4 focus:outline-none border-b-[0.5px] border-[#38383A]"
          placeholder="ایمیل"
          required
        />

        <input
          type="password"
          id="password"
          class="paket-form__input w-full bg-transparent border-none py-4 focus:outline-none"
          placeholder="رمز عبور"
          required
        />
      </div>
      <button
        type="button"
        class="w-full py-3.5 bg-primary-paket rounded-xl text-center"
      >
        ثبت نام
      </button>
    </form>

    <div class="flex justify-center items-center opacity-20 mb-8">
      <hr class="w-full" />
      <p class="mx-4">یا</p>
      <hr class="w-full" />
    </div>

    <nuxt-link
      to="/auth/login"
      class="block w-full py-3.5 border-2 border-primary-paket text-primary-paket bg-primary-paket bg-opacity-10 rounded-xl text-center"
    >
      ورود به حساب
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
}
</script>

<style lang="scss" scoped>
.paket-form {
  &__input {
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: white !important;
      background-clip: content-box !important;
      -webkit-box-shadow: 0 0 0 30px #1c1c1e inset !important;
      box-shadow: 0 0 0px 1000px #1c1c1e inset !important;
      background-color: #1c1c1e !important;
    }
  }
}
</style>