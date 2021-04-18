<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="placeholderURL" id="previewImage" />
        </b-col>

        <b-col>
          <h1>Submit Event Request</h1>

          <b-form id="form" v-on:submit="submitForm">
            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-name">Event Name</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  type="text"
                  v-model="item.name"
                  placeholder="Enter your event name"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-category">Category</label>
              </b-col>
              <b-col>
                <b-form-select
                  class="right-input"
                  v-model="category"
                  v-bind:options="eventCategories"
                  required
                ></b-form-select>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-organizer">Organizer</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  type="text"
                  v-model="item.organizer"
                  placeholder="Enter your organization's name"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-mobile">Mobile Number</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.mobile"
                  placeholder="Enter your 8-digit number without country code"
                  type="tel"
                  pattern="[0-9]{8}"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-email">Organization's Email</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.companyEmail"
                  placeholder="Enter your organization's email"
                  type="email"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-location">Event Location</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.location"
                  type="text"
                  placeholder="Enter your event location"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-date">Event Date</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.date"
                  type="date"
                  placeholder="Enter the date of your event"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-time">Event Time</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.time"
                  type="time"
                  placeholder="Enter the time of your event"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="event-description">Event Description</label>
              </b-col>
              <b-col>
                <b-form-textarea
                  class="right-input"
                  v-model="item.description"
                  type="text"
                  maxlength="100"
                  placeholder="What is your event about? (max 100 characters)"
                  required
                ></b-form-textarea>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="item-image">Event Image</label>
              </b-col>
              <b-col>
                <input
                  id="fileButton"
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  v-on:change="onFilePicked"
                />
                <div id="progress-container">
                  <div>Upload status:</div>
                  <progress
                    id="uploader"
                    class="right-input"
                    value="0"
                    max="100"
                  ></progress>
                </div>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-button type="submit" variant="outline-success"
                >Submit</b-button
              >
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      userInfo: {},
      item: {
        date: null,
        time: null,
        username: "",
        name: "",
        description: "",
        organizer: "",
        mobile: "",
        img: "",
        category: "",
        status: "Pending",
        location: "",
        companyEmail: "", // use as contact information
        email: "", //use as storage not contact info
      },
      placeholderURL:
        "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
      category: null,
      eventCategories: ["Cleanup", "Recycling", "Workshops"],
    };
  },
  methods: {
    fetchUserInfo: function () {
      let currentUser = firebase.auth().currentUser;

      database
        .collection("users")
        .doc(currentUser.email)
        .get()
        .then((snapshot) => (this.userInfo = snapshot.data()));
    },

    onFilePicked: function (event) {
      const file = event.target.files[0];

      var uploader = document.getElementById("uploader");
      var preview = document.getElementById("previewImage");

      //create storage ref
      var storageRef = firebase
        .storage()
        .ref("events/" + new Date() + "-" + file.name);

      //upload file
      var task = storageRef.put(file);

      //update progress bar
      task.on(
        "state_changed",

        function (snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },

        //handle errors here
        function (error) {
          console.log(error.message);
        },

        //handle successful uploads on complete
        function () {
          task.snapshot.ref.getDownloadURL().then(function (storageURL) {
            preview.src = storageURL;
            console.log(preview.src);
          });
        }
      );
    },

    submitForm: function (event) {
      event.preventDefault();

      var preview = document.getElementById("previewImage");

      if (preview.src == this.placeholderURL) {
        //not updated yet
        alert(
          "Submission failed. Please upload an image / wait for your image to finish uploading."
        );
        return;
      }

      this.item.img = preview.src;
      this.item.username = this.userInfo.username;
      this.item.category = this.category.toLowerCase();

      let currentUser = firebase.auth().currentUser;
      this.item.email = currentUser.email;

      //add to user's email in firebase
      database
        .collection("users")
        .doc(currentUser.email)
        .collection("requested-events")
        .add(this.item)
        .then((docRef) => {
          this.item.userdocRef = docRef.id;

          database
            .collection("events-req")
            .doc(this.item.category)
            .collection("events")
            .add(this.item);
        })
        .then(() => {
          alert(
            "Your response has been submitted and is currently pending approval."
          );
          window.location.href = "/event-category";
        });

      //reset all fields
      //route back to mkt-categories
    },
  },
  created: function () {
    this.fetchUserInfo();
  },
};
</script>

<style scoped>
#previewImage {
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
#progress-container {
  margin-top: 10px;
}
#uploader {
  background-color: green;
}
</style>
