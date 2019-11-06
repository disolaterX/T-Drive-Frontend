<template>
  <div>
    <login v-if="lrstate"></login>
    <register v-if="!lrstate"></register>
    <div class="container-action signin" v-if="!lrstate">
      <p>
        Already have an account?
        <a href="#" @click="lrstate = true">Login</a>.
      </p>
    </div>
    <div class="container-action signin" v-if="lrstate">
      <p>
        Don't have an account?
        <a href="#" @click="lrstate = false">Register</a>.
      </p>
    </div>
  </div>
</template>

<script>
import login from "@/components/Login.vue";
import register from "@/components/RegisterForm.vue";
export default {
  data() {
    return {
      lrstate: true
    };
  },
  components: {
    login,
    register
  },
  created() {
    if (this.$store.state.user) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.container-action {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
