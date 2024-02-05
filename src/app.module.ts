import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './biz/auth/auth.module';
import { UsersModule } from './biz/users/users.module';
import { getMysqlConnectOptions, JwtConfigService } from './common/services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    JwtModule.registerAsync({ global: true, imports: [ConfigModule], useClass: JwtConfigService }),
    ThrottlerModule.forRoot({ throttlers: [{ limit: 10, ttl: 60 }] }),
    TypeOrmModule.forRootAsync({ useFactory: getMysqlConnectOptions }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}
