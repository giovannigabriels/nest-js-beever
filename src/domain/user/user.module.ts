import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bcrypt } from '../../utils/bcrypt';
import { User } from '../../models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [User]
    ),
    HttpModule
   ],
  controllers: [UserController],
  providers: [UserService, Bcrypt],
})
export class UserModule {}
