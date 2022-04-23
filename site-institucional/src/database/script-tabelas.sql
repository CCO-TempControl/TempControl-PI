-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
-- Criando banco de dados dbTempControl
CREATE DATABASE dbTempControl;

-- Usando dbTempControl
USE dbTempControl;

-- Tabela usuario
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nomeUsuario VARCHAR(45) NOT NULL,
  emailUsuario VARCHAR(45) UNIQUE NOT NULL,
  senhaUsuario CHAR(128) NOT NULL,
  cnpjUsuario CHAR(14) UNIQUE NOT NULL,
  telefoneUsuario CHAR(11),
  tipoUsuario CHAR(1) CHECK(tipoUsuario = 'F' OR tipoUsuario = 'T') NOT NULL
) AUTO_INCREMENT = 1000;

-- Tabela veiculo
CREATE TABLE veiculo (
  idVeiculo INT PRIMARY KEY AUTO_INCREMENT,
  modelo VARCHAR(45) NOT NULL,
  placa CHAR(8) UNIQUE NOT NULL,
  ano CHAR(4) NOT NULL,
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES usuario (idUsuario)
) AUTO_INCREMENT = 100;

-- Tabela sensor
CREATE TABLE sensor (
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES usuario (idUsuario),
  
  idSensor INT NOT NULL,
  PRIMARY KEY (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES usuario (idUsuario)
);

-- Tabela trajeto
CREATE TABLE trajeto (
  idTrajeto INT PRIMARY KEY AUTO_INCREMENT,
  origem VARCHAR(45) NOT NULL,
  destino VARCHAR(45) NOT NULL,
  horaSaida DATETIME,
  horaChegada DATETIME,
  
  fkVeiculo INT NULL,
  FOREIGN KEY (fkVeiculo) REFERENCES veiculo (idVeiculo),
  
  fkFarmaceutica INT NOT NULL,
  fkSensor INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica, fkSensor) REFERENCES sensor (fkFarmaceutica, idSensor),
  
  fkTransportadora INT NOT NULL,
  FOREIGN KEY (fkTransportadora) REFERENCES usuario (idUsuario)
);

-- Tabela medicamento
CREATE TABLE medicamento (
  idMedicamento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  validade VARCHAR(30) NULL,
  tempMin DECIMAL(3,1) NOT NULL,
  tempMax DECIMAL(3,1) NOT NULL,
  umidMin INT NULL,
  umidMax INT NULL,
  fkFarmaceutica INT NOT NULL,
  FOREIGN KEY (fkFarmaceutica) REFERENCES usuario (idUsuario)
) AUTO_INCREMENT = 100;

-- Tabela lote
CREATE TABLE lote (
  idLote INT PRIMARY KEY AUTO_INCREMENT,
  qtd INT,
  
  fkMedicamento INT NOT NULL,
  FOREIGN KEY (fkMedicamento) REFERENCES medicamento (idMedicamento),
  
  fkTrajeto INT NOT NULL,
  FOREIGN KEY (fkTrajeto) REFERENCES trajeto (idTrajeto)
) AUTO_INCREMENT = 10;

-- Tabela registro
CREATE TABLE registro (
  fkTrajeto INT NOT NULL,
  FOREIGN KEY (fkTrajeto) REFERENCES trajeto (idTrajeto),
  
  idRegistro INT NOT NULL,
  PRIMARY KEY (fkTrajeto, idRegistro),
  
  temperatura DECIMAL(3,1) NOT NULL,
  umidade INT NOT NULL,
  horario TIME NOT NULL
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


