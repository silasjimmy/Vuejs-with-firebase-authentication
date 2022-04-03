<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon v-if="$store.state.loggedIn"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link
          to="/home"
          class="text-decoration-none black--text font-weight-bold"
          >Authentication</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        link
        rounded
        depressed
        color="success"
        to="/sign-in"
        class="text-none"
        v-if="!$store.state.loggedIn"
        >Sign in</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer app permanent v-if="$store.state.loggedIn">
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

      <v-btn block color="primary" @click="logout">Log out</v-btn>
    </v-navigation-drawer>

    <v-main class="px-2">
      <router-view />
    </v-main>

    <v-fade-transition>
      <v-overlay
        absolute
        :opacity="1"
        :z-index="999"
        v-model="$store.state.loadingOverlay"
      >
        <loader></loader>
      </v-overlay>
    </v-fade-transition>
  </v-app>
</template>

<script>
import { getAuth, signOut } from "@firebase/auth";
import Loader from "@/components/Loader.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    async logout() {
      const auth = getAuth();
      await signOut(auth);
    },
  },
  components: {
    Loader,
  },
};
</script>

<style>
.b {
  border: 1px solid black;
}

html {
  overflow: auto !important;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #ffffff !important;
}
</style>
