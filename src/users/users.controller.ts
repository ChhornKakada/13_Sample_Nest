import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
  ) {}

  // * get all users
  @Get()
  async getUsers() {
    return {
      message: 'all users',
      statusCode: HttpStatus.OK,
      data: await this.userService.getUsers(),
    };
    // return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() req: CreateUserDto) {
    return await this.userService.createUser(req);
    // console.log(createdUser);
    // return {
    //   message: 'User is created',
    //   statusCode: HttpStatus.CREATED,
    //   data: createdUser,
    // }
  }
}
