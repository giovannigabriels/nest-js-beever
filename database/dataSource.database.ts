// database/config.ts

import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

export const databaseConfig: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: 'ls-84a050d3c8054bff6a276d7fbacb38f6dffda0cb.c3psaafrxcpx.ap-southeast-1.rds.amazonaws.com',
    port: 5432,
    username: 'giovanni',
    password: 'testobnb1234567890',
    database: 'giovanni',
    models: [User],
    synchronize: true,
};
