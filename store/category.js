export const state = () => ({
    categories: []
})

export const getters = {
    categories: state => state.categories,
    deposites: state => state.categories.filter(category => category.type === 'deposit'),
    withdraws: state => state.categories.filter(category => category.type === 'withdraw'),

    getCategoryById: (state) => (id) => state.categories.find(category => category.id == id),


    getCategoryOverviewByMonth: (_, getters, __, rootGetters) => (id) => {
        let month = rootGetters['transaction/getTransactionsByMonth'][id]
        let monthTransactions = []
        let monthCategories = []

        month.days.forEach((m) => {
            monthTransactions.push(...m.transactions)
        })

        monthTransactions.forEach((tr) => {
            if (tr.category_id === 16 || tr.amount > 0) return

            let amount = -tr.amount
            let category = monthCategories.find((mc) => mc.id === tr.category_id)

            if (!category) {
                // If not, create a new day object
                category = {
                    id: tr.category_id,
                    title: getters.getCategoryById(tr.category_id).name,
                    sum: 0,
                }
                monthCategories.push(category)
            }

            category.sum += amount
        })

        const labels = []
        const values = []
        monthCategories.forEach((c) => {
            // labels.push(`${c.title}: ${Number(c.sum).toLocaleString('en-US')}`)
            labels.push(c.title)
            values.push(c.sum)
        })

        return { labels, values }
    }
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