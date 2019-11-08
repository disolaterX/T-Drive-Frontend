<template>
  <div id="register-form">
    <div class="text-inputs">
      <h1>Battery Registration form</h1>
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
      <label for="id_select">Franchisee</label>
      <select id="id_select" v-model="sfranchisee" autofocus>
        <option :value="i.uid" v-for="(i,idx) in flist" :key="idx">{{i.name}}</option>
      </select>
      <span @click="formsubmit" class="p-button">Register Battery</span>
    </div>
  </div>
</template>

<script>
import Tinput from "@/components/TInput.vue";

export default {
  data() {
    return {
      sfranchisee: null,
      flist: null,
      agreement_link: null,
      partner_link: null,
      insurance_link: null,
      franchiseeList: null,
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
  created() {
    if (
      this.$route.params.franchiseeList &&
      this.$route.params.franchiseeList.length > 0
    ) {
      this.flist = this.$route.params.franchiseeList;
    } else {
      this.fetchFlist();
    }
  },
  mounted() {},
  methods: {
    returndata() {
      var datasend = {};
      for (var i in this.data) {
        if (document.getElementById(this.data[i].model).value)
          datasend[this.data[i].model] = document.getElementById(
            this.data[i].model
          ).value;
        datasend["f_uid"] = this.sfranchisee;
      }
      return datasend;
    },
    fetchFlist() {
      fetch("https://vahak-api-server.herokuapp.com/franchisee/fetch-all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) // Transform the data into json
        .then(list => {
          if (!list.message) {
            this.flist = list;
          }
        });
    },
    formsubmit() {
      console.log(this.sfranchisee);

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
.reg-button {
  padding: 10px;
  outline: none;
  border: none;
  background: none;
  background-color: green;
  color: white;
  margin-top: 25px;
}
#id_select {
  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  height: 40px;
  margin: 5px 0 20px 0;

  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right #fffaf7;
  background-position-x: right;
  -webkit-appearance: none;
  appearance: none;
  background-position-x: 99%;
}

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
