import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty()
  // name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}

export class CreateUserWithoutProfileDto extends OmitType(CreateUserDto, ['profile']) {}

//PartialType los convierte a todos en opcionales y omitType nos permite omitir un campo, en este caso el profile, para que no sea obligatorio en el update
export class UpdateUserDto extends PartialType(CreateUserWithoutProfileDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: UpdateProfileDto;
}
