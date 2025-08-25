import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { SignUpDto, SignInDto, AuthResponseDto, UserProfileDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    type: AuthResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 409, description: 'Conflict - email already exists' })
  async signUp(@Body() body: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(body.email, body.name, body.password);
  }

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in',
    type: AuthResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid credentials' })
  async signIn(@Body() body: SignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(body.email, body.password);
  }
}
