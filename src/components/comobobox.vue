<template>
  <div>
    <p></p>
    <div class="franchisee-list">
      <input
        type="text"
        name="Search"
        id="search-franchisee"
        v-model="searchInput"
        @keyup="handleSearch"
      />
      <span class="o-date-list">
        <label class="container" v-for="(item,idx) in listData" :key="idx" @click="select(item)">
          <p v-if="item.name" class="assign-f-name">{{item.name}}</p>
          <input v-if="item.name" type="checkbox" />
          <span v-if="item.name" class="checkmark"></span>
        </label>
      </span>
    </div>
    <button class="save-btn" @click="savedata">Save</button>
  </div>
</template>

<script>
export default {
  props: {
    email: { type: String, required: true, default: null },
    already: { type: Array, required: true, default: null }
  },
  data() {
    return {
      listData: null,
      tempListData: null,
      assigned_franchisee_uid: [],
      assigned_franchisee_name: [],
      searchInput: null,
      timer: 0
    };
  },
  created() {
    // this.tickall();
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
        }
      });
  },
  mounted() {
    this.tickall();
  },
  methods: {
    tickall() {
      setTimeout(() => {
        for (var i in document.getElementsByClassName("assign-f-name")) {
          if (
            this.$props.already.includes(
              document.getElementsByClassName("assign-f-name")[i].innerHTML
            )
          ) {
            document.getElementsByClassName("assign-f-name")[i].click();
          }
        }
      }, 2000);
    },
    savedata() {
      console.log(this.assigned_franchisee_name);

      fetch("https://vahak-api-server.herokuapp.com/admin/setfranchisee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assigned_franchisee_uid: this.assigned_franchisee_uid,
          assigned_franchisee_name: this.assigned_franchisee_name,
          email: this.$props.email
        })
      })
        .then(res => res.json()) // Transform the data into json
        .then(resback => {
          if (resback.message == "done") {
            console.log("done");
          }
        });
    },
    handleSearch() {
      if (this.searchInput && this.searchInput.length > 0) {
        const filter = product =>
          product.name &&
          product.name.toLowerCase().includes(this.searchInput.toLowerCase());
        const a = this.tempListData.filter(filter);
        if (a.length > 0) {
          this.listData = a;
        } else {
          this.listData = 0;
        }
      } else {
        this.listData = this.tempListData;
        this.listData.length = 5;
      }
    },
    select(i) {
      if (this.timer == 0) {
        if (this.assigned_franchisee_name.includes(i.name)) {
          this.assigned_franchisee_name = this.assigned_franchisee_name.filter(
            value => {
              return value != i.name;
            }
          );
          this.assigned_franchisee_uid = this.assigned_franchisee_uid.filter(
            value => {
              return value != i.uid;
            }
          );
          this.timer = 100;
          setTimeout(() => {
            this.timer = 0;
          }, 100);
        } else {
          this.assigned_franchisee_name.push(i.name);
          this.assigned_franchisee_uid.push(i.uid);
          this.timer = 100;
          setTimeout(() => {
            this.timer = 0;
          }, 100);
        }
      }
    }
  }
};
</script>

<style scoped>
.save-btn {
  outline: none;
  border: none;
  background: green;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  align-self: center;
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin: 15px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
#search-franchisee {
  border: none;
  background-color: #fffaf7;
  outline: none;
  height: 40px;
  padding: 0px 10px;
  border-bottom: 1px solid black;
}
.o-date-list {
  list-style: none;
  margin: 0;
  margin-top: 10px;
  height: 155px !important;
  display: block;
  overflow-y: scroll;
}
.franchisee-list {
  width: max-content;
  height: 220px;
}
</style>