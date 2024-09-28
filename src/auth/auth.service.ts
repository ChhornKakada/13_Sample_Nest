import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { retry } from 'rxjs';
import { UsersService } from 'src/users/users.service';

type AuthInput = { username: string; password: string; };
type SignInData = { userId: number; username: string; };
type AuthResult = { accessToken: string; userId: number; username: string; };

@Injectable()
export class AuthService { 

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // * method: authenticate
  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException()
    }
    // * return
    return this.signIn(user);
  }

  // * method: validate the user
  async validateUser(input: AuthInput): Promise<SignInData | null> {
    // * find user
    const user = await this.usersService.findUserByName(input.username);
    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        username: user.username,
      }
    }
    return null;
  }

  // * method: sign in
  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken: accessToken,
      username: user.username,
      userId: user.userId,
    }
  }
} 
