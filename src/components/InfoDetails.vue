<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="item.img" />
        </b-col>
        <b-col>
          <h2>{{ item.name }}</h2>
          <h5>Posted by: {{ item.username }}</h5>
          <p id="desc">{{ item.description }}</p>
          <template v-if="show">
            <b-button v-on:click="like"> like </b-button>
          </template>
          <h5>{{ item.likes }} person/people liked this!</h5>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      show: true,
      likedBefore:[],
      item: {},
      itemid: "",
      subCollectionName: "",
    };
  },
  components: {},
  methods: {
    like: function () {
      var currentUser = firebase.auth().currentUser.email; //current user email
      console.log(this.likedBefore)
      
      if (this.likedBefore.includes(currentUser)) {
        alert("You have liked this already");

      } else {
        const increment = firebase.firestore.FieldValue.increment(1);
        this.show = !this.show;

        database
          .collection("info-categories")
          .doc(this.subCollectionName)
          .collection("items")
          .doc(this.itemid)
          .collection("likedBefore")
          .add({
            email: currentUser
            })

        database
          .collection("info-categories")
          .doc(this.subCollectionName)
          .collection("items")
          .doc(this.itemid)
          .update({
            likes: increment,
          });
      }
    },
    fetchItems: function () {
      this.itemid = this.$route.params.itemid;
      this.subCollectionName = this.$route.params.subCollectionName;
      console.log("itemid: " + this.itemid);
      console.log("subcollection: " + this.subCollectionName);

      database
        .collection("info-categories")
        .doc(this.subCollectionName)
        .collection("items")
        .doc(this.itemid)
        .get()
        .then((snapshot) => {
          this.item = snapshot.data();
          var text = this.item.description;
          text = text.replaceAll("\\n", "\n");
          this.item.description = text;
        });
    },
  },
  created: function () {
    this.fetchItems();
    database
        .collection("info-categories")
        .doc(this.subCollectionName)
        .collection("items")
        .doc(this.itemid)
        .collection("likedBefore")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            console.log("doc email data: " + doc.data().email);
            this.likedBefore.push(doc.data().email);
            console.log("likedBefore : " + this.likedBefore);
          });
        });    
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 70vh;
  object-fit: cover;
}
.username {
  color: #e48257;
}
#desc {
  white-space: pre-line;
  text-align: left;
}
p {
  text-align: center;
  padding: 1%;
  border: 1px solid #e48257;
  margin: 1%;
  width: 85%;
  height: 85%;
  background-color: #e48257;
}
</style>