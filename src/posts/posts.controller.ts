import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "src/auth/auth.decorator";
import { RequiedAuthGaurd } from "src/auth/auth.gaurd";
import { UserEntity } from "src/users/users.entity";
import { PostsService } from "./posts.service";

class PostCreateRequestBody {
  @ApiProperty() text: string;
  @ApiPropertyOptional() originalPostId: string;
  @ApiPropertyOptional() replyToPostId: string;
}

@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get("/")
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get("/:postid")
  getPostDetails(@Param("postid") postid: string) {
    return this.postsService.getPost(postid);
  }

  @ApiBearerAuth()
  @UseGuards(RequiedAuthGaurd)
  @Post("/")
  async createNewPost(
    @User() author: UserEntity,
    @Body() post: PostCreateRequestBody
  ) {
    return await this.postsService.createPost(
      post,
      author,
      post.originalPostId,
      post.replyToPostId
    );
  }

  @ApiBearerAuth()
  @UseGuards(RequiedAuthGaurd)
  @Delete("/:postId")
  async deletePost(
    @User() author: UserEntity,
    @Param("postId") postId: string
  ) {
    return {
      id: postId,
      deleted: await this.postsService.deletePost(author, postId),
    };
  }

  @ApiBearerAuth()
  @UseGuards(RequiedAuthGaurd)
  @Put("/:postid/like")
  async likePost(@Param("postid") postid: string, @Req() req) {
    const token = (req.headers.authorization as string).replace("Bearer ", "");
    return {
      postId: postid,
      liked: await this.postsService.likePost(token, postid),
    };
  }

  @ApiBearerAuth()
  @UseGuards(RequiedAuthGaurd)
  @Delete("/:postid/like")
  async unlikePost(@Param("postid") postid: string, @Req() req) {
    const token = (req.headers.authorization as string).replace("Bearer ", "");
    return {
      postId: postid,
      liked: await this.postsService.unlikePost(token, postid),
    };
  }
}
