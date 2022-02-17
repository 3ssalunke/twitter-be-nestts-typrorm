import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { PostsController } from "./posts/posts.controller";
import { HashtagsController } from "./hashtags/hashtags.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

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
      entities: [],
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    HashtagsController,
  ],
  providers: [AppService],
})
export class AppModule {}
