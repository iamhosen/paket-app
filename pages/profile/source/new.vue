<template>
  <div>
    <BaseHeader title="منبع جدید"></BaseHeader>

    <form @submit.prevent="createBank" class="px-4">
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
              v-model="type"
              class="bg-transparent"
            />
            <label class="opacity-50" for="cash"> نقدی</label>
            <input
              type="radio"
              id="bank"
              name="type"
              value="bank"
              v-model="type"
              class="bg-transparent"
            />
            <label class="opacity-50" for="bank"> بانک</label>
          </span>
        </div>
      </div>

      <drop-down
        v-if="type === 'bank'"
        title="بانک"
        :items="availableBanks"
        @selected="setBank"
      ></drop-down>

      <div class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-8">
        <label class="opacity-50">موجودی</label>
        <div class="flex gap-2 grow">
          <input
            class="focus:outline-none bg-transparent text-left grow"
            type="number"
            required
            inputmode="numeric"
            autofocus
            v-model="total"
          />
          <span class="opacity-50">ریال</span>
        </div>
      </div>

      <h3 class="opacity-50 mb-2">جزییات</h3>
      <div
        v-if="type === 'bank'"
        class="bg-[#1F1F1F] flex justify-between p-4 rounded-xl mb-4"
      >
        <label class="opacity-50">شماره کارت</label>
        <input
          v-model="cardNumber"
          type="number"
          inputmode="numeric"
          class="font-xero text-left grow focus:outline-none bg-transparent placeholder:opacity-50"
          autofocus
        />
      </div>

      <textarea
        v-model="description"
        placeholder="توضیحات"
        rows="5"
        class="w-full bg-[#1F1F1F] rounded-xl p-4 placeholder:text-[#8F8F8F] mb-8 focus:outline-none"
      >
      </textarea>

      <!-- Submit Button -->
      <button
        v-if="!isLoading"
        type="submit"
        class="w-full bg-primary-paket rounded-[14px] py-4 font-bold flex justify-center items-center gap-2"
      >
        ایجاد منبع جدید
      </button>
      <button
        v-else
        class="w-full py-3.5 border-0 border-primary-paket text-primary-paket bg-primary-paket bg-opacity-10 rounded-xl flex justify-center items-center"
      >
        <loading-spinner />
      </button>
    </form>
  </div>
</template>

<script>
import TheHeader from '~/components/Base/Header.vue'
import DropDown from '~/components/Base/DropDown.vue'
import LoadingSpinner from '@/components/Base/LoadingSpinner.vue'

export default {
  components: {
    TheHeader,
    DropDown,
    LoadingSpinner,
  },
  data() {
    return {
      availableBanks: [
        {
          id: 1,
          key: 'BLUBANK',
          title: 'بلوبانک',
          color: '#CD323C',
        },
        {
          id: 2,
          key: 'SAMAN',
          title: 'سامان',
          color: '#0075BC',
        },
        {
          id: 3,
          key: 'PASARGAD',
          title: 'پاسارگاد',
          color: '#F3B23E',
        },
        {
          id: 4,
          key: 'SADERAT',
          title: 'صادرات',
          color: '#00006F',
        },
      ],

      isLoading: false,

      type: 'bank',
      bank: null,
      total: 0,
      cardNumber: null,
      description: '',
    }
  },

  methods: {
    setBank(bank) {
      this.bank = bank
    },
    async createBank() {
      let data

      if (this.type === 'bank') {
        data = {
          user_id: this.$store.getters['auth/user'].id,
          key: this.bank.key,
          name: this.bank.title,
          entity_type: this.type,
          total_amount: this.total,
          initial_amount: this.total,
          card_number: this.cardNumber,
          description: this.description,
        }
      } else {
        data = {
          user_id: this.$store.getters['auth/user'].id,
          name: 'نقدی',
          entity_type: this.type,
          total_amount: this.total,
          initial_amount: this.total,
          description: this.description,
        }
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('bank/create', data)
        this.isLoading = false

        this.$toast.success('منبع جدید با موفقیت ایجاد شد.', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
        this.$router.push('/profile/source')
      } catch (err) {
        this.$toast.error(err, {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 3000,
        })
      }
    },
  },
}
</script>