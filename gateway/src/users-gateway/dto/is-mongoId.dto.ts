import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IsMongoIdDto {
  @IsMongoId({ message: 'Invalid MongoDB ID' })
  @IsNotEmpty({ message: 'ID must be provided' })
  id: string;
}
