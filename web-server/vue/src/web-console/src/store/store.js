import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomdata:{},
    home_appliance_status:{
        aircon:{
            power : 0,
            mode : "dry",
            temp : 24,
            wind : 
              {
              windpower:2,
              winddirec:1
              },
            timer:{
              settimer:0,
              timermode:"",
              settime:""
              }
            },
        light:{}
    }
  },
  mutations: {
    updateHomeApplianceStatus(state,payload){
        state.home_appliance_status.aircon = payload.aircon_status
    }
  },

  actions: {

  }
})