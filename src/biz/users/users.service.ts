import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import type { Request } from 'express';
import type { FindOptionsWhere } from 'typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>, private readonly dataSource: DataSource, @Inject(REQUEST) private readonly request: Request) {}

  get userId() {
    return this.request.user?.id;
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExist = !!(await this.findOne({ email }));
    if (isExist) throw new BadRequestException(`Email '${email}' has already been registered.`);

    const newUser = this.repository.create({ ...createUserDto, avatar: '' });

    return await this.repository.save(newUser);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(where: FindOptionsWhere<UserEntity>) {
    return this.repository.findOneBy(where);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.repository.update({ id: this.userId }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
