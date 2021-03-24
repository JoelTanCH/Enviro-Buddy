<template>
    <!-- need background image??? or anything else to add -->
    <div id = 'container'>
        <div id = 'signUpText'>
            Sign Up <br>

            <b-form>
                <b-form-input id = 'username' type = "text" placeholder = "Username" required> </b-form-input>
                <b-form-input id = 'email' type = "text" placeholder = "Email" required> </b-form-input>
                <b-form-input id = 'password' type = "text" placeholder = "Password" required> </b-form-input>
            </b-form>

            <b-button id = 'signUpButton'>
                Sign Up
            </b-button>

            <div id = 'logInText'>
                Have an account?
                <b-button variant = 'text' id = "logInButton" v-on:click="routeLogin">
                    Log in now
                </b-button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    methods: {       
        routeLogin: function() {
            this.$router.push({path: '/login'})
        },
    }
}
</script>

<style scoped>
#container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
#signUpText {
    color:  #3a6351; /* confirm font stuff */
    font-weight: bold;
    font-size: 55px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; /* confirm which font */
}
#username {
    width:420px;
    margin-top: 35px;
}
#email {
    width:420px;
    margin-top: 20px;
}
#password {
    width:420px;
    margin-top: 20px;
}
#signUpButton {
    width: 420px; /* confirm font stuff */
    font-size: 25px;
    margin-top: 50px;
    color:antiquewhite  
}
#logInText {
    font-size: 14px;
    margin-top:5px;
    color: black;
}
#logInButton {
    padding-top:2px;
    padding-left:0px;  
    font-size: 14px;
    color:brown;
    font-weight: bold;
}
</style>
