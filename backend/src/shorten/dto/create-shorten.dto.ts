import { IsDate, IsOptional, IsString, IsUrl, MaxLength, MinDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateShortenDto {
    @IsString()
    @IsUrl({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_tld: true,
    }, {
        message: 'Неправильный формат ссылки'
    })
    originalUrl: string;
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @MinDate(() => new Date(), {
        message: 'Дата истечения не может быть в прошлом'
    })
    expiresAt?: Date;

    @IsOptional()
    @IsString()
    @MaxLength(20, {
        message: 'Алиас должен быть не длиннее 20 символов'
    })
    alias?: string
}
