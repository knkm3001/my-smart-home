  <template>
  <div id='overlay' v-on:click='closeModal'>
    <div id='content' v-on:click='stopEvent'>
      
      <div id='range-slider'>
        <label class='temp-chr'>
        <input id="rs-range-line" class="rs-range" type="range" min="21" max="29" v-model="tmp_status.temp">
        {{tmp_status.temp}}℃</label>
      </div>

      <div id='mode'>
        <div v-for="(image,id) in imgs.mode_types" :key="id" class='mode-button'>
          <label>
            <input type="radio" name="mode" :value="id" v-model="tmp_status.mode">
            <img :src="image">
          </label>
        </div>
      </div>

      <div id='wind'>
        <div id='wind-direc' class='wind-botton'>
          <a href='javascript:void(0)' v-on:click="chengeDirecImg()">
            <img :src="imgs.direc_imgs[wdirec_cntr]">
          </a>
        </div>
        <div id='wind-power' class='wind-botton'>
          <a href='javascript:void(0)' v-on:click="chengePowerImg()">
            <img src='/img/aircon_windpower/wind.png'>
            <img :src="imgs.wpower_imgs[wpower_cntr]">
          </a>
        </div>
      </div>

      <div id='timer'>
        <div id='is-use-timer' class="cp_ipcheck">
          <input type="checkbox" id="c_ch1" v-model='tmp_status.timer.settimer'>
          <label for="c_ch1">Timer:</label>
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
        <a href="javascript:void(0)" class="btn-square stop" v-on:click="updataStatus(0)">stop</a>
        <a href="javascript:void(0)" class="btn-square send" v-on:click="updataStatus(1)">send</a>
      </div>


    </div>
  </div>
</template>



<script>
import _ from 'lodash'
import axios from 'axios'


export default {
  name: 'airconModal',
  props: ['imgs'],
  data(){
    return {
      tmp_status : null,
      wdirec_cntr : 0,
      wpower_cntr : 0
    }
  },
  methods:{
    closeModal(){
      this.$emit('close-modal')
    },
    stopEvent(){
      event.stopPropagation()
    },
    updataStatus(option){
      this.tmp_status.power = option  // 0:off, 1:on
      this.$store.commit('updateHomeApplianceStatus',{target:'aircon', update_status:this.tmp_status})
      this.sendData(this.tmp_status)
    },
    chengeDirecImg(){
      this.wdirec_cntr +=1
      if(this.wdirec_cntr > 6) this.wdirec_cntr = 0
      this.tmp_status.wind.winddirec = this.wdirec_cntr
    },
    chengePowerImg(){
      this.wpower_cntr +=1
      if(this.wpower_cntr > 3) this.wpower_cntr = 0
      this.tmp_status.wind.windpower = this.wpower_cntr
    },
    sendData(status){
        var url = '/express/home-appliance/ir-option/';
        var payload = {
          "target":"aircon",
          "status":status
        }
        axios.post(url, payload, {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        })
          .then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          });
      }
  },
  created(){
    this.tmp_status  = _.cloneDeep(this.$store.state.home_appliance_status.aircon)
    this.wdirec_cntr  = this.tmp_status.wind.winddirec
    this.wpower_cntr = this.tmp_status.wind.windpower
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
  border-width: 2px;
  z-index:2;
  min-width:40%;
  height:50%;
  padding: 1em;
  background: rgba(99, 97, 97, 0.8);
}


/** common */
#mode img:hover, #wind div:hover{
  background: rgba(204, 203, 203, 0.4);
  border-radius: 5px;
}


/** range */
#range-slider{
  margin-top: 10px;
}

input[type=range] {
  -webkit-appearance:none;
  height:4px;
  width:240px;
  border-radius:4px;
  margin-right: 8px;
}

input[type=range]::-webkit-slider-thumb{
  -webkit-appearance:none;
  background:rgb(255, 255, 255);
  height:16px;
  width:16px;
  border-radius:50%;
}

.temp-chr{
  font-size: 20px;
  padding: 0.5em 1em;
  text-decoration: none;
  color: #FFF;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  left: 30px;
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
  background: rgba(204, 203, 203, 0.8);
  border-radius: 5px;
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

#timer label{
  font-size: 18px;
  padding: 0.5em 1em;
  text-decoration: none;
  color: #FFF;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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