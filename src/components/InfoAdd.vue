<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="placeholderURL" id="previewImage" />
        </b-col>

        <b-col>
          <h1>Post InfoHub Article</h1>

          <b-form id="form" v-on:submit="submitForm">
            <b-row class="input-group">
              <b-col cols="4">
                <label for="info-title">Title</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  type="text"
                  v-model="item.name"
                  placeholder="Enter your title"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="info-category">Category</label>
              </b-col>
              <b-col>
                <b-form-select
                  class="right-input"
                  v-model="category"
                  v-bind:options="InfoCategories"
                  required
                ></b-form-select>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="info-content">Content</label>
              </b-col>
              <b-col>
                <b-form-textarea
                  class="right-input"
                  v-model="item.description"
                  type="text"
                  rows="8"
                  placeholder="What do you want to share? (min 100 characters)"
                  minlength="100"
                  required
                ></b-form-textarea>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="info-image">Event Image</label>
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
        username: "",
        name: "",
        description: "",
        img: "", //images url
        likes: 0,
        category: "",
        userdocRef: "placeholder",
        email: "",
        infoHubDocRef: "",
      },
      placeholderURL:
        "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
      category: null,
      InfoCategories: ["News", "Crafts", "Lifestyle"],
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
        .ref("infohub/" + new Date() + "-" + file.name);

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

      //add to user's "My Listings" on profile page
      database
        .collection("users")
        .doc(currentUser.email)
        .collection("info")
        .add(this.item)
        .then((docRef) => {
          this.item.userdocRef = docRef.id;
        })
        .then(() => {
          database
            .collection("info-categories")
            .doc(this.category.toLowerCase())
            .collection("items")
            .add(this.item)
            .then((infoDocRef) => {
              database
                .collection("users")
                .doc(currentUser.email)
                .collection("info")
                .doc(this.item.userdocRef)
                .update({
                  infoHubDocRef: infoDocRef.id,
                })
                .then(() => {
                  alert("Your article has been uploaded!");
                  window.location.href =
                    "/info-listing/" + this.category.toLowerCase();
                });
            });
        });
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
