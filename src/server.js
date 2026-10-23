const express = require('express');
const connectDatabase = require('./config/database')
const Aluno = require ('./models/Aluno');

const app = express();
const PORT = 3003;

app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Bem Vindo!!")
})

// GET: busca e retorna todos os alunos cadastrados.
app.get('/aluno', async (req, res) =>{
    try{
        const aluno = await Aluno.find();  // Busca todos os alunos no MongoDB.
        res.status(200).json(aluno) // Retorna os alunos com status 200 (sucesso).
    }
    // Executa se ocorrer um erro durante a consulta.
    catch(error){
        res.status(500).json({
            mensagem: 'Deu erro!!',
            erro: error.message
        })
    }
})

// GET POR ID: busca um aluno específico pelo ID informado na URL.
app.get('/aluno/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
         // findById busca o aluno pelo ID; req.params.id obtém o ID da URL.
        if (!aluno) { // Verifica se nenhum aluno foi encontrado.
            return res.status(404).json({ 
                mensagem: 'Aluno não encontrado!'  // Status 404: recurso não encontrado.
            });
        }

        res.status(200).json(aluno); // Retorna os dados do aluno encontrado.

    } catch (error) {
        // Trata erros, como um ID em formato inválido.
        res.status(500).json({
            mensagem: 'Erro ao buscar aluno.',
            erro: error.message
        });
    }
})

// POST: cadastra um novo aluno.
app.post('/addAluno', async  (req, res)=>{
    try{
        const {nome, curso} = req.body;
        // Obtém nome e curso enviados no corpo da requisição.

        if(!nome || !curso){ // Verifica se os campos obrigatórios foram informados.
            return res.status(400).json({
                mensagem: 'os campos nome e curso são obrigatórios',
                // Status 400: dados obrigatórios ausentes ou inválidos.
            })  
        }

        const novoAluno = await Aluno.create({nome, curso})
         // Cria e salva o novo aluno no MongoDB.
        res.status(201).json(novoAluno)
    }catch (error){
        // Trata erros que ocorram durante o cadastro.
        res.status(500).json({
            mensagem: 'Erro ao cadastrar pessoa.',
            erro: error.message,
          });
    }
})

// PUT: atualiza os dados de um aluno identificado pelo ID.
app.put('/aluno/:id', async (req, res) => {
    try {
        const { nome, curso } = req.body;
        // Obtém os novos valores enviados na requisição.

        const alunoAtualizado = await Aluno.findByIdAndUpdate(
            req.params.id, // Identifica o aluno pelo ID da URL.
            { nome, curso }, // Define os valores que serão atualizados.
            { new: true, runValidators: true }
            // new: true retorna os dados atualizados.
            // runValidators: true executa as validações do modelo.
        );

        if (!alunoAtualizado) { //Verifica se o aluno existe.
            return res.status(404).json({
                mensagem: 'Aluno não encontrado!'
            });
        }

        res.status(200).json(alunoAtualizado);
        // Retorna o aluno atualizado com status 200 (sucesso).
    } catch (error) {
        // Trata erros durante a atualização.
        res.status(500).json({
            mensagem: 'Erro ao atualizar aluno.',
            erro: error.message
        });
    }
})

// DELETE: exclui um aluno identificado pelo ID.
app.delete('/aluno/:id', async (req, res) => {
    try {
        const alunoExcluido = await Aluno.findByIdAndDelete(
            req.params.id // Localiza o aluno pelo ID e o exclui.
        );

        if (!alunoExcluido) { // Verifica se o aluno não foi encontrado.
            return res.status(404).json({
                mensagem: 'Aluno não encontrado!'
            });
        }

        res.status(200).json({
            mensagem: 'Aluno excluído com sucesso!',
            aluno: alunoExcluido // Retorna os dados do aluno excluído.
        });

    } catch (error) {
        // Trata erros durante a exclusão.
        res.status(500).json({
            mensagem: 'Erro ao excluir aluno.',
            erro: error.message
        });
    }
})

// FUNÇÃO PARA INICIAR O SERVIDOR.
async function startServer(){
    try{
        await connectDatabase();
        app.listen(PORT, ()=>{
            console.log(`Servidor rodando em http://localhost:${PORT}`)
        })
    }
    catch(error){
        console.error('Não foi possivel iniciar a aplicação.', error.message);
    }
}

startServer();

