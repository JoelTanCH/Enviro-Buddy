<template>
  <div>
    <b-container>
      <b-row>
        <b-col>

          <input
           type="file"
           style="display:none" 
           ref="fileInput"
           accept="image/*"
           @change="onFilePicked" 
            > 
          <img id="imageURL" src ='https://firebasestorage.googleapis.com/v0/b/enviro-buddy.appspot.com/o/placeholder.png?alt=media&token=e630e1d2-cb1b-4a36-8d33-941b3adc71c5'>

        </b-col>

        <b-col>
          <h1>Add Listing</h1>

          <b-form v-on:submit="addItem">
            <b-form-group
              id="item-name"
              label="Item Name"
              label-for="item-name-input"
            >
              <b-form-input
                id="item-name"
                v-model="item.name"
                type="text"
                placeholder="Enter item name"
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
              id="item-price"
              label="Item Price"
              label-for="item-price-input"
            >
              <b-form-input
                id="item-price"
                v-model="item.price"
                placeholder="0"
                type="number"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="item-description"
              label="Item Description"
              label-for="item-description-input"
            >
              <b-form-input
                id="item-description"
                v-model="item.description"
                placeholder="Enter item description"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <!-- ask users to upload image file -->

            <b-button @click="onPickFile">Choose Image</b-button>
            <b-button type="submit" variant="secondary" v-on:click="storeInStorage"
              >Submit</b-button
            >

          </b-form>
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
      img: null,
      item: {
        name: "",
        price: 0,
        description: "",
        img: "", //images url
      },
      placeholder: 'https://firebasestorage.googleapis.com/v0/b/enviro-buddy.appspot.com/o/placeholder.png?alt=media&token=edf3a0ae-f006-46a5-80c3-56ac50a0af8a',
      category: null,
      marketplaceCategories: ["Fashion", "Decor", "Furniture", "Jewellery"],
    };
  },
  methods: {

    onPickFile(){
      this.$refs.fileInput.click();
    },
    onFilePicked: function(event){
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        document.getElementById('imageURL').src = fileReader.result
        this.img = files[0]
      })
      fileReader.readAsDataURL(files[0])
      this.img = files[0] //file object 
    },
    view: function(){
      var storageRef = firebase.storage().ref();
      storageRef.child('marketplace/' + this.category + '/' + this.item.name).getDownloadURL().then((url) =>
        alert(url)
      )
      //storageRef.child('marketplace/' + this.category + '/' + this.item.name).getDownloadURL().then((url) => alert(url))
    },
    /*storeInStorage:function(){
      console.log('store in storage')
      firebase.storage().ref('marketplace/' + this.category+ '/' + this.item.name).put(this.img)
      .then((snap) => {
        return snap.ref.getDownloadURL()
      })
      .then( (url) => {
          this.item.img = url;
          console.log(url)
      })
      console.log(this.item.img)

            var collectionName = "mkt-categories";
            var subCollectionName = this.category.toLowerCase();
            database
              .collection(collectionName)
              .doc(subCollectionName)
              .collection("items")
              .add(this.item);
          console.log('done add to firebase')
      },*/

      storeInStorage:function(){

        var collectionName = "mkt-categories";
            var subCollectionName = this.category.toLowerCase();
            var hehe ='';
            database
              .collection(collectionName)
              .doc(subCollectionName)
              .collection("items")
              .add(this.item)
              .then(function(docRef) {
                hehe = docRef.id;
              });
          console.log('done add to firebase')

      console.log('store in storage')
      firebase.storage().ref('marketplace/' + this.category+ '/' + this.item.name).put(this.img)
      .then((snap) => {
        return snap.ref.getDownloadURL()
      })
      .then( (url) => {
        database
              .collection(collectionName)
              .doc(subCollectionName)
              .collection("items")
              .doc(hehe)
              .update({
                img : url
              });
      })
      
      console.log(this.item.img)
      alert("Thank you!")

      },
      
      
      storeInStorage2:function(){
      console.log('store in storage')
      firebase.storage().ref('marketplace/' + this.category+ '/' + this.item.name).put(this.img)
      .then(() => {
        firebase.storage().ref().child('marketplace/' + this.category+ '/' + this.item.name).getDownloadURL()
      .then( (url) => {
          this.item.img = url;
          console.log(url)
      })
      .then(()=>{
            var collectionName = "mkt-categories";
            var subCollectionName = this.category.toLowerCase();
            database
              .collection(collectionName)
              .doc(subCollectionName)
              .collection("items")
              .add(this.item);
          console.log('done add to firebase')
      })
      })
      }, 
    addToItem:function(){
      console.log('add to item')
      firebase.storage().ref().child('marketplace/' + this.category+ '/' + this.item.name).getDownloadURL().then((url)=>{
           this.item.img = url;
           console.log(url)
         })
    },
    addToFirebase:function(){
      console.log('add to firebase')
      var collectionName = "mkt-categories";
      var subCollectionName = this.category.toLowerCase();
      database
          .collection(collectionName)
          .doc(subCollectionName)
          .collection("items")
          .add(this.item);
      console.log('done add to firebase')
    },

    addItem: function () {
      if (
        this.item.name.length == 0 ||
        this.item.price == 0 ||
        this.item.description == 0 ||
        this.category.length == null
      ) {
        alert("please fill in required details");
      } 
      else if (this.img == null){
        alert("please upload an image");
      } 
      else {
        var collectionName = "mkt-categories";
        var subCollectionName = this.category.toLowerCase();
         firebase.storage().ref('marketplace/' + this.category+ '/' + this.item.name).put(this.img)
         firebase.storage().ref('marketplace/' + this.category+ '/' + this.item.name).getDownloadURL().then((url)=>{
           this.item.img = url;
           console.log(url)
         }).then(()=>{
          database
          .collection(collectionName)
          .doc(subCollectionName)
          .collection("items")
          .add(this.item);
         })
        //  alert('end storing')
        // var collectionName = "mkt-categories";
        // var subCollectionName = this.category.toLowerCase();
        // database
        //   .collection(collectionName)
        //   .doc(subCollectionName)
        //   .collection("items")
        //   .add(this.item);
        
 //       alert(this.item.name + " saved to database")
 //       this.$refs.checker.click()
 
      //store path to redirect users to respective categories to view their new lisitng
 //     var newPath = "mkt-listing/" + subCollectionName;

      //reset
 //     this.item.name = "";
 //     this.item.price = 0;
 //     this.item.description = "";
 //     this.category = "";

 //     this.$router.push({ path: newPath });

/* to get firebase username
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        database.collection("users").doc(user.email).get().then((doc) =>{
          var username = doc.data().username
        }) 
      }
    })
*/

 
      }

    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
