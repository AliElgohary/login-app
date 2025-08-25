import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  
  PORT: Joi.number()
    .default(3000)
    .min(1)
    .max(65535),
  
  MONGO_URI: Joi.string()
    .required()
    .uri()
    .description('MongoDB connection string'),
  
  JWT_SECRET: Joi.string()
    .required()
    .min(32)
    .description('JWT secret key (minimum 32 characters)'),
  
  JWT_EXPIRATION: Joi.string()
    .default('1h')
    .description('JWT token expiration time'),
  
  BCRYPT_SALT: Joi.number()
    .default(10)
    .min(8)
    .max(16)
    .description('BCrypt salt rounds'),
}); 