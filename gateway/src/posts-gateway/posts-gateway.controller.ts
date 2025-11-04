import { PostsGatewayService } from './posts-gateway.service';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

@Controller('posts-gateway')
export class PostsGatewayController {
  constructor(private readonly postsGatewayService: PostsGatewayService) {}

  @Get('')
  async getPosts() {
    console.log('Gateway: Requesting all posts');
    return {
      message: 'All posts fetched successfully',
      data: null,
    };
  }

  @Get(':id')
  async getPostById(@Param('id') postId: string) {
    console.log('Gateway: Requesting single post');
    return {
      message: `Post ${postId} fetched successfully`,
      data: null,
    };
  }

  @Post('')
  async createPost(
    @Body() body: { title: string; content: string; authorId: string },
  ) {
    console.log('Gateway creating post....', body);
    return {
      message: 'Post created successfully',
      data: null,
    };
  }

  @Post(':id/like')
  async likePost(
    @Param('id') postId: string,
    @Body() body: { userId: string },
  ) {
    console.log('Gateway: post like ', postId, body);
    return {
      message: `Post ${postId} liked successfully`,
      data: null,
    };
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: string) {
    console.log('Gateway post delete', postId);
    return {
      message: `Post ${postId} deleted successfully`,
      data: null,
    };
  }
}
