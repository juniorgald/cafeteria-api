import express from "express";
import conectar from "./database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const porta = 3000;
const CHAVE_SECRET = "cafeteria_secret";

function verificarToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    jwt.verify(token, CHAVE_SECRET, function (erro, dados) {
        if (erro) {
            res.status(401).json({ message: "Token inválido" });
        } else {
            req.usuario = dados;
            next();
        }
    });
}

app.use(express.json());

app.use(express.static("public"));

conectar(function (db) {
    app.get("/api/produtos/:id", (req, res) => {
        const id = req.params.id;

        db.get("SELECT * FROM produtos WHERE id = ?", [id], function (erro, produto) {
            if (produto == undefined) {
                res.status(404).json({ message: "produto não encontrado" })
            } else {
                res.status(200).json(produto);
            }
        });

    })

    app.get("/api/produtos", (req, res) => {
        db.all("SELECT * FROM produtos", [], function (erro, produtos) {
            res.status(200).json(produtos);
        });
    })


    app.delete("/api/produtos/:id", verificarToken, (req, res) => {
        const id = req.params.id;

        db.run("DELETE FROM produtos WHERE id = ?", [id], function (erro) {
            if (this.changes === 0) {
                res.status(404).json({ message: "produto não encontrado" })
            }

            else {
                res.status(200).json({ message: "produto deletado" });
            }
        });

    });

    app.post("/api/produtos", verificarToken, (req, res) => {
        const novoProduto = req.body;
        db.run("INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?,?,?,?)", [novoProduto.nome, novoProduto.descricao, novoProduto.preco, novoProduto.imagem], function (erro) {
            if (erro) {
                res.status(500).json({ message: "Erro ao cadastrar" });
            } else {
                res.status(201).json({ id: this.lastID, ...novoProduto });
            }
        })

    });

    app.put("/api/produtos/:id", verificarToken, (req, res) => {

        const id = req.params.id;
        const { nome, descricao, preco, imagem } = req.body;

        db.run("UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?", [nome, descricao, preco, imagem, id], function (erro) {
            if (this.changes === 0) {
                res.status(404).json({ message: "Produto não encontrado" })
            } else {
                res.status(200).json({ id, nome, descricao, preco, imagem });
            }
        });
    })


    app.post("/api/login", (req, res) => {
        const { nome, senha } = req.body;
        db.get("SELECT * FROM usuarios WHERE nome = ?", [nome], function (erro, usuario) {
            if (usuario == undefined) {
                res.status(401).json({ message: "Usuário não encontrado" });
            } else {
                bcrypt.compare(senha, usuario.senha, function (erro, resultado) {
                    if (resultado) {
                        const token = jwt.sign({ id: usuario.id }, CHAVE_SECRET, { expiresIn: "1h" });
                        res.status(200).json({ token });
                    } else {
                        res.status(401).json({ message: "Senha incorreta" });
                    }
                });
            }
        });
    });

    app.listen(porta, () => {
        console.log(`Servidor rodando na porta ${porta}`);
    });

});








