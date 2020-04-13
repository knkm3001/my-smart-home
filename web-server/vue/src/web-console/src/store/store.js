import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomdata:{},
    home_appliance_status:{
        aircon:{},
        room_light:{}
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