import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /** constructor */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly configService: ConfigService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      return 'User already exist';
    }

    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /** Find all users */
  findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
    // if (!this.authService.isAuth()) {
    //   return 'Forbidden';
    // }

    console.log(this.profileConfiguration.apiKey);

    return [
      {
        firstName: 'Deepak',
        LastName: 'Kumar',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
      },
    ];
  }

  /** Find user by ID */
  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }
}
