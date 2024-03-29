import { BaseEntity } from "src/commons/base.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity("passwords")
export class PasswordEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ nullable: false })
  password: string;
}
