import { Controller, Get, Param } from "@nestjs/common";

@Controller("hashtags")
export class HashtagsController {
  @Get("/")
  getHashTags(): string {
    return "all hashtags";
  }

  @Get("/:tag/posts")
  getPostsForHashtag(@Param() param): string {
    return `all posts for hashtag ${param.tag}`;
  }
}
