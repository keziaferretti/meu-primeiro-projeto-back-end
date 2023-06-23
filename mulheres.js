const express = require("express")
const router = express.Router()
const cors = require('cors') // cors permite consumir a api no front end

const conectaBancoDeDados = require('./bancoDeDados') //ligando o banco de dados, ao arquivo bdd
conectaBancoDeDados() //chamando a função que conecta o bdd

const Mulher = require('./mulherModel')

const app = express()
app.use(express.json())
app.use(cors())

const porta = 3333;

//GET
async function mostraMulheres(request, response){
    try {
        const mulheresVindasDoBandoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBandoDeDados)
    } catch (erro){
        console.log(erro)
    }
}

//Post
async function criaMulher(request,response) {
    const novaMulher = new Mulher ({
        nome    : request.body.nome,
        imagem  : request.body.imagem,
        minibio : request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro){
        console.log(erro)
    }

}

//Patch
async function corrigiMulher(request, response){

    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }

        if(request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }
        
        const mulherAtualizadaNoBandoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBandoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//Delete
async function deletaMulher(request,response){

    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Mulher deletada com sucesso!'})
    } catch(erro){
        console.log(erro)
    }
}

//Porta
function mostraPorta(){
    console.log('Servidor criado e rodando na porta ' + porta)
}

//Rotas
app.use(router.get("/mulheres", mostraMulheres)) // Get
app.use(router.post("/mulheres", criaMulher)) //  POST
app.use(router.patch("/mulheres/:id", corrigiMulher)) //Patch
app.use(router.delete('/mulheres/:id', deletaMulher)) //Delete

app.listen(porta, mostraPorta)