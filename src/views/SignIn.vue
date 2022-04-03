<template>
  <v-sheet class="d-flex align-center justify-center" height="100%">
    <v-card outlined :width="cardWidth" class="text-center rounded-lg">
      <v-card-title class="justify-center">Welcome back!</v-card-title>
      <v-card-subtitle>Log in to continue</v-card-subtitle>
      <v-alert
        dense
        outlined
        dismissible
        class="mb-0 mx-4"
        type="error"
        transition="fade-transition"
        v-model="showAlert"
      >
        {{ alertMessage }}
      </v-alert>
      <v-card-text>
        <v-form lazy-validation ref="loginForm">
          <v-text-field
            outlined
            dense
            clearable
            rounded
            single-line
            color="success"
            :rules="[rules.required]"
            prepend-icon="mdi-email"
            label="Email address"
            type="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            clearable
            rounded
            single-line
            color="success"
            :rules="[rules.required]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="() => (showPassword = !showPassword)"
            prepend-icon="mdi-lock"
            label="Password"
            v-model="password"
          ></v-text-field>
        </v-form>
        <v-btn
          depressed
          rounded
          color="success"
          class="text-none"
          :loading="loadEmailLogin"
          @click="emailLogin"
          >Log in</v-btn
        >
      </v-card-text>
      <v-card-text class="py-0">
        <v-btn
          text
          rounded
          link
          to="/sign-up"
          class="text-none font-weight-regular"
          >Don't have an account?
          <span class="success--text font-weight-medium">
            Create one</span
          ></v-btn
        >
      </v-card-text>
      <v-card-text>or</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          outlined
          rounded
          class="text-none"
          :loading="loadGoogleLogin"
          @click="googleLogin"
        >
          <v-img
            width="20px"
            height="20px"
            src="../assets/icons/google.svg"
          ></v-img>
          <span class="ml-2">Google</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseErrorMessages } from "../utils";

export default {
  name: "SignIn",
  title: "Login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loadEmailLogin: false,
      loadGoogleLogin: false,
      alertMessage: "Error occurred!",
      showAlert: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
    };
  },
  methods: {
    async emailLogin() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.loadEmailLogin = true;
          const auth = getAuth();
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.loadEmailLogin = false;

          this.$router.replace({ name: "dashboard" });
        } catch (error) {
          this.loadEmailLogin = false;
          this.alertMessage = firebaseErrorMessages(error.code);
          this.showAlert = true;
        }
      }
    },
    async googleLogin() {
      try {
        this.loadGoogleLogin = true;
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        this.loadGoogleLogin = false;
        this.$router.replace({ name: "dashboard" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100vw";
        case "sm":
          return "70vw";
        case "md":
          return "50vw";
        case "lg":
          return "40vw";
        case "xl":
          return "30vw";
        default:
          return "100vw";
      }
    },
  },
};
</script>