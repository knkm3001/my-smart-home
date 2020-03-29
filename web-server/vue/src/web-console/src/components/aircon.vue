<template>    
    <a href='javascript:void(0)' v-on:click="change_state()">
      <div class='aircon'>
        <img v-if='aircon_state' alt="aircon logo" src="../assets/aircon_on.png">
        <img v-else alt="aircon logo" src="../assets/aircon_off.png">
        <div class='indicator'>
            <dl>
                <dt>{{aircon_mode}}</dt>
                <dd>{{aircon_temp}}℃</dd>
                <dt>wind power:</dt>
                <dd>{{aircon_wind_pawer}}</dd>
                <dt>wind direction:</dt>
                <dd>{{aircon_wind_direc}}</dd>
            </dl>
        </div>
      </div>
    </a>
</template>




<script>

export default {
  name: 'aircon',
  data(){
      return {
          aircon_state:false,
          aircon_mode:'cool',
          aircon_temp: 24,
          aircon_wind_pawer: 1,
          aircon_wind_direc: 1,
          aircon_timer: 0, // 0:使わない 1:on 2:off
          aircon_timer_time: '00:00'
      }
  },
  methods:{
      change_state(){
          this.aircon_state = !this.aircon_state;
      }
  }
}

</script>

<style scoped>
a {
    width:70%;
}

.indicator{
    width: 40%;
    height: 100px;
    display: inline-block;
    background-color: #696767;
    border-radius: 2px;
    color:aliceblue;
}

img {
    max-width: 45%;
    max-height: 100px;
    float : left;
    margin : auto 10px;
}



dt{
    float:left;
    clear:left;
    width: 120px;
}

dd{
    float: left;
    margin-left: 1em;
}

</style>