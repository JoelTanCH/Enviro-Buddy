<template>
    <div id = 'mainContainer'>
        <b-row>
            <b-col>
                <b-container id = "leftContainer">
                    <table class = 'table table-bordered border border-dark'>
                        <tbody>
                            <tr v-for="product in itemList" v-bind:key="product.name">
                                <td>
                                    <div>
                                        <div class = 'item'>
                                            {{product.name}}
                                        </div>                                  
                                        <img v-bind:src="product.img"/>
                                        <div class = 'item'>                                            
                                            Quantity: {{product.quantity}}   
                                        </div>
                                        <div class = 'item'>                                            
                                            Total Price: ${{(product.price * product.quantity).toFixed(2)}}  
                                        </div>                        
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-container>
            </b-col>

            <b-col>
                <b-container id = "rightContainer">
                    <table class = 'table table-bordered border border-dark'>
                        <tbody>
                            <tr>
                                <td>
                                    SUBTOTAL
                                </td>
                                <td>
                                    ${{this.subtotal}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    SHIPPING
                                </td>
                                <td>
                                    $10
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    GRAND TOTAL
                                </td>
                                <td>
                                    $60
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-container>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";
export default {
    data() {
        return {
            itemList: [],
            email:"",
            subtotal: 0,
            shipping: 0,
            grandTotal: 0,
        }
    },
    methods : {
        fetchItems: function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    database.collection("users").doc(user.email).collection("orders")
                    .get().then((querySnapshot) => {
                    let item = {}
                    querySnapshot.forEach((doc) => {
                        item = doc.data();
                        item.id = doc.id;
                        this.itemList.push(item);
                    })
                }) 
                } else {
                    console.log("Error")
                }
            })  
            /*     
            database.collection("users").doc(firebase.auth().currentUser.email).collection("orders")
            .get().then((querySnapshot) => {
                let item = {}
                querySnapshot.forEach((doc) => {
                    item = doc.data();
                    item.id = doc.id;
                    this.itemList.push(item);
                })
            })  */
        },
    },
    created: function () {
        this.fetchItems();
    },
}
</script>

<style scoped>
#mainContainer {
    display: flex;
    align-items: center;
    justify-content: center; 
}
#leftContainer {
    display:flex;
    background-color: whitesmoke;
    align-items: top;
    justify-content: center; 
}
#rightContainer {
    display:flex;
    background-color: whitesmoke;
    align-items: center;
    justify-content: center; 
}
img {
    height: 200px;
    width: 200px;
    margin-top: 3px;
    margin-right: 15px;
    display:flex;
    justify-content: left; 
    float:left;
}
.item {
    display:flex;
    justify-content: left; 
}

</style>