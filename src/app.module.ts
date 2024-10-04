import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './domain/user/user.module';
import { User } from './models/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'ls-84a050d3c8054bff6a276d7fbacb38f6dffda0cb.c3psaafrxcpx.ap-southeast-1.rds.amazonaws.com',
    port: 5432,
    username: 'giovanni',
    password: 'testobnb1234567890',
    database: 'giovanni',
    models: [User],
    synchronize: true,
  }),
  JwtModule.register({
    global: true,
    secret: "rahasia",
    signOptions: {
        expiresIn: "1d",
    },
  }),
  UserModule
],
})

export class AppModule {}
