<template >
  <div class="c-col sidebar" @dragover="newAdd">
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_of_Google_Drive.svg"
        style="margin-top:25px"
        width="64"
        alt
      />
    </div>
    <div>
      <button class="add-new-btn" @click="newAdd">Add New +</button>
    </div>
    <div class="c-col action-list">
      <span class="c-row active">
        <img src="@/assets/search.svg" alt />
        <p>My Drive</p>
      </span>
      <span class="c-row">
        <img src="@/assets/search.svg" alt />
        <p>Resent</p>
      </span>
      <span class="c-row">
        <img src="@/assets/search.svg" alt />
        <p>Bin</p>
      </span>
    </div>
    <div>
      <button class="bck-btn">Backup</button>
    </div>
    <input type="file" name id="dd" ref="file" @change="assign" multiple style="display:none" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      fda: null
    };
  },
  methods: {
    newAdd() {
      this.$refs.file.click();
    },
    assign() {
      this.file = 0;
      this.fda = new FormData();
      this.file = this.$refs.file.files;

      for (let index = 0, newFile; index < this.file.length; index++) {
        var blob = this.file[index].slice(
          0,
          this.file[index].size,
          "image/png"
        );
        newFile = new File(
          [blob],
          this.$store.state.findtag +
            "-" +
            this.$store.state.pass +
            "-" +
            this.file[index].name,
          { type: "image/png" }
        );

        this.fda.append("file", newFile);
      }
      setTimeout(() => {
        this.senddata();
      }, 100);
    },
    senddata() {
      axios
        .post("https://travoapi.herokuapp.com/upload", this.fda, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
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
              console.log(this.$store.state.userimg);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.sidebar div {
  display: flex;
  width: 100%;
  justify-content: center;
}
.action-list {
  width: 100%;
  margin-bottom: 50px;
}
.action-list p {
  margin-left: 15px;
}
.action-list span {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 10px 15px;
}
.active {
  background: #d9f0ed;
}
.bck-btn {
  background: #d3edf7;
  padding: 10px 30px;
  border-radius: 50px;
  width: 80%;
  border: 1px solid #4aa9ca;
}
.add-new-btn {
  border: none;
  background: #25a7d1;
  color: white;
  padding: 10px 15px;
  width: 80%;
  border-radius: 10px;
  margin-bottom: 50px;
  outline: none;
  margin-top: 50px;
}
.sidebar {
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: white;
  width: 12em;
  border-bottom-right-radius: 250px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.c-col {
  display: flex;
  flex-direction: column;
}

.c-row {
  display: flex;
  flex-direction: row;
}
</style>