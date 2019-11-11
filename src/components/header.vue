<template>
  <div class="header">
    <img src="@/assets/icons/other.svg" alt width="32" style="margin-left:15px" />
    <img
      src="@/assets/icons/r1.svg"
      alt
      width="32"
      style="background:aliceblue;border-radius: 100px;padding: 5px;"
      @click="logout"
    />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.header {
  z-index: 1;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  right: 0;
  background: white;
  width: 10em;
  padding: 5px 10px;
  border-bottom-left-radius: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  justify-content: space-evenly;
}
</style>