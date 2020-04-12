import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomdata:{},
    home_appliance_status:{
        aircon:{
            power : 0,
            mode : 'cool',
            temp : 24,
            wind : 
              {
              windpower:0,
              winddirec:0
              },
            timer:{
              settimer:0,
              timermode:"",
              settime:""
              }
            },
        room_light:{
            power : true
            }
          }
        },
  mutations: {
    updateHomeApplianceStatus(state,payload){
        state.home_appliance_status[payload.target] = payload.update_status
    }
  },

  actions: {

  }
})