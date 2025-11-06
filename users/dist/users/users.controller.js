"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const microservices_1 = require("@nestjs/microservices");
let UsersController = class UsersController {
    usersService;
    eventsBus;
    constructor(usersService, eventsBus) {
        this.usersService = usersService;
        this.eventsBus = eventsBus;
    }
    async getUsers(context) {
        const result = await this.usersService.findAll();
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        console.log('result in users controller in users microservice', result);
        return result;
    }
    async getUserById(payload) {
        console.log('type of userId', typeof payload.userId);
        const { userId } = payload;
        const result = await this.usersService.findById(userId);
        return result;
    }
    async registerUser(data) {
        const result = await this.usersService.register(data);
        return result;
    }
    async loginUser(data) {
        const result = await this.usersService.login(data);
        return result;
    }
    async updateUser(data) {
        const { userId, body } = data;
        const result = await this.usersService.update(userId, data.body);
        return result;
    }
    async deleteUser(payload) {
        const { userId } = payload;
        const result = await this.usersService.delete(userId);
        return result;
    }
    async handlePostCreated(data) {
        console.log('📢 Users service received post_created event:', data);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_users' }),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'register_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'login_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.EventPattern)({ cmd: 'post_created' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handlePostCreated", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, common_1.Inject)('EVENTS_BUS')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        microservices_1.ClientProxy])
], UsersController);
//# sourceMappingURL=users.controller.js.map