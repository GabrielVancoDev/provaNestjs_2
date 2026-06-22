import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";
import { User } from "src/user/user";

@Injectable()
export class DatabaseConfig implements SequelizeOptionsFactory
{

    constructor(
        private configService: ConfigService,
    ) {}

    createSequelizeOptions(connectionName?: string): 
    Promise<SequelizeModuleOptions> | SequelizeModuleOptions 
    {
        return {
            dialect: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            database: this.configService.get<string>('DB_DATABASE'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            synchronize: true,
            autoLoadModels: true,
            models: [User],
        }
    }
    
}