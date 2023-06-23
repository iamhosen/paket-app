import { getPersianMonthName } from '../helpers/helper.js'

export const state = () => ({
    transactions: []
})

export const getters = {
    transactions: state => state.transactions,

    getTransactionById: (state) => (id) => state.transactions.find(transaction => transaction.id == id),
    getTransactionByBankId: (state) => (id) => state.transactions.filter(transaction => transaction.bank_id == id),
    getTransactionByCategoryId: (state) => (id) => state.transactions.filter(transaction => transaction.category_id == id),
    getTransactionByTagId: (state) => (id) => state.transactions.filter(transaction => transaction.tag_id == id),

    getTransactionsByDay: (state) => {
        const days = []

        // Loop over all transactions and group them by day
        state.transactions.forEach((transaction) => {
            const dayTitle = transaction.date.split(' ')[0]

            // Check if there's already a day object for this day
            let day = days.find((d) => d.title === dayTitle)
            if (!day) {
                // If not, create a new day object
                day = {
                    title: dayTitle,
                    sum: 0,
                    transactions: [],
                }
                days.push(day)
            }

            // Add the transaction to the day object
            day.sum += transaction.amount // Assuming there's an amount property on each transaction
            day.transactions.push(transaction)
            day.transactions.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
        })

        days.sort((a, b) => {
            const [aYear, aMonth, aDay] = a.title.split('/')
            const [bYear, bMonth, bDay] = b.title.split('/')

            if (aYear !== bYear) return aYear > bYear ? -1 : 1
            else if (aMonth !== bMonth) return aMonth > bMonth ? -1 : 1
            else if (aDay !== bDay) return aDay > bDay ? -1 : 1
            else return 0
        })

        return days
    },

    getTransactionsByMonth: (_, getters) => {
        const months = {}

        // Loop over all days and group them by month
        getters.getTransactionsByDay.forEach((day) => {
            const t = day.title.split('/')
            const monthTitle = `${t[0]} ${getPersianMonthName(t[1])}`
            // Check if there's already a month object for this month
            let month = months[monthTitle]
            if (!month) {
                // If not, create a new month object
                month = {
                    title: monthTitle,
                    days: [],
                    sumOfDeposits: 0,
                    sumOfWithdraws: 0,
                    total: 0,
                }
                months[monthTitle] = month
            }

            // Add the day to the month object
            month.days.push(day)
            day.transactions.forEach((transaction) => {
                if (transaction.category_id === 16) return

                if (transaction.amount > 0) month.sumOfDeposits += transaction.amount
                else month.sumOfWithdraws += transaction.amount

                month.total += transaction.amount
            })
        })

        // Convert the months object to an array and sort it by title
        const sortedMonths = Object.values(months).sort((a, b) => {
            return new Date(`${b.title}/01`) - new Date(`${a.title}/01`)
        })

        return sortedMonths
    },

    getTotalOfPastMonths: (_, getters) => (id) => {
        let months = getters.getTransactionsByMonth.slice(id)
        let sum = 0
        months.forEach((month) => {
            sum += month.total
        })
        return sum
    },

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