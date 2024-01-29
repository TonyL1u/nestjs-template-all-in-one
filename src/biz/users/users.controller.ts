import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { isEmail } from 'class-validator';
import type { Request } from 'express';

import { AuthGuard } from '@/common/guards';
import { OmitInterceptor } from '@/common/interceptors';
import { decryptPassword } from '@/common/utils';

import { CreateUserDto } from './dto/create-user.dto';
import type { User as UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller({ path: 'user', version: '1' })
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(new OmitInterceptor<UserEntity>('password', 'createAt', 'creator', 'updateAt', 'updater', 'isActive'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { email, password } = createUserDto;

    if (!isEmail(email)) throw new BadRequestException(`Invalid email address.`);

    const decryptedPwd = decryptPassword(password);

    if (decryptedPwd.length < 8 || decryptedPwd.length > 32) throw new BadRequestException(`Password's length should be between 8 and 32 characters.`);

    return await this.usersService.create({ ...createUserDto, password: decryptedPwd });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('get_info')
  getUserInfo(@Req() request: Request) {
    return this.usersService.findOne({ id: request.user.id });
  }
}
