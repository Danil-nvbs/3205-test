import { IsString } from "class-validator";

export class GetShortenInfoDto {
    @IsString()
    shortUrl: string;
}
