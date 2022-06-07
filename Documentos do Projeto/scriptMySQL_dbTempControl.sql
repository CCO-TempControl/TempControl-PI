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

INSERT INTO cliente (nomeCliente, cnpjCliente, telefoneCliente, tipoCliente) VALUES ('Polar', '22458573000199', '94783-0234', 'T');
INSERT INTO cliente (nomeCliente, cnpjCliente, telefoneCliente, tipoCliente) VALUES ('Pfizer', '76384192000133', '97418-0266', 'F');
INSERT INTO cliente (nomeCliente, cnpjCliente, telefoneCliente, tipoCliente) VALUES ('KGT', '74589227000133', '98192-0011', 'T');
INSERT INTO cliente (nomeCliente, cnpjCliente, telefoneCliente, tipoCliente) VALUES ('Line Express', '55671823000144', '90323-9456', 'T');

SELECT * FROM cliente;

INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) VALUES ('Admin Polar', 'controle.qualidade@departamento.polar', SHA2('@Polar#Grupo10', 512), 'admin-t', 1, null);
INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) VALUES ('Admin Pfizer', 'controle.logistico@departamento.pfizer', SHA2('@Pfizer#Grupo10', 512), 'admin-f', 2, null);
INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) VALUES ('Admin KGT', 'controle.qualidade@departamento.kgt', SHA2('@KGT#Grupo10', 512), 'admin-t', 3, null);
INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario, fkCliente, fkAdmin) VALUES ('Admin Line Express', 'controle.qualidade@departamento.lineexpress', SHA2('@LineExpress#Grupo10', 512), 'admin-t', 4, null);

SELECT * FROM usuario;

INSERT INTO medicamento (nome, validade, tempMin, tempMax, umidMin, umidMax, fkFarmaceutica) VALUES ('Atenolol', 20, 2, 30, 20, 80, 2);
INSERT INTO medicamento (nome, validade, tempMin, tempMax, umidMin, umidMax, fkFarmaceutica) VALUES ('Marevan', 30, 18, 29, 70, 90, 2);
INSERT INTO medicamento (nome, validade, tempMin, tempMax, umidMin, umidMax, fkFarmaceutica) VALUES ('Diazepan', 40, 1, 27.5, 30, 90, 2);
INSERT INTO medicamento (nome, validade, tempMin, tempMax, umidMin, umidMax, fkFarmaceutica) VALUES ('Puran', 50, -10, 5, 10, 50, 2);
INSERT INTO medicamento (nome, validade, tempMin, tempMax, umidMin, umidMax, fkFarmaceutica) VALUES ('Diamox', 60, 28, 40, 45, 50, 2);

SELECT * FROM medicamento;

INSERT INTO veiculo (modelo, placa, ano, fkTransportadora) VALUES ('Actros', 'NWT9281', '2021', 1);
INSERT INTO veiculo (modelo, placa, ano, fkTransportadora) VALUES ('Constellation', 'DWN7283', '2020', 1);
INSERT INTO veiculo (modelo, placa, ano, fkTransportadora) VALUES ('Meteor', 'URS7912', '2021', 1);
INSERT INTO veiculo (modelo, placa, ano, fkTransportadora) VALUES ('Actros', 'POL6367', '2020', 3);
INSERT INTO veiculo (modelo, placa, ano, fkTransportadora) VALUES ('Meteor', 'LTG9345', '2019', 4);

SELECT * FROM veiculo;

INSERT INTO sensor (fkFarmaceutica) VALUES (2);
INSERT INTO sensor (fkFarmaceutica) VALUES (2);
INSERT INTO sensor (fkFarmaceutica) VALUES (2);

SELECT * FROM sensor;

INSERT INTO entrega (horaSaida, horaChegada, dataEntrega, aprovada, fkSensor, fkTransportadora, fkVeiculo) VALUES ('2022-05-27 04:15', '2022-05-27 20:00', '2022-05-27 20:25', 'S', 2, 1, 101);
INSERT INTO entrega (horaSaida, horaChegada, dataEntrega, aprovada, fkSensor, fkTransportadora, fkVeiculo) VALUES ('2022-06-02 02:45', '2022-06-02 15:25', '2022-06-02 15:30', 'S', 1, 3, 103);
INSERT INTO entrega (horaSaida, horaChegada, dataEntrega, aprovada, fkSensor, fkTransportadora, fkVeiculo) VALUES (null, null, '2022-06-08 18:00', 'S', 1, 1, 100);
INSERT INTO entrega (horaSaida, horaChegada, dataEntrega, aprovada, fkSensor, fkTransportadora) VALUES (null, null, '2022-06-10 10:35', 'N', 3, 4);

SELECT * FROM entrega;

UPDATE sensor SET fkTransportadora = 1 WHERE idSensor = 1;

INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1000, 1, 'Avenida Costa e Silva', 'Vila Cidade Morena', 'Campo Grande', 'MS', 55, '79072-901');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1000, 2, 'Rua Três Marias', 'Vila Marli', 'Campo Grande', 'MS', 812, '79117-420');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1001, 1, 'Rua Dezoito', 'Cidade Nova', 'Timon', 'MA', 33, '65633-644');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1001, 2, 'Rua Raimundo Inácio da Silva', 'Novo Maranguape II', 'Maranguape', 'CE', 22, '61944-810');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1002, 1, 'Avenida dos Buritis', 'Vila Maria Luiza', 'Goiânia', 'GO', 120, '74720-170');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1002, 2, 'Rua Colômbia', 'América', 'Aracaju', 'SE', 670, '49080-225');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1003, 1, 'Rua Pedro Henrique Jensen', 'Vila Xavier (Vila Xavier)', 'Araraquara', 'SP', 20, '14810-184');
INSERT INTO endereco (fkEntrega, idEndereco, endereco, bairro, cidade, uf, numero, cep) VALUES (1003, 2, 'Rua Vila Valle', 'Engenho Velho da Federação', 'Salvador', 'BA', 10, '40221-050');

SELECT * FROM endereco;

INSERT INTO lote (fkEntrega, fkMedicamento, qtd) VALUES (1000, 101, 250);
INSERT INTO lote (fkEntrega, fkMedicamento, qtd) VALUES (1001, 104, 750);
INSERT INTO lote (fkEntrega, fkMedicamento, qtd) VALUES (1002, 100, 250);
INSERT INTO lote (fkEntrega, fkMedicamento, qtd) VALUES (1002, 101, 575);
INSERT INTO lote (fkEntrega, fkMedicamento, qtd) VALUES (1003, 102, 160);

SELECT * FROM lote;

INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (32, 46.5, 500, 32, 1, 'I', 'I', '2022-05-27 04:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (31, 45.8, 500, 31, 1, 'A', 'A', '2022-05-27 05:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (28, 40.1, 500, 28, 1, 'C', 'C', '2022-05-27 06:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (29, 39.2, 500, 29, 1, 'A', 'C', '2022-05-27 07:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (27, 30.2, 500, 27, 1, 'C', 'C', '2022-05-27 08:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (26, 38.7, 500, 26, 1, 'C', 'C', '2022-05-27 09:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (28, 40.3, 500, 28, 1, 'C', 'C', '2022-05-27 10:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (34, 45.9, 500, 34, 1, 'I', 'I', '2022-05-27 11:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (38, 49.7, 500, 38, 1, 'A', 'A', '2022-05-27 12:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (42, 53.1, 500, 42, 1, 'C', 'C', '2022-05-27 13:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (46, 54.8, 500, 46, 1, 'C', 'C', '2022-05-27 14:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (49, 55.6, 500, 49, 1, 'C', 'C', '2022-05-27 15:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (52, 52.4, 500, 52, 1, 'C', 'C', '2022-05-27 16:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (54, 48.9, 500, 54, 1, 'C', 'A', '2022-05-27 17:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (49, 47.9, 500, 49, 1, 'C', 'I', '2022-05-27 18:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (43, 47.7, 500, 43, 1, 'C', 'I', '2022-05-27 19:15', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (38, 46.6, 500, 38, 1, 'A', 'I', '2022-05-27 20:00', 1000);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (35, 47.3, 500, 35, 1, 'I', 'I', '2022-05-27 20:00', 1000);

INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (24, 80, 500, 24, 1, 'I', 'I', '2022-06-02 02:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (23, 77, 500, 23, 1, 'I', 'I', '2022-06-02 03:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (22, 78, 500, 22, 1, 'I', 'I', '2022-06-02 04:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (21, 79, 500, 21, 1, 'I', 'I', '2022-06-02 05:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (23, 81, 500, 23, 1, 'I', 'I', '2022-06-02 06:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (24, 82, 500, 24, 1, 'I', 'I', '2022-06-02 07:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (25, 80, 500, 25, 1, 'I', 'I', '2022-06-02 08:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (26, 81, 500, 26, 1, 'I', 'I', '2022-06-02 09:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (26, 80, 500, 26, 1, 'I', 'I', '2022-06-02 10:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (27, 79, 500, 27, 1, 'I', 'I', '2022-06-02 11:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (25, 78, 500, 25, 1, 'I', 'I', '2022-06-02 12:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (24, 77, 500, 24, 1, 'I', 'I', '2022-06-02 13:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (24, 80, 500, 24, 1, 'I', 'I', '2022-06-02 14:45', 1001);
INSERT INTO registro (dht11temperatura, dht11umidade, ldrluminosidade, lm35temperatura, trc5000chave, situacaoTemperatura, situacaoUmidade, horario, fkEntrega) VALUES (24, 81, 500, 24, 1, 'I', 'I', '2022-06-02 15:25', 1001);

SELECT * FROM registro;


