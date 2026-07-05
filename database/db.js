import sqlite3 from "sqlite3";
function conectar(callback) {
    const db = new sqlite3.Database("./database/produtos.db");
    db.run(`CREATE TABLE IF NOT EXISTS produtos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT NOT NULL,
        preco REAL NOT NULL,
        imagem TEXT NOT NULL
    )`, function (erro) {
        if (erro) {
            console.log("Erro ao criar tabela produtos:", erro);
        } else {
            db.run(`CREATE TABLE IF NOT EXISTS usuarios(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL
            )`, function (erro) {
                if (erro) {
                    console.log("Erro ao criar tabela usuarios:", erro);
                } else {
                    callback(db);
                }
            });
        }
    });
}
export default conectar;