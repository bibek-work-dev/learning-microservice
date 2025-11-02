import { Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// @Resolver()
@Controller("")
export class PostsResolver {
    constructor(
    private readonly postsService: PostsService,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  @Get("users")
  async getUsers() {
    console.log("here")
    return firstValueFrom(this.usersClient.send({cmd: "get_users"}, {}))
  }

  @Get("users/:id")
  async getUserById(@Param("id") id: string) {
    return firstValueFrom(this.usersClient.send({cmd: "get_user_by_id"}, {}))
  }

  @Get("posts")
  async getPosts() {
    return this.postsService.findAll()
  }

    @Post("posts")
  async createPost(@Body() body: { title: string; content: string; authorId: string }) {
        const post = await this.postsService.createPost(body.title, body.content, body.authorId);

        this.usersClient.emit(
      { cmd: 'post_created' },
      { postId: post._id, title: post.title, authorId: post.authorId },
    );

    return post;
  }
}
