export const state = () => ({
    tags: []
})

export const getters = {
    tags: state => state.tags,

    getTagById: (state) => (id) => state.tags.find(tag => tag.id == id)
}

export const mutations = {
    setTags(state, tags) {
        state.tags = tags
    },
}

export const actions = {
    async fetchTags({ commit }) {
        const { data, error } = await this.$supabase
            .from('Tags')
            .select('*')

        if (error) {
            throw new Error(error.message)
        }

        commit('setTags', data)
    },
    async create({ commit }, tag) {
        const { data, error } = await this.$supabase
            .from('Tags')
            .insert(tag)

        if (error) {
            throw new Error(error.message)
        }

        commit('setTags', data)
    },
    async edit({ dispatch }, tag) {
        const { data, error } = await this.$supabase
            .from('Tags')
            .update(tag)
            .match({ id: tag.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchTags')
    },
    async delete({ dispatch }, id) {
        const { data, error } = await this.$supabase
            .from('Tags')
            .delete()
            .match({ id: id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchTags')
    }
    //getTransactions
}