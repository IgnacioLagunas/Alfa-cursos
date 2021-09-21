<template>
  <v-container>
    <v-col class="text-center">
      <v-avatar color="purple" size="50" align-self="center" v-if="userLoged">
        <span class="white--text text-h5">{{ $store.state.session.user.email[0].toUpperCase() }}</span></v-avatar
      >
      <v-avatar color="grey" size="50" align-self="center" v-else> <v-icon>mdi-account</v-icon></v-avatar>
    </v-col>
    <v-text class="text-center text-body-1 ma-1" v-if="userLoged">
      {{ $store.state.session.user.email }}
    </v-text>
    <v-row justify="center" class="mt-2">
      <v-btn class="text-center mt-2" @click="logOut()" outlined v-if="userLoged">
        Cerrar sesion <span class="ml-1"><v-icon small>mdi-logout</v-icon></span></v-btn
      >
      <v-btn class="text-center mt-2" to="/login" outlined v-else>
        Iniciar sesion <span class="ml-1"><v-icon small>mdi-login</v-icon></span></v-btn
      >
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    userLoged: Boolean
  },
  methods: {
    logOut() {
      this.$store.dispatch('session/logOut')
      this.$router.push('login')
    }
  }
}
</script>
<style></style>
