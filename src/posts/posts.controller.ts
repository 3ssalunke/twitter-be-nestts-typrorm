import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Delete("/:postid")
  deletePost(@Param("postid") postid: string) {
    return `deleting a post ${postid}`;
  }

  @Put("/:postid")
  likePost(@Param("postid") postid: string) {
    return `liked a post ${postid}`;
  }

  @Delete("/:postid")
  unlikePost(@Param("postid") postid: string) {
    return `unliked a post ${postid}`;
  }
}
