<template>
  <div class="c-col">
    <h1 style="margin-bottom: 15px;">T-Drive :)</h1>
    <p>Please fill in this form to create/access your account.</p>
    <hr />

    <label for="Phone">
      <b>Phone</b>
    </label>
    <input type="phone" placeholder="Enter Phone" v-model="findtag" required />
    <label for="Password">
      <b>Password</b>
    </label>
    <input type="password" placeholder="Enter Password" v-model="pass" required />
    <button class="registerbtn" @click="checkandlogin">Start Using</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      findtag: "",
      pass: ""
    };
  },
  methods: {
    checkandlogin() {
      if (this.findtag && this.pass) {
        this.$store.dispatch("setLogData", [this.findtag, this.pass]);
      } else {
        alert("Fill Correctly");
      }
    }
  }
};
</script>

<style scoped>
.c-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100vh;
  margin: auto auto;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}
input {
  border: 1px solid black !important;
  border-radius: 5px !important;
}

/* Full-width input fields */
input[type="phone"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="phone"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
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