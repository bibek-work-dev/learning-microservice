import { UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findAll(): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument>;
    register(data: any): Promise<UserDocument>;
    login(data: any): Promise<{
        accessToken: string;
        user: UserDocument;
    }>;
    update(userId: string, data: Partial<UserDocument>): Promise<UserDocument>;
    delete(userId: string): Promise<UserDocument>;
}
