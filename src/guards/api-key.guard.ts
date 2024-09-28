import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // * convert `context` to http
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('X-API-KEY');
    return apiKey !== 'nest-is-awesome' ? false : true;
  }
}
