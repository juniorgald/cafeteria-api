const token = localStorage.getItem("token");
const btnSair = document.getElementById("btn-sair");
const btnNovo = document.getElementById("btn-novo");
const listaAdmin = document.getElementById("lista-admin");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("btn-fechar");
const formProduto = document.getElementById("form-produto");
const modalTitulo = document.getElementById("modal-titulo");
const produtoId = document.getElementById("produto-id");

if (!token) {
    window.location.href = "login.html";
}

async function carregarProdutos() {
    const resposta = await fetch("/api/produtos");
    const produtos = await resposta.json();
    listaAdmin.innerHTML = "";

    produtos.forEach(function(produto) {
        listaAdmin.innerHTML += `
            <div class="produto-item">
                <img class="produto-item-img" src="${produto.imagem}" alt="${produto.nome}">
                <div class="produto-item-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                </div>
                <span class="produto-item-preco">R$ ${produto.preco.toFixed(2)}</span>
                <div class="produto-item-botoes">
                    <button class="btn-editar" onclick="editarProduto(${produto.id}, '${produto.nome.replace(/'/g, "\\'")}', '${produto.descricao.replace(/'/g, "\\'")}', ${produto.preco}, '${produto.imagem}')">Editar</button>
                    <button class="btn-deletar" onclick="deletarProduto(${produto.id})">Deletar</button>
                </div>
            </div>
        `;
    });
}

btnSair.addEventListener("click", function() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

btnNovo.addEventListener("click", function() {
    modalTitulo.textContent = "Novo Produto";
    formProduto.reset();
    produtoId.value = "";
    modal.style.display = "flex";
});

btnFechar.addEventListener("click", function() {
    modal.style.display = "none";
});

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

formProduto.addEventListener("submit", async function(e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("produto-nome").value,
        descricao: document.getElementById("produto-descricao").value,
        preco: parseFloat(document.getElementById("produto-preco").value),
        imagem: document.getElementById("produto-imagem").value
    };

    const id = produtoId.value;
    let resposta;

    if (id) {
        resposta = await fetch("/api/produtos/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify(dados)
        });
    } else {
        resposta = await fetch("/api/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify(dados)
        });
    }

    if (resposta.ok) {
        modal.style.display = "none";
        carregarProdutos();
    }
});

function editarProduto(id, nome, descricao, preco, imagem) {
    modalTitulo.textContent = "Editar Produto";
    produtoId.value = id;
    document.getElementById("produto-nome").value = nome;
    document.getElementById("produto-descricao").value = descricao;
    document.getElementById("produto-preco").value = preco;
    document.getElementById("produto-imagem").value = imagem;
    modal.style.display = "flex";
}

async function deletarProduto(id) {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
        await fetch("/api/produtos/" + id, {
            method: "DELETE",
            headers: { "Authorization": token }
        });
        carregarProdutos();
    }
}

carregarProdutos();