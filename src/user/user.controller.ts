import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @MessagePattern({ cmd: 'create_user' })
    create_user(user: UserDTO)
    {
        return this.userService.create_user(user);
    }

    @MessagePattern({ cmd: 'login' })
    login(user: any)
    {
        
    }

}
