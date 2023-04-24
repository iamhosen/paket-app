<template>
  <div
    class="fixed z-50 w-full -translate-x-1/2 border-t-[0.5px] border-[#828282] bottom-0 pb-4 left-1/2 bg-bg-paket"
  >
    <div class="h-16">
      <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
        <nuxt-link
          to="/profile"
          class="nav-item inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          v-html="iconProfile"
        >
        </nuxt-link>
        <nuxt-link
          to="/analysis"
          class="nav-item inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          v-html="iconDocs"
        >
        </nuxt-link>
        <nuxt-link
          to="/transaction/new"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          v-html="iconPlus"
        >
        </nuxt-link>
        <nuxt-link
          to="/transaction"
          class="nav-item-t inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          v-html="iconTrans"
        >
        </nuxt-link>
        <nuxt-link
          to="/"
          class="nav-item inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          v-html="iconHome"
        >
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  iconHome,
  iconTrans,
  iconPlus,
  iconDocs,
  iconProfile,
} from '@/assets/icons.js'
export default {
  data() {
    return {
      iconHome,
      iconTrans,
      iconPlus,
      iconDocs,
      iconProfile,
    }
  },
}
</script>

<style lang="scss">
.nav-item.nuxt-link-exact-active {
  svg path {
    fill: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 25px;
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background-color: var(--primary-color);
  }
}
.nav-item-t.nuxt-link-exact-active {
  svg path {
    stroke: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 25px;
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background-color: var(--primary-color);
  }
}
</style>