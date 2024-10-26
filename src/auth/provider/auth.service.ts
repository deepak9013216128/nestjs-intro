import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  login(email: string, password: string) {
    const user = this.userService.findOneById(1);
    return {
      user,
      token: 'random-token',
    };
  }

  isAuth() {
    return true;
  }
}
