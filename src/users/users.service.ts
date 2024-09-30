import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from './schema';

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

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  // * method: find user by name from local data
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }

  // * find all users
  async getUsers() {
    return this.database.query.users.findMany();
  }

  // * create user
  async createUser(user: typeof schema.users.$inferInsert) {
    return await this.database.insert(schema.users).values(user).returning();
  }
}
