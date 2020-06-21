<template>
  <div id="app">
    <div class='vue-logo'>
      <img alt="Vue logo" src="./assets/logo.png" height=100 width=100>
    </div>
    <div class='flame'>
      <div class='chart'>
        <chart></chart>
      </div>
      <div class='console'>
        <console></console>
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
  margin-top: 20px;
}


@media screen and (max-width:800px){
  /*画面幅が800pxまでの時*/
  .vue-logo{
    display:none
  }
  .flame > div{
  display: inline-block;
  vertical-align: top;
  width : 90%;
  height: 400px;
  margin: 10px;
  padding: 10px;
  background: #1b1a1a;
  color: #000000;
  border: solid 1px #979397;
  margin-top: 60px;
  }
}

@media screen and (min-width:1000px){
  /*画面幅が1000px以上の時*/
  .flame > div{
  display: inline-block;
  vertical-align: top;
  width : 44%;
  height: 400px;
  margin: 10px;
  padding: 10px;
  background: #1b1a1a;
  color: #000000;
  border: solid 1px #979397;
  margin-top: 60px;
  }
}


</style>
