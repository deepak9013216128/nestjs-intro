import { registerAs } from '@nestjs/config';

// export const appConfig = () => ({
// database: {
//   host: process.env.DATABASE_HOST || 'localhost',
//   port: parseInt(process.env.DATABASE_PORT) || 5432,
//   user: process.env.DATABASE_USER || 'postgres',
//   password: process.env.DATABASE_PASSWORD || 'root',
//   name: process.env.DATABASE_NAME || 'nestjs-blog',
//   synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
//   autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
// },
//   environments: process.env.NODE_ENV || 'production',
// });

export default registerAs('appConfig', () => ({
  environments: process.env.NODE_ENV || 'production',
}));
