import { UsersService } from './users.service';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
export declare class UsersController {
    private readonly usersService;
    private eventsBus;
    constructor(usersService: UsersService, eventsBus: ClientProxy);
    getUsers(context: RmqContext): Promise<import("./users.schema").UserDocument[]>;
    getUserById(payload: {
        userId: string;
    }): Promise<import("./users.schema").UserDocument>;
    registerUser(data: any): Promise<import("./users.schema").UserDocument>;
    loginUser(data: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: import("./users.schema").UserDocument;
    }>;
    updateUser(data: {
        userId: string;
        body: Partial<any>;
    }): Promise<import("./users.schema").UserDocument>;
    deleteUser(payload: any): Promise<import("./users.schema").UserDocument>;
    handlePostCreated(data: {
        postId: string;
        title: string;
        authorId: string;
    }): Promise<void>;
}
