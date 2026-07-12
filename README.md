# Área Cafeteria

Cardápio digital de cafeteria com painel administrativo completo.

## Sobre o projeto

Este projeto foi desenvolvido como parte da disciplina de Programação para Internet 1 do IFPE Campus Garanhuns, com o objetivo de aprender na prática todo o processo de desenvolvimento web, desde o design visual até a implementação do backend com banco de dados.

Todo o código foi escrito à mão, sem frameworks de frontend, para garantir o aprendizado completo dos conceitos fundamentais da web: HTML, CSS, JavaScript, protocolo HTTP, APIs REST e persistência de dados.

**Alunos:** Cícero Galdino Januário de Araújo Júnior
**Professor:** Luís Eduardo Tenório Silva

## Design

O protótipo visual foi criado no Figma antes de começar a codificação:

https://www.figma.com/design/7DPqXhR8rwQpwzFrnZckeM/%C3%81rea?node-id=0-1

A identidade visual usa verde escuro, amarelo dourado e creme como cores principais, com as fontes Young Serif para títulos e Inter para textos.

## Funcionalidades

- **Cardápio dinâmico:** A página do cardápio busca os produtos diretamente da API e renderiza os cards na tela usando JavaScript vanilla. Quando um produto é cadastrado ou removido pelo painel, ele aparece ou some automaticamente no cardápio.

- **Painel administrativo:** Uma página separada onde o administrador pode cadastrar, editar e deletar produtos. O acesso é protegido por login com autenticação JWT.

- **Autenticação segura:** As senhas são criptografadas com bcryptjs antes de serem salvas no banco. O login gera um token JWT que autoriza o acesso às rotas protegidas.

- **Banco de dados persistente:** Os produtos e usuários são salvos em SQLite, um banco leve que armazena tudo num único arquivo. Os dados persistem mesmo após reiniciar o servidor.

## Tecnologias utilizadas

- **Frontend:** HTML5, CSS3, JavaScript Vanilla (sem frameworks)
- **Backend:** Node.js com Express
- **Banco de dados:** SQLite
- **Autenticação:** bcryptjs (criptografia de senhas) e jsonwebtoken (tokens JWT)
- **Design:** Figma

## Estrutura do projeto

```
cafeteria-api/
├── database/
│   ├── db.js              # Conexão com o banco e criação das tabelas
│   ├── seed.js            # Dados iniciais dos 9 produtos
│   └── seedUsuarios.js    # Criação do usuário administrador
├── public/
│   ├── css/               # Estilos das páginas
│   ├── js/                # Scripts de cada página
│   ├── images/            # Imagens dos produtos
│   ├── index.html         # Página inicial
│   ├── cardapio.html      # Cardápio do cliente
│   ├── login.html         # Tela de login do admin
│   └── dashboard.html     # Painel administrativo
├── index.js               # Servidor Express com todas as rotas da API
├── package.json           # Dependências do projeto
└── README.md
```

## Como rodar

1. Clone o repositório ou extraia o arquivo zip

2. Instale as dependências:
```bash
npm install
```

3. Popule o banco de dados com os produtos iniciais:
```bash
node database/seed.js
```

4. Crie o usuário administrador:
```bash
node database/seedUsuarios.js
```

5. Inicie o servidor:
```bash
npm run dev
```

6. Acesse no navegador:
- Cardápio: http://localhost:3000/cardapio.html
- Login admin: http://localhost:3000/login.html

## Credenciais de login

- **Usuário:** admin
- **Senha:** cafe123

## Rotas da API

- **GET /api/produtos** — Retorna todos os produtos cadastrados
- **GET /api/produtos/:id** — Retorna um produto específico pelo id
- **POST /api/produtos** — Cadastra um novo produto (requer token)
- **PUT /api/produtos/:id** — Atualiza um produto existente (requer token)
- **DELETE /api/produtos/:id** — Remove um produto (requer token)
- **POST /api/login** — Realiza login e retorna um token JWT

As rotas POST, PUT e DELETE são protegidas por um middleware que verifica a validade do token JWT antes de permitir o acesso.

## Conceitos aprendidos

- Comunicação cliente-servidor via protocolo HTTP
- API REST com verbos GET, POST, PUT e DELETE
- Manipulação do DOM com JavaScript vanilla
- Fetch API para requisições assíncronas
- Banco de dados relacional com SQLite e queries SQL
- Autenticação com JWT e criptografia de senhas com bcryptjs
- Middlewares no Express para controle de acesso
- Organização de código em módulos separados
