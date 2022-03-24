<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon v-if="$store.loggedIn"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <router-link to="/home" class="text-decoration-none black--text"
          >Authentication</router-link
        >
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        link
        text
        to="/about"
        class="mx-2 text-none"
        v-if="!$store.loggedIn"
        >About</v-btn
      >
      <v-btn
        outlined
        link
        active-class="primary white--text"
        class="text-none"
        to="/sign-in"
        v-if="!$store.loggedIn"
        >Sign in</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer app permanent v-if="$store.loggedIn">
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

    <v-main>
      <router-view />
    </v-main>

    <v-fade-transition>
      <v-overlay absolute :opacity="1" :z-index="999" v-model="overlay">
        <loader></loader>
      </v-overlay>
    </v-fade-transition>
  </v-app>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import Loader from "@/components/Loader.vue";

export default {
  name: "App",
  created() {
    this.overlay = true;

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit("setLoggedIn", true);
        console.log(user);
        this.overlay = false;
      } else {
        this.$store.commit("setLoggedIn", false);
        this.overlay = false;
      }
    });
  },
  data() {
    return {
      overlay: false,
    };
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
</style>
