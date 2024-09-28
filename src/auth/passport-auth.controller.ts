import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtGuard } from './guards/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(
    private authService: AuthService
  ) {}

  // * login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
    
  }

  // * me
  @Get('me')
  @UseGuards(PassportJwtGuard)
  getUserInfo(@Request() req) {
    return req.user;
  }
}
