import { Injectable, BadRequestException, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user.model';
import { Bcrypt } from '../../utils/bcrypt';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GetQuoteResponseDto } from './dto/quote.dto';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private bcrypt: Bcrypt,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async register(body: AuthCredentialDto): Promise<RegisterResponseDto> {
      const { email, password } = body
  
      const findUser = await this.findUserByEmail(email)
  
      if (findUser) {
        throw new BadRequestException('Email already registered');
      }
  
      const hashedPassword = await this.bcrypt.hashPassword(password);
      const newUser = await this.userModel.create({ email, password: hashedPassword });

      const response: RegisterResponseDto = {
        message: `${newUser?.email} success register`
      }
  
      return response
  }

  async login(body: AuthCredentialDto): Promise<GenerateTokenDto> {
      const { email, password } = body
  
      const findUser = await this.findUserByEmail(email)
  
      if (!findUser) {
        throw new NotFoundException('Email not found');
      }
  
      const isPasswordMatch = await this.bcrypt.comparePassword(
        password,
        findUser?.password,
      );

      if (!isPasswordMatch) {
        throw new UnauthorizedException("Invalid Credentials");
      }
  
      return await this.generateToken({
        email: findUser?.email
      })
  }

  async generateToken(payload: {
    email: string
  }): Promise<GenerateTokenDto> {

    const tokenPayload: TokenPayloadDto = {
      email: payload.email
    }

    const token = await this.jwtService.signAsync(tokenPayload);

    return {
      email: payload.email,
      token
    }
  }

  async getUserQuote(user: any): Promise<GetQuoteResponseDto> {
    const { email } = user

    const findUser = await this.findUserByEmail(email)

    if(!findUser) {
      throw new UnauthorizedException();
    }

    try {
      const response = await lastValueFrom(this.httpService.get('https://api.kanye.rest/'));

      return response.data
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch quote from Kanye Rest API');
    }
  }
}
