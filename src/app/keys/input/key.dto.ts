import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IKeysCreate } from "./key.interface";

export class CreateKey implements IKeysCreate {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  openai: string;

  @IsString()
  @IsOptional()
  gemini: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class VerifyPassword {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
