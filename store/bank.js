export const state = () => ({
    banks: []
})

export const getters = {
    banks: state => state.banks,
    getBankById: (state) => (id) => state.banks.find(bank => bank.id == id)

}

export const mutations = {
    setBanks(state, banks) {
        state.banks = banks
    }
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

}