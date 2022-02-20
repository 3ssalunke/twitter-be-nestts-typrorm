import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PasswordEntity } from "./passwords.entity";
import { UserEntity } from "src/users/users.entity";
import { SessionEntity } from "./sessions.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordEntity, UserEntity, SessionEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
