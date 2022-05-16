-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
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
  tipoUsuario ENUM('admin-f', 'admin-t', 'laboratorio', 'logistico', 'transportador') ,
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
  origem VARCHAR(45) NOT NULL,
  destino VARCHAR(45) NOT NULL,
  horaSaida DATETIME,
  horaChegada DATETIME,
  
  fkVeiculo INT,
  FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo),
  
  fkFarmaceutica INT NOT NULL,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica, fkSensor) REFERENCES sensor (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 1000;

-- Tabela medicamento
CREATE TABLE medicamento (
  idMedicamento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  validade VARCHAR(30),
  tempMin DECIMAL(3,1) NOT NULL,
  tempMax DECIMAL(3,1) NOT NULL,
  umidMin INT,
  umidMax INT,
  
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 100;

-- Tabela lote
CREATE TABLE lote (
  idLote INT PRIMARY KEY AUTO_INCREMENT,
  qtd INT NOT NULL,
  fkMedicamento INT NOT NULL,
  FOREIGN KEY (fkMedicamento) REFERENCES medicamento (idMedicamento),
  fkEntrega INT NOT NULL,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega)
);

-- Tabela registro
CREATE TABLE registro (
  fkEntrega INT NOT NULL,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
  
  idRegistro INT NOT NULL,
  PRIMARY KEY (fkEntrega, idRegistro),
  
  dht11temperatura DECIMAL(3,1),
  dht11umidade DECIMAL(3,1),
  lm35 DECIMAL(3,1),
  trc5000 INT,
  ldr DECIMAL(3,1),
  horario DATETIME NOT NULL
);


/* para sql server - remoto - produção */


-- Tabela cliente

--! TODO: Converter as chaves compostas  !-- 

CREATE TABLE cliente (
  idCliente INT PRIMARY KEY IDENTITY(1,1),
  nomeCliente VARCHAR(45) NOT NULL,
  cnpjCliente CHAR(14) UNIQUE NOT NULL,
  telefoneCliente CHAR(10) NOT NULL,
  tipoCliente CHAR(1) CHECK(tipoCliente = 'F' OR tipoCliente = 'T')
);

-- Tabela usuario
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY IDENTITY(10,1),
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) UNIQUE NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  tipoUsuario CHAR NOT NULL CHECK(tipoUsuario IN('admin-f', 'admin-t', 'laboratorio', 'logistico', 'transportador')) ,
  fkCliente INT FOREIGN KEY REFERENCES cliente (idCliente), 
  fkAdmin INT FOREIGN KEY REFERENCES usuario (idUsuario)
); 

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY IDENTITY(100,1),
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) UNIQUE NOT NULL,
  ano CHAR(4),
  fkTransportadora INT FOREIGN KEY REFERENCES cliente (idCliente)
);

-- Tabela sensor
CREATE TABLE sensor (
 
   fkFarmaceutica INT FOREIGN KEY REFERENCES cliente (idCliente), 
  
  idSensor INT NOT NULL,
  PRIMARY KEY (fkFarmaceutica, idSensor),
  
  fkTransportadora INT FOREIGN KEY REFERENCES cliente (idCliente)
);

-- Tabela entrega
CREATE TABLE entrega (
  idEntrega INT PRIMARY KEY IDENTITY(1000,1),
  origem VARCHAR(45) NOT NULL,
  destino VARCHAR(45) NOT NULL,
  horaSaida DATETIME,
  horaChegada DATETIME,
  fkVeiculo INT FOREIGN KEY REFERENCES veiculo (idVeiculo),
  
  fkFarmaceutica INT NOT NULL,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica, fkSensor) REFERENCES sensor (fkFarmaceutica, idSensor),
  
  fkTransportadora INT FOREIGN KEY REFERENCES cliente (idCliente)
);

-- Tabela medicamento
CREATE TABLE medicamento (
  idMedicamento INT PRIMARY KEY IDENTITY(100,1),
  nome VARCHAR(45) NOT NULL,
  validade VARCHAR(30),
  tempMin DECIMAL(3,1) NOT NULL,
  tempMax DECIMAL(3,1) NOT NULL,
  umidMin INT,
  umidMax INT,
  fkFarmaceutica INT FOREIGN KEY REFERENCES cliente (idCliente)
);

-- Tabela lote
CREATE TABLE lote (
  idLote INT PRIMARY KEY AUTO_INCREMENT,
  qtd INT NOT NULL,
  fkMedicamento INT FOREIGN KEY REFERENCES medicamento (idMedicamento),
  fkEntrega INT FOREIGN KEY REFERENCES entrega (idEntrega)
);

-- Tabela registro
CREATE TABLE registro (
  fkEntrega INT FOREIGN KEY REFERENCES entrega (idEntrega),
  
  idRegistro INT NOT NULL,
  PRIMARY KEY (fkEntrega, idRegistro),
  
  dht11temperatura DECIMAL(3,1),
  dht11umidade DECIMAL(3,1),
  lm35 DECIMAL(3,1),
  trc5000 INT,
  ldr DECIMAL(3,1),
  horario DATETIME NOT NULL
);

