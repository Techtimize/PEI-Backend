import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-auth.dto';
import { UserCreationService } from '../providers/user.creation.provider';

@Controller('auth')
export class UserCreationController {
  constructor(private readonly userService: UserCreationService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }
}
