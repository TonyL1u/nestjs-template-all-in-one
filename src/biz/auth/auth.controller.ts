import { Body, Controller, HttpCode, HttpStatus, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller({ path: 'auth', version: '1' })
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('request_public_key')
  requestPublicKey() {
    return this.authService.getSign();
  }

  @HttpCode(HttpStatus.OK)
  @Post('check_token')
  async checkToken(@Req() request: Request) {
    await this.authService.checkToken(request.cookies.AccessToken || request.cookies.get('AccessToken'));
  }

  @HttpCode(HttpStatus.OK)
  @Post('check_email')
  async checkEmail(@Query('email') email: string) {
    await this.authService.checkEmail(email);
  }
}
