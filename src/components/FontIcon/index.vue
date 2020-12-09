<template>
  <i class="fa" :class="`fa-${name}`" aria-hidden="true"></i>
</template>

<script>
import "./css/font-awesome.min.css";
export default {
  name: "FontIcon",
  props: {
    name: {
      type: String,
      required: false,
      default: "font-awesome",
    },
  },
};
</script>

<style>
</style>