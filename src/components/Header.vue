<template>
  <div class="header-parent">
    <img src="../assets/vahaklogo.png" height="60%" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.header-parent {
  width: 100%;
  height: 10%;
  position: absolute;
  top: 0;
  background-color: white;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
  border-bottom: #dddddd solid 1px;
}
</style>