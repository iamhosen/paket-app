export const state = () => ({
    banks: []
})

export const getters = {
    banks: state => state.banks,

    getBankById: (state) => (id) => state.banks.find(bank => bank.id == id),
    getBankByName: (state) => (name) => state.banks.find(bank => bank.name == name),
    getAccountTotal: (state) => {
        let sum = 0
        state.banks.forEach((bank)=> {
            sum += bank.total_amount
        })
        return sum
    }

}

export const mutations = {
    setBanks(state, banks) {
        state.banks = banks
    },
}

export const actions = {
    async fetchBanks({ commit }) {
        const { data, error } = await this.$supabase
            .from('Banks')
            .select('*')

        if (error) {
            throw new Error(error.message)
        }

        commit('setBanks', data)
    },
    async create({ commit }, bank) {
        const { data, error } = await this.$supabase
            .from('Banks')
            .insert(bank)

        if (error) {
            throw new Error(error.message)
        }

        commit('setBanks', data)
    },
    async edit({ dispatch }, bank) {
        const { data, error } = await this.$supabase
            .from('Banks')
            .update(bank)
            .match({ id: bank.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchBanks')
    },
    async delete({ dispatch }, id) {
        const { data, error } = await this.$supabase
            .from('Banks')
            .delete()
            .match({ id: id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchBanks')
    },
    async updateBankTotal({ dispatch, getters, rootGetters }, bankId) {
        const bank = getters['getBankById'](bankId)

        //get all transactions of bank
        const transactions = rootGetters['transaction/getTransactionByBankId'](bankId)

        //total amount of transactions
        let total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        total += bank.initial_amount

        const { data, error } = await this.$supabase
            .from('Banks')
            .update({ total_amount: total })
            .match({ id: bank.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchBanks')
    }

}