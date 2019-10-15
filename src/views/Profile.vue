<template>
  <div id="register-form">
    <div class="text-inputs">
      <Tinput
        v-for="(item, idx) in data"
        :key="idx"
        :type="item.type"
        :title="item.holder"
        :label="item.label"
        :model="item.model"
        :rule="item.rule"
        :errortext="item.error"
      ></Tinput>
      <button @click="formsubmit">Create Head Office User</button>
      <button @click="logout">LogOut</button>
    </div>
  </div>
</template>

<script>
import Tinput from "@/components/TInput.vue";

export default {
  name: "Register",
  data() {
    return {
      agreement_link: null,
      partner_link: null,
      insurance_link: null,
      data: [
        {
          label: "Name",
          model: "name",
          holder: "Enter Your Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Name Correctly"
        },
        {
          label: "Phone",
          model: "phone",
          holder: "Enter Your Phone",
          rule: "^[0-9]{10}$",
          error: "Enter Phone No Correctly"
        },
        {
          label: "Address",
          model: "address",
          holder: "Line 1 For Address",
          rule: "^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$",
          error: "Enter address correctly"
        },
        {
          label: "Department",
          model: "department",
          holder: "Enter Department Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Department Correctly"
        },
        {
          label: "Date of joining",
          model: "doj",
          holder: "Enter Date of joining",
          type: "date",
          rule: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
        },
        {
          label: "Date of birth",
          model: "dob",
          holder: "Enter Date of Birth",
          type: "date",
          rule: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
        },
        {
          label: "City",
          model: "city",
          holder: "Enter City Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter City Name Correctly"
        },
        {
          label: "Pincode",
          model: "pincode",
          holder: "Enter Pincode",
          rule: "^[0-9]{6}$",
          error: "Enter Pincode Correctly"
        },
        {
          label: "State",
          model: "state",
          holder: "Enter State Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter State Name Correctly"
        },
        // {
        //   label: "Email",
        //   model: "email",
        //   holder: "Enter Email Address",
        //   rule: ".+@.+",
        //   error: "Enter Correct Email"
        // },
        {
          label: "Aadhaar Number",
          model: "aadhaar_no",
          holder: "Enter Aadhaar Number",
          rule: "^[0-9]{12}$",
          error: "Enter Correct Aadhaar number"
        },
        {
          label: "Bank Name",
          model: "bank_name",
          holder: "Enter Bank Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Bank Name Correctly"
        },
        {
          label: "Branch Name",
          model: "branch_name",
          holder: "Enter Branch Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Branch Name Correctly"
        },
        {
          label: "Account No",
          model: "account_no",
          holder: "Enter Account No",
          rule: "^[0-9]$",
          error: "Enter Account No Correctly"
        },
        {
          label: "IFSC",
          model: "ifsc",
          holder: "Enter IFSC",
          rule: "^[A-Za-z]{4}d{7}$",
          error: "Enter valid IFSC code"
        }
      ]
    };
  },
  components: {
    Tinput
  },
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    returndata() {
      var datasend = {};
      for (var i in this.data) {
        if (document.getElementById(this.data[i].model).value)
          datasend[this.data[i].model] = document.getElementById(
            this.data[i].model
          ).value;
      }
      datasend["email"] = this.$store.state.user.email;
      return datasend;
    },
    formsubmit() {
      var tempData = JSON.stringify(this.returndata());
      fetch("https://vahak-api-server.herokuapp.com/update/headoffice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: tempData
      })
        .then(res => res.json()) // Transform the data into json
        .then(data => {
          this.$store.dispatch("setUserData", data);
        });
    }
  }
};
</script>

<style scoped>
#register-form {
  padding: 30px;
}
.text-inputs {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
</style>
