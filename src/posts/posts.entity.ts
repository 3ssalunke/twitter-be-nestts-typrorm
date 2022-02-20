import { BaseEntity } from "../commons/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UserEntity } from "src/users/users.entity";

@Entity("posts")
export class PostEntity extends BaseEntity {
  @Column({ nullable: true, length: 240 })
  text: string;

  @Column("json", { default: [] })
  images: Array<string>;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "author_id" })
  author: UserEntity;

  @Column({ name: "like_count", default: 0 })
  likeCount: number;

  @Column({ name: "repost_count", default: 0 })
  repostCount: number;

  @Column("json", { default: [] })
  hashtags: Array<string>;

  @Column("json", { default: [] })
  mentions: Array<Mention>;

  @OneToOne(() => PostEntity)
  @JoinColumn({ name: "orig_post_id" })
  originalPost: PostEntity;

  @OneToOne(() => PostEntity)
  @JoinColumn({ name: "reply_to_id" })
  replyTo: PostEntity;
}

class Mention {
  name: string;
  id: string;
}
