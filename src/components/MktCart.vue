<template>
    <div id = 'mainContainer'>
        <b-row>
            <b-col>
                <b-container id = "leftContainer">
                    Hello
                </b-container>
            </b-col>

            <b-col>
                <b-container id = "rightContainer">
                    <ul>
                        <li> 
                            SUBTOTAL:
                        </li>
                        <li> 
                            SHIPPING:
                        </li>
                        <li> 
                            GRAND TOTAL:
                        </li>
                    </ul>
                </b-container>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#mainContainer {
    /*display: flex;
    align-items: center;
    justify-content: center; */
    height: 100vh;
}
#leftContainer {
    display:flex;
    background-color: blueviolet;
    align-items: center;
    justify-content: center; 
    height: 100vh;
}
#rightContainer {
    display:flex;
    background-color: whitesmoke;
    align-items: center;
    justify-content: center; 
    height: 100vh;
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    display:flex;
    align-items: left;
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #e48257;
    margin: 8px;
}

</style>