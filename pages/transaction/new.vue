<template>
  <div class="mb-32">
    <div class="w-full flex justify-between items-center h-[40px] mb-6 px-4">
      <h1 class="text-2xl font-bold">تراکنش جدید</h1>
      <a @click="$router.go(-1)" v-html="back"></a>
    </div>
    <div class="tab-head mb-5 px-4">
      <ul
        class="flex flex-row rounded-lg justify-between bg-[#767680] p-1 bg-opacity-25 gap-1 cursor-pointer"
      >
        <li
          class="w-4/12 text-center py-1"
          :class="isIncome"
          @click="changeTab('income')"
        >
          دریافتی
        </li>
        <li
          class="w-4/12 text-center py-1 border-x-2 border-[#545458] border-opacity-50"
          :class="isExpense"
          @click="changeTab('expense')"
        >
          پرداختی
        </li>
        <li
          class="w-4/12 text-center py-1"
          :class="isTransform"
          @click="changeTab('transform')"
        >
          جیب به جیب
        </li>
      </ul>
    </div>

    <form action="" class="px-4">
      <div class="bg-[#1F1F1F] flex justify-between px-4 py-8 rounded-xl mb-4">
        <label class="opacity-50" for="price ">مبلغ</label>
        <div class="flex gap-2 grow">
          <input
            type="number"
            name="price"
            id="price"
            class="focus:outline-none bg-transparent text-left grow"
            required
            autofocus
          />
          <span class="opacity-50">ریال</span>
        </div>
      </div>
      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8">
        <label class="opacity-50" for="price ">تاریخ</label>
        <input
          type="number"
          name="price"
          id="price"
          class="focus:outline-none bg-transparent text-left grow"
          required
          autofocus
        />
      </div>

      <div>
        <button
          id="dropdownSearchButton"
          class="flex justify-between items-center w-full p-4 bg-[#1F1F1F] rounded-xl text-center mb-4 text-[#8F8F8F]"
          type="button"
          @click="toggleDropdownCategory"
          v-if="!selectedCategory"
        >
          دسته
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
              src="@/assets/profile.png"
              alt="Jese image"
            />
            خوراکی
          </div>

          <div @click="deleteCategory" v-html="plus" class="rotate-45"></div>
        </div>
        <div
          id="dropdownSearch"
          class="z-10 bg-white rounded-lg shadow w-full bg-box-paket mb-4"
          :class="{
            hidden: !isDropdownCategory,
          }"
        >
          <div class="p-3">
            <label for="input-group-search" class="sr-only">جستجو دسته</label>
            <div class="relative">
              <input
                type="text"
                id="input-group-search"
                class="block w-full p-2 pr-10 text-sm text-[#ffffff] border border-[#6B7280] rounded-lg bg-[#4B5563] focus:outline-none focus:border-[#9CA3AF] placeholder-[#D1D5DB]"
                placeholder="جستجو دسته"
              />
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
            aria-labelledby="dropdownSearchButton"
          >
            <li>
              <a
                href="#"
                class="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="setCategoty('خوراکی')"
              >
                <img
                  class="w-8 h-8 ml-2 rounded-full"
                  src="@/assets/profile.png"
                  alt="Jese image"
                />
                خوراکی
              </a>
            </li>
          </ul>
          <a
            href="#"
            class="flex items-center gap-3 p-3 text-sm font-medium text-primary-paket border-t rounded-b-lg bg-[#312121] border-[#828282] hover:bg-gray-100 dark:bg-gray-700 hover:bg-[#502A27] hover:underline"
          >
            <span v-html="plus"></span>
            افزودن دسته جدید
          </a>
        </div>
      </div>

      <div>
        <button
          id="dropdownSearchButton"
          class="flex justify-between items-center w-full p-4 bg-[#1F1F1F] rounded-xl text-center mb-4 text-[#8F8F8F]"
          type="button"
          @click="toggleDropdownSource"
          v-if="!selectedSource"
        >
          منبع خرج
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
              src="@/assets/profile.png"
              alt="Jese image"
            />
            بلوبانک
          </div>

          <div @click="deleteSource" v-html="plus" class="rotate-45"></div>
        </div>
        <div
          id="dropdownSearch"
          class="z-10 bg-white rounded-lg shadow w-full bg-box-paket mb-4"
          :class="{
            hidden: !isDropdownSource,
          }"
        >
          <div class="p-3">
            <label for="input-group-search" class="sr-only">جستجو دسته</label>
            <div class="relative">
              <input
                type="text"
                id="input-group-search"
                class="block w-full p-2 pr-10 text-sm text-[#ffffff] border border-[#6B7280] rounded-lg bg-[#4B5563] focus:outline-none focus:border-[#9CA3AF] placeholder-[#D1D5DB]"
                placeholder="جستجو منبع"
              />
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
            aria-labelledby="dropdownSearchButton"
          >
            <li>
              <a
                href="#"
                class="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="setSource('بلوبانک')"
              >
                <img
                  class="w-8 h-8 ml-2 rounded-full"
                  src="@/assets/profile.png"
                  alt="Jese image"
                />
                بلوبانک
              </a>
            </li>
          </ul>
          <a
            href="#"
            class="flex items-center gap-3 p-3 text-sm font-medium text-primary-paket border-t rounded-b-lg bg-[#312121] border-[#828282] hover:bg-gray-100 dark:bg-gray-700 hover:bg-[#502A27] hover:underline"
          >
            <span v-html="plus"></span>
            افزودن منبع جدید
          </a>
        </div>
      </div>

      <textarea
        name="description"
        id="description"
        rows="5"
        class="w-full bg-[#1F1F1F] rounded-xl pt-4 text-[#8F8F8F] mb-8"
      >
      توضیحات</textarea
      >

      <div>
        <button
          id="dropdownSearchButton"
          class="flex justify-between items-center w-full p-4 bg-[#1F1F1F] rounded-xl text-center mb-4 text-[#8F8F8F]"
          type="button"
          @click="toggleDropdownTag"
          v-if="!selectedTag"
        >
          برچسب
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
              src="@/assets/profile.png"
              alt="Jese image"
            />
            بلوبانک
          </div>

          <div @click="deleteTag" v-html="plus" class="rotate-45"></div>
        </div>
        <div
          id="dropdownSearch"
          class="z-10 bg-white rounded-lg shadow w-full bg-box-paket mb-4"
          :class="{
            hidden: !isDropdownTag,
          }"
        >
          <div class="p-3">
            <label for="input-group-search" class="sr-only">جستجو برچسب</label>
            <div class="relative">
              <input
                type="text"
                id="input-group-search"
                class="block w-full p-2 pr-10 text-sm text-[#ffffff] border border-[#6B7280] rounded-lg bg-[#4B5563] focus:outline-none focus:border-[#9CA3AF] placeholder-[#D1D5DB]"
                placeholder="جستجو برچسب"
              />
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
            aria-labelledby="dropdownSearchButton"
          >
            <li>
              <a
                href="#"
                class="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="setTag('قرار')"
              >
                <img
                  class="w-8 h-8 ml-2 rounded-full"
                  src="@/assets/profile.png"
                  alt="Jese image"
                />
                قرار
              </a>
            </li>
          </ul>
          <a
            href="#"
            class="flex items-center gap-3 p-3 text-sm font-medium text-primary-paket border-t rounded-b-lg bg-[#312121] border-[#828282] hover:bg-gray-100 dark:bg-gray-700 hover:bg-[#502A27] hover:underline"
          >
            <span v-html="plus"></span>
            افزودن برچسب جدید
          </a>
        </div>
      </div>

      <div
        class="fixed z-50 px-4 w-full -translate-x-1/2 border-t-[0.5px] border-[#828282] bottom-0 pt-2 pb-4 left-1/2 bg-bg-paket"
      >
        <button
          class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
        >
          ثبت تراکنش
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { back, plus } from '@/assets/icons.js'
export default {
  layout: 'add',
  data() {
    return {
      back,
      plus,
      activeTab: 'income',
      dropdownCategory: false,
      dropdownSource: false,
      dropdownTag: false,
      selectedCategory: '',
      selectedSource: '',
      selectedTag: '',
    }
  },

  computed: {
    isIncome() {
      return this.activeTab === 'income' ? 'bg-[#248A3D] rounded-lg' : ''
    },
    isExpense() {
      return this.activeTab === 'expense' ? 'bg-primary-paket rounded-lg' : ''
    },
    isTransform() {
      return this.activeTab === 'transform' ? 'bg-[#007AFF] rounded-lg' : ''
    },
    isDropdownCategory() {
      return this.dropdownCategory
    },
    isDropdownSource() {
      return this.dropdownSource
    },
    isDropdownTag() {
      return this.dropdownTag
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    },
    toggleDropdownCategory() {
      this.dropdownCategory = !this.dropdownCategory
    },
    toggleDropdownSource() {
      this.dropdownSource = !this.dropdownSource
    },
    toggleDropdownTag() {
      this.dropdownTag = !this.dropdownTag
    },
    setCategoty(category) {
      this.selectedCategory = category
      this.toggleDropdownCategory()
    },
    setSource(source) {
      this.selectedSource = source
      this.toggleDropdownSource()
    },
    setTag(tag) {
      this.selectedTag = tag
      this.toggleDropdownTag()
    },
    deleteCategory() {
      this.selectedCategory = ''
    },
    deleteSource() {
      this.selectedSource = ''
    },
    deleteTag() {
      this.selectedTag = ''
    },
  },
}
</script>