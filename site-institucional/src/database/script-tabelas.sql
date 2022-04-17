-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
-- Criando a base de dados dbTempControl
CREATE DATABASE dbTempControl;

-- Usando dbTempControl
USE dbTempControl;

-- Criando tabela farmaceutica
CREATE TABLE farmaceutica (
  idFarmaceutica INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  senha CHAR(128) NOT NULL,
  cnpj CHAR(18) UNIQUE NOT NULL,
  telefone CHAR(11)
) AUTO_INCREMENT = 1000;

-- Criando tabela transportadora
CREATE TABLE transportadora (
  idTransportadora INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  senha CHAR(128) NOT NULL,
  cnpj CHAR(18) UNIQUE NOT NULL,
  telefone CHAR(11)
) AUTO_INCREMENT = 1000;

-- Criando tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) UNIQUE NOT NULL,
  ano CHAR(4),
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES transportadora (idTransportadora)
);

-- Criando tabela sensor
CREATE TABLE sensor (
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES farmaceutica (idFarmaceutica),
  
  idSensor INT NOT NULL,
  PRIMARY KEY (fkFarmaceutica, idSensor),
  
  estado ENUM('ok', 'defeito', 'conserto') DEFAULT 'ok',
  fkTransportadora INT,
  FOREIGN KEY (fkTransportadora) REFERENCES transportadora (idTransportadora)
);

-- Criando tabela trajeto
CREATE TABLE trajeto (
  idTrajeto INT PRIMARY KEY AUTO_INCREMENT,
  origem VARCHAR(45) NOT NULL,
  destino VARCHAR(45) NOT NULL,
  horaSaida DATETIME,
  horaChegada DATETIME,
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES transportadora (idTransportadora),
  
  fkFarmaceutica INT NOT NULL,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica, fkSensor) REFERENCES sensor (fkFarmaceutica, idSensor),
  
  fkVeiculo INT,
  FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo)
);

-- Criando tabela medicamento
CREATE TABLE medicamento (
  idMedicamento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  validade VARCHAR(30),
  tempMin DECIMAL(3,1) NOT NULL,
  tempMax DECIMAL(3,1) NOT NULL,
  umidMin INT,
  umidMax INT,
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES farmaceutica (idFarmaceutica)
);

-- Criando tabela lote
CREATE TABLE lote (
  idLote INT PRIMARY KEY,
  qtd INT NOT NULL,
  
  fkMedicamento INT NOT NULL,
  FOREIGN KEY (fkMedicamento) REFERENCES medicamento (idMedicamento),
  
  fkTrajeto INT NOT NULL,
  FOREIGN KEY (fkTrajeto) REFERENCES trajeto (idTrajeto)
);

-- Criando tabela registro
CREATE TABLE registro (
  fkTrajeto INT NOT NULL,
  FOREIGN KEY (fkTrajeto) REFERENCES trajeto (idTrajeto),
  
  idRegistro INT,
  PRIMARY KEY (fkTrajeto, idRegistro),
  
  temperatura DECIMAL(3,1) NOT NULL,
  umidade INT NOT NULL,
  horario TIME
);


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


