// users-microservice/src/users/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 0 })
  postCount: number;

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ default: null })
  lastLogin: Date;

  @Prop({ default: 0 })
  loggedInTimes: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
