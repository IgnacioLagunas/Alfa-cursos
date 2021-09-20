<template>
  <div>
    <v-row justify="center" class="my-4">
      <h1>Administración</h1>
    </v-row>

    <CursosTabla />
    <v-row class="justify-end my-6 mr-2">
      <AgregarCursoBtn />
    </v-row>

    <AlertSection />
  </div>
</template>

<script>
import CursosTabla from '../components/CursosTabla.vue'
import AgregarCursoBtn from '../components/AgregarCursoBtn.vue'
import AlertSection from '../components/AlertSection.vue'
export default {
  components: {
    CursosTabla,
    AgregarCursoBtn,
    AlertSection
  }
}
</script>

<style></style>
