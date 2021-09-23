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
    async getCursos(context) {
      const firebaseApp = context.rootState.system.firebase

      let querySnapshot = await Firebase.firestore(firebaseApp).collection('cursos').get()
      let data = []
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }))
      context.commit('SET_DATA', data)
    },

    // Intenté traer la firestore de otra forma como se puede ver en la funcion comentada de abajo y en el import comentado de arriba, pero no hubo caso de que funcionara.
    // Lo dejo asi por que es la unica forma que me funcionó.

    //async getCursos(context) {
    //   Firebase.firestore(firebaseApp)
    //     .collection('cursos').doc(curso.id).delete()
    // context.dispatch('getCursos')
    // },

    async borrarCurso(context, curso) {
      const firebaseApp = context.rootState.system.firebase

      Firebase.firestore(firebaseApp).collection('cursos').doc(curso.id).delete()
      context.dispatch('getCursos')
    },

    async getCurso(context, id) {
      context.commit('UNSET_CURSO')
      const firebaseApp = context.rootState.system.firebase

      let doc = await Firebase.firestore(firebaseApp).collection('cursos').doc(id).get()
      console.log(doc)
      context.commit('SET_CURSO', { id: doc.id, ...doc.data() })
    },

    async actualizarCurso(context, curso) {
      const firebaseApp = context.rootState.system.firebase

      await Firebase.firestore(firebaseApp).collection('cursos').doc(context.state.curso.id).update(curso)
      context.dispatch('getCursos')
    },
    async crearCurso(context, nuevoCurso) {
      const firebaseApp = context.rootState.system.firebase

      await Firebase.firestore(firebaseApp).collection('cursos').add(nuevoCurso)
    }
  }
}
