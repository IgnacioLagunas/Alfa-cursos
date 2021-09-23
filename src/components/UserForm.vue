<template>
  <v-row>
    <v-col>
      <v-form @submit.prevent="handleLoginFormSubmit" ref="form" outlined>
        <v-text-field
          name="email"
          placeholder="E-mail"
          type="email"
          v-model="email"
          :rules="[(v) => !!v || 'Este campo es obligatorio']"
        ></v-text-field>
        <v-text-field
          name="password"
          placeholder="Password"
          type="password"
          :counter="20"
          v-model="password"
          :rules="[(v) => !!v || 'Este campo es obligatorio']"
        ></v-text-field>
        <v-row justify="center" class="mt-4">
          <v-btn class="text-center mt-2" large color="success darken-2" dark type="submit">
            {{ registro ? 'registrar usuario' : 'iniciar sesión' }}
          </v-btn>
        </v-row>
        <v-row justify="center" class="mt-8">
          <div class="text-subtitle-1 grey--text" v-if="!registro">
            Si no tienes una cuenta puedes registrarte
            <span class="purple--text subtitle" @click="$router.push('/sign-in')">aquí</span>
          </div>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null
  }),
  props: {
    registro: Boolean
  },
  methods: {
    handleLoginFormSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', { email: this.email, password: this.password })
      }
    }
  }
}
</script>

<style>
.subtitle {
  cursor: pointer;
}
.subtitle:hover {
  border-bottom: 1px purple solid;
}
</style>
