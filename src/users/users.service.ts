import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { UserEntity } from "./users.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    @InjectRepository(UserEntity) private userRepo: UsersRepository
  ) {}

  async getUserByUsername(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ username });
  }

  async getUserByUserid(userid: string): Promise<UserEntity> {
    return this.userRepo.findOne({ id: userid });
  }

  async createUser(
    user: Partial<UserEntity>,
    password: string
  ): Promise<UserEntity> {
    if (user.username.length < 5)
      throw new BadRequestException("Username must be of minimum 5 characters");

    if (password.length < 8)
      throw new BadRequestException("Password must be of minimum 8 characters");

    if (password.toLowerCase().includes("password"))
      throw new BadRequestException(
        "Password cannot contain the word password itself"
      );

    const usernameAlreadyExists = await this.getUserByUsername(user.username);
    if (usernameAlreadyExists)
      throw new ConflictException("This username is already taken!");

    const newUser = await this.userRepo.save(user);
    await this.authService.createPasswordForNewUser(newUser, password);

    return newUser;
  }

  async updateUser(
    id: string,
    userDetailsForUpdated: Partial<UserEntity>
  ): Promise<UserEntity> {
    if (!(await this.getUserByUserid(id)))
      throw new NotFoundException("User not found");
    await this.userRepo.update({ id }, userDetailsForUpdated);
    return await this.getUserByUserid(id);
  }
}
