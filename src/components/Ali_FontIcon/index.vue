<template>
  <i class="iconfont" :class="`icon-${name}`" aria-hidden="true"></i>
</template>

<script>
import "./css/iconfont.css";
export default {
  name: "Ali_FontIcon",
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