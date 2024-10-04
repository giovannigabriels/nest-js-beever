import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { GetQuoteResponseDto } from './dto/quote.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() body: AuthCredentialDto): Promise<RegisterResponseDto> {
    return await this.userService.register(body);
  }

  @Post('/login')
  async login(@Body() body: AuthCredentialDto): Promise<GenerateTokenDto> {
    return await this.userService.login(body);
  }

  @Get('/quote')
  @UseGuards(AuthGuard)
  async getUserQuote(@Req() req: Request,): Promise<GetQuoteResponseDto> {
    return await this.userService.getUserQuote(req['user'])
  }

}
