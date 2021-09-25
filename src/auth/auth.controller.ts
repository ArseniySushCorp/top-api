import { ALREADY_REGISTERED_ERROR } from './auth.const';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthDto): Promise<UserModel> {
    const oldUser = await this.authService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Req() req, @Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);

    return this.authService.login(email);
  }
}
