import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./commons/db.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { HashtagsModule } from "./hashtags/hashtags.module";
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [DbModule, UsersModule, PostsModule, HashtagsModule, AuthModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
