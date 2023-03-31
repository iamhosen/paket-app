<template>
  <div class="mb-32">
    <the-header title="تراکنش جدید" />

    <!-- Tabs -->
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
      <!-- Price -->
      <div class="bg-[#1F1F1F] flex justify-between px-4 py-8 rounded-xl mb-4">
        <label class="opacity-50" for="price ">مبلغ</label>
        <div class="flex gap-2 grow">
          <input
            v-model="price"
            type="number"
            name="price"
            id="price"
            class="focus:outline-none bg-transparent text-left grow"
            required
            inputmode="numeric"
            autofocus
          />
          <span class="opacity-50">ریال</span>
        </div>
      </div>

      <!-- Date  -->
      <date-picker
        v-model="date"
        color="#EB5340"
        type="datetime"
        class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8"
      >
        <div slot="label">
          <span class="opacity-50">تاریخ</span>
        </div>
      </date-picker>

      <!-- Income Expense Fields -->
      <div v-if="!isTransform">
        <drop-down
          title="دسته"
          type="category"
          :items="[
            { id: 1, title: 'خوراکی', icon: '/_nuxt/assets/profile.png' },
          ]"
          @selected="setCategoty"
        ></drop-down>

        <drop-down
          title="منبع"
          type="source"
          :items="[
            { id: 1, title: 'بلوبانک', icon: '/_nuxt/assets/profile.png' },
          ]"
          @selected="setSource"
        ></drop-down>
      </div>

      <!-- Transform Fields -->
      <div v-if="isTransform">
        <drop-down
          label="انتقال از"
          title="منبع"
          type="source"
          :items="[
            { id: 1, title: 'بلوبانک', icon: '/_nuxt/assets/profile.png' },
          ]"
          @selected="setSource"
        ></drop-down>
        <drop-down
          label="انتقال به"
          title="منبع"
          type="source"
          :items="[
            { id: 1, title: 'بلوبانک', icon: '/_nuxt/assets/profile.png' },
          ]"
          @selected="setToSource"
        ></drop-down>
        <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
          <div>
            <input type="checkbox" v-model="wage" class="bg-transparent" />
            <label class="opacity-50"> کارمزد</label>
          </div>
          <div class="flex gap-2 grow">
            <input
              v-model="wagePrice"
              type="number"
              name="price"
              id="price"
              class="focus:outline-none bg-transparent text-left grow"
              required
              inputmode="numeric"
              autofocus
              :disabled="!wage"
            />
            <span class="opacity-50">ریال</span>
          </div>
        </div>
      </div>

      <textarea
        v-model="description"
        placeholder="توضیحات"
        rows="5"
        class="w-full bg-[#1F1F1F] rounded-xl p-4 text-[#8F8F8F] mb-8 focus:outline-none"
      >
      </textarea>

      <drop-down
        title="برچسب"
        type="tag"
        :items="[{ id: 1, title: 'قرار', icon: '/_nuxt/assets/profile.png' }]"
        @selected="setTag"
      ></drop-down>

      <!-- Submit Button -->
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
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import TheHeader from '@/components/ui/TheHeader.vue'
import DropDown from '@/components/ui/DropDown.vue'

export default {
  layout: 'add',
  components: {
    datePicker: VuePersianDatetimePicker,
    TheHeader,
    DropDown,
  },

  data() {
    return {
      activeTab: 'income',
      price: 0,
      date: '',
      description: '',

      wage: false,
      wagePrice: 6000,
      selectedCategory: null,
      selectedSource: null,
      selectedToSource: null,
      selectedTag: null,
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
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
      this.wage = false
      this.wagePrice = 6000
      this.selectedSource = null
    },
    setCategoty(category) {
      this.selectedCategory = category
    },
    setSource(source) {
      this.selectedSource = source
    },
    setTag(tag) {
      this.selectedTag = tag
    },
    setToSource(toSource) {
      this.selectedToSource = toSource
    },
  },
}
</script>

<style lang="scss">
.vpd-content,
.vpd-addon-list {
  background-color: #1f1f1f;
}

.vpd-next svg path,
.vpd-prev svg path {
  // color: white;
  fill: white;
}

.vpd-input-group {
  width: 100%;
  label {
    background-color: transparent !important;
    padding: 0;
  }

  input {
    flex-grow: 1;
    outline: none;
    border: none;
    background-color: transparent !important;
    text-align: left;
  }
}
</style>>
