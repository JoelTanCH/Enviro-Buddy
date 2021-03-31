<template>
    <div id = 'mainContainer'>
        <b-row>
            <b-col>
                <b-container id = "leftContainer">
                    <table class = 'table table-bordered border border-dark'>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <div class = 'item'>
                                            Giant Nature Wooden Night Light
                                        </div>                                  
                                        <img v-bind:src = "this.img"/>
                                        <div class = 'item'>                                            
                                            Quantity: 5   
                                        </div>
                                        <div class = 'item'>                                            
                                            Price: $16  
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
                                    $50
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    SHIPPING
                                </td>
                                <td>
                                    $10
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    GRAND TOTAL
                                </td>
                                <td>
                                    $60
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
export default {
    data() {
        return {
            img: "https://i.pinimg.com/564x/24/63/58/2463587994b231c4ea48f6d7b04b602a.jpg"
        }
    },
}
</script>

<style scoped>
#mainContainer {
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 100vh;
}
#leftContainer {
    display:flex;
    background-color: whitesmoke;
    align-items: top;
    justify-content: center; 
    height: 100vh;
}
#rightContainer {
    display:flex;
    background-color: whitesmoke;
    align-items: center;
    justify-content: center; 
    height: 100vh
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


</style>