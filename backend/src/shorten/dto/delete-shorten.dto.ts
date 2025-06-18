import { IsString } from "class-validator";

export class DeleteShortenDto {
    @IsString()
    shortUrl: string;
}
