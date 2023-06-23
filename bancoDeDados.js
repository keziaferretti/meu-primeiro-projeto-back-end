const mongoose = require('mongoose')
require('dotenv').config()

//js assincrono 
async function conectaBancoDeDados(){
    try {
        console.log('Conexão com o banco de dados iniciou!')

        //não para de atender os demais, esta funcionando essa e as demais 
        await mongoose.connect(process.env.MONGO_URL)
        
        console.log('Conexão com o banco de dados feita com sucesso!')
    } catch(erro){
        console.log(erro)
    }

}

module.exports = conectaBancoDeDados