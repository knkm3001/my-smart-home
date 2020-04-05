<template>    
  <div class='flame'>
    <airconModal v-show='modal' v-on:close-modal='closeModal' :aircondata='aircondata'></airconModal>
    <a href='javascript:void(0)' v-on:click="openModal">
      <div class='aircon'>
        <img v-if='aircondata.state' alt="aircon logo" src="../assets/aircon_on.png">
        <img v-else alt="aircon logo" src="../assets/aircon_off.png">
        <div class='indicator'>
            <dl>
                <dt>{{aircondata.mode}}</dt>
                <dd>{{aircondata.degree}}℃</dd>
                <dt>wind power:</dt>
                <dd>{{aircondata.windpawer}}</dd>
                <dt>wind direction:</dt>
                <dd>{{aircondata.winddirec}}</dd>
                <dt>timermode:</dt>
                <dd>{{aircondata.timermode}}</dd>
                <dt>timertime:</dt>
                <dd>{{aircondata.timertime}}</dd>
            </dl>
        </div>
      </div>
    </a>
  </div>
</template>




<script>

import airconModal from './airconModal.vue'

export default {
  name: 'aircon',
  components: {
      airconModal
  },
  data(){
      return {
        aircondata:{
          state:false,
          degree:25,
          mode:'cool',
          winddirec:1,
          windpower:1,
          timermode:null,
          timertime:null
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