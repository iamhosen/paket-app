export const state = () => ({
    categories: []
})

export const getters = {
    categories: state => state.categories,
    deposites: state => state.categories.filter(category => category.type === 'deposit'),
    withdraws: state => state.categories.filter(category => category.type === 'withdraw'),

    getCategoryById: (state) => (id) => state.categories.find(category => category.id == id)
}

export const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },
}

export const actions = {
    async fetchCategories({ commit }) {
        const { data, error } = await this.$supabase
            .from('Categories')
            .select('*')

        if (error) {
            throw new Error(error.message)
        }

        commit('setCategories', data)
    },
    async create({ commit }, category) {
        const { data, error } = await this.$supabase
            .from('Categories')
            .insert(category)

        if (error) {
            throw new Error(error.message)
        }

        commit('setCategories', data)
    },
    async edit({ dispatch }, category) {
        const { data, error } = await this.$supabase
            .from('Categories')
            .update(category)
            .match({ id: category.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchCategories')
    },
    async delete({ dispatch }, id) {
        const { data, error } = await this.$supabase
            .from('Categories')
            .delete()
            .match({ id: id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchCategories')
    }
    //getTransactions
}