<template>
  <v-app-bar fixed app light clipped-left color="primary" class="elevation-2">
    <v-toolbar-title style="cursor: pointer" class="white--text" @click="goHome()">News App</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
    methods: {
        goHome() {
            const path = `/`
            if (this.$route.path !== path) 
                this.$router.push(path)
            else {
                this.$router.go()
            }
        },
    }
}
</script>

<style>

</style>