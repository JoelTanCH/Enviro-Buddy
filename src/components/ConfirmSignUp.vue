<template>
    <div>
        <b-container id = 'container'>
            <div id = 'regSuccess'>
                Registration Successful <br> <br>

                <div id = 'emailVerify'>
                    An email verification has been sent! Please verify your email before logging in.
                </div>

                <b-button class="button" id = 'loginButton' v-on:click='routeLogin'> 
                    Log In
                </b-button>
            </div>

        </b-container>
    </div>
</template>

<script>
export default {
    methods: {
        routeLogin: function() {
            this.$router.push({ path: "/login" });
        },
    },
}
</script>

<style scoped>
#container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

</style>