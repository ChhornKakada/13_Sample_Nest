import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  // * constructor
  constructor(
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    // * get header
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization; // 'Bearer <token>`
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      // * add user object to the request
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
