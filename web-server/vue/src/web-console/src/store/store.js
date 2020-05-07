import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomdata:{},
    home_appliance_status:{
        aircon:{
          power : false,
          mode : "cool",
          temp : 25,
          wind : 
            {
            windpower:0,
            winddirec:0
            },
          timer:{
            settimer:false,
            timermode:null,
            settime:null
            }
        },
        room_light:{
          power:false
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