<template>
  <v-card outlined class="mx-auto" :width="cardWidth">
    <v-card-title class="justify-center">Welcome back!</v-card-title>
    <v-card-subtitle class="text-center">Log in to continue</v-card-subtitle>
    <v-card-text class="text-center">
      <v-text-field
        outlined
        dense
        prepend-icon="mdi-email"
        label="Email address"
        type="email"
        v-model="email"
      ></v-text-field>
      <v-text-field
        outlined
        dense
        prepend-icon="mdi-lock"
        append-icon="mdi-eye-off"
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>
      <v-btn color="primary" @click="emailLogin">Submit</v-btn>
    </v-card-text>
    <v-card-text class="text-center">or</v-card-text>
    <v-card-actions class="justify-center">
      <v-btn outlined class="text-none" @click="googleLogin">Google</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SignIn",
  title: "Sign in",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    emailLogin() {
      console.log(this.email, this.password);
    },
    googleLogin() {
      console.log("Login!");
    },
  },
  computed: {
    cardWidth() {
      return "50vw";
    },
  },
};
</script>