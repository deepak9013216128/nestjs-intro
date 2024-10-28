import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { STATUS_CODES } from 'http';
import { error } from 'console';

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
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (existingUser) {
      throw new BadRequestException(
        'User already exists, please check your email.',
      );
    }

    let newUser = this.userRepository.create(createUserDto);
    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return newUser;
  }

  /** Find all users */
  async findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    // if (!this.authService.isAuth()) {
    //   return 'Forbidden';
    // }

    // console.log(this.profileConfiguration.apiKey);

    if (getUserParamDto.id) {
      return await this.findOneById(getUserParamDto.id);
    }

    this.customExecption();
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
    let user = undefined;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  customExecption() {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoints does not exist',
        fileName: 'user.service.ts',
        lineNumber: 132,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because the API endpoint was permanently moved',
      },
    );
  }
}
