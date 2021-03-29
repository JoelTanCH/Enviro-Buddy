<template>
    <div>
        <b-container id = 'container'>
            <div id = 'resetPw'>
                Reset Password <br> <br>

                <div id = 'enterEmailAddress'>
                    Please enter the email address of your account:
                </div>

                <b-form>
                    <b-form-input
                    class="inputField"
                    type="text"
                    placeholder="Email"
                    required
                    v-model='email'
                    >
                    </b-form-input>
                </b-form> <br>

                <b-button class="button" id = 'emailButton' v-on:click="resetPassword" > 
                    Send a password reset link 
                </b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
    data() {
        return {
            email:'',
        };
    },

    methods: {
        resetPassword: function() {
            firebase.auth().sendPasswordResetEmail(this.email)
            .then(() => this.email = '')
            .then(() => alert("Please check your email"))
            .catch(() => alert("Invalid email"))
        }
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
