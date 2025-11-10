import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find().exec();
  }

  async findOne(postId: string): Promise<PostDocument> {
    const post = await this.postModel.findById(postId);
    if (!post) throw new RpcException('No such post found');
    return post;
  }

  async createPost(userId: string, data: any): Promise<PostDocument> {
    console.log('real');
    const { title, content } = data;
    const newPost = await this.postModel.create({
      title,
      content,
      authorId: userId,
    });
    console.log(`Post created by ${userId}`);
    return newPost;
  }

  async updatePost(
    userId: string,
    postId: string,
    data: any,
  ): Promise<PostDocument> {
    const post = await this.postModel.findById(postId);
    if (!post) throw new RpcException('Post not found');

    if (post.authorId !== userId)
      throw new RpcException('Unauthorized: not your post');

    const toBeUdpatedData: any = {};
    if (data.title) toBeUdpatedData.title = data.title;
    if (data.content) toBeUdpatedData.content = data.content;

    const udpatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      toBeUdpatedData,
      { new: true },
    );

    if (!udpatedPost) throw new RpcException('Something went wrong');
    return udpatedPost;
  }

  async deletePost(userId: string, postId: string): Promise<PostDocument> {
    const post = await this.postModel.findById(postId);

    console.log('post and userId comaprision', userId, post);
    if (!post) throw new RpcException('Post not found');

    if (post.authorId !== userId)
      throw new RpcException('Unauthorized: not your post');

    await post.deleteOne();
    return post;
  }
}
