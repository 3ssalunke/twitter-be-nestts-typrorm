import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  @Get("/@:username")
  getUserByUsername(@Param("username") username: string): string {
    return `details of username ${username}`;
  }

  @Get("/:userid")
  getUserByUserId(@Param("userid") userid: string): string {
    return `details of username ${userid}`;
  }

  @Post("/")
  createNewUser(@Body() body): string {
    return "new user";
  }

  @Patch("/:userid")
  updateUserDetails(@Param("userid") userid: string): string {
    return `updating user = ${userid}`;
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
