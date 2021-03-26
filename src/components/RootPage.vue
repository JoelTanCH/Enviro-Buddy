<template>
    <!-- need background image??? or anything else to add -->
    <div id = 'container'>
        <div id = 'websiteName'>
            <img id = "logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYToeTlE4lcmsSPc7e18gnrH9xnf3HGCrGOl9qOP4ez8ziM2-ROBNAc-T6cESI7V_btc&usqp=CAU">
            <br>Enviro Buddy <br>            
            <b-button id = 'signUp' v-on:click="routeSignUp">
                Sign Up
            </b-button> <br>

            <b-button id = 'login' v-on:click="routeLogin">
                Login
            </b-button> 

        </div>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    data() {
        return{
            logo:null
        }},

    methods: {
        fetchLogo:function(){
        this.logo = database.collection('Logo').get().then((querySnapShot)=>{
            querySnapShot.forEach(doc=>{
                alert(doc)
                 })      })  
        alert(this.logo)
        },    
        routeSignUp: function() {
            this.$router.push({path: '/sign-up'})
        },
        
        routeLogin: function() {
            this.$router.push({path: '/login'})
        },
    created(){
        this.fetchLogo()   
    }
    }
}
</script>

<style scoped>
#logo{
    height:400px;
    width:400px;
    align-items:center;
}
#container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
#websiteName {
    color:  #3a6351; /* confirm which color */
    font-weight: bold;
    font-size: 50px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; /* confirm which font */
}

#signUp {
    width: 120px;
    font-size: 25px;
    margin-top: 40px;
    color:antiquewhite  /* confirm which color */
}

#login {
    width: 120px;
    font-size: 25px;
    margin-top: 10px;
    color: antiquewhite /* confirm which color */
}
</style>
