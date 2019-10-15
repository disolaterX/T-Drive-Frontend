<template>
  <div>
    <span id="exta-details-background" @click.self="showDetails(null)">
      <span id="exta-details">
        <a @click="showDetails(null)">&#10006;</a>
        <table>
          <tr v-for="(i, idx) in extaDetailsUser" :key="idx">
            <td>{{ idx }}</td>
            <td>{{ i }}</td>
          </tr>
        </table>
      </span>
    </span>
    <span id="franchisee-details-background" @click.self="assignFranchisee()">
      <span id="franchisee-details">
        <a @click="assignFranchisee()">&#10006;</a>
        <input
          type="text"
          placeholder="Type here to search"
          v-model="searchInput"
          @keyup="handleSearch"
        />
        <ul v-if="searchOutput !== null">
          <li
            v-for="(i, idx) in searchOutput"
            :key="idx"
            @click="handleFranchisee(i)"
          >
            {{ i.name }}
          </li>
        </ul>
      </span>
    </span>
    <table id="customers" style="overflow-x:auto;">
      <tr style="text-transform: capitalize;">
        <th v-for="(item, idx) in fields" :key="idx">{{ item }}</th>
      </tr>
      <tr v-for="(item, idx) in this.$store.state.verifyOfcData" :key="idx">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.department }}</td>
        <td>{{ item.assigned_franchisee_name }}</td>
        <td v-if="item.is_verifed == true">Verifed User</td>
        <td v-else>Disabled User</td>
        <td class="actionBtn">
          <button v-if="item.is_verifed == false" @click="verifyUser(item)">
            Verify
          </button>
          <button v-else @click="verifyUser(item)">Disable</button>
          <button @click="showDetails(item)">See Details</button>
          <button @click="assignFranchisee(item)">Assign Franchisee</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "name",
        "email",
        "mobile",
        "department",
        "assigned to",
        "status",
        "action"
      ],
      currentSelected: null,
      extaDetailsOpen: false,
      extaDetailsUser: null,
      assignFranchiseeOpen: false,
      searchInput: null,
      searchOutput: null,
      assignFranchiseeUser: null
    };
  },
  created() {
    if (this.$store.state.user.userType == "admin") {
      this.fetchUpdatedData();
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    handleSearch() {
      if (this.searchInput.length > 0) {
        const filter = product =>
          product.name &&
          product.name.toLowerCase().includes(this.searchInput.toLowerCase());
        const a = this.$store.state.verifyFraData.filter(filter);
        if (a.length > 0) {
          this.searchOutput = a;
        }
      } else {
        this.searchOutput = null;
      }
    },
    fetchUpdatedData() {
      fetch("https://vahak-api-server.herokuapp.com/fetch/headoffice-verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) // Transform the data into json
        .then(data => {
          this.$store.dispatch("setVerifyOfcData", data);
        });
    },
    showDetails(selectedUserData) {
      if (this.extaDetailsOpen == false) {
        document.getElementById("customers").style.filter = "blur(4px)";
        document.getElementById("exta-details-background").style.visibility =
          "visible";
        this.extaDetailsUser = selectedUserData;
        this.extaDetailsOpen = true;
      } else {
        document.getElementById("customers").style.filter = "none";
        document.getElementById("exta-details-background").style.visibility =
          "hidden";
        this.extaDetailsOpen = false;
      }
    },
    handleFranchisee(franchisee) {
      this.assignFranchiseeUser["assigned_franchisee_uid"] = franchisee.uid;
      this.assignFranchiseeUser["assigned_franchisee_name"] = franchisee.name;

      fetch(
        "https://vahak-api-server.herokuapp.com/update/headoffice/setfranchisee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.assignFranchiseeUser)
        }
      )
        .then(res => res.json()) // Transform the data into json
        .then(() => {
          this.fetchUpdatedData();
          document.getElementById("customers").style.filter = "none";
          document.getElementById(
            "franchisee-details-background"
          ).style.visibility = "hidden";
          this.assignFranchiseeOpen = false;
          this.assignFranchiseeUser = null;
        });
    },
    assignFranchisee(franchisee) {
      if (this.assignFranchiseeOpen == false) {
        document.getElementById("customers").style.filter = "blur(4px)";
        document.getElementById(
          "franchisee-details-background"
        ).style.visibility = "visible";
        this.assignFranchiseeOpen = true;
        this.assignFranchiseeUser = franchisee;
      } else {
        document.getElementById("customers").style.filter = "none";
        document.getElementById(
          "franchisee-details-background"
        ).style.visibility = "hidden";
        this.assignFranchiseeOpen = false;
        this.assignFranchiseeUser = null;
      }
    },
    verifyUser(selectedUserData) {
      if (selectedUserData.is_verifed == false) {
        selectedUserData["is_verifed"] = true;
        selectedUserData["assigned_franchisee_uid"] = [];
        selectedUserData["assigned_franchisee_name"] = [];
      } else {
        selectedUserData["is_verifed"] = false;
        selectedUserData["assigned_franchisee_uid"] = [];
        selectedUserData["assigned_franchisee_name"] = [];
      }

      fetch("https://vahak-api-server.herokuapp.com/update/headoffice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(selectedUserData)
      })
        .then(res => res.json()) // Transform the data into json
        .then(() => {
          this.fetchUpdatedData();
        });
    }
  }
};
</script>

<style scoped>
#franchisee-details-background {
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
}
#franchisee-details {
  width: 50vw;
  height: max-content;
  position: fixed;
  z-index: 1000;
  background-color: lightgray;
  left: 25%;
  top: 5%;
  border: 1px solid black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#franchisee-details ul {
  list-style-type: none;
  padding: 10px;
  margin: 0;
}

#franchisee-details li {
  list-style-type: none;
  padding: 10px;
  margin: 0;
  cursor: pointer;
  background: white;
  margin: 5px 0;
}

#exta-details-background {
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
}
#exta-details {
  width: 50vw;
  height: max-content;
  position: fixed;
  z-index: 1000;
  background-color: lightgray;
  left: 25%;
  top: 5%;
  border: 1px solid black;
  padding: 5px;
}
#exta-details table {
  width: 100%;
  height: 100%;
}

#exta-details a,
#franchisee-details a {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.actionBtn {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
#customers td {
  border: 1px solid #ddd;
  padding: 10px 0;
  text-align: center;
}

#customers th {
  border: 1px solid #ddd;
  padding: 10px 0;
  margin: 0;
}
#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}
#customers tr:hover {
  background-color: #ddd;
}
#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;
}
</style>
