<template>
  <div id="app">
    <cheader></cheader>
    <dashboard></dashboard>
    <router-view class="content-route"></router-view>
  </div>
</template>

<script>
import dashboard from "./components/Dashboard.vue";
import cheader from "./components/Header.vue";
export default {
  data() {
    return {};
  },
  components: { dashboard, cheader }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: white;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100% !important;
  padding: 0 !important;
  background-color: white;
  position: relative;
}
.content-route {
  margin: 0 0 0 15%;
  padding-top: 7% !important;
  width: 85%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: scroll;
}
</style>
