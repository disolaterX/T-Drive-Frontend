<template>
  <div class="franchisee-parent" v-if="this.$route.params.data">
    <div class="franchisee-head">
      <span class="fname">
        <div class="fcircle"></div>
        <span v-if="this.$route.params.data.name">{{this.$route.params.data.name}}</span>
      </span>
      <div class="meta-info">
        <span
          class="join-date"
          v-if="this.$route.params.data.doj"
        >Joined: {{returndate(this.$route.params.data.doj)}}</span>
        <span class="go-back" @click="()=>{this.$router.push('/franchisee')}">Go Back</span>
      </div>
    </div>
    <div class="franchisee-box">
      <div class="frow">
        <div class="fcol">
          <span class="data-key">
            Based in:
            <span
              class="data-def"
              v-if="this.$route.params.data.state"
            >{{this.$route.params.data.state}}</span>
          </span>
          <span class="data-key">
            Contact:
            <span class="data-def">
              {{this.$route.params.data.phone}}
              <span
                v-if="this.$route.params.data.phone && this.$route.params.data.telephone"
              >,</span>
              {{this.$route.params.data.telephone}}
            </span>
          </span>
        </div>
        <div class="fcol" v-if="!this.$route.params.data.is_verifed">
          <span class="data-key">Action</span>
          <span class="frow">
            <div class="p-button" @click="approvef">Approve</div>
          </span>
        </div>
        <span class="verified" v-else>&#x2713; Verified</span>
      </div>
      <div class="fcol other-details">
        <span class="fhead">Other Details</span>
        <span class="data-key">
          Email:
          <span
            class="data-def"
            v-if="this.$route.params.data.email"
          >{{this.$route.params.data.email}}</span>
        </span>
        <span class="data-key">
          Address:
          <span
            class="data-def"
            v-if="this.$route.params.data.address_1 || this.$route.params.data.address_2"
          >{{this.$route.params.data.address_1}} {{this.$route.params.data.address_2}}</span>
        </span>
        <span class="data-key">
          City:
          <span
            class="data-def"
            v-if="this.$route.params.data.city"
          >{{this.$route.params.data.city}}</span>
        </span>
        <span class="data-key">
          District:
          <span
            class="data-def"
            v-if="this.$route.params.data.district"
          >{{this.$route.params.data.district}}</span>
        </span>
        <span class="data-key">
          Pincode:
          <span
            class="data-def"
            v-if="this.$route.params.data.pincode"
          >{{this.$route.params.data.pincode}}</span>
        </span>
        <span class="data-key">
          GST:
          <span
            class="data-def"
            v-if="this.$route.params.data.gst"
          >{{this.$route.params.data.gst}}</span>
        </span>
        <span class="data-key">
          PAN:
          <span
            class="data-def"
            v-if="this.$route.params.data.pan"
          >{{this.$route.params.data.pan}}</span>
        </span>
        <span class="data-key">
          Insurance Expiry:
          <span
            class="data-def"
            v-if="this.$route.params.data.insurance_exp"
          >{{this.$route.params.data.insurance_exp}}</span>
        </span>
        <span class="data-key">
          Bank Name:
          <span
            class="data-def"
            v-if="this.$route.params.data.bank_name"
          >{{this.$route.params.data.bank_name}}</span>
        </span>
        <span class="data-key">
          Branch Name:
          <span
            class="data-def"
            v-if="this.$route.params.data.branch_name"
          >{{this.$route.params.data.branch_name}}</span>
        </span>
        <span class="data-key">
          Account Number:
          <span
            class="data-def"
            v-if="this.$route.params.data.account_no"
          >{{this.$route.params.data.account_no}}</span>
        </span>
        <span class="data-key">
          IFSC:
          <span
            class="data-def"
            v-if="this.$route.params.data.ifsc"
          >{{this.$route.params.data.ifsc}}</span>
        </span>
        <span class="data-key">
          Aggreement:
          <span
            class="a-data-def"
            v-if="this.$route.params.data.agreement_link"
            @click="openlink(this.$route.params.data.agreement_link)"
          >Click Here</span>
        </span>
        <span class="data-key">
          Partner:
          <span
            class="a-data-def"
            v-if="this.$route.params.data.partner_link"
            @click="openlink(this.$route.params.data.partner_link)"
          >Click Here</span>
        </span>
        <span class="data-key">
          Insurance:
          <span
            class="a-data-def"
            v-if="this.$route.params.data.insurance_link"
            @click="openlink(this.$route.params.data.insurance_link)"
          >Click Here</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    returndate(i) {
      return (
        new Date(i).getDate() +
        "/" +
        new Date(i).getMonth() +
        "/" +
        new Date(i).getFullYear()
      );
    },
    openlink(link) {
      window.open(link, "_blank");
    },
    approvef() {
      this.$route.params.data["is_verifed"] = true;
      fetch("https://vahak-api-server.herokuapp.com/franchisee/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.$route.params.data)
      }).then(res => {
        res.json();
        console.log(res);
      });
    }
  },
  created() {
    console.log(this.$route.params.data);
  }
};
</script>

<style scoped>
.franchisee-parent {
  padding: 0 50px 50px 50px;
}
.franchisee-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.fname {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #ff181f;
}
.fcircle {
  width: 32px;
  height: 32px;
  background-color: #ff181f;
  border-radius: 50%;
  margin-right: 10px;
}
.meta-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.join-date {
  color: #0078ff;
  font-weight: 600;
  height: 100%;
}
.go-back {
  color: #707070;
  font-weight: 600;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 8px 18px;
}
.franchisee-box {
  border: solid 1px #707070;
  border-radius: 10px;
  margin-top: 30px;
  background-color: #ffffff;
  padding: 20px 40px;
}
.frow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.fcol {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.data-key {
  display: inline;
  color: #707070;
  font-weight: 500;
  margin: 10px 0;
}
.data-def {
  color: black;
  font-weight: normal;
}
.a-data-def {
  color: blue;
  text-decoration: underline;
  font-weight: normal;
  cursor: pointer;
}
.p-button {
  margin-right: 10px;
}
.other-details {
  margin-top: 30px;
}
.fhead {
  font-weight: 600;
  font-size: 25px;
  color: #27b89b;
}
.verified {
  font-weight: 700;
  color: green;
}
</style>