export interface DatabaseConfig {
  uri: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface BcryptConfig {
  saltRounds: number;
}

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  bcrypt: BcryptConfig;
  environment: string;
  isProduction: boolean;
} 