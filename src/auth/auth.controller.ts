import { Body, Controller, Post } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

class LoginRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
}

class LogoutRequestBody {
  @ApiProperty() token: string;
}

class LoginResponseBody {
  @ApiProperty() token: string;
  constructor(token: string) {
    this.token = token;
  }
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() body: LoginRequestBody) {
    const sesssion = await this.authService.createNewSession(
      body.username,
      body.password
    );
    return new LoginResponseBody(sesssion.id);
  }

  @Post("/logout")
  async logout(@Body() { token }: LogoutRequestBody) {
    return this.authService.removeSession(token);
  }
}
