import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller("posts")
export class PostsController {
  @Get("/")
  getAllPosts() {
    return "get all posts";
  }

  @Get("/:postid")
  getPostDetails(@Param() param) {
    return `get post ${param.postid}`;
  }

  @Post("/")
  createNewPost() {
    return "created new post";
  }

  @Delete("/:postid")
  deletePost(@Param() param) {
    return `deleting a post ${param.postid}`;
  }

  @Put("/:postid")
  likePost(@Param() param) {
    return `liked a post ${param.postid}`;
  }

  @Delete("/:postid")
  unlikePost(@Param() param) {
    return `unliked a post ${param.postid}`;
  }
}
