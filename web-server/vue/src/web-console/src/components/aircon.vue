<template>    
  <div class='flame'>
    <airconModal v-if='modal' v-on:close-modal='closeModal' :imgs='imgs'></airconModal>
    <a href='javascript:void(0)' v-on:click='openModal'>
      <div class='aircon'>
        <img v-if='aircon_status.power==0' alt="aircon logo" src="/img/aircon_off.png">
        <img v-else alt="aircon logo" src="/img/aircon_on.png">
        <div class='aircon-status'>
          <div v-if='aircon_status.power || (aircon_status.timer.settimer && aircon_status.timer.timermode)'>
            <div class='show-status'>
              <div><img :src='this.imgs.mode_types[aircon_status.mode]'></div>
              <div><p>{{aircon_status.temp}}℃</p></div>
              <div><img :src='this.imgs.direc_imgs[aircon_status.wind.winddirec]'></div>
              <div><img :src='this.imgs.wpower_imgs[aircon_status.wind.windpower]'></div>
            </div>
            <div class='show-timer' v-show='aircon_status.timer.settimer && aircon_status.timer.settime'>
              <div><p>power: <br>{{showTimerStatus}}</p></div>
              <div><p>time: <br>{{aircon_status.timer.settime}}</p></div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>

</template>




<script>

import airconModal from './airconModal.vue'
import { mapState } from "vuex";

export default {
  name: 'aircon',
  components: {
      airconModal
  },
  data(){
      return {
        modal: false,
        imgs:{       
          mode_types : {
          'cool' : '/img/aircon_mode/cool.png',
          'warm' : '/img/aircon_mode/warm.png',
          'dry'  : '/img/aircon_mode/dry.png',
          'blast': '/img/aircon_mode/blast.png'
          },
          direc_imgs : {
            0 : '/img/aircon_direcs/right_above.png',
            1 : '/img/aircon_direcs/above.png',
            2 : '/img/aircon_direcs/middle.png',
            3 : '/img/aircon_direcs/below.png',
            4 : '/img/aircon_direcs/right_below.png',
            5 : '/img/aircon_direcs/swing.png',
            6 : '/img/aircon_direcs/auto.png'
          },
          wpower_imgs : {
            0 : '/img/aircon_windpower/windpower_1.png',
            1 : '/img/aircon_windpower/windpower_2.png',
            2 : '/img/aircon_windpower/windpower_3.png',
            3 : '/img/aircon_windpower/windpower_auto.png'
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
      }
  },
  computed : {
    ...mapState({
        aircon_status: state => state.home_appliance_status.aircon
    }),
    showTimerStatus(){
      return this.aircon_status.timer.timermode ? 'ON' : 'OFF'
    }
  }
}

</script>

<style scoped>

.aircon > img {
  padding: 2px;
}

.aircon > img {
  max-width: 40%;
  max-height: 100px;
  float : left;
  margin : auto;
}

/** aircon  */

.aircon-status{
  width:55%;
  height: 100px;
  display: inline-block;
  background-color: #696767;
  border-radius: 2px;
  color:aliceblue;
}

.show-status, 
.show-timer{
  float: left;
  height: 100px;
}

.show-status{
  width: 60%;
}

.show-timer{
  width: 40%;
}

.show-status div,
.show-timer div{
  height: 50%;
  position: relative;
}

.show-status div{
  float: left;
  width: 50%;
}

.show-status img{
  padding: 4%;
  max-height: 80%;
  max-width: 80%;
}

.show-status p,
.show-timer p{
  text-align:center;
  color: #FFF;
  margin:0 auto;
  position: absolute;
  top: 50%;
  left:50%;
  -webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
}

@media screen and (max-width:800px){
  /*????800px????*/
  .show-status p,
  .show-timer p{
    font-size: 0.8em;
  }
}

@media screen and (min-width:1000px){
  /*????1000px????*/
  .show-status p,
  .show-timer p{
    font-size: 1.2em;
  }
}





/** modal */
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