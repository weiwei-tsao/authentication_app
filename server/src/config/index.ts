import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

export default {
  port: process.env.PORT || '5001',
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoURI: process.env.MONGODB_URI || '',
  redisURI: process.env.REDIS_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiry: process.env.JWT_EXPIRY || '15', // in minutes
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7', // in days
};
