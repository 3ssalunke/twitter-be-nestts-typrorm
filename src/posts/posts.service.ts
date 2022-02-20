import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/users.entity";
import { PostEntity } from "./posts.entity";
import { PostsRepositry } from "./posts.repository";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepo: PostsRepositry
  ) {}

  async getAllPosts(authorId?: string, hashtags?: string[] | null) {
    const queryBuilder = this.postsRepo
      .createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .leftJoinAndSelect("posts.originalPost", "originalPost")
      .addSelect("originalPost.author")
      .leftJoinAndSelect("originalPost.author", "originalPostAuthor")
      .leftJoinAndSelect("posts.replyTo", "replyTo")
      .addSelect("replyTo.author")
      .leftJoinAndSelect("replyTo.author", "replyToAuthor");

    if (authorId) {
      queryBuilder.where(`posts.author = :authorId`, { authorId });
    }

    if (hashtags && hashtags.length > 0) {
      // TODO
    }

    return queryBuilder
      .addSelect("posts.created_at")
      .orderBy("posts.created_at", "DESC")
      .limit(100)
      .getMany();
  }

  async getPost(id: string): Promise<PostEntity> {
    return this.postsRepo.findOne(id, {
      relations: [
        "author",
        "origPost",
        "origPost.author",
        "replyTo",
        "replyTo.author",
      ],
    });
  }

  async createPost(
    post: Partial<PostEntity>,
    author: UserEntity,
    originalPostId: string,
    replyToPostId: string
  ) {
    if (!post && !originalPostId) {
      throw new BadRequestException("Post must contain text or be a repost");
    }
    if (originalPostId && replyToPostId) {
      throw new BadRequestException("Post can either be a reply or a repost");
    }
    const newPost = new PostEntity();
    newPost.text = post.text;
    newPost.author = author;
    if (originalPostId) {
      const origPost = await this.postsRepo.findOne(originalPostId);
      if (!origPost) {
        throw new NotFoundException("Original post not found");
      }
      newPost.originalPost = origPost;
    }
    if (replyToPostId) {
      const replyTo = await this.postsRepo.findOne(replyToPostId);
      if (!replyTo) {
        throw new NotFoundException("Original post not found");
      }
      newPost.replyTo = replyTo;
    }
    const savedPost = await this.postsRepo.save(newPost);
    return savedPost;
  }
}
