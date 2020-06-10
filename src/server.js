const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do rew.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true    //para não deixar arquivos velhos no sistema
})


// configurar caminhos da minha aplicação
//página inicial
//req é uma requisição
// res é uma resposta
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu marketplace de coleta de resíduos"})  //colocamos uma variável no index e alteramos por aqui.
})
server.get("/create-point", (req, res) => {
    //req.query: query strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body: o corpo do nosso formulário
    //console.log(req.body)

    // inserir dados no banco
    const query = `INSERT into places (nome, image, address, address2, state, city, items) values (?,?,?,?,?,?,?);`
    const values = [
        req.body.nome,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search-results", (req, res) => {
    const search = req.query.search
    if (search == ""){
        return res.render("search-results.html", {total: 0})
    }

    // pegar os dados do banco
    db.all(`SELECT * from places where city like '%${search}%'`, function(err, rows){
        if(err){
            return console.log("err")
        }
        const total = rows.length
        // mostrar a página html com os dados do banco
        return res.render("search-results.html", {places: rows, total})
    })
})
// ligar o servidor
server.listen(3000)