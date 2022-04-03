import store from '../store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function checkAuth(to, from, next) {
    let init = new Promise(resolve => resolve(false))

    if (store.state.loggedIn === null) {
        // Start loading
        store.commit('setLoadingOverlay', true)

        // Initialize firebase authentication
        init = new Promise(resolve => {
            const auth = getAuth()

            onAuthStateChanged(auth, user => {
                if (user) {
                    const userData = {
                        email: user.email,
                    };

                    store.commit("setUser", userData);
                    store.commit("setLoggedIn", true);
                } else {
                    store.commit("resetState");
                }

                resolve(true)
            })
        })
    }

    init.then(() => {
        if (to.meta.requiresAuth) {
            if (store.state.loggedIn) next()
            else next({ name: 'sign-in' })
        } else next()
    }).finally(() => {
        store.commit('setLoadingOverlay', false)
    })
}

export default checkAuth