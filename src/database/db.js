// importar a dependência do mariadb
const sqlite3= require("sqlite3").verbose()

// criar o objeto do banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados

// db.serialize(() => {
// //     //criar uma tabela
// //     db.run(`
// //         CREATE table if not exists places (
// //             id INTEGER primary key autoincrement,
// //             nome text,
// //             image text,
// //             address text,
// //             address2 text,
// //             state text,
// //             city text,
// //             items text
// //         );
// //     `)

// //     const query = `INSERT into places (nome, image, address, address2, state, city, items) values (?,?,?,?,?,?,?);`
// //     const values = [
// //         "Papersider",
// //         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
// //         "Guilherme Gamballa, Jardim América",
// //         "número 260",
// //         "Santa Catarina",
// //         "Rio do sul",
// //         "Papeis e Papelão"
// //     ]

// //     function afterInsertData(err){
// //         if(err){
// //             return console.log(err)
// //         }
// //         console.log("Cadastrado com sucesso!")
// //         console.log(this)
// //     }

//     //db.run(query, values, afterInsertData)

//     // db.all(`SELECT * from places`, function(err, rows){
//     //     if(err){
//     //         return console.log("err")
//     //     }
//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })
    
//     // db.run(`drop table  places`)

//     //Deletar um dado da tabela
//     // db.run(`DELETE from places where id = ?`, [4], function(err){
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Registro apagado com sucesso!")
//     // })
// })