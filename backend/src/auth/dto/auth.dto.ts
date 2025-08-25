import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    minLength: 5,
    maxLength: 100,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User full name (minimum 3 characters)',
    example: 'John Doe',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters, must contain letter, number, and special character)',
    example: 'SecurePass123!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one letter, one number, and one special character (@$!%*?&)'
  })
  password: string;
}

export class SignInDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePass123!',
  })
  @IsString()
  password: string;
}

export class UserProfileDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  userId: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    type: UserProfileDto,
  })
  user: UserProfileDto;
} 