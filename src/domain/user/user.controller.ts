import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthCredentialDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() body: AuthCredentialDto) {
    return await this.userService.register(body);
  }

  @Post('/login')
  async login(@Body() body: AuthCredentialDto) {
    return await this.userService.login(body);
  }

  @Get('/quote')
  @UseGuards(AuthGuard)
  async getUserQuote() {
    return await this.userService.getUserQuote()
  }

}
