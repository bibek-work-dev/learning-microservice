import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  async getPosts() {
    console.log('Gateway: Requeting all posts');
  }

  @Post('')
  async createPost(
    @Body() body: { title: string; content: string; authorId: string },
  ) {
    console.log('Gateway creating post....', body);
  }

  @Post(':id/like')
  async likePost(
    @Param('id') postId: string,
    @Body() body: { userId: string },
  ) {
    console.log('Gateway: user ', body);
  }
}
