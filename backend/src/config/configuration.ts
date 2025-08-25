import { AppConfig } from './config.interface';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    uri: process.env.MONGO_URI as string,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRATION || '1h',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT || '10', 10),
  },
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
}); 