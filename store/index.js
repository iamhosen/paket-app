export const state = () => ({

})

export const actions = {
    async loadUserData({ state, dispatch }) {
        console.log('loadUserDate is loading ...');
        //load transactions
        if (!state.transaction.transactions.length)
            await dispatch('transaction/fetchTransactions')
        //load tags
        if (!state.tag.tags.length)
            await dispatch('tag/fetchTags')
        //load categories
        if (!state.category.categories.length)
            await dispatch('category/fetchCategories')
        //load banks
        if (!state.bank.banks.length)
            await dispatch('bank/fetchBanks')
    }
}