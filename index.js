const express = require('express'); // importa o expres

const app = express() // cria a aplicação usando o expres/executa o express (biblioteca) (copia q eu vou alterar)

app.get('/teste', (req, res) =>{  //criei minha api ,  teste é a rota
    res.send("Minha primeira Api") // envia uma resposta pra quem acessou a rota
})

app.listen(3003, ()=>{  // inicia o servidor 
    console.log("Servidor ligado") // serve para saber que o servidor inicou corretamente
})