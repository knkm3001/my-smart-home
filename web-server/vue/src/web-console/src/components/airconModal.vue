  <template>
  <div id='overlay' v-on:click='closeModal'>
    <div id='content' v-on:click='stopEvent'>
      
      <div id='range-slider'>
        <p>
        <input id="rs-range-line" class="rs-range" type="range" min="22" max="28" v-model="tmp_status.temp">
        <span>  {{tmp_status.temp}}℃</span>
        </p>
      </div>

      <div id='mode'>
        <div v-for="(image,id) in mode_types" :key="id" class='mode-button'>
          <label>
            <input type="radio" name="mode" :value="id" v-model="tmp_status.mode">
            <img :src="image">
          </label>
        </div>
      </div>

      <div id='wind'>
        <div id='wind-direc' class='wind-botton'>
          <a href='javascript:void(0)' v-on:click="chengeDirecImg()">
            <img :src="direc_imgs[direc_cntr]">
          </a>
        </div>
        <div id='wind-power' class='wind-botton'>
          <a href='javascript:void(0)' v-on:click="chengePowerImg()">
            <img src='/img/aircon_windpower/wind.png'>
            <img :src="power_imgs[windpower_cntr]">
          </a>
        </div>
      </div>

      <div id='timer'>
        <div id='is-use-timer' class="cp_ipcheck">
          <input type="checkbox" id="c_ch1" v-model='tmp_status.timer.settimer'>
          <label for="c_ch1">Timer:&nbsp;&nbsp;&nbsp;</label>
        </div>
        <div class="timer-zone" v-show='tmp_status.timer.settimer'>
          <span class="cp_ipcheck cp_ipcheck2">
            <input type="checkbox" id="c_ch2" v-model='tmp_status.timer.timermode'>
            <label for="c_ch2">Power: </label>
          </span>
          <span>
            <label for="settime">set time: </label>
            <input type="time" id='settime' name="timertime" v-model="tmp_status.timer.settime">
          </span>
        </div>
      </div>

      <div id='send-bottun'>
        <a href="javascript:void(0)" class="btn-square stop" v-on:click="stopAircon">stop</a>
        <a href="javascript:void(0)" class="btn-square send" v-on:click="sendCode">send</a>
      </div>


    </div>
  </div>
</template>



<script>
import _ from 'lodash'

export default {
  name: 'airconModal',
  props: ['status'],
  data(){
    return {
      tmp_status : null,
      direc_cntr : 0,
      windpower_cntr : 0,
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
      power_imgs : {
        0 : '/img/aircon_windpower/windpower_1.png',
        1 : '/img/aircon_windpower/windpower_2.png',
        2 : '/img/aircon_windpower/windpower_3.png',
        3 : '/img/aircon_windpower/windpower_auto.png'
      }
    }
  },
  methods:{
    closeModal(){
      this.$emit('close-modal')
    },
    stopEvent(){
      event.stopPropagation()
    },
    sendCode(){
      this.tmp_status.power = 1
      this.$emit('updated', this.tmp_status)
    },
    stopAircon(){
      this.tmp_status.power = 0
      this.$emit('updated', this.tmp_status)
    },
    chengeDirecImg(){
    this.direc_cntr +=1
    if(this.direc_cntr > 6) this.direc_cntr = 0
    this.tmp_status.wind.winddirec = this.direc_cntr
    },
    chengePowerImg(){
    this.windpower_cntr +=1
    if(this.windpower_cntr > 3) this.windpower_cntr = 0
    this.tmp_status.wind.windpower = this.windpower_cntr
    }
  },
  created(){
    this.tmp_status = _.cloneDeep(this.status)
  }
}

</script>

<style scoped>

#overlay{
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#content{
  border-color: #ffffff;
  border-width: 1px;
  z-index:2;
  width:40%;
  height:40%;
  padding: 1em;
  background: rgba(182, 179, 179, 0.8);
}

#timer label{
  font-size: 18px;
  padding: 0.5em 1em;
  text-decoration: none;
  color: #FFF;
  border-radius: 3px;
}

/** mode */
#mode{
  height: 20%;
  margin: 20px 0px;
}

.mode-button{
  display: inline-block;
}

.mode-button input{
  display:none
}

input[type="radio"]:checked + img{
  background: rgba(116, 114, 114,0.8);
}

#mode img:hover{
  transition: 0.3s ;
  background-color: rgba(116, 114, 114,0.8);
}

.mode-button img{
  max-width: 60%;
  max-height: 100px;
  margin : auto 10px;
}

/** wind botton */
#wind{
  height: 20%;
  width: 40%;
  margin-top: 20px;
  margin-right: 30%;
  margin-left: 30%;
}

#wind div{
  display: inline-block;
  margin : 0 20px;
}


#wind-direc{
  position: absolute;
  right: 50%;
}

#wind-power{
  position: absolute;
  left: 50%;
}

#wind-direc img{
  height: 90px;
}

#wind-power img{
  height: 70px;
}


#wind div:hover{
  transition: 0.3s ;
  background-color: rgba(116, 114, 114,0.8);
}

/** send-bottun */
#send-bottun{
  margin-top: 10px;
}

#send-bottun a{
  margin: 0px 20px;
}

.btn-square {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  color: #FFF;
  border-radius: 3px;
}

.send{
  background: #668ad8;/*????*/
  border-bottom: solid 4px #627295;
}

.stop{
  background: #d86679cc;/*????*/
  border-bottom: solid 4px #956265;
}

.btn-square:active {
  /*?????????*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px);/*????*/
  border-bottom: none;/*????*/
}

/** Timer */
#timer{
  height: 20%;
  width: 40%;
  margin-top: 16px;
  margin-right: 30%;
  margin-left: 30%;
}


#is-use-timer{
  position: absolute;
  right: 50%;
  margin-right: 20px;
}

.timer-zone{
  position: absolute;
  left: 50%;
}

.timer-zone span{
  text-align: left;
}

.cp_ipcheck {
  width: 10%;
}
.cp_ipcheck input {
  display: none;
}
.cp_ipcheck label {
  position: relative;
  display: block;
  padding: 15px 0;
  padding-right: 35px;
  cursor: pointer;
}
.cp_ipcheck input[type='checkbox'] {
  position: absolute;
  visibility: hidden !important;
}
.cp_ipcheck input[type='checkbox'] + label:before,
.cp_ipcheck input[type='checkbox'] + label:after {
  position: absolute;
  top: 50%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin-top: -7.5px;
  content: '';
}
.cp_ipcheck input[type='checkbox'] + label:before {
  right: 0;
  width: 30px;
  height: 15px;
  border: 1px solid #e4e3e1;
  border-radius: 15px;
  background: #ffffff;
}

.cp_ipcheck input[type='checkbox'] + label:after {
  right: 15px;
  width: 15px;
  height: 15px;
  -webkit-transition: all 200ms ease-out;
          transition: all 200ms ease-out;
  border-radius: 50%;
  background: #ada9a9;
}

.cp_ipcheck2 input[type='checkbox'] + label:after {
  background: #dd3939;
}

.cp_ipcheck input[type='checkbox']:checked + label:after {
  right: 0;
  background: #52ec2b;
}

</style>