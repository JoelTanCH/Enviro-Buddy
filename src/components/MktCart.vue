<template>
    <div id = 'mainContainer'>
        <b-row>
            <b-col>
                <b-container id = "leftContainer">
                    <table class = 'table table-bordered border border-dark'>
                        <tbody>
                            <tr v-for="product in itemList" v-bind:key="product.id">
                                <td>
                                    <div>

                                        <b-button class = 'button' 
                                            v-bind:id="product.id" 
                                            v-on:click="deleteItem($event)"
                                            variant="danger">
                                            Remove 
                                        </b-button>

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
                                    ${{this.getSubtotal().toFixed(2)}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    SHIPPING
                                </td>
                                <td>
                                    ${{this.getShipping().toFixed(2)}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    GRAND TOTAL
                                </td>
                                <td>
                                    ${{grandTotal.toFixed(2)}}
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
            email:'',
            itemList: [],
            subtotal: 0,
            shipping: 0,
            grandTotal: 0,
        }
    },
    methods : {
        fetchItems: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    database.collection("users").doc(user.email).collection("orders")
                    .get().then((querySnapshot)=>{
                        let item = {}
                        querySnapshot.forEach((doc) => {
                            item = doc.data();
                            item.id = doc.id;
                            this.itemList.push(item)
                        })
                    })
                } else {
                    console.log("Error")
                }
            })  
        },

        deleteItem: function(event) {
            let currentUser = firebase.auth().currentUser
            let doc_id = event.target.getAttribute("id")
            console.log(doc_id)
            database.collection("users").doc(currentUser.email).collection("orders").doc(doc_id)
            .delete().then(() => location.reload()) 
        },

        getSubtotal: function() {
            var total = 0;
            for (var product of this.itemList) {
                var amount = product.quantity * product.price
                total += amount
            }
            this.subtotal = total
            return this.subtotal
        },

        getShipping: function() {
            if (this.subtotal == 0 ) {
                return this.shipping
            } else {
                this.shipping = 10
                return this.shipping
            }
        }
    },

    created() {
        this.fetchItems();
    },

    watch: {
        subtotal: function() {
            this.grandTotal = this.subtotal + this.shipping
        },

    }
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
.button {
    float:right;
}
</style>