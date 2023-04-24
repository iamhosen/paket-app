<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <LoadingSpinner class="h-16 w-16"></LoadingSpinner>
    </div>
    <div v-else>
      <BaseHeader
        title="ویرایش تراکنش"
        :trash="true"
        @delete="deleteTransaction"
      ></BaseHeader>

      <!-- <picker
        :value="type == 'deposit' ? 'deposit' : 'withdraw'"
        :tabs="[
          { id: 'deposit', title: 'دریافتی', color: '#248A3D' },
          { id: 'withdraw', title: 'پرداختی' },
        ]"
        @changeTab="changeTab"
      ></picker> -->
      <form @submit.prevent="editTransaction" class="px-4">
        <div
          class="bg-[#1F1F1F] flex justify-between px-4 py-8 rounded-xl mb-4"
        >
          <label class="opacity-50" for="total">مبلغ</label>
          <div class="flex gap-2 grow">
            <input
              v-model="total"
              type="number"
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
          color="#EB5340"
          type="datetime"
          class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8"
        >
          <div slot="label">
            <span class="opacity-50">تاریخ</span>
          </div>
        </date-picker>

        <drop-down
          title="دسته"
          type="category"
          :items="type === 'deposit' ? deposites : withdraws"
          @selected="setCategory"
          :default="categoryId"
        ></drop-down>

        <drop-down
          title="منبع"
          type="source"
          :items="banks"
          @selected="setSource"
          :default="sourceId"
        ></drop-down>

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
          :default="tagId"
        ></drop-down>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
        >
          ثبت تغییرات
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '~/components/Base/Header.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'
import Picker from '@/components/Base/Picker.vue'
import DropDown from '@/components/Base/DropDown.vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

export default {
  components: {
    TheHeader,
    LoadingSpinner,
    Picker,
    datePicker: VuePersianDatetimePicker,
    DropDown,
  },
  data() {
    return {
      isLoading: false,
      transaction: null,

      type: null,
      total: null,
      date: null,
      description: null,

      categoryId: null,
      sourceId: null,
      tagId: null,
    }
  },
  computed: {
    ...mapGetters('transaction', ['getTransactionById']),
    ...mapGetters('transaction', ['transactions']),
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
    setTransaction() {
      const route = this.$route.params.id.split('/').pop()
      this.transaction = this.getTransactionById(route)

      this.type = this.transaction.amount > 0 ? 'deposit' : 'withdraw'
      this.total =
        this.transaction.amount > 0
          ? this.transaction.amount
          : -this.transaction.amount
      this.data = this.transaction.date
      this.description = this.transaction.description
      this.categoryId = this.transaction.category_id
      this.sourceId = this.transaction.bank_id
      this.tagId = this.transaction.tag_id
    },
    // changeTab(tab) {
    //   this.type = tab
    // },
    setCategory(category) {
      this.categoryId = category?.id
    },
    setSource(source) {
      this.sourceId = source?.id
    },
    setTag(tag) {
      this.tagId = tag?.id
    },
    async deleteTransaction() {
      if (confirm('آیا از حذف این تراکنش مطمئن هستید؟')) {
        try {
          this.isLoading = true
          await this.$store.dispatch('transaction/delete', this.transaction)
          this.isLoading = false

          this.$toast.success('نراکنش با موفقیت حذف شد!', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })

          this.$router.go(-1)
        } catch (e) {
          this.$toast.error(e, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
        }
      }
    },
    async editTransaction() {
      const transction = {
        id: this.transaction.id,
        amount: this.type == 'withdraw' ? -this.total : this.total,
        bank_id: this.sourceId,
        category_id: this.categoryId,
        date: this.transaction.date,
        description: this.description,
        tag_id: this.tagId,
      }

      if (
        !this.date &&
        this.total === this.transaction.amount &&
        this.description == this.transaction.description &&
        this.sourceId === this.transaction.bank_id &&
        this.categoryId === this.transaction.category_id &&
        this.tagId === this.transaction.tag_id
      ) {
        this.$toast.error('تغییری اعمال نشده است!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        return
      }

      if (this.date) {
        transction.date = this.date
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('transaction/edit', transction)
        await this.$store.dispatch(
          'bank/updateBankTotal',
          this.transaction.bank_id
        )

        this.isLoading = false

        this.$toast.success('تراکنش با موفقیت ویرایش شد!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        this.$router.go(-1)
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
        })
      }
    },
  },

  async fetch() {
    try {
      this.isLoading = true
      await this.$store.dispatch('loadUserData')
      this.setTransaction()
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