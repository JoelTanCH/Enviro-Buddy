<template>
  <div>
    <b-form-input
      v-on:keyup.enter="search_text()"
      v-model="search.text"
      type="text"
      placeholder="Search by Name"
    ></b-form-input>

    <div v-show="search.text == ''">
      <ul>
        <li v-for="item in itemList" v-bind:key="item.name">
          <div id="itemName">{{ item.name | truncateName }}</div>
          <img v-bind:src="item.img" />
          <div id="price">$ {{ item.price }}</div>
          <div>{{ item.description | truncate }}</div>
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

    <div v-show="search.text != ''">
      <div v-show="this.searchList.length > 0">
        {{ this.searchList.length }} item(s) found
      </div>
      <div v-show="this.searchList.length == 0">
        No matching results.<br />Try another search?
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
  </div>
</template>

<script>
import database from "../firebase.js";
//import firebase from "firebase/app";

export default {
  data() {
    return {
      itemList: [],
      searchList: [],
      collectionName: "",
      subCollectionName: "",
      search: {
        text: "",
      },
    };
  },
  filters: {
    truncate: function (value) {
      if (value.length > 75) {
        value = value.substring(0, 72) + "...";
      }
      return value;
    },
    truncateName: function (value) {
      if (value.length > 30) {
        value = value.substring(0, 27) + "...";
      }
      return value;
    },
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
#price {
  color: #3a6351;
  font-weight: bold;
  font-size: 20px;
}
#itemName {
  color: #393232;
  font-weight: bold;
  font-size: 32px;
  max-height: 50px;
  overflow: hidden;
}
</style>