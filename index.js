const express = require('express'); // chamei o expres

const app = express() //executa o express (biblioteca) (copia q eu vou alterar)

app.get('/teste', (req, res) =>{  //criei minha api ,  teste é a rota
    res.send("Minha primeira Api")
})

app.listen(3003, ()=>{   
    console.log("Servidor ligado")
})