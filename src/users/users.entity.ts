import { BaseEntity } from "../commons/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { PasswordEntity } from "../auth/passwords.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, length: 30, unique: true })
  username: string;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, length: 240 })
  bio: string;

  @Column({ name: "follower_count", default: 0 })
  followerCount: number;

  @Column({ name: "followee_count", default: 0 })
  followeeCount: number;

  @Column("boolean", { default: false })
  verified: boolean;

  @OneToOne(() => PasswordEntity, (password) => password.user, {
    lazy: true,
    cascade: true,
  })
  userPassword: PasswordEntity;
}
