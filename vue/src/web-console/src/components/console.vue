<template>
  <div class="console">
    <div class='clock_frame'>
        <span id="clock_date">{{date}}</span>
        <span id="clock_time">{{time}}</span>
    </div>
    <div class='controlpanel'>
      <a v-on:click="requestAPI('light')" href='javascript:void(0)'>
        <div class='light'>
          <img v-if='light_state' alt="light logo" src="../assets/light_on.png">
          <img v-else alt="light logo" src="../assets/light_off.png">
        </div>
      </a>
      <a href='javascript:void(0)'>
        <div class='aircon'>
          <img alt="aircon logo" src="../assets/aircon.png">
        </div>
      </a>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'console',
  data(){
    return {
      light_state:false,
       headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
    }
  },
  methods: {
    clock(){
        var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var w = weeks[now.getDay()];
        var h = now.getHours();
        var mi = now.getMinutes();
        var s = now.getSeconds();
        if (m < 10) m = "0" + m;
        if (d < 10) d = "0" + d;
        if (mi < 10) mi = "0" + mi;
        if (s < 10) s = "0" + s;
        this.date = y + "/" + m + "/" + d + " (" + w + ")  ";
        this.time = h + ":" + mi + ":" + s;
      },
    //TODO Apiを共通コンポーネントにまとめる
    requestAPI(something){
      switch(something){
        case 'light':
          var payload = '';
          // TODO プロキシ設定
          var url = '/raspi-api/infrared_code/';
          var status = '';
          if(this.light_state == false){ //onにする
            payload = {
              "base_time": 583,
              "signal": [[16, 8], "017620df", [1, 77], [16, 8], "e730e11e", [1, 77], [6, 3], "80080c0af500ff10ef43bc", [1, 62], [6, 3], "344a901484"]
              }
            status = true;
          }else{ //offにする
            payload = {
              "base_time": 555,
              "signal": [[16, 8], "017600ff", [1, 1]]
              }
            status = false;
          } 
          break;
        }
        axios.post(url, payload,this.headers)
          .then(() => {
            this.light_state = status;
          }).catch(err => {
            this.fetch_data = err;
          });
    }
  },
  created(){
    this.clock();
  }
}

// TODO ここをいい感じに上のメソッドとまとめる。
setInterval(()=>{
  var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var w = weeks[now.getDay()];
  var h = now.getHours();
  var mi = now.getMinutes();
  var s = now.getSeconds();
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  if (mi < 10) mi = "0" + mi;
  if (s < 10) s = "0" + s;
  var date = y + "/" + m + "/" + d + " (" + w + ")  ";
  var time = h + ":" + mi + ":" + s;
  document.getElementById("clock_date").innerHTML = date;
  document.getElementById("clock_time").innerHTML = time;
},
1000)


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.clock_frame, .controlpanel{
  width: 96%;
  margin: 10px;
}


.clock_frame{
  font-size: 20px;
  color: #fff7f7;
  background: #504f4f;
  padding: 4px;
}


.controlpanel div{
  display: inline-block;
  vertical-align: top;
  background: #504f4f;
  width:48%;
}

.light {
  float:left;
}

.aircon {
  float:right;
}

.light, .aircon {
  min-width: 100px;
}

.light:hover, .aircon:hover {
  background-color: #747272;
}

img {
max-width: 80%;
height: 100px;
}
</style>
