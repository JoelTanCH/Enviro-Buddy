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
              <h2 class="headings">{{ event.name }}</h2>
            </b-row>
            <b-row>
              <div>
                <br />
                <b-row>
                  <b-col cols="4">
                    <div class="details-label">Organizer</div>
                  </b-col>
                  <b-col>
                    <div class="details">{{ event.organizer }}</div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="4">
                    <div class="details-label">Location</div>
                  </b-col>
                  <b-col>
                    <div class="details">{{ event.location }}</div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="4">
                    <div class="details-label">Date</div>
                  </b-col>
                  <b-col>
                    <div class="details">{{ event.date }}</div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="4">
                    <div class="details-label">Time</div>
                  </b-col>
                  <b-col>
                    <div class="details">{{ event.time }}</div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="4">
                    <div class="details-label">Description</div>
                  </b-col>
                  <b-col>
                    <div class="details">{{ event.description }}</div>
                  </b-col>
                </b-row>
              </div>
            </b-row>
            <br />
            <hr />
            <br />

            <b-row id="signup">
              <h4 class="headings">Interested? Sign up below!</h4>
              <b-form v-on:submit="signUp">
                <b-row class="input-group">
                  <b-col cols="4">
                    <label for="full-name">Full Name</label>
                  </b-col>
                  <b-col>
                    <b-form-input
                      class="right-input"
                      v-model="signupInfo.name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="input-group">
                  <b-col cols="4">
                    <label for="mobile-number">Mobile Number</label>
                  </b-col>
                  <b-col>
                    <b-form-input
                      class="right-input"
                      v-model="signupInfo.contact"
                      type="tel"
                      pattern="[0-9]{8}"
                      placeholder="Enter your 8-digit number without country code"
                      required
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="input-group">
                  <b-button
                    id="button"
                    type="submit"
                    variant="outline-success"
                    v-on:click="signUp()"
                    >Sign Me Up!</b-button
                  >
                </b-row>
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
    signUp: function (event) {
      event.preventDefault();

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
                alert("You have already signed up for this event previously");
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
                .add(this.signupInfo)
                .then(() => {
                  alert("You have successfully signed up for the event");
                });
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
              .add(this.signupInfo)
              .then(() => {
                alert("You have successfully signed up for the event");
              });
          }
        })
        .then(this.$router.push("/event-category"));
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
.headings {
  text-align: left;
  margin-bottom: 20px;
}
img {
  width: 40vw;
  height: 70vh;
  object-fit: cover;
}
.input-group {
  margin-top: 20px;
  width: 100%;
}
.right-input {
  width: 100%;
}
.details-label {
  color: #3a6351;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
  font-weight: bold;
}
.details {
  color: #57585a;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
}
</style>