import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IsMongoIdDto } from './dtos/is-mongoId.dto';
import { AuthGuard } from 'src/gateway-commons/guards/auth.guard';
import { CurrentUser } from 'src/gateway-commons/decorators/current-user.decorator';
import { UpdatePostDto } from './dtos/update-post.dt';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts-gateway')
export class PostsGatewayController {
  constructor(@Inject('POSTS_SERVICE') private postsClient: ClientProxy) {}

  @Get(':id')
  async getPostById(@Param() param: IsMongoIdDto) {
    const { id } = param;
    console.log('postId', id);
    const result = await firstValueFrom(
      this.postsClient.send({ cmd: 'get_post_by_id' }, { postId: id }),
    );
    console.log('result', result);
    return {
      message: 'All posts fetched successfully',
      data: result,
    };
  }

  @Get('')
  async getPosts() {
    const result = await firstValueFrom(
      this.postsClient.send({ cmd: 'get_posts' }, {}),
    );
    return {
      message: 'All posts fetched successfully',
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser('id') userId: string,
  ) {
    const payload = { userId, body: createPostDto };
    console.log('payload', payload);
    const result = await firstValueFrom(
      this.postsClient.send({ cmd: 'create_post' }, payload),
    );
    return {
      message: 'Post created successfully',
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  async likePost(
    @Param() params: IsMongoIdDto,
    @CurrentUser('id') userId: string,
  ) {
    const { id } = params;
    const result = await firstValueFrom(
      this.postsClient.send({ cmd: 'like_post' }, { postId: id, userId }),
    );
    return {
      message: `Post ${id} liked successfully`,
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Param() params: IsMongoIdDto,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser('id') userId: string,
  ) {
    const { id } = params;
    console.log('updatePostDto', updatePostDto);
    const result = await firstValueFrom(
      this.postsClient.send(
        { cmd: 'update_post' },
        { userId, postId: id, body: updatePostDto },
      ),
    );
    return {
      message: `Post ${id} updated successfully`,
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(
    @Param() params: IsMongoIdDto,
    @CurrentUser('id') userId: string,
  ) {
    const { id } = params;
    const result = await firstValueFrom(
      this.postsClient.send({ cmd: 'delete_post' }, { userId, postId: id }),
    );
    return {
      message: `Post ${id} deleted successfully`,
      data: result,
    };
  }
}
