<template>
   <div>
    <header>
        <h1>{{ msg }}</h1>
        <router-link to="/mkt-category" exact>Marketplace </router-link>
        <!-- <router-link to="/event-category" exact>Events </router-link> -->
        <!-- <router-link to="/info-category" exact>Information Hub</router-link> -->
    </header>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        msg: 'Online Bakery'
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
    background: #3a6351;
    border-style: solid;
    border-color: #393232;
    border-width: 2px;
    height: 95px;
    text-align: top;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1{
    color: #f2edd7
}
a{
    color: #f2edd7;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: #f2edd7;
    color: #393232;
}
</style>