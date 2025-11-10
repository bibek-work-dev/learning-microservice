import { PostsService } from './posts.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('posts')
export class PostControler {
  constructor(
    private readonly postsService: PostsService,
    @Inject('POSTS_SERVICE') private readonly postClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_post_by_id' })
  async getPostById(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    const { postId } = payload;
    console.log('postId', postId);
    const post = await this.postsService.findOne(postId);
    return post;
  }

  @MessagePattern({ cmd: 'get_posts' })
  async getPosts(@Ctx() ctx: RmqContext) {
    const posts = await this.postsService.findAll();
    return posts;
  }

  @MessagePattern({ cmd: 'create_post' })
  async createPost(
    @Payload() payload: { body: any; userId: string },
    @Ctx() ctx: RmqContext,
  ) {
    const { body, userId } = payload;
    const post = await this.postsService.createPost(userId, body);

    // Emit event to users microservice
    // this.eventsBus.emit(
    //   { cmd: 'post_created' },
    //   { postId: post._id, title: post.title, authorId: post.authorId },
    // );

    // this.ackMessage(ctx);
    return post;
  }

  @MessagePattern({ cmd: 'update_post' })
  async updatePost(
    @Payload() payload: { postId: string; userId: string; body: any },
    @Ctx() ctx: RmqContext,
  ) {
    console.log('payload', payload);
    const { postId, userId, body } = payload;
    const result = await this.postsService.updatePost(userId, postId, body);
    return result;
  }

  @MessagePattern({ cmd: 'delete_post' })
  async deletePost(
    @Payload() payload: { userId: string; postId: string },
    @Ctx() ctx: RmqContext,
  ) {
    const { postId, userId } = payload;
    const result = await this.postsService.deletePost(userId, postId);
    // this.ackMessage(ctx);
    return result;
  }

  // @EventPattern({ cmd: 'user_deleted' })
  // async handleUserDeleted(@Payload() data: { userId: string }) {
  //   await this.postsService.deletePostsByAuthor(data.userId);
  // }
}
