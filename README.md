Revisão Prova NestJS
1. Comandos de configuração do NestJS
Instalar Nest CLI
npm i -g @nestjs/cli
Criar projeto Nest
nest new nome-do-projeto
Exemplo:
nest new revisao-prova
Rodar o projeto
npm run start
Modo desenvolvimento:
npm run start:dev
Criar módulos, controllers e services
nest g module user
nest g controller user
nest g service user
Ou criar tudo junto:
nest g resource user
Esse comando cria:
user/
├── dto/
├── entities/
├── user.controller.ts
├── user.module.ts
└── user.service.ts
2. Instalação de dependências
Sequelize + MySQL
Usado para conectar o NestJS ao banco MySQL, que você gerencia pelo Workbench.
npm install @nestjs/sequelize sequelize sequelize-typescript mysql2
Configuração com variáveis de ambiente
npm install @nestjs/config
Arquivo .env:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=revisao
Class Validator e Class Transformer
Usado para validar DTOs.
npm install class-validator class-transformer
No main.ts:
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe());
Exemplo DTO:
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
 @IsString()
 @IsNotEmpty()
 nome: string;

 @IsNumber()
 idade: number;
}
JWT
Usado para autenticação.
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
Também costuma usar:
npm install bcrypt
npm install -D @types/bcrypt
Microservices
npm install @nestjs/microservices
Para comunicação TCP simples:
import { Transport } from '@nestjs/microservices';
Swagger
Usado para documentar e testar a API pelo navegador.
npm install @nestjs/swagger swagger-ui-express
No main.ts:
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
 .setTitle('API Revisão')
 .setDescription('Documentação da API')
 .setVersion('1.0')
 .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
Acessa em:
http://localhost:3000/api
3. Passo a passo de criação de arquivos
Exemplo: entidade User.
1. Criar módulo, controller e service
nest g module user
nest g controller user
nest g service user
2. Criar model Sequelize
Arquivo:
src/user/user.model.ts
Código:
import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

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
3. Configurar o módulo
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
 imports: [SequelizeModule.forFeature([User])],
 controllers: [UserController],
 providers: [UserService],
})
export class UserModule {}
4. Criar DTO
Arquivo:
src/user/dto/create-user.dto.ts
Código:
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
 @IsString()
 @IsNotEmpty()
 nome: string;

 @IsString()
 @IsNotEmpty()
 email: string;
}
5. Criar service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
 constructor(
   @InjectModel(User)
   private userModel: typeof User,
 ) {}

 findAll() {
   return this.userModel.findAll();
 }

 create(data: CreateUserDto) {
   return this.userModel.create(data as any);
 }
}
6. Criar controller
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
 constructor(private readonly userService: UserService) {}

 @Get()
 findAll() {
   return this.userService.findAll();
 }

 @Post()
 create(@Body() data: CreateUserDto) {
   return this.userService.create(data);
 }
}
7. Importar no AppModule
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';

@Module({
 imports: [
   ConfigModule.forRoot(),
   SequelizeModule.forRoot({
     dialect: 'mysql',
     host: process.env.DB_HOST,
     port: Number(process.env.DB_PORT),
     username: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     models: [User],
     autoLoadModels: true,
     synchronize: true,
   }),
   UserModule,
 ],
})
export class AppModule {}
4. Para que serve API, Microsserviços e Swagger
API
API é uma forma de comunicação entre sistemas.
Exemplo:
O frontend em React ou Angular precisa cadastrar um usuário. Ele envia uma requisição para o backend:
POST /user
Com dados:
{
 "nome": "Gabriel",
 "email": "gabriel@email.com"
}
O backend recebe, processa, salva no banco e devolve uma resposta.
Principais métodos:
GET     buscar dados
POST    cadastrar dados
PUT     atualizar tudo
PATCH   atualizar parcialmente
DELETE  deletar dados
Exemplo de API REST:
GET /user
POST /user
GET /user/1
PATCH /user/1
DELETE /user/1
Microsserviços
Microsserviços são uma forma de dividir um sistema grande em partes menores e independentes.
Exemplo:
Serviço de Usuários
Serviço de Pagamentos
Serviço de Produtos
Serviço de Notificações
Cada serviço pode ter sua própria responsabilidade.
Vantagem:
Organização
Escalabilidade
Manutenção mais fácil
Independência entre partes do sistema
Exemplo prático:
Em vez de um único sistema fazer tudo, você pode ter:
auth-service       login e JWT
user-service       cadastro de usuários
email-service      envio de e-mails
product-service    produtos
No NestJS, microsserviços podem se comunicar por:
TCP
RabbitMQ
Kafka
Redis
gRPC
Swagger
Swagger serve para documentar e testar a API.
Ele mostra as rotas disponíveis, os métodos, os parâmetros e os exemplos de requisição.
Exemplo:
GET /user
POST /user
PATCH /user/{id}
DELETE /user/{id}
Com Swagger, você consegue testar a API direto pelo navegador, sem precisar obrigatoriamente usar Postman ou Thunder Client.
Resumo para prova
NestJS = framework backend para Node.js com TypeScript.

Module = organiza uma parte do sistema.

Controller = recebe as requisições HTTP.

Service = contém a regra de negócio.

DTO = define e valida os dados recebidos.

Entity/Model = representa a tabela do banco.

Sequelize = ORM usado para conversar com o banco.

MySQL = banco de dados relacional.

JWT = autenticação por token.

Swagger = documentação e teste da API.

Microsserviços = divisão do sistema em serviços menores.
Fluxo mental do NestJS
Requisição chega na API
       ↓
Controller recebe
       ↓
DTO valida os dados
       ↓
Service processa a regra
       ↓
Model/Sequelize acessa o banco
       ↓
Resposta volta para o usuário
Exemplo:
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

