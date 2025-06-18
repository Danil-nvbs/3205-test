import { IsDate, IsOptional, IsString, IsUrl, MaxLength, MinDate } from "class-validator";

export class GetShortenInfo {
    @IsString()
    shortUrl: string;
}
