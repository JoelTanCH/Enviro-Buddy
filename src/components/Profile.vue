<template>
  <div>
    <section id="user-info">
      <div id="profile-pic-container">
        <img
          id="profile-pic"
          src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        />

      </div>

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
              </div>
            </li>
          </ul>
        </b-tab>

        <b-tab title="My Events" active>
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
      quantitySold:[],
      user: {},
      email: null,
      mymktlist: [],
      purchasedlist: [],
      infolist: [],
      eventlist: [],
      collectionName: "",
      subCollectionName: "",
    };
  },
  methods: {
    fetchItems: function () {

      let currentUser = firebase.auth().currentUser;
      this.collectionName = this.$route.params.collectionName;
      this.subCollectionName = this.$route.params.subCollectionName;

      database
        .collection("users")
        .doc(currentUser.email)
        .get()
        .then((snapshot) => (this.user = snapshot.data()));

      this.email = currentUser.email;

      //for eventlist
      database
        .collection("users")
        .doc(currentUser.email)
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

      //for purchaselist
      database
        .collection("users")
        .doc(currentUser.email)
        .collection("mkt-history")
        .get()
        .then((snapshot) => {
          let item = {};
          snapshot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.purchasedlist.push(item);
            this.quantitySold.push(item.quantity)
            console.log("quantity: " + item.quantity)
          });
        });

      //for mymktlist
      database
        .collection("users")
        .doc(currentUser.email)
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
        .doc(currentUser.email)
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
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}
#profile-pic {
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
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