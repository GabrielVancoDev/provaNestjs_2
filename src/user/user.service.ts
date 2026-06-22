import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user';
import { Optional } from 'sequelize';
import { UserDTO } from './user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private user: typeof User,
    ) {}

    create_user(user: UserDTO)
    {
        return this.user.create({
            nome: user.nome,
            cpf: user.cpf,
            telefone: user.telefone,
            matricula: user.matricula,
        });
    }
}
