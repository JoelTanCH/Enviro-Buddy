<template>
  <div class="footer">
    <footer>
      <p v-html="copyRtSymbol"></p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyRtSymbol: "&copy;Enviro Buddy",
    };
  },
};
</script>

<style scoped>
footer {
  background: #3a6351;
  padding: 5px;
  border-style: solid;
  border-color: #393232;
  border-width: 2px;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 40px;
  vertical-align: middle;
}
p {
  align-content: center;
  color: #f2edd7;
}
</style>