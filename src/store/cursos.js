import Firebase from 'firebase'
// import firebaseApp from '../components/firebaseInit'

export const cursos = {
  namespaced: true,
  state: {
    data: [],
    curso: null
  },
  getters: {
    cantidadTotalAlumnosPermitidos(state) {
      let contador = 0
      state.data.forEach((curso) => {
        contador += Number.parseInt(curso.cupos)
      })
      return contador
    },
    cantidadTotalAlumnosInscritos(state) {
      let contador = 0
      state.data.forEach((curso) => {
        contador += Number.parseInt(curso.inscritos)
      })
      return contador
    },
    cantidadTotalCuposRestantes(state) {
      let contador = 0
      state.data.forEach((curso) => {
        contador += Number.parseInt(curso.cupos) - Number.parseInt(curso.inscritos)
      })
      return contador
    },
    cantidadTotalCursosTerminados(state) {
      return state.data.filter((curso) => curso.estado).length
    },
    cantidadTotalCursosActivos(state) {
      return state.data.filter((curso) => !curso.estado).length
    }
  },
  mutations: {
    UNSET_CURSO(state) {
      state.curso = null
    },
    SET_DATA(state, newData) {
      state.data = newData
    },
    SET_CURSO(state, newCurso) {
      state.curso = newCurso
    }
  },
  actions: {
    getCursos(context) {
      // Intenté traer la firestore de otra forma como se puede ver en la funcion comentada de abajo pero no hubo caso de que funcionara.
      // Lo dejo asi por que es la unica forma que me funcionó.
      const firebaseApp = context.rootState.system.firebase
      Firebase.firestore(firebaseApp)
        .collection('cursos')
        .get()
        .then((querySnapshot) => {
          let data = []
          querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }))
          context.commit('SET_DATA', data)
        })
    },
    // getCursos(context) {
    //   Firebase.firestore(firebaseApp)
    //     .collection('cursos')
    //     .get()
    //     .then((querySnapshot) => {
    //       let data = []
    //       querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }))
    //       context.commit('SET_DATA', data)
    //     })
    // },
    borrarCurso(context, curso) {
      const firebaseApp = context.rootState.system.firebase
      Firebase.firestore(firebaseApp)
        .collection('cursos')
        .doc(curso.id)
        .delete()
        .then(() => {
          context.dispatch('getCursos')
        })
    },
    // borrarCurso(context, curso) {
    //   firebaseApp
    //     .firestore()
    //     .collection('cursos')
    //     .doc(curso.id)
    //     .delete()
    //     .then(() => {
    //       context.dispatch('getCursos')
    //     })
    // },
    getCurso(context, id) {
      context.commit('UNSET_CURSO')
      const firebaseApp = context.rootState.system.firebase
      return new Promise((resolve, reject) => {
        Firebase.firestore(firebaseApp)
          .collection('cursos')
          .doc(id)
          .get()
          .then((doc) => {
            context.commit('SET_CURSO', { id: doc.id, ...doc.data() })
            resolve()
          }, reject)
      })
    },
    // getCurso(context, id) {
    //   context.commit('UNSET_CURSO')
    //   console.log('hola')
    //   return new Promise((resolve, reject) => {
    //     firebaseApp
    //       .firestore()
    //       .collection('cursos')
    //       .doc(id)
    //       .get()
    //       .then((doc) => {
    //         context.commit('SET_CURSO', { id: doc.id, ...doc.data() })
    //         resolve()
    //       }, reject)
    //   })
    // },
    actualizarCurso(context, curso) {
      const firebaseApp = context.rootState.system.firebase
      return new Promise((resolve, reject) => {
        Firebase.firestore(firebaseApp)
          .collection('cursos')
          .doc(context.state.curso.id)
          .update(curso)
          .then(() => {
            context.dispatch('getCursos')
            resolve()
          }, reject)
      })
    },
    crearCurso(context, nuevoCurso) {
      const firebaseApp = context.rootState.system.firebase
      return new Promise((resolve, reject) => {
        Firebase.firestore(firebaseApp).collection('cursos').add(nuevoCurso).then(resolve, reject)
      })
    }
  }
}
