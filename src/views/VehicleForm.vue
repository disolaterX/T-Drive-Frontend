<template>
  <div id="register-form">
    <div class="text-inputs">
      <h1>Vehicle Registration form</h1>
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
      <button @click="formsubmit">Register Vehicle</button>
    </div>
  </div>
</template>

<script>
import Tinput from "@/components/TInput.vue";

export default {
  data() {
    return {
      data: [
        {
          label: "Purchase Date",
          model: "purchase",
          holder: "Select Purchase Date",
          type: "date",
          rule: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
          error: "Enter Correct Date"
        },
        {
          label: "Model",
          model: "model",
          holder: "Enter Model No"
        },
        {
          label: "Chassis No",
          model: "chassis_no",
          holder: "Enter Chassis No"
        },
        {
          label: "Motor No",
          model: "motor_no",
          holder: "Enter Motor No"
        },
        {
          label: "Controller No",
          model: "controller_no",
          holder: "Enter Controller No"
        },
        {
          label: "Battery Id",
          model: "battery_id",
          holder: "Enter Battery ID",
          rule: "^[a-zA-Z0-9_.-]*$",
          error: "Enter Battery ID correctly"
        },
        {
          label: "Vehicle RTO City",
          model: "vehicle_rto_city",
          holder: "Enter Vehicle RTO City"
        },
        {
          label: "Vehicle RTO State",
          model: "vehicle_rto_state",
          holder: "Enter Vehicle RTO State"
        },
        {
          label: "Vehicle Registration No",
          model: "reg_no",
          holder: "Enter Vehicle Registration No"
        },
        {
          label: "Vehicle Fitness No",
          model: "fitness_no",
          holder: "Enter Vehicle Fitness No"
        },
        {
          label: "Vehicle Fitness Expire",
          model: "fitness_exp",
          holder: "Select Vehicle Expire Date",
          type: "date"
        },
        {
          label: "Vehicle Policy No",
          model: "policy_no",
          holder: "Enter Vehicle Policy No"
        },
        {
          label: "Vehicle Policy Expire",
          model: "policy_exp",
          holder: "Select Vehicle Policy Expire Date",
          type: "date"
        },
        {
          label: "Vehicle Policy No",
          model: "policy_no",
          holder: "Enter Vehicle Policy No"
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
      fetch("https://vahak-api-server.herokuapp.com/register/vehicle/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: tempData
      })
        .then(res => res.json()) // Transform the data into json
        .then(result => {
          // console.log(data);s
          if (result.message == "done") {
            alert("Vehicle Registered");
          }
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
