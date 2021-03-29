<template>
    <div>
        <b-button class="button" v-on:click=decrement()>-</b-button>
        <span>{{ qty }}</span>
        <b-button class="button" v-on:click=increment()>+</b-button>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            qty: 0,
        }
    },
    methods: {
        increment: function() {
            this.qty += 1;
        },
        decrement: function() {
            this.qty -= 1;
            if (this.qty < 0) {
                this.qty = 0;
            }
        }
    }
}
</script>

<style scoped>
.button {
    display: inline-block;
    width: 5%;
}
</style>
