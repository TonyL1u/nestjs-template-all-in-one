import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import fs from 'fs';

import { TokenExpiredException, WrongPasswordException } from '@/common/exceptions';
import { EmailRegisteredException } from '@/common/exceptions';
import { decryptPassword } from '@/common/utils';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOne({ email });

    if (!user) throw new UnauthorizedException(`This email(${email}) has not been registered yet.`);

    const isValid = await compare(decryptPassword(password), user.password);
    if (!isValid) throw new WrongPasswordException('Incorrect password.');

    const { id, avatar, name } = user;
    const accessToken = await this.jwtService.signAsync({ id, name, email });

    return { id, accessToken, email, avatar, name };
  }

  getSign() {
    const publicKey = fs.readFileSync('public_key.pem', 'utf8');

    return { key: publicKey, expiresIn: process.env.JWT_EXPIRERS_IN || '7d' };
  }

  async checkToken(token: string) {
    const { exp } = await this.jwtService.verifyAsync(token);
    // token 过期
    if (+new Date() > exp * 1000) throw new TokenExpiredException('Token is expired.');
  }

  async checkEmail(email: string) {
    const user = await this.usersService.findOne({ email });

    if (user) throw new EmailRegisteredException('Email has been registered.');
  }
}
