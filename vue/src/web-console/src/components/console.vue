<template>
  <div class="console">
    <div class='clock_frame'>
        <span id="clock_date"></span>
        <span id="clock_time"></span>
    </div>
    <div class='controlpanel'>
      <div class='light'>
        <a href="javascript:void(0)">
        <img alt="light logo" src="../assets/light.png" width="100" height="100">
        </a>
      </div>
      <div class='aircon'>
        <a href="javascript:void(0)">
        <img alt="light logo" src="../assets/aircon.png" width="250" height="100">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'console',
}
function clock()
{
    var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var w = weeks[now.getDay()];
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    document.getElementById("clock_date").innerHTML =  y + "/" + m + "/" + d + " (" + w + ")";
    document.getElementById("clock_time").innerHTML = h + ":" + mi + ":" + s;
}
setInterval(clock, 1000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.clock_frame{
  padding: 20;
  margin: 20px;
  height : 60px;
  background: #504f4f;
  color: #000000;
  font-size: 20px;
  color: #fff7f7;
}


.controlpanel div{
  display: inline-block;
  vertical-align: top;
  width : 40%;
  margin: 20px;
  background: #504f4f;
}
</style>
