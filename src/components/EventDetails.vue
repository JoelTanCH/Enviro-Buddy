<template>
  <body>
    <div>
      <b-container>
        <b-row>
          <b-col>
            <img v-bind:src="event.img" />
          </b-col>
          <b-col>
            <b-row>
              <h2>{{ event.name }}</h2>
              <h4 v-if="event.location">Location: {{ event.location }}</h4>
              <h4 v-if="event.date">{{ event.date.toDate() }}</h4>
              <h4 v-if="event.organizer">Organizer: {{ event.organizer }}</h4> <br> <br><br>
              <h4 class = 'description'>Description</h4>
              <p v-if="event.description">
                {{ event.description }}
              </p>
            </b-row>
            <hr />

            <b-row id="signup">
              <h3>Interested? Sign up below!</h3> 
              <b-form>
                <b-form-group
                  id="Full-name"
                  label="Full Name"
                  label-for="full-name-input"
                > 
                  <b-form-input
                    id="Full-name"
                    type="text"
                    placeholder="Enter Full Name"
                    v-model.lazy="signupInfo.name"
                    required
                  ></b-form-input> 
                </b-form-group>

                <b-form-group
                  id="Contact-Details"
                  label="Contact Details"
                  label-for="Contact-Details-input"
                >
                  <b-form-input
                    id="Contact-Details"
                    type="text"
                    v-model.lazy="signupInfo.contact"
                    placeholder="Enter Phone Number"
                    required
                  ></b-form-input>
                </b-form-group>

                <div class = "buttonContainer">
                  <b-button
                    id="button"
                    type="submit"
                    variant="outline-success"
                    v-on:click="signUp(), $router.push('event-category')"
                    >Sign Me Up!</b-button
                  >
                </div>
              </b-form>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
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
      event: {},
      collectionName: "",
      subCollectionName: "",
      eventid: "",
      repeated: false,
      signupInfo: {
        name: "",
        contact: "",
        email: "",
      },
    };
  },
  methods: {
    fetchItems: function () {
      this.eventid = this.$route.params.eventid;
      this.collectionName = this.$route.params.collectionName;
      this.subCollectionName = this.$route.params.subCollectionName;

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("events")
        .doc(this.eventid)
        .get()
        .then((snapshot) => (this.event = snapshot.data()));
    },
    signUp: function () {
      this.signupInfo.email = firebase.auth().currentUser.email;

      database
        .collection("users")
        .doc(this.signupInfo.email)
        .collection("events")
        .get()
        .then((querySnapShot) => {
          if (querySnapShot.docs.length > 0) {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.data();
              if (item.name == this.event.name) {
                this.repeated = true;
                alert("You have already registered for this event previously");
              }
            });
            if (!this.repeated) {
              database
                .collection("users")
                .doc(firebase.auth().currentUser.email)
                .collection("events")
                .add(this.event);
              //add user sign up info to indiv events
              database
                .collection(this.collectionName)
                .doc(this.subCollectionName)
                .collection("events")
                .doc(this.eventid)
                .collection("signups")
                .add(this.signupInfo);
            }
          } else {
            database
              .collection("users")
              .doc(firebase.auth().currentUser.email)
              .collection("events")
              .add(this.event);
            //add user sign up info to indiv events
            database
              .collection(this.collectionName)
              .doc(this.subCollectionName)
              .collection("events")
              .doc(this.eventid)
              .collection("signups")
              .add(this.signupInfo);
          }
        });

      alert("saved to database");
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
}
h3 {
  margin-top: 20px;
}
h4 {
  text-align: left;
  color:#57585a;
}
img {
  width: 550px;
  height: 720px;
  object-fit: cover;
}
.description {
  text-align: left;
  color:black;
}
p {
  text-align: left;
  height: 95px;
}
#signup {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
#button {
  margin-top: 20px;
}
.buttonContainer {
  display:flex;
  justify-content: center;
}
</style>