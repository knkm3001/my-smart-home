<template>
  <div class="chart">
    <draw_chart v-bind:fetch_data='fetch_data'></draw_chart>
  </div>
</template>


<script>
import axios from 'axios'
import draw_chart from './draw_chart';

export default {
  name: 'chart',
  props: {
    msg: String
  },
  components: {
    draw_chart,
  },
  data(){
    return {
      fetch_data:'apiかえってないよ'
    }
  },
  methods: {
      getApi(fetchnum = 0) {
        var url = '/express/api/fetch'
        if(fetchnum) url += '?fetchnum=' + fetchnum;
        axios.get(url, {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        })
          .then((response) => {
            this.fetch_data = response.data.reverse();
          }).catch(err => {
            this.fetch_data = err;
          });
      }
  },
  created(){
    this.getApi();
  }
}

</script>



<style scoped>
.chart{
  height : 60%;
}
</style>
