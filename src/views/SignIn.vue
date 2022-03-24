<template>
  <v-sheet class="d-flex align-center justify-center" height="100%">
    <v-card outlined :width="cardWidth" class="text-center">
      <v-card-title class="justify-center">Welcome back!</v-card-title>
      <v-card-subtitle>Log in to continue</v-card-subtitle>
      <v-card-text>
        <v-form lazy-validation ref="loginForm">
          <v-text-field
            outlined
            dense
            clearable
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
            :rules="[rules.required]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="() => (showPassword = !showPassword)"
            prepend-icon="mdi-lock"
            label="Password"
            v-model="password"
          ></v-text-field>
        </v-form>
        <v-btn color="primary" :loading="loadEmailLogin" @click="emailLogin"
          >Log in</v-btn
        >
      </v-card-text>
      <v-card-text class="py-0">
        <v-btn text link to="/sign-up" class="text-none"
          >Don't have an account?
          <span class="blue--text"> Create one</span></v-btn
        >
      </v-card-text>
      <v-card-text>or</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          outlined
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

export default {
  name: "SignIn",
  title: "Sign in",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loadEmailLogin: false,
      loadGoogleLogin: false,
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
        } catch (error) {
          console.log(error);
        } finally {
          this.loadEmailLogin = false;
        }
      }
    },
    async googleLogin() {
      try {
        this.loadGoogleLogin = true;
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadGoogleLogin = false;
      }
    },
  },
  computed: {
    cardWidth() {
      return "50vw";
    },
  },
};
</script>