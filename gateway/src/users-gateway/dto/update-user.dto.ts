import { IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  name?: string;
}
