import { BaseEntity } from "src/commons/base.entity";
import { PostEntity } from "../posts/posts.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "src/users/users.entity";

@Entity("likes")
export class LikeEntity extends BaseEntity {
  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: "post_id" })
  post: PostEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
