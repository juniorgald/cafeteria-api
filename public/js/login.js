const formLogin = document.getElementById("form-login");
const erroLogin = document.getElementById("erro-login");

if (localStorage.getItem("token")) {
    window.location.href = "dashboard.html";
}

formLogin.addEventListener("submit", async function(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    const resposta = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
        localStorage.setItem("token", dados.token);
        window.location.href = "dashboard.html";
    } else {
        erroLogin.textContent = dados.message;
    }
});