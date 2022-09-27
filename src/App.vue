<template>
  <v-app light>

    <Header/>

    <v-main id="app">
      <router-view/>
    </v-main>

    <Footer/>
  
  </v-app>
</template>

<script>

import Footer from './layout/Footer.vue'
import Header from './layout/Header.vue'

export default {
  components: {
      Footer,
      Header
  },
  data() {
    return{

    }
  }
}
</script>

<style>
</style>
