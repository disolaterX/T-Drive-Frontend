<template>
  <div class="c-col flist-parent">
    <div class="c-row flist-head">
      <p>All Battery</p>
      <button @click="()=>{addnewbattery()}">+ Add New Battery</button>
    </div>
    <div class="c-row flist-action">
      <span class="c-row action-btn-parent">
        <button class="active-action" @click="()=>{this.sortList(0)}">All</button>
        <!-- <button @click="()=>{this.sortList(1)}">Approved</button>
        <button @click="()=>{this.sortList(2)}">Terminated / Pending</button>-->
      </span>
      <div class="flist-search c-row">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          v-model="searchInput"
          @keyup="handleSearch"
        />
        <img src="@/assets/search.svg" alt />
      </div>
    </div>
    <table class="flist-table">
      <tr class="flist-list-heading">
        <th>Assigned Franchisee</th>
        <th>Battery Type</th>
        <th>Battery Serial</th>
        <th>Purchase</th>
        <th>Action</th>
      </tr>
      <tr class="flist-list-data" v-for="(i,idx) in listData" :key="idx" @click="opendetails(i)">
        <th>{{nameList[idx]}}</th>
        <th>{{i.battery_type}}</th>
        <th>{{i.battery_serial}}</th>
        <th>{{i.purchase.split('T')[0]}}</th>
        <th>
          <button v-if="i.is_verifed" class="active-btn">ACTIVE</button>
          <button v-else class="non-active-btn">Pending</button>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: null,
      tempListData: null,
      searchInput: null,
      nameList: [],
      franchiseeList: null
    };
  },
  created() {
    this.fetchFranchisee();
    this.fetchAll();
  },
  methods: {
    fetchFranchisee() {
      fetch("https://vahak-api-server.herokuapp.com/franchisee/fetch-all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) // Transform the data into json
        .then(list => {
          if (!list.message) {
            this.franchiseeList = list;
          }
        });
    },
    nameReturn() {
      this.nameList = [];
      this.listData.forEach(e1 => {
        this.franchiseeList.forEach(e2 => {
          if (e2.uid == e1.f_uid) {
            this.nameList.push(e2.name);
          }
        });
      });
    },
    handleSearch() {
      if (this.searchInput && this.searchInput.length > 0) {
        const filter = product =>
          product.battery_serial &&
          product.battery_serial
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        const a = this.tempListData.filter(filter);
        if (a.length > 0) {
          this.listData = a;
        } else {
          this.listData = 0;
        }
      } else {
        this.listData = this.tempListData;
      }
    },
    addnewbattery() {
      this.$router.push({
        name: "Battery Registration",
        params: {
          lastpage: "/allbattery",
          franchiseeList: this.franchiseeList
        }
      });
    },
    fetchAll() {
      fetch("https://vahak-api-server.herokuapp.com/battery/fetch-all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) // Transform the data into json
        .then(list => {
          if (!list.message) {
            // console.log(list);
            this.listData = list;
            this.tempListData = this.listData;
            this.nameReturn();
          }
        });
    },
    sortList(sel) {
      var temp = [];
      var i;

      for (i in document.getElementsByClassName("action-btn-parent")[0]
        .children) {
        if (
          typeof document.getElementsByClassName("action-btn-parent")[0]
            .children[i] == "object"
        ) {
          document
            .getElementsByClassName("action-btn-parent")[0]
            .children[i].classList.remove("active-action");
          document
            .getElementsByClassName("action-btn-parent")[0]
            .children[sel].classList.add("active-action");
        }
      }

      switch (sel) {
        case 0:
          this.listData = this.tempListData;
          break;
        case 1:
          temp = [];
          this.tempListData.forEach(e => {
            if (e.is_verifed == true) {
              temp.push(e);
            }
          });
          this.listData = temp;
          break;
        case 2:
          temp = [];
          this.tempListData.forEach(e => {
            if (e.is_verifed == false) {
              temp.push(e);
            }
          });
          this.listData = temp;
          break;

        default:
          this.listData = this.tempListData;
          break;
      }
    }
  }
};
</script>

<style scoped>
.flist-parent {
  padding: 0 50px 50px 50px;
}
.flist-list-data {
  width: 90%;
  border-radius: 4px;
  border: solid 1px #707070;
  background-color: #ffffff;
  height: 50px;
  margin: 0 0 20px 0;
}
.flist-list-data button {
  width: 125px;
  height: 30px;
  background: white;
  border-radius: 5px;
}
.non-active-btn {
  border: solid 1px #f56e72 !important;
  color: #f56e72 !important;
}
.active-btn {
  border: solid 1px #6ef5b1;
}
.flist-list-data th {
  font-size: 16px;
  font-weight: 500;
  color: #707070;

  border: solid 1px #707070;
  border-right: none;
  border-left: none;
  /* text-align: left; */
}
.flist-table {
  font-family: arial, sans-serif;
  border-collapse: separate;
  border-spacing: 0 20px;
  width: 100%;
}
.flist-list-data th:first-child {
  border-left: 1px solid #707070;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.flist-list-data th:last-child {
  border-right: 1px solid #707070;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.flist-table td,
.flist-table th {
  /* border: 1px solid #dddddd; */
  text-align: center;
  padding: 8px;
}
.flist-list-heading th {
  font-size: 16px;
  font-weight: 500;
  color: #b1b1b1;
  text-align: center;
}
.flist-search {
  position: relative;
}
.flist-search input {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  padding: 5px 7px;
}

.flist-search img {
  position: absolute;
  right: 0px;
}
.flist-action {
  justify-content: space-between;
  align-items: center;
  margin: 0 0 50px 0;
}

.flist-action button {
  width: auto;
  height: 40px;
  border: solid 1px #b1b1b1;
  background-color: #ffffff;
  color: #b1b1b1;
  outline: none;
}

.active-action {
  border: solid 1px #27b89b !important;
  color: #27b89b !important;
  background-color: #f7fffd !important;
}

.flist-action button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.flist-action button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.c-col {
  display: flex;
  flex-direction: column;
}
.c-row {
  display: flex;
  flex-direction: row;
}
.flist-head {
  justify-content: space-between;
  align-items: center;
  margin: 0 0 25px 0;
}

.flist-head p {
  font-size: 30px;
  font-weight: bold;
  color: #ffa159;
}

.flist-head button {
  width: 207px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #6f96ff;
  background-color: #ffffff;
  outline: none;
}
</style>