<template>
  <v-navigation-drawer
    :value="$store.state.system.drawer"
    @input="$store.commit('system/SET_DRAWER', $event)"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-col class="text-center">
            <v-avatar color="purple" size="50" align-self="center" v-if="userLoged">
              <span class="white--text text-h5">{{ $store.state.session.user.email[0].toUpperCase() }}</span></v-avatar
            >
            <v-avatar color="grey" size="50" align-self="center" v-else> <v-icon>mdi-account</v-icon></v-avatar>
          </v-col>
          <v-list-item-title class="text-center text-body-1 ma-1" v-if="userLoged">
            {{ $store.state.session.user.email }}
          </v-list-item-title>
          <v-btn class="text-center mt-2 pa-0" @click="logOut()" outlined v-if="userLoged">
            Cerrar sesion <span class="ml-1"><v-icon small>mdi-logout</v-icon></span></v-btn
          >
          <v-btn class="text-center mt-2 pa-0" to="/login" outlined v-else>
            Iniciar sesion <span class="ml-1"><v-icon small>mdi-login</v-icon></span></v-btn
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-spacer></v-spacer>

    <v-list>
      <v-list-item v-for="(item, i) in navListItems" :key="i" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    miniVariant: false,
    clipped: false,
    items: [
      {
        icon: 'mdi-login',
        title: 'Login',
        to: '/login'
      },
      {
        icon: 'mdi-account-plus',
        title: 'Registrarse',
        to: '/sign-in'
      }
    ],
    logedItems: [
      {
        icon: 'mdi-apps',
        title: 'Inicio',
        to: '/home'
      },
      {
        icon: 'mdi-account-multiple-check',
        title: 'Administración',
        to: '/admin'
      }
    ]
  }),
  computed: {
    navListItems() {
      return this.$store.state.session.user === null ? this.items : this.logedItems
    },
    userLoged() {
      return this.$store.state.session.user === null ? false : true
    }
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
