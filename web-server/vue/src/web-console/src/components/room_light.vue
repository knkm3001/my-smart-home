<template>
  <div class='flame'>
    <a v-on:click='switchLight()' href='javascript:void(0)'>
      <img v-if='light_state' alt="" src="/img/room_light_on.png">
      <img v-else alt="" src="/img/room_light_off.png">
    </a>
  </div>
</template>


<script>
import axios from 'axios'
import { mapState } from "vuex";

export default {
  name: 'light',
  data(){
      return {
        light_state:false
      }
    },
  methods: {
    switchLight(){
      var status = {'power':!this.roomlight_status.power}
      this.sendData(status)

      
      this.$store.commit('updateHomeApplianceStatus',{target:'room_light', update_status:status})
    },
    sendData(status){
        var url = '/express/api/ir-option/';
        var payload = {
          "target":"room_light",
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
  computed : {
    ...mapState({
        roomlight_status: state => state.home_appliance_status.room_light
    })
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