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
  
      const token = this.extractTokenFromHeader(req);

      if (!token) {
        throw new UnauthorizedException();
      }
  
      const jwtService = new JwtService();
      try {
        const verif = await jwtService.verifyAsync(token, {
          secret: "rahasia",
        });
    
        req.user = verif;
        return true;
        
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  
  