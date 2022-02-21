import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PasswordEntity } from "src/auth/passwords.entity";
import { SessionEntity } from "src/auth/sessions.entity";
import { LikeEntity } from "src/likes/likes.entity";
import { PostEntity } from "src/posts/posts.entity";
import { UserEntity } from "src/users/users.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      password: "127636",
      database: "twitter_clone",
      synchronize: true,
      logger: "advanced-console",
      // dropSchema: true,
      logging: "all",
      entities: [
        UserEntity,
        PostEntity,
        PasswordEntity,
        SessionEntity,
        LikeEntity,
      ],
    }),
  ],
})
export class DbModule {}
