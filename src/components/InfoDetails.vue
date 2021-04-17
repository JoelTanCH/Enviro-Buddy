<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <h2>{{ item.name }}</h2>
          <h4>By {{ item.username }}</h4>
          
          <div class = "likes">
            <div v-if="show">
              <b-button v-on:click="like" variant="outline-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                </svg>
              </b-button>
            </div>
            <div v-else>
              <b-button v-on:click="like" variant="outline-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </b-button>
            </div>
            <h5>{{ this.likes }} liked</h5>
          </div> <br>

          <div>
            <img v-bind:src="item.img" /> 
          </div> <br>

          <p id="desc">{{ item.description }}</p>
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
      show: null,
      likes: 0,
      likedBefore: [],
      item: {},
      itemid: "",
      subCollectionName: "",
    };
  },
  components: {},
  methods: {
    like: function () {
      var currentUser = firebase.auth().currentUser.email; //current user email
      console.log(this.likedBefore);

      if (this.likedBefore.includes(currentUser)) {
        alert("You have liked this already");
      } else {
        this.likedBefore.push(currentUser)
        this.likes = this.likes + 1;
        const increment = firebase.firestore.FieldValue.increment(1);
        this.show = !this.show;

        database
          .collection("info-categories")
          .doc(this.subCollectionName)
          .collection("items")
          .doc(this.itemid)
          .collection("likedBefore")
          .add({
            email: currentUser,
          });

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
    console.log("sub collection name: " + this.subCollectionName);
    this.fetchItems();
    database
      .collection("info-categories")
      .doc(this.subCollectionName)
      .collection("items")
      .doc(this.itemid)
      .get()
      .then((doc) => {
        console.log("look here: " + doc.data());
        this.likes = doc.data().likes;
      });

    database
      .collection("info-categories")
      .doc(this.subCollectionName)
      .collection("items")
      .doc(this.itemid)
      .collection("likedBefore")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          console.log("doc data:" + doc.data().likes);
          console.log("doc email data: " + doc.data().email);
          this.likedBefore.push(doc.data().email);
          console.log("likedBefore : " + this.likedBefore);
        });
      })
      .then(() => {
        var currentUser = firebase.auth().currentUser.email;
        console.log("liked Before next: " + this.likedBefore);
        console.log(currentUser);
        if (this.likedBefore.includes(currentUser)) {
          this.show = false; //alr liked before
        } else {
          this.show = true; //have not liked before
        }
      });
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
}
h4 {
  text-align: left;
  color:#57585a;
}
h5 {
  margin-top: 5px;
  margin-left: 10px;
}
.description {
  text-align: left;
  color:black;
}
p {
  font-size: 0.875rem;
  text-align: left;
  height: 400px;
}
img {
  width: 100%;
  height: 550px;
  object-fit: cover;
}
#desc {
  white-space: pre-line;
  text-align: left;
}
.likes {
  display: flex;
  justify-content:left;

}

</style>