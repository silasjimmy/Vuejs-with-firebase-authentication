<template>
  <v-card elevation="0" class="text-center transparent" max-width="300px">
    <v-card-subtitle>{{ message }}</v-card-subtitle>
    <v-card-text>
      <v-progress-linear
        color="success"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Loader",
  props: {
    message: {
      type: String,
      default: "Loading... please wait",
    },
  },
};
</script>

<style>
</style>