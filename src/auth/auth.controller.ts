import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }
}
