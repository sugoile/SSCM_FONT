<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* app占body全屏的方法 */
.app {
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  height: 130px;
}
</style>
