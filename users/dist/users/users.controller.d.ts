import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./users.schema").UserDocument[]>;
    getUserById(id: string): Promise<import("./users.schema").UserDocument>;
    registerUser(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<import("./users.schema").UserDocument>;
    loginUser(data: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: import("./users.schema").UserDocument;
    }>;
    updateUser(data: {
        id: string;
        update: Partial<any>;
    }): Promise<import("./users.schema").UserDocument>;
    deleteUser(id: string): Promise<import("./users.schema").UserDocument>;
    handlePostCreated(data: {
        postId: string;
        title: string;
        authorId: string;
    }): Promise<void>;
}
