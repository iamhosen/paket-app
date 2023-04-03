<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <loadingSpinner class="h-16 w-16"></loadingSpinner>
    </div>
    <div v-else>
      <the-header
        title="ویرایش منبع"
        :trash="true"
        @delete="deleteBank"
      ></the-header>

      <form @submit.prevent="editBank" class="px-4">
        <div
          class="bg-[#1F1F1F] flex flex-col gap-4 justify-start p-4 rounded-xl mb-4"
        >
          <div class="opacity-50">نوع</div>
          <div class="flex gap-8">
            <span class="flex items-center gap-2">
              <input
                type="radio"
                id="cash"
                name="type"
                value="cash"
                v-model="bank.entity_type"
                :disabled="bank.entity_type !== 'cash'"
                class="bg-transparent"
              />
              <label class="opacity-50" for="cash"> نقدی</label>
              <input
                type="radio"
                id="bank"
                name="type"
                value="bank"
                v-model="bank.entity_type"
                :disabled="bank.entity_type !== 'bank'"
                class="bg-transparent"
              />
              <label class="opacity-50" for="bank"> بانک</label>
            </span>
          </div>
        </div>

        <div
          v-if="bank.entity_type === 'bank'"
          class="flex items-center p-4 bg-[#1F1F1F] rounded-xl mb-4 justify-between"
        >
          <div class="flex items-center">
            <img
              class="w-8 h-8 ml-2 rounded-full"
              v-if="bank.icon"
              :src="bank.icon"
            />
            {{ bank.name }}
          </div>
        </div>

        <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8">
          <label class="opacity-50">موجودی</label>
          <div class="flex gap-2 grow">
            <input
              class="focus:outline-none bg-transparent text-left grow"
              type="number"
              required
              inputmode="numeric"
              disabled
              v-model="bank.total_amount"
            />
            <span class="opacity-50">ریال</span>
          </div>
        </div>

        <h3 class="opacity-50 mb-2">جزییات</h3>
        <div
          v-if="bank.entity_type === 'bank'"
          class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4"
        >
          <label class="opacity-50">شماره کارت</label>
          <input
            v-model="card_number"
            :placeholder="card_number"
            type="number"
            inputmode="numeric"
            class="ltr font-xero text-left grow focus:outline-none bg-transparent placeholder:opacity-50"
            autofocus
          />
        </div>

        <textarea
          v-model="description"
          :placeholder="bank.description ?? 'توضیحات'"
          rows="5"
          class="w-full bg-[#1F1F1F] rounded-xl p-4 placeholder:text-[#8F8F8F] mb-8 focus:outline-none"
        >
        </textarea>

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
import TheHeader from '@/components/ui/TheHeader.vue'
import DropDown from '~/components/ui/DropDown.vue'
import loadingSpinner from '@/components/ui/loadingSpinner.vue'

export default {
  components: {
    TheHeader,
    DropDown,
    loadingSpinner,
  },
  data() {
    return {
      isLoading: false,

      bank: null,
      card_number: null,
      description: null,
    }
  },
  computed: {
    ...mapGetters('bank', ['getBankById']),
    ...mapGetters('bank', ['banks']),
  },
  methods: {
    setBank() {
      const route = this.$route.params.id.split('/').pop()
      this.bank = this.getBankById(route)
      this.card_number = this.bank.card_number
      this.description = this.bank.description
    },
    deleteBank() {
      if (confirm('آیا از حذف این منبع مطمئن هستید؟')) {
        try {
          this.isLoading = true
          this.$store.dispatch('bank/delete', this.bank.id)
          this.isLoading = false

          this.$toast.success('منبع با موفقیت حذف شد!', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
          this.$router.push('/profile/source')
        } catch (e) {
          this.$toast.error(e, {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 3000,
          })
        }
      }
    },
    async editBank() {
      const bank = {
        id: this.bank.id,
      }

      if (this.card_number !== this.bank.card_number)
        bank.card_number = this.card_number
      if (this.description !== this.bank.description)
        bank.description = this.description

      if (!bank.card_number && !bank.card_number) {
        this.$toast.error('تغییری اعمال نشده است!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        return
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('bank/edit', bank)
        this.isLoading = false

        this.$toast.success('منبع با موفقیت ویرایش شد!', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })

        this.$router.push(`/profile/source/${this.bank.id}`)
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
    if (this.banks.length === 0) {
      try {
        this.isLoading = true
        await this.$store.dispatch('bank/fetchBanks')
        this.isLoading = false

        this.setBank()
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
        })
      }
    } else {
      this.setBank()
    }
  },
}
</script>