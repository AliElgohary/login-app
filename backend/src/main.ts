import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  const config = new DocumentBuilder()
    .setTitle('Login API')
    .setDescription('A secure authentication API built with NestJS')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  
  await app.listen(port);
  
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  logger.log(`🚀 Application is running on: http://localhost:${port}`, 'Bootstrap');
  logger.log(`🌍 Environment: ${configService.get<string>('environment')}`, 'Bootstrap');
  logger.log(`📚 API Documentation: http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap();
