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

        //update bank total
        const bank = rootGetters['bank/getBankById'](transaction.bank_id)
        await dispatch('bank/updateBankTotal', {
            bank,
            amount: transaction.amount,
            isDelelte: transaction.amount < 0 ? true : false
        }, { root: true })

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
    },
    async createTransition({ dispatch, rootGetters }, { inTransaction, outTransaction, wageTotal = null }) {
        await dispatch('create', inTransaction)
        await dispatch('create', outTransaction)

        //wage
        if (wageTotal) {
            await dispatch('create', {
                user_id: rootGetters['auth/user'].id,
                date: inTransaction.date,
                sms: null,
                category_id: 16,
                description: inTransaction.description,
                bank_id: inTransaction.bank_id,
                amount: -wageTotal
            })
        }
    }
}