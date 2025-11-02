import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

      async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

    async createUser(name: string, email?: string): Promise<User> {
    const newUser = new this.userModel({ name, email });
    return newUser.save();
  }
}
