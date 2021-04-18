<template>
  <body>
    
    <div>
      <div>
        <div class = "topContainer">
          <h2 class = 'title'> Information Hub </h2>
          <div id="searchbar-container">
            <b-form-input
              v-on:keyup.enter="search_text()"
              v-model="search.text"
              type="text"
              placeholder="Looking for something?"
            ></b-form-input>
          </div>
        </div>
        <h2 class = 'subtitle'> {{this.subCollectionName}} </h2>
      </div>

      <div v-if="searchList == null">
        <div v-if="search.text == ''">
          <ul>
            <li v-for="item in itemList" v-bind:key="item.name">
              <img v-bind:src="item.img" />
              <h4 class="itemName">{{ item.name }}</h4>
              <div class="username"> By {{ item.username }}</div> <br>
    
              <div>
                <b-button
                  v-bind:itemid="item.id"
                  v-bind:collectionName="collectionName"
                  v-bind:subCollectionName="subCollectionName"
                  v-on:click="route($event)"
                  variant="outline-success"
                >
                  Read More
                </b-button>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class = "searchOutput">Press Enter to search.</div>
      </div>

      <div v-else>
        <div v-if="this.searchList.length == 0" class = "searchOutput">
          No matching results. Try another search?
        </div>
        <div v-else-if="this.searchList.length > 0">
          <div class = "searchOutput">{{ this.searchList.length }} item(s) found</div>
          <ul>
            <li v-for="item in searchList" v-bind:key="item.name">
              <img v-bind:src="item.img" />
              <h4 class="itemName">{{ item.name }}</h4>
              <div class="username"> By {{ item.username }}</div> <br>

              <div>
                <b-button
                  v-bind:itemid="item.id"
                  v-bind:subCollectionName="subCollectionName"
                  v-on:click="route($event)"
                  variant="outline-success"
                >
                  Read More
                </b-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      placeholderURL:
        "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
      itemList: [],
      searchList: null,
      collectionName: "",
      subCollectionName: "", //  crafts/outside/workshop
      show: false,
      userInfo: {},
      item: {
        email: null,
        username: null,
        name: "",
        description: "",
        img: "", //images url
      },
      search: {
        text: "",
      },
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked: function (event) {
      const file = event.target.files[0];

      var uploader = document.getElementById("uploader");
      var preview = document.getElementById("previewImage");

      //create storage ref
      var storageRef = firebase
        .storage()
        .ref("infohub/" + new Date() + "-" + file.name); //can create a storage for infohub

      //upload file
      var task = storageRef.put(file);

      //update progress bar
      task.on(
        "state_changed",

        function (snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },

        //handle errors here
        function (error) {
          console.log(error.message);
        },

        //handle successful uploads on complete
        function () {
          task.snapshot.ref.getDownloadURL().then(function (storageURL) {
            preview.src = storageURL;
            console.log(preview.src);
          });
        }
      );
    },
    submit: function (event) {
      event.preventDefault();
      var preview = document.getElementById("previewImage");
      if (preview.src == this.placeholderURL) {
        //not updated yet
        alert(
          "Submission failed. Please wait for your image upload to complete."
        );
        return;
      }
      this.item.img = preview.src;
      this.item.username = this.userInfo.username;

      console.log("this.item: " + this.item);

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("items")
        .add(this.item)
        .then(() => {
          database
            .collection("users")
            .doc(this.item.email)
            .collection("info")
            .add(this.item)
            .then(() => {
              location.reload();
            });
        });
      alert("Post is saved!");
    },
    fetchItems: function () {
      this.collectionName = "info-categories";
      this.subCollectionName = this.$route.name.toLowerCase();

      //for retrieving username from currentUser email
      let currentUser = firebase.auth().currentUser;
      this.item.email = currentUser.email;
      database
        .collection("users")
        .doc(currentUser.email)
        .get()
        .then((snapshot) => {
          this.userInfo = snapshot.data();
        });

      //for retrieving infohub listings
      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("items")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            console.log(doc.data());
            item = doc.data();
            if (item.img == "") {
              item.img =
                "https://firebasestorage.googleapis.com/v0/b/enviro-buddy.appspot.com/o/placeholder.png?alt=media&token=e630e1d2-cb1b-4a36-8d33-941b3adc71c5";
            } else {
              console.log("ok");
            }
            item.id = doc.id;
            this.itemList.push(item);
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "info-details",
        params: {
          itemid: event.target.getAttribute("itemid"),
          collectionName: event.target.getAttribute("collectionName"),
          subCollectionName: event.target.getAttribute("subCollectionName"),
        },
      });
    },
    search_text: function () {
      //reset searchlist
      this.searchList = [];
      var searchText = this.search.text.toLowerCase();

      for (var item of this.itemList) {
        if (item.name.toLowerCase().includes(searchText)) {
          this.searchList.push(item);
        }
      }
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
.topContainer {
  display: flex;
  flex-wrap: wrap;
}
.title {
  text-align: left;
  margin-left:1%;
  overflow: hidden;
  text-transform: uppercase;
  font-family: "Lucida Sans", sans-serif;
  font-weight:lighter;
  margin-bottom:10px;
}
.subtitle {
  text-align: left;
  margin-left:1%;
  overflow: hidden;
  text-transform: uppercase;
  font-family: "Lucida Sans", sans-serif;
  font-weight:lighter;
  font-size:1.7rem;
  color:#3a6351;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  margin: 1%;
  width: 31.3%;
}
img {
  height: 400px;
  width: 100%;
  object-fit: cover;
}
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: auto;
}
.username {
  color:#57585a;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk",Helvetica,Arial,sans-serif;
}
.itemName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.5em;
  height: 1.5em;
  width: 100%;
  text-align: left;
  font-family: "FKGrotesk",Helvetica,Arial,sans-serif;
  font-weight:600;
  margin-top: 5px;
  margin-left: 5px;
}
#form {
  width: 60%;
  margin-left: 20%;
}
.searchOutput {
  display:flex;
  justify-content: center;
}
</style>