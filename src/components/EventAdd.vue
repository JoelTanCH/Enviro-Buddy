<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="placeholderURL" id="previewImage" />
        </b-col>

        <b-col>
          <h1>Add Your Event!</h1>

          <b-form id="form" v-on:submit="submitForm">
            <b-form-group
              id="item-name"
              label="Event Name"
              label-for="item-name-input"
            >
              <b-form-input
                id="item-name"
                v-model="item.name"
                type="text"
                placeholder="Enter the name of your event"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="item-category"
              label="Category"
              label-for="item-category-input"
            >
              <b-form-select
                id="item-category"
                v-model="category"
                v-bind:options="marketplaceCategories"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="organizer-name"
              label="Organizer"
              label-for="organizer-name-input"
            >
              <b-form-input
                id="organizer"
                v-model="item.organizer"
                placeholder="Enter your organization's name"
                required
              ></b-form-input>
            </b-form-group>

             <b-form-group
              id="contact-number"
              label="Contact Details"
              label-for="contact-number-input"
            >
              <b-form-input
                id="contact"
                v-model="item.contact"
                placeholder="Enter your phone number"
                required
              ></b-form-input>
            </b-form-group>

             <b-form-group
              id="company-email"
              label="Email"
              label-for="company-email-input"
            >
              <b-form-input
                id="email"
                v-model="item.companyEmail"
                placeholder="Enter the email you would like us to communicate with"
                required
              ></b-form-input>
            </b-form-group>

             <b-form-group
              id="event-date"
              label="Date"
              label-for="event-date-input"
            >
              <b-form-input
                id="event-date"
                v-model="item.date"
                placeholder="Enter the date of the event"
                required
              ></b-form-input>
            </b-form-group>

             <b-form-group
              id="event-time"
              label="Time"
              label-for="event-time-input"
            >
              <b-form-input
                id="event-time"
                v-model="item.time"
                placeholder="Enter the time of the event"
                required
              ></b-form-input>
            </b-form-group>



            <b-form-group
              id="item-description"
              label="Event Description"
              label-for="item-description-input"
            >
              <b-form-textarea
                id="item-description"
                v-model="item.description"
                placeholder="Enter event description"
                rows="3"
                max-rows="8"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group>
              <b-button v-on:click="onPickFile">Upload Image</b-button>
              <input
                id="fileButton"
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                v-on:change="onFilePicked"
              />
              <progress value="0" max="100" id="uploader"></progress>
            </b-form-group>

            <b-button type="submit" variant="outline-success">Submit</b-button>
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
        date:null,
        time:null,
        username: "",
        name: "",
        description: "",
        organizer:"",
        contact:"",
        img: "", 
        category: "",
        status:"pending",
        companyEmail:"", // use as contact information 
        email: "", //use as storage not contact info
      },
      placeholderURL:
        "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
      category: null,
      marketplaceCategories: ["Cleanup", "Recycling", "Workshops"],
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

    onPickFile() {
      this.$refs.fileInput.click();
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
          "Submission failed. Please wait for your image upload to complete."
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
        // .then((docRef) => {
        //   this.item.userdocRef = docRef.id;
        // })
        // .then(() => {
        //   database
        //     .collection("info-categories")
        //     .doc(this.category.toLowerCase())
        //     .collection("items")
        //     .add(this.item);
        // })
        .then(() => {
          alert("Your response has been submitted and is currently pending approval.");
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
img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
</style>
