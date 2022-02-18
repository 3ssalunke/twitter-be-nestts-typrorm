import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("hashtags")
@Controller("hashtags")
export class HashtagsController {
  @Get("/")
  getHashTags(): string {
    return "all hashtags";
  }

  @Get("/:tag/posts")
  getPostsForHashtag(@Param("tag") tag: string): string {
    return `all posts for hashtag ${tag}`;
  }
}
