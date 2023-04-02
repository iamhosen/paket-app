export default function ({ redirect, route, store }) {
    const token = localStorage.getItem('token')
    const expiresAt = localStorage.getItem('expiresAt') * 1000


    if (!token && route.path !== '/auth/login' && route.path !== '/auth/register') {
        return redirect('/auth/login')
    }

    if (token || (expiresAt && expiresAt < new Date().getTime())) {
        store.dispatch('auth/tryLogin')
    }
}