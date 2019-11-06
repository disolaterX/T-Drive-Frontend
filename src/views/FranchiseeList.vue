<template>
  <div class="c-col flist-parent">
    <div class="c-row flist-head">
      <p>Assigned franchisee</p>
      <button>+ Assign New Franchise</button>
    </div>
    <div class="c-row flist-action">
      <span class="c-row action-btn-parent">
        <button class="active-action" @click="()=>{this.sortList(0)}">All</button>
        <button @click="()=>{this.sortList(1)}">Approved</button>
        <button @click="()=>{this.sortList(2)}">Terminated / Pending</button>
      </span>
      <div class="flist-search c-row">
        <input type="search" name="search" placeholder="Search..." />
        <img src="@/assets/search.svg" alt />
      </div>
    </div>
    <table class="flist-table">
      <tr class="flist-list-heading">
        <th>Franchise Name</th>
        <th>Joined</th>
        <th>Email</th>
        <th>Rental Income</th>
        <th>Profile</th>
      </tr>
      <tr class="flist-list-data" v-for="(i,idx) in listData" :key="idx">
        <th>{{i.name}}</th>
        <th v-if="i.date_of_activation">{{i.date_of_activation.split('T')[0]}}</th>
        <th v-else></th>
        <th>{{i.email}}</th>
        <th>2229</th>
        <th>
          <button v-if="i.is_verifed" class="active-btn" @click="()=>{changeStatus(0,i)}">ACTIVE</button>
          <button v-else class="non-active-btn" @click="()=>{changeStatus(1,i)}">Pending</button>
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
      tempListData: null
    };
  },
  created() {
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
          this.listData = list;
          this.tempListData = list;
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
    },
    changeStatus(sel, data) {
      var temp = data;
      switch (sel) {
        case 0:
          temp["is_verifed"] = false;
          break;
        case 1:
          temp["is_verifed"] = true;
          break;
        default:
          break;
      }

      setTimeout(() => {
        fetch("https://vahak-api-server.herokuapp.com/franchisee/update/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json()) // Transform the data into json
          .then(resp => {
            this.fetchAll();
          });
      }, 100);
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
  /* text-align: left; */
}
.flist-table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
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