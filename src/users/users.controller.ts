import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') username: string): Promise<string> {
    return username;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string): Promise<string> {
    return id;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return `this is the agent id to be delete ${id}`;
  }
}
