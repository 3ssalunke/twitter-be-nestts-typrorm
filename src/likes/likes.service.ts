import { BadRequestException, Injectable } from "@nestjs/common";
import { PostEntity } from "src/posts/posts.entity";
import { UserEntity } from "src/users/users.entity";
import { LikeEntity } from "./likes.entity";
import { LikesRepository } from "./likes.repository";

@Injectable()
export class LikesService {
  constructor(private likesRepo: LikesRepository) {}

  async likePost(post: PostEntity, user: UserEntity) {
    const alreadyLiked = await this.getLikedPost(post.id, user.id);
    if (alreadyLiked) return false;
    const newLike = new LikeEntity();
    newLike.post = post;
    newLike.user = user;
    const savedLike = await this.likesRepo.save(newLike);
    return savedLike !== null;
  }

  async unlikePost(postId: string, userId: string): Promise<boolean> {
    const likedPost = await this.getLikedPost(postId, userId);
    if (!likedPost) return false;
    const unlikePost = await this.likesRepo.delete(likedPost.id);
    return unlikePost.affected === 1;
  }

  async getLikedPost(postId: string, userId: string) {
    if (!postId || !userId) {
      throw new BadRequestException(
        "Post can only be liked/unliked if both user id and post id is provided"
      );
    }
    return await this.likesRepo
      .createQueryBuilder("likes")
      .leftJoinAndSelect("likes.post", "post")
      .leftJoinAndSelect("likes.user", "user")
      .where("post.id = :postId", { postId })
      .where("user.id = :userId", { userId })
      .getOne();
  }
}
