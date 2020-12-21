const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('./models/home');
const Home = mongoose.model('Home');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Headers", 'x-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
})

mongoose.connect('mongodb://localhost/orquidias',{      useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
    console.log('conecçao com mongo');
}).catch((erro) => {
    console.log('error')+ erro;
});

//const Home ='mongodb+srv://carlosUYK:RepolhoPodre@cluster0.s94fn.mongodb.net/floricultura?retryWrites=true&w=majority'


app.get("/home", (req, res) => {
    Home.findOne({}).then((home) => {
        return res.json(home);
    }).catch((err) => {
        return res.status(400).json({
        error: true,
        message: " nenhun registro antonio carlos wronski voce falhou"
    })
    
    });
});

app.post("/home", (req, res) => {
    Home.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Conteudo da pagina nao cadastrado"
        })
    })
    return res.json({
        error: false,
        message: "Cadastro com sucssso"
    })
});


app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});