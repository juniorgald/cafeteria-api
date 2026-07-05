async function carregarProdutos() {
    const resposta = await fetch("/api/produtos");
    const produtos = await resposta.json();
    const corpo = document.getElementById("lista-produtos");

    produtos.forEach(function(produto) {
        corpo.innerHTML += `
        <div class="menu-card">
            <div class="card-image">
                <img src="${produto.imagem}">
            </div>
            <div class="card-content">
                <h3>${produto.nome}</h3>
                <p class="description">${produto.descricao}</p>
                <div class="divider"></div>
                <p class="price">R$ ${produto.preco.toFixed(2)}</p>
            </div>
        </div>
        `;
    });

    const footer = document.querySelector(".cardapio-footer");
    const footerTop = corpo.offsetTop + corpo.offsetHeight + 60;
    footer.style.top = footerTop + "px";

    const container = document.querySelector(".cardapio-container");
    container.style.minHeight = (footerTop + 380) + "px";
}

carregarProdutos();