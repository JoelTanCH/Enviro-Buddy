<template>
    <!-- need background image??? or anything else to add -->
    <div id = 'container'>
        <div id = 'websiteName'>
            Enviro Buddy <br>

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

export default {
    data() {
        
    },

    methods: {
        routeSignUp: function() {
            this.$router.push({path: '/sign-up'})
        },
        
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
