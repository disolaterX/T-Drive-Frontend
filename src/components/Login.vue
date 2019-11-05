<template>
  <div class="signin-parent">
    <div class="container">
      <label for="uname">
        <b>Email</b>
      </label>
      <input type="text" v-model="email" placeholder="Enter Email" required />

      <label for="psw">
        <b>Password</b>
      </label>
      <input type="password" v-model="password" placeholder="Enter Password" name="psw" required />

      <button @click="gg" type="submit">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    gg() {
      fetch("https://vahak-api-server.herokuapp.com/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          passHash: this.password
        })
      })
        .then(res => res.json()) // Transform the data into json
        .then(user => {
          if (!user.message) {
            fetch("https://vahak-api-server.herokuapp.com/admin/fetch/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email: this.email })
            })
              .then(fres => fres.json()) // Transform the data into json
              .then(userData => {
                console.log(userData);

                this.$store.dispatch("setUserData", userData);
                this.$store.dispatch("setUser", user);
                this.$router.push("/profile");
              });
          }
        });
    }
  }
};
</script>

<style scoped>
.signin-parent {
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.container {
  width: 60%;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
button:hover {
  opacity: 0.8;
}
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}
img.avatar {
  width: 40%;
  border-radius: 50%;
}
.container {
  padding: 16px;
}
span.psw {
  float: right;
  padding-top: 16px;
}
/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
