import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    createUser(name: string, email?: string): Promise<User>;
}
