-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
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
  fkCliente INT NOT NULL,
  FOREIGN KEY (fkCliente) REFERENCES cliente (idCliente),
  
  idUsuario INT NOT NULL,
  PRIMARY KEY (fkCliente, idUsuario),
  
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) UNIQUE NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  tipoUsuario ENUM('admin', 'laboratorio', 'logistico', 'transportadora'),
  
  fkAdmin INT NOT NULL,
  FOREIGN KEY (fkAdmin) REFERENCES usuario (idUsuario)
);

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT NOT NULL,
  modelo VARCHAR(45) NULL,
  placa CHAR(8) NULL,
  ano CHAR(4) NULL,
  fkTransportadora INT NOT NULL,
  PRIMARY KEY (idVeiculo),
  INDEX fk_veiculo_usuario1_idx (fkTransportadora ASC) VISIBLE,
  CONSTRAINT fk_veiculo_usuario1
    FOREIGN KEY (fkTransportadora)
    REFERENCES cliente (idCliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- Tabela sensor
CREATE TABLE sensor (
  fkFarmaceutica INT NOT NULL,
  idSensor INT NOT NULL,
  fkTransportadora INT NOT NULL,
  PRIMARY KEY (fkFarmaceutica, idSensor),
  INDEX fk_sensor_usuario1_idx (fkFarmaceutica ASC) VISIBLE,
  INDEX fk_sensor_usuario2_idx (fkTransportadora ASC) VISIBLE,
  CONSTRAINT fk_sensor_usuario1
    FOREIGN KEY (fkFarmaceutica)
    REFERENCES cliente (idCliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sensor_usuario2
    FOREIGN KEY (fkTransportadora)
    REFERENCES cliente (idCliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- Tabela entrega
CREATE TABLE entrega (
  idEntrega INT NOT NULL,
  origem VARCHAR(45) NULL,
  destino VARCHAR(45) NULL,
  horaSaida DATETIME NULL,
  horaChegada DATETIME NULL,
  fkVeiculo INT NOT NULL,
  fkSensor INT NOT NULL,
  fkTransportadora INT NOT NULL,
  PRIMARY KEY (idEntrega),
  INDEX fk_Trajeto_Veículo1_idx (fkVeiculo ASC) VISIBLE,
  INDEX fk_trajeto_sensor1_idx (fkSensor ASC) VISIBLE,
  INDEX fk_trajeto_usuario1_idx (fkTransportadora ASC) VISIBLE,
  CONSTRAINT fk_Trajeto_Veículo1
    FOREIGN KEY (fkVeiculo)
    REFERENCES veiculo (idVeiculo)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_trajeto_sensor1
    FOREIGN KEY (fkSensor)
    REFERENCES sensor (idSensor)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_trajeto_usuario1
    FOREIGN KEY (fkTransportadora)
    REFERENCES cliente (idCliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- Tabela medicamento
CREATE TABLE medicamento (
  idMedicamento INT NOT NULL,
  nome VARCHAR(45) NULL,
  validade VARCHAR(30) NULL,
  tempMin DECIMAL(3,1) NULL,
  tempMax DECIMAL(3,1) NULL,
  umidMin INT NULL,
  umidMax INT NULL,
  fkFarmaceutica INT NOT NULL,
  PRIMARY KEY (idMedicamento),
  INDEX fk_medicamento_usuario1_idx (fkFarmaceutica ASC) VISIBLE,
  CONSTRAINT fk_medicamento_usuario1
    FOREIGN KEY (fkFarmaceutica)
    REFERENCES cliente (idCliente)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- Tabela lote
CREATE TABLE lote (
  idLote INT NOT NULL,
  fkMedicamento INT NOT NULL,
  fkEntrega INT NOT NULL,
  qtd INT NULL,
  PRIMARY KEY (idLote),
  INDEX fk_lote_medicamento1_idx (fkMedicamento ASC) VISIBLE,
  INDEX fk_lote_trajeto1_idx (fkEntrega ASC) VISIBLE,
  CONSTRAINT fk_lote_medicamento1
    FOREIGN KEY (fkMedicamento)
    REFERENCES medicamento (idMedicamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_lote_trajeto1
    FOREIGN KEY (fkEntrega)
    REFERENCES entrega (idEntrega)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

-- Tabela registro
CREATE TABLE registro (
  fkEntrega INT NOT NULL,
  idRegistro VARCHAR(45) NOT NULL,
  dht11temperatura DECIMAL(3,1) NULL,
  dht11umidade DECIMAL(3,1) NULL,
  lm35 DECIMAL(3,1) NULL,
  trc5000 INT NULL,
  ldr DECIMAL(3,1) NULL,
  horario DATETIME NULL,
  PRIMARY KEY (fkEntrega, idRegistro),
  INDEX fk_registro_trajeto1_idx (fkEntrega ASC) VISIBLE,
  CONSTRAINT fk_registro_trajeto1
    FOREIGN KEY (fkEntrega)
    REFERENCES entrega (idEntrega)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


