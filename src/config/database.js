const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://yasminbeserra272_db_user:sTSTryo97xeVpURx@cluster0.q4jim5k.mongodb.net/?appName=Cluster0'

async function connectDatabase(){
    await mongoose.connect(MONGO_URL, {dbName:'alunos'});
    console.log('MongoDB conectado com sucesso');
}

module.exports = connectDatabase;