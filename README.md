# Revisão Completa - Programação Avançada com NestJS

## 1. Comandos de Configuração do NestJS

### Instalar o Nest CLI

```bash
npm i -g @nestjs/cli
```

### Criar um novo projeto

```bash
nest new nome-do-projeto
```

Exemplo:

```bash
nest new revisao-prova
```

### Executar o projeto

Modo normal:

```bash
npm run start
```

Modo desenvolvimento:

```bash
npm run start:dev
```

### Gerar componentes do NestJS

Criar módulo:

```bash
nest g module user
```

Criar controller:

```bash
nest g controller user
```

Criar service:

```bash
nest g service user
```

Criar recurso completo:

```bash
nest g resource user
```

Estrutura criada:

```txt
user/
├── dto/
├── entities/
├── user.controller.ts
├── user.module.ts
└── user.service.ts
```

---

# 2. Instalação de Dependências

## Sequelize + MySQL

Utilizado para comunicação com o banco de dados MySQL.

```bash
npm install @nestjs/sequelize sequelize sequelize-typescript mysql2
```

---

## Configuração por Variáveis de Ambiente

```bash
npm install @nestjs/config
```

Arquivo `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=revisao
```

---

## DTO e Validações

Bibliotecas utilizadas para validação de dados.

```bash
npm install class-validator class-transformer
```

Configuração global:

```ts
app.useGlobalPipes(new ValidationPipe());
```

Exemplo DTO:

```ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
```

---

## JWT (Autenticação)

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

Opcional para criptografia:

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

---

## Microsserviços

```bash
npm install @nestjs/microservices
```

Protocolos suportados:

* TCP
* RabbitMQ
* Kafka
* Redis
* gRPC

---

## Swagger

```bash
npm install @nestjs/swagger swagger-ui-express
```

Configuração:

```ts
const config = new DocumentBuilder()
  .setTitle('Minha API')
  .setDescription('Documentação')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, document);
```

Acesso:

```txt
http://localhost:3000/api
```

---

# 3. Passo a Passo para Criar uma API

## Passo 1 - Criar o Projeto

```bash
nest new projeto
```

---

## Passo 2 - Criar o Recurso

```bash
nest g resource user
```

---

## Passo 3 - Criar Model

```ts
@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nome: string;

  @Column
  email: string;
}
```

---

## Passo 4 - Criar DTO

```ts
export class CreateUserDto {
  nome: string;
  email: string;
}
```

---

## Passo 5 - Criar Service

Responsável pelas regras de negócio.

```ts
@Injectable()
export class UserService {
  findAll() {
    return [];
  }

  create(data) {
    return data;
  }
}
```

---

## Passo 6 - Criar Controller

Responsável por receber as requisições.

```ts
@Controller('user')
export class UserController {

  @Get()
  findAll() {}

  @Post()
  create(@Body() data) {}
}
```

---

## Passo 7 - Configurar Banco de Dados

```ts
SequelizeModule.forRoot({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadModels: true,
  synchronize: true,
})
```

---

# 4. Conceitos Fundamentais

## O que é uma API?

API (Application Programming Interface) é um mecanismo que permite a comunicação entre sistemas.

Exemplo:

Um sistema React envia:

```http
POST /user
```

Dados enviados:

```json
{
  "nome": "Gabriel",
  "email": "gabriel@email.com"
}
```

O NestJS recebe, processa e salva no banco.

---

## Métodos HTTP

### GET

Buscar dados.

```http
GET /user
```

---

### POST

Cadastrar dados.

```http
POST /user
```

---

### PUT

Atualizar completamente.

```http
PUT /user/1
```

---

### PATCH

Atualizar parcialmente.

```http
PATCH /user/1
```

---

### DELETE

Remover registros.

```http
DELETE /user/1
```

---

# O que são Microsserviços?

Microsserviços consistem em dividir um sistema grande em vários sistemas menores.

Exemplo:

```txt
Sistema Principal

├── Auth Service
├── User Service
├── Product Service
├── Email Service
└── Payment Service
```

Cada serviço possui responsabilidade própria.

---

## Vantagens dos Microsserviços

### Escalabilidade

Cada serviço pode crescer independentemente.

### Organização

Código mais limpo e separado.

### Manutenção

Problemas ficam isolados.

### Reutilização

Serviços podem ser utilizados por vários sistemas.

---

# O que é Swagger?

Swagger é uma ferramenta para documentação de APIs.

Permite:

* Visualizar endpoints.
* Testar requisições.
* Ver parâmetros.
* Ver respostas.
* Compartilhar documentação.

Exemplo:

```txt
GET     /user
POST    /user
PATCH   /user/{id}
DELETE  /user/{id}
```

Tudo acessível pelo navegador.

---

# Arquitetura do NestJS

```txt
Cliente
   ↓
Controller
   ↓
DTO
   ↓
Service
   ↓
Model
   ↓
Banco de Dados
```

---

# Função de Cada Camada

## Controller

Recebe requisições HTTP.

Exemplo:

```http
GET /user
```

---

## DTO

Valida os dados recebidos.

Exemplo:

```ts
nome: string
email: string
```

---

## Service

Contém a lógica de negócio.

Exemplo:

```ts
Cadastrar usuário
Atualizar usuário
Remover usuário
```

---

## Model (Entity)

Representa a tabela do banco.

Exemplo:

```txt
Tabela User
```

---

## Banco de Dados

Armazena as informações permanentemente.

Exemplo:

```txt
MySQL
PostgreSQL
MongoDB
```

---

# Resumo para a Prova

| Conceito       | Função                  |
| -------------- | ----------------------- |
| NestJS         | Framework Backend       |
| Module         | Organização do sistema  |
| Controller     | Recebe requisições      |
| Service        | Regras de negócio       |
| DTO            | Validação de dados      |
| Model/Entity   | Representação da tabela |
| Sequelize      | ORM                     |
| MySQL          | Banco de dados          |
| JWT            | Autenticação            |
| Swagger        | Documentação            |
| Microsserviços | Divisão do sistema      |

---

# Fluxo Completo de uma Requisição

```txt
POST /user
        ↓
UserController
        ↓
CreateUserDto
        ↓
UserService
        ↓
UserModel
        ↓
MySQL
        ↓
Resposta ao Cliente
```

Este é o fluxo mais importante para compreender o funcionamento do NestJS e frequentemente aparece em provas e entrevistas.
