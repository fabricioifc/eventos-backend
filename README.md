# Aplicação Web para Eventos

Esta aplicação web foi criada com o objetivo didático de ensinar a criar uma aplicação web com Node.js, Express e SQLite.

## Requisitos

- Node.js
- NPM
- SQLite
- VSCode
- Insomnia ou Postman
- Git

## Instruções para Criação do Projeto

1. Criar o diretório do projeto
2. Inicializar o projeto com `npm init -y`
4. Instalar o Express com `npm install express`
5. Instalar as outras dependências: `npm install sqlite3 bcryptjs bcryptjs body-parser cors jsonwebtoken dotenv express-validation helmet morgan nodemailer sequelize`
6. Instalar o Nodemon como dependência de desenvolvimento: `npm install nodemon -D`
7. Adicionar os scripts no `package.json`:
```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```
8. Criar o arquivo `.gitignore`
9. Criar o arquivo `.env`

## Variáveis de Ambiente

```env
PORT=5000
DB_NAME=event_db.sqlite
DB_DIALECT=sqlite
JWT_SECRET=your_jwt_secret
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS="xxxx xxxx xxxx xxxx"
CORS_ORIGIN=http://localhost:5500 http://localhost:5501
CLIENT_URL=http://localhost:5000/api/auth
```

## Ignorando arquivos no Git

Adicione o seguinte conteúdo no arquivo `.gitignore`:

```git
node_modules
.env
```

