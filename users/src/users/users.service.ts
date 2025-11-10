import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    const result = await this.userModel.find().exec();
    return result;
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    console.log('userr in findById', user);
    if (!user) {
      throw new RpcException('User Not Found');
    }
    return user;
  }

  async register(data: any): Promise<UserDocument> {
    const { email, name, password } = data;
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new RpcException('Email already in use');

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await this.userModel.create({
      name,
      email,
      password: hashed,
    });
    return createdUser;
  }

  async login(data: any): Promise<{ accessToken: string; user: UserDocument }> {
    const { email, password } = data;
    const user = await this.userModel
      .findOne({ email })
      .select('name email password');

    if (!user) throw new RpcException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new RpcException('Invalid credentials');

    const payload = { sub: user._id, email: user.email, id: user._id };
    const token = this.jwtService.sign(payload);

    user.lastLogin = new Date();
    await user.save();

    return { accessToken: token, user };
  }

  async update(
    userId: string,
    data: Partial<UserDocument>,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, data, { new: true })
      .exec();
    console.log('updatedUser', updatedUser);
    if (!updatedUser) {
      throw new RpcException('No user found to update');
    }
    return updatedUser;
  }

  async delete(userId: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) {
      throw new RpcException('No user to delete');
    }
    return deletedUser;
  }
}
