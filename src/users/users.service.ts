import { Injectable } from '@nestjs/common';

// * user type
export type User = {
  userId: number,
  username: string,
  password: string,
}

// * data
const users: User[] = [
  {
    userId: 1,
    username: 'kakada',
    password: 'password'
  },
  {
    userId: 2,
    username: 'sacda',
    password: 'password'
  },
  {
    userId: 3,
    username: 'Len',
    password: 'password'
  }
];

// * class service
@Injectable()
export class UsersService {

  // * method: find user by name
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
