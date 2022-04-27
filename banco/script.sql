-- Criando banco de dados dbTempControl
CREATE DATABASE dbTempControl;

-- Usando dbTempControl
USE dbTempControl;

-- Tabela cliente
CREATE TABLE cliente (
  idCliente INT PRIMARY KEY,
  nomeCliente VARCHAR(45) NOT NULL,
  cnpjCliente CHAR(14) UNIQUE NOT NULL,
  telefoneCliente CHAR(10) NOT NULL,
  tipoCliente CHAR(1) CHECK(tipoCliente = 'F' OR tipoCliente = 'T') NOT NULL
);

-- Tabela usuario
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY,
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) UNIQUE NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  tipoUsuario ENUM('admin', 'laboratorio', 'logistico', 'transportadora'),
  fkAdmin INT NOT NULL,
  FOREIGN KEY (fkAdmin) REFERENCES usuario (idUsuario),
  fkCliente INT NOT NULL,
  FOREIGN KEY (fkCliente) REFERENCES cliente (idCliente)
);

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY,
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) UNIQUE NOT NULL,
  ano CHAR(4),
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

-- Tabela sensor
CREATE TABLE sensor (
  fkFarmaceutica INT,
  FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente),
  
  idSensor INT,
  PRIMARY KEY (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

-- Tabela entrega
CREATE TABLE entrega (
  idEntrega INT PRIMARY KEY,
  origem VARCHAR(45) NOT NULL,
  destino VARCHAR(45) NOT NULL,
  horaSaida DATETIME NULL,
  horaChegada DATETIME NULL,
  fkVeiculo INT,
  FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo),
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor),
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (fkCliente)
);

-- Tabela lote
CREATE TABLE lote (
  idLote INT PRIMARY KEY,
  fkMedicamento INT NOT NULL,
  FOREIGN KEY (fkMedicamento) REFERENCES medicamento (idMedicamento),
  fkEntrega INT NOT NULL,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
  qtd INT CHECK (qtd > 0)
);

-- Tabela registro
CREATE TABLE registro (
  fkEntrega INT,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
  idRegistro INT,
  PRIMARY KEY (fkEntrega, idRegistro),
  
  dht11temperatura DECIMAL(3,1),
  dht11umidade DECIMAL(3,1),
  lm35 DECIMAL(3,1),
  trc5000 INT,
  ldr DECIMAL(3,1),
  horario DATETIME NOT NULL
);
