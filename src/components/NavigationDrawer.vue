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
          <UserCard :userLoged="userLoged" />
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
import UserCard from './UserCard.vue'

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
  components: {
    UserCard
  },
  computed: {
    navListItems() {
      return this.$store.state.session.user === null ? this.items : this.logedItems
    },
    userLoged() {
      return this.$store.state.session.user === null ? false : true
    }
  }
}
</script>

<style></style>
