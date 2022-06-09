const atividades = require("../models/atividades")

module.exports = (app) => {
    app.post('/atividades', async (req, res) => {
        var dados = req.body
        //return console.log(dados)
        //Conct Mongo
        const database = require("../config/database")()
        //importar o model atividades
        const atividades = require("../models/atividades")
        //gravar as informaçoes no formulario database
        var gravar = await new atividades({
            data: dados.data,
            tipo: dados.tipo,
            entrega: dados.entrega,
            diciplina: dados.diciplina,
            intrucoes: dados.orientacoes,
            usuario: dados.id,
            titulo: dados.titulo
        }).save()
        //recarregar a pagina atividades
        res.redirect('/atividades?id=' + dados.id)
    })
    app.get('/atividades', async (req, res) => {
        //listar todas as atividades d usuario logado
        var user = req.query.id
        if (!user) {
            res.redirect("/login")
        }
        var usuario = require('../models/usuarios')
        var atividades = require('../models/atividades')

        var dadosUser = await usuario.findOne({ _id: user })
        var dadosAtividades = await atividades.find({ usuario: user })

        res.render('atividades.ejs', {
            nome: dadosUser.nome,
            id: dadosUser._id,
            lista: dadosAtividades
        })
    })

    app.get('/excluir', async (req, res) => {
        //qual ò documento será excluido da collection atividades?
        var doc = req.query.id
        //excluir  documento
        var excluir = await atividades.findOneAndDelete({
            _id: doc
        })
        //voltar para a atividades
        res.redirect('/atividades?id=' + excluir.usuario)
    })
}