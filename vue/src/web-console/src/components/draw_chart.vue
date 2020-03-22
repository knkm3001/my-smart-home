
<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  name: 'draw_chart',
  props: ['fetch_data'],
  data () {
    return {
      data: {
        labels: [],
        datasets: []
        },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'date-time'
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }]
        }
      }
    }
  },
  watch: {
    fetch_data:function(){
      console.log(JSON.stringify(this.fetch_data));

      var data_set = {
            label: '',
            data: [],
            borderColor: '',
            fill: false,
            type: 'line',
            lineTension: 0.3,
          }

      var hum_data_set = JSON.parse(JSON.stringify(data_set));
      hum_data_set.lavel = 'hum';
      hum_data_set.data = this.fetch_data.map(v => v.data.hum)
      hum_data_set.borderColor = '#87cefa'
      this.data.datasets.push(hum_data_set)

      var temp_data_set = JSON.parse(JSON.stringify(data_set));
      temp_data_set.lavel = 'temp';
      temp_data_set.data = this.fetch_data.map(v => v.data.temp)
      temp_data_set.borderColor = '#ff7f50'
      this.data.datasets.push(temp_data_set)

      this.data.labels = this.fetch_data.map(v => v.time)

      this.renderChart(this.data, this.options)
    }
  }
}
</script>