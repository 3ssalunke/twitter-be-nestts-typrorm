import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./users.entity";
import { UsersService } from "./users.service";

class UserCreateRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

class UserUpdateRequestBody {
  @ApiProperty() password?: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/@:username")
  async getUserByUsername(
    @Param("username") username: string
  ): Promise<UserEntity> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  @Get("/:userid")
  async getUserByUserId(@Param("userid") userid: string): Promise<UserEntity> {
    const user = await this.usersService.getUserByUserid(userid);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  @Post("/")
  async createNewUser(
    @Body() createUserRequest: UserCreateRequestBody
  ): Promise<UserEntity> {
    const user = await this.usersService.createUser(
      createUserRequest,
      createUserRequest.password
    );
    return user;
  }

  @Patch("/:userid")
  async updateUserDetails(
    @Param("userid") userid: string,
    @Body() updateUserRequest: UserUpdateRequestBody
  ) {
    return await this.usersService.updateUser(userid, updateUserRequest);
  }

  @Put("/:userid/follow")
  followUser(@Param("userid") userid: string): string {
    return `following user ${userid}`;
  }

  @Delete("/:userid/follow")
  unfollowUser(@Param("userid") userid: string): string {
    return `unfollowing user ${userid}`;
  }

  @Get("/:userid/followers")
  getFollowersOfUser(@Param("userid") userid: string): string {
    return `followers of user ${userid}`;
  }

  @Get("/:userid/followees")
  getFolloweesOfUser(@Param("userid") userid: string): string {
    return `followees of user ${userid}`;
  }
}
