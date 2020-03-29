<template>
    <a id='light_flame' v-on:click="requestAPI('light')" href='javascript:void(0)'>
      <div class='light'>
        <img v-if='light_state' alt="light logo" src="../assets/light_on.png">
        <img v-else alt="light logo" src="../assets/light_off.png">
      </div>
    </a>
</template>


<script>


import axios from 'axios'

export default {
  name: 'light',
  data(){
      return {
        light_state:false
      }
    },
  methods: {
  //TODO Apiを共通コンポーネントにまとめる
  requestAPI(something){
    switch(something){
      case 'light':
        var payload = '';
        var status = '';
        var url = '/raspi-api/infrared_code/';
        if(this.light_state == false){ //onにする
          payload = {
            "base_time": 583,
            "signal": [[16, 8], "017620df", [1, 77], [16, 8], "e730e11e", [1, 77], [6, 3], "80080c0af500ff10ef43bc", [1, 62], [6, 3], "344a901484"]
            }
          status = true;
        }else{ //offにする
          payload = {
            "base_time": 555,
            "signal": [[16, 8], "017600ff", [1, 1]]
            }
          status = false;
        } 
        break;
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
    width:25%;
}

img {
max-width: 80%;
height: 100px;
}
</style>