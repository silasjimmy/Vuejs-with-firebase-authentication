<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title v-if="!$store.state.loggedIn">
        <router-link
          to="/home"
          class="text-decoration-none black--text font-weight-bold"
          >Authentication</router-link
        >
      </v-toolbar-title>

      <v-toolbar-title v-if="$store.state.loggedIn">Page title</v-toolbar-title>

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

      <v-menu bottom offset-y v-model="linksDropdown">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            color="success"
            v-if="$vuetify.breakpoint.smAndDown && $store.state.loggedIn"
            @click="linksDropdown = !linksDropdown"
          >
            <v-avatar size="34">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list dense class="py-0">
            <v-list-item-group color="success">
              <v-list-item link to="/profile">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/settings">
                <v-list-item-icon>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      app
      :permanent="$vuetify.breakpoint.mdAndUp"
      v-if="$store.state.loggedIn"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="80px">
              <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list rounded>
        <v-list-item-group color="success">
          <v-list-item link to="/users">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list-item color="success" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-bottom-navigation
      grow
      app
      shift
      color="success"
      v-if="$store.state.loggedIn && $vuetify.breakpoint.smAndDown"
    >
      <v-btn link to="/users">
        <span>Users</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-main>
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
    return {
      linksDropdown: false,
    };
  },
  methods: {
    async logout() {
      const auth = getAuth();
      await signOut(auth);

      this.$router.replace({ name: "sign-in" });
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
