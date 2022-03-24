<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="primary">
      <v-app-bar-title>Authentication</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn link text to="/about" class="mx-2">About</v-btn>
      <v-btn link to="/sign-in">Log in</v-btn>
    </v-app-bar>

    <v-navigation-drawer app permanent>
      <v-list-item two-line>
        <v-list-item-avatar class="b"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Name</v-list-item-title>
          <v-list-item-subtitle>Email</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav shaped>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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
