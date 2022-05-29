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
  cnpjCliente CHAR(14) NOT NULL,
  telefoneCliente CHAR(10) NOT NULL,
  tipoCliente CHAR(1),
  CONSTRAINT UK_cliente_cnpj UNIQUE (cnpjCliente),
  CONSTRAINT CK_cliente_tipoCliente CHECK(tipoCliente = 'F' OR tipoCliente = 'T')
);

-- Tabela usuario
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  tipoUsuario VARCHAR(13), 
  CONSTRAINT CK_usuario_tipoUsuario CHECK(tipoUsuario IN ('admin-f', 'admin-t', 'laboratorio', 'logistico', 'transportador')),
  CONSTRAINT UK_usuario_emailUsuario UNIQUE(emailUsuario),
  
  fkCliente INT NOT NULL,
  CONSTRAINT FK_usuario_fkCliente FOREIGN KEY (fkCliente) REFERENCES cliente (idCliente),
  
  fkAdmin INT NULL,
  CONSTRAINT FK_usuario_fkAdmin FOREIGN KEY (fkAdmin) REFERENCES usuario (idUsuario)
) AUTO_INCREMENT = 10;

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) NOT NULL,
  ano CHAR(4),
  CONSTRAINT UK_veiculo_placa UNIQUE(placa),
  
  fkTransportadora INT NOT NULL,
  CONSTRAINT FK_veiculo_fkTransportadora FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 100;

-- Tabela sensor
CREATE TABLE sensor (
  idSensor INT PRIMARY KEY AUTO_INCREMENT,

  fkFarmaceutica INT NOT NULL,
  CONSTRAINT FK_sensor_fkFarmaceutica FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente), 
  
  fkTransportadora INT NULL,
  CONSTRAINT FK_sensor_fkTransportadora FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

-- Tabela entrega
CREATE TABLE entrega (
  idEntrega INT PRIMARY KEY AUTO_INCREMENT,
  horaSaida DATETIME,
  horaChegada DATETIME,
  dataEntrega DATETIME NOT NULL,
  aprovada CHAR(1),
  CONSTRAINT CK_entrega_aprovada CHECK(aprovada = 'S' or aprovada = 'N' or aprovada = 'P'),
  
  fkVeiculo INT NULL,
  CONSTRAINT FK_entrega_fkVeiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo),
  
  fkSensor INT NOT NULL,
  CONSTRAINT FK_entrega_fkSensor FOREIGN KEY (fkSensor) REFERENCES sensor (idSensor),
  
  fkTransportadora INT NOT NULL,
  CONSTRAINT FK_entrega_fkTransportadora FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 1000;

-- Tabela endereco
CREATE TABLE endereco (
	fkEntrega INT,
    CONSTRAINT FK_endereco_fkEntrega FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
    
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
  tempMin DECIMAL(5,2) NOT NULL,
  tempMax DECIMAL(5,2) NOT NULL,
  umidMin DECIMAL(5,2) NOT NULL,
  umidMax DECIMAL(5,2) NOT NULL,
  
  fkFarmaceutica INT NOT NULL,
  CONSTRAINT FK_medicamento_fkFarmaceutica FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente)
) AUTO_INCREMENT = 100;

-- Tabela lote
CREATE TABLE lote (
  fkMedicamento INT NOT NULL,
  CONSTRAINT FK_lote_fkMedicamento FOREIGN KEY (fkMedicamento) REFERENCES medicamento (idMedicamento),
  fkEntrega INT NOT NULL,
  CONSTRAINT FK_lote_fkEntrega FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
  PRIMARY KEY (fkMedicamento, fkEntrega),
  qtd INT NOT NULL
);

-- Tabela registro
CREATE TABLE registro (
  idRegistro INT PRIMARY KEY AUTO_INCREMENT,
  
  dht11temperatura DECIMAL(5,2),
  dht11umidade DECIMAL(5,2),
  ldrluminosidade DECIMAL(6,2),
  lm35temperatura DECIMAL(5,2),
  trc5000chave INT,
  
  situacaoTemperatura CHAR(1), 
  CONSTRAINT CK_registro_situacaoTemperatura CHECK(situacaoTemperatura IN ('I','A','C')),
  
  situacaoUmidade CHAR(1),
  CONSTRAINT CK_registro_situacaoUmidade CHECK(situacaoUmidade IN ('I','A','C')),
  
  horario DATETIME NOT NULL,
  fkEntrega INT NOT NULL,
  CONSTRAINT FK_registro_fkEntrega FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega)
);



/* para sql server - remoto - produção */

-- Criando banco de dados dbTempControl
CREATE DATABASE dbTempControl;

-- Usando dbTempControl
USE dbTempControl;

-- Tabela cliente
CREATE TABLE cliente (
  idCliente INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  nomeCliente VARCHAR(45) NOT NULL,
  cnpjCliente CHAR(14) UNIQUE NOT NULL,
  telefoneCliente CHAR(10) NOT NULL,
  tipoCliente CHAR(1) CHECK(tipoCliente = 'F' OR tipoCliente = 'T') NOT NULL
);

-- Tabela usuario
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY IDENTITY(10,1),
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) UNIQUE NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  tipoUsuario VARCHAR(13) CHECK(tipoUsuario = 'admin-f' OR tipoUsuario = 'admin-t' OR tipoUsuario = 'laboratorio' OR tipoUsuario = 'logistico' OR tipoUsuario = 'transportador'),
  fkCliente INT NOT NULL,
  FOREIGN KEY (fkCliente) REFERENCES cliente (idCliente),
  fkAdmin INT NULL,
  FOREIGN KEY (fkAdmin) REFERENCES usuario (idUsuario)
);

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY IDENTITY(100,1),
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) UNIQUE NOT NULL,
  ano CHAR(4),
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

-- Tabela sensor
CREATE TABLE sensor (
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente), 
  
  idSensor INT PRIMARY KEY AUTO_INCREMENT,
  
  fkTransportadora INT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

-- Tabela entrega
CREATE TABLE entrega (
  idEntrega INT PRIMARY KEY IDENTITY(1000,1),
  horaSaida SMALLDATETIME,
  horaChegada SMALLDATETIME,
  dataEntrega SMALLDATETIME NOT NULL,
  aprovada CHAR(1) CHECK(aprovada = 'S' or aprovada = 'N' or aprovada = 'P'),
  
  fkVeiculo INT NULL,
  FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo),
  
  fkFarmaceutica INT NOT NULL,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica, fkSensor) REFERENCES sensor (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES cliente (idCliente)
);

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
  idMedicamento INT PRIMARY KEY IDENTITY(100,1),
  nome VARCHAR(45) NOT NULL,
  validade INT,
  tempMin DECIMAL(3,1) NOT NULL,
  tempMax DECIMAL(3,1) NOT NULL,
  umidMin DECIMAL(3,1),
  umidMax DECIMAL(3,1),
  
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES cliente (idCliente)
);

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
  fkEntrega INT NOT NULL,
  FOREIGN KEY (fkEntrega) REFERENCES entrega (idEntrega),
  
  idRegistro INT NOT NULL,
  PRIMARY KEY (fkEntrega, idRegistro),
  
  dht11temperatura DECIMAL(4,2),
  dht11umidade DECIMAL(4,2),
  lm35 DECIMAL(4,2),
  trc5000 INT,
  ldr DECIMAL(5,2),
  situacaoTemperatura CHAR(1) CHECK(situacaoTemperatura = 'I' OR situacaoTemperatura = 'A' OR situacaoTemperatura = 'C'),
  situacaoUmidade CHAR(1) CHECK(situacaoUmidade = 'I' OR situacaoUmidade = 'A' OR situacaoUmidade = 'C'),
  horario DATETIME NOT NULL
);
