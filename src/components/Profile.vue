<template>
    <div>
        <section class="section">
            <div class="container-fliud">
                <img alt="Vue logo" class="profpic" contain height="300px" width="300px" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png">
                <h1>{{user.username}}</h1>
                <h5>{{useremail}}</h5>
                <b-tabs content-class="mt-3">
                  <b-tab title="Liked Items" active><p>Items lmao</p></b-tab>
                  <b-tab title="Events Registered" active>
                      <ul>
                        <li v-for="item in eventslist" v-bind:key="item.name">
                            <div class="top-box">
                                <div class="username">{{ item.name }}</div>
                                <div class="description">{{ item.description }}</div>
                            </div>
                            <img v-bind:src="item.img" />
                            <div class="price"> Location: {{ item.location }}</div>
                            <div class="price"> Time: {{ item.time }}</div>
                        </li>
                    </ul>
                  </b-tab>
                  <b-tab title="Purchase History" active><p>Purchase History</p></b-tab>
                </b-tabs>
            </div>
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
      user: {},
      useremail: "",
      mktlist: [],
      infolist: [],
      eventslist: [],
      collectionName: "",
      subCollectionName: ""
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((snapshot) => (this.user = snapshot.data()));
      this.useremail = firebase.auth().currentUser.email;
      this.collectionName = this.$route.params.collectionName;
      this.subCollectionName = this.$route.params.subCollectionName;

      database
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("events")
        .get()
        .then((snapshot) => {
          let event = [];
          snapshot.forEach((doc) => {
            event = doc.data();
            event.id = doc.id;
            this.eventslist.push(event);
          });
        });
        
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>



<style lang="css" scoped>
.profpic {
    border-radius: 50%;
    width: 26%
}
body {
  background-color: #f2edd7;
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
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: auto;
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
</style>