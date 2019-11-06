<template>
  <div id="nav">
    <router-link to="/">
      <img src="../assets/icons/home.svg" class="icons-nav" />
      Home
    </router-link>
    <router-link to="/alluser">
      <img src="../assets/icons/user.svg" class="icons-nav" />Users
    </router-link>
    <router-link to="/allsales">
      <img src="../assets/icons/users.svg" class="icons-nav" />Sales Person
    </router-link>
    <router-link to="/franchisee">
      <img src="../assets/icons/franchisee.svg" class="icons-nav" />Franchise
    </router-link>
    <router-link to="/batteryreg">
      <img src="../assets/icons/other.svg" class="icons-nav" />Others
    </router-link>
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
#nav {
  height: 100vh;
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 5%;
  border-right: #dddddd solid 1px;
  z-index: 1;
}
#nav a {
  font-weight: bold;
  color: #b1b1b1;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 30px;
  width: 100%;
}
#nav a.router-link-exact-active:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  width: 50%;
  padding-top: 25px;
  border-bottom: 1.5px solid #dddddd;
}
.icons-nav {
  margin-right: 10px;
}
</style>