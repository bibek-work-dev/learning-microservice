import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './posts.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ClientsModule.register([
      {
        name: "USERS_SERVICE", transport: Transport.RMQ, options: {
          urls: [`ampq://localhost:5672`],
          queue: "users_queue",
          queueOptions: { durable: true }
        }
      }
    ])
    // ClientsModule.register([
    //   {
    //     name: 'USERS_SERVICE',
    //     transport: Transport.TCP,
    //     options: { host: '127.0.0.1', port: 3000 }, 
    //   },
    // ]),

  ],
  controllers: [PostsResolver],
  providers: [PostsResolver, PostsService],
})
export class PostsModule { }
