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

      <label>Aggreement Document</label>
      <input
        type="file"
        name="aggreement"
        id="agreement_link"
        @change="uploadPic('agreement_link')"
      />
      <label>Partner Document</label>
      <input
        type="file"
        name="partner"
        id="partner_link"
        @change="uploadPic('partner_link')"
      />
      <label>Insurance Document</label>
      <input
        type="file"
        name="insurance"
        id="insurance_link"
        @change="uploadPic('insurance_link')"
      />
      <button @click="formsubmit">Register</button>
      <button @click="logout">LogOut</button>
    </div>
  </div>
</template>

<script>
import Tinput from "@/components/TInput.vue";
import storage from "../plugin/firebase";

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
          model: "address_1",
          holder: "Line 1 For Address"
        },
        {
          model: "address_1",
          holder: "Line 2 For Address"
        },
        {
          label: "City",
          model: "city",
          holder: "Enter City Name",
          rule: "^[a-zA-Z /S]*$",
          error: "Enter City Name Correctly"
        },
        {
          label: "District",
          model: "district",
          holder: "Enter District Name",
          rule: "^[a-zA-Z /S]*$",
          error: "Enter District Name Correctly"
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
          rule: "^[a-zA-Z /S]*$",
          error: "Enter State Name Correctly"
        },
        {
          label: "Email",
          model: "email",
          holder: "Enter Email Address",
          rule: ".+@.+",
          error: "Enter Correct Email"
        },
        {
          label: "Telephone",
          model: "telephone",
          holder: "Enter Telephone No",
          rule: "^[0-9]{10}$",
          error: "Enter Telephone No Correctly"
        },
        {
          label: "GST",
          model: "gst",
          holder: "Enter GST Details",
          rule:
            "^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Zs]{1})+$",
          error: "Enter Correct GST Details"
        },
        {
          label: "PAN",
          model: "pan",
          holder: "Enter PAN Details",
          rule: "^[A-Za-z]{5}d{4}[A-Za-z]{1}$",
          error: "Enter Correct PAN Details"
        },
        {
          label: "SPOC Name",
          model: "spoc_name",
          holder: "Enter Spoc Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Name Correctly"
        },
        {
          label: "SPOC Phone",
          model: "spoc_phone",
          holder: "Enter Spoc Phone No",
          rule: "^[0-9]{10}$",
          error: "Enter Phone No Correctly"
        },
        {
          label: "Insurance Expire",
          model: "insurance_exp",
          holder: "Enter Date of Insurance Expire",
          type: "date"
        },
        {
          label: "Bank Name",
          model: "bank_name",
          holder: "Enter Bank Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Bank Name Correctly"
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
  mounted() {
    if (this.$store.state.user && this.$store.state.isAuth) {
      document.getElementById("email").value = this.$store.state.user.email;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logut");
    },
    uploadPic(link) {
      var file = document.getElementById(link).files[0];
      var storageRef = storage.ref();
      var thisRef = storageRef.child(file.name + new Date());
      if (file.size < 1024 * 1024) {
        thisRef.put(file).then(() => {
          thisRef.getDownloadURL().then(url => {
            switch (link) {
              case "agreement_link":
                this.agreement_link = url;
                break;
              case "partner_link":
                this.partner_link = url;
                break;
              case "insurance_link":
                this.insurance_link = url;
                break;
              default:
                break;
            }
          });
        });
      }
    },
    returndata() {
      var datasend = {};
      for (var i in this.data) {
        if (document.getElementById(this.data[i].model).value)
          datasend[this.data[i].model] = document.getElementById(
            this.data[i].model
          ).value;
      }
      return datasend;
    },
    formsubmit() {
      var tempData = JSON.stringify(this.returndata());
      fetch("https://vahak-api-server.herokuapp.com/register/franchisee/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: tempData
      })
        .then(res => res.json()) // Transform the data into json
        .then(data => {
          console.log(data);
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
