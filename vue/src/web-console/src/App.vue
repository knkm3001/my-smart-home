<template>
  <div id="app">
    <div class='img'>
      <img alt="Vue logo" src="./assets/logo.png" height=100 width=100>
    </div>
    <div class='flame'>
      <div class='chart'>
        <chart msg="Welcome to Your Vue.js App"/>
      </div>
      <div class='console'>
        <console msg="Welcome to Your Vue.js App"/>
      </div>
    </div>
  </div>
</template>

<script>
import chart from './components/chart.vue'
import console from './components/console.vue'

export default {
  name: 'app',
  components: {
    chart,
    console
  }
}



</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  padding: 20px 40px;
}


.flame {
  height: 80%;
  width : 95%;
  margin: auto;
}

.flame > div{
  display: inline-block;
  vertical-align: top;
  height: 50%;
  width : 45%;
  margin: 20px;
  background: #ffffff;
  color: #000000;
  border: solid 1px #979397;
}
</style>
