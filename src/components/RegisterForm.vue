<template>
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr />

    <label for="email">
      <b>Email</b>
    </label>
    <input
      type="text"
      v-model="email"
      placeholder="Enter Email"
      name="email"
      required
    />

    <label for="psw">
      <b>Password</b>
    </label>
    <input
      type="password"
      v-model="password"
      placeholder="Enter Password"
      name="psw"
      required
    />
    <label for="psw-repeat">
      <b>Repeat Password</b>
    </label>
    <input
      type="password"
      v-model="repeat"
      placeholder="Repeat Password"
      name="psw-repeat"
      required
    />
    <hr />

    <p>
      By creating an account you agree to our
      <a href="#">Terms & Privacy</a>.
    </p>
    <button type="submit" @click="reg" class="registerbtn">Register</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      repeat: ""
    };
  },
  methods: {
    reg() {
      if (this.password === this.repeat) {
        fetch("https://vahak-api-server.herokuapp.com/auth/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            passHash: this.password,
            userType: "headoffice"
          })
        })
          .then(res => res.json()) // Transform the data into json
          .then(data => {
            if (data.message === "done") {
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
                  fetch(
                    "https://vahak-api-server.herokuapp.com/register/headoffice/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        email: this.email,
                        uid: user.uid
                      })
                    }
                  )
                    .then(res => res.json()) // Transform the data into json
                    .then(() => {
                      this.$store.dispatch("setUser", user);
                      this.$router.push("/profile");
                    });
                });
            }
          });
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
