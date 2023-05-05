export const state = () => ({
    isLoading: false
})

export const mutations = {
    setLoading(state, loading) {
        state.isLoading = loading
    },
}

export const actions = {
    async loadUserData({ state, dispatch, commit }) {
        //load transactions
        if (!state.transaction.transactions?.length) {
            commit('setLoading', true)
            await dispatch('transaction/fetchTransactions')
        }
        //load tags
        if (!state.tag.tags?.length) {
            commit('setLoading', true)
            await dispatch('tag/fetchTags')
        }
        //load categories
        if (!state.category.categories?.length) {
            commit('setLoading', true)
            await dispatch('category/fetchCategories')
        }
        //load banks
        if (!state.bank.banks?.length) {
            commit('setLoading', true)
            await dispatch('bank/fetchBanks')
        }
        //load notifications
        if (!state.notification.notifications?.length) {
            commit('setLoading', true)
            await dispatch('notification/fetchNotifications')
        }
        commit('setLoading', false)
    }
}