<template>
  <v-card outlined class="mx-auto" :width="cardWidth">
    <v-card-title class="justify-center">Get started!</v-card-title>
    <v-card-subtitle class="text-center"
      >Create an account to continue</v-card-subtitle
    >
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
      <v-btn color="primary" @click="emailCreate">Submit</v-btn>
    </v-card-text>
    <v-card-text class="text-center">or</v-card-text>
    <v-card-actions class="justify-center">
      <v-btn outlined class="text-none" @click="googleCreate">Google</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SignUp",
  title: "Sign up",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    emailCreate() {
      console.log(this.email, this.password);
    },
    googleCreate() {
      console.log("Create account!");
    },
  },
  computed: {
    cardWidth() {
      return "50vw";
    },
  },
};
</script>