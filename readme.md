# ESP32を使用した自室のスマートホーム化 
ESP32を使用して、自室の気温・湿度・気圧などのデータの取得、また家電操作を行って自室のスマートホーム化を目指す。機能を追加し次第、更新していく予定。
  
## できていること
- ESP32を利用したスマートリモコンの作成
- ESP32から部屋の温度・湿度・気圧を取得
- webコンソール画面
  - シーリングライトの操作
  - エアコンの操作
  - 部屋の温度・湿度・気圧のグラフ表示
  
## 回路
![circuit](https://user-images.githubusercontent.com/54818379/80910339-ca19ea80-8d69-11ea-8d50-7717a9a21d1a.jpg)
  
## TODO
- 時刻の下にいまの気温とかそういうの記載する。
- 天気予報機能を実装
- ESP32から部屋の照度、二酸化炭素濃度など値を取得
- Slack とか Alexa みたいなのでも操作する
- ESP32のmain.cppのファイル分割
- ESP32のHTTPエラー処理
- ESP32で赤外線コードの読み取りとリテラルへのコンバートAPIの実装

## 機能
ESP32とLAN内のサーバ(複数のコンテナが起動)を用いて実装した
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
|  raspi3 modelB  |1台|
|  赤外線リモコン受信モジュール<br>OSRB38C9AA|1つ|
|MOSFET 2N7000|1つ|
|MOSFET IRFU9024NPBF|1つ|
|赤外線LED OSI5LA5113A|2つ|
|赤色LED|1つ|
|DC-DC降圧モジュール|1つ|
|抵抗 4.7kΩ 1/2W|1つ|
|抵抗 27Ω 1W|3つ|
|BME280(センサ)|1つ|
|プレッドボード|1つ|
|ジャンパワイヤ|複数本|



## 参考サイト
[格安スマートリモコンの作り方](https://qiita.com/takjg/items/e6b8af53421be54b62c9)  
[うたかたサバイバー Raspberry Piでエアコンの赤外線リモコンを解析する](https://paltee.net/archives/247)  
[電脳伝説 赤外線LEDドライブ回路の決定版](https://vintagechips.wordpress.com/2013/10/05%E8%B5%A4%E5%A4%96%E7%B7%9Aled%E3%83%89%E3%83%A9%E3%82%A4%E3%83%96%E5%9B%9E%E8%B7%AF%E3%81%AE%E6%B1%BA%E5%AE%9A%E7%89%88/)  
[赤外線リモコンの通信フォーマット](http://elm-chan.org/docs/ir_format.html)  
[irrp.py](http://abyz.me.uk/rpi/pigpio/examples.html#Python_irrp_py) 





