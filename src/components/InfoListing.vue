<template>
  <body>
    <template v-if="show">
      <b-form v-on:submit="submit" id="form">
        <b-form-group
          id="username"
          label="Username"
          label-for="user-name-input"
        >
          <b-form-input
            id="username"
            v-model="item.username"
            type="text"
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>
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
          <b-form-input
            id="item-description"
            v-model="item.description"
            placeholder="Enter item description"
            type="text"
          ></b-form-input>
        </b-form-group>

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
        <b-button
          type="submit"
          variant="secondary"
          v-on:click="show = !show"
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
      item: {
        username: "",
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
      var email = firebase.auth().currentUser.email;
      console.log(email);
      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("items")
        .add(this.item);
      alert("Post has been submitted");

      database.collection("users").doc(email).collection("info").add(this.item);
      alert("post saved to firebase");
    },
    fetchItems: function () {
      this.collectionName = "info-categories";
      this.subCollectionName = this.$route.name.toLowerCase();
      console.log(this.subCollectionName);

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