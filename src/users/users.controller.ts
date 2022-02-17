import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/@:username')
  getUserByUsername(@Param() param): string {
    return `details of username ${param.username}`;
  }

  @Get('/:userid')
  getUserByUserId(@Param() param): string {
    return `details of username ${param.userid}`;
  }

  @Post('/')
  createNewUser(@Body() body): string {
    return 'new user';
  }

  @Patch('/:userid')
  updateUserDetails(@Param() userid): string {
    return `updating user = ${userid}`;
  }

  @Put('/:userid/follow')
  followUser(@Param() param): string {
    return `following user ${param.userid}`;
  }

  @Delete('/:userid/follow')
  unfollowUser(@Param() param): string {
    return `unfollowing user ${param.userid}`;
  }

  @Get('/:userid/followers')
  getFollowersOfUser(@Param() param): string {
    return `followers of user ${param.userid}`;
  }

  @Get('/:userid/followees')
  getFolloweesOfUser(@Param() param): string {
    return `followers of user ${param.userid}`;
  }
}
