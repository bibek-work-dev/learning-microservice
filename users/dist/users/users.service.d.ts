import { UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findAll(): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument>;
    register(name: string, email: string, password: string): Promise<UserDocument>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: UserDocument;
    }>;
    update(id: string, data: Partial<UserDocument>): Promise<UserDocument>;
    delete(id: string): Promise<UserDocument>;
}
