<template>
  <div>
    <label v-if="label" class="opacity-50 mb-1 block">{{ label }}</label>

    <button
      id="dropdownSearchButton"
      class="flex justify-between items-center w-full p-4 bg-[#1F1F1F] rounded-xl text-center mb-4 text-[#8F8F8F]"
      type="button"
      @click="toggle"
      v-if="!selected"
    >
      {{ title }}
      <svg
        class="w-4 h-4 ml-2"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <div
      v-else
      class="flex items-center p-4 bg-[#1F1F1F] rounded-xl mb-4 justify-between"
    >
      <div class="flex items-center">
        <img
          class="w-8 h-8 ml-2 rounded-full"
          v-if="selected.icon"
          :src="selected.icon"
        />
        {{ selected.title }}
      </div>

      <div @click="reset" v-html="plus" class="rotate-45"></div>
    </div>

    <div
      id="dropdownSearch"
      class="z-10 bg-white rounded-lg shadow w-full bg-box-paket mb-4"
      :class="{
        hidden: !isOpen,
      }"
    >
      <div class="p-3">
        <label for="input-group-search" class="sr-only"
          >جستجو {{ title }}</label
        >
        <div class="relative">
          <input
            type="text"
            id="input-group-search"
            class="block w-full p-2 pr-10 text-sm text-[#ffffff] border border-[#6B7280] rounded-lg bg-[#4B5563] focus:outline-none focus:border-[#9CA3AF] placeholder-[#D1D5DB]"
            :placeholder="`جستجو ${title}`"
          />

          <!-- search icon -->
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="#6B7280"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <ul
        class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
      >
        <li v-for="item in items" :key="item.id">
          <span
            class="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="select(item.id)"
          >
            <img
              class="w-8 h-8 ml-2 rounded-full"
              v-if="item.icon"
              :src="item.icon"
            />
            {{ item.title }}
          </span>
        </li>
      </ul>

      <nuxt-link
        v-if="type"
        :to="`/profile/${type}/new`"
        class="flex items-center gap-3 p-3 text-sm font-medium text-primary-paket border-t rounded-b-lg bg-[#312121] border-[#828282] hover:bg-gray-100 dark:bg-gray-700 hover:bg-[#502A27] hover:underline"
      >
        <span v-html="plus"></span>
        افزودن {{ title }} جدید
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { plus } from '@/assets/icons.js'
export default {
  data() {
    return {
      plus,
      open: false,
      selected: null,
    }
  },
  computed: {
    isOpen() {
      return this.open
    },
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  methods: {
    toggle() {
      this.open = !this.open
    },
    reset() {
      this.selected = null
      this.$emit('selected', null)
    },
    select(id) {
      this.selected = this.items.find((item) => item.id === id)
      this.toggle()
      this.$emit('selected', this.selected)
    },
  },
}
</script>