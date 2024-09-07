import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './logging.middleware';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    AudioModule,
    UsersModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes(UsersController);
  }
}
