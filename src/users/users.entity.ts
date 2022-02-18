import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  userPassword: string;
}
