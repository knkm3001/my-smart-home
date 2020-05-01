#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include "freertos/task.h"
#include <HTTPClient.h>

#define LED_PIN 15
#define ir_frequency 38 // kHz
#define ir_duty      0.3 // %
#define PIN          A18
#define PWMCH        0


// sensor
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#define SEALEVELPRESSURE_HPA (1013.25)
Adafruit_BME280 bme;



const char* ssid     = "**************";
const char* password = "**************";

IPAddress ip(192, 168, 0, 48);
IPAddress gateway(192,168, 0, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress DNS(192, 168, 0, 1);

String serverUrl = "http://192.168.0.24:13000/express/roomdata/register/";

WiFiServer server(80);

void postRoomData(void *pvParameters){
  HTTPClient http;
  int mesuredCounter = 0;

  while(1){
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    float temperature = bme.readTemperature();
    float pressure    = bme.readPressure() / 100.0F;
  
    float humidity    = bme.readHumidity();
    // float altitude   = bme.readAltitude(SEALEVELPRESSURE_HPA);

    time_t t;
    struct tm *tm;
    t = time(NULL);
    tm = localtime(&t);
    String jstDateTime = ""; 
    jstDateTime += String(tm->tm_year+1900)+"/";
    jstDateTime += (String(tm->tm_mon+1).length() ==1 ? "0"+String(tm->tm_mon+1) : String(tm->tm_mon+1))+"/";
    jstDateTime += (String(tm->tm_mday).length()  ==1 ? "0"+String(tm->tm_mday)  : String(tm->tm_mday)) +"T";
    jstDateTime += (String(tm->tm_hour).length()  ==1 ? "0"+String(tm->tm_hour)  : String(tm->tm_hour)) +":";
    jstDateTime += (String(tm->tm_min).length()   ==1 ? "0"+String(tm->tm_min)   : String(tm->tm_min))  +":";
    jstDateTime += (String(tm->tm_sec).length()   ==1 ? "0"+String(tm->tm_sec)   : String(tm->tm_sec));

    Serial.println(jstDateTime);

    StaticJsonDocument<200> json;
    json["time"] = jstDateTime;
    json["data"]["temp"] = String(temperature,2).toFloat();
    json["data"]["pres"] = String(pressure,2).toFloat();
    json["data"]["hum"]  = String(humidity,2).toFloat();
    char payload[255];
    serializeJson(json, payload, sizeof(payload));
    Serial.println(payload);


    if(mesuredCounter < 10){ // 慣らし運転として1秒ごとに10回計測。これは保存しない。
      mesuredCounter ++;
      delay(1000);
      continue;
    }

    int httpResponseCode = http.POST((uint8_t*)payload, strlen(payload));
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    Serial.print("温度 :");
    Serial.print(temperature);
    Serial.println(" °C");
     
    Serial.print("気圧 :");
    Serial.print(pressure);
    Serial.println(" hPa");
  
    Serial.print("湿度 :");
    Serial.print(humidity);
    Serial.println(" %");
    Serial.println();

    http.end();
    delay(600000); // 10min


  }
}


void setup()
{
    Serial.begin(115200);


  // server
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.config(ip, gateway, subnet, DNS);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.println("");
    
    server.begin();

    // bme280
    bool status = bme.begin(0x76);  
    if (!status) {
      Serial.println("BME280 sensorが使えません");
      while (10);
    }

    configTime( 3600*9, 0, "ntp.nict.jp", "ntp.jst.mfeed.ad.jp"); // jst: 3600*9

    xTaskCreatePinnedToCore(postRoomData, "postRoomData", 4096, NULL, 1, NULL,0);

}




int parseString2num(String s){
  /* 
  リクエストボディの取得 
  TODO: もっとうまく実装できるでしょう
  */
  if(s.equals("a")){
    return 10;
  }else if(s.equals("b")){
    return 11;
  }else if(s.equals("c")){
    return 12;
  }else if(s.equals("d")){
    return 13;
  }else if(s.equals("e")){
    return 14;
  }else if(s.equals("f")){
    return 15;
  }else{
    return s.toInt();
  }
}


DynamicJsonDocument parseRequestBody(WiFiClient client){
  /* リクエストボディの取得 */

  char requestPayload[1024];
  int charCounter = 0;
  while(client.available()){
    char c = client.read();
    requestPayload[charCounter] = c;
    charCounter++;
  }

  Serial.println("requestPayload: ");
  for(int i=0;i<charCounter;i++){
    Serial.print(requestPayload[i]);
  }
  Serial.println();
  //jsonドキュメントの作成 make JSON document
  DynamicJsonDocument json_body(1024);
  deserializeJson(json_body, requestPayload);
  
  return json_body;
}

void convertIRstring2IRcode(DynamicJsonDocument json_body, int *wave){
  /* リクエストボディのパース */

  int base_time    = json_body["base_time"];
  JsonArray signal = json_body["signal"];

  Serial.print("base_time: ");
  Serial.println(base_time);
  
  int T; // base time の何倍かを示す
  int wave_cntr  = 0;
  int signal_len = signal.size();
  for(int i=0;i<signal_len;i++){
    String signal_code = signal[i];
    Serial.println(signal_code);
    if(signal_code.indexOf("0x") == -1){
      // リーダー部分やリピート部分など
      int T = signal_code.toInt();
      wave[wave_cntr] = base_time*T;
      wave_cntr++;
    }else{
      // 信号本体(0xからはじまる16進数文字列)
      int signal_code_length = signal_code.length();
      for(int signal_code_cntr=2;signal_code_cntr<signal_code_length;signal_code_cntr++){ // 0x をとばしてるから2から
        String bin_code = String(parseString2num(String(signal_code.charAt(signal_code_cntr))),BIN);
        int bin_len = bin_code.length();
        for(int k=0;k<4-bin_len;k++){bin_code = "0"+bin_code;} // 0埋め
        for(int bin_code_cntr=0;bin_code_cntr<4;bin_code_cntr++){
          // mark部分は共通
          wave[wave_cntr] = base_time;
          wave_cntr++;
          // space部分は0ならT, 1なら3T
          T = String(bin_code.charAt(bin_code_cntr)).equals("0") ? 1 : 3;
          wave[wave_cntr] = base_time*T;
          wave_cntr++;
        }
      }
    }
  }
}



void flashLED(int *wave, int wave_len){
  /* 赤外線コードに従って赤外線信号を点滅させる */

  int bit = 7; // 2^7段階
  pinMode(PIN, OUTPUT);
  ledcSetup(PWMCH, ir_frequency*1000, bit);
  ledcAttachPin(PIN, PWMCH);

  int duty = round(pow(2,bit)*ir_duty); // duty比 0.3

  for(int i=0;i<wave_len;i++){
    if(wave[i] == 0) break;
    if(i%2==0){ // mark
      ledcWrite(PWMCH, duty);
      delayMicroseconds(wave[i]);
    }else{ // space
      ledcWrite(PWMCH, 0);
      delayMicroseconds(wave[i]); 
    }
  }
}




void loop(){
  WiFiClient client = server.available();
  bool read_request_body_flg = false;
  String currentLine = "";
  String response_body = "";
  if (client) {
    Serial.println("New Client.");
    while(client.connected()){
      if (!(client.available())){ break; }
      
      char c = client.read(); // 1文字ずつ見ていく
      Serial.write(c);
      if(c != '\r' && c != '\n'){ currentLine += c; } // 改行以外はcurrentLineに保存
      
      // HTTPヘッダの行ごとに処理をする(主にメソッドの処理)
      // 空行であればhttpレスポンスを返す(POSTならばリクエストbodyもこのとき確認する)
      if(c == '\n'){
        if (currentLine.length() != 0) {
          // メソッド
          
          // 赤外線信号の読み取り
          if (currentLine.indexOf("GET /esp32/readIR?return=") >= 0) {
            int startpos = currentLine.indexOf("=");
            int endpos   = currentLine.indexOf(" ",startpos);
            String valueString = currentLine.substring(startpos+1,endpos);
            Serial.print("valueString: ");
            Serial.println(valueString);
            /*
            int rawdata[1024] = {0};
            if(valueString.equals("rowdata")){
              rawdata = readIrFrash();
            }else if(valueString.equals("encoded")){
              rawdata = readIrFrash();
              String ircode  = encodeIR(rawdata);
            }
            */
            response_body = "test ok";
          }

          // 赤外線信号の実行
          if (currentLine.indexOf("POST /esp32/flashIR") >= 0) {
            Serial.print("currentLine: ");
            Serial.println(currentLine);
            read_request_body_flg = true;
          }

          currentLine = "";

        }else{
          // httpヘッダの解析終了
          
          if(read_request_body_flg){  // リクエストボディのチェック
            DynamicJsonDocument json_body = parseRequestBody(client);
            int wave[1024] = {0};
            int wave_len = 1024;
            convertIRstring2IRcode(json_body,wave);
            flashLED(wave,wave_len);
            response_body = "ircode sended";
            }
          // ここまででHTTPリクエスト解析は終了

          
          // HTTP resp
          client.println("HTTP/1.1 200 OK");
          client.println("Content-type:text/html");
          client.println();
          // resp body
          client.println(response_body);
          // The HTTP response ends with another blank line:
          client.println();
        }
      }
    }
    // close the connection:
    client.stop();
    Serial.println();
    Serial.println("Client Disconnected.");
    Serial.println();
  }
}