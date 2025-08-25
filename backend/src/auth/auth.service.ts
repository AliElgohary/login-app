import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signUp(email: string, name: string, password: string): Promise<AuthResponseDto> {
    try {
      const user = await this.usersService.create(email, name, password);
      const payload = { sub: user._id, email: user.email };
      const token = this.jwtService.sign(payload);
      
      return {
        access_token: token,
        user: {
          userId: user._id.toString(),
          email: user.email,
          name: user.name,
        }
      };
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
      }
    };
  }
}
