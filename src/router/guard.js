import store from '../store'

function checkAuth(to, from, next) {
    if (to.meta.requiresAuth) {
        if (store.state.loggedIn) next()
        else next({ name: 'sign-in' })
    } else next()
}

export default checkAuth