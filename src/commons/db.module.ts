import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "src/posts/post.entity";
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
      logging: "all",
      entities: [UserEntity, PostEntity],
    }),
  ],
})
export class DbModule {}
