import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from 'database/dataSource.database';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
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
