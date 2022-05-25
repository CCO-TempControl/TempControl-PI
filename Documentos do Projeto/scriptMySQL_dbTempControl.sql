-- Criando banco de dados dbTempControl
CREATE DATABASE dbTempControl;

-- Usando dbTempControl
USE dbTempControl;

-- Tabela cliente
CREATE TABLE cliente (
  idCliente INT PRIMARY KEY AUTO_INCREMENT,
  nomeCliente VARCHAR(45) NOT NULL,
  cnpjCliente CHAR(14) UNIQUE NOT NULL,
  telefoneCliente CHAR(10) NOT NULL,
  tipoCliente CHAR(1) CHECK(tipoCliente = 'F' OR tipoCliente = 'T')
);

-- Tabela usuario
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) UNIQUE NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  tipoUsuario VARCHAR(13) CHECK(tipoUsuario = 'admin-f' OR tipoUsuario = 'admin-t' OR tipoUsuario = 'laboratorio' OR tipoUsuario = 'logistico' OR tipoUsuario = 'transportador'),
  fkCliente INT NOT NULL,
  FOREIGN KEY (fkCliente) REFERENCES cliente (idCliente),
  fkAdmin INT NULL,
  FOREIGN KEY (fkAdmin) REFERENCES usuario (idUsuario)
) AUTO_INCREMENT = 10;

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) UNIQUE NOT NULL,
  ano CHAR(4),
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 100;

-- Tabela sensor
CREATE TABLE sensor (
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente), 
  
  idSensor INT NOT NULL,
  PRIMARY KEY (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

-- Tabela entrega
CREATE TABLE entrega (
  idEntrega INT PRIMARY KEY AUTO_INCREMENT,
  horaSaida DATETIME,
  horaChegada DATETIME,
  dataEntrega DATETIME NOT NULL,
  aprovada CHAR(1) CHECK(aprovada = 'S' or aprovada = 'N' or aprovada = 'P'),
  
  fkVeiculo INT NULL,
  FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo),
  
  fkFarmaceutica INT NOT NULL,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica, fkSensor) REFERENCES sensor (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 1000;

-- Tabela endereco
CREATE TABLE endereco (
	fkEntrega INT,
    FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
    
	idEndereco INT,
	PRIMARY KEY(fkEntrega, idEndereco),
    
    endereco VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    uf CHAR(2) NOT NULL,
    numero INT NOT NULL,
    cep CHAR(9) NOT NULL
);

-- Tabela medicamento
CREATE TABLE medicamento (
  idMedicamento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  validade INT,
  tempMin DECIMAL(3,1) NOT NULL,
  tempMax DECIMAL(3,1) NOT NULL,
  umidMin DECIMAL(3,1),
  umidMax DECIMAL(3,1),
  
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 100;

-- Tabela lote
CREATE TABLE lote (
  fkMedicamento INT NOT NULL,
  FOREIGN KEY (fkMedicamento) REFERENCES medicamento (idMedicamento),
  fkEntrega INT NOT NULL,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
  PRIMARY KEY (fkMedicamento, fkEntrega),
  qtd INT NOT NULL
);

-- Tabela registro
CREATE TABLE registro (
  idRegistro INT PRIMARY KEY AUTO_INCREMENT,
  
  dht11temperatura DECIMAL(3,1),
  dht11umidade DECIMAL(3,1),
  lm35 DECIMAL(3,1),
  trc5000 INT,
  ldr DECIMAL(3,1),
  situacaoTemperatura CHAR(1) CHECK(situacaoTemperatura = 'I' OR situacaoTemperatura = 'A' OR situacaoTemperatura = 'C'),
  situacaoUmidade CHAR(1) CHECK(situacaoUmidade = 'I' OR situacaoUmidade = 'A' OR situacaoUmidade = 'C'),
  horario DATETIME NOT NULL,
  fkEntrega INT NOT NULL,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega)
);

