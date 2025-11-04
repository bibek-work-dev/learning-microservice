import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async createPost(
    title: string,
    content: string,
    authorId: string,
  ): Promise<PostDocument> {
    const newPost = await this.postModel.create({ title, content, authorId });
    return newPost;
  }
}
