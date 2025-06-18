import { IsString } from "class-validator";

export class GetShortenAnalyticsDto {
    @IsString()
    shortUrl: string;
}
