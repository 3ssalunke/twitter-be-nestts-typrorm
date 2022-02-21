import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { LikesRepository } from "./likes.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([LikesRepository])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
