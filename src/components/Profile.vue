<template>
  <div>
    <section id="user-info">
      <div id="profile-pic-container">
        <img id="profile-pic" v-bind:src="this.user.profilePic" />
      </div>
      <b-button
        id="updateProfilePic"
        type="submit"
        variant="secondary"
        v-on:click="update = !update"
        >Update your profile pic</b-button
      >
      <br />
      <br />
      <template v-if="update">
        <b-row>
          <b-col>
            <img v-bind:src="this.user.profilePic" id="previewImage" />
          </b-col>
          <b-form-group>
            <b-button v-on:click="onPickFile">Upload Image</b-button><br>
            <input
              id="fileButton"
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              v-on:change="onFilePicked"
            />
            <div id="progress-container">
              <div>Upload status:</div>
                <progress
                  id="uploader"
                  class="right-input"
                  value="0"
                  max="100"
                ></progress>
              </div>
            <b-button v-on:click="submitPic">Submit</b-button>
          </b-form-group>
        </b-row>
      </template>

      <h1>{{ this.user.username }}</h1>
      <h5>{{ this.email }}</h5>
    </section>

    <section id="user-acivities">
      <b-tabs id="tabs">
        <b-tab title="My Marketplace Listings" active>
          <ul>
            <li v-for="item in mymktlist" v-bind:key="item.name">
              <div>
                <h2>{{ item.name }}</h2>
                <div>$ {{ item.price }} / item</div>
                <div>Quantity Sold: {{ item.quantitySold }}</div>
                <img v-bind:src="item.img" />
                <div>
                  <b-button
                    variant="danger"
                    v-on:click="
                      removeListing(item.category, item.mktdocRef, item.id)
                    "
                    >Remove Listing</b-button
                  >
                </div>
              </div>
            </li>
          </ul>
        </b-tab>

        <b-tab title="My Purchase History" active>
          <ul>
            <li v-for="item in purchasedlist" v-bind:key="item.name">
              <div>
                <h2>{{ item.name }}</h2>
                <div>$ {{ item.price }} / item</div>
                <div>Quantity: {{ item.quantity }}</div>
                <img v-bind:src="item.img" />
              </div>
            </li>
          </ul>
        </b-tab>

        <b-tab title="Events you have signed up for" active>
          <ul>
            <li v-for="event in eventlist" v-bind:key="event.name">
              <div>
                <h2>{{ event.name }}</h2>
                <div>{{ event.date.toDate() }}</div>
                <div>Location: {{ event.location }}</div>
                <img v-bind:src="event.img" />
              </div>
            </li>
          </ul>
        </b-tab>

        <b-tab title="Events you have requested to host" active>
          <ul>
            <li v-for="event in eventRequestList" v-bind:key="event.name">
              <div>
                <h2>{{ event.name }}</h2>
                <div>Location: {{ event.location }}</div>
                <img v-bind:src="event.img" />
                <div>Status: {{ event.status }}</div>
              </div>
            </li>
          </ul>
        </b-tab>

        <b-tab title="My Infohub Posts" active>
          <ul>
            <li v-for="item in infolist" v-bind:key="item.name">
              <div>
                <h2>{{ item.name }}</h2>
                <div class="description">{{ item.description }}</div>
              </div>
              <img v-bind:src="item.img" />
            </li>
          </ul>
        </b-tab>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      update: false,
      quantitySold: [],
      user: {},
      email: null,
      mymktlist: [],
      purchasedlist: [],
      infolist: [],
      eventlist: [],
      eventRequestList: [],
      collectionName: "",
      subCollectionName: "",
      currUserEmail: null,
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
        .ref("events/" + new Date() + "-" + file.name);

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
    submitPic: function () {
      var currentUser = firebase.auth().currentUser;
      var preview = document.getElementById("previewImage");

      if (preview.src == this.placeholderURL) {
        //not updated yet
        alert(
          "Submission failed. Please wait for your image upload to complete."
        );
        return;
      }
      database
        .collection("users")
        .doc(currentUser.email)
        .update({
          profilePic: preview.src,
        })
        .then(() => {
          alert("your profile pic has been updated!");
          location.reload();
        });
    },

    removeListing: function (category, mktdocRef, userdocRef) {
      //remove from marketplace
      database
        .collection("mkt-categories")
        .doc(category)
        .collection("items")
        .doc(mktdocRef)
        .delete()
        //remove from user's my-mkt-list (profile page display)
        .then(() => {
          database
            .collection("users")
            .doc(this.currUserEmail)
            .collection("my-mkt-list")
            .doc(userdocRef)
            .delete();
        })
        .then(() => location.reload());
    },

    fetchItems: function () {
      let currentUser = firebase.auth().currentUser;
      this.currUserEmail = currentUser.email;
      this.collectionName = this.$route.params.collectionName;
      this.subCollectionName = this.$route.params.subCollectionName;

      //fetch profile pic in firestore -> use it as src for preview and main profile pic instead of hardcoding urlhere

      database
        .collection("users")
        .doc(this.currUserEmail)
        .get()
        .then((snapshot) => (this.user = snapshot.data()));

      this.email = currentUser.email;

      //for eventlist
      database
        .collection("users")
        .doc(this.currUserEmail)
        .collection("events")
        .get()
        .then((snapshot) => {
          let event = {};
          snapshot.forEach((doc) => {
            event = doc.data();
            event.id = doc.id;
            this.eventlist.push(event);
          });
        });

      //for eventRequestedList
      database
        .collection("users")
        .doc(this.currUserEmail)
        .collection("requested-events")
        .get()
        .then((snapshot) => {
          let event = {};
          snapshot.forEach((doc) => {
            event = doc.data();
            event.id = doc.id;
            this.eventRequestList.push(event);
          });
          console.log(this.eventRequestList);
        });

      //for purchaselist
      database
        .collection("users")
        .doc(this.currUserEmail)
        .collection("mkt-history")
        .get()
        .then((snapshot) => {
          let item = {};
          snapshot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.purchasedlist.push(item);
            this.quantitySold.push(item.quantity);
            console.log("quantity: " + item.quantity);
          });
        });

      //for mymktlist
      database
        .collection("users")
        .doc(this.currUserEmail)
        .collection("my-mkt-list")
        .get()
        .then((snapshot) => {
          let item = {};
          snapshot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.mymktlist.push(item);
          });
        });

      //for infolist
      database
        .collection("users")
        .doc(this.currUserEmail)
        .collection("info")
        .get()
        .then((snapshot) => {
          let item = {};
          snapshot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.infolist.push(item);
          });
        });
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>



<style scoped>
#profile-pic-container {
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 50%;
}
#profile-pic {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
}
#previewImage {
  width: 30vw;
  height: 30vh;
  object-fit: contain;
}
#progress-container {
  margin-top: 10px;
}
#uploader {
  background-color: green;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  padding: 1%;
  border: 1px solid #e48257;
  margin: 1%;
  width: 31.3%;
}
img {
  height: 300px;
  width: 90%;
  object-fit: cover;
}
.price {
  color: #3a6351;
  font-weight: bold;
  font-size: 20px;
}
.itemName {
  color: #393232;
  font-size: 24px;
  max-height: 32px;
  overflow: hidden;
}
.username {
  font-size: 30px;
  color: #e48257;
}
.description {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 4.5em;
  width: 90%;
}
#user-info * {
  margin-left: auto;
  margin-right: auto;
}
</style>