import { IsBoolean, IsOptional, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

// * DTO: Data Tranfer Object
// * it is a pipe
export class CreateEpisodeDto {

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}