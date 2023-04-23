import { parseBlu, parseSaman, parsePasargad, parseSaderat } from '../helpers/sms'

export const state = () => ({
    notifications: []
})

export const getters = {
    notifications: state => state.notifications,

    getNotificationById: (state) => (id) => state.notifications.find(notification => notification.id == id)
}

export const mutations = {
    setNotifications(state, notifications) {
        state.notifications = notifications
    },
}

export const actions = {
    async fetchNotifications({ commit, rootGetters }) {
        const { data, error } = await this.$supabase
            .from('Notifications')
            .select('*')
            .eq('status', false)

        if (error) {
            throw new Error(error.message)
        }

        data.forEach(notification => {
            const bankNames = [
                'پاسارگاد',
                'سامان',
                'صادرات',
                'بلو',
                // Add more bank names here if needed
            ];

            let bank = null;
            let bankId = null
            let amount = null;
            let date = null;
            let type = null;

            // Check if the SMS contains a bank name
            bankNames.forEach(name => {
                if (notification.content.includes(name)) {
                    bank = name;
                }
            });

            switch (bank) {
                case 'بلو':
                    ({ date, type, amount } = parseBlu(notification.content));
                    bank = 'بلوبانک'
                    break;
                case 'سامان':
                    ({ date, type, amount } = parseSaman(notification.content));
                    break;
                case 'پاسارگاد':
                    ({ date, type, amount } = parsePasargad(notification.content));
                    break;
                case 'صادرات':
                    ({ date, type, amount } = parseSaderat(notification.content));
                    break;
            }

            notification.bank = bank;
            notification.bankId = rootGetters['bank/getBankByName'](bank).id
            notification.amount = amount;
            notification.date = date;
            notification.type = type;

        });

        commit('setNotifications', data)
    },
    async delete({ dispatch }, notification) {
        const { data, error } = await this.$supabase
            .from('Notifications')
            .update(notification)
            .match({ id: notification.id })

        if (error) {
            throw new Error(error.message)
        }

        await dispatch('fetchNotifications')
    },
}