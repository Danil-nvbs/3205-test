import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortenModule } from './shorten/shorten.module';
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [
        ConfigModule.forRoot(), 
        ShortenModule,
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.PG_HOST,
          port: Number(process.env.PG_PORT),
          username: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DB_NAME,
          models: [],
          autoLoadModels: true,
          retryAttempts: 3,
          logging: false,
        }),
    ],
})
export class AppModule implements NestModule {
    configure() {}
}
