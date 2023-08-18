<template>
  <div class="mb-32">
    <BaseHeader title="تراکنش جدید" />

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else>
      <picker
        :tabs="[
          { id: 'deposit', title: 'دریافتی', color: '#248A3D' },
          { id: 'withdraw', title: 'پرداختی' },
          { id: 'transition', title: 'جیب به جیب', color: '#007AFF' },
        ]"
        value="withdraw"
        @changeTab="changeTab"
      ></picker>

      <form @submit.prevent="createTransaction" class="px-4">
        <!-- Total -->
        <div
          class="bg-[#1F1F1F] flex justify-between px-4 py-8 rounded-xl mb-4"
        >
          <label class="opacity-50" for="total">مبلغ</label>
          <div class="flex gap-2 grow">
            <input
              v-model="inputTotal"
              name="total"
              id="total"
              class="ltr focus:outline-none bg-transparent text-left grow"
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
          color="#5227CC"
          type="datetime"
          class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8"
        >
          <div slot="label">
            <span class="opacity-50">تاریخ</span>
          </div>
        </date-picker>

        <!-- Income Expense Fields -->
        <div v-if="type !== 'transition'">
          <drop-down
            title="دسته"
            type="category"
            :items="type === 'deposit' ? deposites : withdraws"
            @selected="setCategoty"
          ></drop-down>

          <drop-down
            title="منبع"
            type="source"
            :items="banks"
            @selected="setSource"
          ></drop-down>
        </div>

        <!-- Transform Fields -->
        <div v-if="type === 'transition'">
          <drop-down
            label="انتقال از"
            title="منبع"
            type="source"
            :items="banks"
            @selected="setSource"
          ></drop-down>
          <drop-down
            label="انتقال به"
            title="منبع"
            type="source"
            :items="banks"
            @selected="setToSource"
          ></drop-down>
          <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4">
            <div>
              <input type="checkbox" v-model="wage" class="bg-transparent" />
              <label class="opacity-50"> کارمزد</label>
            </div>
            <div class="flex gap-2 grow">
              <input
                v-model="wageTotal"
                type="number"
                name="wageTotal"
                id="wageTotal"
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
          :items="tags"
          @selected="setTag"
        ></drop-down>

        <!-- Submit Button -->
        <div
          class="fixed z-50 px-4 pt-2 pb-6 w-full -translate-x-1/2 border-t-[0.5px] border-[#828282] bottom-0  left-1/2 bg-back"
        >
          <button
            class="w-full bg-primary rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
          >
            ثبت تراکنش
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Picker from '@/components/Base/Picker.vue'
import DropDown from '@/components/Base/DropDown.vue'
import TheHeader from '@/components/Base/Header.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import { numberFormat, toEnglishNumber } from '@/helpers/number'

export default {
  layout: 'add',

  components: {
    Picker,
    DropDown,
    TheHeader,
    LoadingSpinner,
    datePicker: VuePersianDatetimePicker,
  },

  data() {
    return {
      isLoading: false,

      type: 'deposit',

      total: null,
      date: '',
      description: '',

      wage: false,
      wageTotal: 6000,
      selectedCategory: null,
      selectedSource: null,
      selectedToSource: null,
      selectedTag: null,
    }
  },
  computed: {
    activeTab: {
      get() {
        return this.type
      },
      set(newValue) {
        this.type = newValue
      },
    },

    inputTotal: {
      get() {
        return numberFormat(this.total ?? 0)
      },
      set(newValue) {
        newValue = newValue.split(',').join('')

        //contains persian numbers
        if (/[\u06F0-\u06F9]/.test(newValue)) {
          newValue = toEnglishNumber(newValue)
        }

        //contains non numeric characters
        if (!/^\d+$/.test(newValue)) {
          newValue = '0'
        }
        this.total = newValue
      },
    },

    withdraws() {
      const withdraws = this.$store.getters['category/withdraws']
      return withdraws.map((withdraw) => {
        return {
          id: withdraw.id,
          title: withdraw.name,
        }
      })
    },
    deposites() {
      const deposites = this.$store.getters['category/deposites']
      return deposites.map((deposit) => {
        return {
          id: deposit.id,
          title: deposit.name,
        }
      })
    },
    banks() {
      const banks = this.$store.getters['bank/banks']
      return banks.map((bank) => {
        return {
          id: bank.id,
          title: bank.name,
          total_amount: bank.total_amount,
        }
      })
    },
    tags() {
      return this.$store.getters['tag/tags']
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab

      this.wage = false
      this.wageTotal = 6000
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

    async createTransaction() {
      if (this.type === 'transition') {
        // data.type = 'transition'
        this.doTransition()
      } else {
        this.doTransaction()
      }
    },
    async doTransaction() {
      let transaction = {
        user_id: this.$store.getters['auth/user'].id,
        date: this.date,
        sms: null,
        description: this.description,
      }

      transaction.category_id = this.selectedCategory.id
      transaction.bank_id = this.selectedSource.id
      if (this.selectedTag) transaction.tag_id = this.selectedTag.id

      if (this.type === 'deposit') transaction.amount = this.total
      else transaction.amount = -this.total

      try {
        this.isLoading = true
        await this.$store.dispatch('transaction/create', transaction)
        this.isLoading = false

        this.$toast.success('تراکنش با موفقیت ثبت شد.', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        this.$router.push('/transaction')
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
      }
    },
    async doTransition() {
      let outTransaction = {
        user_id: this.$store.getters['auth/user'].id,
        date: this.date,
        sms: null,
        category_id: 16,
        description: this.description,
        bank_id: this.selectedSource.id,
        amount: -this.total,
      }
      let inTransaction = {
        user_id: this.$store.getters['auth/user'].id,
        date: this.date,
        sms: null,
        category_id: 16,
        description: this.description,
        bank_id: this.selectedToSource.id,
        amount: +this.total,
      }

      if (this.selectedTag) {
        outTransaction.tag_id = this.selectedTag.id
        inTransaction.tag_id = this.selectedTag.id
      }

      try {
        this.isLoading = true
        this.$store.dispatch('transaction/createTransition', {
          inTransaction,
          outTransaction,
          wageTotal: this.wage ? this.wageTotal : null,
        })
        this.isLoading = false

        this.$toast.success('تراکنش با موفقیت ثبت شد.', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        this.$router.push('/transaction')
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
      }
    },

    numberFormat,
    toEnglishNumber,
  },

  async fetch() {
    try {
      this.isLoading = true
      await this.$store.dispatch('loadUserData')
      this.isLoading = false
    } catch (err) {
      this.$toast.error(err, {
        theme: 'toasted-primary',
        position: 'top-center',
        duration: 10000,
      })
    }
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
