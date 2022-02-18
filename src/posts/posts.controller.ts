import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("posts")
@Controller("posts")
export class PostsController {
  @Get("/")
  getAllPosts() {
    return "get all posts";
  }

  @Get("/:postid")
  getPostDetails(@Param("postid") postid: string) {
    return `get post ${postid}`;
  }

  @Post("/")
  createNewPost() {
    return "created new post";
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
