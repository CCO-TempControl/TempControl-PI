#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h" //importação de biblioteca


#define DHTPIN A1 //declaração de portas logicas A = analogica
#define LM35PIN A5
#define LUMIPIN A0
#define CHAVPIN 7 //declaração de porta digital

DHT dht(DHTPIN, DHT11); //esse comando é importado da biblioteca DHT , aqui ele "inicia" o sensor...apenas o dht

//Função responsavel pela inicialização geral da placa , configuração
void setup(){
  
  pinMode(DHTPIN, INPUT); //pinMode é o comando que inicia a entrada e saida de dados do sensor , entrada = input , saida = output
  pinMode(CHAVPIN, INPUT);//entrada
  pinMode(LM35PIN, INPUT);//entrada
  pinMode(LUMIPIN, INPUT);//entrada
  Serial.begin(9600);
  dht.begin(); // inicia o sensor
  
}


void loop(){
  //float,tipo de uma variavel, onde o valor vai ser um numero preciso (com casas decimasi)
  
  //tipo variavel nome variavel = valor variavel (estrutura)
  float dht11_umidade = dht.readHumidity(); // comando que vem da biblioteca importada (INCLUDE) , que le a umidade 
  float dht11_temperatura = dht.readTemperature();//comando que vem da biblioteca importada (INCLUDE) , que le a umidade 
  
  Serial.println((String)"umidade: " + dht11_umidade);
  Serial.println((String)"temperatura: " +dht11_temperatura);
  
  float luminosidade = analogRead(LUMIPIN);
  
  Serial.println((String)"luminosidade: " +luminosidade);

  float lm35_temperatura = analogRead(LM35PIN);
  lm35_temperatura = (lm35_temperatura * 5) / 1023;
  lm35_temperatura = lm35_temperatura / 0.010;
  
  Serial.println((String)"temperatura lm35: " + lm35_temperatura);  
  int chave = digitalRead(7);
  
  if (chave == 0) // se a variavel chave for igual a zero (ou seja , ter o valor 0) var mostrar o alerta (BLOQUEIO 1)
  {
    Serial.print("bloqueio 1");
  }
  else // SE NÃO vai alertar (bloqueio 0)
  {
    Serial.print("bloqueio 0");
  }
  
  Serial.println();
   Serial.println();
    Serial.println("------------------------------");
  delay(100); // o comando é executado a cada 100 milesegundos 
  
}
