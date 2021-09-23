<template>
  <v-app dark>
    <NavigationDrawer />
    <Toolbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// url del deploy https://alfa-cursos.web.app

import NavigationDrawer from './components/NavigationDrawer.vue'
import Toolbar from './components/Toolbar.vue'
export default {
  components: { NavigationDrawer, Toolbar }
}
</script>
