import { Body, Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'testing';
  }

  @Get(':id')
  findOne(@Param() username: string): string {
    return username;
  }

  @Post()
  createUser(@Body createUserDto: CreateUserDto) {
    
  }
}
