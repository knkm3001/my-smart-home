
<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  name: 'draw_chart',
  props: ['fetch_data'],
  data () {
    return {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Line Dataset',
            data: [10, 50, 20, 30, 30, 40],
            borderColor: '#CFD8DC',
            fill: false,
            type: 'line',
            lineTension: 0.3,
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            }
          }]
        }
      }
    }
  },
  watch: {
    fetch_data:function(){
      console.log(JSON.stringify(this.fetch_data));
      console.log(JSON.stringify(this.fetch_data[1].data.temp));
      this.renderChart(this.data, this.options)
    }
  }
}
</script>