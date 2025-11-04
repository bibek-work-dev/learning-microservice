import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./users.schema").User[]>;
    getUserById(id: string): Promise<import("./users.schema").User | null>;
    createUser(data: {
        name: string;
        email?: string;
    }): Promise<import("./users.schema").User>;
    handlePostCreated(data: {
        postId: string;
        title: string;
        authorId: string;
    }): Promise<void>;
}
