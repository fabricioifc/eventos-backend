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
2. Inicializar o projeto`npm init -y`
4. Instalar o Express com `npm install express`
5. Instalar as outras dependências: `npm install sqlite3 bcryptjs bcryptjs body-parser cors jsonwebtoken dotenv express-validation helmet morgan nodemailer sequelize`
6. Instalar o Nodemon como dependência de desenvolvimento: `npm install nodemon -D`
7. Adicionar os scripts no `package.json`:
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```
8. Criar o arquivo `.gitignore`
9. Criar o arquivo `.env`
10. Crie a pasta `src`

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
*.sqlite3
```

## Inicializando o Banco de Dados

Crie o arquivo .sequelizerc com o seguinte conteúdo:

```js
const path = require('path');

module.exports = {
  config: path.resolve('src', 'config', 'config.json'),
  modelsPath: path.resolve('src', 'models'),
  seedersPath: path.resolve('src', 'seeders'),
  migrationsPath: path.resolve('src', 'migrations')
};
```

Inicialize o Sequelize com o comando:

```bash
npx sequelize-cli init
```

Altere o arquivo `src/config/config.json`, conforme o exemplo abaixo:
  
  ```json
  {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./dev.sqlite3"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./prod.sqlite3"
  }
}
```

Crie as tabelas, também conhecidas como modelos, com os comandos:

```bash
# Criar o modelo User
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
# Criar o modelo Event
npx sequelize-cli model:generate --name Event --attributes title:string,date:date,startTime:time,endTime:time,capacity:number,status:boolean
# Criar o modelo Participant
npx sequelize-cli model:generate --name Participant --attributes userId:integer,eventId:integer
# Criar o modelo Todo
npx sequelize-cli model:generate --name Todo --attributes title:string,description:string,status:boolean
```
Faça algumas mudanças nos arquivos gerados:

- `src/migrations/xxxx-create-user.js`:
```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
```

- `src/migrations/xxxx-create-event.js`:
```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Pode ser ajustado conforme a lógica do seu aplicativo
        references: {
          model: 'users', // Nome da tabela referenciada
          key: 'id', // Chave primária na tabela referenciada
        },
        onUpdate: 'CASCADE', // Atualiza se o User for atualizado
        onDelete: 'CASCADE', // Remove os Participantes se o User for removido
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Pode ser ajustado conforme a lógica do seu aplicativo
        references: {
          model: 'events', // Nome da tabela referenciada
          key: 'id', // Chave primária na tabela referenciada
        },
        onUpdate: 'CASCADE', // Atualiza se o Event for atualizado
        onDelete: 'CASCADE', // Remove os Participantes se o Event for removido
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participants');
  }
};
```

- `src/migrations/xxxx-create-participant.js`:
```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nome da tabela referenciada
          key: 'id', // Chave primária na tabela referenciada
        },
        onUpdate: 'CASCADE', // Atualiza se o User for atualizado
        onDelete: 'CASCADE', // Remove os Participantes se o User for removido
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events', // Nome da tabela referenciada
          key: 'id', // Chave primária na tabela referenciada
        },
        onUpdate: 'CASCADE', // Atualiza se o Event for atualizado
        onDelete: 'CASCADE', // Remove os Participantes se o Event for removido
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participants');
  }
};
```

Com as migrations prontas, execute o comando a seguir para criar as tabelas no banco de dados:

```bash
npx sequelize-cli db:migrate
```

Com isso, as tabelas `Users`, `Events` e `Participants` serão criadas no banco de dados e também os arquivos `src/models/user.js`, `src/models/event.js` e `src/models/participant.js`. Essas classes são os modelos que representam as tabelas no banco de dados e podem ser modificadas conforme a necessidade do projeto.

> **Observação:** Perceba que foi criado um arquivo `dev.sqlite3` na raiz do projeto. Esse arquivo é o banco de dados SQLite que será utilizado para armazenar os dados da aplicação.

## Inicializando o Servidor

Altere o arquivo `server.js` com o seguinte conteúdo:

```js
const express = require('express');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

Crie o arquivo `src/app.js` com o seguinte conteúdo:

```js
// app.js
require('dotenv').config();
const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send('Server is running on port 5000');
});

module.exports = app;
```

## Testando a Aplicação (modo desenvolvimento)

Para testar a aplicação, execute o comando:

```bash
npm run dev
```

Abra o navegador e acesse o endereço `http://localhost:5000`. Se tudo estiver correto, você verá a mensagem `Olá, Mundo!`.

## `Configurando o Sequelize`


Crie o arquivo `src/config/database.js` com o seguinte conteúdo:

> **Observação:** O arquivo `database.js` é responsável por configurar a conexão com o banco de dados SQLite. 

```js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_NAME,
});

module.exports = sequelize;
```

## Configurando os Middlewares básiicos

No arquivo `src/app.js`, modifique conforme o exemplo abaixo:

```js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
};

// Middlewares
app.use(cors(corsOptions)); // Para que possa ter acesso a API de qualquer lugar
app.use(helmet()); // Para que possa ter mais segurança
app.use(morgan('dev')); // Para que possa ver os logs no console
app.use(bodyParser.json()); // Para que possa receber dados em JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para que possa receber dados de formulários HTML

module.exports = app;
```

Cada middleware tem uma função específica:

- `cors`: Permite que a API seja acessada de qualquer lugar. No entanto, é possível configurar para que a API seja acessada apenas de determinados domínios.
- `helmet`: Adiciona camadas de segurança à aplicação. 
- `morgan`: Exibe os logs no console.
- `bodyParser.json()`: Permite que a aplicação receba dados em formato JSON.
- `bodyParser.urlencoded({ extended: true })`: Permite que a aplicação receba dados de formulários HTML.

## Configurando os Repositórios

 - É uma camada adicional usada para abstrair o acesso ao banco de dados. 
 - Fornece métodos para operações CRUD (Create, Read, Update, Delete) e encapsula a lógica de acesso aos dados.
 - Ajuda a desacoplar o código de persistência dos modelos, facilitando testes e manutenção.

Crie a pasta `src/repositories` e o arquivo `src/repositories/todoRepository.js`.

```bash
mkdir src/repositories && touch src/repositories/todoRepository.js
```

Conteúdo do arquivo `src/repositories/todoRepository.js`:

```js
const { Todo } = require('../models');

class TodoRepository {
    async create(todo) {
        return await Todo.create(todo);
    }

    async findAll() {
        return await Todo.findAll();
    }

    async findById(id) {
        return await Todo.findByPk(id);
    }

    async update(id, todo) {
        return await Todo.update(todo, {
            where: { id },
        });
    }

    async delete(id) {
        return await Todo.destroy({
            where: { id },
        });
    }
}

module.exports = new TodoRepository();
```

## Configurando os Services

Os serviços contém a lógica de negócio da aplicação. Deve ser utilizado para organizar e encapsular funcionalidades específicas, como validação de dados, envio de e-mails, integração com APIs externas, etc.

Crie a pasta `src/services` e o arquivo `src/services/todoService.js`.

```bash
mkdir src/services && touch src/services/todoService.js
```

Conteúdo do arquivo `src/services/todoService.js`:

```js
const TodoRepository = require('../repositories/todoRepository');

class TodoService {
    async create(todo) {
        return await TodoRepository.create(todo);
    }

    async findAll() {
        return await TodoRepository.findAll();
    }

    async findById(id) {
        return await TodoRepository.findById(id);
    }

    async update(id, todo) {
        return await TodoRepository.update(id, todo);
    }

    async delete(id) {
        return await TodoRepository.delete(id);
    }
}

module.exports = new TodoService();
```

## Configurando os Controladores

 - Atua como um intermediário entre o Model e a View.
 - Recebe as requisições do usuário, processa essas requisições, interage com o Model para manipular os dados e seleciona a View apropriada para retornar uma resposta.
 - Em uma API, o controlador é responsável por receber as requisições HTTP, chamar os serviços apropriados e retornar uma resposta.
 - Contém a lógica de controle, como gerenciamento de fluxo e navegação.

Crie a pasta `src/controllers` e o arquivo `src/controllers/todoController.js`.

```bash
mkdir src/controllers && touch src/controllers/todoController.js
```

Conteúdo do arquivo `src/controllers/todoController.js`:

```js
const TodoService = require('../services/todoService');

class TodoController {
    async createTodo(req, res) {
        try {
            const todo = req.body;
            const newTodo = await TodoService.create(todo);
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getTodos(req, res) {
        try {
            const todos = await TodoService.findAll();
            res.status(200).json(todos);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getTodoById(req, res) {
        try {
            const id = req.params.id;
            const todo = await TodoService.findById(id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(todo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateTodo(req, res) {
        try {
            const id = req.params.id;
            const todo = req.body;
            const updatedTodo = await TodoService.update(id, todo);
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTodo(req, res) {
        try {
            const id = req.params.id;
            const deletedTodo = await TodoService.delete(id);
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TodoController();
```

## Configurando as Rotas

As rotas são responsáveis por direcionar as requisições HTTP para os controladores. Para iniciar, crie a pasta `src/routes` e o arquivo `src/routes/todoRoutes.js`.

```bash

mkdir -p src/routes && touch src/routes/todoRoutes.js
```

Conteúdo do arquivo `src/routes/todoRoutes.js`:

```js
const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
```

## Configurando o Arquivo de Rotas Principal

Crie o arquivo `src/routes/index.js`:

```bash
touch src/routes/index.js
```

Conteúdo do arquivo `src/routes/index.js`:

```js
const express = require('express');
const router = express.Router();

const todoRoutes = require('./todoRoutes');

router.use('/todos', todoRoutes);

module.exports = router;
```

## Configurando o Arquivo Principal da Aplicação

Modifique o arquivo `src/app.js` conforme o exemplo abaixo:

```js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes'); // <<<<<<<

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
};
// Middlewares
app.use(cors(corsOptions)); // Para que possa ter acesso a API de qualquer lugar
app.use(helmet()); // Para que possa ter mais segurança
app.use(morgan('dev')); // Para que possa ver os logs no console
app.use(bodyParser.json()); // Para que possa receber dados em JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para que possa receber dados de formulários HTML

// Rotas
app.use('/api', routes); // <<<<<<<

module.exports = app;
```

## Configurando o Arquivo de Seed

Seed é um arquivo que contém dados iniciais para popular o banco de dados. Com Sequelize, podemos criar arquivos de seed usando o seu `cli`:

```bash
npx sequelize-cli seed:generate --name todo
```

Isso criará um arquivo `src/seeders/xxxx-todo.js`. Modifique o arquivo conforme o exemplo abaixo:

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Estudar Node.js',
        description: 'Estudar Node.js para criar aplicações web',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Estudar React',
        description: 'Estudar React para criar interfaces de usuário',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Estudar Vue.js',
        description: 'Estudar Vue.js para criar interfaces de usuário',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
```

Para executar o seed, utilize o comando:

```bash
npx sequelize-cli db:seed:all
```

## Testando a Aplicação

Para testar a aplicação, execute o comando:

```bash
npm run dev
```

Usando comandos CURL, você pode testar as rotas da aplicação:

```bash
# Criar um novo Todo
curl -X POST http://localhost:5000/api/todos -H 'Content-Type: application/json' -d '{"title": "Estudar JavaScript", "description": "Estudar JavaScript para criar aplicações web"}' | jq .
```

```bash
# Listar todos os Todos
curl -s http://localhost:5000/api/todos | jq .
```

```bash
# Buscar um Todo pelo ID
curl http://localhost:5000/api/todos/1
```

```bash
# Atualizar um Todo pelo ID
curl -X PUT http://localhost:5000/api/todos/1 -H 'Content-Type: application/json' -d '{"title": "Estudar JavaScript", "description": "Estudar JavaScript para criar aplicações web", "status": true}'
```

```bash
# Deletar um Todo pelo ID
curl -X DELETE http://localhost:5000/api/todos/1
```

> **Observação:** O comando `jq` é um utilitário de linha de comando que permite analisar, filtrar e formatar dados JSON. Para instalar o `jq`, execute o comando `sudo apt install jq`.

## Adicionando Validação de Dados

Para adicionar validação de dados, use o pacote `express-validation`. Crie a pasta `src/validations` e o arquivo `src/validations/todoValidation.js`.

```bash
mkdir src/validations && touch src/validations/todoValidation.js
```

Conteúdo do arquivo `src/validations/todoValidation.js`:

```js
const { validate, ValidationError, Joi } = require('express-validation')

const createTodoValidation = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
    }),
};

const updateTodoValidation = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
    }),
    params: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = {
    createTodoValidation,
    updateTodoValidation,
};
```

## Configurando o Arquivo de Rotas

Modifique o arquivo `src/routes/todoRoutes.js` conforme o exemplo abaixo:

```js
const express = require('express');
const router = express.Router();
const { validate } = require('express-validation'); // <<<<<<<

const todoController = require('../controllers/todoController');
const { createTodoValidation, updateTodoValidation } = require('../validations/todoValidation');

router.post('/', validate(createTodoValidation), todoController.createTodo); // <<<<<<<
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', validate(updateTodoValidation), todoController.updateTodo); // <<<<<<<
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
```

## Configurando o Arquivo de Erros

Crie a pasta `src/utils` e o arquivo `src/utils/errors.js`.

```bash
mkdir src/utils && touch src/utils/errors.js
```

Conteúdo do arquivo `src/utils/errors.js`:

```js
const { ValidationError } = require('express-validation');

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
}

const notFoundHandler = (req, res, next) => {
    return res.status(404).json({ message: 'Not found' });
}

module.exports = {
    CustomError,
    errorHandler,
    notFoundHandler
};
```

## Configurando o Arquivo Principal da Aplicação

Modifique o arquivo `src/app.js` conforme o exemplo abaixo:

```js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./utils/errors'); // <<<<<<<

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
};
// Middlewares
app.use(cors(corsOptions)); // Para que possa ter acesso a API de qualquer lugar
app.use(helmet()); // Para que possa ter mais segurança
app.use(morgan('dev')); // Para que possa ver os logs no console
app.use(bodyParser.json()); // Para que possa receber dados em JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para que possa receber dados de formulários HTML

// Rotas
app.use('/api', routes);

// Error handlers
app.use(notFoundHandler); // <<<<<<<
app.use(errorHandler); // <<<<<<<

module.exports = app;
```

## Testando a Aplicação

Para testar a aplicação, execute o comando:

```bash
npm run dev
```

Novamente, use comandos CURL para testar as rotas da aplicação. Teste a validação de dados:

```bash
# Criar um novo Todo sem o campo title
curl -X POST http://localhost:5000/api/todos -H 'Content-Type: application/json' -d '{"description": "Estudar JavaScript para criar aplicações web"}' | jq .
```

## Configurando o Arquivo de Autenticação

Crie a pasta `src/middlewares` e o arquivo `src/middlewares/auth.js`.

```bash
mkdir src/middlewares && touch src/middlewares/auth.js
```

Conteúdo do arquivo `src/middlewares/auth.js`:

```js
const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/errors');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token not found', status: 401 });
    }

    const token = req.header('authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token not found', status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new CustomError('Unauthorized', 401);
    }
}

module.exports = {
    authenticate,
};
```

## Configurando o Arquivo de Usuários

Crie a pasta `src/repositories` e o arquivo `src/repositories/userRepository.js`.

```bash
mkdir -p src/repositories && touch src/repositories/userRepository.js
```

Conteúdo do arquivo `src/repositories/userRepository.js`:

```js
const { User } = require('../models');

class UserRepository {
    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async create(user) {
        return User.create(user);
    }

    async findById(id) {
        return User.findByPk(id, { attributes: { exclude: ['password'] } });
    }

    async findAll() {
        return User.findAll({ attributes: { exclude: ['password'] } });
    }

    async update(id, user) {
        return User.update(user, { where: { id } });
    }
}

module.exports = new UserRepository();
```

## Configurando o Arquivo de Serviços de Usuários

Crie o arquivo `src/services/userService.js`.

```bash
touch src/services/userService.js
```

Conteúdo do arquivo `src/services/userService.js`:

```js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/errors');
const UserRepository = require('../repositories/userRepository');

class UserService
{
    async register(user) {
        const userExists = await UserRepository.findByEmail(user.email);

        if (userExists) {
            throw new CustomError('User already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await UserRepository.create({ ...user, password: hashedPassword });

        return newUser;
    }

    async login(user) {
        const userExists = await UserRepository.findByEmail(user.email);

        if (!userExists) {
            throw new CustomError('User not found', 404);
        }

        const isValidPassword = await bcrypt.compare(user.password, userExists.password);

        if (!isValidPassword) {
            throw new CustomError('Invalid password', 400);
        }

        const token = jwt.sign({ id: userExists.id, email: userExists.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { token };
    }

    async getUsers() {
        return await UserRepository.findAll();
    }

    async getUserById(id) {
        return await UserRepository.findById(id);
    }

    async updateUser(id, user) {
        return await UserRepository.update(id, user);
    }
}

module.exports = new UserService();
```

## Configurando o Arquivo de Controladores de Usuários

Crie o arquivo `src/controllers/userController.js`.

```bash
touch src/controllers/userController.js
```

Conteúdo do arquivo `src/controllers/userController.js`:

```js
const UserService = require('../services/userService');

class UserController {
    async register(req, res) {
        try {
            const user = req.body;
            const newUser = await UserService.register(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const user = req.body;
            const token = await UserService.login(user);
            res.status(200).json(token);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const user = req.body;
            const updatedUser = await UserService.updateUser(id, user);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
```

## Configurando o Arquivo de Rotas de Usuários

Crie o arquivo `src/routes/userRoutes.js`.

```bash
touch src/routes/userRoutes.js
```

Conteúdo do arquivo `src/routes/userRoutes.js`:

```js
const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const { authenticate } = require('../middlewares/auth');
const userController = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validations/userValidation');

router.post('/register', validate(registerValidation), userController.register);
router.post('/login', validate(loginValidation), userController.login);
router.get('/', authenticate, userController.getUsers);

module.exports = router;
```

## Configurando o Arquivo de Rotas Principal

Modifique o arquivo `src/routes/index.js` conforme o exemplo abaixo:

```js
const express = require('express');
const router = express.Router();
const todoRoutes = require('./todoRoutes');
const userRoutes = require('./userRoutes'); // <<<<<<<

router.use('/todos', todoRoutes);
router.use('/auth', userRoutes); // <<<<<<<

module.exports = router;
```

## Configurando o Arquivo de Validação de Usuários

Crie o arquivo `src/validations/userValidation.js`.

```bash
touch src/validations/userValidation.js
```

Conteúdo do arquivo `src/validations/userValidation.js`:

```js
const { Joi } = require('express-validation');

const registerValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const loginValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

module.exports = {
    registerValidation,
    loginValidation,
};
```

## Adicionando um Seed de Usuários

Crie o arquivo de seed `src/seeders/xxxx-user.js`.

```bash
npx sequelize-cli seed:generate --name user
```

Conteúdo do arquivo `src/seeders/xxxx-user.js`:

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Professor',
        email: 'fabricio.bizotto@ifc.edu.br',
        password: '$2a$10$HoKw5eQKvf8xcpJ.PVa4M.KAFSklk2Veh.fKJ5bwGu0ejUrIbDcFq', // 123456
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }

};
```

Para executar o seed, utilize o comando:

```bash
npx sequelize-cli db:seed:all
```

## Testando a Aplicação

Para testar a aplicação, execute o comando:

```bash
npm run dev
```

Use comandos CURL para testar as rotas da aplicação:

```bash
# Registrar um novo usuário
curl -X POST http://localhost:5000/api/auth/register -H 'Content-Type: application/json' -d '{"name": "Fabricio Bizotto", "email": "teste@gmail.com", "password": "123456"}' | jq .
```

```bash
# Fazer login
curl -X POST http://localhost:5000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "teste@gmail.com", "password": "123456"}' | jq .
```

```bash
# Listar todos os usuários com Bearer Token
curl -X GET http://localhost:5000/api/auth/users -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE3Mjg5NDY5MzUsImV4cCI6MTcyODk1MDUzNX0.RibW9Y5seD48R_mQi8BTUpEktGeuF1HTmNB_2kIXV8g' | jq .
```

## Recapitulando

Neste tutorial, você aprendeu a criar uma API RESTful com Node.js, Express e Sequelize. Aqui está um resumo do que você aprendeu:

- Configurar um projeto Node.js com Express e Sequelize.
- Criar um banco de dados SQLite com Sequelize.
- Criar tabelas no banco de dados com Sequelize.
- Criar modelos, repositórios, serviços e controladores.
- Criar rotas para manipular os dados.
- Adicionar validação de dados com express-validation.
- Adicionar autenticação com JWT.
- Adicionar erros personalizados.
- Adicionar seeders para popular o banco de dados.
- Testar a aplicação com CURL.
