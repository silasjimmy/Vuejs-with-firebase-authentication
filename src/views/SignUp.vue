<template>
  <v-sheet class="d-flex align-center justify-center" height="100%">
    <v-card outlined :width="cardWidth" class="text-center rounded-lg">
      <v-card-title class="justify-center">Get started!</v-card-title>
      <v-card-subtitle>Create an account to continue</v-card-subtitle>
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
        <v-form lazy-validation ref="createForm">
          <v-text-field
            outlined
            dense
            clearable
            rounded
            single-line
            color="success"
            :rules="[rules.required, rules.emailFormat]"
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
            :rules="[rules.required, rules.passwordLength]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="() => (showPassword = !showPassword)"
            label="Password"
            prepend-icon="mdi-lock"
            v-model="password"
          ></v-text-field>
        </v-form>
        <v-btn
          depressed
          rounded
          color="success"
          class="text-none"
          :loading="loadEmailCreate"
          @click="emailCreate"
          >Create</v-btn
        >
      </v-card-text>
      <v-card-text class="py-0">
        <v-btn
          text
          rounded
          link
          to="/sign-in"
          class="text-none font-weight-regular"
          >Already have an account?
          <span class="success--text font-weight-medium"> Log in</span></v-btn
        >
      </v-card-text>
      <v-card-text>or</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          outlined
          rounded
          class="text-none"
          :loading="loadGoogleCreate"
          @click="googleCreate"
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
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default {
  name: "SignUp",
  title: "Create account",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loadEmailCreate: false,
      loadGoogleCreate: false,
      showAlert: false,
      alertMessage: "Error occurred",
      rules: {
        required: (value) => !!value || "This field is required!",
        emailFormat: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail address!";
        },
        passwordLength: (value) => {
          if (value)
            return value.length >= 8 || "Minimum of 8 characters required!";
          return "";
        },
      },
    };
  },
  methods: {
    async emailCreate() {
      if (this.$refs.createForm.validate()) {
        try {
          this.loadEmailCreate = true;
          const auth = getAuth();
          await createUserWithEmailAndPassword(auth, this.email, this.password);

          this.$router.replace({ name: "users" });
        } catch (error) {
          console.log(error);
        } finally {
          this.loadEmailCreate = false;
        }
      }
    },
    async googleCreate() {
      try {
        this.loadGoogleCreate = true;

        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        this.$router.replace({ name: "users" });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadGoogleCreate = false;
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