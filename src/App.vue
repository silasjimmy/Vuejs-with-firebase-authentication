<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="primary">
      <v-app-bar-title>Authentication</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn link to="/sign-in">Log in</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html {
  overflow: auto !important;
}
</style>
