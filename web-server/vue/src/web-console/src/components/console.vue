<template>
  <div id="console">
    <div id='clock_frame'>
        <span id="clock_date">{{date}}</span>
        <span id="clock_time">{{time}}</span>
    </div>
    <div id='controlpanel'>
      <room_light id='room_light'></room_light>
      <aircon id='aircon'></aircon>
    </div>
  </div>
</template>

<script>
import room_light from './room_light.vue'
import aircon from './aircon.vue'
import { mapState } from "vuex";
import axios from 'axios'

export default {
  name: 'console',
  components: {
    room_light,
    aircon
  },
  data(){
    return {
      light_state:false
    }
  },
  methods: {
    showClock(){
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
    registerAppriancesData(){
      this.$store.subscribe((mutation) => {
        if(mutation.type == 'updateHomeApplianceStatus'){
          let url = '/express/home-appliance/register/';
          let payload = this.status
          console.log('payload')
          console.dir(payload)
          axios.post(url, payload, {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          })
            .then(res => {
              console.log('家電情報登録')
              console.log(res)
            }).catch(err => {
              console.log(err)
            });
          }
      })
    },
    fetchAppriancesData(){
          let url = '/express/home-appliance/fetch/';
          axios.get(url, {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          })
            .then(res => {
              console.log('家電情報取得')
              this.status.home_appliance_status = res.data.home_appliance_status
          })
    }
  },
  computed : {
    ...mapState({
        status: state => state
    })
  },
  async created(){
    this.showClock();
    await this.fetchAppriancesData();
  },
  mounted(){
    this.registerAppriancesData();
  },
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
<style>


#clock_frame, #controlpanel{
  width: 96%;
  margin: 10px;
}


#clock_frame{
  font-size: 20px;
  color: #fff7f7;
  background: #504f4f;
  padding: 4px;
}

/* 各コンソール共通 */
#controlpanel .flame{
  display: inline-block;
  vertical-align: top;
  background: #504f4f;
  padding: 3px;
  height: 100px;
}

#room_light {
  float:left;
  width: 23%;
}

#aircon {
  float:right;
  width: 72%;
}


</style>
