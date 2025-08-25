import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user information (protected)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Current user information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: { type: 'object' },
        timestamp: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid or missing token' })
  getCurrentUser(@Request() req) {
    return {
      message: 'This is a protected endpoint',
      user: req.user,
      timestamp: new Date().toISOString(),
    };
  }
}
