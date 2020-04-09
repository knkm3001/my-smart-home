
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
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0.3,
            }},
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }],
          yAxes: [{
            id:'y-axis-temp', //温度
            ticks: {
              stepSize: 5,
              max: 30,
              min: 10,
              userCallback: (tick)=> {
                  return tick.toString() + '℃';
                }
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            position: "left"
          },{
            id:'y-axis-pres', //気圧
            ticks: {
              stepSize: 2,
              max: 1018,
              min: 1000,
              userCallback: (tick)=> {
                  return tick.toString() + 'hpa';
                }
            },
            position: "right"
          },{
            id:'y-axis-hum', //湿度
            ticks: {
              stepSize: 10,
              max: 70,
              min: 30,
              userCallback: (tick)=> {
                  return tick.toString() + '%';
                }
            },
            position: "left"
          },]
        }
      }
    }
  },
  watch: {
    fetch_data:function(){

      var data_set = {
            label: '',
            data: [],
            borderColor: '',
            fill: false,
            type: 'line',
            yAxisID:'',
            lineTension: 0.3,
          }


      // 温度
      var temp_data_set = JSON.parse(JSON.stringify(data_set));
      temp_data_set.label = 'temperature';
      temp_data_set.data = this.fetch_data.map(v => v.data.temp);
      temp_data_set.borderColor = '#ff6347';
      temp_data_set.type = 'line';
      temp_data_set.yAxisID= "y-axis-temp";
      this.data.datasets.push(temp_data_set);


      // 湿度
      var hum_data_set = JSON.parse(JSON.stringify(data_set));
      hum_data_set.label = 'humidity';
      hum_data_set.data = this.fetch_data.map(v => v.data.hum);
      hum_data_set.borderColor = '#00bfff';
      hum_data_set.type = 'line';
      hum_data_set.yAxisID= "y-axis-hum";
      this.data.datasets.push(hum_data_set);


      // 気圧
      var pres_data_set = JSON.parse(JSON.stringify(data_set));
      pres_data_set.label = 'air pressure';
      pres_data_set.data = this.fetch_data.map(v => v.data.pres);
      pres_data_set.borderColor = '#ccf2ff';
      pres_data_set.type = 'bar';
      pres_data_set.yAxisID= "y-axis-pres";
      pres_data_set.backgroundColor = new Array(this.fetch_data.length).fill('rgba(204 ,242 ,255, 0.5)')
      this.data.datasets.push(pres_data_set);
      
      // x軸
      this.data.labels = this.fetch_data.map(v => v.time)

      this.renderChart(this.data, this.options)
    }
  }
}
</script>