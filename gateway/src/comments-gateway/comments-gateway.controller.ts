import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsGatewayService } from './comments-gateway.service';

@Controller('comments-gateway')
export class CommentsGatewayController {
  constructor(
    private readonly commentsGatewayService: CommentsGatewayService,
  ) {}
  @Get('')
  async getAllComments() {
    console.log('Gateway: Requesting all comments');
    return {
      message: 'All comments fetched successfully',
      data: null,
    };
  }

  @Get(':id')
  async getCommentById(@Param('id') commentId: string) {
    console.log(`Gateway: Requesting comment ${commentId}`);
    return {
      message: `Comment ${commentId} fetched successfully`,
      data: null,
    };
  }

  @Get('post/:postId')
  async getCommentsForPost(@Param('postId') postId: string) {
    console.log(`Gateway: Requesting comments for post ${postId}`);
    return {
      message: `Comments for post ${postId} fetched successfully`,
      data: null,
    };
  }

  @Post('')
  async createComment(
    @Body() body: { postId: string; userId: string; content: string },
  ) {
    console.log('Gateway: Creating comment', body);
    return {
      message: 'Comment created successfully',
      data: null,
    };
  }

  @Patch(':id')
  async updateComment(
    @Param('id') commentId: string,
    @Body() body: { content?: string },
  ) {
    console.log(`Gateway: Updating comment ${commentId}`, body);
    return {
      message: `Comment ${commentId} updated successfully`,
      data: null,
    };
  }

  @Delete(':id')
  async deleteComment(@Param('id') commentId: string) {
    console.log(`Gateway: Deleting comment ${commentId}`);
    return {
      message: `Comment ${commentId} deleted successfully`,
      data: null,
    };
  }
}
