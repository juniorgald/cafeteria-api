import express from "express";

const app = express();
const porta = 3000;

app.use(express.json());

app.use(express.static("public"));


const produtos = [
  { id: 1, nome: "Expresso Tradicional", descricao: "Extração perfeita de grãos selecionados, com crema espessa e notas de caramelo.", preco: 7.00, imagem: "images/10eaa00b1b9efa172ff0baed6a04e0bdbf6cf204.png" },
  { id: 2, nome: "Cappuccino Cremoso", descricao: "Dose de expresso, leite vaporizado e um toque aveludado de cacau em pó.", preco: 12.00, imagem: "images/2a0818d76b515ea968f450b5dc0e2685075d526f.png" },
  { id: 3, nome: "Café Coado (V60)", descricao: "Método que ressalta as notas florais e frutadas do grão. Bebida limpa e suave.", preco: 14.00, imagem: "images/ea29219df9b4fdd909c7834e2c9cb11e2f3ac9f5.png" },
  { id: 4, nome: "Iced Latte (Gelado)", descricao: "Expresso duplo com leite frio e cubos de gelo. Refrescante e intenso.", preco: 16.00, imagem: "images/8361359334aefd32c6f0c244da43f8f0be79f531.png" },
  { id: 5, nome: "Croissant Queijo do Reino", descricao: "Massa folhada francesa e amanteigada, recheada com o tradicional queijo do reino.", preco: 18.00, imagem: "images/7091ec116ebda8bd9a1559f59e6ed96e7783733c.png" },
  { id: 6, nome: "Quiche de Alho Poró", descricao: "Torta salgada de massa leve, com recheio super cremoso e tostada no ponto certo.", preco: 15.00, imagem: "images/d97dce6f15b1ecc084d0829228591851a5f59ce8.png" },
  { id: 7, nome: "Pão de Queijo Recheado", descricao: "Nosso pão de queijo quentinho com generosa camada de requeijão artesanal.", preco: 10.00, imagem: "images/6d55471379fa7e77de58cc9199158578accac2a0.png" },
  { id: 8, nome: "Empada Sertaneja", descricao: "Massa que derrete na boca com recheio suculento de charque e catupiry.", preco: 12.00, imagem: "images/2a0818d76b515ea968f450b5dc0e2685075d526f.png" },
  { id: 9, nome: "Sobremesa Dois Mundos", descricao: "A estrela do festival! União de texturas cremosas e crocantes com chocolate.", preco: 22.00, imagem: "images/acdb015e57503c1f2f5aec0406288aea81180c18.png" },
];

app.get("/api/produtos/:id", (req, res) => {
    const id = req.params.id;

    const produto = produtos.find(f => f.id == id);

    if (produto == undefined){
        res.status(404).json({message: "produto não encontrado"})
    }else{
        res.status(200).json(produto);        
    }
    
})

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})



app.get("/api/produtos", (req, res) => {
    res.status(200).json(produtos);
})







