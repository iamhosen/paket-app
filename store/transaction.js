export const state = () => ({
    transactions: []
})

export const getters = {
    transactions: state => state.transactions,

    getTransactionById: (state) => (id) => state.transactions.find(transaction => transaction.id == id),
    getTransactionByBankId: (state) => (id) => state.transactions.filter(transaction => transaction.bank_id == id)
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
    async create({ dispatch, rootGetters }, transaction) {
        const { data, error } = await this.$supabase
            .from('Transactions')
            .insert(transaction)

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchTransactions')
        await dispatch('bank/updateBankTotal', transaction.bank_id, { root: true })
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
        await dispatch('bank/updateBankTotal', transaction.bank_id, { root: true })

    },
    async delete({ dispatch }, transaction) {
        const { data, error } = await this.$supabase
            .from('Transactions')
            .delete()
            .match({ id: transaction.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchTransactions')
        await dispatch('bank/updateBankTotal', transaction.bank_id, { root: true })

    },
    async createTransition({ dispatch, rootGetters }, { inTransaction, outTransaction, wageTotal = null }) {
        await dispatch('create', outTransaction)
        await dispatch('create', inTransaction)

        //wage
        if (wageTotal) {
            await dispatch('create', {
                user_id: rootGetters['auth/user'].id,
                date: outTransaction.date,
                sms: null,
                category_id: 15,
                description: inTransaction.description,
                bank_id: outTransaction.bank_id,
                amount: -wageTotal
            })
        }
    }
}