<template>    
  <div class='flame'>
    <airconModal v-if='modal' v-on:close-modal='closeModal' :status='status' @updated='updateAirconData'></airconModal>
    <a href='javascript:void(0)' v-on:click="openModal">
      <div class='aircon'>
        <img v-if='status.power' alt="aircon logo" src="../assets/aircon_on.png">
        <img v-else alt="aircon logo" src="../assets/aircon_off.png">
        <div class='indicator'>
            <dl>
                <dt>{{status.mode}}</dt>
                <dd>{{status.temp}}℃</dd>
                <dt>wind power:</dt>
                <dd>{{status.wind.windpower}}</dd>
                <dt>wind direction:</dt>
                <dd>{{status.wind.winddirec}}</dd>
                <dt>timermode:</dt>
                <dd>{{status.timermode}}</dd>
                <dt>timertime:</dt>
                <dd>{{status.timertime}}</dd>
            </dl>
        </div>
      </div>
    </a>
  </div>
</template>




<script>

import airconModal from './airconModal.vue'
import axios from 'axios'

export default {
  name: 'aircon',
  components: {
      airconModal
  },
  data(){
      return {
        status:{
          power : 0,
          mode : "dry",
          temp : 24,
          wind : 
            {
            windpower:2,
            winddirec:1
            },
          timer:{
            settimer:0,
            timermode:"",
            settime:""
            }
          },
        modal: false
      }
  },
  methods:{
      openModal(){
        this.modal = true
      },
      closeModal(){
        this.modal = false
      },
      updateAirconData(tmp_status){
        this.status = tmp_status
        console.log('new status')
        console.dir(this.status)
        var url = '/express/api/ir-option/';
        var payload = {
          "target":"aircon",
          "status":this.status
        }
        axios.post(url, payload, {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        })
          .then(() => {
            this.light_state = status;
          }).catch(err => {
            this.fetch_data = err;
          });
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


#overlay{
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  margin:0;
  border:hidden;

  display: flex;
  align-items: center;
  justify-content: center;

}


#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
</style>