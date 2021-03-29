<template>
    <div>
        <b-button class="button" v-on:click=decrement()>-</b-button>
        <span>{{ counter }}</span>
        <b-button class="button" v-on:click=increment()>+</b-button>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
        }
    },
    methods: {
        increment: function() {
            this.counter += 1;
            this.$emit('counter', this.counter);
        },
        decrement: function() {
            this.qty -= 1;
            if (this.counter < 0) {
                this.counter = 0;
            }
            this.$emit('counter', this.counter);
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
