<template>
  <div style="margin-top: 100px">
    <v-row justify="center" class="">
      <v-col sm="4" class="grey lighten-4 pa-12 rounded-lg elevation-5">
        <h1 class="purple--text text--darken-4 mb-6">Registro de Usuario</h1>
        <UserForm @submit="handleCreateUserFormSubmit" :registro="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'

export default {
  components: { UserForm },
  name: 'LoginPage',

  methods: {
    async handleCreateUserFormSubmit(credentials) {
      try {
        await this.$store.dispatch('session/createUser', credentials)
        this.$router.push('/home')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style></style>
