<template>
  <div v-if="this.$store.state.findtag" id="app" @drop.prevent="addFile" @dragover.prevent>
    <cheader></cheader>
    <div class="side-bar-content">
      <sidebar />
      <router-view class="content-route"></router-view>
    </div>
  </div>
  <Auth v-else />
</template>

<script>
import Auth from "@/views/Auth.vue";
import sidebar from "@/components/sidebar.vue";
import cheader from "@/components/header.vue";
import axios from "axios";
export default {
  data() {
    return {
      file: []
    };
  },
  components: {
    sidebar,
    cheader,
    Auth
  },
  mounted() {
    console.log(this.$store.state.findtag);

    // console.log(
    //   (document.getElementsByClassName("html-p")[0].style.background =
    //     "@/assets/bg.jpg")
    // );
    document.getElementsByClassName("html-p")[0].style.background;
    const IMAGE_URLS =
      "https://img.wallpapersafari.com/desktop/1280/1024/30/95/vdSt0b.jpg";
    document.getElementsByClassName("html-p")[0].style.background =
      "url('" + IMAGE_URLS + "')";
    // document.body.style.background = "url('" + IMAGE_URLS + "')";
    // document.body.style.background = "url('"+IMAGE_URLS.[image]+"')";
  },
  methods: {
    addFile(e) {
      this.file = [];
      let droppedFiles = e.dataTransfer.files;
      console.log(droppedFiles);

      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach(f => {
        this.file.push(f);
      });
      this.assign();
    },
    assign() {
      var fda = new FormData();

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

        fda.append("file", newFile);
      }
      setTimeout(() => {
        this.senddata(fda);
      }, 100);
    },
    senddata(fda) {
      axios
        .post("https://travoapi.herokuapp.com/upload", fda, {
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

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /* background-color: #f1f1f1; */
  /* background-image: url(bg); */
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100% !important;
  padding: 0 !important;
  position: relative;
}
.side-bar-content {
  width: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content-route {
  /* margin: 40px 0 0 192px;
  width: 80.6%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: scroll; */
  margin: 0 0 0 12em;
  width: 100%;
  height: 100vh;
}
</style>
