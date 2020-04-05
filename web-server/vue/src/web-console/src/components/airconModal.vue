  <template>
  <div id='overlay' v-on:click='closeModal'>
    <div id='content' v-on:click='stopEvent'>
      <p></p>
      <div class='range-slider'>
        <input id="rs-range-line" class="rs-range" type="range" min="22" max="28" v-model="aircondata.degree">
        <span>  {{aircondata.degree}}℃</span>
      </div>
      <div class='change-mode'>
        <p>
        <input type="radio" name="mode" value="cool" v-model="aircondata.mode">
        <input type="radio" name="mode" value="warm" v-model="aircondata.mode">
        <input type="radio" name="mode" value="dry"  v-model="aircondata.mode">
        <input type="radio" name="mode" value="wind" v-model="aircondata.mode">
        <span>  mode： {{aircondata.mode}}</span>
        </p>
      </div>
      <div class='wind-direc'>
        <p>
        <input type="radio" name="wind-direc" value="1"    v-model="aircondata.winddirec">
        <input type="radio" name="wind-direc" value="2"    v-model="aircondata.winddirec">
        <input type="radio" name="wind-direc" value="3"    v-model="aircondata.winddirec">
        <input type="radio" name="wind-direc" value="4"    v-model="aircondata.winddirec">
        <input type="radio" name="wind-direc" value="5"    v-model="aircondata.winddirec">
        <input type="radio" name="wind-direc" value="move" v-model="aircondata.winddirec">
        <input type="radio" name="wind-direc" value="auto" v-model="aircondata.winddirec">
        <span>  wind-direc: {{aircondata.winddirec}}</span>
        </p>
      </div>
      <div class='wind-power'>
        <p>
        <input type="radio" name="wind-power" value="1"     v-model="aircondata.windpower">
        <input type="radio" name="wind-power" value="2"     v-model="aircondata.windpower">
        <input type="radio" name="wind-power" value="3"     v-model="aircondata.windpower">
        <input type="radio" name="wind-power" value="power" v-model="aircondata.windpower">
        <input type="radio" name="wind-power" value="auto"  v-model="aircondata.windpower">
        <span>  wind-power: {{aircondata.windpower}}</span>
        </p>
      </div>
      <div class='timer'>
        <p>
        <input type="radio" name="timermode" value="on"  v-model="aircondata.timermode">
        <input type="radio" name="timermode" value="off" v-model="aircondata.timermode">
        <span>timer mode: {{aircondata.timermode}}</span>
        </p>
        <p>
        <input type="time" name="timertime" v-model="aircondata.timertime">
        <span>time: {{aircondata.timertime}}</span>
        </p>
      </div>
      <p><button v-on:click="sendCode">send</button></p>
      <p><button v-on:click="stopAircon">stop</button></p>
    </div>
  </div>
</template>



<script>
export default {
  name: 'airconModal',
  props:['aircondata'],
  methods:{
    closeModal(){
      this.$emit('close-modal')
    },
    stopEvent(){
      event.stopPropagation()
    },
    sendCode(){
     this.aircondata.state = true
    },
    stopAircon(){
      this.aircondata.state = false
    }
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