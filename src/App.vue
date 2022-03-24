<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="primary">
      <v-app-bar-title>Authentication</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn link text to="/about" class="mx-2">About</v-btn>
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
.b {
  border: 1px solid black;
}

html {
  overflow: auto !important;
}
</style>
