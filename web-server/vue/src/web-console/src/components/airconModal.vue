  <template>
  <div id='overlay' v-on:click='closeModal'>
    <div id='content' v-on:click='stopEvent'>
      <p></p>
      <div class='range-slider'>
        <input id="rs-range-line" class="rs-range" type="range" min="22" max="28" v-model="tmp_status.temp">
        <span>  {{tmp_status.temp}}℃</span>
      </div>
      <div class='change-mode'>
        <p>
        <input type="radio" name="mode" value="cool" v-model="tmp_status.mode">
        <input type="radio" name="mode" value="warm" v-model="tmp_status.mode">
        <input type="radio" name="mode" value="dry"  v-model="tmp_status.mode">
        <input type="radio" name="mode" value="blast" v-model="tmp_status.mode">
        <span>  mode: {{tmp_status.mode}}</span>
        </p>
      </div>
      <div class='wind-direc'>
        <p>
        <input type="radio" name="wind-direc" value=0 v-model="tmp_status.wind.winddirec">
        <input type="radio" name="wind-direc" value=1 v-model="tmp_status.wind.winddirec">
        <input type="radio" name="wind-direc" value=2 v-model="tmp_status.wind.winddirec">
        <input type="radio" name="wind-direc" value=3 v-model="tmp_status.wind.winddirec">
        <input type="radio" name="wind-direc" value=4 v-model="tmp_status.wind.winddirec">
        <input type="radio" name="wind-direc" value=5 v-model="tmp_status.wind.winddirec">
        <input type="radio" name="wind-direc" value=6 v-model="tmp_status.wind.winddirec">
        <span>  wind-direc: {{tmp_status.wind.winddirec}}</span>
        </p>
      </div>
      <div class='wind-power'>
        <p>
        <input type="radio" name="wind-power" value=0 v-model="tmp_status.wind.windpower">
        <input type="radio" name="wind-power" value=1 v-model="tmp_status.wind.windpower">
        <input type="radio" name="wind-power" value=2 v-model="tmp_status.wind.windpower">
        <input type="radio" name="wind-power" value=3 v-model="tmp_status.wind.windpower">
        <input type="radio" name="wind-power" value=4 v-model="tmp_status.wind.windpower">
        <span>  wind-power: {{tmp_status.wind.windpower}}</span>
        </p>
      </div>
      <div class='timer'>
        <p>
        <input type="radio" name="timermode" value=1  v-model="tmp_status.timer.timermode">
        <input type="radio" name="timermode" value=0  v-model="tmp_status.timer.timermode">
        <span>timer mode: {{tmp_status.timer.timermode}}</span>
        </p>
        <p>
        <input type="time" name="timertime" v-model="tmp_status.timer.settime">
        <span>time: {{tmp_status.timer.settime}}</span>
        </p>
      </div>
      <p><button v-on:click="sendCode">send</button></p>
      <p><button v-on:click="stopAircon">stop</button></p>
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
      tmp_status: null
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
  background: rgba(218, 218, 218, 0.8);
}
</style>