import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetPostDto {
  @IsMongoId({ message: 'Invalid MongoDB ID' })
  @IsNotEmpty({ message: 'ID must be provided' })
  id: string;
}
