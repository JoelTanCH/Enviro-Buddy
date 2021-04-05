<template>
  <div>
    <b-form-input
      id="searchbar"
      v-on:keyup.enter="search_text()"
      v-model="search.text"
      type="text"
      placeholder="Looking for something?"
    ></b-form-input>

    <div v-if="this.searchList == null">
      <div v-if="search.text == ''">
        <ul>
          <li v-for="item in itemList" v-bind:key="item.name">
            <div id="top-box">
              <div id="username">{{ item.username }}</div>
              <div id="itemName">{{ item.name }}</div>
            </div>
            <img v-bind:src="item.img" />
            <div id="price">$ {{ item.price }}</div>
            <div id="description">{{ item.description }}</div>
            <br />
            <b-button
              v-bind:itemid="item.id"
              v-bind:collectionName="collectionName"
              v-bind:subCollectionName="subCollectionName"
              v-on:click="route($event)"
            >
              Details
            </b-button>
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
        {{ this.searchList.length }} item(s) found
      </div>
    </div>

    <ul>
      <li v-for="item in searchList" v-bind:key="item.name">
        <h2>{{ item.name }}</h2>
        <img v-bind:src="item.img" />
        <p>$ {{ item.price }}</p>
        <hr />
        <b-button
          v-bind:itemid="item.id"
          v-bind:collectionName="collectionName"
          v-bind:subCollectionName="subCollectionName"
          v-on:click="route($event)"
        >
          Details
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";
//import firebase from "firebase/app";

export default {
  data() {
    return {
      itemList: [],
      searchList: null,
      collectionName: "",
      subCollectionName: "",
      search: {
        text: "",
      },
    };
  },
  methods: {
    fetchItems: function () {
      this.collectionName = "mkt-categories";
      this.subCollectionName = this.$route.name.toLowerCase();

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("items")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            console.log(doc.data())
            item = doc.data();
            if(item.img == "") {
              item.img = 'https://firebasestorage.googleapis.com/v0/b/enviro-buddy.appspot.com/o/placeholder.png?alt=media&token=e630e1d2-cb1b-4a36-8d33-941b3adc71c5' ;
            }else{
              console.log('ok')
            }
            item.id = doc.id;
            this.itemList.push(item);
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "mkt-details",
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
  height: 200px;
  overflow: hidden;
}
#searchbar {
  width: 30%;
  margin-right: 1%;
  margin-left: auto;
}
#price {
  color: #3a6351;
  font-weight: bold;
  font-size: 20px;
}
#top-box {
  background-color: #f2edd7;
  font-weight: bold;
  text-align: left;
  margin: 5px;
  padding-left: 10px;
}
#itemName {
  color: #393232;
  font-size: 24px;
  max-height: 32px;
  overflow: hidden;
}
#username {
  color: #e48257;
}
#description {
  justify-content: center;
  height: 40px;
  overflow: hidden;
}
</style>