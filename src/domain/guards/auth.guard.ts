import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
  
      if (!req.headers.authorization) {
        throw new UnauthorizedException();
      }
  
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
  
      const jwtService = new JwtService();
      const verif = await jwtService.verifyAsync(token, {
        secret: "rahasia",
      });
  
      req.user = verif;
  
      return true;
    }
  }
  