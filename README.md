# primeiro_node
Repositorio para acampanhamento das aulas de microsserviço

# obs - execução de scripts
Abrir o powershell como administrador
Rodar o comando: 'Set-ExecutionPolicy RemoteSigned'
confirmar com 'S'

# O que precisamos instalar
Antes de tudo, voce precisa ter instalado na sua maquina:

Node.js
npm

# Para conferir se esta tudo certo, rode no terminal:

node -v
npm -v

Se os dois comandos retornarem uma versao, o ambiente esta pronto.

# Passo 1: iniciar o projeto Node
Na raiz do projeto, rode:

npm init -y

Esse comando cria o arquivo package.json, que guarda as informacoes do projeto e as dependencias.

# Passo 2: instalar o Express
Depois, instale o Express:

npm install express

O 'express' sera o framework principal da nossa API REST.

## rodar versão inicial
- criar index.js e adicionar o código
- no terminal rodar o comando: node index.js
- no navegador: 'http://localhost:PORTA/ROTA'


## rodar a segunda vez
no terminal:

npm i

## automação para ligar o server
no terminal:

npm start

## Passo 3: instalar o restante das dependências
instale o nodemon:

npm install -D nodemon

O nodemon reinicia o servidor automaticamente sempre que um arquivo for salvo.

Para conectar a API ao MongoDB Atlas, instale o mongoose

npm install mongoose

O mongoose sera usado para conectar ao banco e buscar os documentos da colecao.