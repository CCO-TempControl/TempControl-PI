#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h"
#define DHTPIN A1
#define LM35PIN A5
#define LUMIPIN A0
#define CHAVPIN 7
DHT dht(DHTPIN, DHT11);


void setup(){
  
  pinMode(DHTPIN, INPUT);
  pinMode(CHAVPIN, INPUT);
  pinMode(LM35PIN, INPUT);
  pinMode(LUMIPIN, INPUT);
  Serial.begin(9600);
  dht.begin();
  
}


void loop(){
  
  float dht11_umidade = dht.readHumidity();
  float dht11_temperatura = dht.readTemperature();
  
  Serial.println((String)"umidade: " + dht11_umidade);
  Serial.println((String)"temperatura: " +dht11_temperatura);
  
  float luminosidade = analogRead(LUMIPIN);
  
  Serial.println((String)"luminosidade: " +luminosidade);

  float lm35_temperatura = analogRead(LM35PIN);
  lm35_temperatura = (lm35_temperatura * 5) / 1023;
  lm35_temperatura = lm35_temperatura / 0.010;
  
  Serial.println((String)"temperatura lm35: " + lm35_temperatura);  
  int chave = digitalRead(7);
  
  if (chave == 0)
  {
    Serial.print("bloqueio 1");
  }
  else
  {
    Serial.print("bloqueio 0");
  }
  
  Serial.println();
   Serial.println();
    Serial.println("------------------------------");
  delay(100);
  
}
