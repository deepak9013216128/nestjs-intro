import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Users')
// @UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on query',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid User Id',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of page number that you want the API to returned',
    example: 1,
  })
  getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    // console.log(getUserParamDto);
    // console.log(typeof limit);
    // console.log(limit);
    // console.log(typeof page);
    // console.log(page);
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  @Auth(AuthType.None)
  createUser(
    @Body() createUserDto: CreateUserDto,
    // @Headers() headers: any,
    // @Ip() ip: any
  ) {
    // console.log(crateUserDto instanceof CreateUserDto);
    // console.log(headers);
    // console.log(ip);

    return this.userService.createUser(createUserDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post('/create-many')
  createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'You sent patch request for user';
  }
}
