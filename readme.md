# ESP32を使用した自室のスマートホーム化 
ESP32を使用して、自室の気温・湿度・気圧などのデータの取得、また家電操作を行って自室のスマートホーム化を目指す。機能を追加し次第、更新していく予定。

![demo](https://user-images.githubusercontent.com/54818379/84763772-b075ef00-b007-11ea-8802-442dc2d2a733.gif)


## 機能
- ESP32を利用したスマートリモコンの作成
- ESP32から部屋の温度・湿度・気圧を取得
- webコンソール画面
  - シーリングライトの操作
  - エアコンの操作
  - 部屋の温度・湿度・気圧のグラフ表示
  
## 回路
![circuit](https://user-images.githubusercontent.com/54818379/80910339-ca19ea80-8d69-11ea-8d50-7717a9a21d1a.jpg)

## コマンド
- vue コンテナ  
`cd my-smart-home/web-server`  
`docker-compose exec vue sh`  
`cd web-console/;npm run serve`
- express コンテナ  
### 
`docker-compose exec express bash`  
`node server.js`  



## システム構成
ESP32とLAN内のサーバ(複数のコンテナが起動)を用いて構成
- ESP32
  - 自室のデータの取得及びサーバへのポスト
  - POSTされたjsonフォーマットに従って赤外線LEDを点滅させることによる自室の家電の操作
- サーバ
  - APIコンテナ(express)
    - APIリクエストの処理。各コンテナ及びESP32をつなぐハブとしての役割を持つ
  - webフロントコンテナ(Vue.js)
    - データのグラフ、家電の操作用コンソール画面を表示する
  - DBコンテナ(mongoDB)
    - センサより得られた室内のデータ、及び家電のステータスを保存

## 使用した道具や部品

|  部品名 |  個数  |
| ---- | ---- |
| ESP32 DevKit ESP32-WROOM  |1|
|  赤外線リモコン受信モジュール<br>OSRB38C9AA|1|
|MOSFET 2N7000|1|
|MOSFET IRFU9024NPBF|1|
|赤外線LED OSI5LA5113A|2|
|赤色LED|1|
|DC-DC降圧モジュール|2|
|抵抗 4.7kΩ 1/2W|1|
|抵抗 27Ω 1W|3|
|BME280(センサ)|1|
|プレッドボード|1|
|ジャンパワイヤ|複数本|

## TODO
- 時刻の下にいまの気温とかの数値を表示
- 天気予報機能を実装
- Slack とか Alexa みたいなのでも操作する
- ESP32から部屋の照度、二酸化炭素濃度など値を取得
- ESP32のmain.cppのファイル分割
- ESP32で赤外線コードの読み取りとリテラルへのコンバートAPIの実装
- webコンソールのレスポンシブ化


## 参考サイト
[格安スマートリモコンの作り方](https://qiita.com/takjg/items/e6b8af53421be54b62c9)  
[うたかたサバイバー Raspberry Piでエアコンの赤外線リモコンを解析する](https://paltee.net/archives/247)  
[電脳伝説 赤外線LEDドライブ回路の決定版](https://vintagechips.wordpress.com/2013/10/05%E8%B5%A4%E5%A4%96%E7%B7%9Aled%E3%83%89%E3%83%A9%E3%82%A4%E3%83%96%E5%9B%9E%E8%B7%AF%E3%81%AE%E6%B1%BA%E5%AE%9A%E7%89%88/)  
[赤外線リモコンの通信フォーマット](http://elm-chan.org/docs/ir_format.html)  
[irrp.py](http://abyz.me.uk/rpi/pigpio/examples.html#Python_irrp_py)  
[ESP32 Web Server with BME280](https://randomnerdtutorials.com/esp32-web-server-with-bme280-mini-weather-station/)





