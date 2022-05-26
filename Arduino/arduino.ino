//importação da biblioteca para funcionar o DHT11
#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "DHT.h"

// declaração de variáveis
#define DHTPIN A1 //declaração de endereço analógico
#define LM35PIN A5 //declaração de endereço analógico
#define LUMIPIN A0 //declaração de endereço analógico
#define CHAVPIN 7 //declaração de porta digital

//esse comando é importado da biblioteca DHT, aqui ele "inicia" o sensor, apenas o dht
DHT dht(DHTPIN, DHT11);

const int sensor = 1;

//Função responsável pela inicialização geral da placa
void setup(){
  pinMode(DHTPIN, INPUT); //pinMode é o comando que inicia a entrada e saida de dados do sensor , entrada = input , saída = output
  pinMode(CHAVPIN, INPUT);//entrada 
  pinMode(LM35PIN, INPUT);//entrada
  pinMode(LUMIPIN, INPUT);//entrada
  Serial.begin(9600); // definindo o baud rate (taxa de transferência em bits por segundo)
  dht.begin(); // inicia o sensor DHT11
}

void loop(){
  Serial.print(sensor);
  Serial.print(";");
  
  float dht11_umidade = dht.readHumidity();
  float dht11_temperatura = dht.readTemperature();
  Serial.print(dht11_umidade); // Apresenta no monitor serial a umidade capturada pelo DHT11
  Serial.print(";"); // Separa os dados por um símbolo;
  Serial.print(dht11_temperatura); // Apresenta no monitor serial a temperatura capturada pelo DHT11
  Serial.print(";"); // Separa os dados por um símbolo;
  
  float luminosidade = analogRead(LUMIPIN); // declara a variável do tipo float e recebe o valor de leitura analógica do LUMPIN, ou seja, da porta analogica A0
  Serial.print(luminosidade); // Apresenta no monitor serial a temperatura capturada pelo LDR
  Serial.print(";"); // Separa os dados por um símbolo;
  
  // declarando uma variável do tipo float para receber os dados do LM35, ou seja, da porta analógica A5, e 
  // posteriormente realiza uma fórmula (1ºC é igual a 10mV) para ter a exatidão da temperatura
  float lm35_temperatura = analogRead(LM35PIN);
  
  lm35_temperatura = lm35_temperatura * 0.00488;
  lm35_temperatura = lm35_temperatura * 100;
  
  Serial.print(lm35_temperatura); // apresenta no monitor serial a temperatura capturada pelo lm35
  Serial.print(";"); // Separa os dados por um símbolo;
 
  int chave = digitalRead(CHAVPIN); //A variável 'chave', do tipo INT, vai receber o valor da leitura da CHAVEPIN, esta que está conectada com a porta 7;
  // se a variável chave for igual a zero (ou seja, ter o valor 0) a resposta é (BLOQUEIO 1),SE NÃO, a resposta no monitor serial será (bloqueio 0)
  if (chave == 0){
   Serial.print("1");
  }
  else{
    Serial.print("0");
  }

  // é feito a quebra de linha da apresentação dos dados apresentados no monitor serial
  Serial.println("");
  delay(1000); // o comando é executado a cada 1000 milesegundos 
  
}
