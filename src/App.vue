<template>
  <div id="app">
    <app-header></app-header>
    
    <router-view></router-view>    

    <app-footer></app-footer>
   </div>
</template>

<script>
//Register Locally

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
 data(){
    return{
      title:'Your first Vue Component',
      
    }
  },
   methods:{
     greeting:function(){
       return 'Week 6 of BT3103';
     }
   },
   //Register Locally
  components:{
    'app-header':Header,
    'app-footer':Footer
    
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;  
  text-align: center;
  color: #e48257;
  font-size:14px;
}

</style>
