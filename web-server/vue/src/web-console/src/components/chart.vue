<template>
  <div class="chart">
    <drawChart v-bind:fetch_data='fetch_data'></drawChart>
  </div>
</template>


<script>
import axios from 'axios'
import drawChart from './drawChart';

export default {
  name: 'chart',
  props: {
    msg: String
  },
  components: {
    drawChart,
  },
  data(){
    return {
      fetch_data:'apiかえってないよ'
    }
  },
  methods: {
      getApi(fetchnum = 0) {
        var url = '/express/roomdata/fetch'
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
