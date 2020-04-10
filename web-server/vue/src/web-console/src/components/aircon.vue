<template>    
  <div class='flame'>
    <airconModal v-if='modal' v-on:close-modal='closeModal' :status='status' @updated='updateAirconData'></airconModal>
    <a href='javascript:void(0)' v-on:click="openModal">
      <div class='aircon'>
        <img v-if='status.power' alt="aircon logo" src="/img/aircon_on.png">
        <img v-else alt="aircon logo" src="/img/aircon_off.png">
        <div class='aircon-status'>
          <div v-if='status.power || (status.timer.timermode == 1 && status.timer.settime)'>
            <div class='show-status'>
              <div><img :src='imgs.mode'></div>
              <div><p>{{status.temp}}℃</p></div>
              <div><img :src='imgs.direc'></div>
              <div><img :src='imgs.wpower'></div>
            </div>
            <div class='show-timer' v-show='status.timer.settimer && status.timer.settime'>
                <p>{{showOnOff}}</p>
                <p>time : <br>{{status.timer.settime}}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>




<script>

import airconModal from './airconModal.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'aircon',
  components: {
      airconModal
  },
  data(){
      return {
        modal: false,
        imgs: null,
        status:{
          power : 0,
          mode : 'cool',
          temp : 25,
          wind : 
            {
            windpower:0,
            winddirec:0,
            },
          timer:{
            settimer:0,
            timermode:null,
            settime:null
            }
        }
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
        this.status = _.cloneDeep(tmp_status.status)
        this.imgs = _.cloneDeep(tmp_status.imgs)
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
  },
  computed : {
    showOnOff: function(){
      return this.status.timer.timermode ? 'ON' : 'OFF'
    }
  }
}

</script>

<style scoped>

.aircon > img {
    max-width: 45%;
    max-height: 100px;
    float : left;
    margin : auto 10px;
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

/** aircon  */

.aircon-status{
  width: 45%;
  height: 100px;
  display: inline-block;
  background-color: #696767;
  border-radius: 2px;
  color:aliceblue;
}

.show-status{
  float: left;
  width: 70%;
  height: 100px;
}

.show-status div{
  width: 48%;
  height: 50%;
  float: left;
  text-align:center;
}

.show-status p{
  font-size: 1.2em;
  line-height: 18px;
  text-align:center;
  color: #FFF;
}

.show-status img{
  padding: 4%;
  max-height: 42px;
}

.show-timer{
  float: right;
  width: 30%;
  height: 100px;
}

.show-timer span{
  text-align:center;
  margin:0 auto;
}

/** modal */
#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
</style>