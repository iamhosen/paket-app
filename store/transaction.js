export const state = () => ({
    transactions: []
})

export const getters = {
    transactions: state => state.transactions,

    getTransactionById: (state) => (id) => state.transactions.find(transaction => transaction.id == id)
}

export const mutations = {
    setTransactions(state, transactions) {
        state.transactions = transactions
    },
}

export const actions = {
    async fetchTransactions({ commit }) {
        const { data, error } = await this.$supabase
            .from('Transactions')
            .select('*')

        if (error) {
            throw new Error(error.message)
        }

        commit('setTransactions', data)
    },
    async create({ dispatch, root }, transaction) {
        const { data, error } = await this.$supabase
            .from('Transactions')
            .insert(transaction)

        if (error) {
            throw new Error(error.message)
        }
        await dispatch('fetchTransactions')
    },
    async edit({ dispatch }, transaction) {
        const { data, error } = await this.$supabase
            .from('Transactions')
            .update(transaction)
            .match({ id: transaction.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchTransactions')
    },
    async delete({ dispatch }, id) {
        const { data, error } = await this.$supabase
            .from('Transactions')
            .delete()
            .match({ id: id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchTransactions')
    }
}