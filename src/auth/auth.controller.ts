import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  // * login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: {username: string; password: string}) {
    return this.authService.authenticate(input);
  }

  // * me
  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() req) {
    return req.user;
  }

}
