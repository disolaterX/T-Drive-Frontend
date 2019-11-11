<template>
  <div
    v-if="this.$store.state.userimg&& this.$store.state.userimg != 'empty'"
    class="grid-container"
  >
    <div
      class="grid-item"
      v-for="(i,idx) in this.$store.state.userimg"
      :key="idx"
      @click="()=>{openNew(i)}"
    >
      <img class="data-img" :src="i" alt />
      <span>
        <img src="@/assets/icons/gallery.svg" alt height="24" />
        <p>{{i.split('/')[5]}}</p>
      </span>
    </div>
  </div>
  <div
    v-else-if="this.$store.state.userimg && this.$store.state.userimg == 'empty'"
    style="margin: auto;width: max-content;height: max-content;"
  >
    <img src="@/assets/upload.svg" style="width: 30em;height: 30em; " alt />
    <p style="text-align: center;font-size: 18px;font-weight: bold;">Loading...</p>
  </div>
  <div v-else style="margin: 10% 50%;">
    <img src="@/assets/loading.gif" style="width: 10em;height: 10em; " alt />
    <p style="text-align: center;font-size: 18px;font-weight: bold;">Loading...</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.userimg);

    this.fetchMyData();
  },
  methods: {
    openNew(curl) {
      window.open(curl, "_blank");
    },
    assign() {
      this.file = 0;
      this.fda = new FormData();
      this.file = this.$refs.file.files;
      for (let index = 0; index < this.file.length; index++) {
        this.fda.append("file", this.file[index]);
      }
      this.fda.append("uid", "2323");
    },
    async test() {
      axios
        .post("https://travoapi.herokuapp.com/upload", this.fda, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchMyData() {
      console.log("caaled");

      axios
        .post("https://travoapi.herokuapp.com/upload/fetch", {
          findtag: this.$store.state.findtag,
          pass: this.$store.state.pass
        })
        .then(res => {
          var mydata = [];
          res.data.forEach(element => {
            mydata.push(element);
            console.log(element);
          });
          this.$store.state.userimg = mydata;
          if (mydata.length == 0) {
            this.$store.state.userimg = "empty";
          }
          console.log(this.$store.state.userimg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: flex;
  padding: 50px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  margin: 20px;
  text-align: center;
  width: 200px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  font-size: 30px;

  margin: 20px;

  text-align: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}
.data-img {
  width: 100%;
  height: 100px;
}
.grid-item p {
  font-size: 14px;
}
.grid-item span {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 5px;
}
</style>
