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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
let UsersService = class UsersService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll() {
        const result = await this.userModel.find().exec();
        return result;
    }
    async findById(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new microservices_1.RpcException("User Not Found");
        }
        return user;
    }
    async register(name, email, password) {
        const exists = await this.userModel.findOne({ email });
        if (exists)
            throw new microservices_1.RpcException('Email already in use');
        const hashed = await bcrypt.hash(password, 10);
        const createdUser = await this.userModel.create({ name, email, password: hashed });
        return createdUser;
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new microservices_1.RpcException('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new microservices_1.RpcException('Invalid credentials');
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { accessToken: token, user };
    }
    async update(id, data) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedUser) {
            throw new microservices_1.RpcException("No user found to update");
        }
        return updatedUser;
    }
    async delete(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new microservices_1.RpcException("No user to delete");
        }
        return deletedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map