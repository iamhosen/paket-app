export default function ({ redirect, route, store }) {
    const token = localStorage.getItem('token')
    const expiresAt = localStorage.getItem('expiresAt') * 1000

    if (token || (expiresAt && expiresAt < new Date().getTime())) {
        return redirect('/')
    }
}