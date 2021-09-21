import Firebase from 'firebase'

export const session = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {},
  mutations: {
    SET_USER(state, newUser) {
      state.user = newUser
    }
  },
  actions: {
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        Firebase.auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password)
          .then((data) => {
            context.commit('SET_USER', data.user)
            resolve()
          }, reject)
      })
    },
    createUser(context, credentials) {
      return new Promise((resolve, reject) => {
        Firebase.auth()
          .createUserWithEmailAndPassword(credentials.email, credentials.password)
          .then((data) => {
            context.commit('SET_USER', data.user)
            resolve()
          }, reject)
      })
    },
    logOut(context) {
      Firebase.auth()
        .signOut()
        .then(() => {
          console.log('saliendo')
        })
      context.commit('SET_USER', null)
    }
  }
}
