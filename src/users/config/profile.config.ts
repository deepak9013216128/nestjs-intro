import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  apiKey: process.env.GOOGLE_PROFILE_API_KEY,
}));
