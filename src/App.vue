<template>
  <div id="app">
    <cheader v-if="this.$store.state.user && this.$store.state.userData"></cheader>
    <dashboard v-if="this.$store.state.user && this.$store.state.userData"></dashboard>
    <auth v-else></auth>
    <router-view class="content-route" v-if="this.$store.state.user && this.$store.state.userData"></router-view>
  </div>
</template>

<script>
import dashboard from "./components/Dashboard.vue";
import cheader from "./components/Header.vue";
import Auth from "@/views/Auth.vue";
export default {
  data() {
    return {};
  },
  components: { dashboard, cheader, Auth }
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
.p-button {
  background-color: #67d89f;
  border-radius: 5px;
  color: black;
  padding: 8px 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.p-button:hover {
  background-color: #5ac28e;
}
.s-button {
  border: solid 1px #707070;
  border-radius: 5px;
  color: black;
  padding: 8px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.s-button:hover {
  background-color: rgb(231, 231, 231);
}
</style>
