<template>
  <div class="home c-col">
    <div class="c-col report-parent">
      <p class="report-parent-p">Report</p>
      <div class="c-row report-data-parent">
        <div class="c-row">
          <img src="@/assets/icons/r1.svg" alt />
          <span class="c-col report-data">
            <p>Total Users</p>
            <p>150</p>
          </span>
        </div>
        <div class="c-row">
          <img src="@/assets/icons/r2.svg" alt />
          <span class="c-col report-data">
            <p>Franchisee</p>
            <p>15</p>
          </span>
        </div>
        <div class="c-row">
          <img src="@/assets/icons/r3.svg" alt />
          <span class="c-col report-data">
            <p>Franchisee Dist</p>
            <p>15</p>
          </span>
        </div>
      </div>
    </div>
    <div class="c-col overview-parent">
      <div class="c-row">
        <p class="overview-parent-p">Franchisee Overview</p>
        <a
          @click="()=>{this.$router.push({name:'Franchisee' , params:{data:this.listData}})}"
        >View All</a>
      </div>
      <table class="flist-table">
        <tr class="flist-list-heading">
          <th>S.No.</th>
          <th>Franchise Name</th>
          <th>Joined</th>
          <th>Email</th>
          <th>Rental Income</th>
          <th>Profile</th>
        </tr>
        <tr class="flist-list-data" v-for="(i,idx) in tempListData" :key="idx">
          <th>{{idx}}</th>
          <th>{{i.name}}</th>
          <th v-if="i.date_of_activation">{{i.date_of_activation.split('T')[0]}}</th>
          <th v-else></th>
          <th>{{i.email}}</th>
          <th>2229</th>
          <th>
            <p v-if="i.is_verifed" class="active-btn">Active</p>
            <p v-else class="non-active-btn">Pending</p>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: null,
      tempListData: null
    };
  },
  created() {
    this.listData = null;
    this.tempListData = null;
    this.fetchAll();
  },
  methods: {
    fetchAll() {
      fetch("https://vahak-api-server.herokuapp.com/franchisee/fetch-all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) // Transform the data into json
        .then(list => {
          if (!list.message) {
            this.listData = list;
            this.tempListData = list;
            if (this.tempListData.length > 8) {
              this.tempListData.length = 8;
            }
          }
        });
    }
  }
};
</script>

<style scoped>
.flist-table {
  font-family: arial, sans-serif;
  border-collapse: separate;
  border-spacing: 0 20px;
  width: 100%;
  margin-top: 20px;
}
.flist-table td,
.flist-table th {
  /* border: 1px solid #dddddd; */
  text-align: center;
  /* padding: 8px; */
}
.flist-list-heading th {
  font-size: 16px;
  font-weight: 500;
  color: #b1b1b1;
  text-align: center;
}
.flist-list-data th {
  font-size: 16px;
  font-weight: 500;
  color: #707070;
  /* text-align: left; */
}
.flist-parent {
  padding: 0 50px 50px 50px;
}
.flist-list-data {
  background-color: #ffffff;
  height: 30px;
}
.overview-parent-p {
  font-size: 30px;
  font-weight: bold;
  color: #ffa159;
}
.overview-parent a {
  cursor: pointer;
  font-size: 16px;
  color: #27b89b;
}
.overview-parent div {
  justify-content: space-between;
  align-items: center;
}
.report-data {
  margin-left: 10px;
}
.report-data p:first-child {
  margin-bottom: 5px;
}
.report-data-parent {
  justify-content: space-between;
  padding: 15px 0;
}
.report-data-parent div {
  align-items: center;
}
.report-parent-p {
  font-size: 30px;
  font-weight: bold;
  color: #27b89b;
}
.report-parent {
  margin-bottom: 20px;
}
.report-parent,
.overview-parent {
  width: 80%;
  border: solid 1px #ccc;
  padding: 15px 30px;
  border-radius: 10px;
}
.home {
  /* justify-content: center; */
  align-items: center;
}
.c-row {
  display: flex;
  flex-direction: row;
}
.c-col {
  display: flex;
  flex-direction: column;
}
</style>
