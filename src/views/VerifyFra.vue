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
    <table id="customers" style="overflow-x:auto;">
      <tr style="text-transform: capitalize;">
        <th v-for="(item, idx) in fields" :key="idx">{{ item }}</th>
      </tr>
      <tr v-for="(item, idx) in this.$store.state.verifyFraData" :key="idx">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.city }}</td>
        <td v-if="item.is_verifed == true">Verifed User</td>
        <td v-else>Disabled User</td>

        <td class="actionBtn">
          <button v-if="item.is_verifed == false" @click="verifyUser(item)">Verify</button>
          <button v-else @click="verifyUser(item)">Disable</button>
          <button @click="showDetails(item)">See Details</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["name", "email", "mobile", "city", "status", "action"],
      currentSelected: null,
      extaDetailsOpen: false,
      extaDetailsUser: null
    };
  },
  created() {
    this.fetchUpdatedData();
  },
  methods: {
    fetchUpdatedData() {
      fetch("https://vahak-api-server.herokuapp.com/fetch/franchisee-verfiy/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json()) // Transform the data into json
        .then(data => {
          this.$store.dispatch("setVerifyFraData", data);
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
    verifyUser(selectedUserData) {
      if (selectedUserData.is_verifed == false) {
        selectedUserData["is_verifed"] = true;
      } else {
        selectedUserData["is_verifed"] = false;
      }

      fetch("https://vahak-api-server.herokuapp.com/update/franchisee/", {
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

#exta-details a {
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
