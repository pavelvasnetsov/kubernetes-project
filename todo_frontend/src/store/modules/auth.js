export default {
    state: () => ({
        isLogged: false
    }),
    getters: {

    },
    mutations: {
        SET_IS_LOGGED(state, newValue) {
            state.isLogged = newValue;
        }
    },
    actions: {

    },
    namespaced: true
}