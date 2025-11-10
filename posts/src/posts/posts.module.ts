import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './posts.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostControler } from './posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ClientsModule.register([
      {
        name: 'POSTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:5672`],
          queue: 'posts_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [PostControler],
  providers: [PostsService],
})
export class PostsModule {}
