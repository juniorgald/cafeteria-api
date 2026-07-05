import conectar from "./db.js";
import bcrypt from "bcryptjs";

conectar(async function (db) {
    const senhaCriptografada = await bcrypt.hash("cafe123", 10);

    db.run("INSERT INTO usuarios (nome, senha) VALUES (?, ?)",
        ["admin", senhaCriptografada],
        function (erro) {
            if (erro) {
                console.log("Erro:", erro);
            } else {
                console.log("Usuário criado!");
            }
        }
    );
})