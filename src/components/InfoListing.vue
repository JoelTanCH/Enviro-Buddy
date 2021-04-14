<template>
  <body>
    <template v-if="show">
      <b-form v-on:submit="submit" id="form">
        
        <b-form-group
          id="item-name"
          label="Item Name"
          label-for="item-name-input"
        >
          <b-form-input
            id="item-name"
            v-model="item.name"
            type="text"
            placeholder="Enter item name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="item-description"
          label="Item Description"
          label-for="item-description-input"
        >
          <b-form-textarea
            id="item-description"
            v-model="item.description"
            placeholder="Enter item description"
            rows="3"
            max-rows="8"
          ></b-form-textarea>
        </b-form-group>

        <!-- ask users to upload image here -->

        <b-button type="submit" variant="secondary" on-click="submit"
          >Submit</b-button
        >
      </b-form>
      <br />

    </template>
    <div>
      <div>
        <div id="searchbar-container">
          <b-form-input
            v-on:keyup.enter="search_text()"
            v-model="search.text"
            type="text"
            placeholder="Looking for something?"
          ></b-form-input>
        </div>
        <b-button type="submit" variant="secondary" v-on:click="show = !show"
          >Add your ideas</b-button
        >
      </div>

      <div v-if="searchList == null">
        <div v-if="search.text == ''">
          <ul>
            <li v-for="item in itemList" v-bind:key="item.name">
              <div class="top-box">
                <div class="username">{{ item.username }}</div>
                <h2 class="itemName">{{ item.name }}</h2>
              </div>
              <img v-bind:src="item.img" />
              <div class="description">{{ item.description }}</div>
              <div>
                <b-button
                  v-bind:itemid="item.id"
                  v-bind:collectionName="collectionName"
                  v-bind:subCollectionName="subCollectionName"
                  v-on:click="route($event)"
                  variant="outline-danger"
                >
                  Read More
                </b-button>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Press Enter to search.</div>
      </div>

      <div v-else>
        <div v-if="this.searchList.length == 0">
          No matching results.<br />Try another search?
        </div>
        <div v-else-if="this.searchList.length > 0">
          <div>{{ this.searchList.length }} item(s) found</div>
          <ul>
            <li v-for="item in searchList" v-bind:key="item.name">
              <div class="top-box">
                <div class="username">{{ item.username }}</div>
                <h2 class="itemName">{{ item.name }}</h2>
              </div>
              <img v-bind:src="item.img" />
              <div class="description">{{ item.description }}</div>
              <div>
                <b-button
                  v-bind:itemid="item.id"
                  v-bind:subCollectionName="subCollectionName"
                  v-on:click="route($event)"
                  variant="outline-danger"
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
        img: "",
      },
      search: {
        text: "",
      },
    };
  },
  methods: {
    submit: function () {
      this.item.username = this.userInfo.username;

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("items")
        .add(this.item);
      alert("Post has been submitted");

      database.collection("users").doc(this.item.email).collection("info").add(this.item);
      alert("post saved to firebase");

      //reset item
      this.item.email = null;
      this.item.username = null;
      this.item.name = null;
      this.item.description = null;
      this.item.img = null;
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
        .then(snapshot => {
          this.userInfo = snapshot.data()
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
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: auto;
}
.username {
  color: #e48257;
}
.itemName {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 3em;
  width: 90%;
  text-align: center;
}
.description {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 4.5em;
  width: 90%;
}
#form {
  width: 60%;
  margin-left: 20%;
}
</style>