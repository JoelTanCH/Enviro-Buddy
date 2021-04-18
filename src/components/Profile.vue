<template>
  <div class="container-fluid">
    <div>
      <h1 class="page-title">Profile</h1>
    </div>
    <b-row id="user-info">
      <b-col class="col-3 d-flex justify-content-center">
        <div class="profile-pic-container" v-on:click="onPickFile">
          <input
            id="fileInput"
            style="display: none"
            type="file"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
          />
          <img id="profile-pic" v-bind:src="this.user.profilePic" />
          <div class="overlay">
            <div id="overlay-text">
              <b-icon-pencil font-scale="1.5"></b-icon-pencil>
              Update Profile Picture
            </div>
          </div>
        </div>
      </b-col>

      <b-col id="right-user-info">
        <h1>{{ this.user.username }}</h1>
        <div>{{ this.email }}</div>
      </b-col>
    </b-row>

    <b-row id="user-acivities">
      <b-tabs id="tabs" justified>
        <b-tab title="My Marketplace Listings" active>
          <div v-if="mymktlist.length > 0">
            <ul>
              <li v-for="item in mymktlist" v-bind:key="item.name">
                <div>
                  <img v-bind:src="item.img" />
                  <h4 class="itemName">{{ item.name }}</h4>
                  <div class="price">${{ item.price }}</div>
                  <div class="qtySold">
                    Quantity Sold: {{ item.quantitySold }}
                  </div>
                  <div>
                    <b-button
                      class="remove-button"
                      variant="outline-danger"
                      v-on:click="
                        removeListing(item.category, item.mktdocRef, item.id)
                      "
                      >Remove Listing</b-button
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-else class="emptyTab">
            <div>You have not added any listings yet</div>
            <br />
            <b-button href="/mkt-add" variant="outline-success"
              >Add Listing</b-button
            >
          </div>
        </b-tab>

        <b-tab title="My Purchase History">
          <div v-if="purchasedlist.length > 0">
            <ul>
              <li v-for="item in purchasedlist" v-bind:key="item.name">
                <div>
                  <img v-bind:src="item.img" />
                  <h4 class="itemName">{{ item.name }}</h4>
                  <div class="price">${{ item.price }}</div>
                </div>
              </li>
            </ul>
          </div>

          <div v-else class="emptyTab">
            <div>You have not purchased anything yet</div>
            <br />
            <b-button href="/mkt-category" variant="outline-success"
              >Shop Now</b-button
            >
          </div>
        </b-tab>

        <b-tab title="My Registered Events">
          <div v-if="eventlist.length > 0">
            <ul>
              <li v-for="event in eventlist" v-bind:key="event.name">
                <div>
                  <img v-bind:src="event.img" />
                  <h4 class="itemName">{{ event.name }}</h4>
                  <div class="price">{{ event.location }}</div>
                </div>
              </li>
            </ul>
          </div>

          <div v-else class="emptyTab">
            <div>You have not signed up for any events yet</div>
            <br />
            <b-button href="/event-category" variant="outline-success"
              >Browse Events</b-button
            >
          </div>
        </b-tab>

        <b-tab title="My Event Requests">
          <div v-if="eventRequestList.length > 0">
            <ul>
              <li v-for="event in eventRequestList" v-bind:key="event.name">
                <div>
                  <img v-bind:src="event.img" />
                  <h4 class="itemName">{{ event.name }}</h4>
                  <div class="price">{{ event.location }}</div>

                  <div
                    class="price"
                    v-if="event.status == 'Approved'"
                    style="color: green"
                  >
                    Status: {{ event.status }}
                  </div>
                  <div
                    class="price"
                    v-else-if="event.status == 'Rejected'"
                    style="color: red"
                  >
                    Status: {{ event.status }}
                  </div>

                  <div class="price" v-else style="color: grey">
                    Status: {{ event.status }}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-else class="emptyTab">
            <div>You have not requested to publish your events yet</div>
            <br />
            <b-button href="/event-add" variant="outline-success"
              >Request Event</b-button
            >
          </div>
        </b-tab>

        <b-tab title="My Infohub Articles">
          <div v-if="infolist.length > 0">
            <ul>
              <li v-for="item in infolist" v-bind:key="item.name">
                <img v-bind:src="item.img" />
                <h4 class="itemName">{{ item.name }}</h4>
                <div>
                  <b-button
                    class="remove-button"
                    variant="outline-danger"
                    v-on:click="
                      removeInfoListing(
                        item.category,
                        item.infoHubDocRef,
                        item.id
                      )
                    "
                    >Remove Infohub Post</b-button
                  >
                </div>
              </li>
            </ul>
          </div>

          <div v-else class="emptyTab">
            <div>You have not posted any articles yet</div>
            <br />
            <b-button href="/info-add" variant="outline-success"
              >Post Now</b-button
            >
          </div>
        </b-tab>
      </b-tabs>
    </b-row>
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

      var preview = document.getElementById("profile-pic");

      //create storage ref
      var storageRef = firebase.storage().ref("profile/" + this.user.username);

      //upload file
      var task = storageRef.put(file);

      task.on(
        "state_changed",
        //handle successful uploads on complete
        function () {
          task.snapshot.ref.getDownloadURL().then(function (storageURL) {
            preview.src = storageURL;
            console.log(preview.src);
            database
              .collection("users")
              .doc(firebase.auth().currentUser.email)
              .update({
                profilePic: preview.src,
              });
          });
        }
      );
    },

    removeInfoListing: function (category, infoHubDocRef, userdocRef) {
      //remove from marketplace
      database
        .collection("info-categories")
        .doc(category)
        .collection("items")
        .doc(infoHubDocRef)
        .delete()
        //remove from user's my-mkt-list (profile page display)
        .then(() => {
          database
            .collection("users")
            .doc(this.currUserEmail)
            .collection("info")
            .doc(userdocRef)
            .delete();
        })
        .then(() => location.reload());
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

      //for eventRequestList
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
.page-title {
  color: black;
  font-family: Georgia, Verdana, sans-serif;
  font-weight: 500;
  text-align: center;
}
/* for user info styling (top section above b-tabs) */
.profile-pic-container {
  position: relative;
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 50%;
}
#profile-pic {
  display: block;
  width: 250px;
  height: 250px;
  object-fit: cover;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 250px;
  height: 250px;
  opacity: 0;
  transition: 0.3s ease;
  background-color: #3a6351;
}
.profile-pic-container:hover .overlay {
  opacity: 0.8;
}
#overlay-text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
#user-info {
  margin-bottom: 20px;
}
#right-user-info {
  margin: auto;
}
.emptyTab {
  text-align: center;
  margin-top: 50px;
}

/* for b-tabs styling */
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  /*padding: 1%;
  border: 1px solid #e48257;*/
  margin: 1%;
  width: 31.3%;
}
img {
  height: 400px;
  width: 100%;
  object-fit: cover;
}

.remove-button {
  margin-top: 10px;
}
.itemName {
  overflow: hidden;
  line-height: 1.5em;
  height: 1.5em;
  width: 100%;
  text-align: left;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 15px;
}
.price {
  color: #57585a;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
  font-size: 20px;
  width: 100%;
  text-align: left;
  margin-left: 5px;
}
.qtySold {
  color: #57585a;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
}
</style>