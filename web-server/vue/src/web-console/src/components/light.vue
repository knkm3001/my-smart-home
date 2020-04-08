<template>
  <div class='flame'>
    <a id='light_flame' v-on:click="requestAPI('light')" href='javascript:void(0)'>
      <div class='light'>
        <img v-if='light_state' alt="light logo" src="../assets/light_on.png">
        <img v-else alt="light logo" src="../assets/light_off.png">
      </div>
    </a>
  </div>
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
        var payload = null;
        var status = null;
        var url = '/express/api/ir-option/';
        if(this.light_state == false){ //onにする
          payload = {
            "target" : "room_light",
            "status" : {
              "power" : 1
            }
          }
          status = true;
        }else{ //offにする
          payload = {
            "target" : "room_light",
            "status" : {
              "power" : 0
            }
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
.flame {
    width:25%;
}

img {
max-width: 80%;
height: 100px;
}
</style>