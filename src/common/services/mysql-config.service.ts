import { Inject, Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Request } from 'express';

const BASE_OPTIONS: TypeOrmModuleOptions = {
  type: 'mysql',
  autoLoadEntities: true,
  synchronize: false,
  poolSize: 100,
  retryAttempts: 0
};

export async function getMysqlConnectOptions(database?: string, override: TypeOrmModuleOptions = {}) {
  await ConfigModule.envVariablesLoaded;

  return {
    ...BASE_OPTIONS,
    logging: process.env.NODE_ENV === 'development',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: database || process.env.MYSQL_DATABASE,
    ...override
  } as TypeOrmModuleOptions;
}

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService, @Inject(REQUEST) private readonly request: Request) {}

  async createTypeOrmOptions() {
    return {
      ...BASE_OPTIONS,
      logging: this.configService.get('NODE_ENV') === 'development',
      host: this.configService.get('MYSQL_HOST'),
      port: this.configService.get('MYSQL_PORT'),
      username: this.configService.get('MYSQL_USERNAME'),
      password: this.configService.get('MYSQL_PASSWORD'),
      database: this.configService.get('MYSQL_DATABASE')
    } as TypeOrmModuleOptions;
  }
}
