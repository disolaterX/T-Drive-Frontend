<template>
  <div id="register-form">
    <div class="text-inputs">
      <h1>Battey Registration form</h1>
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
      <button @click="formsubmit">Register Battery</button>
    </div>
  </div>
</template>

<script>
import Tinput from "@/components/TInput.vue";

export default {
  name: "Battery Registration",
  data() {
    return {
      agreement_link: null,
      partner_link: null,
      insurance_link: null,
      data: [
        {
          label: "Battery Type",
          model: "battery_type",
          holder: "Enter Battery Type",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Battery Type correctly"
        },
        {
          label: "Battery Specifications",
          model: "specifications",
          holder: "Enter Battery Specifications",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter Battery Type correctly"
        },
        {
          label: "Date of purchase",
          model: "purchase",
          holder: "Enter Date of purchase",
          type: "date",
          rule: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
        },
        {
          label: "Warranty Expire Date",
          model: "warranty_exp",
          holder: "Enter Warranty expiry date",
          type: "date",
          rule: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
        },
        {
          label: "Battery Serial",
          model: "battery_serial",
          holder: "Enter Battery Serial No.",
          rule: "^[a-zA-Z0-9_.-]*$",
          error: "Enter Battery serial correctly"
        },
        {
          label: "Battery Supplier Name",
          model: "supplier_details",
          holder: "Enter Battery Supplier Name",
          rule: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          error: "Enter correct name"
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
      fetch("https://vahak-api-server.herokuapp.com/battery/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: tempData
      })
        .then(res => res.json()) // Transform the data into json
        .then(() => {
          // console.log(data);s
          alert("Battery Registered");
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
