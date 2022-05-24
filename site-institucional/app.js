process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3333;

var app = express();

var indexRouter = require("./src/routes/index");
var transportadorasRouter = require('./src/routes/transportadoras');
var farmaceuticasRouter = require('./src/routes/farmaceuticas');
var usuariosRouter = require('./src/routes/usuarios');
var medicamentosRouter = require('./src/routes/medicamentos');
var sensoresRouter = require('./src/routes/sensores');
var veiculosRouter = require('./src/routes/veiculos');
var entregasRouter = require('./src/routes/entregas');
var registroRouter = require("./src/routes/registro");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use('/transportadoras', transportadorasRouter);
app.use('/farmaceuticas', farmaceuticasRouter);
app.use('/usuarios', usuariosRouter);
app.use('/medicamentos', medicamentosRouter);
app.use('/sensores', sensoresRouter);
app.use('/veiculos', veiculosRouter);
app.use('/entregas', entregasRouter);
app.use('/registro', registroRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
